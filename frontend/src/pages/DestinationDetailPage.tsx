import React, { useEffect, useState } from "react";
import NavbarGuest from "../components/NavbarGuest";
import {
  MdLocationOn,
  MdStar,
  MdAccessTime,
  MdConfirmationNumber,
  MdRemove,
  MdAdd,
} from "react-icons/md";

import { getDestinationById } from "../services/destinationService";
import type { DestinationType } from "../types/DestinationType";

import "./DestinationDetailPage.css";

const DestinationDetailPage: React.FC = () => {
  const [destination, setDestination] = useState<DestinationType | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [ticketCount, setTicketCount] = useState(1);

  const params = new URLSearchParams(window.location.search);

  const destinationId = Number(params.get("id"));

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        setIsLoading(true);

        const data = await getDestinationById(destinationId);

        if (!data) {
          setIsLoading(false);
          return;
        }

        setDestination(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDestination();
  }, [destinationId]);

  if (isLoading) {
    return (
      <div className="destination-detail-loading">
        <h2>Memuat detail destinasi...</h2>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="destination-detail-loading">
        <h2>Destinasi tidak ditemukan</h2>
      </div>
    );
  }

  const totalPrice = destination.priceValue * ticketCount;

  return (
    <>
      <NavbarGuest />

      <div className="destination-detail-page">
        {/* HERO */}
        <section className="destination-hero">
          <img
            src={destination.gallery?.[0] || destination.image}
            alt={destination.name}
          />

          <div className="hero-overlay">
            <div
              className={`crowd-status ${
                destination.crowd === "Sepi" ? "quiet" : "busy"
              }`}
            >
              {destination.crowd}
            </div>

            <h1>{destination.name}</h1>

            <div className="hero-location">
              <MdLocationOn />

              <span>{destination.location}</span>

              <span>•</span>

              <MdStar />

              <span>{destination.rating}</span>
            </div>
          </div>
        </section>

        <div className="destination-detail-container">
          <section className="destination-content">
            {/* LEFT */}
            <div className="destination-left">
              <div className="detail-card">
                <h3>Informasi Destinasi</h3>

                <div className="destination-info-grid">
                  <div className="info-item">
                    <MdAccessTime />

                    <div>
                      <span>Jam Operasional</span>

                      <strong>{destination.bestTime}</strong>
                    </div>
                  </div>

                  <div className="info-item">
                    <MdConfirmationNumber />

                    <div>
                      <span>Durasi Visit</span>

                      <strong>{destination.duration}</strong>
                    </div>
                  </div>
                </div>

                <p className="destination-description">
                  {destination.description}
                </p>

                <div className="destination-map">
                  <img src={destination.mapImage} alt="Map" />
                </div>
              </div>

              {/* REVIEW */}
              <div className="detail-card">
                <div className="review-header">
                  <h3>Ulasan Pengunjung</h3>

                  <div className="review-rating">
                    <span>{destination.rating}</span>

                    <MdStar />
                    <MdStar />
                    <MdStar />
                    <MdStar />
                    <MdStar />
                  </div>
                </div>

                <div className="review-list">
                  {destination.reviews?.map((review) => (
                    <div key={review.id} className="review-item">
                      <div className="review-avatar">
                        {review.name.charAt(0).toUpperCase()}
                      </div>

                      <div className="review-content">
                        <h4>{review.name}</h4>

                        <p>{review.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="see-all-review-btn">
                  Lihat Semua Ulasan
                </button>
              </div>
            </div>

            {/* RIGHT */}
            <div className="destination-right">
              <div className="ticket-card">
                <h3>{destination.name}</h3>

                <p className="ticket-subtitle">Tiket Masuk Destinasi</p>

                <div className="ticket-price-row">
                  <span>Harga Mulai Dari</span>

                  <strong>{destination.price}</strong>
                </div>

                <div className="ticket-note">✓ Konfirmasi Instan</div>

                <div className="ticket-field">
                  <label>Tanggal Kunjungan</label>

                  <input type="date" />
                </div>

                <div className="ticket-field">
                  <label>Jumlah Tiket</label>

                  <div className="ticket-counter">
                    <button
                      onClick={() =>
                        setTicketCount(Math.max(1, ticketCount - 1))
                      }
                    >
                      <MdRemove />
                    </button>

                    <span>{ticketCount}</span>

                    <button onClick={() => setTicketCount(ticketCount + 1)}>
                      <MdAdd />
                    </button>
                  </div>
                </div>

                <div className="ticket-total">
                  <span>Total</span>

                  <strong>Rp {totalPrice.toLocaleString("id-ID")}</strong>
                </div>

                <button className="buy-ticket-btn">Beli Tiket Masuk</button>
              </div>
            </div>
          </section>

          {/* TRAVELER */}
          <section className="traveler-section">
            <div className="traveler-header">
              <div>
                <h2>Traveler Lain yang Ke Sini di Tanggal yang Sama</h2>

                <p>Temukan teman perjalanan baru dan bagikan pengalamanmu.</p>
              </div>

              <button className="partner-btn">Cari Travel Partner</button>
            </div>

            <div className="traveler-list">
              {["Raka", "Anisa", "Kevin", "Dina", "Arif"].map((traveler) => (
                <div key={traveler} className="traveler-card">
                  <div className="traveler-avatar">
                    {traveler.charAt(0).toUpperCase()}
                  </div>

                  <h4>{traveler}</h4>
                </div>
              ))}

              <div className="traveler-card add-card">+</div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default DestinationDetailPage;
