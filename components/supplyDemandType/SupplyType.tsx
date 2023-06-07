import { Field } from 'formik'
import { shortBigNumber } from '../../lib/helper'
import * as dayjs from 'dayjs'
import { DemandBuilder, Functions, Spreadsheet } from '../generic/TabComponent'
import GenericTab from '../generic/GenericTab'
import FormSelectUtility from '../form/FormSelectUtility'
import { supplyDemandType } from '../../lib/helper'
import { ErrorBoundary } from 'react-error-boundary'
const secondsPerMonth = 2628000
const Tabs = [{ tab: 'Manual' }, { tab: 'Functions' }, { tab: 'Spreadsheets' }]

function Fallback({ error, resetErrorBoundary }) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </div>
  )
}

export function SupplyInternal(props) {
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
        <div className="grid grid-cols-2 items-center gap-1">
          <p className="text-xs font-bold uppercase text-gray-700">
            Percentage Allocation (
            {props.field.values?.reduce(
              (a, v) => (a = a + Number(v?.percentageAllocation)),
              0
            )}
            %)
          </p>{' '}
          <Field
            name={`${props.field.name}.${props.mechanismIndex}.percentageAllocation`}
            placeholder="percentageAllocation"
            className="block w-28 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            type="number"
            onWheel={(event) => event.currentTarget.blur()}
          />
          {props.field?.value[props.mechanismIndex]?.isEpochDistro ? (
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
                      .duration(
                        props.field.value[props.mechanismIndex]
                          .epochDurationInSeconds,
                        'seconds'
                      )
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
                  onWheel={(event) => event.currentTarget.blur()}
                />
                <span className="ml-1 self-center text-xs">
                  (~{' '}
                  {shortBigNumber(
                    props.field.value[props.mechanismIndex]
                      .initialEmissionPerSecond * secondsPerMonth
                  )}{' '}
                  per month)
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
          <p className="text-xs font-bold uppercase text-gray-700">APR</p>
          <p className="block p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500">
            15 %
          </p>
        </div>
      </div>
    </>
  )
}

export function SupplyExternal(props) {
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
        <div className="grid grid-cols-2 items-center gap-1">
          <p className="text-xs font-bold uppercase text-gray-700">
            Percentage Allocation (
            {props.field.values?.props.reduce(
              (a, v) => (a = a + Number(v?.percentageAllocation)),
              0
            )}
            %)
          </p>{' '}
          <Field
            name={`${props.field.name}.${props.mechanismIndex}.percentageAllocation`}
            placeholder="percentageAllocation"
            className="block w-28 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            type="number"
            onWheel={(event) => event.currentTarget.blur()}
          />
          {props.field?.value[props.mechanismIndex]?.isEpochDistro ? (
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
                      .duration(
                        props.field.value[props.mechanismIndex]
                          .epochDurationInSeconds,
                        'seconds'
                      )
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
                  onWheel={(event) => event.currentTarget.blur()}
                />
                <span className="ml-1 self-center text-xs">
                  (~{' '}
                  {shortBigNumber(
                    props.field.value[props.mechanismIndex]
                      .initialEmissionPerSecond * secondsPerMonth
                  )}{' '}
                  per month)
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
          <p className="text-xs font-bold uppercase text-gray-700">APR</p>
          <p className="block p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500">
            15 %
          </p>
        </div>
      </div>
    </>
  )
}

export function DemandUtility(props) {
  return (
    <>
      <label className="mt-5 block text-sm font-medium text-gray-900 ">
        Utility
      </label>
      <Field
        className="custom-select mt-5"
        name={`${props.field.name}.${props.mechanismIndex}.Utility`}
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
      <div className="mt-10">
        <label className="m-auto tracking-tight text-gray-900">
          Demand Estimate
        </label>
        <hr className="mt-5 mb-5"></hr>
        <div>
          <ErrorBoundary
            FallbackComponent={Fallback}
            onReset={(details) => {
              // Reset the state of your app so the error doesn't happen again
            }}
          >
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

export function DemandMechanism(props) {
  return (
    <>
      <label className="mt-5 block text-sm font-medium text-gray-900 ">
        Select requirement
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
        component={FormSelectUtility}
        placeholder={''}
        isMulti={true}
        index={props.mechanismIndex}
      />
      <div className="mt-10">
        <label
          style={{ alignContent: 'center' }}
          className="tracking-tight text-gray-900"
        >
          Demand Estimate
        </label>
        <hr className="mt-5 mb-5"></hr>

        <div>
          <ErrorBoundary
            FallbackComponent={Fallback}
            onReset={(details) => {
              // Reset the state of your app so the error doesn't happen again
            }}
          >
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
