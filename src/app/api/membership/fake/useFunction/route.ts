import { checkStatus } from '@/lib/membership/checkStatus';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        // 忽略身份校验的代码
        // ……

        // 服务端调用工具方法前，先查询剩余次数
        const remainingInfo: DateRemaining = await getUserDateRemaining({ sub })
        if (remainingInfo.userDateRemaining <= 0) {
            const errorText = '0 uses remaining today.'
            return NextResponse.json({ error: errorText }, { status: 401 });
        }

        // 忽略使用功能的逻辑
        // ……

        // 服务端调用工具方法后，修改 redis 统计的使用次数
        incrAfterUse({ sub, remainingInfo }) // 异步执行，减少服务端阻塞

        // 返回
        const res = await checkStatus({ sub }) // 测试使用，实际返回应使用功能的真实返回
        return NextResponse.json(res)
    } catch (e) {
        return NextResponse.json({ error: "failed to upgrade" }, { status: 500 });
    }
}