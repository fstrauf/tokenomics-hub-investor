
import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const { status, postId } = req.body;
  
  const response = await prisma.post.update({
    where: {
      id: postId,
    },
    data:{
      status: status,
    }    
  })

  res.json(response);
}
