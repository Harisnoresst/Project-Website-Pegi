import type { DestinationType } from "../types/DestinationType";

const dummyDestinationData: DestinationType[] = [
  {
    id: 1,
    name: "Pura Uluwatu",
    location: "Badung, Bali",
    price: "Rp 50.000",
    priceValue: 50000,
    image:
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?q=80&w=1200",
    rating: 4.9,
    crowd: "Sepi",
    category: "Budaya",
    region: "Bali",

    description:
      "Pura Luhur Uluwatu merupakan salah satu pura paling ikonik di Bali yang berdiri di atas tebing setinggi sekitar 70 meter menghadap Samudera Hindia. Destinasi ini terkenal dengan pemandangan sunset yang spektakuler serta pertunjukan Tari Kecak yang memukau wisatawan.",

    bestTime: "08.00 - 18.00 WITA",

    duration: "2 - 3 Jam",

    mapImage:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200",

    gallery: [
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?q=80&w=1200",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200",
      "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1200",
    ],

    reviews: [
      {
        id: 1,
        name: "Budi Setiawan",
        comment: "Pemandangan sunset terbaik yang pernah saya lihat.",
        rating: 5,
      },
      {
        id: 2,
        name: "Siti Rahmawati",
        comment: "Pertunjukan Kecaknya luar biasa.",
        rating: 5,
      },
    ],
  },

  {
    id: 2,
    name: "Terasering Tegalalang",
    location: "Ubud, Bali",
    price: "Rp 25.000",
    priceValue: 25000,
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200",
    rating: 4.8,
    crowd: "Ramai",
    category: "Alam",
    region: "Jawa",

    description:
      "Terasering Tegalalang terkenal dengan hamparan sawah berundak yang indah dan menjadi salah satu ikon wisata alam Indonesia.",

    bestTime: "06.00 - 17.00",

    duration: "1 - 2 Jam",

    mapImage:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200",

    gallery: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200",
      "https://images.unsplash.com/photo-1531973968078-9bb02785f13d?q=80&w=1200",
      "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?q=80&w=1200",
    ],

    reviews: [
      {
        id: 1,
        name: "Dewi Lestari",
        comment: "Sangat hijau dan menenangkan.",
        rating: 5,
      },
    ],
  },

  {
    id: 3,
    name: "Diamond Beach",
    location: "Nusa Penida, Bali",
    price: "Rp 15.000",
    priceValue: 15000,
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200",
    rating: 5,
    crowd: "Sepi",
    category: "Alam",
    region: "Sumatra",

    description:
      "Pantai eksotis dengan pasir putih bersih dan tebing batu karang yang menjadi ikon Nusa Penida.",

    bestTime: "07.00 - 17.00",

    duration: "2 - 4 Jam",

    mapImage:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200",

    gallery: [
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200",
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1200",
    ],

    reviews: [
      {
        id: 1,
        name: "Andi Saputra",
        comment: "Air lautnya sangat jernih.",
        rating: 5,
      },
    ],
  },

  {
    id: 4,
    name: "Ulun Danu Bratan",
    location: "Tabanan, Bali",
    price: "Rp 75.000",
    priceValue: 75000,
    image:
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=1200",
    rating: 4.7,
    crowd: "Ramai",
    category: "Religi",
    region: "Papua",

    description:
      "Kompleks pura yang berada di tepi Danau Bratan dan menjadi salah satu landmark paling terkenal di Bali.",

    bestTime: "08.00 - 17.00",

    duration: "2 Jam",

    mapImage:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200",

    gallery: [
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=1200",
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200",
    ],

    reviews: [
      {
        id: 1,
        name: "Rina Putri",
        comment: "Pemandangannya sangat cantik.",
        rating: 5,
      },
    ],
  },

  {
    id: 5,
    name: "Pantai Seminyak",
    location: "Badung, Bali",
    price: "Rp. 27.000",
    priceValue: 27000,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200",
    rating: 4.5,
    crowd: "Ramai",
    category: "Alam",
    region: "Sulawesi",

    description:
      "Pantai populer dengan sunset indah, beach club terkenal, dan suasana santai khas Bali.",

    bestTime: "16.00 - 18.30",

    duration: "2 - 5 Jam",

    mapImage:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200",

    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200",
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1200",
    ],

    reviews: [
      {
        id: 1,
        name: "Kevin Wijaya",
        comment: "Tempat terbaik menikmati sunset.",
        rating: 5,
      },
    ],
  },

  {
    id: 6,
    name: "Gunung Batur",
    location: "Kintamani, Bali",
    price: "Rp 100.000",
    priceValue: 100000,
    image:
      "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1200",
    rating: 4.9,
    crowd: "Sepi",
    category: "Alam",
    region: "Bali",

    description:
      "Gunung aktif yang terkenal dengan trekking sunrise dan panorama Danau Batur yang menakjubkan.",

    bestTime: "03.00 - 09.00",

    duration: "4 - 6 Jam",

    mapImage:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200",

    gallery: [
      "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1200",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200",
    ],

    reviews: [
      {
        id: 1,
        name: "Yoga Pratama",
        comment: "Sunrise dari puncaknya luar biasa.",
        rating: 5,
      },
    ],
  },
];

export const getDestinations = async () => {
  return new Promise<DestinationType[]>((resolve) => {
    setTimeout(() => {
      resolve(dummyDestinationData);
    }, 500);
  });
};

export const getDestinationById = async (
  id: number,
): Promise<DestinationType | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const destination = dummyDestinationData.find((item) => item.id === id);

      resolve(destination);
    }, 500);
  });
};
