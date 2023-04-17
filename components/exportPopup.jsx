import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { Field, Form } from 'formik'
// import { DISCORD_WEBHOOK } from '../lib/constants'
import React, { useMemo } from 'react'
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  toBlob,
} from '@react-pdf/renderer'

export default React.memo(function ExportPopup({ isOpen, handleIsOpen }) {
  function closeModal(event) {
    handleIsOpen(false)
  }

  function handleSubmit(event) {
    closeModal()
  }

  function openModal() {
    handleIsOpen(true)
  }

  const exportSection = useMemo(
    () => (
      <Document author={'kanti '} title={'age'} subject="myData">
        <Page size="A4">
          <Text>Welcome to the Tokenomics HUB</Text>
        </Page>
      </Document>
    ),
    []
  )

  // const downloadPdf = async () => {
  //   const blob = await toBlob(component)
  //   const url = URL.createObjectURL(blob)
  //   const link = document.createElement('a')
  //   link.href = url
  //   link.download = 'my_webpage.pdf'
  //   document.body.appendChild(link)
  //   link.click()
  //   document.body.removeChild(link)
  //   URL.revokeObjectURL(url)
  // }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="z-60" onClose={closeModal}>
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
                  className="mb-4 text-center text-lg font-medium leading-6 text-gray-700 "
                >
                  Select sections to export
                </Dialog.Title>

                <div className="">
                  <label className="block text-sm">
                    <input type="checkbox" name="checked" value="One" />
                    <span className="mx-1 text-gray-800">Token Strength</span>
                  </label>
                  <label className="block text-sm">
                    <input type="checkbox" name="checked" value="Two" />
                    <span className="mx-1 text-gray-800">
                      Allocation and Emissions
                    </span>
                  </label>
                </div>
                <PDFDownloadLink
                  document={exportSection}
                  fileName={'myData.pdf'}
                >
                  <div className="mt-5 flex justify-center">
                    <button
                      size="sm"
                      // onClick={downloadPdf}
                      className="mb-3 rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"
                    >
                      Download as PDF
                    </button>
                  </div>
                </PDFDownloadLink>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
})
