import { postStatus } from '../../../lib/helper';
import prisma from '../../../lib/prisma';
// import {  Prisma } from '@prisma/client'
// import toast, { Toaster } from 'react-hot-toast';

export default async function handle(req, res) {
    console.log("🚀 ~ file: getExamplePostData.ts:8 ~ handle ~ req.body:", req.body)
    const { filter } = req.body;
    

    const posts = await prisma.post.findMany({where: {status: postStatus.published}})

    return res.status(200).send(posts)
    // return res.json(calcRows);
}