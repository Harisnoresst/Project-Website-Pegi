import api from './api';

export const getAllPromos = async () => await api.get('/api/admin/promos');
export const createPromo = async (data: any) => await api.post('/api/admin/promos', data);
export const updatePromo = async (id: string, data: any) => await api.put(`/api/admin/promos/${id}`, data);
export const deletePromo = async (id: string) => await api.delete(`/api/admin/promos/${id}`);