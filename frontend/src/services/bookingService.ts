// src/services/bookingService.ts
import api from './api';

export const getBookings = async () => {
  return await api.get('/api/bookings');
};