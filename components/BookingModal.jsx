import React, { useState } from 'react';

export default function BookingModal({ selectedCafe, onClose }) {
  const [yourName, setYourName] = useState('');
  const [phone, setPhone] = useState('+998 ');

  const handleBooking = async () => {
    if (!yourName || !phone) {
      alert("Ismingiz va telefon raqamingizni kiriting!");
      return;
    }

    const res = await fetch('/api/send-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cafeId: selectedCafe.id,
        cafeName: selectedCafe.name,
        cafeEmail: selectedCafe.email,
        yourName,
        phone,
        city: selectedCafe.city
      })
    });

    if (res.ok) {
      alert("Bron so'rovingiz muvaffaqiyatli yuborildi!");
      onClose();
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 1000, color: '#fff'
    }}>
      <div style={{
        backgroundColor: '#1e1815', padding: '24px', borderRadius: '12px',
        width: '100%', maxWidth: '400px', border: '1px solid #3d322c'
      }}>
        <h3 style={{ marginTop: 0, color: '#FFC107' }}>
          Joy Band Qilish: {selectedCafe ? selectedCafe.name : 'Tanlangan Kafe'}
        </h3>
        <p style={{ fontSize: '13px', color: '#aaa' }}>
          Joylashuvi: {selectedCafe ? selectedCafe.city : 'Viloyat tanlanmagan'}
        </p>

        <div style={{ marginBottom: '12px' }}>
          <label style={{ fontSize: '12px' }}>Ismingiz:</label>
          <input
            type="text"
            value={yourName}
            onChange={(e) => setYourName(e.target.value)}
            style={{
              width: '100%', padding: '10px', marginTop: '4px',
              backgroundColor: '#2a2421', border: '1px solid #443a35',
              borderRadius: '6px', color: '#fff', boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '18px' }}>
          <label style={{ fontSize: '12px' }}>Telefon raqamingiz:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{
              width: '100%', padding: '10px', marginTop: '4px',
              backgroundColor: '#2a2421', border: '1px solid #443a35',
              borderRadius: '6px', color: '#fff', boxSizing: 'border-box'
            }}
          />
        </div>

        <button
          onClick={handleBooking}
          style={{
            width: '100%', padding: '12px', backgroundColor: '#FFC107',
            color: '#000', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer'
          }}
        >
          Bron qilishni tasdiqlash
        </button>

        <button
          onClick={onClose}
          style={{
            marginTop: '10px', width: '100%', padding: '8px',
            backgroundColor: 'transparent', border: 'none', color: '#aaa', cursor: 'pointer'
          }}
        >
          Bekor qilish
        </button>
      </div>
    </div>
  );
}
