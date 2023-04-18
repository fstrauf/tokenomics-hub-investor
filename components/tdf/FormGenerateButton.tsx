import { useUser } from '@clerk/clerk-react/dist/hooks/useUser'
import { useState } from 'react'
export default function FormGenerateButton({ title, scope, setFieldValue }) {
  const { user } = useUser()
  const contributor = user?.publicMetadata?.contributor || false
  const [isSubmitting, setIsSubmitting] = useState(false)
  async function generateSuggestions(event, title, scope) {
    // console.log("🚀 ~ file: TDFGenericOneField.tsx:24 ~ generateSuggestions ~ scope:", scope)
    event.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/gptGenerate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: title, scope: scope }),
      })

      const data = await response.json()

      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        )
      }
      setFieldValue(scope, data.result)
      setIsSubmitting(false)
    } catch (error) {
      console.error(error)
      alert(error.message)
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {contributor ? (
        <button
          onClick={(event) => generateSuggestions(event, title, scope)}
          className="rounded-md bg-dao-red px-2 py-1 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"
          disabled={isSubmitting}
        >
          Generate
        </button>
      ) : (
        <></>
      )}
    </>
  )
}
