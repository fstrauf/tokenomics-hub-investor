import StaticAllocationAndVestingChart from '../charts/StaticAllocationAndVestingChart'

export default function Calculation(calculation) {
  console.log(
    '🚀 ~ file: calculation.js:4 ~ Calculation ~ calculation',
    calculation
  )
  if (calculation.calculation === undefined || calculation.calculation === null ) {
    return (
      <>
        <h1 className="section-head mt-10 mb-4 text-xl font-bold text-black md:mt-20 md:text-2xl lg:text-3xl">
          Allocation and Emission.
        </h1>
        <div className="rounded-lg border-2">
          <p>No calculation connected</p>
        </div>
      </>
    )
  }

  return (
    <>
      <h1 className="section-head mt-10 mb-4 text-xl font-bold text-black md:mt-20 md:text-2xl lg:text-3xl">
        Allocation and Emission.
      </h1>
      <div className="rounded-lg border-2">
        <StaticAllocationAndVestingChart
          calculation={calculation?.calculation}
        />
      </div>
    </>
  )
}
