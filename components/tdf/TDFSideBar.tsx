export default function TDFSideBar({ designPhases, changePhase }) {
  return (
    <div className="h-140 rounded-lg border-2 p-2 overflow-y-auto">
      {designPhases.map((phase) => (
        <>
          {phase.parentPhaseId ? ( //child
            <button
              onClick={() => changePhase(phase.phaseId)} //we could navigate by name here
              className="block w-full max-w-sm rounded-lg border border-gray-200 bg-white p-2 text-xs shadow hover:bg-gray-100"
            >
              {phase.name}
            </button>
          ) : (
            //parent
            <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 ">
              {phase.name}
            </h5>
          )}
        </>
      ))}
    </div>
  )
}
