import { Field } from 'formik'
import BreakdownBox from '../slugView/breakdown-box'
import ResourceSection from './ResourceSection'

export default function TDF603({ props, activePhase }) {
  const designPhase = props.designPhases.find(
    (adp) => String(adp.phaseId) === '603'
  )
  return (
    <div className="grid w-full grid-cols-1 gap-2 rounded-lg border-2 p-2">
      <div className="">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
          {designPhase.name}
        </h5>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-900">
          Resources
        </label>
        <ResourceSection content={designPhase.Resources} />
      </div>
    </div>
  )
}
