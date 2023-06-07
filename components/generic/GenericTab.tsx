import { Tab } from '@headlessui/react'
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function GenericTab({ tabs, panels }) {

  return (
    <div className="m-auto w-full max-w-md px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-gray-300 p-1">
          {tabs.map((data) => {
            return (
              <>
                <Tab
                  key={data.tab}
                  className={({ selected }) =>
                    classNames(
                      'text-black-700 w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-white shadow'
                        : 'text-blue hover:bg-white/[0.12] hover:text-white'
                    )
                  }
                >
                  {data.tab}
                </Tab>
              </>
            )
          })}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {panels.map((panel) => {
            return (
              <>
                <Tab.Panel
                  className={classNames(
                    'rounded-xl bg-white p-3',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                  )}
                  key={panel}
                >
                  {panel}
                </Tab.Panel>
              </>
            )
          })}
           </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
