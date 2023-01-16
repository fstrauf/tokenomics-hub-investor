export default async function handler(req, res) {

  const { url } = req.body

  fetch(process.env.DISCORD_EDITING, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content:
        '<@&1064017878501822596>: \n\n' +
        'The following report has been submitted for review: \n\n' +
        url,
    }),
  })
    .then((res) => console.log(res))
    .catch((err) => console.error(err))

}
