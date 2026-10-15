import {useSiteTexts} from "./useSiteTexts";
export default function Footer() {
  const currentYear = new Date().getFullYear();
  const t=useSiteTexts();
  return (
    <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3"><div className="bg-white rounded-xl p-1"><img src="./amblem.jpg" alt="Gölköy Yaşam Resort amblemi" className="w-16 h-16 object-contain" /></div><div className="text-2xl font-bold">Gölköy Yaşam Resort</div></div>
            <p className="text-gray-400 leading-relaxed">{t("footer_description","15 yıldan fazla deneyimimizle, misafirlerimize unutulmaz tatil deneyimleri sunuyoruz. Konfor, kalite ve hizmet bir arada.")}</p>
            <div className="flex flex-wrap gap-4"><a href="https://www.instagram.com/golkoyyasamresort/" target="_blank" rel="noopener noreferrer" aria-label="Gölköy Yaşam Resort Instagram" title="@golkoyyasamresort" className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true"><rect x="2.5" y="2.5" width="19" height="19" rx="5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.6" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg></a><a href="https://www.instagram.com/uzumkizigolkoy/" target="_blank" rel="noopener noreferrer" aria-label="Üzüm Kızı Gölköy Instagram" title="@uzumkizigolkoy" className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true"><rect x="2.5" y="2.5" width="19" height="19" rx="5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.6" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg></a></div>
            <p className="text-xs text-gray-400">Instagram: @golkoyyasamresort · @uzumkizigolkoy</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-6">Hızlı Linkler</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#home" className="hover:text-amber-500">Ana Sayfa</a></li><li><a href="#about" className="hover:text-amber-500">Hakkımızda</a></li><li><a href="#rooms" className="hover:text-amber-500">Odalar</a></li><li><a href="#services" className="hover:text-amber-500">Hizmetler</a></li><li><a href="#gallery" className="hover:text-amber-500">Galeri</a></li><li><a href="#contact" className="hover:text-amber-500">İletişim</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-6">Hizmetler</h3>
            <ul className="space-y-3 text-gray-400"><li>Oda Rezervasyonu</li><li>Restoran & Bar</li><li>Havuz</li><li>Binicilik</li><li>Tenis</li><li>Düğün Organizasyonu</li><li>Transfer</li></ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-6">İletişim</h3>
            <ul className="space-y-4 text-gray-400"><li>⌖ Gölköy 65/A<br/>Kastamonu Merkez</li><li>☎ 0366 252 85 89</li><li>✉ info@golkoyyasamresort.com</li></ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">© {currentYear} Gölköy Yaşam Resort. Tüm hakları saklıdır.</p>
            <div className="flex gap-6 text-sm text-gray-400"><a href="?politika=gizlilik" className="hover:text-amber-500">Gizlilik Politikası</a><a href="?politika=kullanim" className="hover:text-amber-500">Kullanım Koşulları</a><a href="?politika=cerezler" className="hover:text-amber-500">Çerez Politikası</a></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
