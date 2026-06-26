import React, { useState, useEffect } from "react";
import {
  FaBuilding,
  FaTrain,
  FaTicketAlt,
  FaBus,
  FaCalendarAlt,
  FaStar,
  FaChair,
  FaUserFriends,
  FaMapMarkerAlt,
  FaChevronDown,
} from "react-icons/fa";
import "./BookingHistoryPage.css";
import type { BookingItem } from "../types/BookingType";
import { getBookings } from "../services/bookingService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TravelerSidebar from "../components/TravelerSidebar";

const BookingHistoryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Semua");
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      try {
        const response = await getBookings();
        setBookings(response.data);
      } catch (error) {
        console.error("Gagal mengambil data riwayat booking:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const getCategoryIcon = (category: string, title: string) => {
    if (category === "Hotel") return <FaBuilding />;
    if (category === "Tiket Wisata") return <FaTicketAlt />;
    if (category === "Transportasi") {
      if (
        title.toLowerCase().includes("kereta") ||
        title.toLowerCase().includes("taksaka")
      )
        return <FaTrain />;
      return <FaBus />;
    }
    return <FaTicketAlt />;
  };

  const getExtraIcon = (category: string) => {
    if (category === "Hotel") return <FaStar className="text-yellow" />;
    if (category === "Transportasi") return <FaChair />;
    if (category === "Tiket Wisata") return <FaUserFriends />;
    return <FaMapMarkerAlt />;
  };

  const filteredBookings =
    activeTab === "Semua"
      ? bookings
      : bookings.filter((b) => b.category === activeTab);

  return (
    <>
      <Navbar />
      <div className="page-wrapper">
        <div className="profile-layout">
          <TravelerSidebar activeMenu="history" />

          <main className="profile-main">
            <div className="main-container">
              <header className="main-header">
                <h1>Riwayat Booking</h1>
                <p>Pantau status perjalanan dan transaksi Anda.</p>
              </header>

              <div className="filter-tabs">
                {["Semua", "Hotel", "Transportasi", "Tiket Wisata"].map(
                  (tab) => (
                    <button
                      key={tab}
                      className={`filter-btn ${activeTab === tab ? "active" : ""}`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  ),
                )}
              </div>

              {isLoading ? (
                <p
                  style={{
                    color: "#8f9bba",
                    marginTop: "20px",
                    fontWeight: "bold",
                  }}
                >
                  Memuat riwayat booking Anda...
                </p>
              ) : filteredBookings.length === 0 ? (
                <p style={{ color: "#8f9bba", marginTop: "20px" }}>
                  Tidak ada riwayat booking untuk kategori ini.
                </p>
              ) : (
                <>
                  <div className="booking-list">
                    {filteredBookings.map((booking) => (
                      <div key={booking.id} className="booking-card">
                        <div className="booking-image">
                          <img src={booking.imageUrl} alt={booking.title} />
                        </div>

                        <div className="booking-info">
                          <div className="info-header">
                            <span className="category-label">
                              {getCategoryIcon(booking.category, booking.title)}{" "}
                              {booking.category.toUpperCase()}
                            </span>
                            <span
                              className={`status-badge ${booking.status === "Selesai" ? "badge-green" : "badge-yellow"}`}
                            >
                              {booking.status}
                            </span>
                          </div>

                          <h3 className="booking-title">{booking.title}</h3>
                          <p className="booking-id">ID: {booking.bookingId}</p>

                          <div className="info-footer">
                            <span className="info-item">
                              <FaCalendarAlt className="icon-grey" />{" "}
                              {booking.date}
                            </span>
                            <span className="info-item">
                              {getExtraIcon(booking.category)}{" "}
                              {booking.extraText}
                            </span>
                          </div>
                        </div>

                        <div className="booking-action">
                          <div className="price-wrapper">
                            <p className="price-label">Total Pembayaran</p>
                            <p className="price-value">{booking.totalPrice}</p>
                          </div>
                          <button className="btn-action">
                            {booking.buttonText}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredBookings.length > 0 && (
                    <div className="load-more-container">
                      <button className="btn-load-more">
                        Tampilkan Lebih Banyak <FaChevronDown />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookingHistoryPage;
