import NextAuth from "next-auth"
import cookie from "cookie";
import {Deta} from "deta";
import sendEmail from "../sendgrid";
import {GoogleProviderConfig} from "./googleProviderConfig";
import {EmailOTPVerificationConfig} from "./emailOTPVerificationConfig";
import {EmailOTPGeneratorConfig} from "./emailOTPGeneratorConfig";
import CredentialsProvider from "next-auth/providers/credentials";


function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

async function generateOtp() {
    return Math.floor(Math.random() * 1000000);
}

async function saveOtpForUser(email, code) {
    const deta = Deta(process.env.DETA_PROJECT_KEY);
    const otp_database = deta.Base(process.env.OTP_TABLE_NAME);
    await otp_database.put({email: email, code: code});
}

async function sendOtpToUser(email, code) {
    await sendEmail(email, "makemymemories2508@gmail.com", `Your magic code is ${code}`, "", "");
}

async function triggerEmailOTP(req, res) {
    const {email} = req.body;
    if (!isValidEmail(email)) {
        return res.redirect(`/api/auth/signin?error=Invalid Email`);
    }

    const code = await generateOtp();
    await saveOtpForUser(email, code);
    await sendOtpToUser(email, code);

    res.setHeader(
        "set-cookie",
        cookie.serialize("otp-flow.user-email", req.body.email, {
            httpOnly: true,
            maxAge: 5 * 60, // 5 minutes
            path: "/",
        })
    );

    return res.redirect(`/api/auth/signin?otp-triggerred=1`);
}

export const authOptions = {
    providers: [GoogleProviderConfig(), CredentialsProvider({
        id: "otp-verification",
        name: "OTP",
        credentials: {
            code: {
                label: "OTP",
                type: "text",
                placeholder: "Enter OTP you received via email",
            },
        }
    })]
}

export default async (req, res) => {
    if (
        req.query?.nextauth !== undefined &&
        req.query?.nextauth[0] === "callback" &&
        req.query?.nextauth[1] === "otp-generation" &&
        req.method === "POST"
    ) {
        return await triggerEmailOTP(req, res);
    }

    const isOtpFlowInProgress = req.cookies["otp-flow.user-email"] !== undefined;
    let providers = [GoogleProviderConfig()];

    if (isOtpFlowInProgress) {
        providers.push(await EmailOTPVerificationConfig(req, res));
    } else {
        providers.push(EmailOTPGeneratorConfig());
    }
    return NextAuth({
        providers: providers,
        pages: {
            signIn: '/auth/login',
        }
    })(req, res);
};