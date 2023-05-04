// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import fs from 'fs'
var filterData = []
var db = []
const allFileName = [
  'post',
  'category',
  'tag',
  'protocolTimeLine',
  'protocolResources',
  'comments',
  'calculation',
  'designElement',
  'designPhases',
  'calculationTimeSeries',
  'mechanism',
  'postUser',
  'postAuthor',
]
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    for (let fileName of allFileName) {
      let oFile = fs.readFileSync(`exportedData/${fileName}.json`, 'utf-8')
      let allData = JSON.stringify(oFile)
      filterData.push({
        model: fileName,
        allData,
      })
    }
    await makeBatchTransaction()
    await clearDatabase()
    await prisma.$transaction(db)

    filterData = []
    db = []

    return res.status(200).json({
      message: "Data Imported Successfully",
    })
  } catch (error) {
    console.log('error = ', error)
    return res.status(400).json({
      message: 'error occured',
    })
  }
}

async function makeBatchTransaction() {
  try {
    for (let file of allFileName) {
      let oFile = filterData.filter((data) => {
        return data.model == file
      })
      switch (file) {
        case 'post':
          db.push(prisma.post.createMany(oFile[0].allData))
          break
        case 'category':
          db.push(prisma.category.createMany(oFile[0].allData))
          break
        case 'tag':
          db.push(prisma.tag.createMany(oFile[0].allData))
          break
        case 'protocolTimeLine':
          db.push(prisma.protocolTimeLine.createMany(oFile[0].allData))
          break
        case 'protocolResources':
          db.push(prisma.protocolResources.createMany(oFile[0].allData))
          break
        case 'comments':
          db.push(prisma.comments.createMany(oFile[0].allData))
          break
        case 'calculation':
          db.push(prisma.calculation.createMany(oFile[0].allData))
          break
        case 'designElement':
          db.push(prisma.designElement.createMany(oFile[0].allData))
          break
        case 'designPhases':
          db.push(prisma.designPhases.createMany(oFile[0].allData))
          break
        case 'calculationTimeSeries':
          db.push(prisma.calculationTimeSeries.createMany(oFile[0].allData))
          break
        case 'mechanism':
          db.push(prisma.mechanism.createMany(oFile[0].allData))
          break
        case 'postUser':
          db.push(prisma.postUser.createMany(oFile[0].allData))
          break
        case 'postAuthor':
          db.push(prisma.postAuthor.createMany(oFile[0].allData))
          break
      }
    }
  } catch (error) {
    console.log('makeBatchTransaction error = ', error)
  }
}

async function clearDatabase() {
  try {
    let dbs = []
    dbs.push(prisma.post.deleteMany())
    dbs.push(prisma.category.deleteMany())
    dbs.push(prisma.tag.deleteMany())
    dbs.push(prisma.protocolTimeLine.deleteMany())
    dbs.push(prisma.protocolResources.deleteMany())
    dbs.push(prisma.comments.deleteMany())
    dbs.push(prisma.calculation.deleteMany())
    dbs.push(prisma.designElement.deleteMany())
    dbs.push(prisma.designPhases.deleteMany())
    dbs.push(prisma.calculationTimeSeries.deleteMany())
    dbs.push(prisma.mechanism.deleteMany())
    dbs.push(prisma.postUser.deleteMany())
    dbs.push(prisma.postAuthor.deleteMany())

    await prisma.$transaction(dbs)
  } catch (error) {
    console.log('clearDatabase error = ', error)
    return
  }
}
