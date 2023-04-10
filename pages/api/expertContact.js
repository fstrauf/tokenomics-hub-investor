export default async function handler(req, res) {
  const { values } = req.body

  fetch(process.env.DISCORD_CONSULTING, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content:
        'Name: ' +
        values.name +
        '\nEmail: ' +
        values.email +
        '\nTimeline: ' +
        values.timeline +
        '\nMessage: ' +
        values.message,
    }),
  })
    .then((res) => console.log(res))
    .catch((err) => console.error(err))
}
