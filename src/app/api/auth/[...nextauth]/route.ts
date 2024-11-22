import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import prisma from "@/lib/prisma"
import Credentials from "next-auth/providers/credentials"
import bcrypt from 'bcrypt';

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
        }),
        Credentials({
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        return null
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                })

                if (user) {
                    if (!user.password) {
                        return null
                    }

                    const passwordsMatch = await bcrypt.compare(credentials.password, user.password);
                    if (passwordsMatch) {   
                        return user
                    }
                } else if (!user) {
                    const hashedPassword = await bcrypt.hash(credentials.password, 10);
                    return await prisma.user.create({
                        data: {
                            email: credentials?.email,
                            name: credentials?.email.split('@')[0],
                            password: hashedPassword,
                            provider: 'credentials',
                        }
                    })
                }
                return null
                } catch (error) {
                    console.log('error', error)
                    return null
                }
            },
        }),
    ],
}

const handler = NextAuth({
    providers: authOptions.providers,
    callbacks: {
        signIn: async ({ user, account }) => {
            try {
                const existingUser = await prisma.user.findUnique({
                    where: {
                        email: user.email!
                    }
                })
                if (existingUser) {
                    return true
                }

                const userCreated = await prisma.user.create({
                    data: {
                        email: user.email!,
                        name: user.name!,
                        provider: account?.provider,
                    }
                })
                console.log('userCreated', userCreated)
                return true
            } catch (error) {
                console.log('error', error)
                return false
            }
        }
    }
})
export { handler as GET, handler as POST }