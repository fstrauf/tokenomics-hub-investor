import { FieldArray } from 'formik'
import React, { useState } from 'react'
import XMarkIcon from '../../public/svg/xmarkicon'
import Drawer from '../slugView/Drawer'
import MechanismCard from '../tdf/MechanismCard'

export const FormCardSupplyDemand = ({
  field,
  // form,
  // phaseId,
  mechanismImpactFactors,
}) => {
  let [isOpen, setIsOpen] = useState(false)
  let [mechanismIndex, setMechanismIndex] = useState(0)

  const handleNewMechanism = (arrayHelpers, isSink) => {
    arrayHelpers.push({
      user: '',
      mechanism: '',
      descriptiom: '',
      isSink: isSink,
      impactFactors: [{ factor: '', isDynamic: true, impactOnQuantity: '' }],
    })
    setMechanismIndex(field.value?.length)
    setIsOpen(true)
  }
  const handleEditMechanism = (index) => {
    setMechanismIndex(index)
    setIsOpen(true)
  }

  const mechanismTile = (input, index, arrayHelpers) => {
    return (
      <div
        key={index}
        className="h-24 w-44 rounded-md border-2 border-dao-green text-xs"
      >
        <button
          className="relative float-right"
          onClick={() => arrayHelpers.remove(index)}
          type="button"
        >
          <XMarkIcon className="h-3 w-3" aria-hidden="true" />
        </button>
        <button
          className="h-full w-full"
          onClick={() => handleEditMechanism(index)}
        >
          <p className="">{input.user}</p>
          <p className="">{input.mechanism}</p>
        </button>
      </div>
    )
  }

  const emissionTile = (input, index) => {
    return (
      <div
        key={index}
        className="h-24 w-44 rounded-md border-2 border-dao-green text-xs"
      >
        <div
          className="h-full w-full"
          // onClick={() => handleEditMechanism(index)}
        >
          <p className="">{input.user}</p>
          <p className="">{input.mechanism}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-x-auto">
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <MechanismCard
          field={field}
          mechanismIndex={mechanismIndex}
          mechanismImpactFactors={mechanismImpactFactors}
        />
      </Drawer>
      <FieldArray
        name={field.name}
        render={(arrayHelpers) => (
          <>
            <div className="flex h-128 flex-wrap">
              <div className="w-1/2 bg-slate-200">
                <p>Supply</p>
                <div key={4711} className="flex flex-row flex-wrap gap-2">
                  {field.value?.length > 0 &&
                    field.value?.map((input, index) => (
                      <>
                        {!input.isSink ? (
                          <>{mechanismTile(input, index, arrayHelpers)}</>
                        ) : (
                          <></>
                        )}
                      </>
                    ))}

                  <button
                    type="button"
                    className="h-24 w-44 rounded-md border-2 border-dao-green text-xs font-bold"
                    onClick={() => handleNewMechanism(arrayHelpers, false)}
                  >
                    Add Mechanism
                  </button>
                </div>

              </div>

              <div className="w-1/2 bg-slate-400">
                <p>Demand</p>
                <div key={4811} className="flex flex-row flex-wrap gap-2">
                  {field.value?.length > 0 &&
                    field.value?.map((input, index) => (
                      <>
                        {input.isSink ? (
                          <>{mechanismTile(input, index, arrayHelpers)}</>
                        ) : (
                          <></>
                        )}
                      </>
                    ))}
                  <button
                    type="button"
                    className="h-24 w-44 rounded-md border-2 border-dao-green text-xs font-bold"
                    onClick={() => handleNewMechanism(arrayHelpers, true)}
                  >
                    Add Mechanism
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      />
    </div>
  )
}

export default FormCardSupplyDemand
