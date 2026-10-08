import { useEffect, useRef, useState } from 'react';

export default function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const turnstileElement = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);

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
    if (checkOut <= checkIn) {
      setError('Çıkış tarihi, giriş tarihinden sonra olmalıdır.');
      return;
    }

    if (!turnstileToken) {\n      setError('Lütfen güvenlik doğrulamasının tamamlanmasını bekleyin.');\n      return;\n    }\n\n    const payload = Object.fromEntries(
      ['name', 'email', 'phone', 'roomType', 'checkIn', 'checkOut', 'guests', 'message']
        .map((key) => [key, String(data.get(key) || '').trim()])
    );

    payload.turnstileToken = turnstileToken;\n    setError('');\n    setSending(true);

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

      setSubmitted(true);\n      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {\n      setTurnstileToken('');\n      const turnstile = (window as Window & { turnstile?: { reset: (widgetId: string) => void } }).turnstile;\n      if (turnstile && turnstileWidgetId.current) turnstile.reset(turnstileWidgetId.current);\n      setSending(false);
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
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"><span className="text-amber-500">Hemen</span> Rezervasyon Yapın</h2>
              <p className="text-lg text-gray-600">Tatilinizi planlamaya bugün başlayın! Profesyonel ekibimiz size en uygun seçenekleri sunmak için hazır.</p>
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
              <form onSubmit={handleSubmit} className="space-y-6">\n                <div className="absolute -left-[9999px]" aria-hidden="true"><label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label></div>
                <div className="grid md:grid-cols-2 gap-6">
                  <label className="block"><span className="block text-sm font-medium text-gray-700 mb-2">Adınız Soyadınız</span><input required name="name" type="text" className="w-full px-4 py-3 border border-slate-200 rounded-xl" placeholder="Adınız" /></label>
                  <label className="block"><span className="block text-sm font-medium text-gray-700 mb-2">E-posta Adresiniz</span><input required name="email" type="email" className="w-full px-4 py-3 border border-slate-200 rounded-xl" placeholder="ornek@email.com" /></label>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <label className="block"><span className="block text-sm font-medium text-gray-700 mb-2">Telefon Numaranız</span><input required name="phone" type="tel" className="w-full px-4 py-3 border border-slate-200 rounded-xl" placeholder="+90 5XX XXX XX XX" /></label>
                  <label className="block"><span className="block text-sm font-medium text-gray-700 mb-2">Oda Tipi</span><select name="roomType" required className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white"><option value="">Seçiniz</option><option>Standart Oda</option><option>Superior Oda</option><option>Deluxe Oda</option><option>Suit</option></select></label>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <label className="block"><span className="block text-sm font-medium text-gray-700 mb-2">Giriş Tarihi</span><input required name="checkIn" type="date" className="w-full px-4 py-3 border border-slate-200 rounded-xl" /></label>
                  <label className="block"><span className="block text-sm font-medium text-gray-700 mb-2">Çıkış Tarihi</span><input required name="checkOut" type="date" className="w-full px-4 py-3 border border-slate-200 rounded-xl" /></label>
                </div>
                <label className="block"><span className="block text-sm font-medium text-gray-700 mb-2">Misafir Sayısı</span><select name="guests" className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white"><option>1 Kişi</option><option>2 Kişi</option><option>3 Kişi</option><option>4 Kişi</option><option>5+ Kişi</option></select></label>
                <label className="block"><span className="block text-sm font-medium text-gray-700 mb-2">Mesajınız</span><textarea name="message" rows={4} className="w-full px-4 py-3 border border-slate-200 rounded-xl resize-none" placeholder="Özel isteklerinizi yazabilirsiniz..." /></label>
                <div ref={turnstileElement} className="min-h-[65px]" aria-label="Güvenlik doğrulaması" />\n                {error && <p role="alert" className="text-red-700 text-sm bg-red-50 rounded-lg p-3">{error}</p>}\n                <button type="submit" disabled={sending || !turnstileToken} className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed">{sending ? "Gönderiliyor..." : "Rezervasyon Gönder →"}</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
