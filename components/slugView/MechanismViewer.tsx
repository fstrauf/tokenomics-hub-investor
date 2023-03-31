import { useState } from "react"
// import MechanismCardViewer from "../slugView/MechanismCardViewer"
import Drawer from "./Drawer"
import { MechanismCardViewer } from "./MechanismCardViewer"

export default function MechanismViewer({ mechanisms }) {
  console.log(
    '🚀 ~ file: MechanismViewer.tsx:2 ~ MechanismViewer ~ mechanisms:',
    mechanisms
  )
  let [mechanismIndex, setMechanismIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const handleViewMechanism = (index) => {
    console.log("🚀 ~ file: MechanismViewer.tsx:14 ~ handleViewMechanism ~ index:", index)
    setMechanismIndex(index)
    setIsOpen(true)
  }

  const mechanismTile = (input, index) => {
    return (
      <div
        key={index}
        className="grid h-24 w-36 content-between rounded-md border-2 border-dao-green p-1 text-xs"
      >
        {' '}
        <div>
          <div className="flex">
            <div
              className="mr-2 h-5 w-5 bg-slate-600"
              style={{ background: input.color }}
            ></div>
            <p className="">{input.name}</p>
          </div>
          {input.isSink ? (
            <></>
          ) : (
            <p className="mt-2">{input.percentageAllocation} %</p>
          )}
        </div>
        <div className="flex h-7 border-t-2">
          {' '}
          <button className="w-full" onClick={() => handleViewMechanism(index)}>
            Details
          </button>
        </div>
      </div>
    )
  }

  return (
    <section>
      <h1 className="section-head mt-10 mb-4 text-xl font-bold text-black md:mt-20 md:text-2xl lg:text-3xl">
        Supply and Demand.
      </h1>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        {isOpen && (
          <MechanismCardViewer
            mechanism={mechanisms[mechanismIndex]}
            // mechanismIndex={mechanismIndex}
            // setFieldValue={setFieldValue}
            // users={values.PostUser} // mechanismImpactFactors={mechanismImpactFactors}
          />
        )}
      </Drawer>
      <div className="flex justify-center rounded-lg border-2 p-2">
        <div className="w-1/2">
          <div className="mb-1 flex gap-2">
            {' '}
            <p>Supply</p>
            {/* <button
                    type="button"
                    className="h-11 w-28 rounded-md border-2 border-dao-green text-xs font-bold"
                    onClick={() => handleNewMechanism(arrayHelpers, false)}
                  >
                    Add Incentive
                  </button> */}
          </div>
          <div className="h-60 overflow-auto rounded-lg border-2 border-slate-300">
            <div
              key={4711}
              className="flex flex-row flex-wrap gap-2 overflow-auto p-2"
            >
              {mechanisms.length > 0 &&
                mechanisms.map((input, index) => (
                  <>
                    {!input.isSink ? <>{mechanismTile(input, index)}</> : <></>}
                  </>
                ))}
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <div className="mb-1 flex gap-2">
            {' '}
            <p>Demand</p>
            {/* <button
                    type="button"
                    className="h-11 w-28 rounded-md border-2 border-dao-green text-xs font-bold"
                    onClick={() => handleNewMechanism(arrayHelpers, true)}
                  >
                    Add Mechanism
                  </button> */}
          </div>

          <div className="h-60 rounded-lg border-2 border-slate-300">
            <div
              key={4811}
              className="flex flex-row flex-wrap gap-2 overflow-auto p-2"
            >
              {mechanisms.length > 0 &&
                mechanisms.map((input, index) => (
                  <>
                    {input.isSink ? <>{mechanismTile(input, index)}</> : <></>}
                  </>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
