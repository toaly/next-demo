import { boostPack } from "@/lib/membership/boostPack";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { sub } = await req.json();
        const res = await boostPack({ sub })
        return NextResponse.json(res)
    } catch (e) {
        return NextResponse.json({ error: "failed to purchase boost pack" }, { status: 500 });
    }
}