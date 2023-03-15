
import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const { values } = req.body;
  console.log("🚀 ~ file: updateAdminFields.ts:6 ~ handle ~ values", values)

  const response = await prisma.post.update({
    where: {
      id: values.id,
    },
    data:{
      id: values.newId || values.id,
      slug: values.slug,
      isOfficial: values.isOfficial,
      authorClerkId: values.authorClerkId,
      author: {
        upsert: {
          create: { 
            name: values?.author?.name,
            website: values?.author?.website,
            twitter: values?.author?.twitter,
          },
          update: {
            id: values?.author?.id,
            name: values?.author?.name,
            website: values?.author?.website,
            twitter: values?.author?.twitter,
          }
        }
      }
    },    
  })

  res.json(response);
}
