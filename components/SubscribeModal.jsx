import React, { useState } from 'react';

const REGIONS = [
  "Toshkent shahri", "Toshkent viloyati", "Xorazm", "Samarqand", 
  "Farg'ona", "Andijon", "Namangan", "Buxoro", 
  "Navoiy", "Qashqadaryo", "Surxondaryo", "Sirdaryo", "Jizzax", "Qoraqalpog'iston"
];

export default function SubscribeModal({ onClose }) {
  const [step, setStep] = useState(1); // 1: Ma'lumotlar, 2: To'lov
  const [cafeName, setCafeName] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [image, setImage] = useState(null);
  const [phoneNumbers, setPhoneNumbers] = useState(['+998 ']);
  const [cardNumber, setCardNumber] = useState('');

  // Admin raqami qo'shish
  const handleAddPhone = () => {
    setPhoneNumbers([...phoneNumbers, '+998 ']);
  };

  const handlePhoneChange = (index, value) => {
    const updated = [...phoneNumbers];
    updated[index] = value;
    setPhoneNumbers(updated);
  };

  const handleFirstStepSubmit = (e) => {
    e.preventDefault();
    if (!cafeName || !selectedRegion) {
      alert("Iltimos, kafe nomi va viloyatni tanlang!");
      return;
    }
    setStep(2); // Karta kiritish bosqichiga o'tish
  };

  const handleFinalPayment = async () => {
    if (!cardNumber) {
      alert("Karta raqamini kiriting!");
      return;
    }
    
    // Serverga yuborish logikasi
    alert("Obuna muvaffaqiyatli tasdiqlandi!");
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 1000, color: '#fff'
    }}>
      <div style={{
        backgroundColor: '#1e1815', padding: '24px', borderRadius: '12px',
        width: '100%', maxWidth: '440px', border: '1px solid #3d322c'
      }}>
        
        {step === 1 ? (
          <div>
            <h3 style={{ marginTop: 0, marginBottom: '16px', color: '#FFC107' }}>
              Subscribe for $35 per month
            </h3>

            {/* Kafe nomi */}
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '12px', color: '#ccc' }}>Bu yerga kafe yoki restoran nomini kiriting:</label>
              <input
                type="text"
                placeholder="Masalan, Xorazm Beshbarmoq"
                value={cafeName}
                onChange={(e) => setCafeName(e.target.value)}
                style={{
                  width: '100%', padding: '12px', marginTop: '4px',
                  backgroundColor: '#2a2421', border: '1px solid #443a35',
                  borderRadius: '8px', color: '#fff', boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Viloyat tanlash */}
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '12px', color: '#ccc' }}>Viloyatni yoki shaharni tanlang:</label>
              <div style={{
                maxHeight: '110px', overflowY: 'auto', display: 'flex',
                flexWrap: 'wrap', gap: '6px', marginTop: '6px'
              }}>
                {REGIONS.map((region, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedRegion(region)}
                    style={{
                      padding: '6px 10px', fontSize: '12px', borderRadius: '6px',
                      border: 'none', cursor: 'pointer',
                      backgroundColor: selectedRegion === region ? '#FFC107' : '#332a25',
                      color: selectedRegion === region ? '#000' : '#fff'
                    }}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>

            {/* Rasm joylash */}
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '12px', color: '#ccc' }}>Kafe/Restoraningiz oldidan tushirilgan rasm:</label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                style={{ marginTop: '4px', fontSize: '12px' }}
              />
            </div>

            {/* Adminlar raqamlari (Bir nechta admin qo'shish) */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{ fontSize: '12px', color: '#ccc' }}>Adminlaringiz raqamlarini qo'shing:</label>
              {phoneNumbers.map((phone, idx) => (
                <input
                  key={idx}
                  type="text"
                  value={phone}
                  onChange={(e) => handlePhoneChange(idx, e.target.value)}
                  style={{
                    width: '100%', padding: '10px', marginTop: '6px',
                    backgroundColor: '#2a2421', border: '1px solid #443a35',
                    borderRadius: '8px', color: '#fff', boxSizing: 'border-box'
                  }}
                />
              ))}
              <button
                type="button"
                onClick={handleAddPhone}
                style={{
                  marginTop: '8px', backgroundColor: 'transparent', color: '#FFC107',
                  border: '1px dashed #FFC107', padding: '6px 12px', borderRadius: '6px',
                  cursor: 'pointer', fontSize: '12px'
                }}
              >
                + Raqam qo'shish
              </button>
            </div>

            {/* Obunani tasdiqlash */}
            <button
              onClick={handleFirstStepSubmit}
              style={{
                width: '100%', padding: '14px', backgroundColor: '#FFC107',
                color: '#000', border: 'none', borderRadius: '8px',
                fontWeight: 'bold', fontSize: '15px', cursor: 'pointer'
              }}
            >
              [----- Obunani tasdiqlang -----]
            </button>
          </div>
        ) : (
          /* Step 2: Karta raqam kiritish */
          <div>
            <h3 style={{ marginTop: 0, color: '#FFC107' }}>To'lov bosqichi</h3>
            <p style={{ fontSize: '13px', color: '#ccc' }}>Oylik obuna: <b>$35 / oy</b></p>
            
            <div style={{ margin: '20px 0' }}>
              <label style={{ fontSize: '12px', color: '#ccc' }}>Shaxsiy karta raqamingizni kiriting:</label>
              <input
                type="text"
                placeholder="8600 ____ ____ ____"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                style={{
                  width: '100%', padding: '14px', marginTop: '6px',
                  backgroundColor: '#2a2421', border: '1px solid #443a35',
                  borderRadius: '8px', color: '#fff', fontSize: '16px', boxSizing: 'border-box'
                }}
              />
            </div>

            <button
              onClick={handleFinalPayment}
              style={{
                width: '100%', padding: '14px', backgroundColor: '#4CAF50',
                color: '#fff', border: 'none', borderRadius: '8px',
                fontWeight: 'bold', fontSize: '16px', cursor: 'pointer'
              }}
            >
              [------ Tasdiqlash ------]
            </button>
          </div>
        )}

        <button
          onClick={onClose}
          style={{
            marginTop: '12px', width: '100%', padding: '8px',
            backgroundColor: 'transparent', border: 'none', color: '#aaa', cursor: 'pointer'
          }}
        >
          Yopish
        </button>
      </div>
    </div>
  );
}
