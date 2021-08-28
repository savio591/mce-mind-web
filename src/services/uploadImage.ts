import { UploadApiResponse } from 'cloudinary';
import { api } from './api';

interface SignResponse {
  signature: string;
  timestamp: string;
  cloudname: string;
  apikey: string;
}

export async function uploadImage(
  file: File,
  filename: string
): Promise<UploadApiResponse> {
  const signResponse = await api.get<SignResponse>(
    `/upload-url?file=${filename}`
  );
  const { apikey, cloudname, timestamp } = signResponse.data;
  const url = `https://api.cloudinary.com/v1_1/${cloudname}/auto/upload`;

  // const res =
  const formData = new FormData();

  Object.entries({
    api_key: apikey,
    cloudname,
    file,
    timestamp,
    upload_preset: 'xjt2jns3',
  }).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const upload = await fetch(url, {
    method: 'POST',
    body: formData,
  });
  const imageUrl = await upload.json();

  return imageUrl;
}
