// import { ErrorMessage, Field, Form, Formik } from 'formik'
// // import dynamic from 'next/dynamic'
// import toast, { Toaster } from 'react-hot-toast'
// import FormText from '../form/FormText'
// import BreakdownBox from '../slugView/breakdown-box'
// import FormStrength from '../form/FormStrength'
// import { useUser } from '@clerk/clerk-react/dist/hooks/useUser'
// import { useState } from 'react'
// import Tooltip from '../slugView/Tooltip'
import TDFSideBar from './TDFSideBar'
// import Tiptap from '../TipTap'
// import TDF101 from './TDF101' //dynamically import these based on name
// import TDF102 from './TDF102'
// import TDF103 from './TDF103'
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
      {/* <TDF101 props={props}/> */}
    </div>
  )
}
