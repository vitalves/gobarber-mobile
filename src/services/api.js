import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:3333', // IOS
  // baseURL: 'http://10.0.2.2:3333', // Android studio
  baseURL: 'http://10.0.3.2:3333', // GenyMotion
  // baseURL: 'http://192.168.0.1:3333', // USB
});

export default api;
