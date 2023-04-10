export default function TDFSideBar({ designPhases, changePhase, activePhase }) {
  // console.log("🚀 ~ file: tdfSideBar.tsx:2 ~ TDFSideBar ~ designPhases", designPhases)
  return (
    <div className="rounded-lg border-2 p-2 overflow-y-auto border-gray-100 bg-white">
      {designPhases.map((phase) => (
        <div key={phase.id}>
          {phase.parentPhaseId ? ( //child
            <button
              onClick={() => changePhase(phase.phaseId)} //we could navigate by name here
              className={`${phase.phaseId===activePhase ? 'bg-dao-red' : ''} block w-full max-w-sm rounded-lg border border-gray-200 bg-white p-2 text-xs shadow hover:bg-gray-100`}
            >
              {phase.name}
            </button>
          ) : (
            //parent
            <button  className={`${phase.phaseId===activePhase ? 'bg-dao-red' : ''} mt-2 text-lg block w-full  font-bold rounded-lg border border-gray-200 tracking-tight text-gray-900 hover:bg-gray-100`} onClick={() => changePhase(phase.phaseId)}>
              {phase.name}
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
