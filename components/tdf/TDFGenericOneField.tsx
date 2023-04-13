import { Field, useFormikContext } from 'formik'
// import BreakdownBox from '../slugView/breakdown-box'
import ResourceSection from './ResourceSection'
import { getActiveDesignPhase } from '../../lib/helper'
import ExampleSection from './ExampleSection'
import { designElementStatusUpdate } from '../../lib/designElementStatusField'
import { useEffect } from 'react'

export default function TDFGenericOneField({
  props,
  activePhase,
  placeholder,
  values,
  format = null,
}) {
  // console.log("🚀 ~ file: TDFGenericOneField.tsx:13 ~ values:", values)
  const designPhase = getActiveDesignPhase(props.designPhases, activePhase)
  // console.log("🚀 ~ file: TDFGenericOneField.tsx:15 ~ designPhase:", designPhase)
  const { setFieldValue } = useFormikContext()

  useEffect(() => {
    if (['101', '102', '103'].includes(activePhase.toString()))
      designElementStatusUpdate(values, activePhase.toString(), setFieldValue)
  }, [])
  // async function generateSuggestions(event) {
  //   event.preventDefault();
  //   try {
  //     const response = await fetch("/api/generate", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ animal: values.title }),

  //     });

  //     const data = await response.json();
  //     if (response.status !== 200) {
  //       throw data.error || new Error(`Request failed with status ${response.status}`);
  //     }

  //     setFieldValue(designPhase.postDataElement, data.result)
  //   } catch(error) {
  //     console.error(error);
  //     alert(error.message);
  //   }
  // }
  async function formatText(event) {
    event.preventDefault()
    try {
      const response = await fetch('/api/gptFormat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: values[designPhase.postDataElement],
          format: format,
        }),
      })

      const data = await response.json()
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        )
      }

      setFieldValue(designPhase.postDataElement, data.result)
    } catch (error) {
      console.error(error)
      alert(error.message)
    }
  }
  return (
    <div className="flex flex-col">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
        {designPhase.name}
      </h5>
      <Field
        as="textarea"
        rows="6"
        name={designPhase.postDataElement}
        placeholder={placeholder}
        className="mb-3 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
      />
      {format ? (
        <button
          className="w-14 rounded-md bg-dao-red px-1 py-1 text-xs font-medium text-white"
          onClick={formatText}
        >
          Format
        </button>
      ) : (
        <></>
      )}

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
