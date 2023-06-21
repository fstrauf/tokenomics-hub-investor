import { useState } from 'react'
import Drawer from './Drawer'
import { MechanismCardViewer } from './MechanismCardViewer'
import TDFCalculatorViewer from './TDFCalculatorViewer'

export default function MechanismViewer({ post }) {
  if (post?.Mechanism?.length===0)
    return (
      <h1 className="section-head mt-10 mb-4 text-xl font-bold text-black md:mt-20 md:text-2xl lg:text-3xl">
        Supply and Demand.
      </h1>
    )

  let [mechanismIndex, setMechanismIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const handleViewMechanism = (index) => {
    setMechanismIndex(index)
    setIsOpen(true)
  }

  const mechanismTile = (input, index) => {
    return (
      <div
        key={`${input.isSink}-${index}`}
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
          <MechanismCardViewer mechanism={post.Mechanism[mechanismIndex]} />
        )}
      </Drawer>
      <div className="rounded-lg border-2 p-2">
        <div className="flex justify-center">
          <div className="w-1/2">
            <div className="mb-1 flex gap-2">
              {' '}
              <p>Supply</p>
            </div>
            <div className="overflow-auto rounded-lg border-2 border-slate-300">
              <div
                // key={`supply-${index}`}
                className="flex flex-row flex-wrap gap-2 overflow-auto p-2"
              >
                {post.Mechanism.length > 0 &&
                  post.Mechanism.map((input, index) => (
                    <>
                      {!input.isSink ? (
                        <>{mechanismTile(input, index)}</>
                      ) : (
                        <></>
                      )}
                    </>
                  ))}
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <div className="mb-1 flex gap-2">
              {' '}
              <p>Demand</p>
            </div>

            <div className="rounded-lg border-2 border-slate-300">
              <div
                // key={`demand-${index}`}
                className="flex flex-row flex-wrap gap-2 overflow-auto p-2"
              >
                {post.Mechanism.length > 0 &&
                  post.Mechanism.map((input, index) => (
                    <>
                      {input.isSink ? (
                        <>{mechanismTile(input, index)}</>
                      ) : (
                        <></>
                      )}
                    </>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          <TDFCalculatorViewer values={post} />
        </div>
      </div>
    </section>
  )
}
