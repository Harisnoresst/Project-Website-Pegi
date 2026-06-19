export interface RoomType {
  id: number;
  name: string;
  image: string;
  bedType: string;
  price: number;
}

export interface HotelType {
  id: number;

  name: string;
  location: string;

  rating: number;

  price: string;
  priceValue: number;

  image: string;

  amenities: string[];

  description?: string;

  gallery?: string[];

  rooms?: RoomType[];
}