// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://web-861a.vercel.app', // Ensure this matches your backend port http://localhost:3005
});

export default instance;
