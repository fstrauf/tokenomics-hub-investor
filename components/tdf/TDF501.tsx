import { Field } from 'formik'
// import BreakdownBox from '../slugView/breakdown-box'
import ResourceSection from './ResourceSection'
import { getActiveDesignPhase } from '../../lib/helper'
import FormCardSupplyDemand from '../form/FormCardSupplyDemand'
import { FormTable } from '../form/FormTable'
import ExampleSection from './ExampleSection'
import Tiptap from '../TipTap'
import { useEffect } from 'react'
import { designElementStatusUpdate } from '../../lib/designElementStatusField'

//taking stock
export default function TDF501({ props, values, activePhase, setFieldValue }) {
  const designPhase = getActiveDesignPhase(props.designPhases, activePhase)


  useEffect(() => {
    designElementStatusUpdate(values, designPhase.phaseId, setFieldValue)
  }, [])

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
    <div className="flex flex-col">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
        {designPhase.name}
      </h5>
      <Field
        name="Mechanism"
        component={FormCardSupplyDemand}
        phaseId={designPhase.phaseId}
        setFieldValue={setFieldValue}
        values={values}
        mechanismTemplates={props.mechanismTemplates}
      />
      <Field
        name={`DesignElement.${values?.DesignElement?.findIndex(
          (de) => de.designPhasesId.toString() === '302'
        )}.content`}
        component={FormTable}
        users={values?.PostUser || []}
        placeholder="Select categories"
        phaseId={designPhase.phaseId}
      />

      <ResourceSection content={designPhase.Resources} />
      <ExampleSection
        presetCategories={values.categories}
        presetTags={values.tags}
        // content={props.posts}
        props={props}
        exampleField={designPhase.postDataElement}
        exampleDetail={ExampleDetail}
      />
    </div>
  )
}
