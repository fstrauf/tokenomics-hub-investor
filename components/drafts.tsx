import Router from 'next/router'
import { useUser } from '@clerk/clerk-react/dist/hooks/useUser'
import { Toaster } from 'react-hot-toast'
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css'
import ReviewComplete from './tdf/ReviewComplete'
import PublishPost from './tdf/PublishPost'
import SharePost from './tdf/SharePost'

export default function Drafts({ posts, context }) {
  const { user } = useUser()
  const [isSubmitting, setSubmitting] = useState(false)
  const contributor = user?.publicMetadata?.contributor || false

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
          onClick: () => deleteDraft(id),
        },
        {
          label: 'No',
        },
      ],
    })
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
              <>
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
                                          '/editDesign/[id]',
                                          `/editDesign/${post.id}`
                                        )
                                      }
                                      className={`${
                                        active
                                          ? 'bg-dao-red text-white'
                                          : 'text-gray-900'
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
                                      onClick={() =>
                                        confirmDelete(post.id, close)
                                      }
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
              </>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
