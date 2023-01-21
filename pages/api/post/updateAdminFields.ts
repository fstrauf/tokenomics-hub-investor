
import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const { values } = req.body;
  
  const response = await prisma.post.update({
    where: {
      id: values.id,
    },
    data:{
      slug: values.slug,
      isOfficial: values.isOfficial,
      authorClerkId: values.authorClerkId,
    }    
  })

  res.json(response);
}
