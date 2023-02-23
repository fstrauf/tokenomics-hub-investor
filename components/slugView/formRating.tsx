import { ErrorMessage, Field, Form, Formik } from 'formik'
// import dynamic from 'next/dynamic'
import toast, { Toaster } from 'react-hot-toast'
import FormText from '../form/FormText'
import BreakdownBox from './breakdown-box'
import FormStrength from '../form/FormStrength'
import { useUser } from '@clerk/clerk-react/dist/hooks/useUser'
import { useState } from 'react'
import Tooltip from './Tooltip'

export default function FormRating({ post, userReview }) {
  const { user } = useUser()
  let initialValues = post
  Object.assign(initialValues, userReview)
  const [tooltipStatus, setTooltipStatus] = useState(0)

  const submitData = async (values, { setSubmitting }) => {
    const userId = user?.id
    const body = { values, userId }
    try {
      const response = await fetch('/api/post/saveUserStrengthRating', {
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
        toast.success('rating saved ', { position: 'bottom-right' })
        //   setPostId(JSON.parse(id).id)
      }

      setSubmitting(false)
      console.log('Rating saved')
    } catch (error) {
      console.error(error)
    }
  }

  const validate = (values) => {
    const errors = {}

    if (!values.userReviewUtility) {
      errors.userReviewUtility = 'Required'
    }
    if (values.tokenUtilityStrength < 1 || values.tokenUtilityStrength > 100) {
      errors.tokenUtilityStrength = 'Rating between 1-100'
    }
    if (!values.userReviewDemandDriver) {
      errors.userReviewDemandDriver = 'Required'
    }
    if (!values.demandDriversStrength) {
      errors.demandDriversStrength = 'Required'
    }
    if (!values.userReviewValueCreation) {
      errors.userReviewValueCreation = 'Required'
    }
    if (!values.valueCreationStrength) {
      errors.valueCreationStrength = 'Required'
    }
    if (!values.userReviewValueCapture) {
      errors.userReviewValueCapture = 'Required'
    }
    if (!values.valueCaptureStrength) {
      errors.valueCaptureStrength = 'Required'
    }
    if (!values.businessModelStrength) {
      errors.userReviewBusinessModel = 'Required'
    }
    if (!values.businessModelStrength) {
      errors.businessModelStrength = 'Required'
    }

    //...

    return errors
  }

  return (
    <div className="p-4">
      <Formik
        initialValues={initialValues}
        onSubmit={submitData}
        validate={validate}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <Toaster />
            <div className="grid">
              <BreakdownBox
                value={post?.tokenUtility}
                strength={Number(post?._avg?.tokenUtilityStrength.toFixed(1)) || 0}
                title="Token Utility:"
              />
              <div className="flex">
                <Field
                  name="userReviewUtility"
                  as={FormText}
                  placeholder="Your Feedback"
                />
                <div className="ml-3">
                  <label className="mb-2 block text-sm font-medium text-gray-900 ">
                    Strength
                  </label>
                  <Field
                    type="number"
                    name="tokenUtilityStrength"
                    className="block w-16 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
                  />
                </div>
                <Tooltip
                // tooltipStatus={tooltipStatus}
                // setTooltipStatus={setTooltipStatus}
                >
                  <div>
                    <span className="text-xs font-bold">Factor: </span>
                    <span className="text-xs">
                      Clarity of goals, Relevance, Product alignment
                    </span>
                    <p>
                      <span className="text-xs font-bold">0-20: </span>
                      <span className="text-xs">No relevant token use</span>
                    </p>
                    <p>
                      <span className="text-xs font-bold">21-40: </span>
                      <span className="text-xs">
                        The token can be used for low-relevant issues or its use
                        has not been clearly defined
                      </span>
                    </p>
                    <p>
                      <span className="text-xs font-bold">41-60: </span>
                      <span className="text-xs">
                        The goals of the token are clear but not very relevant{' '}
                      </span>
                    </p>
                    <p>
                      <span className="text-xs font-bold">61-80: </span>
                      <span className="text-xs">
                        The token is relevant but the goals of the token are not
                        very clear or have the potential of being misused
                      </span>
                    </p>
                    <p>
                      <span className="text-xs font-bold">81-100: </span>
                      <span className="text-xs">
                        The goals of the token are clear and aligned with the
                        product. Its relevance for stakeholders is high
                      </span>
                    </p>
                  </div>
                </Tooltip>
              </div>

              <div className="flex justify-between">
                <ErrorMessage name="userReviewUtility">
                  {(msg) => <div className="font-bold text-red-600">{msg}</div>}
                </ErrorMessage>
                <ErrorMessage name="tokenUtilityStrength">
                  {(msg) => <div className="font-bold text-red-600">{msg}</div>}
                </ErrorMessage>
              </div>

              <BreakdownBox
                value={post?.demandDrivers}
                strength={Number(post?._avg?.demandDriversStrength.toFixed(1)) || 0}
                title="Demand Driver:"
              />
              <div className="flex">
                <Field
                  name="userReviewDemandDriver"
                  as={FormText}
                  placeholder="Your Feedback"
                />
                <div className="ml-3">
                  <label className="mb-2 block text-sm font-medium text-gray-900 ">
                    Strength
                  </label>
                  <Field
                    type="number"
                    name="demandDriversStrength"
                    className="block w-16 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
                  />
                </div>
                <Tooltip>
                  <div>
                    <span className="text-xs font-bold">Factor: </span>
                    <span className="text-xs">
                      Market trend suitability (aka narrative), Supplys
                      distribution, Products success, Substitutability,
                      Community culture
                    </span>
                    <p>
                      <span className="text-xs font-bold">0-20: </span>
                      <span className="text-xs">
                        There is no reason to buy the token
                      </span>
                    </p>
                    <p>
                      <span className="text-xs font-bold">21-40: </span>
                      <span className="text-xs">
                        There are small signs of possible future product success
                        but there is little upside potential for the token
                      </span>
                    </p>
                    <p>
                      <span className="text-xs font-bold">41-60: </span>
                      <span className="text-xs">
                        The reasons to buy the token are still mainly
                        speculative but the product development and community
                        are thriving
                      </span>
                    </p>
                    <p>
                      <span className="text-xs font-bold">61-80: </span>
                      <span className="text-xs">
                        The market narrative is aligned with the product/token
                        but there are some doubts of its upside potential
                        (inflation, unlocks…)
                      </span>
                    </p>
                    <p>
                      <span className="text-xs font-bold">81-100: </span>
                      <span className="text-xs">
                        The token has upside potential with a well-thought
                        incentive mechanism, represents the communitys culture
                        and has a favourable market narrative
                      </span>
                    </p>
                  </div>
                </Tooltip>
              </div>
              <div className="flex justify-between">
                <ErrorMessage name="userReviewDemandDriver">
                  {(msg) => <div className="font-bold text-red-600">{msg}</div>}
                </ErrorMessage>
                <ErrorMessage name="demandDriversStrength">
                  {(msg) => <div className="font-bold text-red-600">{msg}</div>}
                </ErrorMessage>
              </div>
              <BreakdownBox
                value={post?.valueCreation}
                strength={Number(post?._avg?.valueCreationStrength.toFixed(1)) || 0}
                title="Value Creation:"
              />
              <div className="flex">
                <Field
                  name="userReviewValueCreation"
                  as={FormText}
                  placeholder="Your Feedback"
                />
                <div className="ml-3">
                  <label className="mb-2 block text-sm font-medium text-gray-900 ">
                    Strength
                  </label>
                  <Field
                    type="number"
                    name="valueCreationStrength"
                    className="block w-16 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
                  />
                </div>
                <Tooltip>
                  <div>
                    <span className="text-xs font-bold">Factor: </span>
                    <span className="text-xs">
                      Value to users/other protocols, Key differentiators,
                      Community, User experience
                    </span>
                    <p>
                      <span className="text-xs font-bold">0-20: </span>
                      <span className="text-xs">
                        The protocol/token does not add value to the
                        market/users
                      </span>
                    </p>
                    <p>
                      <span className="text-xs font-bold">21-40: </span>
                      <span className="text-xs">
                        The protocol/token brings some small incremental
                        innovations
                      </span>
                    </p>
                    <p>
                      <span className="text-xs font-bold">41-60: </span>
                      <span className="text-xs">
                        The protocol/token brings decent incremental innovations
                        to the market
                      </span>
                    </p>
                    <p>
                      <span className="text-xs font-bold">61-80: </span>
                      <span className="text-xs">
                        The protocol/token brings some form of radical
                        innovations but its relevance or maturity is
                        questionable
                      </span>
                    </p>
                    <p>
                      <span className="text-xs font-bold">81-100: </span>
                      <span className="text-xs">
                        The product/token brings innovation, has high
                        competitive advantage and is highly relevant in the
                        market
                      </span>
                    </p>
                  </div>
                </Tooltip>
              </div>
              <div className="flex justify-between">
                <ErrorMessage name="userReviewValueCreation">
                  {(msg) => <div className="font-bold text-red-600">{msg}</div>}
                </ErrorMessage>
                <ErrorMessage name="valueCreationStrength">
                  {(msg) => <div className="font-bold text-red-600">{msg}</div>}
                </ErrorMessage>
              </div>
              <BreakdownBox
                value={post?.valueCapture}
                strength={Number(post?._avg?.valueCaptureStrength.toFixed(1)) || 0}
                title="Value Capture:"
              />
              <div className="flex">
                <Field
                  name="userReviewValueCapture"
                  as={FormText}
                  placeholder="Your Feedback"
                />

                <div className="ml-3">
                  <label className="mb-2 block text-sm font-medium text-gray-900 ">
                    Strength
                  </label>
                  <Field
                    type="number"
                    name="valueCaptureStrength"
                    className="block w-16 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
                  />
                </div>
                <Tooltip>
                  <div>
                    <span className="text-xs font-bold">Factor: </span>
                    <span className="text-xs">
                      Market space, Community engagement, Balance of
                      stakeholders incentives, Product development, Utility
                      features, Lock-up models, Distribution, Holding
                      privileges, Dependency of the product on the token,
                      Transparency, Psychology of price, User experience
                    </span>
                    <p>
                      <span className="text-xs font-bold">0-20: </span>
                      <span className="text-xs">
                        Both protocol and token have no way to capture the value
                        it creates
                      </span>
                    </p>
                    <p>
                      <span className="text-xs font-bold">21-40: </span>
                      <span className="text-xs">
                        The protocol retains some very specific users but there
                        is no community and the token value capture is still
                        completely alienated from the value creation
                      </span>
                    </p>
                    <p>
                      <span className="text-xs font-bold">41-60: </span>
                      <span className="text-xs">
                        The protocol has a growing community but members/users
                        often leave and the token value capture has still no
                        clear alignment with the value created
                      </span>
                    </p>
                    <p>
                      <span className="text-xs font-bold">61-80: </span>
                      <span className="text-xs">
                        The protocol has a successful user-retention mechanism
                        and an engaged community but the relevance of the token
                        in this process is questionable
                      </span>
                    </p>
                    <p>
                      <span className="text-xs font-bold">81-100: </span>
                      <span className="text-xs">
                        The protocol has a healthy, varied and sustainable
                        user-retention mechanism, the community is engaged and
                        the token plays a central role in the process
                      </span>
                    </p>
                  </div>
                </Tooltip>
              </div>
              <div className="flex justify-between">
                <ErrorMessage name="userReviewValueCapture">
                  {(msg) => <div className="font-bold text-red-600">{msg}</div>}
                </ErrorMessage>
                <ErrorMessage name="valueCaptureStrength">
                  {(msg) => <div className="font-bold text-red-600">{msg}</div>}
                </ErrorMessage>
              </div>
              <BreakdownBox
                value={post?.businessModel}
                strength={Number(post?._avg?.businessModelStrength.toFixed(1)) || 0}
                title="Business Model:"
              />
              <div className="flex">
                <Field
                  name="userReviewBusinessModel"
                  as={FormText}
                  placeholder="Your Feedback"
                />
                <div className="ml-3">
                  <label className="mb-2 block text-sm font-medium text-gray-900 ">
                    Strength
                  </label>
                  <Field
                    type="number"
                    name="businessModelStrength"
                    className="block w-16 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
                  />
                </div>
                <Tooltip>
                  <div>
                    <span className="text-xs font-bold">Factor: </span>
                    <span className="text-xs">
                      Product-Market Fit, Stakeholders dynamics, Strategy
                    </span>
                    <p>
                      <span className="text-xs font-bold">0-20: </span>
                      <span className="text-xs">
                        The product does not have a viable and logical way of
                        generating revenue
                      </span>
                    </p>
                    <p>
                      <span className="text-xs font-bold">21-40: </span>
                      <span className="text-xs">
                        The product does not generate much revenue and there are
                        doubts about whether the developments will have impact
                      </span>
                    </p>
                    <p>
                      <span className="text-xs font-bold">41-60: </span>
                      <span className="text-xs">
                        The product generates some revenue but clearly based on
                        short-term trends/incentives
                      </span>
                    </p>
                    <p>
                      <span className="text-xs font-bold">61-80: </span>
                      <span className="text-xs">
                        The product generates revenue but these might not be
                        greatly distributed and there are doubts about its
                        long-term sustainability
                      </span>
                    </p>
                    <p>
                      <span className="text-xs font-bold">81-100: </span>
                      <span className="text-xs">
                        Both short-term and long term views are reflected in the
                        revenue scheme with success
                      </span>
                    </p>
                  </div>
                </Tooltip>
              </div>
              <div className="mb-4 flex justify-between">
                <ErrorMessage name="userReviewBusinessModel">
                  {(msg) => <div className="font-bold text-red-600">{msg}</div>}
                </ErrorMessage>
                <ErrorMessage name="businessModelStrength">
                  {(msg) => <div className="font-bold text-red-600">{msg}</div>}
                </ErrorMessage>
              </div>
              <label>Your Rating</label>
              <FormStrength name="tokenStrength" />
              <button
                className="mt-5 mb-5 rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"
                type="submit"
                disabled={isSubmitting}
              >
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
