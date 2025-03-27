import { BASE_API_URL } from '@/config/env';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    accept: '*/*',
    'accept-language': 'en-US,en;q=0.7',
    'content-type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Log request details
    console.log('Request:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data,
    });
    // Add authorization token or other custom logic
    const token = 'your-auth-token'; // Replace with actual token logic
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Log request error
    console.error('Request Error:', error);
    // Handle request error
    return Promise.reject(error);
  },
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Log response details
    console.log('Response:', {
      status: response.status,
      data: response.data,
      headers: response.headers,
    });
    // Handle successful response
    return response;
  },
  (error) => {
    // Log response error
    console.error('Response Error:', error.response || error);
    // Handle response error
    if (error.response?.status === 401) {
      // Handle unauthorized error (e.g., redirect to login)
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
