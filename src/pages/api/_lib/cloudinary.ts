import { v2 } from 'cloudinary';

const { api_sign_request } = v2.utils;

interface CloudinaryResponse {
  timestamp: string;
  signature: string;
}

export function cloudinary(filename: string): CloudinaryResponse {
  const timestamp = String(+new Date());
  if (process.env.CLOUDINARY_SECRET) {
    const signature = api_sign_request(
      { timestamp, folder: 'profile', filename },
      process.env.CLOUDINARY_SECRET
    );
    return { timestamp, signature };
  }
  throw new Error('Nothing was generated');
}
