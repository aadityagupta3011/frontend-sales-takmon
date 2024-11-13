import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000/api', // Ensure this is correct
});

// Add a request interceptor to include the token in headers
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['auth-token'] = token;
    }
    return config;
  }, 
  (error) => {
    return Promise.reject(error);
  }
);

// Optionally, add a response interceptor to handle global errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle specific status codes here
    return Promise.reject(error);
  }
);

export default API;
