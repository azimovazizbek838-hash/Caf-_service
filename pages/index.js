import React, { useState } from 'react';
import SearchSection from '../components/SearchSection';
import BookingModal from '../components/BookingModal';
import SubscribeModal from '../components/SubscribeModal';

export default function Home() {
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [showSubscribe, setShowSubscribe] = useState(false);

  return (
    <div style={{ backgroundColor: '#0d0d0d', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif' }}>
      
      {/* Header / Topbar */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', borderBottom: '1px solid #222' }}>
        <h1 style={{ color: '#FFC107', fontSize: '24px', margin: 0 }}>Mehmon•AI</h1>
        
        <button 
          onClick={() => setShowSubscribe(true)}
          style={{ backgroundColor: '#FFC107', color: '#000', padding: '10px 20px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          $35 Obuna bo'lish (B2B)
        </button>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '36px', marginBottom: '10px' }}>O'zbekistondagi Eng Zo'r Restoran va Kafelarni Toping</h2>
          <p style={{ color: '#aaa' }}>Stollarni onlayn va 10 soniyada bron qiling</p>
        </div>

        {/* 1. POISK VA FILTER QISMI */}
        <SearchSection onSelectCafe={(cafe) => setSelectedCafe(cafe)} />

      </main>

      {/* 2. BRON QILISH MODAL OYNASI */}
      {selectedCafe && (
        <BookingModal 
          selectedCafe={selectedCafe} 
          onClose={() => setSelectedCafe(null)} 
        />
      )}

      {/* 3. $35 B2B OBUNA MODAL OYNASI */}
      {showSubscribe && (
        <SubscribeModal 
          onClose={() => setShowSubscribe(false)} 
        />
      )}

    </div>
  );
}
