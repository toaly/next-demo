'use client'

import * as React from 'react'
import { LiteralUnion, signIn } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/Icons'
import { BuiltInProviderType } from 'next-auth/providers/index'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false)

  const login = async (type: LiteralUnion<BuiltInProviderType>) => {
    setIsGitHubLoading(true)
    signIn(type, {
      // 登录方法，第一个参数标注平台
      callbackUrl: `${window.location.origin}`, // 设置登录成功后的回调地址
    })
    // const res = await fetch(`api/member`, {
    //   method: 'post',
    // })
    // const resp = await res.json()
    // console.log(resp, 'ppppppp')
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <button
        type="button"
        className={cn(buttonVariants())}
        onClick={() => login('github')}
        disabled={isGitHubLoading}
      >
        <Icons.gitHub className="mr-2 h-4 w-4" />
        Github
      </button>
      <button
        type="button"
        className={cn(buttonVariants())}
        onClick={() => login('google')}
        disabled={isGitHubLoading}
      >
        <Icons.google className="mr-2 h-4 w-4" />
        Google
      </button>
    </div>
  )
}
