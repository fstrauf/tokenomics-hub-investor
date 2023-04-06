export default async function handler(req, res) {
  const { values } = req.body
  let msg = ''
  msg =
    '<@&1008672386079522836> \n\nA protocol has recently requested feedback from the Tokenomics DAO community. Any contributor can take part and share their opinion on:\n\n-The protocol design \n-The tokenomics design \n**Be as concise and as critical as possible**' +
    '\n\nEmail: ' +
    values.email +
    '\nLink: ' +
    values.url +
    '\nMessage: ' +
    values.message

  fetch(process.env.DISCORD_CONSULTING, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: msg,
      // 'Name: ' +
      // values.name +
      // '\nEmail: ' +
      // values.email +
      // '\nTimeline: ' +
      // values.timeline +
      // '\nURL: ' +
      // values.url +
      // '\nMessage: ' +
      // values.message,
    }),
  })
    .then((res) => console.log('res', res))
    .catch((err) => console.error(err))
}
