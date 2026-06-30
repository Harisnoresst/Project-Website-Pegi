import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FaEllipsisV,
  FaImage,
  FaPaperPlane,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTrain,
  FaBuilding,
  FaCar,
  FaArrowRight,
  FaStar,
  FaPlus,
  FaCalculator,
  FaBus,
  FaTicketAlt,
  FaCheckCircle,
  FaExclamationCircle,
  FaTimes,
  FaReceipt,
  FaUsers,
  FaWallet,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./GroupChat.css";
import TravelerSidebar from "../components/TravelerSidebar";

// --- INTERFACES ---
interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  type: "text" | "card" | "image";
  content: string;
  time: string;
  cardData?: { title: string; price: string; rating: number; img: string };
}

interface ItineraryItem {
  id: number;
  date: string;
  time: string;
  title: string;
  status: string;
  statusColor: string;
  icon: React.ReactNode;
  details?: string;
  image?: string;
  extras?: string[];
}

interface Member {
  id: number;
  name: string;
  role: string;
  avatar: string;
  isOnline?: boolean;
  status?: string;
}

interface Bill {
  id: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  date: string;
  paidBy: string;
  total: number;
  perPerson: number;
}

interface NewBillForm {
  title: string;
  category: string;
  totalAmount: string;
  paidBy: string;
  date: string;
  notes: string;
}

// --- DATA DUMMY (FALLBACK) ---
const dummyGroupInfo = {
  id: "TRP-2024-0812",
  title: "Ekspedisi Kereta Jawa",
  status: "Aktif",
  location: "Jakarta - Yogyakarta - Surabaya",
  date: "12 - 18 Agustus 2024",
};

const dummyMessages: Message[] = [
  {
    id: "msg-1",
    senderId: "user-1",
    senderName: "Budi",
    senderAvatar: "https://i.pravatar.cc/150?img=11",
    type: "text",
    content: "Gimana teman-teman, villa di Seminyak sudah oke semua? Aku baru cek transportasinya, sewa mobil di sana lagi banyak promo nih.",
    time: "09:15",
  },
  {
    id: "msg-2",
    senderId: "user-2",
    senderName: "Siska",
    senderAvatar: "https://i.pravatar.cc/150?img=5",
    type: "text",
    content: "Setuju! Villa yang kemarin kita bahas lokasinya strategis banget ke pantai. Andi gimana? Sudah cek tiket keretanya belum?",
    time: "09:20",
  },
  {
    id: "msg-4",
    senderId: "me",
    senderName: "Anda",
    type: "text",
    content: "Tenang Sis, tiket kereta api eksekutif sudah aman semua. Tinggal bayar pelunasan aja nanti pas split bill.",
    time: "09:25",
  },
];

const dummyItineraryData: ItineraryItem[] = [
  {
    id: 1,
    date: "SENIN, 12 AGUSTUS",
    time: "08:00 WIB",
    title: "Keberangkatan Kereta Argo Bromo Anggrek",
    status: "Terkonfirmasi",
    statusColor: "purple",
    icon: <FaTrain />,
    details: "GMR-2024-X12 • Gerbong Eksekutif 1, Kursi 4A",
  },
  {
    id: 2,
    date: "SELASA, 13 AGUSTUS",
    time: "14:00 WIB",
    title: "Check-in Plataran Heritage Borobudur",
    status: "Dibayar",
    statusColor: "gray",
    icon: <FaBuilding />,
    image: "https://images.unsplash.com/photo-1580975685799-73fc342416a9?auto=format&fit=crop&w=400&q=80",
    extras: ["2x Deluxe Suite", "Free High Speed Wi-Fi", "Sarapan Pagi (Buffet)"],
  },
  {
    id: 3,
    date: "RABU, 14 AGUSTUS",
    time: "09:00 WIB",
    title: "Tur Budaya & Kuliner Yogyakarta",
    status: "Menunggu",
    statusColor: "orange",
    icon: <FaCar />,
    details: "Sewa Hiace Luxury 12 Jam bersama Supir & Guide berlisensi. Mengunjungi Keraton, Tamansari, dan Gudeg Yu Djum.",
  },
];

const dummyMembersData: Member[] = [
  { id: 1, name: "Aditya Pratama", role: "Ketua Grup (Admin) / Total Tagihan: Rp 1.140.000", avatar: "https://i.pravatar.cc/150?img=11", isOnline: true, status: "Lunas" },
  { id: 2, name: "Budi Santoso", role: "Anggota / Sisa: Rp 255.000", avatar: "https://i.pravatar.cc/150?img=8", status: "Belum Bayar" },
  { id: 3, name: "Siska Wijaya", role: "Bendahara / Total Tagihan: Rp 1.140.000", avatar: "https://i.pravatar.cc/150?img=5", status: "Lunas" },
  { id: 4, name: "Maya Indah", role: "Anggota / Sisa: Rp 760.000", avatar: "https://i.pravatar.cc/150?img=9", status: "Belum Bayar" },
];

const dummyBillsData: Bill[] = [
  {
    id: "bill-1",
    icon: <FaBus />,
    iconBg: "bg-purple-light ",
    iconColor: "text-blue",
    title: "Bus Pariwisata Eksekutif (Jakarta - Jogja)",
    date: "12 Des 2023",
    paidBy: "Aditya",
    total: 1600000,
    perPerson: 400000,
  },
  {
    id: "bill-2",
    icon: <FaTicketAlt />,
    iconBg: "bg-purple-light ",
    iconColor: "text-purple",
    title: "Tiket Terusan Borobudur & Prambanan",
    date: "13 Des 2023",
    paidBy: "Siska",
    total: 1020000,
    perPerson: 255000,
  },
  {
    id: "bill-3",
    icon: <FaTrain />,
    iconBg: "bg-purple-light ",
    iconColor: "text-blue",
    title: "KAI Taksaka Luxury - Kembali",
    date: "15 Des 2023",
    paidBy: "Budi",
    total: 1440000,
    perPerson: 360000,
  },
];

const BILL_CATEGORIES = [
  { value: "bus", label: "Bus & Travel", icon: <FaBus /> },
  { value: "train", label: "Kereta Api", icon: <FaTrain /> },
  { value: "ticket", label: "Tiket Wisata", icon: <FaTicketAlt /> },
  { value: "hotel", label: "Hotel & Penginapan", icon: <FaBuilding /> },
  { value: "car", label: "Sewa Kendaraan", icon: <FaCar /> },
  { value: "other", label: "Lainnya", icon: <FaReceipt /> },
];

const formatRupiah = (n: number) => "Rp " + n.toLocaleString("id-ID");

const GroupChat: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("splitbill");

  // Data state
  const [isLoading, setIsLoading] = useState(true);
  const [groupInfo, setGroupInfo] = useState(dummyGroupInfo);
  const [messages, setMessages] = useState<Message[]>([]);
  const [itineraryData, setItineraryData] = useState<ItineraryItem[]>([]);
  const [membersData, setMembersData] = useState<Member[]>([]);
  const [billsData, setBillsData] = useState<Bill[]>([]);

  // Chat input
  const [inputText, setInputText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  // Add Bill popup
  const [showAddBill, setShowAddBill] = useState(false);
  const [billForm, setBillForm] = useState<NewBillForm>({
    title: "",
    category: "bus",
    totalAmount: "",
    paidBy: "",
    date: "",
    notes: "",
  });
  const [billSubmitting, setBillSubmitting] = useState(false);

  // --- FETCH DATA FROM DATABASE ---
  useEffect(() => {
    const fetchGroupData = async () => {
      setIsLoading(true);
      try {
        const [resGroup, resMessages, resItinerary, resMembers, resBills] = await Promise.all([
          fetch(`http://localhost:5000/api/groups/${id}`),
          fetch(`http://localhost:5000/api/groups/${id}/messages`),
          fetch(`http://localhost:5000/api/groups/${id}/itinerary`),
          fetch(`http://localhost:5000/api/groups/${id}/members`),
          fetch(`http://localhost:5000/api/groups/${id}/bills`),
        ]);

        if (!resGroup.ok) throw new Error("Gagal mengambil data dari database");

        const dataGroup = await resGroup.json();
        const dataMessages = resMessages.ok ? await resMessages.json() : dummyMessages;
        const dataItinerary = resItinerary.ok ? await resItinerary.json() : dummyItineraryData;
        const dataMembers = resMembers.ok ? await resMembers.json() : dummyMembersData;
        const dataBills = resBills.ok ? await resBills.json() : dummyBillsData;

        setGroupInfo(dataGroup);
        setMessages(dataMessages);
        setItineraryData(dataItinerary);
        setMembersData(dataMembers);
        setBillsData(dataBills);
      } catch (error) {
        console.warn("Database tidak merespon, beralih menggunakan data dummy.");
        setGroupInfo({ ...dummyGroupInfo, id: id || "TRP-2024-0812" });
        setMessages(dummyMessages);
        setItineraryData(dummyItineraryData);
        setMembersData(dummyMembersData);
        setBillsData(dummyBillsData);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGroupData();
  }, [id]);

  // Auto-scroll chat
  useEffect(() => {
    if (chatBodyRef.current) chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
  }, [messages, activeTab]);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = showAddBill ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showAddBill]);

  // --- SEND MESSAGE ---
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: "me",
      senderName: "Anda",
      type: "text",
      content: inputText,
      time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputText("");

    try {
      await fetch(`http://localhost:5000/api/groups/${id}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMessage),
      });
    } catch {
      console.warn("Gagal menyimpan pesan ke database (disimpan secara lokal)");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageMessage: Message = {
        id: Date.now().toString(),
        senderId: "me",
        senderName: "Anda",
        type: "image",
        content: URL.createObjectURL(e.target.files[0]),
        time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, imageMessage]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // --- ADD BILL ---
  const handleBillFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setBillForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddBillSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!billForm.title || !billForm.totalAmount || !billForm.paidBy || !billForm.date) return;

    setBillSubmitting(true);
    const memberCount = membersData.length || 4;
    const total = parseFloat(billForm.totalAmount.replace(/\D/g, ""));
    const catMeta = BILL_CATEGORIES.find((c) => c.value === billForm.category);

    const newBill: Bill = {
      id: `bill-${Date.now()}`,
      icon: catMeta?.icon ?? <FaReceipt />,
      iconBg: billForm.category === "train" || billForm.category === "ticket" ? "bg-purple-light" : billForm.category === "hotel" ? "bg-orange-light" : "bg-blue-light",
      iconColor: billForm.category === "train" || billForm.category === "ticket" ? "text-purple" : billForm.category === "hotel" ? "text-orange" : "text-blue",
      title: billForm.title,
      date: new Date(billForm.date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
      paidBy: billForm.paidBy,
      total,
      perPerson: Math.round(total / memberCount),
    };

    // Optimistic UI
    setBillsData((prev) => [...prev, newBill]);

    try {
      await fetch(`http://localhost:5000/api/groups/${id}/bills`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...billForm, total, perPerson: newBill.perPerson }),
      });
    } catch {
      console.warn("Gagal menyimpan tagihan ke database (disimpan secara lokal)");
    } finally {
      setBillSubmitting(false);
      setShowAddBill(false);
      setBillForm({ title: "", category: "bus", totalAmount: "", paidBy: "", date: "", notes: "" });
    }
  };

  // Derived totals
  const totalBill = billsData.reduce((s, b) => s + b.total, 0);

  // Category totals
  const categoryTotals = {
    bus: billsData.filter((b) => b.id.includes("bill") && b.iconBg === "bg-blue-light").reduce((s, b) => s + b.total, 0),
    train: billsData.filter((b) => b.iconBg === "bg-blue-light" && b.title.toLowerCase().includes("kereta")).reduce((s, b) => s + b.total, 0),
    ticket: billsData.filter((b) => b.iconBg === "bg-purple-light").reduce((s, b) => s + b.total, 0),
  };

  return (
    <>
      <div className="page-wrapper">
        <Navbar />
        <div className="traveler-layout">
          <TravelerSidebar activeMenu="grup" />

          <main className="group-detail-main">
            {/* ======= TICKET-STYLE HEADER ======= */}
            <div className="group-detail-header ticket-header">
              {/* Decorative travel pattern */}
              <div className="ticket-bg-pattern" aria-hidden="true">
                {Array.from({ length: 6 }).map((_, i) => (
                  <span key={i} className={`ticket-deco ticket-deco-${i}`}>
                    {i % 3 === 0 ? <FaTicketAlt /> : i % 3 === 1 ? <FaTrain /> : <FaMapMarkerAlt />}
                  </span>
                ))}
              </div>

              {/* Ticket notch effect */}
              <div className="ticket-notch ticket-notch-left" />
              <div className="ticket-notch ticket-notch-right" />

              <div className="ticket-header-content">
                <div className="header-top-row">
                  <div className="header-badges">
                    <span className="badge-status-aktif">{groupInfo.status}</span>
                    <span className="ticket-id">#{groupInfo.id}</span>
                  </div>
                </div>

                <h1 className="group-title">{groupInfo.title}</h1>

                <div className="ticket-meta-row">
                  <div className="ticket-meta-item">
                    <FaMapMarkerAlt className="ticket-meta-icon" />
                    <span>{groupInfo.location}</span>
                  </div>
                  <div className="ticket-divider-dot" />
                  <div className="ticket-meta-item">
                    <FaCalendarAlt className="ticket-meta-icon" />
                    <span>{groupInfo.date}</span>
                  </div>
                  <div className="ticket-divider-dot" />
                  <div className="ticket-meta-item">
                    <FaUsers className="ticket-meta-icon" />
                    <span>{membersData.length} Anggota</span>
                  </div>
                </div>
              </div>
            </div>

            {/* TAB NAVIGASI */}
            <div className="chat-tabs">
              {["obrolan", "itinerary", "splitbill"].map((tab) => (
                <button key={tab} className={`tab-btn ${activeTab === tab ? "active" : ""}`} onClick={() => setActiveTab(tab)}>
                  {tab === "obrolan" ? "Obrolan" : tab === "itinerary" ? "Itinerary & Anggota" : "Split Bill"}
                </button>
              ))}
            </div>

            {isLoading && (
              <div className="loading-state">
                <div className="loading-spinner" />
                <span>Memuat data grup...</span>
              </div>
            )}

            {!isLoading && (
              <div className="tab-content-area" style={{ display: "flex", flexDirection: "column" }}>
                {/* ======= TAB: ITINERARY & ANGGOTA ======= */}
                {activeTab === "itinerary" && (
                  <div className="itinerary-grid">
                    <div className="itinerary-left">
                      <div className="section-header">
                        <h3>Rencana Perjalanan Darat</h3>
                        <a href="#semua" className="link-purple">
                          Lihat Semua <FaArrowRight />
                        </a>
                      </div>
                      <div className="timeline-container">
                        {itineraryData.map((item) => (
                          <div className="timeline-item" key={item.id}>
                            <div className={`timeline-icon icon-${item.statusColor}`}>{item.icon}</div>
                            <div className="timeline-card">
                              <div className="timeline-card-header">
                                <span className="timeline-datetime">
                                  {item.date} • {item.time}
                                </span>
                                <span className={`badge-status badge-${item.statusColor}`}>{item.status}</span>
                              </div>
                              <h4 className="timeline-title">{item.title}</h4>
                              {item.details && <p className="timeline-desc">{item.details}</p>}
                              {item.image && (
                                <div className="timeline-media">
                                  <img src={item.image} alt={item.title} className="timeline-img" />
                                  {item.extras && (
                                    <ul className="timeline-extras">
                                      {item.extras.map((ex, i) => (
                                        <li key={i}>{ex}</li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="itinerary-right">
                      <div className="members-card">
                        <div className="section-header">
                          <h3>Anggota Grup</h3>
                          <span className="member-count">{membersData.length}/10</span>
                        </div>
                        <div className="member-list">
                          {membersData.map((member) => (
                            <div className="member-item" key={member.id}>
                              <div className="member-avatar-box">
                                <img src={member.avatar} alt={member.name} />
                                {member.isOnline && <span className="online-dot" />}
                              </div>
                              <div className="member-info">
                                <h4>{member.name}</h4>
                                <p>{member.role.split(" / ")[0]}</p>
                              </div>
                              <div className={`ps-status-badge ${member.status === "Lunas" ? "badge-lunas" : "badge-belum"}`}>
                                {member.status === "Lunas" ? <FaCheckCircle /> : <FaExclamationCircle />}
                                {member.status || "Belum Bayar"}
                              </div>
                              <button className="btn-options">
                                <FaEllipsisV />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ======= TAB: OBROLAN ======= */}
                {activeTab === "obrolan" && (
                  <div style={{ display: "flex", flexDirection: "column", height: "100%", flex: 1, minHeight: "450px" }}>
                    <div className="chat-body" ref={chatBodyRef} style={{ flex: 1, overflowY: "auto" }}>
                      <div className="chat-date-separator">
                        <span>Hari ini</span>
                      </div>
                      {messages.map((msg) => {
                        const isMe = msg.senderId === "me";
                        return (
                          <div key={msg.id} className={`chat-bubble-wrapper ${isMe ? "sent" : "received"}`}>
                            {!isMe && <img src={msg.senderAvatar} alt={msg.senderName} className="chat-user-avatar" />}
                            <div className="chat-message-content">
                              {!isMe && <span className="chat-sender-name">{msg.senderName}</span>}
                              {msg.type === "text" && (
                                <div className={`chat-bubble ${isMe ? "purple" : "white"}`}>
                                  <p>{msg.content}</p>
                                </div>
                              )}
                              {msg.type === "image" && (
                                <div className="chat-bubble-image">
                                  <img src={msg.content} alt="Uploaded" className="uploaded-image" />
                                </div>
                              )}
                              {msg.type === "card" && msg.cardData && (
                                <div className="chat-product-card-no-img">
                                  <div className="card-info-box">
                                    <h4 className="card-title-text">{msg.cardData.title}</h4>
                                    <div className="card-price-row">
                                      <span className="fw-bold text-purple">{msg.cardData.price}</span>
                                      <span className="rating">
                                        <FaStar className="text-yellow" /> {msg.cardData.rating}
                                      </span>
                                    </div>
                                    <button className="btn-detail-product">Lihat Detail Villa</button>
                                  </div>
                                </div>
                              )}
                              <span className="chat-timestamp">{msg.time}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="chat-footer" style={{ marginTop: "auto" }}>
                      <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleImageUpload} />
                      <button className="btn-action-icon" onClick={() => fileInputRef.current?.click()}>
                        <FaImage />
                      </button>
                      <form className="chat-input-wrapper" onSubmit={handleSendMessage}>
                        <input type="text" placeholder="Tulis pesan untuk grup..." value={inputText} onChange={(e) => setInputText(e.target.value)} />
                      </form>
                      <button className="btn-send-message" onClick={handleSendMessage} disabled={!inputText.trim()}>
                        Kirim <FaPaperPlane />
                      </button>
                    </div>
                  </div>
                )}

                {/* ======= TAB: SPLIT BILL ======= */}
                {activeTab === "splitbill" && (
                  <div className="splitbill-wrapper">
                    <div className="splitbill-header">
                      <div>
                        <h2>Manajemen Keuangan Grup</h2>
                        <p>Kelola pengeluaran transportasi darat dan tiket wisata bersama.</p>
                      </div>
                      <button className="btn-add-bill" onClick={() => setShowAddBill(true)}>
                        <FaPlus /> Tambah Tagihan Baru
                      </button>
                    </div>

                    <div className="splitbill-grid">
                      <div className="splitbill-main">
                        {/* Summary Card */}
                        <div className="splitbill-summary-card">
                          <div className="summary-left">
                            <div className="summary-icon">
                              <FaCalculator />
                            </div>
                            <div>
                              <h3>Kalkulator Patungan Grup</h3>
                              <p>Total Biaya Perjalanan Bersama</p>
                            </div>
                          </div>
                          <div className="summary-right">
                            <span className="summary-label">TOTAL TERAKUMULASI</span>
                            <h2 className="summary-total">{formatRupiah(totalBill)}</h2>
                            <span className="summary-count">{billsData.length} Tagihan Aktif</span>
                          </div>
                        </div>

                        {/* Category Cards */}
                        <div className="category-cards-wrapper">
                          <div className="category-card">
                            <div className="cat-card-header">
                              <div className="cat-icon bg-purple-light  text-blue">
                                <FaBus />
                              </div>
                              <span className="cat-badge text-blue">Terverifikasi</span>
                            </div>
                            <p className="cat-title">Tiket Bus & Travel</p>
                            <h3 className="cat-amount">{formatRupiah(billsData.filter((b) => b.iconBg === "bg-blue-light").reduce((s, b) => s + b.total, 0))}</h3>
                          </div>
                          <div className="category-card">
                            <div className="cat-card-header">
                              <div className="cat-icon bg-purple-light text-purple">
                                <FaTrain />
                              </div>
                              <span className="cat-badge text-purple">Terverifikasi</span>
                            </div>
                            <p className="cat-title">Kereta Api Antar Kota</p>
                            <h3 className="cat-amount">{formatRupiah(billsData.filter((b) => b.title.toLowerCase().includes("kai") || b.title.toLowerCase().includes("kereta")).reduce((s, b) => s + b.total, 0))}</h3>
                          </div>
                          <div className="category-card">
                            <div className="cat-card-header">
                              <div className="cat-icon bg-orange-light text-orange">
                                <FaTicketAlt />
                              </div>
                              <span className="cat-badge text-orange">Terverifikasi</span>
                            </div>
                            <p className="cat-title">Tiket Masuk Wisata</p>
                            <h3 className="cat-amount">{formatRupiah(billsData.filter((b) => b.iconBg === "bg-purple-light").reduce((s, b) => s + b.total, 0))}</h3>
                          </div>
                        </div>

                        {/* Bills List */}
                        <div className="active-bills-section">
                          <div className="active-bills-header">
                            <h4>DAFTAR TAGIHAN AKTIF</h4>
                            <a href="#semua">Lihat Semua</a>
                          </div>
                          <div className="bills-list">
                            {billsData.map((bill, idx) => (
                              <div key={bill.id} className={`bill-item ${idx === billsData.length - 1 ? "border-none" : ""}`}>
                                <div className={`bill-icon-wrapper ${bill.iconBg} ${bill.iconColor}`}>{bill.icon}</div>
                                <div className="bill-info">
                                  <h5>{bill.title}</h5>
                                  <p>
                                    {bill.date} • Dibayar oleh {bill.paidBy}
                                  </p>
                                </div>
                                <div className="bill-amounts">
                                  <h5 className="text-dark">{formatRupiah(bill.total)}</h5>
                                  <p className="text-purple">{formatRupiah(bill.perPerson)} / orang</p>
                                </div>
                              </div>
                            ))}
                            {billsData.length === 0 && (
                              <div className="empty-bills">
                                <FaWallet />
                                <p>Belum ada tagihan. Klik "Tambah Tagihan Baru" untuk mulai.</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Sidebar */}
                      <div className="splitbill-sidebar">
                        <div className="payment-status-card">
                          <div className="ps-header">
                            <h3>Status Pembayaran</h3>
                            <span className="ps-badge">{membersData.length} Anggota</span>
                          </div>
                          <div className="ps-member-list">
                            {membersData.map((member) => (
                              <div className="ps-member-item" key={member.id}>
                                <div className="ps-member-left">
                                  <img src={member.avatar} alt={member.name} />
                                  <div>
                                    <h5 className="text-dark">{member.name}</h5>
                                    <p className="text-gray">{member.role.split(" / ")[1] || member.role}</p>
                                  </div>
                                </div>
                                <div className={`ps-status-badge ${member.status === "Lunas" ? "badge-lunas" : "badge-belum"}`}>
                                  {member.status === "Lunas" ? <FaCheckCircle /> : <FaExclamationCircle />} {member.status || "Belum Bayar"}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="splitbill-tips-card">
                          <h4>Tips Patungan</h4>
                          <p>Pegi secara otomatis menghitung pembagian untuk bus, kereta api, dan tiket wisata secara merata agar tidak ada selisih perhitungan di akhir perjalanan.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />

      {/* ======= POPUP: TAMBAH TAGIHAN ======= */}
      {showAddBill && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowAddBill(false);
          }}
        >
          <div className="modal-container">
            {/* Modal Header */}
            <div className="modal-header">
              <div className="modal-header-icon">
                <FaPlus />
              </div>
              <div>
                <h2>Tambah Tagihan Baru</h2>
                <p>Masukkan detail pengeluaran grup</p>
              </div>
              <button className="modal-close-btn" onClick={() => setShowAddBill(false)} aria-label="Tutup">
                <FaTimes />
              </button>
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              {/* Judul Tagihan */}
              <div className="form-group">
                <label className="form-label">
                  Judul Tagihan <span className="required">*</span>
                </label>
                <input className="form-input" type="text" name="title" value={billForm.title} onChange={handleBillFormChange} placeholder="cth. Tiket Kereta Argo Anggrek" />
              </div>

              {/* Kategori */}
              <div className="form-group">
                <label className="form-label">
                  Kategori <span className="required">*</span>
                </label>
                <div className="category-grid">
                  {BILL_CATEGORIES.map((cat) => (
                    <button key={cat.value} type="button" className={`category-option ${billForm.category === cat.value ? "selected" : ""}`} onClick={() => setBillForm((p) => ({ ...p, category: cat.value }))}>
                      <span className="cat-opt-icon">{cat.icon}</span>
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Row: Jumlah + Tanggal */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    Total Biaya (Rp) <span className="required">*</span>
                  </label>
                  <input className="form-input" type="number" name="totalAmount" value={billForm.totalAmount} onChange={handleBillFormChange} placeholder="cth. 1600000" min="0" />
                  {billForm.totalAmount && membersData.length > 0 && (
                    <span className="form-hint">
                      = {formatRupiah(Math.round(parseFloat(billForm.totalAmount) / membersData.length))} / orang ({membersData.length} anggota)
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Tanggal <span className="required">*</span>
                  </label>
                  <input className="form-input" type="date" name="date" value={billForm.date} onChange={handleBillFormChange} />
                </div>
              </div>

              {/* Dibayar oleh */}
              <div className="form-group">
                <label className="form-label">
                  Dibayar oleh <span className="required">*</span>
                </label>
                <select className="form-input form-select" name="paidBy" value={billForm.paidBy} onChange={handleBillFormChange}>
                  <option value="">-- Pilih Anggota --</option>
                  {membersData.map((m) => (
                    <option key={m.id} value={m.name}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Catatan */}
              <div className="form-group">
                <label className="form-label">
                  Catatan <span className="optional">(opsional)</span>
                </label>
                <textarea className="form-input form-textarea" name="notes" value={billForm.notes} onChange={handleBillFormChange} placeholder="Tambahkan keterangan jika diperlukan..." rows={3} />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              <button className="btn-modal-cancel" onClick={() => setShowAddBill(false)} disabled={billSubmitting}>
                Batal
              </button>
              <button className="btn-modal-submit" onClick={handleAddBillSubmit} disabled={billSubmitting || !billForm.title || !billForm.totalAmount || !billForm.paidBy || !billForm.date}>
                {billSubmitting ? (
                  <>
                    <span className="btn-spinner" /> Menyimpan...
                  </>
                ) : (
                  <>
                    <FaPlus /> Simpan Tagihan
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GroupChat;
