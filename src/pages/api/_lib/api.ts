import axios from 'axios';

export const api = axios.create({
  baseURL:
    (process.env.IS_LOCALHOST && 'http://localhost:3000/api') ??
    `https://mce-mind-web-savio591.vercel.app/api`,
});
