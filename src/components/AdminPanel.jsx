import React, { useEffect, useState } from 'react';

function AdminPanel() {
  const [chats, setChats] = useState([]);
  const [yeniUyeler, setYeniUyeler] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('chats');

  useEffect(() => {
    // Chat geçmişini getir
    fetch('http://localhost:3000/api/admin/chats')
      .then(res => res.json())
      .then(data => {
        setChats(data.chats || []);
      })
      .catch(err => {
        console.error('Chat veri hatası:', err);
      });

    // Yeni üye başvurularını getir
    fetch('http://localhost:3000/api/admin/yeni-uyeler')
      .then(res => res.json())
      .then(data => {
        setYeniUyeler(data.yeniUyeler || []);
      })
      .catch(err => {
        console.error('Yeni üye veri hatası:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const tabStyle = (isActive) => ({
    padding: '12px 24px',
    margin: '0 4px',
    backgroundColor: isActive ? '#004aad' : '#f8f9fa',
    color: isActive ? '#fff' : '#666',
    border: '1px solid #ddd',
    borderRadius: '8px 8px 0 0',
    cursor: 'pointer',
    fontWeight: isActive ? 'bold' : 'normal'
  });

  return (
    <div style={{ padding: 32, fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ color: '#004aad', marginBottom: 24 }}>AYSİAD Admin Panel</h2>
      
      {/* Tab Navigation */}
      <div style={{ marginBottom: 24, borderBottom: '2px solid #ddd' }}>
        <button
          style={tabStyle(activeTab === 'chats')}
          onClick={() => setActiveTab('chats')}
        >
          Chat Geçmişi ({chats.length})
        </button>
        <button
          style={tabStyle(activeTab === 'yeni-uyeler')}
          onClick={() => setActiveTab('yeni-uyeler')}
        >
          Yeni Üye Başvuruları ({yeniUyeler.length})
        </button>
      </div>

      {loading ? (
        <p>Yükleniyor...</p>
      ) : (
        <>
          {/* Chat Geçmişi Tab */}
          {activeTab === 'chats' && (
            <div style={{ overflowX: 'auto' }}>
              <table 
                border={1} 
                cellPadding={12} 
                cellSpacing={0} 
                style={{ 
                  width: '100%', 
                  background: '#fff', 
                  borderCollapse: 'collapse',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
                <thead>
                  <tr style={{ background: '#004aad', color: '#fff' }}>
                    <th style={{ minWidth: 150 }}>Tarih</th>
                    <th style={{ minWidth: 250 }}>Kullanıcı Mesajı</th>
                    <th style={{ minWidth: 300 }}>Asistan Yanıtı</th>
                  </tr>
                </thead>
                <tbody>
                  {chats.map((chat, index) => (
                    <tr key={chat._id} style={{ background: index % 2 === 0 ? '#f8f9fa' : '#fff' }}>
                      <td style={{ verticalAlign: 'top', fontSize: 14, color: '#666' }}>
                        {new Date(chat.createdAt).toLocaleString('tr-TR')}
                      </td>
                      <td style={{ verticalAlign: 'top', maxWidth: 300, wordWrap: 'break-word' }}>
                        {chat.userMessage}
                      </td>
                      <td style={{ verticalAlign: 'top', maxWidth: 400, wordWrap: 'break-word' }}>
                        {chat.assistantResponse}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {chats.length === 0 && (
                <p style={{ textAlign: 'center', color: '#666', marginTop: 24 }}>
                  Henüz chat geçmişi bulunmuyor.
                </p>
              )}
            </div>
          )}

          {/* Yeni Üye Başvuruları Tab */}
          {activeTab === 'yeni-uyeler' && (
            <div style={{ overflowX: 'auto' }}>
              <table 
                border={1} 
                cellPadding={12} 
                cellSpacing={0} 
                style={{ 
                  width: '100%', 
                  background: '#fff', 
                  borderCollapse: 'collapse',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
                <thead>
                  <tr style={{ background: '#28a745', color: '#fff' }}>
                    <th>Başvuru Tarihi</th>
                    <th>Ad Soyad</th>
                    <th>Şirket</th>
                    <th>Sektör</th>
                    <th>Telefonlar</th>
                    <th>E-mailler</th>
                    <th>Web Siteleri</th>
                    <th>Instagram</th>
                    <th>Ürünler</th>
                    <th>Hizmetler</th>
                  </tr>
                </thead>
                <tbody>
                  {yeniUyeler.map((uye, index) => (
                    <tr key={uye._id} style={{ background: index % 2 === 0 ? '#f8f9fa' : '#fff' }}>
                      <td style={{ verticalAlign: 'top', fontSize: 14, color: '#666' }}>
                        {new Date(uye.kayit_tarihi).toLocaleString('tr-TR')}
                      </td>
                      <td style={{ verticalAlign: 'top', fontWeight: 'bold' }}>
                        {uye.ad_soyad}
                      </td>
                      <td style={{ verticalAlign: 'top' }}>
                        {uye.sirket}
                      </td>
                      <td style={{ verticalAlign: 'top' }}>
                        <span style={{ 
                          backgroundColor: '#007bff', 
                          color: '#fff', 
                          padding: '2px 8px', 
                          borderRadius: '12px', 
                          fontSize: '12px' 
                        }}>
                          {uye.sektor}
                        </span>
                      </td>
                      <td style={{ verticalAlign: 'top', maxWidth: 150, wordWrap: 'break-word' }}>
                        {uye.telefonlar && uye.telefonlar.length > 0 ? (
                          <div>
                            {uye.telefonlar.map((tel, i) => (
                              <div key={i} style={{ fontSize: '13px', marginBottom: '2px' }}>
                                📞 {tel}
                              </div>
                            ))}
                          </div>
                        ) : '-'}
                      </td>
                      <td style={{ verticalAlign: 'top', maxWidth: 200, wordWrap: 'break-word' }}>
                        {uye.emailler && uye.emailler.length > 0 ? (
                          <div>
                            {uye.emailler.map((email, i) => (
                              <div key={i} style={{ fontSize: '13px', marginBottom: '2px' }}>
                                ✉️ {email}
                              </div>
                            ))}
                          </div>
                        ) : '-'}
                      </td>
                      <td style={{ verticalAlign: 'top', maxWidth: 150, wordWrap: 'break-word' }}>
                        {uye.websiteleri && uye.websiteleri.length > 0 ? (
                          <div>
                            {uye.websiteleri.map((web, i) => (
                              <div key={i} style={{ fontSize: '13px', marginBottom: '2px' }}>
                                🌐 <a href={web} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff' }}>
                                  {web.length > 20 ? web.substring(0, 20) + '...' : web}
                                </a>
                              </div>
                            ))}
                          </div>
                        ) : '-'}
                      </td>
                      <td style={{ verticalAlign: 'top', maxWidth: 120, wordWrap: 'break-word' }}>
                        {uye.instagramlar && uye.instagramlar.length > 0 ? (
                          <div>
                            {uye.instagramlar.map((insta, i) => (
                              <div key={i} style={{ fontSize: '13px', marginBottom: '2px' }}>
                                📷 {insta}
                              </div>
                            ))}
                          </div>
                        ) : '-'}
                      </td>
                      <td style={{ verticalAlign: 'top', maxWidth: 200, wordWrap: 'break-word' }}>
                        {uye.urunler && uye.urunler.length > 0 ? (
                          <div style={{ fontSize: '12px' }}>
                            {uye.urunler.map((urun, i) => (
                              <span key={i} style={{ 
                                backgroundColor: '#e3f2fd', 
                                color: '#1976d2', 
                                padding: '1px 6px', 
                                borderRadius: '8px', 
                                margin: '1px',
                                display: 'inline-block'
                              }}>
                                {urun}
                              </span>
                            ))}
                          </div>
                        ) : '-'}
                      </td>
                      <td style={{ verticalAlign: 'top', maxWidth: 200, wordWrap: 'break-word' }}>
                        {uye.hizmetler && uye.hizmetler.length > 0 ? (
                          <div style={{ fontSize: '12px' }}>
                            {uye.hizmetler.map((hizmet, i) => (
                              <span key={i} style={{ 
                                backgroundColor: '#f3e5f5', 
                                color: '#7b1fa2', 
                                padding: '1px 6px', 
                                borderRadius: '8px', 
                                margin: '1px',
                                display: 'inline-block'
                              }}>
                                {hizmet}
                              </span>
                            ))}
                          </div>
                        ) : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {yeniUyeler.length === 0 && (
                <p style={{ textAlign: 'center', color: '#666', marginTop: 24 }}>
                  Henüz yeni üye başvurusu bulunmuyor.
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AdminPanel; 