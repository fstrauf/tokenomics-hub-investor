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


  return (
    <>
      <button
        disabled={isLoading}
        className="h-10 w-28 rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"
        // onClick={() => setIsOpen(true)}
        onClick={openDrawer}
      >
        Add Rating
      </button>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <FormRating post={post} userReview={userReview} />
      </Drawer>      
    </>
  )
}
