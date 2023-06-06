import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'

export default function HeaderComboSection({
  children,
  classNames,
  title,
  boxed = false,
}) {
  const sectionButton = (open) => {
    if (boxed) {
      return (
        <Popover.Button
        className={classNames(
          open
            ? 'bg-gradient-to-tr  from-dao-red via-dao-red to-dao-green text-gray-900'
            : 'text-white hover:text-dao-green',
          'rounded-md border-2 border-dao-red bg-gradient-to-r from-dao-red via-dao-red to-dao-green bg-clip-text py-1 px-4 text-transparent hover:bg-opacity-80'
        )}
        >
          <span className="mr-2">{title}</span>
        </Popover.Button>
      )
    } else {
      return (
        <Popover.Button
          className={classNames(
            open
              ? 'bg-gradient-to-tr  from-dao-red via-dao-red to-dao-green text-gray-900'
              : 'text-white hover:text-gray-50',
            'rounded-md bg-white bg-clip-text py-2 px-4 text-transparent hover:bg-opacity-80'
          )}
        >
          <span className="mr-2">{title}</span>
        </Popover.Button>
      )
    }
  }

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          {sectionButton(open)}
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-20 mt-3 w-72 max-w-md -translate-x-1/2 transform px-2 sm:px-0">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid gap-1 bg-dark-tdao px-5 py-6 sm:gap-8 sm:p-8">
                  {children}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
