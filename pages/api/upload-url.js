import { Storage } from '@google-cloud/storage';

export default async function handler(req, res) {

  var storage
  try {

    const { privateKey } = JSON.parse(process.env.PRIVATE_KEY || '{ privateKey: null }')
    storage = new Storage({
      projectId: process.env.PROJECT_ID,
      credentials: {
        client_email: process.env.CLIENT_EMAIL,
        // private_key: process.env.PRIVATE_KEY,
        private_key: privateKey,
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'failed to set up storage' })
  }

  var bucket
  try {
    bucket = storage.bucket(process.env.BUCKET_NAME);
  } catch (err) {
    res.status(500).json({ error: 'failed to get bucket' })
  }

  var file
  try {
    file = bucket.file(req.query.target);
  } catch (err) {
    res.status(500).json({ error: 'failed to set file' })
  }
  
  // const file = bucket.file(req.query.target);
  const options = {
    expires: Date.now() + 1 * 60 * 1000, //  1 minute,
    fields: { 'x-goog-meta-test': 'data' },
  };
  

  const [response] = await file.generateSignedPostPolicyV4(options);
  res.status(200).json(response);
  res.status(500).send({ error: 'failed to upload data' })
}
