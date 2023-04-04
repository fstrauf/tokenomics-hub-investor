import { Field } from 'formik'
import { getActiveDesignPhase } from '../../lib/helper'
import FormCardSupplyDemand from '../form/FormCardSupplyDemand'
// import BreakdownBox from '../slugView/breakdown-box'
import ResourceSection from './ResourceSection'
import TDFCalculator from './TDFCalculator'
import Tiptap from '../TipTap'
import ExampleSection from './ExampleSection'

export default function TDF502({ props, values, activePhase, setFieldValue }) {
  const designPhase = getActiveDesignPhase(props.designPhases, activePhase)

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

      <TDFCalculator
        // preloadInitialValues={props.preloadInitialCalcValues}
        values={values}
      />

      <ResourceSection content={designPhase.Resources} />
      <ExampleSection
        presetCategories={values.categories}
        presetTags={values.tags}
        content={props.posts}
        exampleField={designPhase.postDataElement}
        exampleDetail={ExampleDetail}
      />
    </div>
  )
}
