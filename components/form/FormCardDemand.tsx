import { FieldArray } from 'formik'
import React, { useState } from 'react'
import Drawer from '../slugView/Drawer'
import MechanismCardDemand from '../tdf/MechanismCardDemand'
import { supplyDemandType } from '../../lib/helper'
import XMarkIcon from '../../public/svg/xmarkicon'
import { useUser } from '@clerk/clerk-react/dist/hooks/useUser'

export const FormCardSupply = ({
  field,
  values,
  mechanismTemplates,
  setFieldValue,
  // subscription,
}) => {
  let [mechanismIndex, setMechanismIndex] = useState(0)
  const { user } = useUser()
  // const admin = user?.publicMetadata?.admin || false
  const defaultMechanism = {
    id: '',
    name: `Default`,
    summary:
      'Briefly explain what this mechanism incentivises users to do and why they want to do it. (e.g., users are incentivised to buy and stake a token in order to receive token emissions)',
    details: '',
    // '{"type":"doc","content":[{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Explanation"}]},{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"Explain in detail what this mechanism incentivises users to do, why they want to do it and why it has a positive effect on the token. Also explain if this mechanism is a sink –tokens are held/bought, a source –tokens are given out to users, or both –users are required to buy/hold a token but in exchange thet receive tokens.  (e.g., staking incentivises users to stake tokens, thus reducing circulating supply, in order to receive token emissions. This means that this mechanism acts as a sink –users are acquiring/holding a token, but also as a source –users are receiving emissions)"}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Mechanism & Users"}]},{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"How the user interacts with the mechanism"},{"type":"text","text":" "}]},{"type":"paragraph","content":[{"type":"text","text":"1. Users have to…"}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Mechanism demand"}]},{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"How does the mechanism create demand"}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Factors"}]},{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"What factors affect demand"}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Side effects"}]},{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"What are the side effects of this mechanism"}]}]}',
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
    supplyDemandType: '',
    initialEmissionPerSecond: 0,
    emissionReductionPerEpoch: 0,
    CalculationTimeSeries: [],
    isTemplate: false,
    PostUser: [],
  }

  const mechTemplate = mechanismTemplates.filter((template) => {
    return (
      template.supplyDemandType === supplyDemandType.demandUtility ||
      template.supplyDemandType === supplyDemandType.demandMechanism
    )
  })
  const mechTemplates = mechTemplate.map((obj) => ({ ...obj }))
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

  const handleNewMechanism = (
    arrayHelpers,
    isSink: boolean,
    tempType: string
  ) => {
    const updateMechanism = selectedTemplate

    updateMechanism.isSink = isSink
    updateMechanism.supplyDemandType = tempType
    if (isSink) {
      updateMechanism.name =
        updateMechanism.name + ' ' + (field.value?.length + 1)
      updateMechanism.category =
        updateMechanism.category + ' ' + (field.value?.length + 1)
    } else {
      updateMechanism.name =
        updateMechanism.name + ' ' + (field.value?.length + 1)
      updateMechanism.category =
        updateMechanism.category + ' ' + (field.value?.length + 1)
      updateMechanism.summary = ''
    }

    arrayHelpers.push(updateMechanism)

    setMechanismIndex(field.value?.length)
    setIsOpen(true)
    setSelectedTemplate(defaultMechanism)
  }

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
        {' '}
        <div className="flex">
          <p className="">{input.name}</p>
        </div>
        <div className="flex h-7 border-t-2">
          {' '}
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
          <MechanismCardDemand
            field={field}
            values={values}
            mechanismIndex={mechanismIndex}
            setFieldValue={setFieldValue}
            users={values.PostUser} // mechanismImpactFactors={mechanismImpactFactors}
            templates={mechTemplates}
          />
        )}
      </Drawer>
      <FieldArray
        name={field.name}
        render={(arrayHelpers) => (
          <>
            <p className="mt-10 font-light">Demand Types</p>
            <div key={87944} className="mt-10 flex">
              <div className="w-1/2">
                <div className="mb-1 flex gap-3">
                  {' '}
                  <p className="font-dark">Utilty</p>
                  <select
                    onChange={handleChange}
                    className="block h-11 w-32 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-xs text-gray-900 focus:border-dao-red focus:ring-dao-red"
                  >
                    <option key="none" value="none">
                      From template
                    </option>
                    {mechTemplates?.map((mt) => {
                      if (
                        mt.supplyDemandType == supplyDemandType.demandUtility
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
                  <button
                    type="button"
                    className="h-11 w-28 rounded-md border-2 border-dao-green text-xs font-bold"
                    onClick={() =>
                      handleNewMechanism(
                        arrayHelpers,
                        true,
                        supplyDemandType.demandUtility
                      )
                    }
                  >
                    Add
                  </button>
                </div>
                <div className="h-60 overflow-auto rounded-lg border-2 border-slate-300">
                  <div
                    key={4711}
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
              <div className="relative w-1/2">
                <div className="mb-1 flex gap-2">
                  {' '}
                  <p className="font-dark">Mechanism</p>
                  <select
                    onChange={handleChange}
                    className="block h-11 w-32 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-xs text-gray-900 focus:border-dao-red focus:ring-dao-red"
                  >
                    <option key="none" value="none">
                      From template
                    </option>
                    {mechTemplates?.map((mt) => {
                      if (
                        mt.supplyDemandType == supplyDemandType.demandMechanism
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
                  <button
                    type="button"
                    className="h-11 w-28 rounded-md border-2 border-dao-green text-xs font-bold"
                    onClick={() =>
                      handleNewMechanism(
                        arrayHelpers,
                        true,
                        supplyDemandType.demandMechanism
                      )
                    }
                  >
                    Add
                  </button>
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

export default FormCardSupply