import "./Footer.css";
import {
  FaInstagram,
  FaFacebookF,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* LEFT */}
        <div className="footer-brand">
          <a href="/" className="footer-logo-link">
            <img
              src="/Logo_Pegi_noBg.png"
              alt="Pegi"
              className="footer-logo"
              draggable={false}
            />
          </a>

          <p>
            Solusi perjalanan terpercaya untuk eksplorasi nusantara tanpa batas
            dengan kenyamanan maksimal.
          </p>

          <div className="footer-social">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>

            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF />
            </a>

            <a href="https://x.com" target="_blank" rel="noreferrer">
              <FaXTwitter />
            </a>

            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* LAYANAN */}

        <div className="footer-column">
          <h4>Layanan</h4>

          <a href="/hotel-search">Hotel & Penginapan</a>

          <a href="/transport-search">Bus & Travel</a>

          <a href="/transport-search">Kereta Api</a>

          <a href="/destination-search">Destinasi Wisata</a>
        </div>

        {/* TENTANG */}

        <div className="footer-column">
          <h4>Tentang</h4>

          <a href="#">Tentang Kami</a>

          <a href="#">Kebijakan Privasi</a>

          <a href="#">Syarat & Ketentuan</a>
        </div>

        {/* DUKUNGAN */}

        <div className="footer-column">
          <h4>Dukungan</h4>

          <a href="/help-center">Pusat Bantuan</a>

          <a href="#">FAQ</a>
        </div>
      </div>

      <div className="footer-divider"></div>

      <div className="footer-bottom">
        © 2026 <strong>Pegi</strong>. Solusi Perjalanan Terpercaya.
      </div>
    </footer>
  );
};

export default Footer;
