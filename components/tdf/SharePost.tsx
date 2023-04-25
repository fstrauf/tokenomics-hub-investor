// import { Popover, Transition } from '@headlessui/react'
// import Link from 'next/link'
// import { Fragment, useState } from 'react'
// import { mandatoryFormValidate, notifyDiscord, postStatus, postType } from '../../lib/helper'
// import toast from 'react-hot-toast'
import { WEBSITE_URL_BASE } from '../../lib/constants'
import Router from 'next/router'
import { notifyStatusUpdate, postStatus } from '../../lib/helper'
import toast from 'react-hot-toast'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function PublishPost({
  active,
  post,
  // setSubmitting,
  isSubmitting,
}) {

    let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  
  return (
    <>
      <button
        onClick={openModal}
        className={`${
          active ? 'bg-dao-red text-white' : 'text-gray-900'
        } group flex w-full items-center rounded-md px-2 py-2 text-sm disabled:opacity-70`}
        type="button"
        disabled={isSubmitting}
      >
        Share
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Share Your Draft as Preview
                  </Dialog.Title>
                  <div className="mt-2">
                    <pre className="text-xs text-gray-500">
                      http://tokenomicshub.xyz/postPreview/
                      {post.id}
                    </pre>
                  </div>
                  <div className="mt-4">
                    <button
                      className="mr-2 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:bg-dao-red focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          `http://tokenomicshub.xyz/postPreview/${post.id}`
                        )
                      }
                    >
                      Copy Link
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
