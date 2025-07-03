import React, { useState, useEffect, useRef } from 'react';
import './ChatWidget.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState('welcome');
  const [userProfile, setUserProfile] = useState({});
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const [chatHistory, setChatHistory] = useState([]); // {role, content}

  // İlk mesajları ayarla
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([
          {
            id: 1,
            sender: 'bot',
            text: 'Merhaba! AYSİAD Asistanı olarak size nasıl yardımcı olabilirim?',
            timestamp: new Date(),
            type: 'welcome'
          }
        ]);
      }, 500);
    }
  }, [isOpen]);

  // Mesajları otomatik scroll
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Voice-to-text setup
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'tr-TR';
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };
      
      recognition.onerror = () => {
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current = recognition;
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    // Güncel chatHistory'yi oluştur
    const updatedHistory = [...chatHistory, { role: 'user', content: currentInput }];
    setChatHistory(updatedHistory);

    try {
      const response = await fetch('http://localhost:3000/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentInput, history: updatedHistory.slice(-6) }),
      });
      const data = await response.json();
      
      // AI yanıtından metin + suggestions'ı ayır
      let answer = data.answer;
      let suggestions = [];
      const suggestionsMatch = answer.match(/suggestions:\s*\[(.*?)\]/);
      if (suggestionsMatch) {
        suggestions = JSON.parse(`[${suggestionsMatch[1]}]`);
        answer = answer.replace(suggestionsMatch[0], '').trim();
      }
      
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'bot',
        text: answer,
        timestamp: new Date(),
        suggestions
      }]);
      
      // Assistant cevabını da history'ye ekle
      setChatHistory([...updatedHistory, { role: 'assistant', content: answer }]);
      
    } catch (e) {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'bot',
        text: 'Şu anda bir hata oluştu, lütfen tekrar deneyin.',
        timestamp: new Date(),
      }]);
    }
    setIsTyping(false);
  };

  const generateBotResponse = (userInput) => {
    const responses = {
      default: "Size yardımcı olmak için buradayım. Daha spesifik bir soru sorabilir misiniz?",
      member: "Üyelerimiz hakkında bilgi almak için sektörünüzü belirtir misiniz?",
      event: "Yaklaşan etkinliklerimiz hakkında bilgi verebilirim. Hangi konuda etkinlik arıyorsunuz?",
      contact: "İletişim bilgilerimiz: Tel: 0258 261 40 00, E-posta: info@aysiad.com.tr"
    };

    let responseText = responses.default;
    
    if (userInput.toLowerCase().includes('üye') || userInput.toLowerCase().includes('member')) {
      responseText = responses.member;
    } else if (userInput.toLowerCase().includes('etkinlik') || userInput.toLowerCase().includes('event')) {
      responseText = responses.event;
    } else if (userInput.toLowerCase().includes('iletişim') || userInput.toLowerCase().includes('contact')) {
      responseText = responses.contact;
    }

    return {
      id: Date.now(),
      sender: 'bot',
      text: responseText,
      timestamp: new Date(),
      suggestions: ['Üye Bilgileri', 'Etkinlikler', 'İletişim']
    };
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    sendMessage();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('tr-TR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const MemberCard = ({ member }) => (
    <div className="member-card">
      <div className="member-header">
        <div className="member-logo">
          <img src="/api/placeholder/40/40" alt="Logo" />
        </div>
        <div className="member-info">
          <h4>{member.name}</h4>
          <p className="member-slogan">{member.slogan}</p>
        </div>
      </div>
      <div className="member-details">
        <span className="member-location">📍 {member.location}</span>
        <span className="member-sector">🏢 {member.sector}</span>
      </div>
      <div className="member-actions">
        <button className="contact-btn">📞 İletişim Kur</button>
        <button className="calendar-btn">📅 Randevu Al</button>
      </div>
    </div>
  );

  const TypingIndicator = () => (
    <div className="typing-indicator">
      <div className="typing-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <span className="typing-text">Yazıyor...</span>
    </div>
  );

  return (
    <>
      {/* Chat Button */}
      <div className={`chat-button ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>

      {/* Chat Widget */}
      {isOpen && (
        <div className="chat-widget">
          <div className="chat-header">
            <div className="assistant-info">
              <div className="assistant-avatar">
                <img src="/aysiad-avatar.png" alt="AYSİAD Asistanı" />
              </div>
              <div className="assistant-details">
                <h3>AYSİAD Asistanı</h3>
                <span className="status">Çevrimiçi</span>
              </div>
            </div>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          <div className="chat-messages">
            {chatHistory.length === 0 && (
              <div className="suggestions">
                <button className="suggestion-btn" onClick={() => handleSuggestionClick('Etkinlikler')}>Etkinlikler</button>
                <button className="suggestion-btn" onClick={() => handleSuggestionClick('Üye Bilgileri')}>Üye Bilgileri</button>
                <button className="suggestion-btn" onClick={() => handleSuggestionClick('İletişim')}>İletişim</button>
              </div>
            )}
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                {message.sender === 'bot' && (
                  <div className="message-avatar">
                    <img src="/aysiad-avatar.png" alt="Bot" />
                  </div>
                )}
                <div className="message-content">
                  <div className="message-bubble">
                    <p>{message.text}</p>
                    {message.suggestions && (
                      <div className="suggestions">
                        {message.suggestions.map((suggestion, index) => (
                          <button 
                            key={index}
                            className="suggestion-btn"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="message-time">{formatTime(message.timestamp)}</span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot">
                <div className="message-avatar">
                  <img src="/aysiad-avatar.png" alt="Bot" />
                </div>
                <div className="message-content">
                  <TypingIndicator />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input">
            <div className="input-container">
              <button 
                className={`voice-btn ${isListening ? 'listening' : ''}`}
                onClick={startListening}
                disabled={isListening}
              >
                🎤
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Mesajınızı yazın..."
                className="message-input"
              />
              <button 
                className="send-btn"
                onClick={sendMessage}
                disabled={!input.trim()}
              >
                📤
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;

