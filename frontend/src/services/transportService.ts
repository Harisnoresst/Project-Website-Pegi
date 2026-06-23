import type { TransportType } from '../types/TransportType';

const dummyTransportData: TransportType[] = [
  {
    id: 1,
    company: 'Pahala Kencana',
    type: 'Bus',
    classType: 'Executive Class',

    route: 'Jakarta - Bandung',

    departureCity: 'Jakarta',
    arrivalCity: 'Bandung',

    departurePoint: 'Terminal Pulo Gebang',
    arrivalPoint: 'Pool Pasteur',

    departureTime: '08:30',
    arrivalTime: '11:45',

    duration: '3j 15m',

    image:
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200',

    price: 'Rp 120.000',
    priceValue: 120000,

    rating: 4.8,

    remainingSeats: 3,

    region: 'Jawa',

    description:
      'Pahala Kencana Executive Class menawarkan perjalanan nyaman dengan kursi reclining, AC, dan hiburan selama perjalanan.',

    facilities: [
      { id: 1, name: 'AC' },
      { id: 2, name: 'WiFi' },
      { id: 3, name: 'USB Charger' }
    ],

    gallery: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200'
    ],

    reviews: [
      {
        id: 1,
        name: 'Budi Santoso',
        rating: 5,
        comment: 'Bus bersih dan tepat waktu.'
      }
    ]
  },

  {
    id: 2,
    company: 'Argo Parahyangan',
    type: 'Kereta',
    classType: 'Eksekutif',

    route: 'Jakarta - Bandung',

    departureCity: 'Jakarta',
    arrivalCity: 'Bandung',

    departurePoint: 'Stasiun Gambir',
    arrivalPoint: 'Stasiun Bandung',

    departureTime: '10:00',
    arrivalTime: '12:50',

    duration: '2j 50m',

    image:
      'https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=1200',

    price: 'Rp 150.000',
    priceValue: 150000,

    rating: 4.9,

    remainingSeats: 12,

    region: 'Jawa',

    description:
      'Kereta cepat dan nyaman dengan fasilitas premium serta pemandangan indah sepanjang perjalanan.',

    facilities: [
      { id: 1, name: 'AC' },
      { id: 2, name: 'Stop Kontak' },
      { id: 3, name: 'Toilet' }
    ]
  },

  {
    id: 3,
    company: 'Cititrans',
    type: 'Shuttle',
    classType: 'Premium Shuttle',

    route: 'Bandung - Jakarta',

    departureCity: 'Bandung',
    arrivalCity: 'Jakarta',

    departurePoint: 'Cihampelas Walk',
    arrivalPoint: 'Blok M',

    departureTime: '14:15',
    arrivalTime: '18:00',

    duration: '3j 45m',

    image:
      'https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1200',

    price: 'Rp 175.000',
    priceValue: 175000,

    rating: 4.7,

    remainingSeats: 5,

    region: 'Jawa',

    description:
      'Shuttle premium dengan armada modern dan kursi yang nyaman.'
  },

  {
    id: 4,
    company: 'Primajasa',
    type: 'Bus',
    classType: 'Economy Class',

    route: 'Bandung - Tasikmalaya',

    departureCity: 'Bandung',
    arrivalCity: 'Tasikmalaya',

    departurePoint: 'Terminal Leuwipanjang',
    arrivalPoint: 'Terminal Tasik',

    departureTime: '15:30',
    arrivalTime: '19:30',

    duration: '4j 00m',

    image:
      'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=1200',

    price: 'Rp 95.000',
    priceValue: 95000,

    rating: 4.4,

    remainingSeats: 18,

    region: 'Jawa',

    description:
      'Pilihan ekonomis untuk perjalanan antar kota dengan harga terjangkau.'
  },

  {
    id: 5,
    company: 'DayTrans',
    type: 'Travel',
    classType: 'Executive Travel',

    route: 'Jakarta - Bandung',

    departureCity: 'Jakarta',
    arrivalCity: 'Bandung',

    departurePoint: 'Kuningan',
    arrivalPoint: 'Pasteur',

    departureTime: '07:00',
    arrivalTime: '10:00',

    duration: '3j 00m',

    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200',

    price: 'Rp 135.000',
    priceValue: 135000,

    rating: 4.6,

    remainingSeats: 7,

    region: 'Jawa'
  },

  {
    id: 6,
    company: 'ALS',
    type: 'Bus',
    classType: 'Executive',

    route: 'Medan - Padang',

    departureCity: 'Medan',
    arrivalCity: 'Padang',

    departurePoint: 'Terminal Amplas',
    arrivalPoint: 'Terminal Padang',

    departureTime: '20:00',
    arrivalTime: '08:00',

    duration: '12j 00m',

    image:
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200',

    price: 'Rp 320.000',
    priceValue: 320000,

    rating: 4.5,

    remainingSeats: 9,

    region: 'Sumatra'
  },

  {
    id: 7,
    company: 'Bali Trans',
    type: 'Shuttle',
    classType: 'Tourist Shuttle',

    route: 'Denpasar - Ubud',

    departureCity: 'Denpasar',
    arrivalCity: 'Ubud',

    departurePoint: 'Bandara Ngurah Rai',
    arrivalPoint: 'Ubud Center',

    departureTime: '09:00',
    arrivalTime: '10:30',

    duration: '1j 30m',

    image:
      'https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1200',

    price: 'Rp 85.000',
    priceValue: 85000,

    rating: 4.8,

    remainingSeats: 6,

    region: 'Bali'
  },

  {
    id: 8,
    company: 'Sulawesi Express',
    type: 'Travel',
    classType: 'VIP Travel',

    route: 'Makassar - Parepare',

    departureCity: 'Makassar',
    arrivalCity: 'Parepare',

    departurePoint: 'Panakkukang',
    arrivalPoint: 'Parepare City',

    departureTime: '13:00',
    arrivalTime: '17:00',

    duration: '4j 00m',

    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200',

    price: 'Rp 140.000',
    priceValue: 140000,

    rating: 4.7,

    remainingSeats: 10,

    region: 'Sulawesi'
  }
];

export const getTransports = async (): Promise<
  TransportType[]
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyTransportData);
    }, 500);
  });
};

export const getTransportById = async (
  id: number
): Promise<
  TransportType | undefined
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const transport =
        dummyTransportData.find(
          (item) => item.id === id
        );

      resolve(transport);
    }, 500);
  });
};