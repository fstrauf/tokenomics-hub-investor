import { postStatus } from '../../lib/helper'

export default async function handler(req, res) {
  const { url, status } = req.body
  let message = ''
  switch (status) {
    case postStatus.reviewRequired: {
      message =
        '<@&1064017878501822596>: \n\n The following report has been submitted for review: \n\n' +
        url
      break
    }
    case postStatus.published: {
      message =
        '<@&1064017878501822596>: \n\n The following report has been published: \n\n' +
        url
        break
    }
  }

  fetch(process.env.DISCORD_EDITING, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: message
        // '<@&1064017878501822596>: \n\n' +
        // 'The following report has been submitted for review: \n\n' +
        // url,
    }),
  })
    .then((res) => console.log(res))
    .catch((err) => console.error(err))
}
