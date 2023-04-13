// import { withAuth } from '@clerk/nextjs/api';
// import { clerkClient } from '@clerk/nextjs/server'

// export default async function handler(req, res) {

//   const userList = await clerkClient.__unstable_options.domain/


//   const allEmails = userList.map(u => u.emailAddresses[0].emailAddress)
  

  

//   res.status(200).json(allEmails)

// }


// // export default async withAuth((req, res) => {
// //   const { userId } = req.auth;
// //     const userList = await clerkClient.users.getUserList({
// //     limit: 200,
// //   })

// //   if (userId){
// //     res.status(200).json({ id: userId });
// //   } else {
// //     res.status(401).json({ id: null });
// //   } 
// // });