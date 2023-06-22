import { FieldArray } from 'formik'
import React, { useState } from 'react'
import Drawer from '../slugView/Drawer'
import MechanismCardSupplyvsDemand from '../tdf/MechanismCardSupplyvsDemand'
// import { useUser } from '@clerk/clerk-react/dist/hooks/useUser'
import { supplyDemandType } from '../../lib/helper'
import MechanismTile from '../tdf/MechanismTile'

export const FormCardSupplyvsDemand = ({
  field,
  values,
  mechanismTemplates,
  setFieldValue,
  // subscription,
}) => {
  // const { user } = useUser()
  // const admin = user?.publicMetadata?.admin || false
  let [mechanismIndex, setMechanismIndex] = useState(0)

  const mechTemplates = mechanismTemplates.map((obj) => ({ ...obj }))
  const [isOpen, setIsOpen] = useState(false)

  const handleEditMechanism = (index) => {
    setMechanismIndex(index)
    setIsOpen(true)
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
                            <MechanismTile
                              input={input}
                              index={index}
                              arrayHelpers={arrayHelpers}
                              handleEditMechanism={handleEditMechanism}
                            />
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
                <div className="h-60 overflow-auto rounded-lg border-2 border-slate-300">
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
                            <MechanismTile
                              input={input}
                              index={index}
                              arrayHelpers={arrayHelpers}
                              handleEditMechanism={handleEditMechanism}
                            />
                          ) : (
                            <></>
                          )}
                        </>
                      ))}
                  </div>
                </div>
              </div>
            </div>
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
                              <MechanismTile
                              input={input}
                              index={index}
                              arrayHelpers={arrayHelpers}
                              handleEditMechanism={handleEditMechanism}
                            />
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
                <div className="h-60 overflow-auto rounded-lg border-2 border-slate-300">
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
                              <MechanismTile
                              input={input}
                              index={index}
                              arrayHelpers={arrayHelpers}
                              handleEditMechanism={handleEditMechanism}
                            />
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
