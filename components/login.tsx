import React, { FC } from 'react';
import { useSession, signOut, signIn } from 'next-auth/react';

type Message = string

const Login: FC<{ message: Message }> = ({ message }) => {
  const { data: session, status } = useSession()

  return (
    <>
      <div className='block max-w-2xl m-auto'>
        <p className='relative top-0 opacity-100 overflow-hidden rounded p-3 m-0 bg-gray-100'>
          {!session && (
            <>
              <span className='align-middle font-bold z-10 left-4 right-24 whitespace-nowrap text-ellipsis overflow-hidden leading-5'>
                {message}
              </span>
              <a
                href={`/api/auth/signin`}
                className='float-right -mr-2 font-medium rounded cursor-pointer text-base leading-6 relative z-10 bg-dao-red text-white no-underline px-2 py-1'
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                Sign in
              </a>
            </>
          )}
          {session?.user && (
            <>
              <a
                href={`/api/auth/signout`}
                className='float-right -mr-2 font-medium rounded cursor-pointer text-base leading-6 relative z-10 bg-dao-red text-white no-underline px-2 py-1'
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Sign out
              </a>
              <span className='align-middle mr-2'>
                <small className='mr-3'>Signed in as</small>
                <strong className='text-sm'>{session.user.email ?? session.user.name}</strong>
              </span>
            </>
          )}
        </p>
      </div>
    </>
  )
}

export default Login;