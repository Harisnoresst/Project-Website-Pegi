import React, { useEffect, useState } from "react";

import { getTransportById } from "../../services/transportService";
import type { TransportType } from "../../types/TransportType";

interface Props {
  transportId: number;
  seats: number[];
}

const PaymentSummary: React.FC<Props> = ({ transportId, seats }) => {
  const [transport, setTransport] = useState<TransportType | null>(null);

  useEffect(() => {
    const fetchTransport = async () => {
      try {
        const data = await getTransportById(transportId);

        if (data) {
          setTransport(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTransport();
  }, [transportId]);

  if (!transport) {
    return (
      <div className="payment-card">
        <h3>Ringkasan Pesanan</h3>
        <p>Memuat...</p>
      </div>
    );
  }

  const subtotal = transport.priceValue * seats.length;

  const serviceFee = 5000;

  const total = subtotal + serviceFee;

  return (
    <div className="payment-card">
      <h3>Ringkasan Pesanan</h3>

      <div className="summary-item">
        <span>Transport</span>
        <strong>{transport.company}</strong>
      </div>

      <div className="summary-item">
        <span>Rute</span>
        <strong>
          {transport.departureCity} → {transport.arrivalCity}
        </strong>
      </div>

      <div className="summary-item">
        <span>Kelas</span>
        <strong>{transport.classType}</strong>
      </div>

      <hr />

      <div className="summary-item">
        <span>Harga / Tiket</span>
        <strong>{transport.price}</strong>
      </div>

      <div className="summary-item">
        <span>Kursi Dipilih</span>
        <strong>{seats.length > 0 ? seats.join(", ") : "-"}</strong>
      </div>

      <div className="summary-item">
        <span>Jumlah Penumpang</span>
        <strong>{seats.length}</strong>
      </div>

      <hr />

      <div className="summary-item">
        <span>Subtotal</span>
        <strong>Rp {subtotal.toLocaleString("id-ID")}</strong>
      </div>

      <div className="summary-item">
        <span>Biaya Layanan</span>
        <strong>Rp {serviceFee.toLocaleString("id-ID")}</strong>
      </div>

      <div className="summary-item total">
        <span>Total Pembayaran</span>
        <strong>Rp {total.toLocaleString("id-ID")}</strong>
      </div>

      <button
        className="pay-button"
        onClick={() => {
          window.location.href = "/payment-success";
        }}
      >
        Bayar Sekarang
      </button>
    </div>
  );
};

export default PaymentSummary;
