import axios from 'axios';

export const API_URL = "https://auto-eats-backend.vercel.app";


 export const api = axios.create({
  baseURL: API_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});


