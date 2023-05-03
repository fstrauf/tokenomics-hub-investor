import { useFormikContext } from 'formik'
import { useEffect, useState } from 'react'
import { designElementStatusUpdate } from '../../lib/designElementStatusField'
import { getActiveDesignPhase } from '../../lib/helper'
import ResourceSection from './ResourceSection'
import { event } from 'nextjs-google-analytics'
import WalkthroughSection from './WalkthroughSection'

export default function TDF701({ props, values, activePhase }) {
  const designPhase = getActiveDesignPhase(props.designPhases, activePhase)

  const [showNote, setShowNote] = useState(false)
  function recordGAEvent(
    clickEvent: MouseEvent<HTMLButtonElement, MouseEvent>,
    scope: string
  ): void {
    event(`ExportSection ${scope}`, {
      category: 'UserAction',
      label: scope,
    })
    setShowNote(true)
  }

  const { setFieldValue } = useFormikContext()

  useEffect(() => {
    designElementStatusUpdate(values, designPhase.phaseId, setFieldValue)
  }, [])

  return (
    <div>
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
        {designPhase.name}
      </h5>
      <div className="flex flex-col gap-2">
        <button
          className="w-32 rounded-md bg-dao-red py-1 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"
          onClick={(event) => recordGAEvent(event, 'pdf')}
        >
          Export as PDF
        </button>
        <button
          className="w-32 rounded-md bg-dao-red py-1 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"
          onClick={(event) => recordGAEvent(event, 'ppt')}
        >
          Export as PPT
        </button>
        <button
          className="w-32 rounded-md bg-dao-red py-1 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"
          onClick={(event) => recordGAEvent(event, 'gitbook')}
        >
          Export as Gitbook
        </button>
        {showNote ? (
          <p>Thanks for your interest! This feature is coming soon.</p>
        ) : (
          <></>
        )}
      </div>
      <ResourceSection content={designPhase.Resources} />
      <WalkthroughSection />
    </div>
  )
}
