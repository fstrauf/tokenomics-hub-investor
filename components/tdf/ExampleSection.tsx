import { Disclosure } from '@headlessui/react'
import Image from 'next/image'
import { useState } from 'react'
import ChevronIcon from '../../public/svg/chevron'
import FormDivider from '../form/FormDivider'
import useSWR from 'swr'
import Select from 'react-select'

export const fetcher = async (url, param) => {
  console.log("🚀 ~ file: ExampleSection.tsx:11 ~ fetcher ~ param:", param)
  console.log("🚀 ~ file: ExampleSection.tsx:11 ~ fetcher ~ url:", url)
  const body = { param }
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch data from ${url}`)
  }
  const data = await res.json()
  return data
}

export default function ExampleSection({
  props,
  presetFilters,
  exampleField,
  exampleDetail,
}) {
  const [example, setExample] = useState({})
  const [tagFilters, setTagFilters] = useState({})
  const [catFilters, setCatFilters] = useState({})
  const [isSubelementClicked, setIsSubelementClicked] = useState(false)

  function handleDetailClicked(c) {
    setExample(c)
    setIsSubelementClicked(true)
  }

  let ExampleDetail = ({ onGoBack, example, exampleField }) => {
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
          onClick={onGoBack}
        >
          go back
        </button>
      </div>
    )
  }

  if (exampleDetail !== undefined) {
    ExampleDetail = exampleDetail
  }

  function filterCategories(newValue: MultiValue<any>): void {
    console.log("🚀 ~ file: ExampleSection.tsx:70 ~ filterCategories ~ newValue:", newValue)
    if (newValue.length === 0) {
      setCatFilters({})
    } else {
      setCatFilters(newValue.map((nv) => nv.value))
    }
  }

  function filterTags(newValue: MultiValue<any>): void {
    console.log("🚀 ~ file: ExampleSection.tsx:79 ~ filterTags ~ newValue:", newValue)
    if (newValue.length === 0) {
      setTagFilters({})
    } else {
      setTagFilters(newValue.map((nv) => nv.value))
    }
  }

  function ExamplesSelector() {
    const key = tagFilters && catFilters ? `/api/get/getExamplePostData/?category=${catFilters}?tags=${tagFilters}` : null;
    const { data, error } = useSWR(key,fetcher, { revalidateOnMount: true }
    )
    console.log(
      '🚀 ~ file: ExampleSection.tsx:29 ~ ExampleDetail ~ data:',
      data
    )
    return (
      <div>
        <div className="m-auto flex lg:w-1/2 max-w-5xl mt-3">
          <Select
            defaultValue={presetFilters?.categories}
            id="cat-select"
            isMulti
            placeholder="filter categories"
            name="categories"
            options={props?.Category}
            className="mr-3 w-1/2 text-xs"
            onChange={filterCategories}
          />
          <Select
            defaultValue={presetFilters?.tags}
            id="tag-select"
            placeholder="filter tags"
            isMulti
            name="tags"
            className="w-1/2 text-xs"
            options={props?.Tag}
            onChange={filterTags}
          />
        </div>
        <div className="flex gap-6 overflow-x-auto">
          {data?.map((c) => (
            <div className="flex h-52 flex-col justify-between">
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

  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <>
          <div className="mt-2 rounded-lg border-4  border-gray-300 border-opacity-20">
            <Disclosure.Button className="flex w-full justify-between rounded-sm bg-gray-300 bg-opacity-20 px-4 py-2 text-left text-sm font-medium hover:bg-opacity-100 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
              <FormDivider text="Example" />
              <ChevronIcon />
            </Disclosure.Button>
            <Disclosure.Panel className="px-2 pb-2 text-sm text-gray-500">
              <div className="">
                {/* <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
        Examples
      </h5> */}

                {isSubelementClicked ? (
                  <ExampleDetail
                    onGoBack={() => setIsSubelementClicked(false)}
                    example={example}
                    exampleField={exampleField}
                  />
                ) : (
                  <ExamplesSelector />
                )}
              </div>
            </Disclosure.Panel>
          </div>
        </>
      )}
    </Disclosure>
  )
}