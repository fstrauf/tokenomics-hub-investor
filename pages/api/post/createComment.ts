import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const { values } = req.body;
  
  const response = await prisma.comments.create({
    data:{
      comment: values.comment,  
      authorClerkId: values.user,
      date: new Date(values.date),
      // postId: postId,
      post: {
        connect:{
          id: values.postId
        }
      }
    },           
  })

  res.json(response);
}
