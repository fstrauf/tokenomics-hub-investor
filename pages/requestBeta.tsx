// import Layout from '../components/layout'
// import React, { useState } from 'react'
// import toast, { Toaster } from 'react-hot-toast'
// // import { Field, Form, Formik } from 'formik'
// import { useUser } from '@clerk/clerk-react/dist/hooks/useUser'
// import { useRouter } from 'next/router'
// // import { DISCORD_WEBHOOK } from '../lib/constants'

// export default function RequestBeta(props) {
//   const [isSubmittingForm, setIsSubmittingForm] = useState(false)
//   const { user } = useUser()
//   const router = useRouter()

//   const submitData = async () => {
//     setIsSubmittingForm(true)
//     const userId = user.id
//     // const title = 'Request for beta access'
//     const body = { userId }

//     try {
//       await fetch('/api/setPublicMetaData', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(body),
//       })
      
//       // resetForm() // clear the form's input fields after successful submission      
//     } catch (error) {
//       console.error(error)
//       toast.error('An error occurred', { position: 'bottom-right' })
//     } finally {
//       setInterval(function() {
//         toast.success('Request Granted!', { position: 'bottom-right' })
//         setIsSubmittingForm(false)
//         router.push('/')        
//       }, 50000); // Executes the anonymous function every second
//     }
//   }

//   return (
//     <>
//       <Layout>
//         {/* <Intro /> */}
//         <Toaster />
//         <div className="m-auto flex flex-col items-center justify-center">
//           <h1 className="mb-10 mt-36 text-center text-3xl font-bold">
//             The Tokenomics Design Framework is still in early beta.
//           </h1>
//           <p className="mb-5 text-center">
//             but we're happy to give you access.
//           </p>
//           {isSubmittingForm ? (
//             <div className="mt-10 flex items-center justify-center rounded-lg bg-gradient-to-r from-dao-green to-dao-red flex-col p-4 gap-8">
//             <h1 className="mb-10 mt-36 text-center text-3xl font-bold">
//               ... requesting access. Give us a moment.
//             </h1>
//             </div>
//           ) : (
//             <></>
//           )}

//           <button
//             type="button"
//             onClick={submitData}
//             disabled={isSubmittingForm}
//             className="mt-5 mb-5 w-36 rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"
//           >
//             Request access
//           </button>
//         </div>
//       </Layout>
//     </>
//   )
// }
