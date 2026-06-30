import type { HotelType } from "../types/HotelType";
const dummyHotelData: HotelType[] = [
  {
    id: 1,
    name: "Ubud Hanging Gardens",
    location: "Ubud, Bali",
    rating: 4.9,
    price: "Rp 4.250.000",
    priceValue: 4250000,
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800&auto=format&fit=crop",
    amenities: ["wifi", "pool", "restaurant", "gym"],
    description:
      "Nikmati pengalaman menginap mewah di tengah hutan tropis Ubud dengan infinity pool ikonik dan suasana tenang khas Bali.",
    gallery: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1200",
    ],
    rooms: [
      {
        id: 1,

        name: "Deluxe King Room",

        image:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800",

        gallery: [
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200",
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200",
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1200",
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200",
        ],

        capacity: "2 Dewasa",

        maxGuest: 2,

        bedType: "1 King Bed",

        facilities: ["WiFi", "AC", "TV", "Shower", "Mini Bar"],

        checkIn: "14:00",

        checkOut: "12:00",

        description:
          "Kamar luas dengan tempat tidur king size, balkon pribadi, TV Smart 55 inci, minibar, serta pemandangan kota.",

        price: 4250000,
      },

      {
        id: 2,
        name: "Suite Panorama",

        image: "...",

        gallery: ["...", "...", "...", "..."],

        capacity: "2 Dewasa",

        maxGuest: 2,

        bedType: "1 King Bed",

        facilities: ["WiFi", "AC", "TV", "Bathtub", "Mini Bar", "Coffee Maker"],

        checkIn: "14:00",

        checkOut: "12:00",

        description:
          "Suite premium dengan ruang tamu terpisah dan panorama kota.",

        price: 6120000,
      },

      {
        id: 3,
        name: "Family Twin",

        image: "...",

        gallery: ["...", "...", "...", "..."],

        capacity: "4 Dewasa",

        maxGuest: 4,

        bedType: "2 Single Beds",

        facilities: ["WiFi", "AC", "TV", "Shower"],

        checkIn: "14:00",

        checkOut: "12:00",

        description: "Cocok untuk keluarga dengan dua tempat tidur single.",

        price: 4850000,
      },
    ],
  },

  {
    id: 2,
    name: "Grand Hyatt Jakarta",
    location: "Jakarta Pusat",
    rating: 4.7,
    price: "Rp 3.120.000",
    priceValue: 3120000,
    image:
      "https://images.unsplash.com/photo-1542314831-c6a4d1409b1f?q=80&w=800&auto=format&fit=crop",
    amenities: ["wifi", "gym", "restaurant", "parking"],
    description:
      "Hotel bintang lima di pusat Jakarta yang menawarkan akses mudah ke pusat bisnis dan pusat perbelanjaan premium.",
    gallery: [
      "https://images.unsplash.com/photo-1542314831-c6a4d1409b1f?q=80&w=1200",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1200",
      "https://images.unsplash.com/photo-1551882547-ff40c0d5843b?q=80&w=1200",
      "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?q=80&w=1200",
    ],
    rooms: [
      {
        id: 1,
        name: "Deluxe King Room",
        bedType: "1 King Bed",
        price: 4250000,
        image:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800",
      },

      {
        id: 2,
        name: "Suite Panorama",
        bedType: "1 King Bed",
        price: 6120000,
        image:
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800",
      },

      {
        id: 3,
        name: "Family Twin",
        bedType: "2 Single Beds",
        price: 4850000,
        image:
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800",
      },
    ],
  },

  {
    id: 3,
    name: "The St. Regis Bali Resort",
    location: "Nusa Dua, Bali",
    rating: 4.8,
    price: "Rp 8.750.000",
    priceValue: 8750000,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop",
    amenities: ["wifi", "pool", "restaurant", "gym", "parking"],
    description:
      "Resor mewah tepi pantai dengan layanan butler eksklusif dan pemandangan laut yang menakjubkan.",
    gallery: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200",
    ],
    rooms: [
      {
        id: 1,
        name: "Deluxe King Room",
        bedType: "1 King Bed",
        price: 4250000,
        image:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800",
      },

      {
        id: 2,
        name: "Suite Panorama",
        bedType: "1 King Bed",
        price: 6120000,
        image:
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800",
      },

      {
        id: 3,
        name: "Family Twin",
        bedType: "2 Single Beds",
        price: 4850000,
        image:
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800",
      },
    ],
  },

  {
    id: 4,
    name: "Padma Hotel Bandung",
    location: "Ciumbuleuit, Bandung",
    rating: 4.6,
    price: "Rp 2.450.000",
    priceValue: 2450000,
    image:
      "https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?q=80&w=800&auto=format&fit=crop",
    amenities: ["wifi", "pool", "parking"],
    description:
      "Terletak di dataran tinggi Bandung dengan udara sejuk dan pemandangan alam yang memukau.",
    gallery: [
      "https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?q=80&w=1200",
      "https://images.unsplash.com/photo-1551882547-ff40c0d5843b?q=80&w=1200",
      "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?q=80&w=1200",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200",
    ],
    rooms: [
      {
        id: 1,
        name: "Deluxe King Room",
        bedType: "1 King Bed",
        price: 4250000,
        image:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800",
      },

      {
        id: 2,
        name: "Suite Panorama",
        bedType: "1 King Bed",
        price: 6120000,
        image:
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800",
      },

      {
        id: 3,
        name: "Family Twin",
        bedType: "2 Single Beds",
        price: 4850000,
        image:
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800",
      },
    ],
  },

  {
    id: 5,
    name: "The Phoenix Hotel",
    location: "Jetis, Yogyakarta",
    rating: 4.8,
    price: "Rp 1.850.000",
    priceValue: 1850000,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
    amenities: ["wifi", "restaurant"],
    description:
      "Hotel bersejarah dengan arsitektur kolonial yang memadukan kemewahan klasik dan kenyamanan modern.",
    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200",
      "https://images.unsplash.com/photo-1542314831-c6a4d1409b1f?q=80&w=1200",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200",
    ],
    rooms: [
      {
        id: 1,
        name: "Deluxe King Room",
        bedType: "1 King Bed",
        price: 4250000,
        image:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800",
      },

      {
        id: 2,
        name: "Suite Panorama",
        bedType: "1 King Bed",
        price: 6120000,
        image:
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800",
      },

      {
        id: 3,
        name: "Family Twin",
        bedType: "2 Single Beds",
        price: 4850000,
        image:
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800",
      },
    ],
  },

  {
    id: 6,
    name: "JW Marriott Surabaya",
    location: "Surabaya Pusat",
    rating: 4.5,
    price: "Rp 1.650.000",
    priceValue: 1650000,
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c0d5843b?q=80&w=800&auto=format&fit=crop",
    amenities: ["wifi", "gym", "parking"],
    description:
      "Hotel bisnis premium dengan fasilitas lengkap dan lokasi strategis di pusat kota Surabaya.",
    gallery: [
      "https://images.unsplash.com/photo-1551882547-ff40c0d5843b?q=80&w=1200",
      "https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?q=80&w=1200",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1200",
      "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?q=80&w=1200",
    ],
    rooms: [
      {
        id: 1,
        name: "Deluxe King Room",
        bedType: "1 King Bed",
        price: 4250000,
        image:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800",
      },

      {
        id: 2,
        name: "Suite Panorama",
        bedType: "1 King Bed",
        price: 6120000,
        image:
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800",
      },

      {
        id: 3,
        name: "Family Twin",
        bedType: "2 Single Beds",
        price: 4850000,
        image:
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800",
      },
    ],
  },

  {
    id: 7,
    name: "The Trans Luxury Hotel",
    location: "Bandung",
    rating: 4.9,
    price: "Rp 3.950.000",
    priceValue: 3950000,
    image:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=800&auto=format&fit=crop",
    amenities: ["wifi", "pool", "gym", "restaurant"],
    description:
      "Hotel mewah dengan desain elegan dan fasilitas premium untuk pengalaman menginap terbaik.",
    gallery: [
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1200",
      "https://images.unsplash.com/photo-1551882547-ff40c0d5843b?q=80&w=1200",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200",
    ],
    rooms: [
      {
        id: 1,
        name: "Deluxe King Room",
        bedType: "1 King Bed",
        price: 4250000,
        image:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800",
      },

      {
        id: 2,
        name: "Suite Panorama",
        bedType: "1 King Bed",
        price: 6120000,
        image:
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800",
      },

      {
        id: 3,
        name: "Family Twin",
        bedType: "2 Single Beds",
        price: 4850000,
        image:
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800",
      },
    ],
  },

  {
    id: 8,
    name: "Ayana Resort Bali",
    location: "Jimbaran, Bali",
    rating: 5.0,
    price: "Rp 7.500.000",
    priceValue: 7500000,
    image:
      "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?q=80&w=800&auto=format&fit=crop",
    amenities: ["wifi", "pool", "gym", "restaurant", "parking"],
    description:
      "Resor kelas dunia di Jimbaran dengan pemandangan laut spektakuler dan fasilitas eksklusif.",
    gallery: [
      "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?q=80&w=1200",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200",
    ],
    rooms: [
      {
        id: 1,
        name: "Deluxe King Room",
        image:
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=600",
        bedType: "1 King Bed",
        price: 4250000,
      },

      {
        id: 2,
        name: "Suite Panorama",
        image:
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=600",
        bedType: "1 King Bed",
        price: 6120000,
      },

      {
        id: 3,
        name: "Family Twin",
        image:
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=600",
        bedType: "2 Single Beds",
        price: 4850000,
      },
    ],
  },
];

export const getHotels = async (): Promise<HotelType[]> => {
  return new Promise<HotelType[]>((resolve) => {
    setTimeout(() => {
      resolve(dummyHotelData);
    }, 800);
  });
};

export const getHotelById = async (
  id: number,
): Promise<HotelType | undefined> => {
  return new Promise<HotelType | undefined>((resolve) => {
    setTimeout(() => {
      resolve(dummyHotelData.find((hotel) => hotel.id === id));
    }, 500);
  });
};

/*
=========================================
VERSI API ASLI NANTI
=========================================

import axios from 'axios';

export const getHotels = async () => {
  const response = await axios.get(
    'http://localhost:8080/api/hotels'
  );

  return response.data;
};

export const getHotelById = async (
  id: number
) => {
  const response = await axios.get(
    `http://localhost:8080/api/hotels/${id}`
  );

  return response.data;
};
*/
