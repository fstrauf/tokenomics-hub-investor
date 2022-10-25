import BreakdownBox from './breakdown-box'

export default function ProtocolBreakdown({ utility, demand, capture, creation, business }) {
  return (
    <>
    <h1 className='text-xl mb-2 text-gray-500'>Token Strength</h1>
      <div className='grid border-4 border-dashed rounded-lg'>        
          <BreakdownBox value={utility} title='Token Utility:'/>    
          <BreakdownBox value={demand} title='Demand Driver:'/>
          <BreakdownBox value={capture} title='Value Capture:'/>
          <BreakdownBox value={creation} title='Value Creation:'/>
          <BreakdownBox value={business} title='Business Model:'/>
      </div>
    </>
  )
}
