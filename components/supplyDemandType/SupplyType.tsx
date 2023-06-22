import { Field, useFormikContext } from 'formik'
import { shortBigNumber } from '../../lib/helper'
import * as duration from 'dayjs/plugin/duration'
import * as dayjs from 'dayjs'
import { DemandBuilder, Functions, Spreadsheet } from '../generic/TabComponent'
import GenericTab from '../generic/GenericTab'
import FormSelectUtility from '../form/FormSelectUtility'
import { supplyDemandType } from '../../lib/helper'
import { ErrorBoundary } from 'react-error-boundary'
import FormSelectIncentive from '../form/FormSelectIncentive'
const secondsPerMonth = 2628000
const Tabs = [{ tab: 'Manual' }, { tab: 'Functions' }, { tab: 'Spreadsheets' }]

dayjs.extend(duration)
function Fallback({ error }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </div>
  )
}

export function SupplyInternal(props) {
  return <>{SupplyComponent(props)}</>
}

export function SupplyInternalViewer(props) {
  return <>{SupplyComponentViewer(props)}</>
}

export function SupplyExternal(props) {
  return <>{SupplyComponent(props)}</>
}

export function SupplyExternalViewer(props) {
  return <>{SupplyComponentViewer(props)}</>
}

export function DemandUtility(props) {
  return (
    <>
      <label className="mt-5 block text-sm font-medium text-gray-900 ">
        Utility
      </label>
      <Field
        className="custom-select mt-5"
        name={`${props.field.name}.${props.mechanismIndex}.mechanismType`}
        options={props.templates.filter((option) => {
          return (
            option.supplyDemandType ==
            props.field.value[props.mechanismIndex].supplyDemandType
          )
        })}
        defaultValue={
          props.field.value[props.mechanismIndex].name
            .replace(/[0-9]/g, '')
            .trim() == 'Default'
            ? ''
            : props.field.value[props.mechanismIndex]
        }
        component={FormSelectUtility}
        placeholder={''}
        templates={props.templates}
        isMulti={true}
        index={props.mechanismIndex}
      />
      {DemandComponent(props)}
    </>
  )
}

export function DemandUtilityViewer(props) {
  const mechanism = props?.mechanism
  return (
    <>
      <label className="mt-5 block text-sm font-medium text-gray-900 ">
        Utility
      </label>
      <span className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500">
        {mechanism?.mechanismType?.name}
      </span>
    </>
  )
}

export function DemandMechanismViewer(props) {
  const mechanism = props?.mechanism

  return (
    <>
      <label className="mt-5 block text-sm font-medium text-gray-900 ">
        Mechanism
      </label>
      <span className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500">
        {mechanism?.mechanismType?.name}
      </span>
      <label className="mt-5 block text-sm font-medium text-gray-900 ">
        Incentived External Allocations
      </label>
      <ul className="list-inside list-disc text-xs text-gray-900">
        {mechanism.incentiveTarget.map((target, index) => (
          <li key={index}>{target.name}</li>
        ))}
      </ul>
    </>
  )
}

export function DemandMechanism(props) {
  return (
    <>
      <label className="mt-5 block text-sm font-medium text-gray-900 ">
        Mechanism
      </label>
      <Field
        className="custom-select mt-5"
        name={`${props.field.name}.${props.mechanismIndex}.mechanismType`}
        options={props.templates.filter((option) => {
          return (
            option.supplyDemandType ==
            props.field.value[props.mechanismIndex].supplyDemandType
          )
        })}
        defaultValue={
          props.field.value[props.mechanismIndex].name
            .replace(/[0-9]/g, '')
            .trim() == 'Default'
            ? ''
            : props.field.value[props.mechanismIndex]
        }
        component={FormSelectUtility}
        placeholder={''}
        templates={props.templates}
        isMulti={true}
        index={props.mechanismIndex}
      />
      <label className="mt-5 block text-sm font-medium text-gray-900 ">
        Select Incentive
      </label>
      <Field
        className="custom-select mt-5"
        name={`${props.field.name}.${props.mechanismIndex}.incentiveTarget`}
        options={props.field.value.filter((option) => {
          return option.supplyDemandType == supplyDemandType.supplyExternal
        })}
        defaultValue={''}
        component={FormSelectIncentive}
        placeholder={''}
        isMulti={true}
        index={props.mechanismIndex}
      />
      {DemandComponent(props)}
    </>
  )
}

function DemandComponent(props) {
  return (
    <>
      <div className="mt-10">
        <label className="m-auto tracking-tight text-gray-900">
          Demand Estimate
        </label>
        <hr className="mt-5 mb-5"></hr>

        <div>
          <ErrorBoundary FallbackComponent={Fallback}>
            <GenericTab
              tabs={Tabs}
              panels={[
                <DemandBuilder {...props}></DemandBuilder>,
                <Functions></Functions>,
                <Spreadsheet {...props}></Spreadsheet>,
              ]}
            ></GenericTab>
          </ErrorBoundary>
        </div>
      </div>
    </>
  )
}

function SupplyComponent(props) {
  const { setFieldValue } = useFormikContext()
  const mechanism = props.field.value[props.mechanismIndex]
  const tokenAllocation = Math.floor(
    (mechanism.percentageAllocation * props?.totalSupply) / 100
  )

  const handlePercentageEmittedFirstEpochChange = (
    percentageEmittedFirstEpoch
  ) => {
    // const { percentageEmittedFirstEpoch } = values;
    const initialEmissionPerSecond =
      (tokenAllocation * percentageEmittedFirstEpoch) /
      100 /
      mechanism.epochDurationInSeconds

    setFieldValue(
      `${props.field.name}.${props.mechanismIndex}.initialEmissionPerSecond`,
      Number(initialEmissionPerSecond)
    )
  }

  return (
    <>
      <div>
        <div className="flex p-5">
          <label>Distribution type</label>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Linear
          </span>
          <label className="relative mx-5 inline-flex cursor-pointer items-center">
            <Field
              id="isEpochDistro"
              name={`${props.field.name}.${props.mechanismIndex}.isEpochDistro`}
              type="checkbox"
              class="peer sr-only"
            />
            <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-0.5 after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-red-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-red-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-red-800"></div>
          </label>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Log
          </span>
        </div>
        <div className="grid grid-cols-2 items-center justify-between gap-1">
          <p className="text-xs font-bold uppercase text-gray-700">
            Percentage Allocation (
            {props.field.values?.reduce(
              (a, v) => (a = a + Number(v?.percentageAllocation)),
              0
            )}
            %)
          </p>{' '}
          <div className="flex">
            <Field
              name={`${props.field.name}.${props.mechanismIndex}.percentageAllocation`}
              placeholder="percentageAllocation"
              className="block w-28 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              type="number"
              onWheel={(event) => event.currentTarget.blur()}
            />
            <span className="ml-1 self-center text-xs">
              (= {tokenAllocation} tokens)
            </span>
          </div>
          {mechanism?.isEpochDistro ? (
            <>
              {' '}
              <p className="text-xs font-bold uppercase text-gray-700">
                Epoch Duration in Seconds
              </p>
              <div className="flex">
                <Field
                  name={`${props.field.name}.${props.mechanismIndex}.epochDurationInSeconds`}
                  placeholder="First Epoch Duration in Seconds"
                  className="block w-28 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  type="number"
                  min="0"
                  onWheel={(event) => event.currentTarget.blur()}
                />
                <span className="ml-1 self-center text-xs">
                  (~{' '}
                  {Math.floor(
                    dayjs
                      .duration(mechanism.epochDurationInSeconds, 'seconds')
                      .asMonths()
                  )}{' '}
                  months)
                </span>
              </div>
              <p className="text-xs font-bold uppercase text-gray-700">
                Initial Emission per second
              </p>
              <div className="flex">
                <Field
                  name={`${props.field.name}.${props.mechanismIndex}.initialEmissionPerSecond`}
                  placeholder="Initial Emission per Seconds"
                  className="block w-28 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  type="number"
                  disabled={true}
                  onWheel={(event) => event.currentTarget.blur()}
                />
                <span className="ml-1 self-center text-xs">
                  (~{' '}
                  {shortBigNumber(
                    mechanism.initialEmissionPerSecond * secondsPerMonth
                  )}{' '}
                  per month)
                </span>
              </div>
              <p className="text-xs font-bold uppercase text-gray-700">
                % of tokens to be emitted in first epoch
              </p>
              <div className="flex">
                <Field
                  name={`${props.field.name}.${props.mechanismIndex}.percentageEmittedFirstEpoch`}
                  placeholder="% of tokens to be emitted in first epoch"
                  className="block w-28 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  type="number"
                  onChange={(e) => {
                    setFieldValue(
                      `${props.field.name}.${props.mechanismIndex}.percentageEmittedFirstEpoch`,
                      Number(e.target.value)
                    )
                    handlePercentageEmittedFirstEpochChange(e.target.value)
                  }}
                  onWheel={(event) => event.currentTarget.blur()}
                />
                <span className="ml-1 self-center text-xs">
                  (={' '}
                  {shortBigNumber(
                    (tokenAllocation * mechanism.percentageEmittedFirstEpoch) /
                      100
                  )}{' '}
                  tokens)
                </span>
              </div>
              <p className="text-xs font-bold uppercase text-gray-700">
                Emission Reduction per Epoch (in %)
              </p>
              <Field
                name={`${props.field.name}.${props.mechanismIndex}.emissionReductionPerEpoch`}
                placeholder="Emission Reduction per Epoch"
                className="block w-28 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                type="number"
                onWheel={(event) => event.currentTarget.blur()}
              />
            </>
          ) : (
            <>
              <p className="text-xs font-bold uppercase text-gray-700">
                % Unlock at TGE
              </p>
              <Field
                name={`${props.field.name}.${props.mechanismIndex}.percentageUnlockTGE`}
                placeholder="TGE Unlock Percentage"
                className="block w-28 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                type="number"
                onWheel={(event) => event.currentTarget.blur()}
              />
              <p className="text-xs font-bold uppercase text-gray-700">
                Lockup Period
              </p>
              <Field
                name={`${props.field.name}.${props.mechanismIndex}.lockupPeriod`}
                placeholder="lockupPeriod"
                className="block w-28 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                type="number"
                onWheel={(event) => event.currentTarget.blur()}
              />
              <p className="text-xs font-bold uppercase text-gray-700">
                Unlocking Period
              </p>
              <Field
                name={`${props.field.name}.${props.mechanismIndex}.unlockPeriod`}
                placeholder="unlockPeriod"
                className="block w-28 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                type="number"
                onWheel={(event) => event.currentTarget.blur()}
              />
            </>
          )}
          <p className="text-xs font-bold uppercase text-gray-700">Color</p>
          <Field
            name={`${props.field.name}.${props.mechanismIndex}.color`}
            placeholder="color"
            className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            type="color"
          />
        </div>
      </div>
    </>
  )
}

function SupplyComponentViewer(props) {
  // console.log("🚀 ~ file: SupplyType.tsx:379 ~ SupplyComponentViewer ~ props:", props)
  const mechanism = props?.mechanism
  // const tokenAllocation = Math.floor(
  //   (mechanism.percentageAllocation * props?.totalSupply) / 100
  // )

  return (
    <>
      <div>
        <div className="flex py-5">
          {mechanism?.isEpochDistro ? <span className="text-sm font-medium text-gray-900">
            Allocation Based Supply
          </span> : <span className="text-sm font-medium text-gray-900 ">
            Emission Based Supply
          </span>}
          
          {/* <label className="relative mr-5 inline-flex cursor-pointer items-center">
            <span>{mechanism.isEpochDistro}</span>
            <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-0.5 after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-red-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-red-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-red-800"></div>
          </label>
           */}
        </div>

        <div className="grid grid-cols-2 items-center justify-between gap-1">
          <p className="text-xs font-bold uppercase text-gray-700">
            Percentage Allocation (%)
          </p>{' '}
          <div className="flex">
            <p className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500">
              {mechanism.percentageAllocation}
            </p>
            {/* <span className="ml-1 self-center text-xs">
              (= {tokenAllocation} tokens)
            </span> */}
          </div>
          {mechanism?.isEpochDistro ? (
            <>
              {' '}
              <p className="text-xs font-bold uppercase text-gray-700">
                Epoch Duration in Seconds
              </p>
              <div className="flex">
                <p className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500">
                  {mechanism.epochDurationInSeconds}
                </p>
                <span className="ml-1 self-center text-xs">
                  (~{' '}
                  {Math.floor(
                    dayjs
                      .duration(mechanism.epochDurationInSeconds, 'seconds')
                      .asMonths()
                  )}{' '}
                  months)
                </span>
              </div>
              <p className="text-xs font-bold uppercase text-gray-700">
                Initial Emission per second
              </p>
              <div className="flex">
                <p className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500">
                  {mechanism.initialEmissionPerSecond}
                </p>
                <span className="ml-1 self-center text-xs">
                  (~{' '}
                  {shortBigNumber(
                    mechanism.initialEmissionPerSecond * secondsPerMonth
                  )}{' '}
                  per month)
                </span>
              </div>
              <p className="text-xs font-bold uppercase text-gray-700">
                % of tokens to be emitted in first epoch
              </p>
              <div className="flex">
                <p className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500">
                  {mechanism.percentageEmittedFirstEpoch}
                </p>
                {/* <span className="ml-1 self-center text-xs">
                  (={' '}
                  {shortBigNumber(
                    (tokenAllocation * mechanism.percentageEmittedFirstEpoch) /
                      100
                  )}{' '}
                  tokens)
                </span> */}
              </div>
              <p className="text-xs font-bold uppercase text-gray-700">
                Emission Reduction per Epoch (in %)
              </p>
              <p className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500">
                {mechanism.emissionReductionPerEpoch}
              </p>
            </>
          ) : (
            <>
              <p className="w-16 text-xs font-bold uppercase text-gray-700">
                % Unlock at TGE
              </p>
              <p className="block w-14 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500">
                {mechanism.percentageUnlockTGE}
              </p>

              <p className="w-16 text-xs font-bold uppercase text-gray-700">
                Lockup Period
              </p>
              <p className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500">
                {mechanism.lockupPeriod}
              </p>

              <p className="text-xs font-bold uppercase text-gray-700">
                Unlocking Period
              </p>
              <p className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500">
                {mechanism.unlockPeriod}
              </p>
            </>
          )}
          {/* <div className="flex">
            <p className="text-xs font-bold uppercase text-gray-700">Color</p>
            <p className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500">
              {mechanism.color}
            </p>
          </div> */}
        </div>
      </div>
    </>
  )
}
