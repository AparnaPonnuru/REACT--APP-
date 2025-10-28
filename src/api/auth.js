import axios from 'axios';

// Use the environment variable instead of hardcoding
const API_URL = `${process.env.REACT_APP_API_URL}/api/users`;

export const signup = (data) => axios.post(`${API_URL}/signup`, data);
export const login = (data) => axios.post(`${API_URL}/login`, data);
export const requestReset = (data) => axios.post(`${API_URL}/request-reset`, data);
export const verifyOtp = (data) => axios.post(`${API_URL}/verify-otp`, data);
export const resetPassword = (data) => axios.post(`${API_URL}/reset-password`, data);

