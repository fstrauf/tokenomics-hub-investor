import { Popover } from '@headlessui/react'
import { useState } from 'react'
import {
  mandatoryFormValidate,
  notifyDiscord,
  postStatus,
  postType,
} from '../../lib/helper'
import toast from 'react-hot-toast'
import { WEBSITE_URL_BASE } from '../../lib/constants'
import HeaderComboSection from '../HeaderComboSection'
import HeaderGenericSection from '../HeaderGenericSection'
import { useRouter } from 'next/router'

export default function HelpButton({
  values,
  setIsRequestReviewOpen,
  setreviewRequiredFields,
}) {
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
  const router = useRouter()

  async function sendToReview(
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

  const requestReview = (
    <button
      type="button"
      onClick={() => handleReviewClick(values)}
      className={`bg-white text-left rounded-md bg-clip-text py-2 px-4 text-transparent hover:bg-dao-red`}
      disabled={isReviewSubmitting}
    >
      Request Review
    </button>
  )

  return (
    <div className="">
      <Popover.Group as="nav" className="hidden space-x-10 md:flex">
        <HeaderComboSection classNames={classNames} title="Review" boxed={true}>
          <HeaderGenericSection
            pathName="/bookAnExpert"
            title="Request Design Services"
          />
          {requestReview}
        </HeaderComboSection>
      </Popover.Group>
    </div>
  )
}
