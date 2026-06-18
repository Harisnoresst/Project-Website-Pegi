import axios from 'axios';
import type { WishlistType } from '../types/WishlistType';

// Base URL untuk endpoint wishlist
const BASE_URL = '/api/wishlist';

//get
export const getWishlist = async (): Promise<WishlistType[]> => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    throw error;
  }
};

// add
export const addToWishlist = async (wishlistData: Omit<WishlistType, 'id'>) => {
  try {
    const response = await axios.post(BASE_URL, wishlistData);
    return response.data;
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    throw error;
  }
};

//delete
export const removeFromWishlist = async (id: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error removing wishlist with id ${id}:`, error);
    throw error;
  }
};