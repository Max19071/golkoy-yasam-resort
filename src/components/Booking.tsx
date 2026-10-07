import { useState } from 'react';

export default function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
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
                <p className="text-gray-600">+90 (212) 555 0123</p>
                <p className="text-gray-600">+90 (555) 123 4567</p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-lg">
                <h3 className="font-semibold text-gray-900 mb-2">✉ E-posta</h3>
                <p className="text-gray-600">rezervasyon@paradisehotel.com</p>
                <p className="text-gray-600">bilgi@paradisehotel.com</p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-lg">
                <h3 className="font-semibold text-gray-900 mb-2">⌖ Adres</h3>
                <p className="text-gray-600">Deniz Caddesi No: 123</p>
                <p className="text-gray-600">İstanbul, Türkiye</p>
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-4">Çalışma Saatleri</h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between"><span>Hafta İçi</span><span className="font-medium">08:00 - 22:00</span></div>
                <div className="flex justify-between"><span>Hafta Sonu</span><span className="font-medium">09:00 - 21:00</span></div>
                <div className="flex justify-between"><span>Resmi Tatiller</span><span className="font-medium">Kapalı</span></div>
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <label className="block"><span className="block text-sm font-medium text-gray-700 mb-2">Adınız Soyadınız</span><input required type="text" className="w-full px-4 py-3 border border-slate-200 rounded-xl" placeholder="Adınız" /></label>
                  <label className="block"><span className="block text-sm font-medium text-gray-700 mb-2">E-posta Adresiniz</span><input required type="email" className="w-full px-4 py-3 border border-slate-200 rounded-xl" placeholder="ornek@email.com" /></label>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <label className="block"><span className="block text-sm font-medium text-gray-700 mb-2">Telefon Numaranız</span><input required type="tel" className="w-full px-4 py-3 border border-slate-200 rounded-xl" placeholder="+90 5XX XXX XX XX" /></label>
                  <label className="block"><span className="block text-sm font-medium text-gray-700 mb-2">Oda Tipi</span><select className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white"><option>Seçiniz</option><option>Standart Oda</option><option>Superior Oda</option><option>Deluxe Oda</option><option>Suit</option></select></label>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <label className="block"><span className="block text-sm font-medium text-gray-700 mb-2">Giriş Tarihi</span><input required type="date" className="w-full px-4 py-3 border border-slate-200 rounded-xl" /></label>
                  <label className="block"><span className="block text-sm font-medium text-gray-700 mb-2">Çıkış Tarihi</span><input required type="date" className="w-full px-4 py-3 border border-slate-200 rounded-xl" /></label>
                </div>
                <label className="block"><span className="block text-sm font-medium text-gray-700 mb-2">Misafir Sayısı</span><select className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white"><option>1 Kişi</option><option>2 Kişi</option><option>3 Kişi</option><option>4 Kişi</option><option>5+ Kişi</option></select></label>
                <label className="block"><span className="block text-sm font-medium text-gray-700 mb-2">Mesajınız</span><textarea rows={4} className="w-full px-4 py-3 border border-slate-200 rounded-xl resize-none" placeholder="Özel isteklerinizi yazabilirsiniz..." /></label>
                <button type="submit" className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all">Rezervasyon Gönder →</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
