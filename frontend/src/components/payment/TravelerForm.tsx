import React, { useState } from "react";

interface Traveler {
  seat: number;
  fullName: string;
  identityNumber: string;
}

interface Props {
  seats: number[];
}

const TravelerForm: React.FC<Props> = ({ seats }) => {
  const [travelers, setTravelers] = useState<Traveler[]>(
    seats.map((seat) => ({
      seat,
      fullName: "",
      identityNumber: "",
    }))
  );

  const handleChange = (
    index: number,
    field: keyof Traveler,
    value: string
  ) => {
    const updated = [...travelers];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setTravelers(updated);
  };

  return (
    <div className="payment-card">
      <div className="card-title">
        <h3>👤 Detail Traveler</h3>
      </div>

      {travelers.map((traveler, index) => (
        <div className="traveler-card" key={traveler.seat}>
          <h4>
            Traveler {index + 1}

            <span className="seat-number">
              Kursi {traveler.seat}
            </span>
          </h4>

          <div className="contact-grid">
            <div className="form-group">
              <label>Nama Lengkap</label>

              <input
                className="form-control"
                type="text"
                placeholder="Sesuai KTP / Paspor"
                value={traveler.fullName}
                onChange={(e) =>
                  handleChange(index, "fullName", e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Nomor Identitas</label>

              <input
                className="form-control"
                type="text"
                placeholder="NIK / Paspor"
                value={traveler.identityNumber}
                onChange={(e) =>
                  handleChange(index, "identityNumber", e.target.value)
                }
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TravelerForm;