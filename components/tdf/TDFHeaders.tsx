import { Field } from 'formik'
import BreakdownBox from '../slugView/breakdown-box'
import ResourceSection from './ResourceSection'

export default function TDFHeaders({ props, values }) {
  const designPhase = props.designPhases.find(
    (adp) => String(adp.phaseId) === '101'
  )
  return (
    <div className="grid w-full grid-cols-2 gap-2 rounded-lg border-2 p-2">
      <div className="col-span-2">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
          {designPhase.name}
        </h5>
        <ResourceSection content={designPhase.Resources} />
      </div>
    </div>
  )
}
