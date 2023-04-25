import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import XMarkIcon from '../../public/svg/xmarkicon'

export default function GenericPopover({ children, isOpen, setIsOpen }) {
  function closeModal() {
    setIsOpen(false)
  }

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
            <div className="absolute top-0 right-0 m-4 z-50">
              <button
                type="button"
                className="mt-4 mr-4 self-end"
                onClick={closeModal}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <article className="relative m-auto flex h-full flex-col items-center justify-center space-y-6 overflow-y-scroll p-10">
              {children}
            </article>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
