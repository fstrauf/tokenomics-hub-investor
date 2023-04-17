// import { clerkClient } from '@clerk/nextjs/server'
// import prisma from '../../lib/prisma'
// import { Prisma } from '@prisma/client'

// export default async function handler(req, res) {
//   //   const userList = await clerkClient.users.getUserList({
//   //     limit: 500,
//   //   })
//   //   const mappedUsers = oneUser.map((userData) => ({
//   //     external_id: userData.id,
//   //     first_name: userData.firstName,
//   //     last_name: userData.lastName,
//   //     email_address: userData?.emailAddresses?.map((email) => email.emailAddress),
//   //     phone_number: [],
//   //     web3_wallet: [],
//   //     username: userData.username,
//   //     password: null,
//   //     skip_password_checks: true,
//   //     skip_password_requirement: true,
//   //     backup_codes: [],
//   //     public_metadata: userData.publicMetadata,
//   //     private_metadata: userData.privateMetadata,
//   //     unsafe_metadata: userData.unsafeMetadata,
//   //     created_at: new Date(userData.createdAt).toISOString().replace('Z', '+00:00'),
//   //   }))

// //   var response = {}
// //   for (const user of mappedUsers) {
// //     await setTimeout(async function () {
// //       try {
// //         // response = await clerkClient.users.createUser(user)
// //         response = await clerkClient.users.getUserList
// //         console.log('🚀 ~ file: exportUsers.js:34 ~ handler ~ res:', response)
// //       } catch (error) {}
// //     }, 1000)
// //   }


// console.log("🚀 ~ file: exportUsers.js:39 ~ handler ~ postUpdates.map(u=>u.authorClerkId):", postUpdates.map(u=>u.authorClerkId))
// var response = await clerkClient.users.getUserList({external_id: postUpdates.map(u=>u.authorClerkId), limit: 50})

// console.log("🚀 ~ file: exportUsers.js:39 ~ handler ~ response:", response)

// var mappingUsers = response.map(({ id, externalId }) => ({ id, externalId }))
// console.log("🚀 ~ file: exportUsers.js:41 ~ handler ~ mappingUsers:", mappingUsers)
// // console.log("🚀 ~ file: exportUsers.js:39 ~ handler ~ response:", response)

//   //uopdate post where authorclerkid = user_2JFDV2jZbwYQyVujX4xwCVKqehQ set 'new id'

//   const txCalls = []

//   for (const user of mappingUsers){
//     txCalls.push(prisma.calculation.updateMany({
//         where: {
//             authorClerkId: user.externalId,
//         },
//         data: {
//             authorClerkId: user.id
//         }
//     }))    
//   }
//   console.log("🚀 ~ file: exportUsers.js:61 ~ handler ~ txCalls:", txCalls)

//   response = await prisma.$transaction(txCalls)
//   console.log("🚀 ~ file: exportUsers.js:65 ~ handler ~ response:", response)

//   res.status(200).json('done')
// }

// const postUpdates = [
//     {
//       "authorClerkId": "user_2JFDV2jZbwYQyVujX4xwCVKqehQ"
//     },
//     {
//       "authorClerkId": "user_2JGsVnoN0fev6GSuzr3hp1pveam"
//     },
//     {
//       "authorClerkId": "user_2JIO4PQqF5rOeRg0lHNxLb5iaW3"
//     },
//     {
//       "authorClerkId": "user_2JJKAJcKRZ3jmDuRFAQbRtGpoKt"
//     },
//     {
//       "authorClerkId": "user_2JaCPBui6yzO2amYyglwJrnPr1H"
//     },
//     {
//       "authorClerkId": "user_2Koo5hArsMnWFWkHsSpI2zemltl"
//     },
//     {
//       "authorClerkId": "user_2KsE62jVvRZinyt2jkhPEK2a118"
//     },
//     {
//       "authorClerkId": "user_2KmnVa7Ums0hkW6twIifLemjLkQ"
//     },
//     {
//       "authorClerkId": "user_2JqsoxPlbtC69GmRfD58SZ2QyOM"
//     },
//     {
//       "authorClerkId": "user_2LKbTepGKojvEVQ1TddAb0GEtRc"
//     },
//     {
//       "authorClerkId": "user_2MJZ0KXsVfR3vSULI0xnslggmuX"
//     },
//     {
//       "authorClerkId": "user_2MKRiJMDr5R5PL51CiYFkgJr7WE"
//     },
//     {
//       "authorClerkId": "user_2JSHMLeiSEKuCVfa32gzPCJNtvj"
//     },
//     {
//       "authorClerkId": "user_2LeXHF46C02rPdH5mAeuUQetHP1"
//     },
//     {
//       "authorClerkId": "user_2NH97JC8NeXAqQxdQeloTlq77ef"
//     },
//     {
//       "authorClerkId": "user_2MEoalTqI4GmfaFdNFqG8XBflpo"
//     },
//     {
//       "authorClerkId": "user_2MbNOmnWMZNkDgmwKYkeESBv2BK"
//     },
//     {
//       "authorClerkId": "user_2Js0Y1vzjE6vztSMMzqx31tNtlx"
//     },
//     {
//       "authorClerkId": "user_2NMZogfvFJ9OkcDEvq5qHQLpC7f"
//     },
//     {
//       "authorClerkId": "user_2Mc8xRQnDunpGDq8sNQij1ZLwad"
//     },
//     {
//       "authorClerkId": "user_2NdkBr622aa8L7bRruIMbvhKoWp"
//     },
//     {
//       "authorClerkId": "user_2L7oESR7Nrqn3ZwmuU4AHZ2kpHA"
//     },
//     {
//       "authorClerkId": "user_2NmasBOTWmAxcz3kJR1QrdRsqIV"
//     },
//     {
//       "authorClerkId": "user_2KLrRYsR1lxW51jIgjBNYUiZ7Gx"
//     },
//     {
//       "authorClerkId": "user_2JJJ2CncTcJI580PevrnlJNnU7K"
//     },
//     {
//       "authorClerkId": "user_2JGcKrmNfGcwZMncD9PUpzhQ7M6"
//     },
//     {
//       "authorClerkId": "user_2MEs4AEt1iY5pFJPp355Ey6tbAl"
//     },
//     {
//       "authorClerkId": "user_2JGUtFOpCLUOugd6ugFbh1idxFu"
//     },
//     {
//       "authorClerkId": "user_2JpTbu3gaQJlm9fpRVNWHhr6Auo"
//     },
//     {
//       "authorClerkId": "user_2JK1pTyVFGwDfbDLTpRRGYfTWRE"
//     }
//   ]
