import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import XMarkIcon from '../../public/svg/xmarkicon'

export default function GenericPopover({ children, isOpen, setIsOpen }) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={() => setIsOpen(false)}
      >
        <div className="flex min-h-screen items-center justify-center p-4">
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75" />

          <div className="relative mx-auto h-3/4 w-3/4 rounded-lg bg-white">
            <div className="absolute top-0 right-0 m-4">
              <button
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => setIsOpen(false)}
              >
                <span className="sr-only">Close panel</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <article className="relative m-auto flex h-full flex-col justify-center items-center space-y-6 overflow-y-scroll p-10">
              {children}
            </article>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
