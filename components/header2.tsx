import { Fragment, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import Link from 'next/link'
import {
  SignedIn,
  SignedOut,
} from '@clerk/clerk-react/dist/components/controlComponents'
import { UserButton } from '@clerk/clerk-react/dist/components/uiComponents'
import { SignInButton } from '@clerk/clerk-react/dist/components/SignInButton'
// import { useAuth } from '@clerk/clerk-react/dist/hooks/useAuth'
import { useUser } from '@clerk/clerk-react/dist/hooks/useUser'
import ThubLogo from '../public/svg/thub-logo'
// import ChevronIcon from '../public/svg/chevron'
import Bars3Icon from '../public/svg/bars3Icon'
import XMarkIcon from '../public/svg/xmarkicon'
import { headerStatus } from '../lib/helper'
import ChevronIcon from '../public/svg/chevron'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header2({ mode }) {
  // const { isSignedIn } = useAuth()
  const { user } = useUser()

  const [showBanner, setShowBanner] = useState(true)

  // const role = user?.publicMetadata?.role ?? ''
  // const contributor = user?.publicMetadata?.contributor || false
  const admin = user?.publicMetadata?.admin || false

  const calculatorSection = (
    <Link
      href="/calculator"
      className="text-base font-medium text-white hover:text-gray-300"
    >
      Calculator
    </Link>
  )

  const expertsSection = (
    <Link
      href="/experts"
      className="text-base font-medium text-white hover:text-gray-300"
    >
      Experts
    </Link>
  )

  const myDesign = (
    <Link
      href="/myDesigns"
      className="text-base font-medium text-white hover:text-gray-300"
    >
      My Designs
    </Link>
  )

  const newDesign = (
    <Link
      href="/newDesign"
      className="text-base font-medium text-white hover:text-gray-300"
    >
      New Design
    </Link>
  )

  const mechanismAdmin = (
    <Link
      href="/thub"
      className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-700"
    >
      <div className="ml-4">
        <p className="text-base font-medium text-white">Mechanism Admin</p>
      </div>
    </Link>
  )

  const postAdmin = (
    <Link
      href="/thub"
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

  const fundRaiseBar = (
    <div
      className={`${
        showBanner ? 'm-auto flex items-center bg-dao-green' : 'hidden'
      }`}
    >
      <div className="mx-auto max-w-xl py-3 px-3 sm:px-6 lg:px-8">
        <p className="ml-3 self-center truncate text-center font-medium text-white">
          <span className="inline">🥳 We are fundraising. Interested? </span>
          <a
            href="mailto:contact@tokenomicsdao.com"
            className="hover:underline"
          >
            Contact us.
          </a>
        </p>
      </div>
      <button
        className="text-gray-200"
        onClick={() => {
          setShowBanner(false)
        }}
      >
        <XMarkIcon className="h-6 w-6 text-gray-200" aria-hidden="true" />
      </button>
    </div>
  )

  function renderSwitch() {
    switch (mode) {
      case headerStatus.design:
        return (
          <>
            {myDesign}
            {newDesign}
          </>
        )
      case headerStatus.main:
        return (
          <>
            {calculatorSection}
            {expertsSection}
          </>
        )
      case headerStatus.report:
      default:
        return (
          <>
            {calculatorSection}
            {expertsSection}
          </>
        )
    }
  }

  return (
    <>
      {fundRaiseBar}
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
              {admin ? (
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open
                            ? 'text-gray-900'
                            : 'text-white hover:text-gray-50',
                          'group inline-flex items-center rounded-md bg-dark-tdao text-base font-medium text-white hover:text-gray-50'
                        )}
                      >
                        <span className="mr-2">Admin</span>
                        <ChevronIcon
                          className={`${
                            open
                              ? 'rotate-180 transform text-gray-600'
                              : 'text-gray-400'
                          } ml-2 h-5 w-5 group-hover:text-gray-500`}
                        />
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
                        <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 transform px-2 sm:px-0">
                          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="relative grid gap-6 bg-dark-tdao px-5 py-6 sm:gap-8 sm:p-8">
                              {tdsPhaseAdmin}
                              {postAdmin}
                              {mechanismAdmin}
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
            </Popover.Group>
            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <SignInButton />
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
