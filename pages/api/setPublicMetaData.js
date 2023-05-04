import { clerkClient } from '@clerk/nextjs/server'

export default async function handler(req, res) {
  const { userId, prop, newVal } = req.body

  const user = await clerkClient.users.getUser(userId)
  let publicMetadata = user.publicMetadata
  publicMetadata[prop] = newVal

  const result = await clerkClient.users.updateUser(userId, {
    publicMetadata: publicMetadata,
  })

  // try {
  //   res.status(200).json({ result })
  // } catch (err) {
  //   res.status(500).json({ error: 'failed to submit message' })
  // }
}
