import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import ContactForm from "../components/payment/ContactForm";
import TravelerForm from "../components/payment/TravelerForm";
import PaymentMethod from "../components/payment/PaymentMethod";
import PaymentSummary from "../components/payment/PaymentSummary";

import "./PaymentPage.css";

const PaymentPage: React.FC = () => {
  const params = new URLSearchParams(window.location.search);

  const transportId = Number(params.get("id"));

  const selectedSeats = params.get("seats")?.split(",").map(Number) || [];

  return (
    <>
      <Navbar />

      <div className="payment-page">
        <div className="payment-left">
          <ContactForm />

          <TravelerForm seats={selectedSeats} />

          <PaymentMethod />
        </div>

        <div className="payment-right">
          <PaymentSummary transportId={transportId} seats={selectedSeats} />
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default PaymentPage;
