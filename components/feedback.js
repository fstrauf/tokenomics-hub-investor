import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { DISCORD_WEBHOOK } from '../lib/constants'

export default function Feedback() {    
    const [isOpen, setIsOpen] = useState(false)

    const [form, setForm] = useState({
        name: '',
        feedback: '',
    })

    function closeModal(event) {
        setIsOpen(false)
    }

    function handleSubmit(event) {
        fetch(DISCORD_WEBHOOK, {
            "method":"POST",
            "headers": {"Content-Type": "application/json"},
            "body": JSON.stringify({
                "content": 'Name: ' + form.name + ' ||| Feedback: ' + form.feedback
              })
          })
          .then(res=> console.log(res))
          .catch(err => console.error(err));
        closeModal()
    }

    function openModal() {
        setIsOpen(true)
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    return (
        <>
            <div>
                <button
                    type="button"
                    onClick={openModal}
                    className="rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                    Leave Feedback
                </button>
            </div>

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
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-700 mb-4"
                                    >
                                        We'd love your feedback!
                                    </Dialog.Title>
                                    <form action="#" method="POST" onSubmit={handleSubmit}>
                                        <div className="space-y-6 px-4 py-5 sm:p-6">
                                            <div className="col-span-3 sm:col-span-2">
                                                <label htmlFor="name" className="block text-lg font-medium text-black mb-2">
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={form.name}
                                                    onChange={e => {
                                                        setForm({
                                                            ...form,
                                                            name: e.target.value
                                                        });
                                                    }}
                                                    id="name"
                                                    className="block w-full flex-1 rounded-md border-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-m"
                                                />
                                                <label htmlFor="feedback" className="block text-lg font-medium text-black mt-4 mb-2">
                                                    Feedback
                                                </label>
                                                <textarea
                                                    id="feedback"
                                                    name="feedback"
                                                    rows={5}
                                                    value={form.feedback}
                                                    onChange={e => {
                                                        setForm({
                                                            ...form,
                                                            feedback: e.target.value
                                                        });
                                                    }}
                                                    className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-m"
                                                    defaultValue={''}
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
                                            Submit
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
