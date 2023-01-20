// import { clerkClient } from '@clerk/nextjs/server'

// export default async function handler(req, res) {

//   const userList = await clerkClient.users.getUserList({
//     limit: 200,
//   })
  
//   console.log("🚀 ~ file: exportUsers.js:6 ~ handler ~ userList", userList[0].emailAddresses[0])

//   const allEmails = userList.map(u => u.emailAddresses[0].emailAddress)
  

  

//   res.status(200).json(allEmails)

// }
