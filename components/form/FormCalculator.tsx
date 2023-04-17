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
        console.log('calculation created')
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
        console.log('calculation updated')
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <div className="relative">
      <FieldArray
        name="calculationRows"
        render={(arrayHelpers) => (
          <>
            <h1 className="mb-4text-black section-head text-base font-bold">
              Monthly Emissions
            </h1>
            <div className="mb-4 overflow-auto rounded-lg border-2 p-2">
              <div className="mb-3 grid grid-cols-[auto_150px_150px_150px_150px_80px_40px] gap-3">
                {monthHeader}
                {values?.calculationRows?.length > 0 &&
                  values?.calculationRows?.map((input, index) => (
                    <>
                      {!input.isEpochDistro ? (
                        monthRow(index, input, arrayHelpers)
                      ) : (
                        <></>
                      )}
                    </>
                  ))}
              </div>
              <button
                type="button"
                className="mt-3 mr-3 rounded-md bg-dao-red px-2 py-1 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                onClick={() =>
                  arrayHelpers.push({
                    category: 'Treasury ' + (values?.calculationRows?.length + 1),
                    lockupPeriod: 5,
                    unlockPeriod: 12,
                    percentageAllocation: 10,
                    color: '#823',
                    isEpochDistro: false,
                    epochDurationInSeconds: 0,
                    initialRewardPerSecond: 0,
                    rewardReductionPerEpoch: 0,
                  })
                }
              >
                Add Month Category
              </button>
            </div>
            <h1 className="mb-4text-black section-head text-base font-bold">
              Epoch Based Emissions
            </h1>
            <div className="mb-4 overflow-auto rounded-lg border-2 p-2">
              <div className="mb-3 grid grid-cols-[auto_auto_auto_150px_150px_120px_80px_40px] gap-2">
                {epochHeader}
                {values?.calculationRows?.length > 0 &&
                  values?.calculationRows?.map((input, index) => (
                    <>
                      {input.isEpochDistro ? (
                        epochRow(index, input, arrayHelpers)
                      ) : (
                        <></>
                      )}
                    </>
                  ))}
              </div>
              <button
                type="button"
                className="mt-3 rounded-md bg-dao-red px-2 py-1 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                onClick={() =>
                  arrayHelpers.push({
                    category: 'Community ' + (values?.calculationRows?.length + 1),
                    lockupPeriod: 5,
                    unlockPeriod: 12,
                    percentageAllocation: 10,
                    color: '#Fe1',
                    isEpochDistro: true,
                    epochDurationInSeconds: 126144000,
                    initialEmissionPerSecond: 0.2397,
                    emissionReductionPerEpoch: 0.5,
                  })
                }
              >
                Add Epoch Category
              </button>
            </div>
          </>
        )}
      />
    </div>
  )
}

export default FormCalculator
