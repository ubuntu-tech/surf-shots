import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"

console.log(process.env)

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
        }),
    ],
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }