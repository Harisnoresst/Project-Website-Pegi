import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  MdLocationOn,
  MdWifi,
  MdPool,
  MdRestaurant,
  MdFitnessCenter,
  MdStar,
  MdKingBed,
  MdChevronLeft,
  MdChevronRight,
  MdClose,
  MdHotel,
  MdPerson,
  MdAspectRatio,
  MdVisibility,
  MdAccessTime,
  MdCheckCircle,
} from "react-icons/md";

import {} from "react-icons/md";

import { getHotelById } from "../services/hotelService";
import type { HotelType, RoomType } from "../types/HotelType";

import "./HotelDetailPage.css";

const HotelDetailPage: React.FC = () => {
  const [selectedBookingRoom, setSelectedBookingRoom] =
    useState<RoomType | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const [roomImageIndex, setRoomImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState("");
  const [hotel, setHotel] = useState<HotelType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const params = new URLSearchParams(window.location.search);

  const hotelId = Number(params.get("id"));

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        setIsLoading(true);

        const data = await getHotelById(hotelId);

        setHotel(data as HotelType);

        if ((data as HotelType)?.gallery?.length) {
          setSelectedImage((data as HotelType).gallery![0]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHotel();
  }, [hotelId]);

  if (isLoading) {
    return (
      <div className="hotel-detail-loading">
        <h2>Memuat detail hotel...</h2>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="hotel-detail-loading">
        <h2>Hotel tidak ditemukan</h2>
      </div>
    );
  }

  const openRoomDetail = (room: RoomType) => {
    setSelectedRoom(room);
    setRoomImageIndex(0);
  };

  const closeRoomDetail = () => {
    setSelectedRoom(null);
  };

  const nextRoomImage = () => {
    if (!selectedRoom?.gallery) return;

    setRoomImageIndex((prev) =>
      prev === selectedRoom.gallery!.length - 1 ? 0 : prev + 1,
    );
  };

  const prevRoomImage = () => {
    if (!selectedRoom?.gallery) return;

    setRoomImageIndex((prev) =>
      prev === 0 ? selectedRoom.gallery!.length - 1 : prev - 1,
    );
  };

  const rooms = hotel.rooms ?? [];

  const facilityIcons = {
    wifi: <MdWifi size={24} />,
    pool: <MdPool size={24} />,
    restaurant: <MdRestaurant size={24} />,
    gym: <MdFitnessCenter size={24} />,
  };

  const facilityLabels = {
    wifi: "WiFi Gratis",
    pool: "Kolam Renang",
    restaurant: "Restoran",
    gym: "Pusat Kebugaran",
  };

  return (
    <>
      <Navbar />

      <div className="hotel-detail-page">
        <div className="hotel-detail-container">
          {/* ========================= */}
          {/* GALLERY */}
          {/* ========================= */}

          <section className="gallery-section">
            <div className="gallery-main">
              <img src={selectedImage || hotel.image} alt={hotel.name} />
            </div>

            <div className="gallery-grid">
              {hotel.gallery?.slice(1, 5).map((image, index) => (
                <div
                  key={index}
                  className={`gallery-item ${
                    selectedImage === image ? "active" : ""
                  }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <img src={image} alt={`${hotel.name}-${index}`} />
                </div>
              ))}
            </div>
          </section>

          {/* ========================= */}
          {/* HEADER */}
          {/* ========================= */}

          <section className="hotel-header">
            <div>
              <h1>{hotel.name}</h1>

              <div className="hotel-address">
                <MdLocationOn />
                <span>{hotel.location}</span>
              </div>
            </div>

            <div className="hotel-rating">
              <MdStar />
              <span>{hotel.rating}</span>
            </div>
          </section>

          {/* ========================= */}
          {/* MAIN CONTENT */}
          {/* ========================= */}

          <section className="hotel-content-grid">
            {/* LEFT */}
            <div className="hotel-content-left">
              {/* FASILITAS */}
              <div className="detail-card">
                <h3>Fasilitas Populer</h3>

                <div className="facility-grid">
                  {hotel.amenities.map((facility) => (
                    <div key={facility} className="facility-item">
                      {facilityIcons[facility as keyof typeof facilityIcons]}

                      <span>
                        {
                          facilityLabels[
                            facility as keyof typeof facilityLabels
                          ]
                        }
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* DESKRIPSI */}
              <div className="detail-card">
                <h3>Tentang Akomodasi</h3>

                <p>{hotel.description}</p>
              </div>

              {/* LOKASI */}
              <div className="detail-card">
                <h3>Lokasi</h3>

                <div className="location-map">
                  <img
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200"
                    alt="map"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="booking-sidebar">
              <div className="hotel-booking-card">
                <p className="old-price">
                  {selectedBookingRoom ? "" : "Mulai dari"}
                </p>

                <h2>
                  {selectedBookingRoom
                    ? `Rp ${selectedBookingRoom.price.toLocaleString("id-ID")}`
                    : hotel.price}
                </h2>

                <span>/ malam</span>

                {selectedBookingRoom ? (
                  <>
                    <h3 style={{ marginTop: 18 }}>
                      {selectedBookingRoom.name}
                    </h3>

                    <p>{selectedBookingRoom.bedType}</p>

                    <p>{selectedBookingRoom.capacity}</p>

                    <p>{selectedBookingRoom.maxGuest} Dewasa</p>
                  </>
                ) : (
                  <p style={{ marginTop: 18, color: "#6B7280" }}>
                    Belum memilih tipe kamar
                  </p>
                )}

                <div className="booking-info">
                  <strong>Check-in</strong>
                  <p>12 Jun - 14 Jun 2024</p>
                </div>

                <div className="booking-info">
                  <strong>Tamu</strong>
                  <p>2 Dewasa, 1 Kamar</p>
                </div>

                <button
                  className="booking-button"
                  disabled={!selectedBookingRoom}
                  onClick={() => {
                    if (!selectedBookingRoom) return;

                    window.location.href = "/payment-page";
                  }}
                >
                  {selectedBookingRoom
                    ? "Pesan Sekarang"
                    : "Pilih Kamar Terlebih Dahulu"}
                </button>
              </div>

              <div className="member-card">
                <h4>Member Pegi Gold</h4>

                <p>Dapatkan diskon tambahan dan keuntungan eksklusif.</p>

                <button>Lihat Detail Member →</button>
              </div>
            </div>
          </section>

          {/* ========================= */}
          {/* ROOMS */}
          {/* ========================= */}

          <section className="rooms-section">
            <div className="rooms-header">
              <h2>Tipe Kamar Tersedia</h2>

              <p>Semua tipe kamar termasuk sarapan gratis dan WiFi</p>
            </div>

            <div className="rooms-table">
              <div className="rooms-table-header">
                <span>Pilihan Tempat Tidur</span>
                <span>Harga / Malam</span>
                <span>Aksi</span>
              </div>

              {rooms.map((room) => (
                <div key={room.id} className="room-row">
                  <div className="room-info">
                    <img src={room.image} alt={room.name} />

                    <div>
                      <h4>{room.name}</h4>
                      <span
                        className="room-detail-link"
                        onClick={() => openRoomDetail(room)}
                      >
                        Lihat Detail Kamar
                      </span>
                    </div>
                  </div>

                  <div className="bed-info">
                    <MdKingBed />

                    <span>{room.bedType}</span>
                  </div>

                  <div className="room-price">
                    Rp {room.price.toLocaleString("id-ID")}
                  </div>

                  <button
                    className="room-select-btn"
                    onClick={() => setSelectedBookingRoom(room)}
                  >
                    Pilih Kamar
                  </button>
                </div>
              ))}
            </div>
          </section>
          {selectedRoom && (
            <div className="room-modal-overlay" onClick={closeRoomDetail}>
              <div className="room-modal" onClick={(e) => e.stopPropagation()}>
                <div className="room-modal-header">
                  <div>
                    <h2>{selectedRoom.name}</h2>
                    <div className="room-subtitle">
                      <span>
                        <MdStar />
                        {hotel.rating}
                      </span>

                      <span>
                        <MdAspectRatio />
                        {selectedRoom.capacity}
                      </span>

                      <span>
                        <MdPerson />
                        {selectedRoom.maxGuest} Dewasa
                      </span>

                      <span>
                        <MdVisibility />
                        City View
                      </span>
                    </div>
                    <p>Tipe Kamar</p>
                  </div>

                  <button className="room-close-btn" onClick={closeRoomDetail}>
                    <MdClose size={24} />
                  </button>
                </div>

                <div className="room-modal-image">
                  <button className="room-prev-btn" onClick={prevRoomImage}>
                    <MdChevronLeft size={26} />
                  </button>
                  <img
                    src={
                      selectedRoom.gallery
                        ? selectedRoom.gallery[roomImageIndex]
                        : selectedRoom.image
                    }
                    alt={selectedRoom.name}
                  />
                  <button className="room-next-btn" onClick={nextRoomImage}>
                    <MdChevronRight size={26} />
                  </button>
                </div>

                {selectedRoom.gallery && selectedRoom.gallery.length > 1 && (
                  <div className="room-image-thumbs">
                    {selectedRoom.gallery.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        className={roomImageIndex === index ? "active" : ""}
                        onClick={() => setRoomImageIndex(index)}
                      />
                    ))}
                  </div>
                )}

                <div className="room-modal-body">
                  <h3>Deskripsi Kamar</h3>

                  <p>{selectedRoom.description}</p>
                  <div className="room-feature-grid">
                    <div className="room-feature-card">
                      <MdHotel />
                      <div>
                        <strong>Tempat Tidur</strong>
                        <span>{selectedRoom.bedType}</span>
                      </div>
                    </div>

                    <div className="room-feature-card">
                      <MdPerson />
                      <div>
                        <strong>Kapasitas</strong>
                        <span>{selectedRoom.maxGuest} Dewasa</span>
                      </div>
                    </div>

                    <div className="room-feature-card">
                      <MdAspectRatio />
                      <div>
                        <strong>Ukuran</strong>
                        <span>{selectedRoom.capacity}</span>
                      </div>
                    </div>

                    <div className="room-feature-card">
                      <MdAccessTime />
                      <div>
                        <strong>Check-in</strong>
                        <span>{selectedRoom.checkIn}</span>
                      </div>
                    </div>
                  </div>

                  <hr />

                  <h3>Fasilitas Kamar</h3>

                  <ul className="room-facilities">
                    {selectedRoom.facilities?.map((facility, index) => (
                      <li>
                        <MdCheckCircle />
                        {facility}
                      </li>
                    ))}
                  </ul>

                  <button
                    className="room-book-btn"
                    onClick={() => {
                      setSelectedBookingRoom(selectedRoom);
                      closeRoomDetail();
                    }}
                  >
                    Pilih Kamar Ini
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HotelDetailPage;
