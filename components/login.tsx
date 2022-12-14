import React, { FC } from 'react'
// import { Menu, Transition } from '@headlessui/react'
// import { Fragment } from 'react'
// import Link from 'next/link';
// import { useAuth } from '@clerk/clerk-react/dist/hooks/useAuth';
// import { useUser } from '@clerk/clerk-react/dist/hooks/useUser';
import {
//   SignedIn,
  SignedOut,
} from '@clerk/clerk-react/dist/components/controlComponents'
// import { UserButton } from '@clerk/clerk-react/dist/components/uiComponents'
import { SignInButton } from '@clerk/clerk-react/dist/components/SignInButton'

type Message = string

const Login: FC<{ message: Message }> = ({ message }) => {
  //   const { isSignedIn } = useAuth();
  //   const { user } = useUser();

  //   const role = user?.publicMetadata?.role ?? ""

  return (
    <>
      {/* <div className="m-auto"> */}
        {/* <div className="m-0 flex justify-end rounded bg-gray-100 p-3"> */}
        <div className="m-0 w-full rounded bg-gray-100 p-3 align-middle">
          {/* <SignedIn>
            <UserButton />
          </SignedIn> */}
          <SignedOut>
            <div className='flex justify-between'>
              <p className="text-left">
                Please sign in to see remaining report.
              </p>
              <SignInButton className='font-bold' />
            </div>
          </SignedOut>
        </div>
        {/* <Menu as="div" className="z-60 w-28 relative inline-block text-left ">
            <div>
              <Menu.Button className="align-middle inline-flex justify-center rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
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
              <Menu.Items className="z-10 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <Link href="/newProtocol" className='no-underline'>
                        <button
                          disabled={!isSignedIn}
                          className={`${active ? 'bg-dao-red text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm disabled:opacity-70`}>
                          New Protocol
                        </button>
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link href="/allDrafts" className='no-underline'>
                        <button
                          disabled={!(role === 'contributor')}
                          className={`${active ? 'bg-dao-red text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm disabled:opacity-70`}
                        >
                          All Drafts
                        </button>
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link href="/myDrafts" className='no-underline'>
                        <button
                          disabled={!isSignedIn}
                          className={`${active ? 'bg-dao-red text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm disabled:opacity-70`}
                        >
                          My Drafts
                        </button>
                      </Link>
                    )}
                  </Menu.Item>
                </div>              
              </Menu.Items>
            </Transition>
          </Menu> */}
        {/* </div> */}
      {/* </div> */}
    </>
  )
}

export default Login
