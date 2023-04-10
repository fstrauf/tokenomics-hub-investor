import prisma from '../../../../lib/prisma'

export default async function handle(req, res) {
  try {
    const postId = req.query.id

    const designPhases = await prisma.designPhases.delete({
      where: {
        id: postId,
      },
    })
    res.json(designPhases)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Something went wrong' })
  }
}
