import React from 'react';

export default function Footer() {
  return (
    <footer style={{ 
      textAlign: 'center', 
      padding: '40px 20px', 
      backgroundColor: '#0d1117', 
      borderTop: '1px solid #30363d', 
      color: '#ffffff', 
      fontSize: '14px',
      marginTop: '50px'
    }}>
      <div style={{ marginBottom: '15px' }}>
        <a href="/oferta" style={{ color: '#38BDF8', margin: '0 15px', textDecoration: 'underline', fontWeight: 'bold' }}>
          Ommaviy oferta
        </a>
        |
        <a href="/privacy" style={{ color: '#38BDF8', margin: '0 15px', textDecoration: 'underline', fontWeight: 'bold' }}>
          Maxfiylik siyosati
        </a>
      </div>

      <div style={{ marginBottom: '10px', color: '#e6edf3' }}>
        YTT "Otangizning F.I.SH" | STIR: XXXXXXXXX | Tel: +998 (XX) XXX-XX-XX
      </div>

      <div style={{ color: '#8b949e', fontSize: '12px' }}>
        © 2026 MEHMON.AI — O'zbekiston HoReCa Innovatsiya Tizimi. Barcha huquqlar himoyalangan.
      </div>
    </footer>
  );
}
