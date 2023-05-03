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
  }

  fetch(channel, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: message,
    }),
  })
    .then((res) => console.log(res))
    .catch((err) => console.error(err))
}
