// import { useState } from 'react'
// import { Dialog, Transition } from '@headlessui/react'
// import dynamic from 'next/dynamic'
// import toast, { Toaster } from 'react-hot-toast'
import { useState } from 'react'
import FormRating from './formRating'
import { useUser } from '@clerk/clerk-react/dist/hooks/useUser'
import Drawer from './Drawer'

export function RatingDialog({ post }) {
  let [isOpen, setIsOpen] = useState(false)
  let [isLoading, setIsLoading] = useState(false)
  let [userReview, setUserReview] = useState({
    userReviewUtility: '',
    userReviewDemandDriver: '',
    userReviewValueCreation: '',
    userReviewValueCapture: '',
    userReviewBusinessModel: '',
    tokenUtilityStrength: 0,
    businessModelStrength: 0,
    valueCreationStrength: 0,
    valueCaptureStrength: 0,
    demandDriversStrength: 0,
  })

  const { user } = useUser()

  // function closeModal() {
  //   setIsOpen(false)
  // }

  // async function openModal() {
  //   const postId = post.id
  //   const authorClerkId = user.id

  //   setIsLoading(true)
  //   //get latest review from db
  //   const body = { postId, authorClerkId }

  //   const response = await fetch('/api/get/getUserRating', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(body),
  //   })

  //   if (!response.ok) {
  //     const error = await response.text()
  //     toast.error(JSON.parse(error).error, { position: 'bottom-right' })
  //     throw new Error(error)
  //   } else {
  //     const userRating = await response.json()
  //     // console.log("🚀 ~ file: ratingDialog.tsx:49 ~ openModal ~ userRating", userRating)
  //     setUserReview(userRating)

  //     toast.success('Changes auto-saved ', { position: 'bottom-right' })
  //   }
  //   setIsLoading(false)
  //   setIsOpen(true)
  // }

  return (
    <>
      {/* <button
        onClick={openModal}
        disabled={isLoading}
        className="h-10 w-28 rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"
      >
        Add Rating
      </button> */}
      <button
        disabled={isLoading}
        className="h-10 w-28 rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"
        onClick={() => setIsOpen(true)}
      >
        Add Rating
      </button>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <FormRating post={post} userReview={userReview} />
      </Drawer>      
    </>
  )
}
