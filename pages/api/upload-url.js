import { Storage } from '@google-cloud/storage';

export default async function handler(req, res) {

  var storage
  try {
    // console.log("storage")
    // const { privateKey } = JSON.parse(process.env.PRIVATE_KEY || '{ privateKey: null }')
    storage = new Storage({
      projectId: process.env.PROJECT_ID,
      credentials: {
        client_email: process.env.CLIENT_EMAIL,
        private_key: process.env.PRIVATE_KEY,
        // private_key: privateKey,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: 'failed to set up storage' })
  }

  var bucket
  try {
    // console.log("bucket")
    bucket = storage.bucket(process.env.BUCKET_NAME);
  } catch (err) {
    return res.status(500).json({ error: 'failed to get bucket' })
  }

  var file
  try {
    // console.log("file")
    file = bucket.file(req.query.target);
  } catch (err) {
    return res.status(500).json({ error: 'failed to set file' })
  }
  
  // const file = bucket.file(req.query.target);
  const options = {
    expires: Date.now() + 1 * 60 * 1000, //  1 minute,
    fields: { 'x-goog-meta-test': 'data' },
  };
  
  try{
    // console.log('upload')
    const [response] = await file.generateSignedPostPolicyV4(options);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).send({ error: 'failed to upload data' })
  }
  
  
}
