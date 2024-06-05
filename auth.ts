import { UserInfo } from '@/types/user';
import NextAuth from "next-auth"
import GithubProvider from 'next-auth/providers/github';
import prisma from '@/lib/prisma';
import GoogleProvider from "next-auth/providers/google";
export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: `${process.env.GOOGLE_ID}`,
            clientSecret: `${process.env.GOOGLE_SECRET}`,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
    ],

    callbacks: {
        session: async ({ session, token }) => {
            const res = await prisma.user.upsert({
                where: {
                    sub: token.sub
                },
                update: {
                    // 使用token中的数据
                    username: token.name || '',
                    avatar: token.picture || '',
                    email: token.email || ''
                },
                create: {
                    // 使用token中的数据 
                    sub: token.sub || '',
                    username: token.name || '',
                    avatar: token.picture || '',
                    email: token.email || '',
                    platform: 'github',
                }
            })
            if (res) {
                session.user = {
                    sub: res.sub,
                    username: res.username,
                    avatar: res.avatar,
                    platform: res.platform,
                    email: res.email,
                } as UserInfo
            }
            return session
        },
        // async jwt({ token, account, profile }) {
        //     // Persist the OAuth access_token and or the user id to the token right after signin
        //     if (account) {
        //         token.accessToken = account.access_token
        //         token.id = profile?.sub || ""
        //     }
        //     return token
        // }
    },
})
