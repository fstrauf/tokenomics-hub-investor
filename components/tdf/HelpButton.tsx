import { Popover, Transition } from '@headlessui/react'
import Link from 'next/link'
import { Fragment, useState } from 'react'
import { mandatoryFormValidate, notifyDiscord, postStatus, postType } from '../../lib/helper'
import toast from 'react-hot-toast'
import { WEBSITE_URL_BASE } from '../../lib/constants'

export default function HelpButton({ values, setIsRequestReviewOpen, setreviewRequiredFields }) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const [isReviewSubmitting, setReviewSubmitting] = useState(false)
  function handleReviewClick(values) {
    let typeA = values.postType
    let typeB = postType.design
    if (typeA === typeB) {
      setIsRequestReviewOpen(true)
    } else {
      sendToReview(values)
    }
  }

  async function sendToReview(
    // event: MouseEvent<HTMLButtonElement, MouseEvent>,
    values
  ): void {
    const errors = mandatoryFormValidate(values)
    setreviewRequiredFields(errors)
    if (values?.id === '') {
      toast.error('Please save first', { position: 'bottom-right' })
    } else {
      if (Object.keys(errors).length > 0) {
        toast.error('Some required fields are missing!', {
          position: 'bottom-right',
        })
      } else {
        const postId = values.id
        setReviewSubmitting(true)
        const body = { status: postStatus.reviewRequired, postId }

        const response = await fetch('/api/post/updateStatus', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })

        if (!response.ok) {
          const error = await response.text()
          toast.error(JSON.parse(error).error, { position: 'bottom-right' })
          throw new Error(error)
        } else {
          toast.success('Sent to review', { position: 'bottom-right' })
          notifyDiscord(
            `${WEBSITE_URL_BASE}/editPost/${postId}`,
            postStatus.reviewRequired
          )
        }
        setReviewSubmitting(false)
      }
    }
  }

  const requestServices = (
    <Link
      href="/bookAnExpert"
      className="w-56 rounded-md border-2 border-dao-red bg-gradient-to-r from-dao-red via-dao-red to-dao-green bg-clip-text py-1 px-4 text-transparent hover:bg-opacity-80"
    >
      Request Design Services
      {/* <div className="ml-4">
        <p className="text-base font-medium text-white">Request Design Services</p>
      </div> */}
    </Link>
  )

  const requestReview = (
    <button
    type="button"
    onClick={() => handleReviewClick(values)}
    className="w-56 rounded-md border-2 border-dao-red bg-gradient-to-r from-dao-red via-dao-red to-dao-green bg-clip-text py-1 px-4 text-transparent hover:bg-opacity-80"
    disabled={isReviewSubmitting}
  >
    Request Review
  </button>
  )

  return (
    <div className="">
      <Popover.Group as="nav" className="hidden space-x-10 md:flex">
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(
                  open
                    ? 'bg-gradient-to-tr  from-dao-red via-dao-red to-dao-green text-gray-900'
                    : 'text-white hover:text-dao-green',
                  // 'rounded-md bg-white bg-clip-text py-2 px-4 text-transparent hover:bg-opacity-80'
                  'rounded-md border-2 border-dao-red bg-gradient-to-r from-dao-red via-dao-red to-dao-green bg-clip-text py-1 px-4 text-transparent hover:bg-opacity-80'
                )}
              >
                <span className="mr-2">Review</span>
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
                <Popover.Panel className="absolute left-1/2 z-10 mt-3 max-w-md -translate-x-1/2 transform px-2 sm:px-0">
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative grid gap-6 bg-dark-tdao px-5 py-6 sm:gap-8 sm:p-8">
                      {requestReview}
                      {requestServices}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </Popover.Group>
    </div>
  )
}
