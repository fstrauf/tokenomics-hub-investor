import { Field, useFormikContext } from 'formik'
import { getActiveDesignPhase } from '../../lib/helper'
import FormCardDemand from '../form/FormCardDemand'
import ResourceSection from './ResourceSection'
import Tiptap from '../TipTap'
import ExampleSection from './ExampleSection'
import { useEffect } from 'react'
import { designElementStatusUpdate } from '../../lib/designElementStatusField'
import WalkthroughSection from './WalkthroughSection'
import FormErrorMessage from '../form/FormErrorMessage'
// import { validateTierAccess } from '../../lib/helper'
import { useUser } from '@clerk/clerk-react/dist/hooks/useUser'
// import DemandIntro from './DemandIntro'
// import Link from 'next/link'


export default function TDF504({
  props,
  values,
  activePhase,
  reviewRequiredFields,
}) {
  const designPhase = getActiveDesignPhase(props.designPhases, activePhase)
  const { user } = useUser()
  const admin = user?.publicMetadata?.admin || false

  const { setFieldValue, dirty } = useFormikContext()

  useEffect(() => {
    if (dirty) {
      designElementStatusUpdate(values, designPhase.phaseId, setFieldValue)
    }
  }, [dirty])

  let ExampleDetail = ({ onGoBack, example, exampleField }) => {
    return (
      <div className="flex flex-col justify-between">
        <div className="mb-6 mt-6 font-bold">{example.title}</div>
        <div className="ml-2">
          <Tiptap content={example[exampleField]} editMode={false} />
        </div>
        <button
          className="mt-20 w-16 rounded-md border-2 border-dao-red px-1 py-1 text-xs font-medium text-dao-red"
          onClick={onGoBack}
        >
          go back
        </button>
      </div>
    )
  }

  return (
    <div className="relative flex flex-col">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
        {designPhase.name}
      </h5>
      {/* {validateTierAccess(props.Subscription, admin) ? (
        <></>
      ) : (
        <>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="z-10 flex h-full w-full justify-center bg-gray-100 bg-opacity-80">
              <div className="z-9 m-auto mt-1 flex justify-center rounded-md bg-gradient-to-r from-dao-red to-dao-green p-1 shadow-md">
                <div className="flex flex-col items-center rounded-lg bg-white p-4">
                  <h2 className="text-center text-xl font-bold">
                    Access The Demand Builder to Balance Your Supply!
                  </h2>
                  <DemandIntro />
                  <Link href="/manage-subscriptions">
                    <button className="mt-5 rounded-md bg-dao-red px-6 py-4 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                      Subscribe Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )} */}
      <label className="mb-2 block text-xs font-medium text-gray-900">
        Total Supply
      </label>
      <Field
        type="number"
        name="Calculation.totalSupply"
        className="block w-36 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-dao-red focus:ring-dao-red"
        onWheel={(event) => event.currentTarget.blur()}
      />
      <label className="mb-2 block text-xs font-medium text-gray-900">
        Months
      </label>
      <Field
        type="number"
        name="Calculation.months"
        className="block w-36 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-dao-red focus:ring-dao-red"
        onWheel={(event) => event.currentTarget.blur()}
      />
      <label className="mb-2 block text-xs font-medium text-gray-900">
        Start Date
      </label>
      <Field
        type="date"
        name="Calculation.startDate"
        className="block w-36 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-dao-red focus:ring-dao-red"
      />
      <Field
        name="Mechanism"
        component={FormCardDemand}
        phaseId={designPhase.phaseId}
        setFieldValue={setFieldValue}
        values={values}
        mechanismTemplates={props.mechanismTemplates}
      />
      <FormErrorMessage
        field="Mechanism"
        reviewRequiredFields={reviewRequiredFields}
      />

      <ResourceSection content={designPhase.Resources} />
      <ExampleSection
        presetCategories={values.categories}
        presetTags={values.tags}
        props={props}
        exampleField={designPhase.postDataElement}
        exampleDetail={ExampleDetail}
      />
      <WalkthroughSection />
    </div>
  )
}
