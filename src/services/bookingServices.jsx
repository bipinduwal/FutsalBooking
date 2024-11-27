import axios from 'axios';

// Define the base URL for the backend API
const BASE_URL = 'http://localhost:5000/api/bookings'; // Adjust this according to your backend server

// Create a new booking
export const createBooking = async (bookingData) => {
  try {
    const response = await axios.post(`${BASE_URL}/create`, bookingData);
    return response.data; // Assuming the API returns the booking details upon successful creation
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

// Get all bookings (you can filter by date or user if necessary)
export const getAllBookings = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    return response.data; // Assuming the API returns an array of bookings
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

// Get a single booking by ID
export const getBookingById = async (bookingId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching booking by ID:', error);
    throw error;
  }
};

// Update an existing booking by ID
export const updateBooking = async (bookingId, updatedBookingData) => {
  try {
    const response = await axios.put(`${BASE_URL}/update/${bookingId}`, updatedBookingData);
    return response.data;
  } catch (error) {
    console.error('Error updating booking:', error);
    throw error;
  }
};

// Delete a booking by ID
export const deleteBooking = async (bookingId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting booking:', error);
    throw error;
  }
};
