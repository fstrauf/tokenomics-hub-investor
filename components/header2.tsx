import { Children, Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import Link from 'next/link'
import {
  SignedIn,
  SignedOut,
} from '@clerk/clerk-react/dist/components/controlComponents'
import { UserButton } from '@clerk/clerk-react/dist/components/uiComponents'
import { SignInButton } from '@clerk/clerk-react/dist/components/SignInButton'
import { useUser } from '@clerk/clerk-react/dist/hooks/useUser'
import ThubLogo from '../public/svg/thub-logo'
import Bars3Icon from '../public/svg/bars3Icon'
import XMarkIcon from '../public/svg/xmarkicon'
import { headerStatus } from '../lib/helper'
// import ChevronIcon from '../public/svg/chevron'
// import { createContext } from 'react';
import { useRouter } from 'next/router'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header2({ mode = headerStatus.main, children = null }) {
  const { user } = useUser()
  const admin = user?.publicMetadata?.admin || false

  const router = useRouter()

  const genericSection = (pathName, title) => {
    return (
      <Link
        href={pathName}
        className={`${
          router.pathname === pathName
            ? 'bg-gradient-to-tr from-dao-red via-dao-red to-dao-green'
            : 'bg-white'
        } rounded-md bg-clip-text py-2 px-4 text-transparent hover:bg-opacity-80 ${
          router.pathname === pathName
            ? 'hover:from-dao-red hover:via-dao-red hover:to-dao-green'
            : 'hover:bg-dao-red'
        }`}
      >
        {title}
      </Link>
    )
  }

  const mechanismAdmin = (
    <Link
      href="/coreMechanisms"
      className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-700"
    >
      <div className="ml-4">
        <p className="text-base font-medium text-white">Mechanism Admin</p>
      </div>
    </Link>
  )

  const allDraftsAdmin = (
    <Link
      href="/allDrafts"
      className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-700"
    >
      <div className="ml-4">
        <p className="text-base font-medium text-white">Report Drafts Admin</p>
      </div>
    </Link>
  )

  const postAdmin = (
    <Link
      href="/adminView"
      className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-700"
    >
      <div className="ml-4">
        <p className="text-base font-medium text-white">Post Admin</p>
      </div>
    </Link>
  )

  const tdsPhaseAdmin = (
    <Link
      href="/adminTDFPhase"
      className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-700"
    >
      <div className="ml-4">
        <p className="text-base font-medium text-white">TDS Phase Admin</p>
      </div>
    </Link>
  )

  function renderSwitch() {
    switch (mode) {
      case headerStatus.design:
        return (
          <>
            {genericSection('/myDesigns', 'Design a Token')}
          </>
        )
      case headerStatus.main:
        return (
          <>
            {genericSection('/calculator', 'Calculator')}
            {genericSection('/bookAnExpert', 'Services')}
            {genericSection('/myDesigns', 'My Dashboard')}
          </>
        )
      case headerStatus.report:
      default:
        return (
          <>
            {genericSection('/myDesigns', 'List a Token')}
          </>
        )
    }
  }

  return (
    <>
      <Popover className="relative bg-dark-tdao">
        <div className="mx-auto max-w-full px-6">
          <div className="flex items-center justify-between py-1 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <ThubLogo />
              <div className="hidden md:ml-2 md:flex md:items-center">
                <p className="text-2xl text-white">Tokenomics Hub</p>
              </div>
            </div>
            <div className="-my-2 -mr-2 md:hidden">
              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-dark-tdao p-2 text-gray-200 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-dao-red">
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>

            <Popover.Group as="nav" className="hidden space-x-10 md:flex">
              {renderSwitch()}
            </Popover.Group>
            <div className="hidden items-center justify-end md:flex md:flex-1 md:gap-5 lg:w-0">
              {admin ? (
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open
                            ? 'bg-gradient-to-tr  from-dao-red via-dao-red to-dao-green text-gray-900'
                            : 'text-white hover:text-gray-50',
                          'rounded-md bg-white bg-clip-text py-2 px-4 text-transparent hover:bg-opacity-80'
                        )}
                      >
                        <span className="mr-2">Admin</span>
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute z-10 mt-3 w-60 max-w-md -translate-x-1/2 transform px-2 sm:px-0">
                          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="relative grid gap-6 bg-dark-tdao px-5 py-6 sm:gap-8 sm:p-8">
                              {tdsPhaseAdmin}
                              {postAdmin}
                              {mechanismAdmin}
                              {allDraftsAdmin}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              ) : (
                <></>
              )}
              <div>{children}</div>
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <div className="text-white">
                  <SignInButton />
                </div>
              </SignedOut>
            </div>
          </div>
        </div>
        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition md:hidden"
          >
            <div className="divide-y-2 divide-gray-700 rounded-lg bg-dark-tdao shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pt-5 pb-6">
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10">
                    <ThubLogo />
                  </div>
                  <div className="-mr-2 bg-dark-tdao">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-dark-tdao p-2 text-gray-200 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-20">
                  <nav className="grid gap-y-8">{renderSwitch()}</nav>
                </div>
              </div>
              <div className="space-y-6 py-6 px-5">
                <div className="flex w-full justify-end">
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                  <SignedOut>
                    <SignInButton />
                  </SignedOut>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  )
}
