import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: async (data) => (await api.post('/auth/register', data)).data,
  sendOTP: async (email) => (await api.post('/auth/send-otp', { email })).data,
  verifyOTP: async (data) => (await api.post('/auth/verify-otp', data)).data,
  login: async (data) => (await api.post('/auth/login', data)).data,
  forgotPassword: async (data) => (await api.post('/auth/forgot-password', data)).data,
  resetPassword: async (data) => (await api.post('/auth/reset-password', data)).data,
  getCurrentUser: async () => (await api.get('/auth/me')).data,
  logout: async () => {
    await api.post('/auth/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

export const dashboardAPI = {
  getStats: async () => (await api.get('/dashboard/stats')).data,
  getActivity: async () => (await api.get('/dashboard/activity')).data,
};

export default api;



