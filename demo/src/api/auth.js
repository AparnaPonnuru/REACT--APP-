import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users'; // backend base URL

export const signup = (data) => axios.post(`${API_URL}/signup`, data);
export const login = (data) => axios.post(`${API_URL}/login`, data);
export const requestReset = (data) => axios.post(`${API_URL}/request-reset`, data);
export const verifyOtp = (data) => axios.post(`${API_URL}/verify-otp`, data);
export const resetPassword = (data) => axios.post(`${API_URL}/reset-password`, data);
