import { Fragment, useEffect, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { SignInButton, UserButton, SignedIn, SignedOut } from '@clerk/nextjs'
import { useUser } from '@clerk/clerk-react/dist/hooks/useUser'
import ThubLogo from '../public/svg/thub-logo'
import Bars3Icon from '../public/svg/bars3Icon'
import XMarkIcon from '../public/svg/xmarkicon'
import { headerStatus } from '../lib/helper'
import HeaderComboSection from './generic/HeaderComboSection'
import HeaderGenericSection from './generic/HeaderGenericSection'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header2({ mode = headerStatus.main, children = null }) {
  const { user } = useUser()
  const admin = user?.publicMetadata?.admin || false
  const [headerName, setHeaderName] = useState(() => {
    switch (mode) {
      case headerStatus.design:
        return 'Tokenomics Design Space'
      case headerStatus.main:
        return 'Tokenomics Hub'
      case headerStatus.report:
      default:
        return 'Tokenomics Hub'
    }
  })

  const ForgdLogo = () => (
    <svg
      width="231"
      height="27"
      viewBox="0 0 231 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M101.726 26.9782C99.5434 26.9782 97.5595 26.6438 95.7739 25.9749C94.0131 25.306 92.4631 24.3646 91.1239 23.1507C89.8096 21.9121 88.7928 20.4752 88.0736 18.8402C87.3544 17.2051 86.9948 15.4214 86.9948 13.4891C86.9948 11.5568 87.3544 9.7731 88.0736 8.13806C88.7928 6.50301 89.8096 5.07854 91.1239 3.86465C92.4631 2.62598 94.0131 1.6722 95.7739 1.00332C97.5595 0.334441 99.531 0 101.689 0C103.821 0 105.781 0.334441 107.566 1.00332C109.352 1.6722 110.902 2.62598 112.216 3.86465C113.53 5.07854 114.547 6.50301 115.266 8.13806C115.986 9.7731 116.345 11.5568 116.345 13.4891C116.345 15.3967 115.986 17.1803 115.266 18.8402C114.547 20.4752 113.53 21.9121 112.216 23.1507C110.902 24.3646 109.352 25.306 107.566 25.9749C105.781 26.6438 103.834 26.9782 101.726 26.9782ZM101.689 21.0326C102.879 21.0326 103.97 20.8468 104.962 20.4752C105.979 20.1036 106.859 19.5834 107.603 18.9145C108.347 18.2208 108.918 17.4157 109.314 16.4991C109.711 15.5825 109.91 14.5791 109.91 13.4891C109.91 12.3991 109.711 11.3958 109.314 10.4791C108.918 9.56253 108.347 8.76978 107.603 8.1009C106.859 7.40724 105.979 6.87461 104.962 6.50301C103.97 6.13141 102.879 5.94561 101.689 5.94561C100.498 5.94561 99.3946 6.13141 98.3778 6.50301C97.3859 6.87461 96.5055 7.40724 95.7367 8.1009C94.9927 8.79455 94.4223 9.59968 94.0255 10.5163C93.6535 11.4329 93.4675 12.4239 93.4675 13.4891C93.4675 14.5791 93.6535 15.5825 94.0255 16.4991C94.4223 17.4157 94.9927 18.2208 95.7367 18.9145C96.5055 19.5834 97.3859 20.1036 98.3778 20.4752C99.3946 20.8468 100.498 21.0326 101.689 21.0326Z"
        fill="#F2F2F1"
      />
      <path
        d="M166.966 26.9039C164.809 26.9039 162.837 26.5942 161.052 25.9749C159.291 25.3556 157.766 24.4637 156.476 23.2994C155.186 22.1103 154.182 20.6858 153.463 19.026C152.768 17.3414 152.421 15.471 152.421 13.4148C152.421 11.4825 152.781 9.71117 153.5 8.1009C154.244 6.46586 155.298 5.04139 156.662 3.82749C158.026 2.61359 159.626 1.6722 161.461 1.00332C163.321 0.334441 165.342 0 167.524 0C169.186 0 170.723 0.198187 172.137 0.594562C173.551 0.990936 174.815 1.51118 175.931 2.15529C177.072 2.79939 178.015 3.51782 178.758 4.31057L174.927 8.43534C174.257 7.86555 173.538 7.38247 172.769 6.9861C172.025 6.56495 171.207 6.23051 170.314 5.98277C169.446 5.71027 168.504 5.57401 167.487 5.57401C166.272 5.57401 165.143 5.7722 164.102 6.16857C163.085 6.56495 162.192 7.12235 161.424 7.84078C160.655 8.53444 160.06 9.36434 159.638 10.3305C159.216 11.2719 159.006 12.3 159.006 13.4148C159.006 14.6782 159.229 15.8054 159.675 16.7964C160.122 17.7625 160.729 18.58 161.498 19.2489C162.292 19.9178 163.209 20.438 164.251 20.8097C165.292 21.1565 166.408 21.3299 167.599 21.3299C168.566 21.3299 169.471 21.206 170.314 20.9583C171.182 20.7106 171.939 20.3761 172.583 19.955C173.228 19.5338 173.712 19.026 174.034 18.4314C174.293 17.969 174.463 17.486 174.542 16.9822H166.966V12.077H180.544C180.594 12.3991 180.631 12.7831 180.656 13.229C180.68 13.6749 180.693 14.0961 180.693 14.4924C180.718 14.8888 180.73 15.1737 180.73 15.3471C180.73 17.1308 180.383 18.7411 179.688 20.1779C179.019 21.59 178.076 22.7915 176.861 23.7825C175.646 24.7734 174.195 25.5414 172.509 26.0864C170.823 26.6314 168.975 26.9039 166.966 26.9039Z"
        fill="#F2F2F1"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M187.954 26.6109V0.598836H200.044C202.152 0.598836 204.061 0.933277 205.772 1.60216C207.484 2.24627 208.947 3.16288 210.162 4.35201C211.402 5.54113 212.344 6.92844 212.989 8.51394C213.634 10.0747 213.956 11.7716 213.956 13.6049C213.956 15.4629 213.634 17.1846 212.989 18.7701C212.344 20.3556 211.402 21.7305 210.162 22.8949C208.947 24.0592 207.484 24.9759 205.772 25.6447C204.061 26.2888 202.152 26.6109 200.044 26.6109H187.954ZM199.858 21.0369H194.278V6.17285H199.858C201.098 6.17285 202.189 6.37104 203.131 6.76741C204.074 7.13901 204.855 7.65925 205.475 8.32814C206.12 8.99702 206.616 9.78976 206.963 10.7064C207.31 11.5982 207.484 12.5644 207.484 13.6049C207.484 14.6701 207.31 15.6487 206.963 16.5405C206.616 17.4324 206.12 18.2127 205.475 18.8816C204.855 19.5505 204.074 20.0831 203.131 20.4795C202.189 20.8511 201.098 21.0369 199.858 21.0369Z"
        fill="#F2F2F1"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M123.727 0.598836V26.6109H129.753V17.5438H134.218L140.02 26.6109H147.311L140.867 16.7237C141.072 16.633 141.273 16.5348 141.471 16.429C142.884 15.6611 143.988 14.633 144.781 13.3447C145.6 12.0318 146.009 10.5454 146.009 8.88554C146.009 7.25049 145.625 5.81363 144.856 4.57497C144.087 3.3363 143.008 2.37014 141.62 1.67648C140.231 0.958051 138.619 0.598836 136.784 0.598836H123.727ZM136.151 12.713H129.753V5.87557H135.779C136.573 5.87557 137.255 6.01182 137.825 6.28433C138.42 6.55684 138.879 6.95321 139.202 7.47345C139.549 7.96892 139.722 8.55109 139.722 9.21998C139.722 9.91363 139.561 10.5206 139.239 11.0408C138.941 11.5611 138.52 11.9698 137.974 12.2671C137.453 12.5644 136.846 12.713 136.151 12.713Z"
        fill="#F2F2F1"
      />
      <path
        d="M61.6794 0.632361V26.6444H68.0033V16.8342H79.8699V11.5574H68.0033V6.20638H81.3951V0.632361H61.6794Z"
        fill="#F2F2F1"
      />
      <path
        d="M10.8874 24.4499L21.0709 0.643908H47.1351L44.4277 6.91C44.0218 7.84935 43.2625 8.5621 42.2705 8.93487L26.6301 14.8122C25.1022 15.3864 25.5384 17.6497 27.3031 18.3041L28.8975 18.8953C29.6867 19.1879 30.1597 20.0446 29.8932 20.6986L27.9497 25.4681C27.7232 26.0239 27.1784 26.3629 26.5115 26.3629H12.3846C11.3794 26.3629 10.5321 25.2804 10.8874 24.4499Z"
        fill="#F2F2F1"
      />
      <path
        d="M0.469278 5.10694C-1.47827 9.41511 2.93439 15.1343 8.2059 15.1343H9.09262C9.32299 15.1343 9.51234 15.0195 9.59479 14.8297L13.8191 5.10694H0.469278Z"
        fill="#F2F2F1"
      />
    </svg>
  )

  useEffect(() => {
    switch (mode) {
      case headerStatus.design:
        setHeaderName('Tokenomics Design Space')
        break
      case headerStatus.main:
        setHeaderName('Tokenomics Hub')
        break
      case headerStatus.report:
      default:
        setHeaderName('Tokenomics Hub')
        break
    }
  }, [mode])

  function renderSwitch() {
    switch (mode) {
      case headerStatus.design:
        return (
          <>
            <HeaderGenericSection
              pathName="https://forgd.com/contact/"
              title="Audit & Design Help"
            />
            <HeaderGenericSection
              pathName="https://forgd.com/contact/"
              title="Support"
            />
          </>
        )
      case headerStatus.main:
        return (
          <>
            <HeaderComboSection
              classNames={classNames}
              title="Products & Audit Services"
            >
              <HeaderGenericSection
                pathName="/tokenomics-design"
                title="Design Space"
              />
              <HeaderGenericSection
                pathName="/thub"
                title="Calculation Template"
              />
              <HeaderGenericSection
                pathName="/book-an-expert"
                title="Tokenomics Audit"
              />
              <HeaderGenericSection pathName="/calculator" title="Calculator" />
            </HeaderComboSection>

            {/* <HeaderGenericSection pathName="/myReports" title="My Reports" /> */}
            <HeaderGenericSection
              pathName="/#what-is-tokenomics-hub"
              title="What is Tokenomics Hub"
            />
          </>
        )
      case headerStatus.report:
      default:
        return (
          <HeaderGenericSection pathName="/myReports" title="List a Token" />
        )
    }
  }

  return (
    <>
      <Popover className="relative bg-dark-tdao">
        <div className="mx-auto max-w-full px-6">
          <div className="flex items-center justify-between py-1 md:justify-start md:space-x-10">
            <div className="flex items-center justify-start lg:w-0 lg:flex-1">
              <div className="flex h-12 w-auto items-center justify-center">
                <ForgdLogo />
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
                    pathName="/admin/adminTDFPhase"
                    title="TDS Phase Admin"
                  />
                  <HeaderGenericSection
                    pathName="/admin/adminView"
                    title="Post Admin"
                  />
                  <HeaderGenericSection
                    pathName="/admin/coreMechanisms"
                    title="Mechanism Admin"
                  />
                  <HeaderGenericSection
                    pathName="/admin/allDrafts"
                    title="Report Drafts Admin"
                  />
                  <HeaderGenericSection
                    pathName="/admin/subscriptions"
                    title="Manage Subscriptions"
                  />
                </HeaderComboSection>
              ) : (
                <></>
              )}
              <div>{children}</div>
              <SignedIn>
                <UserButton afterSignOutUrl="/home" />
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
                    <UserButton afterSignOutUrl="/home" />
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
