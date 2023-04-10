import React from 'react'

export const FormErrorMessage = ({ field, reviewRequiredFields }) => {
  // console.log("🚀 ~ file: FormErrorMessage.tsx:4 ~ FormErrorMessage ~ reviewRequiredFields", reviewRequiredFields)
  if(reviewRequiredFields===undefined){
    return(<></>)
  }

  let message = ''
  if (reviewRequiredFields[field]) {
    message = reviewRequiredFields[field]
  }
  return (
    <>
      <span className="mt-2 text-xs text-red-600 dark:text-red-400">{message}</span>
    </>
  )
}

export default FormErrorMessage
