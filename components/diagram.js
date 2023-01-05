import Image from 'next/image'

export default function Diagram({ diagram }) {
  console.log('🚀 ~ file: diagram.js:4 ~ Diagram ~ diagram', diagram)
  // check for https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1&title=redacted_cartel_tokenomics_diagram_final_version.drawio#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1cATvV6SwisbAa5C3T8NT8vQFIteRI_6o%26export%3Ddownload
  //if not, just use an image.
  const diagramUrl = diagram || null
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
