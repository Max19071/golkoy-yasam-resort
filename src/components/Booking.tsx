import {useSiteTexts} from "./useSiteTexts";
import { useEffect, useRef, useState } from 'react';
type BookingRoom = {
  id: number;
  name: string;
  capacity: number;
};
export default function Booking() {
  const t=useSiteTexts();
  const [submitted, setSubmitted] = useState(false);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const today = new Date();
  const todayLocal = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, '0'), String(today.getDate()).padStart(2, '0')].join('-');
  const nextDay = (date: string) => {
    const [year, month, day] = date.split('-').map(Number);
    const result = new Date(year, month - 1, day + 1);
    return [result.getFullYear(), String(result.getMonth() + 1).padStart(2, '0'), String(result.getDate()).padStart(2, '0')].join('-');
  };
  const [roomOptions, setRoomOptions] = useState<BookingRoom[]>([]);
const [roomsLoading, setRoomsLoading] = useState(true);
const [selectedRoomName, setSelectedRoomName] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const turnstileElement = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);
useEffect(() => {
  const controller = new AbortController();

  const url =
    "https://pekpyiyivttrjjxsrarx.supabase.co/rest/v1/hotel_rooms?select=id,name,capacity&is_active=eq.true&order=display_order.asc";

  const key = "sb_publishable_byqYtROGi5NKkIWiZJ07uw_RMPhuMzS";

  fetch(url, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
    },
    signal: controller.signal,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Odalar yüklenemedi");
      }
      return response.json();
    })
    .then((rooms: BookingRoom[]) => {
      setRoomOptions(rooms);
      setRoomsLoading(false);
    })
    .catch((error) => {
      if (error.name !== "AbortError") {
        console.error("Oda listesi alınamadı:", error);
        setRoomsLoading(false);
      }
    });

  return () => controller.abort();
}, []);
  useEffect(() => {
    let active = true;
    type Turnstile = {
      render: (element: HTMLElement, options: Record<string, unknown>) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId: string) => void;
    };
    const getTurnstile = () => (window as Window & { turnstile?: Turnstile }).turnstile;
    const renderWidget = () => {
      const turnstile = getTurnstile();
      if (!active || !turnstile || !turnstileElement.current || turnstileWidgetId.current) return;
      turnstileWidgetId.current = turnstile.render(turnstileElement.current, {
        sitekey: '0x4AAAAAAFRWmRVJ7_RBgSDy',
        callback: (token: string) => setTurnstileToken(token),
        'expired-callback': () => setTurnstileToken(''),
        'error-callback': () => { setTurnstileToken(''); return true; },
      });
    };
    const scriptId = 'cloudflare-turnstile-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
    script.addEventListener('load', renderWidget);
    renderWidget();
    return () => {
      active = false;
      script?.removeEventListener('load', renderWidget);
      if (turnstileWidgetId.current && getTurnstile()) getTurnstile()?.remove(turnstileWidgetId.current);
      turnstileWidgetId.current = null;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;

    const form = e.currentTarget;
    const data = new FormData(form);

    // Gizli alanı botlar doldurursa talebi göndermeyiz.
    if (data.get('website')) return;

    const checkIn = String(data.get('checkIn') || '');
    const checkOut = String(data.get('checkOut') || '');
    if (checkIn < todayLocal) {
      setError('Giriş tarihi bugünden önce olamaz.');
      return;
    }
    if (checkOut <= checkIn) {
      setError('Çıkış tarihi, giriş tarihinden sonra olmalıdır.');
      return;
    }

    if (!turnstileToken) {
      setError('Lütfen güvenlik doğrulamasının tamamlanmasını bekleyin.');
      return;
    }

    const payload = Object.fromEntries(
      ['name', 'email', 'phone', 'roomType', 'checkIn', 'checkOut', 'guests', 'message']
        .map((key) => [key, String(data.get(key) || '').trim()])
    );

    payload.turnstileToken = turnstileToken;
    setError('');
    setSending(true);

    try {
      const response = await fetch(
        'https://pekpyiyivttrjjxsrarx.supabase.co/functions/v1/send-booking',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.success) {
        throw new Error('Rezervasyon talebiniz gönderilemedi. Lütfen tekrar deneyin veya bizi telefonla arayın.');
      }

      setSubmitted(true);
      form.reset();
      setCheckInDate('');
      setCheckOutDate('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setTurnstileToken('');
      const turnstile = (window as Window & { turnstile?: { reset: (widgetId: string) => void } }).turnstile;
      if (turnstile && turnstileWidgetId.current) turnstile.reset(turnstileWidgetId.current);
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <div className="inline-block px-4 py-2 bg-amber-100 rounded-full mb-4">
                <span className="text-amber-600 font-medium text-sm">İLETİŞİM & REZERVASYON</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t("booking_heading","Hemen Rezervasyon Yapın")}</h2>
              <p className="text-lg text-gray-600">{t("booking_description","Tatilinizi planlamaya bugün başlayın! Profesyonel ekibimiz size en uygun seçenekleri sunmak için hazır.")}</p>
            </div>

            <div className="space-y-4">
              <div className="p-6 bg-white rounded-2xl shadow-lg">
                <h3 className="font-semibold text-gray-900 mb-2">☎ Telefon</h3>
                <p className="text-gray-600">0366 252 85 89</p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-lg">
                <h3 className="font-semibold text-gray-900 mb-2">✉ E-posta</h3>
                <p className="text-gray-600">info@golkoyyasamresort.com</p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-lg">
                <h3 className="font-semibold text-gray-900 mb-2">⌖ Adres</h3>
                <p className="text-gray-600">Gölköy 65/A Kastamonu Merkez</p>
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-4">Üzüm Kızı Telefon</h3>
              <div className="text-gray-600">
                <p className="font-medium">0530 717 06 37</p>
              </div>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-4">Google Haritalar – Gölköy Yaşam Resort</h3>
              <iframe
                title="Gölköy Yaşam Resort konum haritası"
                src="https://maps.google.com/maps?q=G%C3%B6lk%C3%B6y%20Ya%C5%9Fam%20Resort%20Kastamonu&output=embed"
                width="100%"
                height="300"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl"
                allowFullScreen
              />
              <a
                href="https://www.google.com/maps/search/?api=1&query=G%C3%B6lk%C3%B6y%20Ya%C5%9Fam%20Resort%20Kastamonu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-amber-700 font-semibold hover:underline"
              >Google Haritalar'da Aç ↗</a>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Rezervasyon Formu</h3>
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-5">✓</div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Rezervasyon Alındı!</h4>
                <p className="text-gray-600">En kısa sürede sizinle iletişime geçeceğiz.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="absolute -left-[9999px]" aria-hidden="true"><label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label></div>
                <div className="grid md:grid-cols-2 gap-6">
                  <label className="block"><span className="block text-sm font-medium text-gray-700 mb-2">Adınız Soyadınız</span><input required name="name" type="text" className="w-full px-4 py-3 border border-slate-200 rounded-xl" placeholder="Adınız" /></label>
                  <label className="block"><span className="block text-sm font-medium text-gray-700 mb-2">E-posta Adresiniz</span><input required name="email" type="email" className="w-full px-4 py-3 border border-slate-200 rounded-xl" placeholder="ornek@email.com" /></label>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <label className="block"><span className="block text-sm font-medium text-gray-700 mb-2">Telefon Numaranız</span><input required name="phone" type="tel" className="w-full px-4 py-3 border border-slate-200 rounded-xl" placeholder="+90 5XX XXX XX XX" /></label>
                  <label className="block"><span className="block text-sm font-medium text-gray-700 mb-2">Oda Tipi</span><select
  name="roomType"
  required
  value={selectedRoomName}
  onChange={(e) => setSelectedRoomName(e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white"><option value="">
  {roomsLoading ? "Odalar yükleniyor..." : "Seçiniz"}
</option>
{roomOptions.map((room) => (
  <option key={room.id} value={room.name}>
    {room.name}
  </option>
))}</select></label>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <label className="block"><span className="block text-sm font-medium text-gray-700 mb-2">Giriş Tarihi</span><input required name="checkIn" type="date" min={todayLocal} value={checkInDate} onChange={(e) => { const value = e.target.value; setCheckInDate(value); if (checkOutDate && value && checkOutDate <= value) setCheckOutDate(''); }} className="w-full px-4 py-3 border border-slate-200 rounded-xl" /></label>
                  <label className="block"><span className="block text-sm font-medium text-gray-700 mb-2">Çıkış Tarihi</span><input required name="checkOut" type="date" min={nextDay(checkInDate || todayLocal)} value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-xl" /></label>
                </div>
                <label className="block"><span className="block text-sm font-medium text-gray-700 mb-2">Misafir Sayısı</span><select name="guests" key={selectedRoomName} className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white"><option value="">Seçiniz</option>
{roomOptions
  .filter((room) => room.name === selectedRoomName)
  .flatMap((room) =>
    Array.from(
      { length: room.capacity },
      (_, i) => i + 1
    )
      .filter(
        (count) =>
          !(
            room.name.trim().toLocaleLowerCase("tr-TR") ===
              "bahçe odaları standart" &&
            count === 1
          )
      )
      .map((count) => (
        <option key={count} value={`${count} Kişi`}>
          {count} Kişi
        </option>
      ))
  )}</select></label>
                <label className="block"><span className="block text-sm font-medium text-gray-700 mb-2">Mesajınız</span><textarea name="message" rows={4} className="w-full px-4 py-3 border border-slate-200 rounded-xl resize-none" placeholder="Özel isteklerinizi yazabilirsiniz..." /></label>
                <div ref={turnstileElement} className="min-h-[65px]" aria-label="Güvenlik doğrulaması" />
                {error && <p role="alert" className="text-red-700 text-sm bg-red-50 rounded-lg p-3">{error}</p>}
                <button type="submit" disabled={sending || !turnstileToken} className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed">{sending ? "Gönderiliyor..." : "Rezervasyon Gönder →"}</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
