import { Disclosure } from '@headlessui/react'
// import Tiptap from '../TipTap'
import ChevronIcon from '../../public/svg/chevron'
import FormDivider from '../form/FormDivider'
import { event } from 'nextjs-google-analytics'

export default function WalkthroughSection() {
  function recordGAEvent(clickEvent: MouseEvent<HTMLButtonElement, MouseEvent>): void {    
    event(`WalkthroughSection`, {
      category: 'UserAction',
      label: 'WalkthroughSection',
    })
  }

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <div className="mt-2 rounded-lg border-4  border-gray-300 border-opacity-20">
            <Disclosure.Button onClick={recordGAEvent} className="flex w-full justify-between rounded-sm bg-gray-300 bg-opacity-20 px-4 py-1 text-left text-sm font-medium hover:bg-opacity-100 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
              <FormDivider text="Video Walkthrough" />
              <ChevronIcon />
              {/* <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
                Resources
              </h5> */}
            </Disclosure.Button>
            <Disclosure.Panel className="my-2 px-2 text-sm text-gray-500">
              <div>
                <div>
                  <p>coming soon...</p>
                </div>
              </div>
            </Disclosure.Panel>
          </div>
        </>
      )}
    </Disclosure>
  )
}
