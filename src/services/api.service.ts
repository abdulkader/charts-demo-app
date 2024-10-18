import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;
const corsProxy = import.meta.env.VITE_CORS_PROXY;

export const api = axios.create({
  baseURL: `${corsProxy}?${apiUrl}`,
  params: {
    api_key: apiKey,
    file_type: 'json',
  },
});
