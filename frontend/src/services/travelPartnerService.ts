import type { TravelPartnerType } from "../types/TravelPartnerType";

const travelPartners: TravelPartnerType[] = [
  {
    id: 1,
    name: "Aris Budiman",
    city: "Jakarta",
    avatar: "https://i.pravatar.cc/150?img=11",
    destination: "Pura Uluwatu",
    travelDate: "2026-12-20",
    matchPercentage: 95,
    interests: ["Fotografi", "Kuliner", "Pantai"],
  },

  {
    id: 2,
    name: "Siska Wijaya",
    city: "Surabaya",
    avatar: "https://i.pravatar.cc/150?img=5",
    destination: "Terasering Tegalalang",
    travelDate: "2026-12-21",
    matchPercentage: 92,
    interests: ["Hiking", "Camping"],
  },

  {
    id: 3,
    name: "Budi Santoso",
    city: "Bandung",
    avatar: "https://i.pravatar.cc/150?img=13",
    destination: "Diamond Beach",
    travelDate: "2026-12-20",
    matchPercentage: 88,
    interests: ["Diving", "Photography"],
  },

  {
    id: 4,
    name: "Dina Putri",
    city: "Yogyakarta",
    avatar: "https://i.pravatar.cc/150?img=20",
    destination: "Ulun Danu Bratan",
    travelDate: "2026-12-22",
    matchPercentage: 85,
    interests: ["Nature", "Adventure"],
  },
];

export const getTravelPartners = async () => {
  return Promise.resolve(travelPartners);
};