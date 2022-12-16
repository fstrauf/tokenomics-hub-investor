import React, { FC } from 'react';
import { useSession, signOut, signIn } from 'next-auth/react';
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Link from 'next/link';
import { useForm } from "react-hook-form";

type Message = string

const Login: FC<{ message: Message }> = ({ message }) => {
  const { data: session, status } = useSession()
  const { handleSubmit, formState } = useForm();

  return (
    <>
      <div className='block m-auto'>
        <div className='relative top-0 opacity-100 rounded p-3 m-0 bg-gray-100'>
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
          <Menu as="div" className="relative inline-block text-left z-60">
            <div>
              <Menu.Button className="inline-flex w-full justify-center rounded-md bg-dao-green px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                Options
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="z-60 top-0 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <Link className={`${active ? 'bg-dao-green text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm disabled:opacity-40 ${formState.isSubmitting ? 'bg-red-200' : ''}`}
                        href="/newProtocol">
                        <button>
                          New Protocol
                        </button>
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link className={`${active ? 'bg-dao-green text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm disabled:opacity-40 ${formState.isSubmitting ? 'bg-red-200' : ''}`}
                        href="/allDrafts"                          >
                        <button 
                        // disabled={!session?.user?.isAdmin}
                        >
                          All Drafts
                        </button>
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link className={`${active ? 'bg-dao-green text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm disabled:opacity-40 ${formState.isSubmitting ? 'bg-red-200' : ''}`}
                        href="/myDrafts"                          >
                        <button 
                        // disabled={!session?.user?.isAdmin}
                        >
                          My Drafts
                        </button>
                      </Link>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button className={`${active ? 'bg-dao-green text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm disabled:opacity-40 ${formState.isSubmitting ? 'bg-red-200' : ''}`}
                        onClick={() => signOut({ callbackUrl: '/' })}>
                        <a>Log out</a>
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </>
  )
}

export default Login;