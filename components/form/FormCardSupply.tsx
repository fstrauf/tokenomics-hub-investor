import { FieldArray } from 'formik'
import React, { useState } from 'react'
import XMarkIcon from '../../public/svg/xmarkicon'
import Drawer from '../slugView/Drawer'
import MechanismCardSupply from '../tdf/MechanismCardSupply'
import { supplyDemandType } from '../../lib/helper'

export const FormCardSupplyDemand = ({
  field,
  values,
  mechanismTemplates,
  setFieldValue,
}) => {
  let [mechanismIndex, setMechanismIndex] = useState(0)
  const defaultMechanism = {
    id: '',
    name: `Default`,
    summary:
      'Briefly explain what this mechanism incentivises users to do and why they want to do it. (e.g., users are incentivised to buy and stake a token in order to receive token emissions)',
    details: '',
    isSink: false,
    token: '',
    category: `Mechanism`,
    lockupPeriod: 5,
    unlockPeriod: 12,
    percentageUnlockTGE: 0,
    percentageAllocation: 30,
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    isEpochDistro: false,
    supplyDemandType: 'supplyExternal',
    epochDurationInSeconds: 0,
    initialEmissionPerSecond: 0,
    emissionReductionPerEpoch: 0,
    CalculationTimeSeries: [],
    isTemplate: false,
    PostUser: [],
  }

  const mechTemplate = mechanismTemplates.filter((template) => {
    return (
      template.supplyDemandType === supplyDemandType.supplyInternal ||
      template.supplyDemandType === supplyDemandType.supplyExternal
    )
  })
  const mechTemplates = mechTemplate.map((obj) => ({ ...obj }))

  const [isOpen, setIsOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(defaultMechanism)
  const [percentageExceeds, setPercentageExceeds] = useState(false)

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
      updateMechanism.name = updateMechanism.name+ ' ' + (field.value?.length + 1)
      updateMechanism.category =  updateMechanism.category+ ' ' + (field.value?.length + 1)
    } else {
      updateMechanism.name = updateMechanism.name+ ' ' + (field.value?.length + 1)
      updateMechanism.category = updateMechanism.category+ ' ' + (field.value?.length + 1)
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
        <div>
          <div className="flex">
              <div
                className="mr-2 h-5 w-5 bg-slate-600"
                style={{ background: input.color }}
              ></div>
            <p className="">{input.name}</p>
          </div>
            <p className="mt-2">{input.percentageAllocation} %</p>
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

  const getTotalPercent = () => {
    let ntotalPercent = 0
    field.value.forEach((data) => {
      ntotalPercent += data.percentageAllocation
    })
    if(ntotalPercent>100){
      setPercentageExceeds(true)
    } else{
      setPercentageExceeds(false)
    }
    return Number(ntotalPercent)
  }

  return (
    <div className="relative overflow-x-auto mt-10">
      
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
          <div className={`flex py-5 font-light ${percentageExceeds ? 'text-red-600' : ''}`}><p className='font-bold'>{getTotalPercent()} / 100%</p></div>
          
            <div key={87944} className="flex">
              <div className="w-1/2">
                <div className="mb-1 flex gap-3">
                  {' '}
                  <p className="font-light">Internal Allocations</p>
                  <select
                    onChange={handleChange}
                    className="block h-11 w-32 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-xs text-gray-900 focus:border-dao-red focus:ring-dao-red"
                  >
                    <option key="none" value="none">
                      From template
                    </option>
                    {mechTemplates?.map((mt) => {
                      if (
                        mt.supplyDemandType == supplyDemandType.supplyInternal
                      ) {
                        return (
                          <>
                            <option
                              key={mt.id}
                              value={mt.id}
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
                        false,
                        supplyDemandType.supplyInternal
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
                <div className="mb-1 flex gap-2">
              
                  <p className="font-light">External Allocations</p>
                  <select
                    onChange={handleChange}
                    className="block h-11 w-32 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-xs text-gray-900 focus:border-dao-red focus:ring-dao-red"
                  >
                    <option key="none" value="none">
                      From template
                    </option>
                    {mechTemplates?.map((mt) => {
                      if (
                        mt.supplyDemandType == supplyDemandType.supplyExternal
                      ) {
                        return (
                          <>
                            <option
                              key={mt.id}
                              value={mt.id}
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
                        false,
                        supplyDemandType.supplyExternal
                      )
                    }
                  >
                    Add
                  </button>
                </div>
                <div className="h-60 overflow-auto rounded-lg border-2 border-slate-300"> 
                  <div
                    key={4811}
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
            </div>
          </>
        )}
      />
    </div>
  )
}

export default FormCardSupplyDemand
