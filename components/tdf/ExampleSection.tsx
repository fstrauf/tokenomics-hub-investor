import { Disclosure } from '@headlessui/react'
import Image from 'next/image'
import { useState } from 'react'
import ChevronIcon from '../../public/svg/chevron'
import FormDivider from '../form/FormDivider'
import useSWR from 'swr'
import Select from 'react-select'
import { event } from 'nextjs-google-analytics'
import { validateTierAccess } from '../../lib/helper'
import GenericPopover from '../generic/GenericPopover'
import SubscriptionTable from '../../pages/SubscriptionTable'

export const fetcher = async (url, param) => {
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
  presetTags,
  presetCategories,
  exampleField,
  exampleDetail,
}) {
  const [example, setExample] = useState({})
  const [tagFilters, setTagFilters] = useState(presetTags || null)
  const [catFilters, setCatFilters] = useState(presetCategories || null)
  const [isOpen, setIsOpen] = useState(false)

  const [isSubelementClicked, setIsSubelementClicked] = useState(false)

  function handleDetailClicked(c) {
    //check subscription
    if (validateTierAccess(props)) {
      setExample(c)
      setIsSubelementClicked(true)
      event(`ExampleSection`, {
        category: 'UserAction',
        label: 'ExampleSection',
      })
    } else {
      setIsOpen(true)
      //show subscription popup
    }
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

  const key =
    tagFilters && catFilters
      ? `/api/get/getExamplePostData/?categories=${JSON.stringify(
          catFilters.map((nv) => nv.value)
        )}&tags=${JSON.stringify(tagFilters.map((nv) => nv.value))}`
      : null
  const { data, error, isLoading, isValidating } = useSWR(key, fetcher, {
    revalidateOnMount: true,
  })

  function ExamplesSelector() {
    if (isLoading) return <div className="skeleton">loading</div>
    return (
      <div>
        <GenericPopover isOpen={isOpen} setIsOpen={setIsOpen}>
          <div>
            <h1>You need to subscribe to see this information</h1>
            <SubscriptionTable />
          </div>
        </GenericPopover>
        <div className="m-auto mt-3 flex max-w-5xl lg:w-1/2">
          <Select
            defaultValue={catFilters}
            id="cat-select"
            isMulti
            placeholder="filter categories"
            name="categories"
            options={props?.Category}
            className="mr-3 w-1/2 text-xs"
            onChange={setCatFilters}
          />
          <Select
            defaultValue={tagFilters}
            id="tag-select"
            placeholder="filter tags"
            isMulti
            name="tags"
            className="w-1/2 text-xs"
            options={props?.Tag}
            onChange={setTagFilters}
          />          
        </div>
        <div className="flex gap-6 overflow-x-auto">
          {data?.map((c) => (
            <div key={c.id} className="flex h-52 flex-col justify-between">
              <div className="m-auto w-9 sm:w-16">
                <div
                  className="relative m-auto h-24 rounded-lg"
                  style={{ position: 'relative' }}
                >
                  {c.mainImageUrl ? (
                    <Image
                      alt={`Cover Image for ${c.title}`}
                      className="relative object-contain"
                      fill={true}
                      src={c.mainImageUrl}
                      sizes="(max-width: 64px) 100vw, 64px"
                    />
                  ): <></>}
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
            <Disclosure.Button className="flex w-full justify-between rounded-sm bg-gray-300 bg-opacity-20 px-4 py-1 text-left text-sm font-medium hover:bg-opacity-100 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
              <FormDivider text="Example" />
              <ChevronIcon />
            </Disclosure.Button>
            <Disclosure.Panel className="px-2 pb-2 text-sm text-gray-500">
              <div className="">
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
