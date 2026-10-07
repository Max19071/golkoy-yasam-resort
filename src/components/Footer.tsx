export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="text-2xl font-bold">Gölköy Yaşam Resort</div>
            <p className="text-gray-400 leading-relaxed">25 yıldan fazla deneyimimizle, misafirlerimize unutulmaz tatil deneyimleri sunuyoruz. Konfor, kalite ve hizmet bir arada.</p>
            <div className="flex gap-4"><a href="#" className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-500">X</a><a href="#" className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-500">◎</a><a href="#" className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-500">f</a></div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-6">Hızlı Linkler</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#home" className="hover:text-amber-500">Ana Sayfa</a></li><li><a href="#about" className="hover:text-amber-500">Hakkımızda</a></li><li><a href="#rooms" className="hover:text-amber-500">Odalar</a></li><li><a href="#services" className="hover:text-amber-500">Hizmetler</a></li><li><a href="#gallery" className="hover:text-amber-500">Galeri</a></li><li><a href="#contact" className="hover:text-amber-500">İletişim</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-6">Hizmetler</h3>
            <ul className="space-y-3 text-gray-400"><li>Oda Rezervasyonu</li><li>Restoran & Bar</li><li>Spa & Wellness</li><li>Havuz & Spor</li><li>Konferans</li><li>Transfer</li></ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-6">İletişim</h3>
            <ul className="space-y-4 text-gray-400"><li>⌖ Deniz Caddesi No: 123<br/>İstanbul, Türkiye</li><li>☎ +90 (212) 555 0123</li><li>✉ rezervasyon@paradisehotel.com</li></ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">© {currentYear} Gölköy Yaşam Resort. Tüm hakları saklıdır.</p>
            <div className="flex gap-6 text-sm text-gray-400"><a href="#" className="hover:text-amber-500">Gizlilik Politikası</a><a href="#" className="hover:text-amber-500">Kullanım Koşulları</a><a href="#" className="hover:text-amber-500">Çerez Politikası</a></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
