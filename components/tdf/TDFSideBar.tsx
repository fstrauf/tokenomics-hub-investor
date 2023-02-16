// import { ErrorMessage, Field, Form, Formik } from 'formik'
// // import dynamic from 'next/dynamic'
// import toast, { Toaster } from 'react-hot-toast'
// import FormText from '../form/FormText'
// import BreakdownBox from '../slugView/breakdown-box'
// import FormStrength from '../form/FormStrength'
// import { useUser } from '@clerk/clerk-react/dist/hooks/useUser'
// import { useState } from 'react'
// import Tooltip from '../slugView/Tooltip'

export default function TDFSideBar({ designPhases, changePhase }) {  
console.log("🚀 ~ file: tdfSideBar.tsx:12 ~ TDFSideBar ~ designPhases", designPhases)

  return (
    <div className="h-140 rounded-lg border-2 p-2">
      {designPhases.map((phase) => (
        <>
          {phase.parentPhaseId ? ( //child
            <button
              onClick={() => changePhase(phase.id)} //we could navigate by name here
              className="block max-w-sm rounded-lg border border-gray-200 bg-white p-2 shadow hover:bg-gray-100"
            >
              {/* <h5 className="text-base tracking-tight text-gray-900 "> */}
                {phase.name}
              {/* </h5> */}
            </button>
          ) : (
            //parent
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
              {phase.name}
            </h5>
          )}
        </>
      ))}
    </div>
  )
}
