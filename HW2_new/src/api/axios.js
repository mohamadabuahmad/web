// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3005', // Ensure this matches your backend port
});

export default instance;
