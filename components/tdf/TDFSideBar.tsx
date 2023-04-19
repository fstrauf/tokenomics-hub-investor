import { designElementStatus, postType } from '../../lib/helper'
import { Tooltip } from 'react-tippy'
import 'react-tippy/dist/tippy.css'

export default function TDFSideBar({
  designPhases,
  changePhase,
  activePhase,
  values,
  reviewRequiredFields
}) {
  // console.log("🚀 ~ file: TDFSideBar.tsx:12 ~ reviewRequiredFields:", reviewRequiredFields)

  let phases = designPhases
  if (values.postType === postType.report) {
    phases = designPhases.filter((phase) => phase.isReport)
    // console.log("🚀 ~ file: TDFSideBar.tsx:18 ~ phases:", phases)
  }

  let inProgress = values.DesignElement.filter((de) => {
    return de.designElementStatus === designElementStatus.in_progress
  })

  let completed = values.DesignElement.filter((de) => {
    return de.designElementStatus === designElementStatus.completed
  })

  return (
    <div className="overflow-y-auto rounded-lg border-2 border-gray-100 bg-white p-2">
      {phases.map((phase) => (
        <div key={phase.id}>
          {phase.parentPhaseId ? ( 
            <button
              type="button"
              onClick={() => changePhase(phase.phaseId)} //we could navigate by name here
              className={`${
                phase.phaseId === activePhase ? 'border-dao-green border-2' : ''
              } ${reviewRequiredFields[phase.phaseId] ? 'border-dao-red border-2' : ''} block w-full max-w-sm rounded-lg border border-gray-200 bg-white p-2 text-xs shadow hover:bg-gray-100`}
            >
              <div className="flex">
                <div className="w-[95%]">{phase.name}</div>
                <div className="flex w-[5%] items-center">
                  <Tooltip
                    title={
                      inProgress.find(
                        (val) =>
                          val.designPhasesId?.toString() ===
                          phase.phaseId?.toString()
                      )
                        ? 'In Progress'
                        : completed.find(
                            (val) =>
                              val.designPhasesId?.toString() ===
                              phase.phaseId?.toString()
                          )
                        ? 'Completed'
                        : 'New'
                    }
                    size="small"
                    position="bottom"
                    arrow={true}
                    className="tooltip-class"
                  >
                    <div
                      className={`flex h-[10px] w-[10px] justify-end rounded-[50%] ${
                        inProgress.find(
                          (val) =>
                            val.designPhasesId?.toString() ===
                            phase.phaseId?.toString()
                        )
                          ? 'bg-[#FFD260]'
                          : 'bg-[#D9D9D9]'
                      }  ${
                        completed.find(
                          (val) =>
                            val.designPhasesId?.toString() ===
                            phase.phaseId?.toString()
                        )
                          ? 'bg-[#5FEB53]'
                          : ''
                      } `}
                    />
                  </Tooltip>
                </div>
              </div>
            </button>
          ) : (
            <button
              type="button"
              className={`${
                phase.phaseId === activePhase ? 'bg-dao-red' : ''
              } mt-2 block w-full rounded-lg  border border-gray-200 text-center text-lg font-bold tracking-tight text-gray-900 hover:bg-gray-100`}
              onClick={() => changePhase(phase.phaseId)}
            >
              <div className="ml-1">{phase.name}</div>
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
