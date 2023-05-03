// import { Popover, Transition } from '@headlessui/react'
// import Link from 'next/link'
// import { Fragment, useState } from 'react'
// import { mandatoryFormValidate, notifyDiscord, postStatus, postType } from '../../lib/helper'
import toast from 'react-hot-toast'
import { WEBSITE_URL_BASE } from '../../lib/constants'
import Router from 'next/router'
import { notifyStatusUpdate, postStatus } from '../../lib/helper'

export default function ReviewComplete({ active, post, setSubmitting, isSubmitting, contributor }) {

  async function reviewComplete(
    event: MouseEvent<HTMLButtonElement, MouseEvent>,
    post,
    close
  ): void {
    const postId = post.id
    const body = { status: postStatus.reviewComplete, postId }

    setSubmitting(true)

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
      toast.success('Review completed', { position: 'bottom-right' })
      notifyStatusUpdate(
        post.authorEmail,
        postStatus.reviewComplete,
        `${WEBSITE_URL_BASE}/editDesign/${postId}`
      )
    }
    setSubmitting(false)
    close()
    await Router.replace(Router.asPath)
  }

  return (
    <button
    onClick={(e) => reviewComplete(e, post, close)}
    className={`${
      active ? 'bg-dao-red text-white' : 'text-gray-900'
    } group flex w-full items-center rounded-md px-2 py-2 text-sm disabled:opacity-70`}
    disabled={
      isSubmitting ||
      !contributor ||
      post.status !== postStatus.reviewRequired
    }
  >
    Review Complete
  </button>
  )
}
