import { FieldArray } from 'formik'
import React, { useState } from 'react'
import Drawer from '../slugView/Drawer'
import MechanismCardSupply from '../tdf/MechanismCardSupply'
import { supplyDemandType } from '../../lib/helper'

export const FormCardSupply = ({
  field,
  values,
  mechanismTemplates,
  setFieldValue,
}) => {
  let [mechanismIndex, setMechanismIndex] = useState(0)
  const defaultMechanism = {
    id: '',
    name: `default`,
    summary:
      'Briefly explain what this mechanism incentivises users to do and why they want to do it. (e.g., users are incentivised to buy and stake a token in order to receive token emissions)',
    details:
      '{"type":"doc","content":[{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Explanation"}]},{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"Explain in detail what this mechanism incentivises users to do, why they want to do it and why it has a positive effect on the token. Also explain if this mechanism is a sink –tokens are held/bought, a source –tokens are given out to users, or both –users are required to buy/hold a token but in exchange thet receive tokens.  (e.g., staking incentivises users to stake tokens, thus reducing circulating supply, in order to receive token emissions. This means that this mechanism acts as a sink –users are acquiring/holding a token, but also as a source –users are receiving emissions)"}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Mechanism & Users"}]},{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"How the user interacts with the mechanism"},{"type":"text","text":" "}]},{"type":"paragraph","content":[{"type":"text","text":"1. Users have to…"}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Mechanism demand"}]},{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"How does the mechanism create demand"}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Factors"}]},{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"What factors affect demand"}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Side effects"}]},{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"What are the side effects of this mechanism"}]}]}',
    isSink: true,
    // user: '',
    token: '',
    category: `Mechanism`,
    lockupPeriod: 5,
    unlockPeriod: 12,
    percentageUnlockTGE: 0,
    percentageAllocation: 30,
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    isEpochDistro: false,
    epochDurationInSeconds: 0,
    initialEmissionPerSecond: 0,
    emissionReductionPerEpoch: 0,
    CalculationTimeSeries: [],
    isTemplate: false,
    PostUser: [],
  }

  const mechTemplates = mechanismTemplates.filter((template) => {
    return (
      template.supplyDemandType === supplyDemandType.supplyInternal ||
      template.supplyDemandType === supplyDemandType.supplyExternal
    )
  })
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(defaultMechanism)

  function handleChange(e) {
    if (e.target.value === 'none') {
      setSelectedTemplate(defaultMechanism)
    } else {
      setSelectedTemplate(
        mechTemplates.find((mt) => String(mt.id) === e.target.value)
      )
    }
  }

  const handleNewMechanism = (arrayHelpers, isSink: boolean) => {
    const updateMechanism = selectedTemplate

    updateMechanism.isSink = isSink
    if (isSink) {
      updateMechanism.name =
        updateMechanism.name + ' ' + (field.value?.length + 1)
      updateMechanism.category =
        updateMechanism.category + ' ' + (field.value?.length + 1)
    } else {
      updateMechanism.name = updateMechanism.name
      updateMechanism.category = updateMechanism.name
      updateMechanism.summary = ''
    }

    arrayHelpers.push(updateMechanism)

    setMechanismIndex(field.value?.length)
    setIsOpen(true)
    setSelectedTemplate(defaultMechanism)
  }

  return (
    <div className="relative overflow-x-auto">
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        {isOpen && (
          <MechanismCardSupply
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
            <div key={87944}>
              <div>
                <div>
                  <div>
                    <p>Total Supply</p>
                    <p>
                      <input
                        type="text"
                        name="supply"
                        className="h-10 overflow-auto rounded-lg border-2 border-slate-300"
                      ></input>
                      <div className="mt-5">
                        <label>Duration</label>
                        <label style={{ marginLeft: 180 }}>Start Date</label>
                        <p>
                          <input
                            className="h-10 overflow-auto rounded-lg border-2 border-slate-300"
                            type="text"
                          ></input>
                          <input
                            style={{ marginLeft: 60 }}
                            className="h-10 w-36 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-dao-red focus:ring-dao-red"
                            type="date"
                          ></input>
                        </p>
                      </div>
                    </p>
                    <p className="mt-5">Allocations</p>
                    <p className="mt-5">Internal</p>
                    <p>
                      <button
                        type="button"
                        className="mt-5 h-11 w-28 rounded-md border-2 border-dao-green text-xs font-bold"
                        onClick={() => handleNewMechanism(arrayHelpers, false)}
                      >
                        Add
                      </button>
                      <select
                        style={{ marginRight: 1000 }}
                        onChange={handleChange}
                        className="float-right mt-5  block h-11 w-32 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-xs text-gray-900 focus:border-dao-red focus:ring-dao-red"
                      >
                        <option key="none" value="none">
                          From template
                        </option>
                        {mechTemplates?.map((mt) => {
                          // console.log("test = ",mt)
                          if (
                            mt.supplyDemandType ==
                            supplyDemandType.supplyInternal
                          ) {
                            return (
                              <>
                                <option
                                  key={mt.id}
                                  value={mt.id}
                                  // label={mt.name}
                                >
                                  {mt.name}
                                </option>
                              </>
                            )
                          }
                        })}
                      </select>
                    </p>

                    <p className="mt-5">External</p>

                    <p className="mt-5">
                      <button
                        type="button"
                        className="h-11 w-28 rounded-md border-2 border-dao-green text-xs font-bold"
                        onClick={() => handleNewMechanism(arrayHelpers, false)}
                      >
                        Add
                      </button>
                      <select
                        style={{ marginRight: 1000 }}
                        onChange={handleChange}
                        className="float-right block h-11 w-32 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-xs text-gray-900 focus:border-dao-red focus:ring-dao-red"
                      >
                        <option key="none" value="none">
                          From template
                        </option>
                        {mechTemplates?.map((mt) => {
                          if (
                            mt.supplyDemandType ==
                            supplyDemandType.supplyExternal
                          ) {
                            return (
                              <>
                                <option
                                  key={mt.id}
                                  value={mt.id}
                                  // label={mt.name}
                                >
                                  {mt.name}
                                </option>
                              </>
                            )
                          }
                        })}
                      </select>
                    </p>
                    <div></div>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          </>
        )}
      />
    </div>
  )
}

export default FormCardSupply
