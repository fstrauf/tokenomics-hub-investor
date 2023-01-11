import BreakdownBox from './breakdown-box'

export default function TokenStrength({ tokenStrength }) {
  return (
    <>
    <h1 className='text-xl md:text-2xl lg:text-3xl font-bold mt-10 mb-4 md:mt-20 text-black'>Token Strength.</h1>
      <div className='grid border-2 rounded-lg'>        
          <BreakdownBox value={tokenStrength.tokenUtility} strength={tokenStrength.tokenUtilityStrength} title='Token Utility:'/>    
          <BreakdownBox value={tokenStrength.demandDrivers} strength={tokenStrength.demandDriversStrength} title='Demand Driver:'/>
          <BreakdownBox value={tokenStrength.valueCreation} strength={tokenStrength.valueCreationStrength} title='Value Creation:'/>
          <BreakdownBox value={tokenStrength.valueCapture} strength={tokenStrength.valueCaptureStrength} title='Value Capture:'/>          
          <BreakdownBox value={tokenStrength.businessModel} strength={tokenStrength.businessModelStrength} title='Business Model:'/>
      </div>
    </>
  )
}
