# Pegi - Team Workflow Guide

## Repository Rules

Branch yang digunakan:

* `main` → Final / Production
* `dev` → Development
* `frontend-1` → Faishal (User Experience & Social Features)
* `frontend-2` → Hamzah (Dashboard & Admin Monitoring)
* `backend-1` → Haikal (Auth, User & Social Module)
* `backend-2` → Haris (Booking, Transaction & Analytics Module)

---

# Clone Repository

Lakukan sekali saja saat pertama kali mengambil project.

```bash
git clone https://github.com/Harisnoresst/Project-Website-Pegi.git
cd Project-Website-Pegi
```

---

# Ambil Update Terbaru

Sebelum mulai bekerja, selalu update branch `dev`.

```bash
git checkout dev
git pull origin dev

```

---

# FRONTEND 1 (Faishal)

Tugas:

* HomePage
* LoginPage
* RegisterPage
* HotelSearchPage
* HotelDetailPage
* DestinationSearchPage
* DestinationDetailPage
* TransportSearchPage (Baru)
* TravelPartnerPage (Baru)
* GroupListPage (Baru)
* GroupDetailPage (Baru)
* ChatPage (Baru)
* SplitBillPage (Baru)

Masuk ke branch:

```bash
git checkout frontend-1

```

Jika branch belum ada di lokal:

```bash
git checkout -b frontend-1 origin/frontend-1

```

---

# FRONTEND 2 (Hamzah)

Tugas:

* ProfilePage (Termasuk Gamification/Badge)
* WishlistPage
* BookingHistoryPage
* AdminDashboard
* AdminUserPage
* AdminHotelPage
* AdminDestinationPage
* AdminPromoPage
* AdminTransportPage (Baru)
* AdminGroupPage (Baru)
* AdminMonitoringPage (Baru)

Masuk ke branch:

```bash
git checkout frontend-2

```

Jika branch belum ada di lokal:

```bash
git checkout -b frontend-2 origin/frontend-2

```

---

# BACKEND 1 (Haikal)

Tugas (Controller & Service):

* AuthController
* UserController
* WishlistController
* ReviewController
* MatchingController (Baru)
* GroupController (Baru)
* ChatController (Baru)
* BadgeService (Baru - Gamification)

Masuk ke branch:

```bash
git checkout backend-1

```

Jika branch belum ada di lokal:

```bash
git checkout -b backend-1 origin/backend-1

```

---

# BACKEND 2 (Haris)

Tugas (Controller & Service):

* HotelController
* DestinationController
* TransportController (Baru)
* BookingController
* PaymentController
* PromoController
* InvoiceController
* SplitBillController (Baru)
* CrowdCalculationService (Baru)
* MonitoringService (Baru)

Masuk ke branch:

```bash
git checkout backend-2

```

Jika branch belum ada di lokal:

```bash
git checkout -b backend-2 origin/backend-2

```

---

# Menyimpan Perubahan

```bash
git add .
git commit -m "feat: nama fitur"
git push origin <nama-branch-kamu>

```

Contoh:

```bash
git add .
git commit -m "feat: add transport search page"
git push origin frontend-1

```

---

# Workflow Harian

1. Update branch dev

```bash
git checkout dev
git pull origin dev

```

2. Masuk ke branch masing-masing

```bash
git checkout frontend-1

```

3. Kerjakan fitur
4. Simpan perubahan

```bash
git add .
git commit -m "feat: nama fitur"
git push origin <nama-branch-kamu>

```

5. Buat Pull Request ke `dev`

---

# Pull Request

Setelah selesai mengerjakan fitur:

1. Push ke branch masing-masing
2. Buka GitHub
3. Klik **Pull Request**
4. Pilih:

```text
frontend-1 -> dev
frontend-2 -> dev
backend-1 -> dev
backend-2 -> dev

```

5. Setelah direview, merge ke `dev`

---

# Rules

* Jangan commit langsung ke `main`
* Jangan commit langsung ke `dev`
* Kerjakan hanya di branch masing-masing
* Selalu lakukan `git pull origin dev` sebelum mulai bekerja
* Gunakan commit message yang jelas

Contoh:

```bash
feat: add login page
fix: booking validation bug
docs: update README

```

---

# System Architecture

```text
React Frontend
      ↓
Axios Service
      ↓
Spring Boot API
      ↓
MySQL Database

```

---

# Team

| Nama | Divisi |
| --- | --- |
| Faishal | Frontend 1 |
| Hamzah | Frontend 2 |
| Haikal | Backend 1 |
| Haris | Backend 2 |

---

Status: Development
