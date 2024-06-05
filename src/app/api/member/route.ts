import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { ResModel } from '@/lib/utils';

export async function POST(request: Request, context: { params: any }) {
    try {
        const post = await prisma.user.update({
            data: {
                sub: 'a',
                username: 'a',
                avatar: 'a',
                email: 'a',
                platform: 'a',
            },
            where: {
                id: 1
            }
        })
        return NextResponse.json(ResModel.success({ data: post }));
    } catch (e) {
        return NextResponse.json(ResModel.error("failed to upgrade"), { status: 500 });
    }
}
export async function GET(request: Request, context: { params: any }) {
    try {
        const post = await prisma.user.findFirst({
            where: {
                id: 1
            }
        })
        console.log(post);

        return NextResponse.json(ResModel.success(post));
    } catch (e) {
        return NextResponse.json(ResModel.error("failed to upgrade"), { status: 500 });
    }
}