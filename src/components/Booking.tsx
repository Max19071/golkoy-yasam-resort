export default function Booking() {
  return (
    <section id="contact" className="py-20 bg-amber-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-amber-600 font-semibold tracking-wider">REZERVASYON</span>
          <h2 className="text-4xl font-bold mt-3 text-gray-900">Konaklamanızı Planlayın</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Aşağıdaki formu kullanarak konaklama tercihlerinizi oluşturabilirsiniz.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Giriş Tarihi</span>
              <input type="date" className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-amber-500" />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Çıkış Tarihi</span>
              <input type="date" className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-amber-500" />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Oda Tipi</span>
              <select className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 bg-white outline-none focus:border-amber-500" defaultValue="">
                <option value="" disabled>Oda seçiniz</option>
                <option>Standart Oda</option>
                <option>Deluxe Oda</option>
                <option>Aile Odası</option>
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Yetişkin</span>
              <select className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 bg-white outline-none focus:border-amber-500" defaultValue="2">
                <option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option>
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Çocuk</span>
              <select className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 bg-white outline-none focus:border-amber-500" defaultValue="0">
                <option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option>
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Ad Soyad</span>
              <input type="text" placeholder="Adınız ve soyadınız" className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-amber-500" />
            </label>
          </div>

          <label className="block mt-6">
            <span className="text-sm font-semibold text-gray-700">Notunuz</span>
            <textarea rows={4} placeholder="Özel taleplerinizi veya rezervasyon notunuzu yazabilirsiniz." className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-amber-500 resize-none" />
          </label>

          <div className="mt-8 text-center">
            <button type="button" className="px-8 py-3.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-semibold transition">
              Rezervasyon Talebi Oluştur
            </button>
            <p className="mt-3 text-xs text-gray-500">Bu form şu anda ön talep arayüzüdür; gönderim bağlantısı iletişim bilgileri eklendiğinde etkinleştirilebilir.</p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <span className="text-amber-600 font-semibold tracking-wider">İLETİŞİM</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-gray-900">Daha Fazla Bilgi İçin Bize Ulaşın</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Gölköy Yaşam Resort hakkında sorularınız, konaklama seçenekleri ve rezervasyon talepleriniz için bizimle iletişime geçebilirsiniz.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-2xl mb-2">☎</div><h3 className="font-bold text-gray-900">Telefon</h3>
              <p className="mt-2 text-sm text-gray-500">Telefon bilgisi eklenecek</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-2xl mb-2">✉</div><h3 className="font-bold text-gray-900">E-posta</h3>
              <p className="mt-2 text-sm text-gray-500">E-posta bilgisi eklenecek</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-2xl mb-2">⌖</div><h3 className="font-bold text-gray-900">Adres</h3>
              <p className="mt-2 text-sm text-gray-500">Adres bilgisi eklenecek</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
