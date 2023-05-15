import { Field, FieldArray } from 'formik'
import React from 'react'
import FormSelectUtility from '../form/FormSelectUtility'
import * as duration from 'dayjs/plugin/duration'
import * as dayjs from 'dayjs'
import { Tab } from '@headlessui/react'


export const MechanismCardSupply = ({
  field,
  mechanismIndex,
  setFieldValue,
  users,
}) => {
  const isSink = field.value[mechanismIndex]?.isSink || false
  dayjs.extend(duration)
  const secondsPerMonth = 2628000

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  function Example() {
    return (
      <div className="w-full max-w-md px-2 py-16 sm:px-0 m-auto">
        <Tab.Group>
          <Tab.List className="bg-gray-300 flex space-x-1 rounded-xl p-1">
            <Tab
              key={'Phases'}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-black-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              Phases
            </Tab>
            <Tab
              key={'Function'}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-black-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              Functions
            </Tab>
            <Tab
              key={'Spreadsheet'}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-black-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              Spreadsheets
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              Phases comming soon
            </Tab.Panel>
            <Tab.Panel
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              Functions comming soon
            </Tab.Panel>
            <Tab.Panel
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              Spreadsheets comming soon
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    )
  }
  const demandUtility = () => {
    return (
      <>
        <div className="mt-10">
          <label
            className="tracking-tight text-gray-900 m-auto"
          >
            DEMAND ESTIMATE
          </label>
          <hr className="mt-5 mb-5"></hr>
          <div>
            <Example></Example>
          </div>
        </div>
      </>
    )
  }

  const demandMechanism = () => {
    return (
      <>
        <div className="mt-10">
          <label
            style={{ alignContent: 'center' }}
            className="tracking-tight text-gray-900"
          >
            DEMAND ESTIMATE
          </label>
          <hr className="mt-5 mb-5"></hr>
          <div>
            <Example></Example>
          </div>
        </div>
      </>
    )
  }

  return (
    <div key={mechanismIndex} className="ml-20 mr-20">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
        {isSink ? <>Mechanism</> : <>Utility</>}
      </h5>
      <hr></hr>

      <label className="mt-5 block text-sm font-medium text-gray-900 ">
        Utility
      </label>
      <Field
        className="custom-select mt-5"
        name={`${field.name}.${mechanismIndex}.PostUser`}
        options={users}
        component={FormSelectUtility}
        placeholder="Select utility"
        isMulti={true}
      />
      <label className="mt-5 block text-sm font-medium text-gray-900">
        Descriptions
      </label>
      <Field
        name={`${field.name}.${mechanismIndex}.description`}
        placeholder="Description"
        className="mt-5 block w-full rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        as="textarea"
        row={4}
      />

      {isSink ? demandMechanism() : demandUtility()}
    </div>
  )
}

export default MechanismCardSupply
