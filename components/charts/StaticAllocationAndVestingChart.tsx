import dynamic from 'next/dynamic'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { getAreaData, shortBigNumber } from '../../lib/helper'

export default function StaticAllocationAndVestingChart(calculation) {
  const AllocationChart = dynamic(() => import('./AllocationChart'), {
    ssr: false,
  })

  const VestingChart = dynamic(() => import('./VestingChart'), {
    ssr: false,
  })

  const calc = calculation?.calculation
  // console.log(
  //   '🚀 ~ file: StaticAllocationAndVestingChart.tsx:15 ~ StaticAllocationAndVestingChart ~ calc',
  //   calc
  // )

  return (
    <>
      <div className="m-auto flex flex-col-reverse lg:flex-row w-full justify-end">
        <div className="h-80 w-full lg:w-1/2 self-center">
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
        <div className="lg:w-1/2 self-center m-2">
          <table className="m-2 overflow-scroll text-left text-xs text-gray-500">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700">
              <tr>
                <th scope="col" className="px-1">
                  Category
                </th>
                <th scope="col" className="w-1/6 px-1">
                  Lockup Period
                </th>
                <th scope="col" className="w-1/6 px-1">
                  Unlocking Period
                </th>
                <th scope="col" className="px-1">
                  Percentage Allocation
                </th>
                <th scope="col" className="w-1/6px-1">
                  Token Allocation
                </th>
              </tr>
            </thead>
            <tbody>
              {calc?.CalculationRows.map((cr) => (
                <tr key={cr.category} className="border-b bg-white ">
                  <th
                    scope="row"
                    className="whitespace-nowrap py-2 px-3 font-medium text-gray-900 "
                  >
                    {cr.category}
                  </th>
                  <td className="py-2 px-3">{cr.lockupPeriod}</td>
                  <td className="py-2 px-3">{cr.unlockPeriod}</td>
                  <td className="py-2 px-3">{cr.percentageAllocation}%</td>
                  <td className="py-2 px-3">
                    <div>
                      {new Intl.NumberFormat('en').format(
                        Number(
                          (cr.percentageAllocation / 100) * calc?.totalSupply
                        )
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
                )}
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
