import dynamic from 'next/dynamic'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { getAreaData, shortBigNumber } from '../../lib/helper'
import * as duration from 'dayjs/plugin/duration'
import * as dayjs from 'dayjs'

export default function StaticAllocationAndVestingChart({calculation, mechanisms}) {
  console.log("🚀 ~ file: StaticAllocationAndVestingChart.tsx:8 ~ calculation:", calculation)
  dayjs.extend(duration)
  const secondsPerMonth = 2628000

  const AllocationChart = dynamic(() => import('./AllocationChart'), {
    ssr: false,
  })

  const VestingChart = dynamic(() => import('./VestingChart'), {
    ssr: false,
  })

  const calc = calculation?.calculation

  const monthHeader = (
    <>
      <p className="text-xs font-bold text-gray-700">Category</p>
      <p className="w-16 text-xs font-bold text-gray-700">Lockup Period</p>
      <p className="text-xs font-bold text-gray-700">Unlocking Period</p>
      <p className="text-xs font-bold text-gray-700">% Allocation</p>{' '}
      <p className="text-xs font-bold text-gray-700">Token Allocation</p>
    </>
  )

  const epochHeader = (
    <>
      <p className="text-xs font-bold  text-gray-700">Category</p>
      <p className="text-xs font-bold  text-gray-700">Epoch Duration</p>
      <p className="text-xs font-bold  text-gray-700">Initial Emissions</p>
      <p className="text-xs font-bold  text-gray-700">Reduction per Epoch</p>
      <p className="text-xs font-bold  text-gray-700">Allocation</p>
      <p className="text-xs font-bold text-gray-700">Token Allocation</p>
    </>
  )

  const monthRow = (input) => (
    <>
      <div className="text-xs text-center">{input.category}</div>
      <div className="text-xs text-center">{input.lockupPeriod}</div>
      <div className="text-xs text-center">{input.unlockPeriod}</div>
      <div className="text-xs text-center">{input.percentageAllocation}</div>
      <div className="text-center text-xs">
        {shortBigNumber(
          Number((input.percentageAllocation / 100) * calc?.totalSupply)
        )}
      </div>
    </>
  )

  const epochRow = (input) => (
    <>
      <div className="text-xs text-center">{input.category}</div>

      <span className="ml-1 self-center text-xs text-center">
        ~{' '}
        {Math.floor(
          dayjs.duration(input.epochDurationInSeconds, 'seconds').asMonths()
        )}{' '}
        mo
      </span>
      <span className="ml-1 self-center text-xs text-center">
        ~ {shortBigNumber(input.initialEmissionPerSecond * secondsPerMonth)} /
        mo
      </span>

      <div className="text-xs text-center">{input.emissionReductionPerEpoch * 100}%</div>
      <div className="text-xs text-center">{input.percentageAllocation}%</div>
      <div className="text-center text-xs">
        {shortBigNumber(
          Number((input.percentageAllocation / 100) * calc?.totalSupply)
        )}
      </div>
    </>
  )

  return (
    <>
      <div className="m-auto flex w-full flex-col-reverse justify-end lg:flex-row">
        <div className="h-80 w-full self-center lg:w-1/2">
          <ParentSize>
            {({ width, height }) => (
              <AllocationChart
                width={width}
                height={height}
                fields={calc?.CalculationRows}
              />
            )}
          </ParentSize>
        </div>
        {/* <div>
          <h1 className="mb-4text-black section-head text-base font-bold">
            Monthly Emissions
          </h1>
          <div className="mb-4 overflow-auto p-1">
            <div className="mb-3 grid grid-cols-[auto_auto_auto_auto_auto] gap-1">
              {monthHeader}
              {calc?.CalculationRows.map((cr) => (
                <>{!cr.isEpochDistro ? monthRow(cr) : <></>}</>
              ))}
            </div>
          </div>
          <h1 className="mb-4text-black section-head text-base font-bold">
            Epoch Based Emissions
          </h1>
          <div className="mb-4 overflow-auto p-1">
            <div className="mb-3 grid grid-cols-[auto_auto_auto_auto_auto_auto] gap-1">
              {epochHeader}
              {calc?.CalculationRows.map((cr) => (
                <>{cr.isEpochDistro ? epochRow(cr) : <></>}</>
              ))}
            </div>
          </div>
        </div>       */}
      </div>
      <div className="w-full">
        <div className="h-96 w-full">
          <ParentSize>
            {({ width, height }) => (
              <VestingChart
                width={width}
                height={height}
                data={getAreaData(
                  calc?.months,
                  calc?.CalculationRows,
                  calc?.totalSupply,
                  calc?.startDate
                ).chartData}
                fields={calc?.CalculationRows}
                totalSupply={calc?.totalSupply}
              />
            )}
          </ParentSize>
        </div>
      </div>
    </>
  )
}
