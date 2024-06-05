import { Role, UserSub } from '@/types/user';
import { getMembershipStatusKey, MEMBERSHIP_EXPIRE, MEMBERSHIP_ROLE_VALUE, ROLES } from './constants';
import redis from '../redis';

export const upgrade = async ({ sub }: UserSub) => {
    // 检查角色
    const userRoleKey = await getMembershipStatusKey({ sub })
    const userRole: Role = await redis.get(userRoleKey) || 1

    // 普通用户
    if (userRole === 1) {
        const res = await redis.set(userRoleKey, MEMBERSHIP_ROLE_VALUE, { ex: MEMBERSHIP_EXPIRE })
        if (res === "OK") {
            // 清空今天已用次数
            return { sub, oldRole: ROLES[userRole], newRole: ROLES[MEMBERSHIP_ROLE_VALUE], expire: MEMBERSHIP_EXPIRE, upgrade: 'success' }
        }
        return { sub, oldRole: ROLES[userRole], upgrade: 'fail' }
    }

    // 会员用户，查询过期时间，计算新的过期时间，更新过期时间
    const TTL = await redis.ttl(userRoleKey)
    const newTTL = TTL + MEMBERSHIP_EXPIRE
    const res = await redis.expire(userRoleKey, newTTL)
    if (res === 1) {
        return { sub, oldRole: ROLES[MEMBERSHIP_ROLE_VALUE], newRole: ROLES[MEMBERSHIP_ROLE_VALUE], expire: newTTL, upgrade: 'success' }
    }
    return { sub, oldRole: ROLES[MEMBERSHIP_ROLE_VALUE], newRole: ROLES[MEMBERSHIP_ROLE_VALUE], expire: TTL, upgrade: 'fail' }
}