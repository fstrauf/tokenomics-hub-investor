import Image from 'next/image'
import { useState } from 'react'

export default function ExampleSection({ content, exampleField }) {
  const [example, setExample] = useState({})
  const [isSubelementClicked, setIsSubelementClicked] = useState(false)

  function handleDetailClicked(c) {
    setExample(c)
    setIsSubelementClicked(true)
  }

  function ExamplesSelector() {
    return (
      <div>
        <div className="flex gap-6 overflow-x-auto">
          {content?.map((c) => (
            <div className="h-52 flex flex-col justify-between">
              <div className="m-auto w-9 sm:w-16">
                <div className="relative m-auto h-24 rounded-lg">
                  <Image
                    alt={`Cover Image for ${c.title}`}
                    className="object-contain"
                    fill={true}
                    src={c.mainImageUrl}
                  />
                </div>
              </div>
              <p className="text-center text-sm font-bold">{c.title}</p>
              <div className="flex items-center justify-center">
                <button
                  className="mt-5 rounded-md border-2 border-dao-red px-1 py-1 text-xs font-medium text-dao-red"
                  onClick={() => handleDetailClicked(c)}
                >
                  Details
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    )
  }

  function ExampleDetail(props) {
    return (
      <div className="flex flex-col justify-between">
        <div>
          <div className="mb-6 font-bold">{example.title}</div>
          <pre
            id="message"
            className="block w-full whitespace-pre-line rounded-lg bg-slate-50 p-2.5 font-sans text-sm text-gray-900"
          >
            {example[exampleField]}
          </pre>
        </div>
        <button
          className="mt-20 w-16 rounded-md border-2 border-dao-red px-1 py-1 text-xs font-medium text-dao-red"
          onClick={props.onGoBack}
        >
          go back
        </button>
      </div>
    )
  }

  return (
    <div className="">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
        Examples
      </h5>

      {isSubelementClicked ? (
        <ExampleDetail onGoBack={() => setIsSubelementClicked(false)} />
      ) : (
        <ExamplesSelector />
      )}
    </div>
  )
}
