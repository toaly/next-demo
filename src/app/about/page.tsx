'use clinet'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { setCookie } from './_actions'
export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
}

export default async function Page() {
  const Ok = async () => {
    'use server'
    setCookie()
  }
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <button onClick={Ok}>setCookie</button>
    </div>
  )
}
