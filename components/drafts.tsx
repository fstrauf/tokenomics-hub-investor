import Router from 'next/router'
import { useUser } from '@clerk/clerk-react/dist/hooks/useUser'
import {
  postStatus,
  notifyStatusUpdate,
  mandatoryFormValidate,
} from '../lib/helper'
import toast, { Toaster } from 'react-hot-toast'
import { WEBSITE_URL_BASE } from '../lib/constants'
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; 

export default function Drafts({ posts, context }) {
  const { user } = useUser()
  const [isSubmitting, setSubmitting] = useState(false)
  const contributor = user?.publicMetadata?.contributor || false

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
    setSubmitting(true)
    await fetch(`/api/post/delete/${id}`, {
      method: 'PUT',
    })
    setSubmitting(false)
    await Router.push(`/${context}`)
  }

  const confirmDelete = async (id: String) => {
    confirmAlert({
      message: 'Are you sure to delete this draft?.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteDraft(id)
        },
        {
          label: 'No',
        }
      ]
    });
  }

  async function sendToReview(
    // event: MouseEvent<HTMLButtonElement, MouseEvent>,
    post,
    close
  ): void {
    const errors = mandatoryFormValidate(post)

    if (Object.keys(errors).length > 0) {
      toast.error('Some required fields are missing!', {
        position: 'bottom-right',
      })
    } else {
      setSubmitting(true)
      const postId = post.id
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
        notifyStatusUpdate(
          post.authorEmail,
          postStatus.reviewRequired,
          `${WEBSITE_URL_BASE}/editPost/${postId}`
        )
      }
      setSubmitting(false)
      close()
      await Router.replace(Router.asPath)
    }
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

  return (
    <div className="static overflow-x-auto">
      <Toaster />

      <table className="mb-5 w-full text-left text-sm text-gray-500">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th scope="col" className="py-3 px-6">
              Title
            </th>
            <th scope="col" className="py-3 px-6">
              Author
            </th>
            <th scope="col" className="py-3 px-6">
              Status
            </th>
            <th scope="col" className="py-3 px-6"></th>
          </tr>
        </thead>
        <tbody>
          {posts?.map((post, index) => {
            return (
              <tr key={index} className="border-b bg-white ">
                <th
                  scope="row"
                  className="whitespace-nowrap py-2 px-3 font-medium text-gray-900 "
                >
                  <p>{post.title}</p>
                </th>
                <td className="py-2 px-3">
                  <p>{post?.author}</p>
                </td>
                <td className="py-2 px-3">
                  <p>{post?.status}</p>
                </td>
                <td>
                  <Menu
                    as="div"
                    className="z-60 static inline-block w-28 text-left "
                  >
                    {({ close }) => (
                      <>
                        <div>
                          <Menu.Button className="inline-flex justify-center rounded-md bg-dao-red px-4 py-2 align-middle text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
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
                                        '/editPost/[id]',
                                        `/editPost/${post.id}`
                                      )
                                    }
                                    className={`${
                                      active
                                        ? 'bg-dao-red text-white'
                                        : 'text-gray-900'
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm disabled:opacity-70`}
                                  >
                                    Edit
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => sendToReview(post, close)}
                                    className={`${
                                      active
                                        ? 'bg-dao-red text-white'
                                        : 'text-gray-900'
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
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={(e) =>
                                      reviewComplete(e, post, close)
                                    }
                                    className={`${
                                      active
                                        ? 'bg-dao-red text-white'
                                        : 'text-gray-900'
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
                                      active
                                        ? 'bg-dao-red text-white'
                                        : 'text-gray-900'
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
                                      active
                                        ? 'bg-dao-red text-white'
                                        : 'text-gray-900'
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
                      </>
                    )}
                  </Menu>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
