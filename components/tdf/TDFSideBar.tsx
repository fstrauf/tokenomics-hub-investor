export default function TDFSideBar({ designPhases, changePhase, activePhase }) {
  // console.log("🚀 ~ file: tdfSideBar.tsx:2 ~ TDFSideBar ~ designPhases", designPhases)
  return (
    <div className="h-140 rounded-lg border-2 p-2 overflow-y-auto">
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
            <button  className={`${phase.phaseId===activePhase ? 'focus:ring-dao-red focus:ring-2 rounded-md' : ''} mb-2 text-lg font-bold tracking-tight text-gray-900`} onClick={() => changePhase(phase.phaseId)}>
              {phase.name}
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
