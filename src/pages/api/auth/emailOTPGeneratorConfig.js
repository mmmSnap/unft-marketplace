import CredentialsProvider from "next-auth/providers/credentials";

export function EmailOTPGeneratorConfig() {
    return CredentialsProvider({
        id: "otp-generation",
        name: "OTP",
        credentials: {
            email: {
                label: "Email",
                type: "email",
                placeholder: "Your email address",
            },
        },
        async authorize() {
            return null;
        },
    });
}