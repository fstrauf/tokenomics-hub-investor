import { Field, FieldArray } from 'formik'
import React from 'react'

const usersTable = [
  { who: 'Liquidity Provider', task: 'provide liquidity' },
  { who: 'Liquidity Provider', task: 'set fees' },
]

export const FormTable = ({
  field,
  form,
  // options,
  // isMulti = false,
  placeholder = 'Select or create',
}) => {
  // if(field.value ===''){
  //   form.setFieldValue(
  //     field.name,
  //     usersTable,
  //   );
  // }

  // function onChange(option) {
  //   // console.log(option)
  //   // console.log(field.name)
  //   form.setFieldValue(
  //     field.name,
  //     option ? (option).map((item) => item) : [],
  //   );
  // }

  const header = (
    <>
      <p className="text-xs font-bold uppercase text-gray-700">User</p>
      <p className="w-16 text-xs font-bold uppercase text-gray-700">Task</p>
      <p></p>
    </>
  )

  const monthRow = (input, index, arrayHelpers) => {
    console.log("🚀 ~ file: FormTable.tsx:41 ~ monthRow ~ index", index)
    console.log(`${field.name}.${index}.who`)
    return (
      <>
        {/* <textarea
          className="w-5/12 text-xs"
          value={input.who}
        ></textarea>
        <textarea
          className="w-5/12 text-xs"
          value={input.task}
        ></textarea> */}
        <Field
          name={`${field.name}.${index}.who`}
          placeholder="who"
          className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"          
          as="textarea"
        />
        <Field
          name={`${field.name}.${index}.task`}
          placeholder="who"
          className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"          
          as="textarea"
        />
        <button
          type="button"
          className="mr-2 inline-flex h-8 w-8 items-center rounded-full bg-red-500 p-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-800"
        >
          <svg fill="white" viewBox="0 0 16 16" height="1em" width="1em">
            <path d="M4 8a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7A.5.5 0 014 8z" />
          </svg>
        </button>
      </>
    )
  }

  return (
    <div className="relative">
      <FieldArray
        name={field.name}
        render={(arrayHelpers) => (
          <div className="mb-4 overflow-auto rounded-lg border-2 p-2">
            <div className="mb-3 grid grid-cols-3 gap-3">
              {header}
              {field.value?.length > 0 &&
                field.value?.map((input, index) => (
                  <>{monthRow(input,index, arrayHelpers)}</>
                ))}
            </div>
            <button
              type="button"
              className="mt-3 mr-3 rounded-md bg-dao-red px-2 py-1 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              onClick={() =>
                arrayHelpers.push({
                  who: 'Treasury',
                  task: 'asd',
                })
              }
            >
              Add User
            </button>
          </div>
        )}
      />
    </div>
    // <input
    //   name={props.name}
    //   type='date'
    //   value={new Date(props.value).toLocaleDateString('en-CA')}
    //   onChange={props.onChange}
    //   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5"
    // />
  )
}

export default FormTable
