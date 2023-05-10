import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
// import Link from 'next/link'
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
import HeaderComboSection from './HeaderComboSection'
import HeaderGenericSection from './HeaderGenericSection'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header2({ mode = headerStatus.main, children = null }) {
  const { user } = useUser()
  const admin = user?.publicMetadata?.admin || false

  function renderSwitch() {
    switch (mode) {
      case headerStatus.design:
        return (
          <HeaderGenericSection pathName="/myDesigns" title="Design a Token" />
        )
      case headerStatus.main:
        return (
          <>
            <HeaderComboSection
              classNames={classNames}
              title="Products & Consulting"
            >
              <HeaderGenericSection
                pathName="/tokenomics-design"
                title="Tokenomics Design Space"
              />
              <HeaderGenericSection
                pathName="/thub"
                title="Calculation Template"
              />
              <HeaderGenericSection pathName="/book-an-expert" title="Tokenomics Consulting" />
            </HeaderComboSection>
            <HeaderGenericSection pathName="/calculator" title="Calculator" />
            <HeaderGenericSection pathName="/myDesigns" title="My Dashboard" />
          </>
        )
      case headerStatus.report:
      default:
        return (
          <HeaderGenericSection pathName="/myDesigns" title="List a Token" />
        )
    }
  }

  return (
    <>
      <Popover className="relative bg-dark-tdao">
        <div className="mx-auto max-w-full px-6">
          <div className="flex items-center justify-between py-1 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <div className='w-12 h-12'>
              <ThubLogo />
              </div>
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
                <HeaderComboSection classNames={classNames} title="Admin">
                  <HeaderGenericSection
                    pathName="/adminTDFPhase"
                    title="TDS Phase Admin"
                  />
                  <HeaderGenericSection
                    pathName="/adminView"
                    title="Post Admin"
                  />
                  <HeaderGenericSection
                    pathName="/coreMechanisms"
                    title="Mechanism Admin"
                  />
                  <HeaderGenericSection
                    pathName="/allDrafts"
                    title="Report Drafts Admin"
                  />
                </HeaderComboSection>
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
