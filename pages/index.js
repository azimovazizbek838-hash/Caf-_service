import React, { useState } from 'react';
import SearchSection from '../components/SearchSection';
import BookingModal from '../components/BookingModal';
import SubscribeModal from '../components/SubscribeModal';

export default function Home() {
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [showSubscribe, setShowSubscribe] = useState(false);

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Top Navigation */}
      <header style={{ 
        display: 'flex', 
        justify: 'space-between', 
        alignItems: 'center', 
        padding: '16px 24px', 
        backgroundColor: '#121212',
        borderBottom: '1px solid #222',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ fontWeight: '800', fontSize: '20px', color: '#FFC107', letterSpacing: '-0.5px' }}>
          Mehmon•AI
        </div>
        
        <button 
          onClick={() => setShowSubscribe(true)}
          style={{ 
            backgroundColor: '#FFC107', 
            color: '#000', 
            padding: '10px 18px', 
            border: 'none', 
            borderRadius: '10px', 
            fontWeight: '700', 
            fontSize: '14px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(255, 193, 7, 0.2)'
          }}
        >
          450.000UZS Obuna bo'lish
        </button>
      </header>

      {/* Main App Container */}
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '24px 16px' }}>
        
        {/* Clean Search & Filtering */}
        <SearchSection onSelectCafe={(cafe) => setSelectedCafe(cafe)} />

      </main>

      {/* Booking Modal */}
      {selectedCafe && (
        <BookingModal 
          selectedCafe={selectedCafe} 
          onClose={() => setSelectedCafe(null)} 
        />
      )}

      {/* B2B Subscription Modal */}
      {showSubscribe && (
        <SubscribeModal 
          onClose={() => setShowSubscribe(false)} 
        />
      )}

    </div>
  );
}
import React, { useState } from 'react';
import SearchSection from '../components/SearchSection';
import BookingModal from '../components/BookingModal';
import SubscribeModal from '../components/SubscribeModal';

export default function Home() {
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [showSubscribe, setShowSubscribe] = useState(false);

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Top Navigation */}
      <header style={{ 
        display: 'flex', 
        justify: 'space-between', 
        alignItems: 'center', 
        padding: '16px 24px', 
        backgroundColor: '#121212',
        borderBottom: '1px solid #222',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ fontWeight: '800', fontSize: '20px', color: '#FFC107', letterSpacing: '-0.5px' }}>
          Mehmon•AI
            <footer style={{ textAlign: 'center', padding: '30px 20px', backgroundColor: '#0b0f19', borderTop: '1px solid #1e293b', color: '#888', fontSize: '13px' }}>
  <div style={{ marginBottom: '15px' }}>
    <a href="/oferta" style={{ color: '#aaa', margin: '0 12px', textDecoration: 'none' }}>Ommaviy oferta</a>
    |
    <a href="/privacy" style={{ color: '#aaa', margin: '0 12px', textDecoration: 'none' }}>Maxfiylik siyosati</a>
  </div>

  <div style={{ marginBottom: '10px', color: '#666' }}>
    YTT "Otangizning F.I.SH" | STIR: XXXXXXXXX | Tel: +998 (XX) XXX-XX-XX
  </div>

  <div>
    © 2026 MEHMON.AI — O'zbekiston HoReCa Innovatsiya Tizimi. Barcha huquqlar himoyalangan.
  </div>
</footer>
        </div>
        
        <button 
          onClick={() => setShowSubscribe(true)}
          style={{ 
            backgroundColor: '#FFC107', 
            color: '#000', 
            padding: '10px 18px', 
            border: 'none', 
            borderRadius: '10px', 
            fontWeight: '700', 
            fontSize: '14px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(255, 193, 7, 0.2)'
          }}
        >
          450.000UZS Obuna bo'lish
        </button>
      </header>

      {/* Main App Container */}
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '24px 16px' }}>
        
        {/* Clean Search & Filtering */}
        <SearchSection onSelectCafe={(cafe) => setSelectedCafe(cafe)} />

      </main>

      {/* Booking Modal */}
      {selectedCafe && (
        <BookingModal 
          selectedCafe={selectedCafe} 
          onClose={() => setSelectedCafe(null)} 
        />
      )}

      {/* B2B Subscription Modal */}
      {showSubscribe && (
        <SubscribeModal 
          onClose={() => setShowSubscribe(false)} 
        />
      )}

    </div>
  );
}
