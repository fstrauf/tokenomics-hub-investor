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
    const body = { post }
    try {
      await fetch(`/api/post/updatePostId`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      notifyStatusUpdate(
        post.authorEmail,
        postStatus.published,
        `${WEBSITE_URL_BASE}/${post.id}`
      )
      toast.success('Published', { position: 'bottom-right' })
      setSubmitting(false)
      await Router.push('/')
  
    } catch (error) {
      toast.error(error, { position: 'bottom-right' })
    }
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
