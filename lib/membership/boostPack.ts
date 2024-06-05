import { UserSub } from '@/types/user';
import { BOOST_PACK_EXPIRE, BOOST_PACK_USES, getBoostPackKey } from './constants';
import redis from '../redis';

export const boostPack = async ({ sub }: UserSub) => {
    const userBoostPackKey = await getBoostPackKey({ sub })
    const userBoostPack: number = await redis.get(userBoostPackKey) || 0
    // 加油包余额不存在，当作新购用户
    if (userBoostPack === 0) {
        const res = await redis.set(userBoostPackKey, BOOST_PACK_USES, { ex: BOOST_PACK_EXPIRE })
        if (res === 'OK') {
            return { sub, boostPackUses: BOOST_PACK_USES, expire: BOOST_PACK_EXPIRE, boostPack: 'success' }
        }
        return { sub, boostPackUses: 0, expire: 0, boostPack: 'fail' }
    }

    // 已是加油包用户，查询过期时间，计算新的过期时间，更新过期时间
    const oldBalance: number = await redis.get(userBoostPackKey) || 0
    const TTL = await redis.ttl(userBoostPackKey)
    const newTTL = TTL + BOOST_PACK_EXPIRE
    const newBalance = oldBalance + BOOST_PACK_USES
    const res = await redis.setex(userBoostPackKey, newTTL, newBalance)
    return res === 'OK' ?
        { sub, oldBalance, newBalance, expire: newTTL, boostPack: 'success' } :
        { sub, oldBalance, newBalance: oldBalance, expire: TTL, boostPack: 'fail' }

}