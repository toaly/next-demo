'use server'

import { cookies } from 'next/headers'

export const setCookie = () => {
    const oneDay = 24 * 60 * 60 * 1000
    cookies().set('token', '666666', { expires: Date.now() - oneDay })
}