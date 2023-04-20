// import { Popover, Transition } from '@headlessui/react'
// import Link from 'next/link'
// import { Fragment, useState } from 'react'
// import { mandatoryFormValidate, notifyDiscord, postStatus, postType } from '../../lib/helper'
// import toast from 'react-hot-toast'
import { WEBSITE_URL_BASE } from '../../lib/constants'
import Router from 'next/router'
import { notifyStatusUpdate, postStatus } from '../../lib/helper'
import toast from 'react-hot-toast'

export default function PublishPost({
  active,
  post,
  setSubmitting,
  isSubmitting,
  contributor,
}) {
  const publishPost = async (post) => {
    setSubmitting(true)
    await fetch(`/api/post/publish/${post.id}`, {
      method: 'PUT',
    })
    notifyStatusUpdate(
      post.authorEmail,
      postStatus.published,
      `${WEBSITE_URL_BASE}/posts/${post.slug}`
    )
    toast.success('Published', { position: 'bottom-right' })
    setSubmitting(false)
    await Router.push('/')
  }
  return (
    <button
      onClick={() => publishPost(post)}
      className={`${
        active ? 'bg-dao-red text-white' : 'text-gray-900'
      } group flex w-full items-center rounded-md px-2 py-2 text-sm disabled:opacity-70`}
      disabled={
        isSubmitting ||
        !contributor ||
        post.status !== postStatus.reviewComplete
      }
    >
      Publish
    </button>
  )
}
