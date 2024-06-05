import { NextRequest, NextResponse } from 'next/server';
import { upgrade } from '@/lib/membership/upgrade';
export async function POST(req: NextRequest) {
    try {
        const { sub } = await req.json();
        const res = await upgrade({ sub })
        return NextResponse.json(res)
    } catch (error) {
        return NextResponse.json({ error: "failed to upgrade" }, { status: 500 })
    }
}