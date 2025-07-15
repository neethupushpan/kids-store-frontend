import axios from 'axios';

const API = axios.create({
  baseURL: 'https://kids-store-backend.onrender.com/api', // ✅ LIVE backend URL
  withCredentials: true,
});


API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API; // ✅ this line is REQUIRED
