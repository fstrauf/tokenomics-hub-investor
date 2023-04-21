// // import { clerkClient } from '@clerk/nextjs/server'

// export default async function handler(req, res) {
//   const { values, userId, title } = req.body

//   // const user = await clerkClient.users.getUser(userId)

//   // await users.updateUser(userId, { publicMetadata: { } });

//   try {
//     fetch(process.env.DISCORD_CONSULTING, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         content:
//           'Name: ' +
//           values.name +
//           '\nEmail: ' +
//           values.email +
//           '\nTimeline: ' +
//           values.timeline +
//           '\nMessage: ' +
//           values.message +
//           '\nClerkUser: ' +
//           userId +
//           '\n' +
//           title,
//       }),
//     })
//     res.status(200).json({ result })
//   } catch (err) {
//     res.status(500).json({ error: 'failed to submit message' })
//   }
// }
