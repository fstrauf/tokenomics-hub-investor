import toast, { Toaster } from 'react-hot-toast'
import { useAuth } from '@clerk/clerk-react/dist/hooks/useAuth'
import { useState } from 'react'


export const FormCalculator = (props) => {
  const { preloadInitialValues } = props
  const { isSignedIn } = useAuth()
  const [postId, setPostId] = useState(preloadInitialValues.id)
  
  const submitData = async (values, { setSubmitting }) => {
    const body = { values }
    if(!isSignedIn){
      toast.error('Please sign in to save calculations', { position: 'bottom-right' })
      return
    }

    if (values?.id === '') {
      try {
        const response = await fetch('/api/post/newCalculation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })

        if (!response.ok) {
          const error = await response.text()
          toast.error(JSON.parse(error).error, { position: 'bottom-right' })
          throw new Error(error)
        } else {
          const id = await response.text()
          toast.success('Calculation saved ', { position: 'bottom-right' })
          setPostId(JSON.parse(id).id)
        }

        setSubmitting(false)
      } catch (error) {
        console.error(error)
      }
    } else {
      try {
        const response = await fetch('/api/post/updateCalculation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })

        if (!response.ok) {
          const error = await response.text()
          toast.error(JSON.parse(error).error, { position: 'bottom-right' })
          throw new Error(error)
        } else {
          toast.success('Calculation saved ', { position: 'bottom-right' })
        }

        // await Router.push('/');
        setSubmitting(false)
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    
  )
}

export default FormCalculator
