import toast, { Toaster } from 'react-hot-toast'
import { Field, Form, Formik } from 'formik'
import { useUser } from '@clerk/clerk-react/dist/hooks/useUser'
import Router from 'next/router'

export default function CommentForm(props) {
  
  const { user } = useUser()

  const submitData = async (values, { setSubmitting, resetForm }) => {
    // const userId =  user.id
    // const postId = props.id
    const body = { values }

    await fetch('/api/post/createComment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    setSubmitting(false)
    toast.success('Message sent ', { position: 'bottom-right' })
    resetForm();
    await Router.replace(Router.asPath, undefined, {scroll: false})
  }

  return (
    <>
      {/* <Intro /> */}
      <Toaster />
      <div className="m-auto flex flex-col">
        <p className="mb-5">provide feedback for the report</p>
        <Formik
          initialValues={{
            comment: '',
            date: new Date().toLocaleDateString('en-CA'),
            user: user.id,
            postId: props.id
          }}
          onSubmit={submitData}
        >
          {({ isSubmitting }) => (
            <Form className="flex w-full max-w-xl flex-col">
              <Field
                as="textarea"
                rows="8"
                name="comment"
                placeholder="your feedback / comments"
                className="mb-3 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-5 w-44 mb-5 rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"
              >
                Submit Comment
              </button>
            </Form>
          )}
        </Formik>
      </div> 
    </>
  )
}

// export default function CommentForm({ _id }) {
//   const [formData, setFormData] = useState()
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [hasSubmitted, setHasSubmitted] = useState(false)
// //   const { data: session, status } = useSession()
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm()
//   const onSubmit = async (data) => {
//     setIsSubmitting(true)
//     let response
//     setFormData(data)
//     try {
//       response = await fetch('/api/createComment', {
//         method: 'POST',
//         body: JSON.stringify(data),
//         type: 'application/json',
//       })
//       setIsSubmitting(false)
//       setHasSubmitted(true)
//     } catch (err) {
//       setFormData(err)
//     }
//   }

//   if (isSubmitting) {
//     return <h3>Submitting comment…</h3>
//   }
//   if (hasSubmitted) {
//     return (
//       <>
//         <h3>Thanks for your comment!</h3>
//         <ul>
//           <li>
//             Name: {formData.name} <br />
//             Email: {formData.email} <br />
//             Comment: {formData.comment}
//           </li>
//         </ul>
//       </>
//     )
//   }

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="w-full max-w-lg"
//       disabled
//     >
//       <input {...register('_id')} type="hidden" name="_id" value={_id} />
//       <label className="mb-5 block">
//         <span className="text-gray-700">Name</span>
//         <input
//           name="name"
//           {...register('name', { required: true })}
//           className="form-input mt-1 block w-full rounded border py-2 px-3 shadow"
//           placeholder="John Appleseed"
//           value={session?.user.name}
//         />
//       </label>
//       <label className="mb-5 block">
//         <span className="text-gray-700">Email</span>
//         <input
//           name="email"
//           type="email"
//           {...register('email', { required: true })}
//           className="form-input mt-1 block w-full rounded border py-2 px-3 shadow"
//           placeholder="your@email.com"
//           value={session?.user.email}
//         />
//       </label>
//       <label className="mb-5 block">
//         <span className="text-gray-700">Comment</span>
//         <textarea
//           {...register('comment', { required: true })}
//           name="comment"
//           className="form-textarea mt-1 block w-full rounded  border py-2 px-3 shadow"
//           rows="8"
//           placeholder="Enter some long form content."
//         ></textarea>
//       </label>
//       {/* errors will return when field validation fails  */}
//       {errors.exampleRequired && <span>This field is required</span>}
//       <input
//         type="submit"
//         className="focus:shadow-outline rounded bg-dao-red py-2 px-4 font-bold text-white shadow hover:bg-purple-400 focus:outline-none"
//       />
//     </form>
//   )
// }
