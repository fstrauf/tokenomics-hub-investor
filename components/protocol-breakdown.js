import BreakdownBox from './breakdown-box'

export default function ProtocolBreakdown({ utility, demand, capture, creation }) {
  return (
    <>
    <h1>Token Strength</h1>
      <div className='grid border-4 border-dashed'>        
          <BreakdownBox value={utility} title='Token Utility:'/>    
          <BreakdownBox value={demand} title='Demand Driver:'/>
          <BreakdownBox value={capture} title='Value Capture:'/>
          <BreakdownBox value={creation} title='Value Creation:'/>
      </div>
    </>
  )
}
