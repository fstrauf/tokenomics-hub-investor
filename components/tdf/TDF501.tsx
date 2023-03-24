import { Field } from 'formik'
// import BreakdownBox from '../slugView/breakdown-box'
import ResourceSection from './ResourceSection'
import { getActiveDesignPhase } from '../../lib/helper'
import FormCardSupplyDemand from '../form/FormCardSupplyDemand'
import { FormTable } from '../form/FormTable'
import ExampleSection from './ExampleSection'
import Tiptap from '../TipTap'

//taking stock
export default function TDF501({ props, values, activePhase, setFieldValue }) {
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
    <div>
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
        {designPhase.name}
      </h5>
      <div className="grid w-full grid-cols-2 gap-2 rounded-lg border-2 p-2">
        <div className="col-span-2">
          <Field
            name="Mechanism"
            component={FormCardSupplyDemand}
            phaseId={designPhase.phaseId}
            setFieldValue={setFieldValue}
            values={values}
            mechanismTemplates={props.mechanismTemplates}
          />
        </div>
        <div className="col-span-2">
          {/* <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
            Incentive Summary
          </h5> */}
          <Field
            name={`DesignElement.${values?.DesignElement?.findIndex(
              (de) => de.designPhaseId === 501
            )}.content`}
            component={FormTable}
            users={values?.PostUser || []}
            placeholder="Select categories"
            phaseId={designPhase.phaseId}
          />
        </div>

        <ResourceSection content={designPhase.Resources} />
        <ExampleSection
          content={props.posts}
          exampleField={designPhase.postDataElement}
          exampleDetail={ExampleDetail}
        />
      </div>
    </div>
  )
}
