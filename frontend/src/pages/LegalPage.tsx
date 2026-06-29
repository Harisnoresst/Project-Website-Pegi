import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./LegalPage.css";

const LegalPage = () => {
  useEffect(() => {
  if (window.location.hash) {
    const id = window.location.hash.replace("#", "");

    // kasih delay sedikit supaya halaman selesai dirender
    setTimeout(() => {
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  }
}, []);
  return (
    <>
      <Navbar />

      <div className="legal-page">
        <div className="legal-hero">
          <span className="legal-badge">Dokumen Legal</span>

          <h1>
            Syarat & Ketentuan
            <br />
            dan Kebijakan Privasi
          </h1>

          <p>
            Dengan menggunakan layanan Pegi, Anda dianggap telah membaca,
            memahami, dan menyetujui seluruh syarat penggunaan layanan serta
            kebijakan privasi yang berlaku.
          </p>

          <small>Terakhir diperbarui: 21 Juli 2026</small>
        </div>

        <div className="legal-container">
          <aside className="legal-sidebar">
            <h3>Daftar Isi</h3>

            <a href="#terms">Syarat & Ketentuan</a>
            <a href="#intro">Pendahuluan</a>
            <a href="#definition">Definisi</a>
            <a href="#use">Penggunaan Layanan</a>
            <a href="#account">Akun Pengguna</a>
            <a href="#booking">Pemesanan</a>
            <a href="#price">Harga & Promo</a>
            <a href="#payment">Pembayaran</a>
            <a href="#refund">Pembatalan & Refund</a>
            <a href="#copyright">Hak Kekayaan Intelektual</a>
            <a href="#prohibited">Larangan Penggunaan</a>
            <a href="#liability">Pembatasan Tanggung Jawab</a>
            <a href="#changes">Perubahan Ketentuan</a>
            <a href="#law">Hukum yang Berlaku</a>
            <a href="#contact">Hubungi Kami</a>

            <hr />

            <a href="#privacy">Kebijakan Privasi</a>
            <a href="#collect">Informasi yang Dikumpulkan</a>
            <a href="#collection-method">Cara Pengumpulan Data</a>
            <a href="#usage">Penggunaan Informasi</a>
            <a href="#cookies">Cookie</a>
            <a href="#sharing">Berbagi Informasi</a>
            <a href="#security">Keamanan Data</a>
            <a href="#storage">Penyimpanan Data</a>
            <a href="#rights">Hak Pengguna</a>
            <a href="#children">Privasi Anak</a>
            <a href="#privacy-change">Perubahan Kebijakan</a>
            <a href="#privacy-contact">Hubungi Kami</a>
          </aside>

          <main className="legal-content">
            <section id="terms">
              <h2>Syarat & Ketentuan</h2>

              <p>
                Selamat datang di <strong>Pegi</strong>. Halaman ini berisi
                syarat dan ketentuan yang mengatur penggunaan seluruh layanan
                yang tersedia pada platform Pegi, termasuk pencarian dan
                pemesanan hotel, transportasi, destinasi wisata, pembayaran,
                serta layanan pendukung lainnya.
              </p>

              <p>
                Dengan mengakses, mendaftar, atau menggunakan layanan Pegi, Anda
                dianggap telah membaca, memahami, dan menyetujui seluruh syarat
                serta ketentuan yang tercantum pada halaman ini.
              </p>
            </section>

            <section id="intro">
              <h3>1. Pendahuluan</h3>

              <p>
                Pegi merupakan platform digital yang menghubungkan pengguna
                dengan berbagai penyedia layanan perjalanan. Kami berupaya
                memberikan pengalaman pemesanan yang aman, mudah, dan transparan
                melalui sistem yang terus dikembangkan.
              </p>

              <p>
                Dokumen ini berlaku bagi seluruh pengguna tanpa terkecuali dan
                dapat diperbarui sewaktu-waktu sesuai kebutuhan operasional
                maupun perubahan peraturan yang berlaku.
              </p>
            </section>

            <section id="definition">
              <h3>2. Definisi</h3>

              <ul>
                <li>
                  <strong>Pegi</strong> adalah platform digital penyedia layanan
                  perjalanan.
                </li>

                <li>
                  <strong>Pengguna</strong> adalah setiap individu yang
                  menggunakan layanan Pegi.
                </li>

                <li>
                  <strong>Mitra</strong> adalah penyedia hotel, transportasi,
                  destinasi wisata, maupun layanan lain yang bekerja sama dengan
                  Pegi.
                </li>

                <li>
                  <strong>Booking</strong> adalah proses pemesanan layanan
                  melalui platform Pegi.
                </li>

                <li>
                  <strong>Transaksi</strong> adalah seluruh aktivitas pembayaran
                  maupun pembatalan yang dilakukan pengguna.
                </li>
              </ul>
            </section>

            <section id="use">
              <h3>3. Penggunaan Layanan</h3>

              <p>
                Pengguna wajib menggunakan layanan Pegi secara sah, bertanggung
                jawab, dan sesuai dengan ketentuan hukum Republik Indonesia.
              </p>

              <p>Pengguna dilarang menggunakan layanan untuk:</p>

              <ul>
                <li>melakukan penipuan;</li>
                <li>menyebarkan informasi palsu;</li>
                <li>mengganggu sistem;</li>
                <li>mengakses data tanpa izin;</li>
                <li>melakukan aktivitas yang merugikan pengguna lain.</li>
              </ul>
            </section>

            <section id="account">
              <h3>4. Akun Pengguna</h3>

              <p>
                Untuk menggunakan fitur tertentu, pengguna diwajibkan memiliki
                akun yang terdaftar pada platform Pegi.
              </p>

              <p>Pengguna bertanggung jawab untuk:</p>

              <ul>
                <li>memberikan data yang benar dan akurat;</li>
                <li>menjaga kerahasiaan password akun;</li>
                <li>tidak membagikan akun kepada pihak lain;</li>
                <li>
                  segera mengganti password apabila akun dicurigai
                  disalahgunakan.
                </li>
              </ul>

              <p>
                Seluruh aktivitas yang terjadi pada akun menjadi tanggung jawab
                pemilik akun.
              </p>
            </section>

            <section id="booking">
              <h3>5. Pemesanan Layanan</h3>

              <p>
                Pegi menyediakan layanan pemesanan hotel, transportasi, dan
                destinasi wisata melalui mitra yang telah bekerja sama.
              </p>

              <p>Setiap pemesanan bergantung pada:</p>

              <ul>
                <li>ketersediaan layanan;</li>
                <li>kapasitas mitra;</li>
                <li>jadwal operasional;</li>
                <li>kebijakan masing-masing penyedia layanan.</li>
              </ul>

              <p>
                Setelah pembayaran berhasil diverifikasi, pengguna akan
                memperoleh bukti pemesanan melalui akun maupun email yang
                terdaftar.
              </p>
            </section>

            <section id="price">
              <h3>6. Harga dan Promo</h3>

              <p>
                Harga yang ditampilkan pada aplikasi merupakan harga yang
                berlaku pada saat pencarian dilakukan.
              </p>

              <p>
                Pegi maupun mitra berhak melakukan perubahan harga sewaktu-waktu
                sesuai kondisi operasional.
              </p>

              <p>Promo yang diberikan memiliki ketentuan sebagai berikut:</p>

              <ul>
                <li>berlaku selama periode tertentu;</li>
                <li>dapat memiliki kuota;</li>
                <li>tidak selalu dapat digabung dengan promo lain;</li>
                <li>dapat dihentikan tanpa pemberitahuan sebelumnya.</li>
              </ul>
            </section>

            <section id="payment">
              <h3>7. Pembayaran</h3>

              <p>
                Pembayaran dilakukan melalui metode pembayaran yang tersedia
                pada platform Pegi.
              </p>

              <p>
                Pengguna wajib memastikan nominal pembayaran telah sesuai
                sebelum menyelesaikan transaksi.
              </p>

              <p>
                Apabila terjadi gangguan sistem atau kegagalan pembayaran,
                pengguna dapat mencoba kembali setelah sistem kembali normal
                atau menghubungi layanan pelanggan.
              </p>
            </section>

            <section id="refund">
              <h3>8. Pembatalan dan Pengembalian Dana</h3>

              <p>
                Kebijakan pembatalan mengikuti ketentuan yang berlaku pada
                masing-masing mitra penyedia layanan.
              </p>

              <p>
                Tidak seluruh transaksi dapat dibatalkan maupun memperoleh
                pengembalian dana.
              </p>

              <p>
                Apabila refund disetujui, proses pengembalian dana akan
                dilakukan melalui metode pembayaran yang digunakan pada saat
                transaksi sesuai kebijakan penyedia layanan pembayaran.
              </p>
            </section>

            <section id="copyright">
              <h3>9. Hak Kekayaan Intelektual</h3>

              <p>
                Seluruh konten yang terdapat pada platform Pegi, termasuk logo,
                nama dagang, desain antarmuka, ikon, gambar, ilustrasi, teks,
                maupun kode program merupakan hak kekayaan intelektual milik
                Pegi atau pihak yang telah memberikan lisensi.
              </p>

              <p>
                Pengguna tidak diperkenankan memperbanyak, mendistribusikan,
                maupun menggunakan konten tersebut tanpa izin tertulis dari
                Pegi.
              </p>
            </section>

            <section id="prohibited">
              <h3>10. Larangan Penggunaan</h3>

              <p>Pengguna dilarang melakukan aktivitas berikut:</p>

              <ul>
                <li>membuat akun palsu;</li>
                <li>menyalahgunakan promo;</li>
                <li>menggunakan bot atau script otomatis;</li>
                <li>melakukan scraping data;</li>
                <li>reverse engineering;</li>
                <li>mengganggu keamanan sistem;</li>
                <li>menyebarkan malware atau virus.</li>
              </ul>
            </section>

            <section id="liability">
              <h3>11. Pembatasan Tanggung Jawab</h3>

              <p>
                Pegi bertindak sebagai platform yang mempertemukan pengguna
                dengan mitra penyedia layanan.
              </p>

              <p>
                Pelaksanaan layanan utama seperti hotel, transportasi, maupun
                destinasi wisata sepenuhnya menjadi tanggung jawab mitra sesuai
                ketentuan yang berlaku.
              </p>
            </section>

            <section id="changes">
              <h3>12. Perubahan Ketentuan</h3>

              <p>
                Pegi berhak memperbarui syarat dan ketentuan sewaktu-waktu untuk
                menyesuaikan perkembangan layanan maupun perubahan regulasi.
              </p>

              <p>
                Versi terbaru akan selalu tersedia pada halaman ini beserta
                tanggal pembaruannya.
              </p>
            </section>

            <section id="law">
              <h3>13. Hukum yang Berlaku</h3>

              <p>
                Seluruh syarat dan ketentuan ini tunduk pada hukum Republik
                Indonesia.
              </p>

              <p>
                Apabila terjadi sengketa, penyelesaian akan dilakukan melalui
                mekanisme hukum yang berlaku di wilayah Republik Indonesia.
              </p>
            </section>

            <section id="contact">
              <h3>14. Hubungi Kami</h3>

              <p>
                Apabila memiliki pertanyaan mengenai syarat dan ketentuan ini,
                silakan menghubungi kami melalui:
              </p>

              <ul>
                <li>
                  <strong>Email:</strong> support@pegi.id
                </li>
                <li>
                  <strong>Telepon:</strong> (+62) 812-3456-7890
                </li>
                <li>
                  <strong>Jam Operasional:</strong> 08.00–21.00 WIB
                </li>
                <li>
                  <strong>Alamat:</strong> Jakarta, Indonesia
                </li>
              </ul>
            </section>

            <section id="privacy">
              <h2>Kebijakan Privasi</h2>

              <p>
                Pegi menghargai privasi setiap pengguna dan berkomitmen untuk
                melindungi data pribadi yang diberikan kepada kami. Kebijakan
                Privasi ini menjelaskan bagaimana kami mengumpulkan,
                menggunakan, menyimpan, serta melindungi informasi pribadi
                pengguna ketika menggunakan layanan Pegi.
              </p>

              <p>
                Dengan menggunakan layanan Pegi, Anda menyetujui pengumpulan dan
                penggunaan informasi sebagaimana dijelaskan dalam Kebijakan
                Privasi ini.
              </p>
            </section>

            <section id="collect">
              <h3>1. Informasi yang Kami Kumpulkan</h3>

              <p>
                Kami dapat mengumpulkan berbagai jenis informasi yang diperlukan
                untuk memberikan layanan secara optimal, antara lain:
              </p>

              <ul>
                <li>Nama lengkap.</li>
                <li>Alamat email.</li>
                <li>Nomor telepon.</li>
                <li>Tanggal lahir (apabila diperlukan).</li>
                <li>Riwayat pemesanan dan transaksi.</li>
                <li>Informasi pembayaran.</li>
                <li>Wishlist dan riwayat perjalanan.</li>
                <li>Alamat IP dan informasi perangkat.</li>
                <li>Browser, sistem operasi, dan cookie.</li>
              </ul>
            </section>

            <section id="collection-method">
              <h3>2. Cara Pengumpulan Data</h3>

              <p>
                Informasi pribadi diperoleh melalui beberapa cara, di antaranya:
              </p>

              <ul>
                <li>Saat pengguna membuat akun.</li>
                <li>Saat melakukan login.</li>
                <li>Saat melakukan pemesanan layanan.</li>
                <li>Saat melakukan pembayaran.</li>
                <li>Saat menghubungi layanan pelanggan.</li>
                <li>
                  Saat menggunakan fitur yang tersedia pada aplikasi maupun
                  website.
                </li>
              </ul>
            </section>

            <section id="usage">
              <h3>3. Penggunaan Informasi</h3>

              <p>
                Informasi yang dikumpulkan digunakan untuk mendukung operasional
                layanan Pegi, antara lain:
              </p>

              <ul>
                <li>Memproses pemesanan dan pembayaran.</li>
                <li>Mengirimkan konfirmasi booking.</li>
                <li>Melakukan verifikasi akun melalui OTP.</li>
                <li>Memberikan notifikasi mengenai transaksi.</li>
                <li>Meningkatkan kualitas layanan.</li>
                <li>Mencegah penyalahgunaan akun.</li>
                <li>Memberikan promo dan penawaran yang relevan.</li>
                <li>Menyusun analisis penggunaan layanan.</li>
              </ul>
            </section>

            <section id="cookies">
              <h3>4. Cookie</h3>

              <p>
                Pegi menggunakan cookie untuk meningkatkan pengalaman pengguna
                selama menggunakan website.
              </p>

              <p>Cookie digunakan untuk:</p>

              <ul>
                <li>Mengingat sesi login.</li>
                <li>Menyimpan preferensi pengguna.</li>
                <li>Meningkatkan performa website.</li>
                <li>Menganalisis penggunaan layanan.</li>
              </ul>

              <p>
                Pengguna dapat mengatur penggunaan cookie melalui pengaturan
                browser yang digunakan.
              </p>
            </section>

            <section id="sharing">
              <h3>5. Berbagi Informasi</h3>

              <p>Pegi tidak menjual data pribadi pengguna kepada pihak lain.</p>

              <p>Informasi hanya dapat dibagikan apabila diperlukan kepada:</p>

              <ul>
                <li>Mitra hotel.</li>
                <li>Mitra transportasi.</li>
                <li>Mitra destinasi wisata.</li>
                <li>Penyedia layanan pembayaran.</li>
                <li>Penyedia layanan email atau notifikasi.</li>
                <li>Instansi pemerintah apabila diwajibkan oleh hukum.</li>
              </ul>
            </section>

            <section id="security">
              <h3>6. Keamanan Data</h3>

              <p>
                Kami menerapkan berbagai langkah keamanan untuk melindungi
                informasi pengguna dari akses, perubahan, maupun penyalahgunaan
                yang tidak sah.
              </p>

              <p>Beberapa langkah yang kami lakukan meliputi:</p>

              <ul>
                <li>Penggunaan koneksi HTTPS.</li>
                <li>Enkripsi data tertentu.</li>
                <li>Kontrol akses sistem.</li>
                <li>Verifikasi identitas pengguna.</li>
                <li>Pemantauan aktivitas yang mencurigakan.</li>
              </ul>
            </section>

            <section id="storage">
              <h3>7. Penyimpanan Data</h3>

              <p>
                Data pribadi disimpan selama masih diperlukan untuk memberikan
                layanan, memenuhi kewajiban hukum, menyelesaikan sengketa,
                maupun meningkatkan kualitas layanan Pegi.
              </p>

              <p>
                Setelah tidak lagi diperlukan, data akan dihapus atau
                dianonimkan sesuai kebijakan penyimpanan data yang berlaku.
              </p>
            </section>

            <section id="rights">
              <h3>8. Hak Pengguna</h3>

              <p>Setiap pengguna memiliki hak untuk:</p>

              <ul>
                <li>Mengakses informasi pribadinya.</li>
                <li>Memperbarui data akun.</li>
                <li>Memperbaiki informasi yang tidak akurat.</li>
                <li>Meminta penghapusan akun sesuai ketentuan.</li>
                <li>Meminta salinan data pribadi apabila diperlukan.</li>
              </ul>
            </section>

            <section id="children">
              <h3>9. Privasi Anak</h3>

              <p>
                Layanan Pegi tidak secara khusus ditujukan bagi anak di bawah
                usia 17 tahun. Penggunaan layanan oleh anak di bawah umur
                sebaiknya dilakukan dengan pengawasan serta persetujuan orang
                tua atau wali yang sah.
              </p>
            </section>

            <section id="privacy-change">
              <h3>10. Perubahan Kebijakan Privasi</h3>

              <p>
                Pegi dapat memperbarui Kebijakan Privasi sewaktu-waktu untuk
                menyesuaikan perkembangan layanan maupun perubahan regulasi yang
                berlaku.
              </p>

              <p>
                Setiap perubahan akan ditampilkan pada halaman ini beserta
                tanggal pembaruan terbaru.
              </p>
            </section>

            <section id="privacy-contact">
              <h3>11. Hubungi Kami</h3>

              <p>
                Jika Anda memiliki pertanyaan mengenai Kebijakan Privasi ini,
                silakan menghubungi kami melalui:
              </p>

              <ul>
                <li>
                  <strong>Email:</strong> privacy@pegi.id
                </li>
                <li>
                  <strong>Telepon:</strong> (+62) 812-3456-7890
                </li>
                <li>
                  <strong>Jam Operasional:</strong> 08.00–21.00 WIB
                </li>
                <li>
                  <strong>Alamat:</strong> Jakarta, Indonesia
                </li>
              </ul>
            </section>
          </main>
        </div>
      </div>

      <Footer />
    </>
  );
};



export default LegalPage;
