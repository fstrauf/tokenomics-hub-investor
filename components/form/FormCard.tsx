import { FieldArray } from 'formik'
import React, { useState } from 'react'
import XMarkIcon from '../../public/svg/xmarkicon'
import Drawer from '../slugView/Drawer'
import MechanismCard from '../tdf/MechanismCard'

export const FormCard = ({ field, form, phaseId, mechanismImpactFactors }) => {
  let [isOpen, setIsOpen] = useState(false)
  let [mechanismIndex, setMechanismIndex] = useState(0)

  const handleNewMechanism = (arrayHelpers) => {
    arrayHelpers.push({
      user: '',
      mechanism: '',
      descriptiom: '',
      isSink: true,
      impactFactors: [{factor: '', isDynamic: true, impactOnQuantity: ''}],
    })
    setMechanismIndex(field.value?.length)
    setIsOpen(true)
  }
  const handleEditMechanism = (index) => {
    setMechanismIndex(index)
    setIsOpen(true)
  }

  return (
    <div className="relative overflow-x-auto">
      <FieldArray
        name={field.name}
        
        render={(arrayHelpers) => (
          <>
            <div key={4711} className="flex flex-row flex-wrap gap-2">
              {field.value?.length > 0 &&
                field.value?.map((input, index) => (
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
                ))}
              <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
                <MechanismCard field={field} mechanismIndex={mechanismIndex} mechanismImpactFactors={mechanismImpactFactors} />
              </Drawer>
              <button
                type="button"
                className="h-24 w-44 rounded-md border-2 border-dao-green text-xs font-bold"
                onClick={() => handleNewMechanism(arrayHelpers)}
              >
                Add Mechanism
              </button>
            </div>
          </>
        )}
      />
    </div>
  )
}

export default FormCard
