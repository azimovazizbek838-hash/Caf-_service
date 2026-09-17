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
      const res = await fetch(`/api/search?query=${encodeURIComponent(searchTerm)}&region=${encodeURIComponent(selectedRegion)}`);
      const data = await res.json();

      if (searchTerm && selectedRegion) {
        setInputDisplay(`${searchTerm.toUpperCase()} (${selectedRegion})`);
      } else if (searchTerm) {
        setInputDisplay(searchTerm.toUpperCase());
      }

      if (onSearchResult) onSearchResult(data);
    } catch (err) {
      console.error("Xatolik:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', padding: '15px', color: '#fff' }}>
      
      {/* 1. Kafe nomi inputi (Sening quti dizayningga mos) */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', fontSize: '13px', color: '#aaa', marginBottom: '6px' }}>
          Restoran / kafe nomi
        </label>
        <input
          type="text"
          placeholder="Kafe / restoran nomini yozing..."
          value={inputDisplay || searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setInputDisplay('');
          }}
          style={{
            width: '100%',
            padding: '14px',
            fontSize: '15px',
            backgroundColor: '#2a2421',
            border: '1px solid #443a35',
            borderRadius: '10px',
            color: '#fff',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* 2. Viloyatlarni tanlash ro'yxati */}
      <div style={{ marginBottom: '15px', backgroundColor: '#2a2421', padding: '12px', borderRadius: '10px', border: '1px solid #443a35' }}>
        <label style={{ display: 'block', fontSize: '13px', color: '#aaa', marginBottom: '8px' }}>
          Viloyat / Shaharni tanlang:
        </label>
        <div style={{ maxHeight: '140px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {REGIONS.map((region, idx) => (
            <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#ddd' }}>
              <input
                type="radio"
                name="region_select"
                value={region}
                checked={selectedRegion === region}
                onChange={(e) => setSelectedRegion(e.target.value)}
                style={{ accentColor: '#d97706' }}
              />
              <span>{idx + 1}. {region}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 3. Sariq / Toq sariq OK Tugmasi */}
      <button
        onClick={handleSearch}
        disabled={loading}
        style={{
          width: '100%',
          padding: '14px',
          backgroundColor: '#d97706', // Saytingdagi tugma rangiga mos
          color: '#ffffff',
          fontSize: '16px',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer'
        }}
      >
        {loading ? 'Qidirilmoqda...' : '----------- OK -----------'}
      </button>

    </div>
  );
}
