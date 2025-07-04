import React, { useState } from 'react';

const sektorler = [
  'Diş', 'Mobilya', 'İnşaat', 'Hukuk', 'Gıda', 'Kozmetik', 'Tekstil', 'Sağlık', 'Otomotiv', 'Eğitim', 'Diğer'
];

// Sektöre göre önerilen ürün/hizmet örnekleri
const sektorOnemliAlanlar = {
  'Diş': {
    urunler: ['Protez diş', 'Porselen diş', 'Ortodonti aparatı'],
    hizmetler: ['Dolgu', 'İmplant', 'Kanal tedavisi', 'Diş çekimi', 'Diş beyazlatma']
  },
  'Mobilya': {
    urunler: ['Masa', 'Sandalye', 'Gardırop', 'Yatak', 'TV Ünitesi'],
    hizmetler: ['Özel ölçü üretim', 'Montaj', '3D tasarım']
  },
  'İnşaat': {
    urunler: ['Kaba inşaat', 'Anahtar teslim', 'Cephe kaplama'],
    hizmetler: ['Proje yönetimi', 'Müteahhitlik', 'Danışmanlık']
  },
  'Hukuk': {
    urunler: [],
    hizmetler: ['Dava danışmanlığı', 'Sözleşme hazırlama', 'İcra takibi']
  },
  'Gıda': {
    urunler: ['Bakliyat', 'Unlu mamul', 'Hazır yemek'],
    hizmetler: ['Toplu yemek', 'Catering', 'Restoran']
  },
  'Kozmetik': {
    urunler: ['Krem', 'Şampuan', 'Sabun'],
    hizmetler: ['Cilt bakımı', 'Danışmanlık']
  },
  'Tekstil': {
    urunler: ['Tişört', 'Gömlek', 'Pantolon'],
    hizmetler: ['Özel dikim', 'Toptan satış']
  },
  'Sağlık': {
    urunler: ['Medikal cihaz', 'Tıbbi malzeme'],
    hizmetler: ['Laboratuvar', 'Evde bakım', 'Poliklinik']
  },
  'Otomotiv': {
    urunler: ['Araç', 'Yedek parça'],
    hizmetler: ['Servis', 'Bakım-onarım', 'Araç kiralama']
  },
  'Eğitim': {
    urunler: [],
    hizmetler: ['Kurs', 'Özel ders', 'Kurumsal eğitim']
  },
  'Diğer': { urunler: [], hizmetler: [] }
};

function TagInput({ value, onChange, placeholder, suggestions = [] }) {
  const [input, setInput] = useState('');
  const [showSug, setShowSug] = useState(false);

  const addTag = tag => {
    if (tag && !value.includes(tag)) {
      onChange([...value, tag]);
    }
    setInput('');
    setShowSug(false);
  };

  const removeTag = tag => {
    onChange(value.filter(t => t !== tag));
  };

  const onInputKeyDown = e => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(input.trim());
    }
    if (e.key === 'Backspace' && !input && value.length)
      removeTag(value[value.length - 1]);
  };

  const filteredSuggestions = suggestions.filter(sug =>
    sug.toLowerCase().includes(input.toLowerCase()) && !value.includes(sug)
  ).slice(0, 5);

  return (
    <div className="aysiad-tag-input-group">
      <div className="aysiad-tag-list">
        {value.map(tag => (
          <span className="aysiad-tag" key={tag}>
            <span className="aysiad-tag-text">{tag}</span>
            <button type="button" className="aysiad-tag-remove" onClick={() => removeTag(tag)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </span>
        ))}
        <input
          className="aysiad-tag-input"
          value={input}
          onChange={e => { setInput(e.target.value); setShowSug(true); }}
          onKeyDown={onInputKeyDown}
          onBlur={() => setTimeout(() => setShowSug(false), 200)}
          onFocus={() => setShowSug(true)}
          placeholder={value.length === 0 ? placeholder : ''}
        />
      </div>
      {showSug && filteredSuggestions.length > 0 && (
        <ul className="aysiad-tag-suggestions">
          {filteredSuggestions.map(sug => (
            <li key={sug} onMouseDown={() => addTag(sug)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
              {sug}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// CSS stillerini ekle
const styles = `
  /* AYSİAD Form Styles */
  .aysiad-form-container {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    min-height: 100vh;
    padding: 1rem;
  }

  .aysiad-form-wrapper {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    border-radius: 20px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    overflow: hidden;
    position: relative;
  }

  .aysiad-form-wrapper::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, #004aad 0%, #0066cc 50%, #3399ff 100%);
  }

  .aysiad-form-header {
    background: linear-gradient(135deg, #004aad 0%, #0066cc 100%);
    color: white;
    padding: 2rem;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .aysiad-form-header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    opacity: 0.3;
  }

  .aysiad-form-header-content {
    position: relative;
    z-index: 1;
  }

  .aysiad-form-title {
    font-size: 2rem;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  .aysiad-form-subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
    margin: 0;
    font-weight: 300;
  }

  .aysiad-form-body {
    padding: 2rem;
  }

  .aysiad-form-section {
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: #f8fafc;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;
  }

  .aysiad-form-section:hover {
    box-shadow: 0 4px 12px rgba(0, 74, 173, 0.1);
    border-color: #cbd5e1;
  }

  .aysiad-form-section-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: #1e293b;
    margin: 0 0 1rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .aysiad-form-grid {
    display: grid;
    gap: 1rem;
  }

  .aysiad-form-grid-2 {
    grid-template-columns: 1fr 1fr;
  }

  .aysiad-form-field {
    margin-bottom: 1rem;
  }

  .aysiad-form-label {
    display: block;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
  }

  .aysiad-form-label-required::after {
    content: ' *';
    color: #ef4444;
  }

  .aysiad-input {
    width: 100%;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    padding: 0.875rem 1rem;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .aysiad-input:focus {
    outline: none;
    border-color: #004aad;
    box-shadow: 0 0 0 3px rgba(0, 74, 173, 0.1);
    background: #fafcff;
  }

  .aysiad-input:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
    opacity: 0.7;
  }

  .aysiad-select {
    width: 100%;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    padding: 0.875rem 1rem;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  .aysiad-select:focus {
    outline: none;
    border-color: #004aad;
    box-shadow: 0 0 0 3px rgba(0, 74, 173, 0.1);
  }

  .aysiad-textarea {
    width: 100%;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    padding: 0.875rem 1rem;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    min-height: 120px;
    resize: vertical;
    font-family: inherit;
  }

  .aysiad-textarea:focus {
    outline: none;
    border-color: #004aad;
    box-shadow: 0 0 0 3px rgba(0, 74, 173, 0.1);
    background: #fafcff;
  }

  .aysiad-array-field {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    margin-bottom: 0.75rem;
  }

  .aysiad-array-input {
    flex: 1;
  }

  .aysiad-btn {
    border: none;
    border-radius: 8px;
    padding: 0.5rem 0.75rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 40px;
    height: 40px;
  }

  .aysiad-btn-add {
    background: #10b981;
    color: white;
    box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);
  }

  .aysiad-btn-add:hover {
    background: #059669;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(16, 185, 129, 0.4);
  }

  .aysiad-btn-remove {
    background: #ef4444;
    color: white;
    box-shadow: 0 2px 4px rgba(239, 68, 68, 0.3);
  }

  .aysiad-btn-remove:hover {
    background: #dc2626;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(239, 68, 68, 0.4);
  }

  .aysiad-btn-submit {
    width: 100%;
    background: linear-gradient(135deg, #004aad 0%, #0066cc 100%);
    color: white;
    border: none;
    border-radius: 12px;
    padding: 1rem 2rem;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 74, 173, 0.3);
    margin-top: 1rem;
  }

  .aysiad-btn-submit:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 74, 173, 0.4);
  }

  .aysiad-btn-submit:disabled {
    background: #9ca3af;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  /* Tag Input Styles */
  .aysiad-tag-input-group {
    position: relative;
  }

  .aysiad-tag-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    min-height: 52px;
    background: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  .aysiad-tag-list:focus-within {
    border-color: #004aad;
    box-shadow: 0 0 0 3px rgba(0, 74, 173, 0.1);
  }

  .aysiad-tag {
    display: inline-flex;
    align-items: center;
    background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
    color: #3730a3;
    border-radius: 20px;
    padding: 0.375rem 0.75rem;
    font-weight: 500;
    font-size: 0.875rem;
    gap: 0.375rem;
    border: 1px solid #c7d2fe;
    transition: all 0.3s ease;
    animation: tagSlideIn 0.3s ease-out;
  }

  @keyframes tagSlideIn {
    from {
      opacity: 0;
      transform: scale(0.8) translateY(-10px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  .aysiad-tag:hover {
    background: linear-gradient(135deg, #c7d2fe 0%, #a5b4fc 100%);
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(55, 48, 163, 0.2);
  }

  .aysiad-tag-text {
    line-height: 1;
  }

  .aysiad-tag-remove {
    border: none;
    background: none;
    cursor: pointer;
    color: #6b7280;
    padding: 0;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.2s ease;
  }

  .aysiad-tag-remove:hover {
    background: #ef4444;
    color: white;
    transform: scale(1.1);
  }

  .aysiad-tag-input {
    border: none;
    outline: none;
    min-width: 120px;
    font-size: 1rem;
    background: transparent;
    flex: 1;
    padding: 0.25rem;
  }

  .aysiad-tag-suggestions {
    position: absolute;
    left: 0;
    top: 100%;
    background: white;
    border: 2px solid #e5e7eb;
    z-index: 50;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    max-height: 200px;
    overflow: auto;
    width: 100%;
    margin-top: 0.25rem;
    list-style: none;
    padding: 0;
    margin-left: 0;
  }

  .aysiad-tag-suggestions li {
    padding: 0.75rem 1rem;
    cursor: pointer;
    border-bottom: 1px solid #f3f4f6;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.95rem;
  }

  .aysiad-tag-suggestions li:hover {
    background: #f1f5f9;
    color: #004aad;
  }

  .aysiad-tag-suggestions li:last-child {
    border-bottom: none;
  }

  .aysiad-tag-suggestions li svg {
    color: #10b981;
  }

  /* Success Message */
  .aysiad-success-container {
    max-width: 600px;
    margin: 2rem auto;
    background: white;
    padding: 3rem 2rem;
    border-radius: 20px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    text-align: center;
    border-top: 6px solid #10b981;
  }

  .aysiad-success-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    animation: bounce 1s ease-in-out;
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }

  .aysiad-success-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: #10b981;
    margin-bottom: 1rem;
  }

  .aysiad-success-message {
    font-size: 1.1rem;
    color: #6b7280;
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  .aysiad-btn-new {
    background: linear-gradient(135deg, #004aad 0%, #0066cc 100%);
    color: white;
    border: none;
    border-radius: 12px;
    padding: 0.75rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 74, 173, 0.3);
  }

  .aysiad-btn-new:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 74, 173, 0.4);
  }

  /* Icons */
  .aysiad-icon {
    width: 20px;
    height: 20px;
    color: #004aad;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .aysiad-form-container {
      padding: 0.5rem;
    }

    .aysiad-form-title {
      font-size: 1.5rem;
    }

    .aysiad-form-subtitle {
      font-size: 1rem;
    }

    .aysiad-form-header {
      padding: 1.5rem 1rem;
    }

    .aysiad-form-body {
      padding: 1rem;
    }

    .aysiad-form-section {
      padding: 1rem;
      margin-bottom: 1rem;
    }

    .aysiad-form-grid-2 {
      grid-template-columns: 1fr;
    }

    .aysiad-array-field {
      flex-direction: column;
      align-items: stretch;
      gap: 0.5rem;
    }

    .aysiad-array-field .aysiad-btn {
      align-self: flex-end;
      min-width: auto;
      width: auto;
      padding: 0.5rem 1rem;
    }

    .aysiad-tag-list {
      padding: 0.5rem;
    }

    .aysiad-tag {
      font-size: 0.8rem;
      padding: 0.25rem 0.5rem;
    }

    .aysiad-success-container {
      margin: 1rem auto;
      padding: 2rem 1rem;
    }

    .aysiad-success-icon {
      font-size: 3rem;
    }

    .aysiad-success-title {
      font-size: 1.5rem;
    }

    .aysiad-success-message {
      font-size: 1rem;
    }
  }

  @media (max-width: 480px) {
    .aysiad-form-wrapper {
      border-radius: 0;
      margin: 0;
      min-height: 100vh;
    }

    .aysiad-form-container {
      padding: 0;
    }

    .aysiad-array-field {
      gap: 0.75rem;
    }

    .aysiad-btn {
      min-width: 36px;
      height: 36px;
      font-size: 0.875rem;
    }
  }
`;

// Stilleri head'e ekle
if (typeof document !== 'undefined') {
  const existingStyle = document.getElementById('aysiad-form-styles');
  if (existingStyle) {
    existingStyle.remove();
  }
  
  const styleSheet = document.createElement('style');
  styleSheet.id = 'aysiad-form-styles';
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default function AysiadUyeFormu() {
  const [form, setForm] = useState({
    ad_soyad: '',
    sirket: '',
    sektor: '',
    telefonlar: [''],
    emailler: [''],
    adres: '',
    urunler: [],
    hizmetler: [],
    aciklama: '',
    websiteleri: [''],
    instagramlar: [''],
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const seciliSektor = sektorOnemliAlanlar[form.sektor] || { urunler: [], hizmetler: [] };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (name, idx, value) => {
    setForm(prev => {
      const arr = [...prev[name]];
      arr[idx] = value;
      return { ...prev, [name]: arr };
    });
  };

  const addArrayField = name => {
    setForm(prev => ({ ...prev, [name]: [...prev[name], ''] }));
  };

  const removeArrayField = (name, idx) => {
    setForm(prev => {
      const arr = prev[name].slice();
      arr.splice(idx, 1);
      return { ...prev, [name]: arr.length ? arr : [''] };
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Boş alanları temizle
      const cleanForm = {
        ...form,
        telefonlar: form.telefonlar.filter(t => t.trim()),
        emailler: form.emailler.filter(e => e.trim()),
        websiteleri: form.websiteleri.filter(w => w.trim()),
        instagramlar: form.instagramlar.filter(i => i.trim()),
      };

      const response = await fetch('https://aysiad-chat-backend.onrender.com/api/uye-kayit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanForm),
      });
      
      const result = await response.json();
      
      if (result.ok) {
        setSubmitted(true);
      } else {
        alert('Hata: ' + result.error);
      }
    } catch (error) {
      console.error('Kayıt hatası:', error);
      alert('Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="aysiad-form-container">
        <div className="aysiad-success-container">
          <div className="aysiad-success-icon">🎉</div>
          <h2 className="aysiad-success-title">Kayıt Başarılı!</h2>
          <p className="aysiad-success-message">
            Üye başvurunuz başarıyla alındı. En kısa sürede size geri dönüş yapılacaktır.
          </p>
          <button 
            onClick={() => {
              setSubmitted(false);
              setForm({
                ad_soyad: '',
                sirket: '',
                sektor: '',
                telefonlar: [''],
                emailler: [''],
                adres: '',
                urunler: [],
                hizmetler: [],
                aciklama: '',
                websiteleri: [''],
                instagramlar: [''],
              });
            }}
            className="aysiad-btn-new"
          >
            Yeni Kayıt Yap
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="aysiad-form-container">
      <div className="aysiad-form-wrapper">
        <div className="aysiad-form-header">
          <div className="aysiad-form-header-content">
            <h1 className="aysiad-form-title">AYSİAD Üye Başvuru Formu</h1>
            <p className="aysiad-form-subtitle">Avrasya Yönetici Sanayici ve İş Adamları Derneği</p>
          </div>
        </div>
        
        <div className="aysiad-form-body">
          <form onSubmit={handleSubmit}>
            {/* Kişisel Bilgiler */}
            <div className="aysiad-form-section">
              <h3 className="aysiad-form-section-title">
                <svg className="aysiad-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Kişisel Bilgiler
              </h3>
              <div className="aysiad-form-grid aysiad-form-grid-2">
                <div className="aysiad-form-field">
                  <label className="aysiad-form-label aysiad-form-label-required">Ad Soyad</label>
                  <input 
                    required 
                    name="ad_soyad" 
                    className="aysiad-input" 
                    value={form.ad_soyad} 
                    onChange={handleChange}
                    placeholder="Adınız ve soyadınız"
                  />
                </div>
                <div className="aysiad-form-field">
                  <label className="aysiad-form-label aysiad-form-label-required">Şirket</label>
                  <input 
                    required 
                    name="sirket" 
                    className="aysiad-input" 
                    value={form.sirket} 
                    onChange={handleChange}
                    placeholder="Şirket adınız"
                  />
                </div>
              </div>
              <div className="aysiad-form-field">
                <label className="aysiad-form-label aysiad-form-label-required">Sektör</label>
                <select 
                  required 
                  name="sektor" 
                  className="aysiad-select" 
                  value={form.sektor === 'Diğer' ? 'Diğer' : (sektorler.includes(form.sektor) ? form.sektor : 'Diğer')} 
                  onChange={(e) => {
                    if (e.target.value === 'Diğer') {
                      setForm(prev => ({ ...prev, sektor: '' }));
                    } else {
                      setForm(prev => ({ ...prev, sektor: e.target.value }));
                    }
                  }}
                >
                  <option value="">Sektör seçiniz</option>
                  {sektorler.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                {(form.sektor === '' || !sektorler.includes(form.sektor)) && (
                  <input 
                    required 
                    name="sektor" 
                    className="aysiad-input" 
                    value={form.sektor} 
                    onChange={handleChange}
                    placeholder="Sektörünüzü yazınız"
                    style={{ marginTop: '8px' }}
                  />
                )}
              </div>
            </div>

            {/* İletişim Bilgileri */}
            <div className="aysiad-form-section">
              <h3 className="aysiad-form-section-title">
                <svg className="aysiad-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                İletişim Bilgileri
              </h3>
              
              <div className="aysiad-form-field">
                <label className="aysiad-form-label aysiad-form-label-required">Telefon(lar)</label>
                {form.telefonlar.map((tel, i) => (
                  <div className="aysiad-array-field" key={i}>
                    <input 
                      required={i === 0} 
                      className="aysiad-input aysiad-array-input" 
                      value={tel} 
                      onChange={e => handleArrayChange('telefonlar', i, e.target.value)}
                      placeholder="0532 123 45 67"
                    />
                    <button 
                      type="button" 
                      onClick={() => addArrayField('telefonlar')}
                      className="aysiad-btn aysiad-btn-add"
                      title="Telefon ekle"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </button>
                    {form.telefonlar.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => removeArrayField('telefonlar', i)}
                        className="aysiad-btn aysiad-btn-remove"
                        title="Telefon sil"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="aysiad-form-field">
                <label className="aysiad-form-label aysiad-form-label-required">E-mail(ler)</label>
                {form.emailler.map((mail, i) => (
                  <div className="aysiad-array-field" key={i}>
                    <input 
                      required={i === 0} 
                      type="email" 
                      className="aysiad-input aysiad-array-input" 
                      value={mail} 
                      onChange={e => handleArrayChange('emailler', i, e.target.value)}
                      placeholder="ornek@email.com"
                    />
                    <button 
                      type="button" 
                      onClick={() => addArrayField('emailler')}
                      className="aysiad-btn aysiad-btn-add"
                      title="E-mail ekle"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </button>
                    {form.emailler.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => removeArrayField('emailler', i)}
                        className="aysiad-btn aysiad-btn-remove"
                        title="E-mail sil"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="aysiad-form-field">
                <label className="aysiad-form-label">Adres</label>
                <input 
                  name="adres" 
                  className="aysiad-input" 
                  value={form.adres} 
                  onChange={handleChange}
                  placeholder="İş adresiniz"
                />
              </div>
            </div>

            {/* Dijital Varlık */}
            <div className="aysiad-form-section">
              <h3 className="aysiad-form-section-title">
                <svg className="aysiad-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
                Dijital Varlık
              </h3>

              <div className="aysiad-form-field">
                <label className="aysiad-form-label">Web Sitesi</label>
                {form.websiteleri.map((web, i) => (
                  <div className="aysiad-array-field" key={i}>
                    <input 
                      className="aysiad-input aysiad-array-input" 
                      value={web} 
                      onChange={e => handleArrayChange('websiteleri', i, e.target.value)}
                      placeholder="https://www.sirketiniz.com"
                    />
                    <button 
                      type="button" 
                      onClick={() => addArrayField('websiteleri')}
                      className="aysiad-btn aysiad-btn-add"
                      title="Web sitesi ekle"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </button>
                    {form.websiteleri.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => removeArrayField('websiteleri', i)}
                        className="aysiad-btn aysiad-btn-remove"
                        title="Web sitesi sil"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="aysiad-form-field">
                <label className="aysiad-form-label">Instagram</label>
                {form.instagramlar.map((insta, i) => (
                  <div className="aysiad-array-field" key={i}>
                    <input 
                      className="aysiad-input aysiad-array-input" 
                      value={insta} 
                      onChange={e => handleArrayChange('instagramlar', i, e.target.value)}
                      placeholder="@sirketiniz"
                    />
                    <button 
                      type="button" 
                      onClick={() => addArrayField('instagramlar')}
                      className="aysiad-btn aysiad-btn-add"
                      title="Instagram ekle"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </button>
                    {form.instagramlar.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => removeArrayField('instagramlar', i)}
                        className="aysiad-btn aysiad-btn-remove"
                        title="Instagram sil"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Ürün ve Hizmetler */}
            {form.sektor && (
              <div className="aysiad-form-section">
                <h3 className="aysiad-form-section-title">
                  <svg className="aysiad-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  Ürün ve Hizmetler
                </h3>

                <div className="aysiad-form-field">
                  <label className="aysiad-form-label">Ürünler</label>
                  <TagInput
                    value={form.urunler}
                    onChange={val => setForm(f => ({ ...f, urunler: val }))}
                    placeholder="Ürün ekleyin ve Enter'a basın"
                    suggestions={seciliSektor.urunler}
                  />
                </div>

                <div className="aysiad-form-field">
                  <label className="aysiad-form-label">Hizmetler</label>
                  <TagInput
                    value={form.hizmetler}
                    onChange={val => setForm(f => ({ ...f, hizmetler: val }))}
                    placeholder="Hizmet ekleyin ve Enter'a basın"
                    suggestions={seciliSektor.hizmetler}
                  />
                </div>
              </div>
            )}

            {/* Ek Bilgiler */}
            <div className="aysiad-form-section">
              <h3 className="aysiad-form-section-title">
                <svg className="aysiad-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10,9 9,9 8,9"></polyline>
                </svg>
                Ek Bilgiler
              </h3>
              <div className="aysiad-form-field">
                <label className="aysiad-form-label">Kısa Açıklama / Not</label>
                <textarea 
                  name="aciklama" 
                  className="aysiad-textarea" 
                  value={form.aciklama} 
                  onChange={handleChange}
                  placeholder="Şirketiniz hakkında kısa bilgi veya özel notlarınız..."
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="aysiad-btn-submit"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Kaydediliyor...
                </>
              ) : (
                'Üye Başvurusunu Gönder'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

