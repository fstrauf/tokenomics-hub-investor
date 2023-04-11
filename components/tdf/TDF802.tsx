import { Field, useFormikContext } from 'formik'
import { getActiveDesignPhase } from '../../lib/helper'
import FormTipTap from '../form/FormTipTap'

export default function TDF802({ props, values, activePhase }) {
  const designPhase = getActiveDesignPhase(props.designPhases, activePhase)
  const { setFieldValue } = useFormikContext()
  return (
    <div className="m-2">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
        {designPhase.name}
      </h5>

      <div>
        <div className="mb-6">
          <div className="basis-1/4">
            {/* <label className="mb-2 block text-sm font-medium text-gray-900">
              Deep Dive
            </label> */}
            <p className="mb-2 text-xs font-extralight text-gray-500">
              Provide any additional information as well as Token Allocation,
              Vesting and Dsitribution information.
            </p>
          </div>
          <Field
            name="breakdown"
            as={FormTipTap}
            placeholder="Deep Dive"
            onChange={(e) => setFieldValue('breakdown', e)}
          />
        </div>
      </div>
    </div>
  )
}
