export default async function handler(req, res) {
  const { payload, webhook } = req.body

  fetch(process.env[webhook], {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      res.status(200).json({ response })
      console.log('Webhook response:', response.status, response.statusText)
    })
    .catch((error) => {
      console.error('Error calling webhook:', error)
      res.status(500).json(error)
    })
}
