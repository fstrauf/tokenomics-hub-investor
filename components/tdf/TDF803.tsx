import { Field, useFormikContext } from 'formik'
import { useEffect } from 'react'
import { designElementStatusUpdate } from '../../lib/designElementStatusField'
import { getActiveDesignPhase } from '../../lib/helper'
import FormImageSelect from '../form/FormImageSelect'
import ResourceSection from './ResourceSection'
import ExampleSection from './ExampleSection'

export default function TDF803({ props, values, activePhase }) {
  const designPhase = getActiveDesignPhase(props.designPhases, activePhase)
  const { setFieldValue } = useFormikContext()

  useEffect(() => {
    designElementStatusUpdate(values, designPhase.phaseId, setFieldValue)
  }, [])
  return (
    <div className="flex flex-col">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
        {designPhase.name}
      </h5>

      <div className="mb-6">
        <div className="basis-1/4">

          <p className="mb-2 text-xs font-extralight text-gray-500">
            Provide a link to a diagram{' '}
            <a
              className="underline"
              href="https://www.notion.so/tokenomicsdao/Creating-Diagrams-ebc097180eb24380ad3e22ebf25f0189#bf3266cdce724102b2c3155d8fb51239"
            >
              (how to)
            </a>{' '}
            or upload your own diagram
          </p>
        </div>
        <div className="mb-2">
          <Field
            name="diagramUrl"
            as={FormImageSelect}
            onChange={(e) => setFieldValue('diagramUrl', e)}
          />
        </div>
        <Field
          type="url"
          name="diagramUrl"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
        />
      </div>
      <ResourceSection content={designPhase.Resources} />
      <ExampleSection
        presetCategories={values.categories}
        presetTags={values.tags}
        props={props}
        exampleField={designPhase.postDataElement}
        exampleDetail={undefined}
      />
    </div>
  )
}
