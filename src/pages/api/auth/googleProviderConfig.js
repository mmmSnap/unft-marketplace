import GoogleProvider from "next-auth/providers/google";

export function GoogleProviderConfig() {
    return GoogleProvider({
        clientId: process.env.GOOGLE_ID, clientSecret: process.env.GOOGLE_SECRET, authorization: {
            params: {
                scope: [
                    "https://www.googleapis.com/auth/userinfo.profile",
                    "https://www.googleapis.com/auth/userinfo.email",
                    "https://www.googleapis.com/auth/user.addresses.read",
                    "https://www.googleapis.com/auth/user.birthday.read",
                    "https://www.googleapis.com/auth/user.gender.read",
                    "https://www.googleapis.com/auth/user.phonenumbers.read"
                ].join(" "),
            }
        },
    });
}