import Image from 'next/image'

export default function Diagram({ diagram }) {

  if (diagram === '')
    return (
      <div>
      <h1 className="section-head mt-10 mb-4 text-xl font-bold text-black md:mt-20 md:text-2xl lg:text-3xl">
        Diagram.
      </h1>
      </div>
    )

  const diagramUrl = diagram || null
  console.log("🚀 ~ file: diagram.js:6 ~ Diagram ~ diagramUrl:", diagramUrl)
  var isDiagram = true
  if (diagramUrl?.indexOf('viewer.diagrams.net') < 0) {
    isDiagram = false
  }

  return (
    <section>
      <h1 className="section-head mt-10 mb-4 text-xl font-bold text-black md:mt-20 md:text-2xl lg:text-3xl">
        Diagram.
      </h1>
      <div className="flex justify-center rounded-lg border-2">
        {isDiagram ? (
          <iframe className="m-2 h-140 w-11/12" frameBorder="0" src={diagramUrl} />
        ) : (
          <div className="relative m-auto h-140 w-11/12 rounded-lg object-fill">
            <Image alt="" src={diagramUrl} fill={true} />
          </div>
        )}
      </div>
    </section>
  )
}
