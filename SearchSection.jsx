import React, { useState } from 'react';

const REGIONS = [
  "Toshkent shahri", "Toshkent viloyati", "Xorazm", "Samarqand", 
  "Farg'ona", "Andijon", "Namangan", "Buxoro", 
  "Navoiy", "Qashqadaryo", "Surxondaryo", "Sirdaryo", "Jizzax", "Qoraqalpog'iston"
];

export default function SearchSection({ onSearchResult }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [inputDisplay, setInputDisplay] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      // Backend API (api/search.js) ga so'rov
      const res = await fetch(`/api/search?query=${encodeURIComponent(searchTerm)}&region=${encodeURIComponent(selectedRegion)}`);
      const data = await res.json();

      // Poisk qutisida "XORAZM BESHBARMOQ (Xorazm)" formatida ko'rsatish
      if (searchTerm && selectedRegion) {
        setInputDisplay(`${searchTerm.toUpperCase()} (${selectedRegion})`);
      } else if (searchTerm) {
        setInputDisplay(searchTerm.toUpperCase());
      } else if (selectedRegion) {
        setInputDisplay(`ALL (${selectedRegion})`);
      }

      if (onSearchResult) {
        onSearchResult(data);
      }
    } catch (err) {
      console.error("Qidiruvda xatolik:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', padding: '16px', fontFamily: 'sans-serif' }}>
      
      {/* 1. Kafe/Restoran nomi inputi */}
      <div style={{ marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="(Bu yerga kafe yoki restoran nomini yozing)"
          value={inputDisplay || searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setInputDisplay(''); // Qaytadan yozishni boshlasa format tozalanadi
          }}
          style={{
            width: '100%',
            padding: '12px 14px',
            fontSize: '15px',
            border: '2px solid #333',
            borderRadius: '8px',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* 2. 12+ Viloyat tanlash bo'limi */}
      <div style={{ marginBottom: '16px', border: '1px solid #e0e0e0', padding: '12px', borderRadius: '8px' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '10px', fontSize: '14px' }}>
          Viloyat/Shahar ni tanlang:
        </label>
        
        <div style={{ maxHeight: '180px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {REGIONS.map((region, idx) => (
            <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}>
              <input
                type="radio"
                name="region_select"
                value={region}
                checked={selectedRegion === region}
                onChange={(e) => setSelectedRegion(e.target.value)}
              />
              <span>{idx + 1}. {region}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 3. Sariq rangli OK tugmasi */}
      <button
        onClick={handleSearch}
        disabled={loading}
        style={{
          width: '100%',
          padding: '14px',
          backgroundColor: '#FFC107', // Aniq sariq rang
          color: '#000000',
          fontSize: '16px',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        {loading ? 'Qidirilmoqda...' : '[------------ OK ------------]'}
      </button>

    </div>
  );
}
