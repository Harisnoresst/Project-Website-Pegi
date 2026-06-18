import axios from 'axios';
import type { BookingType } from '../types/BookingType';

// Base URL untuk endpoint bookings
const BASE_URL = '/api/bookings';

//mengambil semua data booking dari database
export const getBookings = async (): Promise<BookingType[]> => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};

// booking
export const createBooking = async (bookingData: Omit<BookingType, 'id'>) => {
  try {
    const response = await axios.post(BASE_URL, bookingData);
    return response.data;
  } catch (error) {
    console.error("Error creating new booking:", error);
    throw error;
  }
};

export const getBookingById = async (id: string): Promise<BookingType> => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching booking with id ${id}:`, error);
    throw error;
  }
};