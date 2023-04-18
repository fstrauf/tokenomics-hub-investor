import { useFormikContext } from 'formik'
import { useEffect } from 'react'
import { designElementStatusUpdate } from '../../lib/designElementStatusField'
import { getActiveDesignPhase } from '../../lib/helper'
// import FormImageSelect from '../form/FormImageSelect'
import FormResources from '../form/FormResources'
import ResourceSection from './ResourceSection'
import ExampleSection from './ExampleSection'
import WalkthroughSection from './WalkthroughSection'

export default function TDF804({ props, values, activePhase }) {
  const designPhase = getActiveDesignPhase(props.designPhases, activePhase)
  const { setFieldValue, touched } = useFormikContext()

  useEffect(() => {
    designElementStatusUpdate(values, designPhase.phaseId, setFieldValue)
  }, [])

  return (
    <div className="flex flex-col">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
        {designPhase.name}
      </h5>
      <div className="mb-6">
        {/* <label className="mb-2 block text-sm font-medium text-gray-900">
          Resources
        </label> */}
        <p className="mb-2 text-xs font-extralight text-gray-500">
          List all links to further reading
        </p>
      </div>
      <FormResources values={values} postId={props.post.id} />
      <ResourceSection content={designPhase.Resources} />
      <ExampleSection
        presetCategories={values.categories}
        presetTags={values.tags}
        props={props}
        exampleField={designPhase.postDataElement}
        exampleDetail={undefined}
      />
      <WalkthroughSection />
    </div>
  )
}
