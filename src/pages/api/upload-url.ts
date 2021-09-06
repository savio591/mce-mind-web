import { NextApiRequest, NextApiResponse } from 'next';
import { cloudinary } from './_lib/cloudinary';

export default async function uploader(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === 'GET') {
    try {
      if (!process.env.CLOUDINARY_KEY) {
        throw new Error('CloudinaryKey not found');
      }
      if (typeof req.query.file !== 'string') {
        throw new Error('Filename not served');
      }

      const { signature, timestamp } = cloudinary(req.query.file);

      res.json({
        signature,
        timestamp,
        cloudname: 'savil-experiments',
        apikey: process.env.CLOUDINARY_KEY,
      });
    } catch (err) {
      res.status(401).json({ error: err ?? 'Problem on generate a key' });
    }
  } else {
    // Handle any other HTTP method
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
}
