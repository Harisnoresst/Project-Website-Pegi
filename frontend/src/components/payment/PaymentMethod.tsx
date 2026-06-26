import React, { useState } from "react";

const PaymentMethod: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState("bca");

  const methods = [
    {
      id: "bca",
      title: "Transfer Bank BCA",
      subtitle: "Virtual Account",
      icon: "🏦",
    },
    {
      id: "bni",
      title: "Transfer Bank BNI",
      subtitle: "Virtual Account",
      icon: "🏦",
    },
    {
      id: "mandiri",
      title: "Transfer Bank Mandiri",
      subtitle: "Virtual Account",
      icon: "🏦",
    },
    {
      id: "gopay",
      title: "GoPay",
      subtitle: "E-Wallet",
      icon: "💙",
    },
    {
      id: "ovo",
      title: "OVO",
      subtitle: "E-Wallet",
      icon: "💜",
    },
    {
      id: "qris",
      title: "QRIS",
      subtitle: "Semua E-Wallet",
      icon: "📱",
    },
  ];

  return (
    <div className="payment-card">
      <div className="card-title">
        <h3>💳 Metode Pembayaran</h3>
      </div>

      <div className="payment-method-list">
        {methods.map((method) => (
          <label
            key={method.id}
            className={`payment-method ${
              selectedMethod === method.id ? "active" : ""
            }`}
          >
            <input
              type="radio"
              checked={selectedMethod === method.id}
              onChange={() => setSelectedMethod(method.id)}
            />

            <div className="payment-icon">
              {method.icon}
            </div>

            <div className="payment-info">
              <strong>{method.title}</strong>
              <span>{method.subtitle}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethod;