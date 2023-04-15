import { clerkClient } from '@clerk/nextjs/server'

export default async function handler(req, res) {

  const { userId } = req.body

       const user = await clerkClient.users.getUser(userId)
      //  console.log("🚀 ~ file: expertContact.js:8 ~ handler ~ user:", user.publicMetadata)
       let publicMetadata = user.publicMetadata
       publicMetadata.beta = true

       const result = await clerkClient.users.updateUser(userId, { publicMetadata: publicMetadata });

  try {

    res.status(200).json({ result })
  } catch (err) {
    res.status(500).json({ error: 'failed to submit message' })
  }

}
