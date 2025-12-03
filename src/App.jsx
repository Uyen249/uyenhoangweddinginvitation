import React, { useState, useEffect, useRef } from 'react';
import { Heart, MapPin, Calendar, Clock, Gift, Volume2, VolumeX } from 'lucide-react';

export default function App() {
  const [timeLeft, setTimeLeft] = useState({});
  const [showRSVP, setShowRSVP] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [formData, setFormData] = useState({ name: '', attending: 'yes', message: '' });
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminGuest, setAdminGuest] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wishes, setWishes] = useState([]);
  const [isLoadingWishes, setIsLoadingWishes] = useState(true);
  const [showQR, setShowQR] = useState(false);
  const [hearts, setHearts] = useState([]);
  const audioRef = useRef(null);
  const heartIdCounter = useRef(0);

  // NEW GOOGLE SCRIPT URL (nhà gái)
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz8PMXQAz3uzLtk-UMNihngbnGpZ3-ieG215mOx9m0Qv7lpLJGPkKQoTcpa7x0JpOnB/exec';

  const headerPhotos = [
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=600',
    'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600',
    'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600'
  ];

  const weddingDate = new Date('2025-12-28T11:00:00');

  const photos = [
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800',
    'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800',
    'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800'
  ];

  const calendarDays = () => {
    const firstDay = new Date(2025, 11, 1).getDay();
    const daysInMonth = 31;
    const days = [];

    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);

    return days;
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const guest = params.get('guest');
    if (guest) {
      setGuestName(decodeURIComponent(guest));
      setFormData(prev => ({ ...prev, name: decodeURIComponent(guest) }));
    }

    const loadWishes = async () => {
      try {
        const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=getWishes`);
        const data = await response.json();
        if (data.wishes) setWishes(data.wishes);
      } catch (e) {
      } finally {
        setIsLoadingWishes(false);
      }
    };

    loadWishes();

    const timer = setInterval(() => {
      const now = new Date();
      const difference = weddingDate - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);

    const handleKeyPress = (e) => { if (e.key === 'a' || e.key === 'A') setShowAdmin(p => !p); };
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      clearInterval(timer);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
      if (isPlaying) audioRef.current.pause(); else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const createHeart = () => {
    const x = window.innerWidth / 2;
    const y = window.innerHeight / 2;
    const id = heartIdCounter.current++;
    const newHeart = {
      id,
      x,
      y,
      left: Math.random() * 100 - 50,
      duration: 2 + Math.random() * 2,
      size: 20 + Math.random() * 20,
      delay: Math.random() * 0.5
    };
    setHearts(prev => [...prev, newHeart]);
    setTimeout(() => setHearts(prev => prev.filter(h => h.id !== id)), (newHeart.duration + newHeart.delay) * 1000);
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) return alert('Vui lòng nhập họ tên!');
    setIsSubmitting(true);
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      alert(`Cảm ơn ${formData.name}!`);
      if (formData.message.trim()) {
        setWishes(prev => [{ name: formData.name, message: formData.message, timestamp: new Date().toLocaleString('vi-VN') }, ...prev]);
      }
      setShowRSVP(false);
      setFormData({ name: guestName || '', attending: 'yes', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const applyGuestName = () => {
    if (adminGuest.trim()) {
      const newUrl = `${window.location.pathname}?guest=${encodeURIComponent(adminGuest)}`;
      window.history.pushState({}, '', newUrl);
      setGuestName(adminGuest);
      setFormData(prev => ({ ...prev, name: adminGuest }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">

      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden relative">

          {/* HEADER */}
          <div className="relative h-96 header-bg flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-900/60 to-pink-900/60"></div>
            <div className="relative z-10 text-center text-white px-4">
              <Heart className="w-16 h-16 mx-auto mb-4 animate-pulse" />

              {/* UPDATED COUPLE NAMES */}
              <h1 className="couple-names text-6xl md:text-7xl mb-2">Tạ Thị Thanh Uyên</h1>
              <div className="text-4xl my-4 font-light elegant-text">&</div>
              <h1 className="couple-names text-6xl md:text-7xl mb-6">Bùi Hữu Hoàng</h1>

              <div className="text-xl font-light tracking-widest elegant-text">28 • 12 • 2025</div>
            </div>
          </div>

          <div className="p-8 md:p-12">

            {/* --- INVITATION CARD NHÀ GÁI --- */}
            <div className="rounded-2xl p-8 mb-12 shadow-lg border border-gray-200 max-w-lg mx-auto" style={{backgroundColor: '#fdf2f6'}}>
              <h3 className="text-2xl font-semibold text-center text-gray-800 elegant-text mb-6">TRÂN TRỌNG KÍNH MỜI</h3>

              <div className="text-center mb-6">
                <div className="min-h-[3rem] flex items-center justify-center mb-4">
                  {guest
