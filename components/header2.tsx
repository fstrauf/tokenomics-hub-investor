import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import Link from 'next/link'
import {
  SignedIn,
  SignedOut,
} from '@clerk/clerk-react/dist/components/controlComponents'
import { UserButton } from '@clerk/clerk-react/dist/components/uiComponents'
import { SignInButton } from '@clerk/clerk-react/dist/components/SignInButton'
import { useAuth } from '@clerk/clerk-react/dist/hooks/useAuth'
import { useUser } from '@clerk/clerk-react/dist/hooks/useUser'
import ThubLogo from '../lib/svg/thub-logo'
import ChevronIcon from '../lib/svg/chevron'
import Bars3Icon from '../lib/svg/bars3Icon'
import XMarkIcon from '../lib/svg/xmarkicon'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header2() {
  const { isSignedIn } = useAuth()
  const { user } = useUser()

  // const role = user?.publicMetadata?.role ?? ''
    const contributor = user?.publicMetadata?.contributor || false
    // const admin = user?.publicMetadata?.admin || false

  const newProtocolSection = (
    <Link
      href="/newProtocol"
      className={`-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50 ${
        !isSignedIn ? 'pointer-events-none opacity-50' : ''
      }`}
    >
      {/* <item.icon
                                className="h-6 w-6 flex-shrink-0 text-indigo-600"
                                aria-hidden="true"
                              /> */}
      <div className="ml-4">
        <p className="text-base font-medium text-gray-900">New Protocol</p>
        <p className="mt-1 text-sm text-gray-500">
          Create and submit a new entry for a protocol to be listed.
        </p>
      </div>
    </Link>
  )

  const myDraftsSection = (
    <Link
      href="/myDrafts"
      className={`-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50 ${
        !isSignedIn ? 'pointer-events-none opacity-50' : ''
      }`}
    >
      {/* <item.icon
                                className="h-6 w-6 flex-shrink-0 text-indigo-600"
                                aria-hidden="true"
                              /> */}
      <div className="ml-4">
        <p className="text-base font-medium text-gray-900">My Drafts</p>
        <p className="mt-1 text-sm text-gray-500">List and edit your drafts.</p>
      </div>
    </Link>
  )

  const allDraftsSection = (
    <Link
      href="/allDrafts"
      className={`-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50 ${
        !(contributor) ? 'pointer-events-none opacity-50' : ''
      }`}
    >
      {/* <item.icon
        className="h-6 w-6 flex-shrink-0 text-indigo-600"
        aria-hidden="true"
      /> */}
      <div className="ml-4">
        <p className="text-base font-medium text-gray-900">All Drafts</p>
        <p className="mt-1 text-sm text-gray-500">
          See all drafts (contributor only).
        </p>
      </div>
    </Link>
  )

  const calculatorSection = (
    <Link
      href="/calculator"
      className="text-base font-medium text-gray-500 hover:text-gray-900"
    >
      Calculator
    </Link>
  )

  const expertsSection = (
    <Link
      href="/experts"
      className="text-base font-medium text-gray-500 hover:text-gray-900"
    >
      Experts
    </Link>
  )

  const tdfSection = (
    <Link
      href="/thub"
      className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
    >
      {/* <item.icon
        className="h-6 w-6 flex-shrink-0 text-indigo-600"
        aria-hidden="true"
      /> */}
      <div className="ml-4">
        <p className="text-base font-medium text-gray-900">
          Tokenomics Design Framework
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Get access to our FigJam design template to design your own token.
        </p>
      </div>
    </Link>
  )

  const calcTemplateSection = (
    <Link
      href="/thub"
      className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
    >
      {/* <item.icon
        className="h-6 w-6 flex-shrink-0 text-indigo-600"
        aria-hidden="true"
      /> */}
      <div className="ml-4">
        <p className="text-base font-medium text-gray-900">
          Tokenomics Calculation Template
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Calculate distribution, emission, supply & demand drivers and
          valuation for your token launch.
        </p>
      </div>
    </Link>
  )

  return (
    <Popover className="relative bg-white">
      <div className="mx-auto max-w-full px-6">
        <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <ThubLogo />
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-dao-red">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden space-x-10 md:flex">
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? 'text-gray-900' : 'text-gray-500',
                      'group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-dao-red focus:ring-offset-2'
                    )}
                  >
                    <span className="mr-2">Content</span>
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
                    <Popover.Panel className="absolute z-10 -ml-4 mt-3 w-screen max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          {newProtocolSection}
                          {myDraftsSection}
                          {allDraftsSection}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
            {calculatorSection}
            {expertsSection}
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? 'text-gray-900' : 'text-gray-500',
                      'group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-dao-red focus:ring-offset-2'
                    )}
                  >
                    <span className="mr-2">More</span>
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
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          {tdfSection}
                          {calcTemplateSection}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
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
          className="absolute z-50 inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
        >
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10">
                  <ThubLogo />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                    {newProtocolSection}
                    {myDraftsSection}
                    {allDraftsSection}
                </nav>
              </div>
            </div>
            <div className="space-y-6 py-6 px-5">
                {tdfSection}  
                {calcTemplateSection}
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
  )
}
