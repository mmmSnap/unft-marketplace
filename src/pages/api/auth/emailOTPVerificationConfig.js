import {Deta} from "deta";
import CredentialsProvider from "next-auth/providers/credentials";
import cookie from "cookie";

async function isOTPValid(email, code) {
    const deta = Deta(process.env.DETA_PROJECT_KEY);
    const otp_database = deta.Base(process.env.OTP_TABLE_NAME);
    const result = await otp_database.fetch({email: email, code: Number(code)});
    if (result.count === 0) return false;
    return true;
}

async function findOrCreateUser(email) {
    const deta = Deta(process.env.DETA_PROJECT_KEY);
    const users_database = deta.Base(process.env.USERS_TABLE_NAME);
    const result = await users_database.fetch({email: email});
    if (result.count === 0) {
        const user = await users_database.put({email: email});
        return {email, id: user.key};
    }
    return {...result.items[0]};
}

async function clearOTP(email) {
    const deta = Deta(process.env.DETA_PROJECT_KEY);
    const otp_database = deta.Base(process.env.OTP_TABLE_NAME);
    const result = await otp_database.fetch({email: email});
    if (result.count === 0) return;
    for (const item of result.items) {
        await otp_database.delete(item.key);
    }
}

export async function EmailOTPVerificationConfig(req, res) {
    return CredentialsProvider({
        id: "otp-verification",
        name: "OTP",
        credentials: {
            code: {
                label: "OTP",
                type: "text",
                placeholder: "Enter OTP you received via email",
            },
        },
        async authorize(credentials, _req) {
            const email = req.cookies["otp-flow.user-email"];
            const code = credentials?.code;

            console.log("email", email)
            console.log("code", code)

            if (email === undefined || code === undefined) {
                return null;
            }

            if (!(await isOTPValid(email, code))) {
                return null;
            }

            const user = await findOrCreateUser(email);

            res.setHeader(
                "set-cookie",
                cookie.serialize("otp-flow.user-email", "", {
                    maxAge: -1,
                    path: "/",
                })
            );

            await clearOTP(email);

            return user;
        },
    });
}