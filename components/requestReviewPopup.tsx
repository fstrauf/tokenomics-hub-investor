import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
// import { DISCORD_WEBHOOK } from '../lib/constants'
import React from 'react'

interface RequestReviewProps {
  isOpen: boolean
  handleIsOpen: (event: any) => void
}

export default React.memo(function RequestReviewPopup({
  isOpen,
  handleIsOpen,
}: RequestReviewProps) {
  const [form, setForm] = useState({
    name: '',
    message: '',
    url: '',
    email: '',
  })

  function closeModal(event) {
    handleIsOpen(false)
  }

  function handleSubmit(event) {
    fetch('/api/requestReview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },

      body: JSON.stringify({
        values: {
          name: form.name,
          email: form.email,
          url: window.location.toString(),
          message: form.message,
        },
      }),
    })
      .then((res) => console.log(res))
      .catch((err) => console.error(err))
    closeModal()
  }

  function openModal() {
    handleIsOpen(true)
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="z-60 relative" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="mb-4 text-center text-[20px] font-medium leading-6 text-gray-800"
                  >
                    Requesting a Review
                  </Dialog.Title>
                  <blockquote className="text-xs">
                    Tokenomics Hub is connected to a community of tokenomics
                    experts If you’re interested in getting an expert opinion on
                    your tokeonomics this the place to do so.
                  </blockquote>

                  <form action="#" method="POST" onSubmit={handleSubmit}>
                    <div className="space-y-6 px-4 py-5 sm:p-6">
                      <div className="col-span-3 sm:col-span-2">
                        <label
                          htmlFor="name"
                          className="text-md mb-1 block font-medium text-black"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={(e) => {
                            setForm({
                              ...form,
                              name: e.target.value,
                            })
                          }}
                          id="name"
                          className="sm:text-m mb-1 block h-7 w-full flex-1 rounded-md border border-gray-300 px-1  focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor="email"
                          className="text-md mb-1 block font-medium text-black"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={(e) => {
                            setForm({
                              ...form,
                              email: e.target.value,
                            })
                          }}
                          id="email"
                          className="sm:text-m block w-full flex-1 rounded-md border border-gray-300 px-1 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor="message"
                          className="text-md mt-4 mb-2 block font-medium text-black"
                        >
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          value={form.message}
                          onChange={(e) => {
                            setForm({
                              ...form,
                              message: e.target.value,
                            })
                          }}
                          className="sm:text-m mt-1 block w-full rounded-md border border-gray-300 px-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          // defaultValue={''}
                        />
                      </div>
                    </div>
                  </form>

                  <div className="mt-4">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleSubmit}
                    >
                      Request Review
                    </button>
                    {/* <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Close
                    </button> */}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
})
