import axios from 'axios';

// Define the base URL for the authentication API
const BASE_URL = 'http://localhost:5000/api/auth'; // Replace this with your backend auth route

// User registration
export const register = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, userData);
    return response.data; // Assuming the API returns user data or a success message
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

// User login
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token); // Store JWT token in local storage
    }
    return response.data; // Return user data, typically user info and token
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

// User logout
export const logout = () => {
  localStorage.removeItem('token'); // Remove JWT token
  console.log('User logged out successfully');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return token ? true : false; // Return true if token exists
};

// Get current logged-in user (optional, depending on your backend setup)
export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const response = await axios.get(`${BASE_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // Assuming the API returns the current user data
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};
