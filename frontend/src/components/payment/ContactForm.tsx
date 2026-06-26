import React, { useState } from "react";

const ContactForm: React.FC = () => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (field: string, value: string) => {
    setContact({
      ...contact,
      [field]: value,
    });
  };

  return (
    <div className="payment-card">
      <div className="card-title">
        <h3>👤 Detail Kontak Pemesan</h3>
      </div>

      <div className="contact-grid">
        <div className="form-group">
          <label>Nama Lengkap</label>

          <div className="input-wrapper">

            <input
              className="form-control"
              type="text"
              placeholder="Contoh: Budi Santoso"
              value={contact.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Email</label>

          <div className="input-wrapper">

            <input
              className="form-control"
              type="email"
              placeholder="email@contoh.com"
              value={contact.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="form-group phone-group">
        <label>Nomor Telepon</label>

        <div className="phone-input">
          <div className="country-code">
            +62
          </div>

          <input
            className="form-control"
            type="text"
            placeholder="81234567890"
            value={contact.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
