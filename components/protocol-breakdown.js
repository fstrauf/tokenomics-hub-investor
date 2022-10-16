import BreakdownBox from './breakdown-box'

export default function ProtocolBreakdown({ utility, demand, capture, creation }) {
  return (
    <>
      <div>
        <BreakdownBox value={utility} title='Token Utility:' />
      </div>
      <div>
        <BreakdownBox value={demand} title='Demand Driver:'/>
      </div>
      <div>
        <BreakdownBox value={capture} title='Value Capture:'/>
      </div>
      <div>
        <BreakdownBox value={creation} title='Value Creation:'/>
      </div>
    </>
  )
}
