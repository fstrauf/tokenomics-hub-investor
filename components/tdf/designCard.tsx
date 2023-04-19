import Link from 'next/link'
import { Menu, Transition, Dialog } from '@headlessui/react'
import Router from 'next/router'
import { Fragment, useState } from 'react'
import { useUser } from '@clerk/clerk-react/dist/hooks/useUser'
import {
  mandatoryFormValidate,
  notifyStatusUpdate,
  postStatus,
  postType,
} from '../../lib/helper'
import toast from 'react-hot-toast'
import { WEBSITE_URL_BASE } from '../../lib/constants'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

export default function DesignCard({ post, context }) {
  let isReport = post.postType === postType.report
  const { user } = useUser()
  const [isSubmitting, setSubmitting] = useState(false)
  let [isOpen, setIsOpen] = useState(false)
  const contributor = user?.publicMetadata?.contributor || false

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

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
    setSubmitting(false)
    await Router.push('/')
  }

  const deleteDraft = async (id: String) => {
    // console.log('🚀 ~ file: designCard.tsx:44 ~ deleteDraft ~ id:', id)
    setSubmitting(true)
    await fetch(`/api/post/delete/${id}`, {
      method: 'PUT',
    })
    setSubmitting(false)
    await Router.push(`/myDesigns`)
  }

  const confirmDelete = async (id: String) => {
    confirmAlert({
      message: 'Are you sure to delete this draft?.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteDraft(id),
        },
        {
          label: 'No',
        },
      ],
    })
  }

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
        `${WEBSITE_URL_BASE}/editPost/${postId}`
      )
    }
    setSubmitting(false)
    close()
    await Router.replace(Router.asPath)
  }

  // async function sendToReview(
  //   // event: MouseEvent<HTMLButtonElement, MouseEvent>,
  //   post,
  //   close
  // ): void {
  //   const errors = mandatoryFormValidate(post)

  //   if (Object.keys(errors).length > 0) {
  //     toast.error('Some required fields are missing!', {
  //       position: 'bottom-right',
  //     })
  //   } else {
  //     setSubmitting(true)
  //     const postId = post.id
  //     const body = { status: postStatus.reviewRequired, postId }

  //     const response = await fetch('/api/post/updateStatus', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(body),
  //     })

  //     if (!response.ok) {
  //       const error = await response.text()
  //       toast.error(JSON.parse(error).error, { position: 'bottom-right' })
  //       throw new Error(error)
  //     } else {
  //       toast.success('Sent to review', { position: 'bottom-right' })
  //       notifyStatusUpdate(
  //         post.authorEmail,
  //         postStatus.reviewRequired,
  //         `${WEBSITE_URL_BASE}/editPost/${postId}`
  //       )
  //     }
  //     setSubmitting(false)
  //     close()
  //     await Router.replace(Router.asPath)
  //   }
  // }
  return (
    <div key={post.id} className="m-5 grid h-64 w-80 max-w-sm content-between rounded-lg border border-gray-200 bg-white p-2 shadow-md">
      <div className="">
        <span className="font-bold text-gray-700">Title: </span>
        <span className="text-gray-600">{post.title}</span>
      </div>
      <div className="">
        <span className="font-bold text-gray-700">Author: </span>
        <span className="text-gray-600">{post.author}</span>
      </div>
      <div className="">
        <span className="font-bold text-gray-700 ">Post Type: </span>
        <span className="capitalize text-gray-600">{post.postType}</span>
      </div>
      <div className="">
        <span className="font-bold text-gray-700 ">Post Status: </span>
        <span className="capitalize text-gray-600">{post.status}</span>
      </div>
      <div className="flex flex-auto gap-4">
        <h1 className="font-bold text-gray-700">Categories:</h1>
        {post?.categories &&
          post?.categories.map((cat) => (
            <p
              key={cat.value}
              className="rounded-full bg-gray-100 px-3 py-1 text-sm font-bold text-gray-700 shadow-sm"
            >
              {cat?.label}
            </p>
          ))}
      </div>
      <div className="mt-4 flex justify-center space-x-3 p-2 md:mt-6">
        <Link
          // as={isReport ? `/editPost/${post?.id}` : `/editDesign/${post?.id}`}
          // href={isReport ? `/editPost/[id]` : `/editDesign/[id]`}
          as={`/editDesign/${post?.id}`}
          href={`/editDesign/[id]`}
          className=" rounded-lg bg-dao-red px-4 py-2 text-center text-xs font-medium text-white"
        >
          Edit
        </Link>
        <Link
          as={`/posts/${post?.id}`}
          href="/posts/[id]]"
          className=" rounded-lg bg-dao-red px-4 py-2 text-center text-xs font-medium text-white"
        >
          View
        </Link>
        <div className="">
          <Menu as="div" className="z-60 static inline-block text-left">
            {({ close }) => (
              <>
                <div>
                  <Menu.Button className="inline-flex justify-center rounded-md bg-dao-red px-4 py-2 align-middle text-xs font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    Options
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() =>
                              Router.push(
                                '/editDesign/[id]',
                                `/editDesign/${post.id}`
                              )
                            }
                            className={`${
                              active ? 'bg-dao-red text-white' : 'text-gray-900'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm disabled:opacity-70`}
                          >
                            Edit
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
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
                        )}
                      </Menu.Item>
                      {/* <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => sendToReview(post, close)}
                            className={`${
                              active ? 'bg-dao-red text-white' : 'text-gray-900'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm disabled:opacity-70`}
                            disabled={
                              isSubmitting ||
                              !contributor ||
                              post.status === postStatus.reviewRequired
                            }
                          >
                            To Review
                          </button>
                        )}
                      </Menu.Item> */}
                      <Menu.Item>
                        {({ active }) => (
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
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
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
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => confirmDelete(post.id, close)}
                            className={`${
                              active ? 'bg-dao-red text-white' : 'text-gray-900'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm disabled:opacity-70`}
                            disabled={!contributor || isSubmitting}
                          >
                            Delete
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
                <Transition appear show={isOpen} as={Fragment}>
                  <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={closeModal}
                  >
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
                              {/* {values.slug ? ( */}
                              <pre className="text-xs text-gray-500">
                                http://tokenomicshub.xyz/editDesign/
                                {post.id}
                              </pre>
                              {/* ) : (
                                                <pre className="text-sm text-gray-500">
                                                  Save your calculation first
                                                </pre>
                                              )} */}
                            </div>
                            <div className="mt-4">
                              <button
                                className="mr-2 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:bg-dao-red focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                onClick={() =>
                                  navigator.clipboard.writeText(
                                    `http://tokenomicshub.xyz/editDesign/${post.id}`
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
            )}
          </Menu>
        </div>
      </div>
    </div>
  )
}
