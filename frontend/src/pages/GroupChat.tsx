import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaEllipsisV, FaCarSide, FaStar, FaImage, FaPaperPlane } from "react-icons/fa";
import NavbarGuest from "../components/NavbarGuest"; 
import "./GroupChat.css";
import TravelerSidebar from "../components/TravelerSidebar";

// Interface untuk struktur data pesan
interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  type: "text" | "card" | "image";
  content: string;
  time: string;
  cardData?: {
    title: string;
    price: string;
    rating: number;
    img: string;
  };
}

const GroupChat: React.FC = () => {
  const [activeTab, setActiveTab] = useState("obrolan");
  const [inputText, setInputText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
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
  ]);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e?: React.FormEvent) => {
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

    setMessages([...messages, newMessage]);
    setInputText("");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file); 

      const imageMessage: Message = {
        id: Date.now().toString(),
        senderId: "me",
        senderName: "Anda",
        type: "image",
        content: imageUrl,
        time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages([...messages, imageMessage]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="traveler-page">
      <NavbarGuest />

      <div className="traveler-layout">
      <TravelerSidebar activeMenu="grup" />

        {/* AREA CHAT UTAMA */}
        <main className="chat-main">
          {/* 1. CHAT HEADER */}
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar-wrapper">
                <FaCarSide className="chat-group-icon" />
              </div>
              <div>
                <h2>Liburan Seru ke Bali</h2>
                <span className="badge-active-now">
                  <span className="dot-blink"></span> Aktif Sekarang
                </span>
              </div>
            </div>
            <div className="chat-header-actions">
              <button className="btn-icon-transparent">
                <FaSearch />
              </button>
              <button className="btn-icon-transparent">
                <FaEllipsisV />
              </button>
            </div>
          </div>

          {/* 2. TAB NAVIGASI */}
          <div className="chat-tabs">
            <button className={`tab-btn ${activeTab === "obrolan" ? "active" : ""}`} onClick={() => setActiveTab("obrolan")}>
              Obrolan
            </button>
            <button className={`tab-btn ${activeTab === "itinerary" ? "active" : ""}`} onClick={() => setActiveTab("itinerary")}>
              Itinerary & Anggota
            </button>
            <button className={`tab-btn ${activeTab === "splitbill" ? "active" : ""}`} onClick={() => setActiveTab("splitbill")}>
              Split Bill
            </button>
          </div>

          {/* 3. BODY CHAT */}
          <div className="chat-body" ref={chatBodyRef}>
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
                            <span className="rating"><FaStar className="text-yellow" /> {msg.cardData.rating}</span>
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

          <div className="chat-footer">
            {/* Input File Tersembunyi */}
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
        </main>
      </div>
    </div>
  );
};

export default GroupChat;