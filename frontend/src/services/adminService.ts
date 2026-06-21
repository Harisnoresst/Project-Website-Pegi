import api from './api';

export const getMonitoringStats = async (startDate?: string, endDate?: string) => {
  let url = '/api/admin/monitoring/stats';
  if (startDate && endDate) {
    url += `?startDate=${startDate}&endDate=${endDate}`;
  }
  return await api.get(url);
};

// --- Dashboard Utama ---
export const getDashboardStats = async () => await api.get('/api/admin/dashboard');

// --- Manajemen Hotel ---
export const getAllHotels = async () => await api.get('/api/admin/hotels');
export const createHotel = async (data: any) => await api.post('/api/admin/hotels', data);
export const updateHotel = async (id: string, data: any) => await api.put(`/api/admin/hotels/${id}`, data);
export const deleteHotel = async (id: string) => await api.delete(`/api/admin/hotels/${id}`);
export const uploadImage = async (formData: FormData) => {
  return await api.post('/api/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// --- Manajemen Destinasi ---
export const getAllDestinations = async () => await api.get('/api/admin/destinations');
export const createDestination = async (data: any) => await api.post('/api/admin/destinations', data);
export const updateDestination = async (id: string, data: any) => await api.put(`/api/admin/destinations/${id}`, data);
export const deleteDestination = async (id: string) => await api.delete(`/api/admin/destinations/${id}`);

// --- Grup Wisata ---
export const getAllGroups = async () => await api.get('/api/admin/groups');
export const createGroup = async (data: any) => await api.post('/api/admin/groups', data);
export const updateGroup = async (id: string, data: any) => await api.put(`/api/admin/groups/${id}`, data);
export const deleteGroup = async (id: string) => await api.delete(`/api/admin/groups/${id}`);

// --- Verifikasi Pembayaran ---
export const getPayments = async () => await api.get('/api/admin/payments');
export const updatePaymentStatus = async (id: string, data: { status: string }) => await api.put(`/api/admin/payments/${id}`, data);

// --- Manajemen Promo ---
export const getAllPromos = async () => await api.get('/api/admin/promos');
export const createPromo = async (data: any) => await api.post('/api/admin/promos', data);
export const updatePromo = async (id: string, data: any) => await api.put(`/api/admin/promos/${id}`, data);
export const deletePromo = async (id: string) => await api.delete(`/api/admin/promos/${id}`);

// --- Manajemen Transportasi ---
export const getAllTransports = async () => await api.get('/api/admin/transports');
export const createTransport = async (data: any) => await api.post('/api/admin/transports', data);
export const updateTransport = async (id: string, data: any) => await api.put(`/api/admin/transports/${id}`, data);
export const deleteTransport = async (id: string) => await api.delete(`/api/admin/transports/${id}`);

// Pengguna
export const getAllUsers = async () => await api.get('/api/admin/users');
export const createUser = async (data: any) => await api.post('/api/admin/users', data);
export const updateUser = async (id: string, data: any) => await api.put(`/api/admin/users/${id}`, data);
export const deleteUser = async (id: string) => await api.delete(`/api/admin/users/${id}`);

export const getRecentActivities = async () => await api.get('/api/admin/activities');