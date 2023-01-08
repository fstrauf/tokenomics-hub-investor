import StaticAllocationAndVestingChart from './charts/StaticAllocationAndVestingChart'

export default function Calculation(calculation) {
// console.log("🚀 ~ file: calculation.js:4 ~ Calculation ~ calculation", calculation)
if(calculation.calculation===null){
  return(
    <>
      <h1 className='text-xl md:text-2xl lg:text-3xl font-bold mt-10 mb-4 md:mt-20 text-black section-head'>Allocation and Emission.</h1>
      <div className='border-2 rounded-lg'>
      <p>No calculation connected</p>
      </div>
    </>
  )
}

  return (
    <>
      <h1 className='text-xl md:text-2xl lg:text-3xl font-bold mt-10 mb-4 md:mt-20 text-black section-head'>Allocation and Emission.</h1>
      <div className='border-2 rounded-lg'>
      <StaticAllocationAndVestingChart calculation={calculation?.calculation}/>
      </div>
    </>
  )
}