import { useUser } from '@clerk/clerk-react/dist/hooks/useUser'
import { useState } from 'react'
export default function FormFormatButton({ text, format, setFieldValue, scope }) {
  const { user } = useUser()
  const contributor = user?.publicMetadata?.contributor || false
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function formatText(event, text, format) {
    event.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/gptFormat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
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

      setFieldValue(scope, data.result)
      setIsSubmitting(false)
    } catch (error) {
      console.error(error)
      setIsSubmitting(false)
      alert(error.message)
    }
  }

  return (
    <>
      {contributor ? (
        <button
          onClick={(event) => formatText(event, text, format)}
          className="rounded-md bg-dao-red px-2 py-1 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"
          disabled={isSubmitting}
        >
          Format
        </button>
      ) : (
        <></>
      )}
    </>
  )
}
