import React, { FC } from 'react'
import { SignedOut } from '@clerk/clerk-react/dist/components/controlComponents'
import { SignInButton } from '@clerk/clerk-react/dist/components/SignInButton'

type Message = string

const Login: FC<{ message: Message }> = () => {
  return (
    <>
      <div className="m-0 w-full rounded bg-gray-100 p-3 align-middle">
        <SignedOut>
          <div className="flex justify-between">
            <p className="text-left">Please sign in to see remaining report.</p>
            <SignInButton className="font-bold" />
          </div>
        </SignedOut>
      </div>
    </>
  )
}

export default Login
