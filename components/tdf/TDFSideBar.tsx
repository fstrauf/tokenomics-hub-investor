import {
  designElementStatus,
  postType,
  designPhaseGrouping,
} from '../../lib/helper'
import { Tooltip } from 'react-tippy'
import 'react-tippy/dist/tippy.css'
import { Disclosure } from '@headlessui/react'
import ChevronIcon from '../../public/svg/chevron'
import FormDivider from '../form/FormDivider'

export default function TDFSideBar({
  designPhases,
  changePhase,
  activePhase,
  values,
  reviewRequiredFields,
}) {
  let phases = designPhases
  console.log('🚀 ~ file: TDFSideBar.tsx:14 ~ phases:', phases)
  if (values.postType === postType.report) {
    phases = designPhases.filter((phase) => phase.isReport)
  }

  let inProgress = values.DesignElement.filter((de) => {
    return de.designElementStatus === designElementStatus.in_progress
  })

  let completed = values.DesignElement.filter((de) => {
    return de.designElementStatus === designElementStatus.completed
  })

  function groupedPhases(group: designPhaseGrouping) {
    return phases
      .filter((phase) => phase.phaseGrouping === group)
      .map((phase) => (
        <div key={phase.id}>
          {phase.parentPhaseId ? (
            <button
              type="button"
              onClick={() => changePhase(phase.phaseId)} //we could navigate by name here
              className={`${
                reviewRequiredFields[phase.phaseId] || false
                  ? 'border-2 border-red-600'
                  : ''
              } ${
                phase.phaseId === activePhase ? 'border-2 border-dao-green' : ''
              }  block w-full max-w-sm rounded-lg border border-gray-200 bg-white p-2 text-xs shadow hover:bg-gray-100`}
            >
              <div className="flex">
                <div className="w-[95%]">{phase.name}</div>
                <div className="flex w-[5%] items-center">
                  <Tooltip
                    title={
                      inProgress.find(
                        (val) =>
                          val.designPhasesId?.toString() ===
                          phase.phaseId?.toString()
                      )
                        ? 'In Progress'
                        : completed.find(
                            (val) =>
                              val.designPhasesId?.toString() ===
                              phase.phaseId?.toString()
                          )
                        ? 'Completed'
                        : 'New'
                    }
                    size="small"
                    position="bottom"
                    arrow={true}
                    className="tooltip-class"
                  >
                    <div
                      className={`flex h-[10px] w-[10px] justify-end rounded-[50%] ${
                        inProgress.find(
                          (val) =>
                            val.designPhasesId?.toString() ===
                            phase.phaseId?.toString()
                        )
                          ? 'bg-[#FFD260]'
                          : 'bg-[#D9D9D9]'
                      }  ${
                        completed.find(
                          (val) =>
                            val.designPhasesId?.toString() ===
                            phase.phaseId?.toString()
                        )
                          ? 'bg-[#5FEB53]'
                          : ''
                      } `}
                    />
                  </Tooltip>
                </div>
              </div>
            </button>
          ) : (
            <button
              type="button"
              className={`${
                phase.phaseId === activePhase ? 'bg-dao-red' : ''
              } mt-2 block w-full rounded-lg  border border-gray-200 text-center text-lg font-bold tracking-tight text-gray-900 hover:bg-gray-100`}
              onClick={() => changePhase(phase.phaseId)}
            >
              <div className="ml-1">{phase.name}</div>
            </button>
          )}
        </div>
      ))
  }

  return (
    <div className="overflow-y-auto rounded-lg border-2 border-gray-100 bg-white p-2">
      <Disclosure defaultOpen>
        {
          <div className="mt-2 rounded-lg border-4  border-gray-300 border-opacity-20">
            <Disclosure.Button className="flex w-full justify-between rounded-sm bg-gray-300 bg-opacity-20 px-4 py-1 text-left text-sm font-medium hover:bg-opacity-100 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
              <FormDivider text={designPhaseGrouping.research} />
              <ChevronIcon />
            </Disclosure.Button>
            <Disclosure.Panel className="my-2 px-2 text-sm text-gray-500">
              {groupedPhases(designPhaseGrouping.research)}
            </Disclosure.Panel>
          </div>
        }
      </Disclosure>
      <Disclosure defaultOpen>
        {
          <div className="mt-2 rounded-lg border-4  border-gray-300 border-opacity-20">
            <Disclosure.Button className="flex w-full justify-between rounded-sm bg-gray-300 bg-opacity-20 px-4 py-1 text-left text-sm font-medium hover:bg-opacity-100 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
              <FormDivider text={designPhaseGrouping.design} />
              <ChevronIcon />
            </Disclosure.Button>
            <Disclosure.Panel className="my-2 px-2 text-sm text-gray-500">
              {groupedPhases(designPhaseGrouping.design)}
            </Disclosure.Panel>
          </div>
        }
      </Disclosure>
      <Disclosure defaultOpen>
        {
          <div className="mt-2 rounded-lg border-4  border-gray-300 border-opacity-20">
            <Disclosure.Button className="flex w-full justify-between rounded-sm bg-gray-300 bg-opacity-20 px-4 py-1 text-left text-sm font-medium hover:bg-opacity-100 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
              <FormDivider text={designPhaseGrouping.review} />
              <ChevronIcon />
            </Disclosure.Button>
            <Disclosure.Panel className="my-2 px-2 text-sm text-gray-500">
              {groupedPhases(designPhaseGrouping.review)}
            </Disclosure.Panel>
          </div>
        }
      </Disclosure>
    </div>
  )
}
