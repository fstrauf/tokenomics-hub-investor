import Router from 'next/router'
import { useUser } from '@clerk/clerk-react/dist/hooks/useUser'
import toast, { Toaster } from 'react-hot-toast'
import { Menu, Transition, Dialog } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css'
import {
  mandatoryFormValidate,
  notifyStatusUpdate,
  postStatus,
} from '../../lib/helper'
import { WEBSITE_URL_BASE } from '../../lib/constants'
import GreaterThanArrow from '../../public/svg/greaterThanArrow'
import AddUserIcon from '../../public/svg/addUserIcon'
import SettingIcon from '../../public/svg/settingsIcon'
import Modal from 'react-modal'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

export default function DesignCard({ posts, context }) {
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
          onClick: () => deleteDraft(id),
        },
        {
          label: 'No',
        },
      ],
    })
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

  const clickOnGreaterThanArrow = () => {
    console.log('clicked on greater arrow')
  }

  const clickOnAddUser = () => {
    console.log('clicked on add user')
  }
  const clickOnSettings = () => {
    console.log('clicked on settings')
  }

  const [modalIsOpen, setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <div className="static overflow-x-auto rounded-[10px] bg-white px-8 py-6">
      <Toaster />
      <div className="mb-2 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4">
        {posts?.map((post, index) => {
          return (
            <div key={index} className="h-120  rounded-[10px] border">
              <div className="grid h-[90px] grid-cols-2">
                <div className="ml-4 mt-2 text-lg font-bold">{post.title}</div>
                <div className="mt-[11px] mr-2 flex  justify-end text-lg font-bold">
                  <span
                    className="cursor-pointer"
                    onClick={clickOnGreaterThanArrow}
                  >
                    {<GreaterThanArrow />}
                  </span>
                </div>
              </div>
              <div className="">
                <div className="grid h-[30px] grid-cols-2 rounded-b-[10px] border-t">
                  <div className="flex cursor-pointer justify-center border-r">
                    <span className="mt-1" onClick={openModal}>
                      {<AddUserIcon />}
                    </span>
                    <Modal
                      isOpen={modalIsOpen}
                      onRequestClose={closeModal}
                      style={customStyles}
                      contentLabel="Example Modal"
                    >
                      <button onClick={closeModal}>close</button>
                      <div>Add User Screen..</div>
                    </Modal>
                  </div>

                  <div className="flex cursor-pointer justify-center">
                    <span className="mt-1" onClick={clickOnSettings}>
                      {<SettingIcon />}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
