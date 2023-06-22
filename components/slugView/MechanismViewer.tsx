import { useState } from 'react'
import Drawer from './Drawer'
import { MechanismCardViewer } from './MechanismCardViewer'
import TDFCalculatorViewer from './TDFCalculatorViewer'
import MechanismTile from '../tdf/MechanismTile'
// import MechanismCardSupplyvsDemand from '../tdf/MechanismCardSupplyvsDemand'

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
                        // <>{mechanismTile(input, index)}</>
                        <MechanismTile
                        input={input}
                        index={index}
                        viewer={true}
                        arrayHelpers={null}
                        handleEditMechanism={handleViewMechanism}
                      />
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
                        // <>{mechanismTile(input, index)}</>
                        <MechanismTile
                        input={input}
                        index={index}
                        viewer={true}
                        arrayHelpers={null}
                        handleEditMechanism={handleViewMechanism}
                      />
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
