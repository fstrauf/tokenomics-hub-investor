
import TDFSideBar from './TDFSideBar'
import { useState } from 'react'
import dynamic from 'next/dynamic'

export default function TDFMain({ props }) {
  const [activePhase, setActivePhase] = useState(101) //props.design.activePhase

  function handlePhaseChange(phase) {
    setActivePhase(phase);
  }

  function renderSwitch() {
    switch(activePhase) {
      case 101:
        const TDF101 = dynamic(() => import('./TDF101'), {
          loading: () => <p>Loading</p>,
        })
        return <TDF101 props={props} />;
        case 102:
          const TDF102 = dynamic(() => import('./TDF102'), {
            loading: () => <p>Loading</p>,
          })
          return <TDF102 props={props} />
        case 103:
          const TDF103 = dynamic(() => import('./TDF103'), {
            loading: () => <p>Loading</p>,
          })
          return <TDF103 props={props} />
      default:
        const DefaultView = dynamic(() => import('./TDF101'), {
          loading: () => <p>Loading</p>,
        })
        return <DefaultView props={props} />;
    }
  }

  return (
    <div className="mt-5 mb-5 flex flex-row ">
      <TDFSideBar designPhases={props.designPhases} changePhase={handlePhaseChange} />
      <div>{renderSwitch()}</div>
    </div>
  )
}
