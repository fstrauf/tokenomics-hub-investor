import { FieldArray } from 'formik'
import React, { useState } from 'react'
import XMarkIcon from '../../public/svg/xmarkicon'
import Drawer from '../slugView/Drawer'
import MechanismCardSupplyvsDemand from '../tdf/MechanismCardSupplyvsDemand'
// import { validateTierAccess } from '../../lib/helper'
import { useUser } from '@clerk/clerk-react/dist/hooks/useUser'
// import Link from 'next/link'
import { supplyDemandType } from '../../lib/helper'

export const FormCardSupplyvsDemand = ({
  field,
  values,
  mechanismTemplates,
  setFieldValue,
  // subscription,
}) => {
  const { user } = useUser()
  const admin = user?.publicMetadata?.admin || false
  let [mechanismIndex, setMechanismIndex] = useState(0)

  const mechTemplates = mechanismTemplates.map((obj) => ({ ...obj }))
  const [isOpen, setIsOpen] = useState(false)

  const handleEditMechanism = (index) => {
    setMechanismIndex(index)
    setIsOpen(true)
  }

  const mechanismTile = (input, index, arrayHelpers) => {
    return (
      <div
        key={index}
        className="grid h-24 w-36 content-between rounded-md border-2 border-dao-green p-1 text-xs"
      >
        <div>
          <div className="flex">
            {input?.isSink ? (
              <></>
            ) : (
              <div
                className="mr-2 h-5 w-5 bg-slate-600"
                style={{ background: input.color }}
              ></div>
            )}
            <p className="">{input.name}</p>
          </div>
          {input.isSink ? (
            <></>
          ) : (
            <p className="mt-2">{input.percentageAllocation} %</p>
          )}
        </div>
        <div className="flex h-7 border-t-2">
          <button
            type="button"
            className="w-full"
            onClick={() => handleEditMechanism(index)}
          >
            Edit
          </button>
          <button
            className="relative float-right"
            onClick={() => arrayHelpers.remove(index)}
            type="button"
          >
            <XMarkIcon className="h-3 w-3" aria-hidden="true" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-x-auto">
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        {isOpen && (
          <MechanismCardSupplyvsDemand
            templates={mechTemplates}
            values={values}
            field={field}
            mechanismIndex={mechanismIndex}
            setFieldValue={setFieldValue}
            users={values.PostUser} // mechanismImpactFactors={mechanismImpactFactors}
          />
        )}
      </Drawer>
      <FieldArray
        name={field.name}
        render={(arrayHelpers) => (
          <>
            <div key={87944} className="flex">
              <div className="w-1/2">
                <div className="mb-1 gap-2">
                  <p>Supply</p>
                  <p className="mt-5">Internal</p>
                </div>
                <div className="h-60 overflow-auto rounded-lg border-2 border-slate-300">
                  <div
                    key={4711}
                    className="flex flex-row flex-wrap gap-2 overflow-auto p-2"
                  >
                    {field.value?.length > 0 &&
                      field.value?.map((input, index) => (
                        <>
                          {!input.isSink &&
                          input.supplyDemandType ==
                            supplyDemandType.supplyInternal ? (
                            <>{mechanismTile(input, index, arrayHelpers)}</>
                          ) : (
                            <></>
                          )}
                        </>
                      ))}
                  </div>
                </div>
              </div>
              <div className="relative w-1/2">
                <div className="mb-1 gap-2">
                  <p>Demand</p>
                  <p className="mt-5">Utility</p>
                </div>
                <div className="h-60 rounded-lg border-2 border-slate-300">
                  <div
                    key={4811}
                    className="flex flex-row flex-wrap gap-2 overflow-auto p-2"
                  >
                    {field.value?.length > 0 &&
                      field.value?.map((input, index) => (
                        <>
                          {input.isSink &&
                          input.supplyDemandType ==
                            supplyDemandType.demandUtility ? (
                            <>{mechanismTile(input, index, arrayHelpers)}</>
                          ) : (
                            <></>
                          )}
                        </>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            {/* added code */}
            <div key={87945} className="flex">
              <div className="w-1/2">
                <div className="mb-1 gap-2">
                  <p className="mt-5">External</p>
                </div>
                <div className="h-60 overflow-auto rounded-lg border-2 border-slate-300">
                  <div
                    key={4711}
                    className="flex flex-row flex-wrap gap-2 overflow-auto p-2"
                  >
                    {field.value?.length > 0 &&
                      field.value?.map((input, index) => (
                        <>
                          {!input.isSink &&
                          input.supplyDemandType ==
                            supplyDemandType.supplyExternal ? (
                            <>{mechanismTile(input, index, arrayHelpers)}</>
                          ) : (
                            <></>
                          )}
                        </>
                      ))}
                  </div>
                </div>
              </div>
              <div className="relative w-1/2">


                <div className="mb-1 gap-2">
                  <p className="mt-5">Mechanisms</p>
                </div>
                <div className="h-60 rounded-lg border-2 border-slate-300">
                  <div
                    key={4811}
                    className="flex flex-row flex-wrap gap-2 overflow-auto p-2"
                  >
                    {field.value?.length > 0 &&
                      field.value?.map((input, index) => (
                        <>
                          {input.isSink &&
                          input.supplyDemandType ==
                            supplyDemandType.demandMechanism ? (
                            <>{mechanismTile(input, index, arrayHelpers)}</>
                          ) : (
                            <></>
                          )}
                        </>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      />
    </div>
  )
}

export default FormCardSupplyvsDemand
