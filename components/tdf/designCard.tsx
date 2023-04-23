import Link from 'next/link'
import { Menu, Transition, Dialog } from '@headlessui/react'
import Router from 'next/router'
import { Fragment, useState } from 'react'
import { useUser } from '@clerk/clerk-react/dist/hooks/useUser'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import ReviewComplete from './ReviewComplete'
import PublishPost from './PublishPost'
import SharePost from './SharePost'

export default function DesignCard({ post, context }) {
  // let isReport = post.postType === postType.report
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

  return (
    <div
      key={post.id}
      className="m-5 grid h-64 w-80 max-w-sm content-between rounded-lg border border-gray-200 bg-white p-2 shadow-md"
    >
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
          as={`/editDesign/${post?.id}`}
          href={`/editDesign/[id]`}
          className=" rounded-lg bg-dao-red px-4 py-2 text-center text-xs font-medium text-white"
        >
          Open
        </Link>
        <Link
          as={`/postPreview/${post?.id}`}
          href="/postPreview/[id]]"
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
                            Open
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <SharePost active={active} isSubmitting={isSubmitting} post={post} />
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <ReviewComplete
                            active={active}
                            contributor={contributor}
                            isSubmitting={isSubmitting}
                            post={post}
                            setSubmitting={setSubmitting}
                          />
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <PublishPost
                            active={active}
                            contributor={contributor}
                            isSubmitting={isSubmitting}
                            post={post}
                            setSubmitting={setSubmitting}
                          />
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
              </>
            )}
          </Menu>
        </div>
      </div>
    </div>
  )
}
