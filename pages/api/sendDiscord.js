import { postStatus } from '../../lib/helper'

export default async function handler(req, res) {
  const { url, status } = req.body
  let message = ''
  let channel = ''
  switch (status) {
    case postStatus.reviewRequired: {
      //tagging review-team
      message =
        '<@&1066631639381323837>: \n\n The following report has been submitted for review: \n\n' +
        url
      channel = process.env.DISCORD_EDITING
      break
    }
    case postStatus.published: {
      message =
        '<@&957492337200754730>: \n\n A new report has just been published on the Tokenomics Hub, check it out and contribute to the Token Strength Rating \n\n' +
        url +
        '\n\n Steps: \n\n' +
        '1. Go to the Token Strength section\n\n' +
        '2. Click on Add Rating button\n\n' +
        '3. Read each section, add a score, a comment and hit Save\n\n' +
        'Note: hover over the info icon to see the rating guide\n\n' +
        'Happy rating :)'

      channel = process.env.DISCORD_PUBLISHED
      break
    }
  }

  fetch(channel, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: message,
      // '<@&1064017878501822596>: \n\n' +
      // 'The following report has been submitted for review: \n\n' +
      // url,
    }),
  })
    .then((res) => console.log(res))
    .catch((err) => console.error(err))
}
