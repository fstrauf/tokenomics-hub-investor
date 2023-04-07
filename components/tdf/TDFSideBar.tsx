import { useRouter } from 'next/router'

export default function TDFSideBar({ designPhases, changePhase, activePhase }) {
  const router = useRouter()

  console.log(
    '🚀 ~ file: TDFSideBar.tsx:2 ~ TDFSideBar ~ designPhases:',
    designPhases
  )

  const filteredPhases = designPhases.filter((phase) => phase.isReport)
  // const DesignPhase = designPhases.filter((phase) => phase.isReport === false)

  return (
    <div className="overflow-y-auto rounded-lg border-2 border-gray-100 bg-white p-2">
      {router.pathname === '/newPost'
        ? filteredPhases.map((phase) => (
            <div key={phase.id}>
              {phase.parentPhaseId ? ( //child
                <button
                  onClick={() => changePhase(phase.phaseId)} //we could navigate by name here
                  className={`${
                    phase.phaseId === activePhase ? 'bg-dao-red' : ''
                  } block w-full max-w-sm rounded-lg border border-gray-200 bg-white p-2 text-xs shadow hover:bg-gray-100`}
                >
                  {phase.name}
                </button>
              ) : (
                //parent
                <button
                  className={`${
                    phase.phaseId === activePhase ? 'bg-dao-red' : ''
                  } mt-2 block w-full rounded-lg  border border-gray-200 text-lg font-bold tracking-tight text-gray-900 hover:bg-gray-100`}
                  onClick={() => changePhase(phase.phaseId)}
                >
                  {phase.name}
                </button>
              )}
            </div>
          ))
        : designPhases.map((phase) => (
            <div key={phase.id}>
              {phase.parentPhaseId ? ( //child
                <button
                  onClick={() => changePhase(phase.phaseId)} //we could navigate by name here
                  className={`${
                    phase.phaseId === activePhase ? 'bg-dao-red' : ''
                  } block w-full max-w-sm rounded-lg border border-gray-200 bg-white p-2 text-xs shadow hover:bg-gray-100`}
                >
                  {phase.name}
                </button>
              ) : (
                //parent
                <button
                  className={`${
                    phase.phaseId === activePhase ? 'bg-dao-red' : ''
                  } mt-2 block w-full rounded-lg  border border-gray-200 text-lg font-bold tracking-tight text-gray-900 hover:bg-gray-100`}
                  onClick={() => changePhase(phase.phaseId)}
                >
                  {phase.name}
                </button>
              )}
            </div>
          ))}
    </div>
  )
}
