import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import prisma from "@/lib/prisma"
import Credentials from "next-auth/providers/credentials"
import bcrypt from 'bcrypt';
import { ConsoleLogger } from 'aws-amplify/utils';
const logger = new ConsoleLogger('auteh');

const saveUserProfile = async (userId: string, type: string, profileImageUrl: string | null) => {
    const userProfile = await prisma.userProfile.findFirst({
        where: {
            userId: userId
        }
    })
    if (!userProfile) {
        await prisma.userProfile.create({
            data: {
                userId: userId,
                createdAt: new Date(),
                updatedAt: new Date(),
                type: type,
                profileImageUrl: profileImageUrl || '/default-profile.png',
            }
        })
    }
}

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
                logger.info('authorize', credentials)
                try {
                    if (!credentials?.email || !credentials?.password) {
                        logger.info('authorize', 'no email or password')
                        return null
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                })

                if (user) {
                    if (!user.password) {
                        logger.info('authorize', 'no password')
                        return null
                    }

                    const passwordsMatch = await bcrypt.compare(credentials.password, user.password);
                    if (passwordsMatch) {   
                        logger.info('authorize', 'passwords match')
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
                    logger.info('authorize', 'error', error)
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
                    await saveUserProfile(existingUser.id, 'photographer', user.image!)
                    return true
                }

                const userCreated = await prisma.user.create({
                    data: {
                        email: user.email!,
                        name: user.name!,
                        provider: account?.provider,
                    }
                })
                logger.info('signIn', 'userCreated', userCreated)
                return true
            } catch (error) {
                logger.info('signIn', 'error', error)
                return false
            }
        },
        session: async ({ session, token }) => {
            const userProfile = await prisma.userProfile.findFirst({
                where: {
                    user: {
                        email: session.user?.email!
                    }
                },
                include: {
                    user: true
                }
            })

            session.user = {
                ...session.user,
                id: userProfile?.user.id,
                role: userProfile?.type,
            }

            return session
        }
    }
})
export { handler as GET, handler as POST }