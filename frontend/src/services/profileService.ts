import axios from 'axios';

const BASE_URL = '/api/profile';

/**
 * Mengambil data profil dari backend
 */
export const getProfile = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil data profil dari database:", error);
    throw error;
  }
};

/**
 * Menyimpan atau memperbarui data profil ke database
 * (Dipanggil saat user mengklik tombol 'Simpan Perubahan')
 */
export const updateProfile = async (profileData: any) => {
  try {
    // Biasanya update data menggunakan metode PUT atau POST tergantung API Backend
    const response = await axios.put(BASE_URL, profileData);
    return response.data;
  } catch (error) {
    console.error("Gagal memperbarui data profil ke database:", error);
    throw error;
  }
};