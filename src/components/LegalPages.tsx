import { useState } from "react";

export type PolicyKey = "gizlilik" | "kullanim" | "cerezler";
export const policyTitles: Record<PolicyKey, string> = {
  gizlilik: "Gizlilik Politikası",
  kullanim: "Kullanım Koşulları",
  cerezler: "Çerez Politikası",
};

export function PolicyPage({ kind }: { kind: PolicyKey }) {
  return <main className="min-h-screen bg-amber-50 text-slate-800 py-12 px-5">
    <article className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-10 space-y-6 leading-relaxed">
      <a href="./" className="text-amber-700 font-semibold hover:underline">← Ana sayfaya dön</a>
      <h1 className="text-3xl font-bold">{policyTitles[kind]}</h1>
      <p className="text-sm text-slate-500">Gölköy Yaşam Resort • Son güncelleme: 15 Ekim 2026</p>
      {kind === "gizlilik" && <>
        <h2 className="text-xl font-semibold">Veri sorumlusu ve iletişim</h2>
        <p>Bu internet sitesi Gölköy Yaşam Resort'un tanıtımı, iletişim ve rezervasyon taleplerinin alınması amacıyla kullanılır. Kişisel verilerinizle ilgili talepleriniz için info@golkoyyasamresort.com adresine başvurabilirsiniz. İşletmenin resmi ticari unvanı ve diğer veri sorumlusu bilgileri gerektiğinde bu metne eklenmelidir.</p>
        <h2 className="text-xl font-semibold">İşlenen bilgiler ve amaçlar</h2>
        <p>Rezervasyon formu aracılığıyla ilettiğiniz ad, e-posta, telefon, oda tercihi, konaklama tarihleri, kişi sayısı ve mesaj içeriği; talebinizi değerlendirmek, size geri dönüş yapmak ve konaklama sürecini planlamak için işlenebilir. Misafir yorumu ve fotoğraf paylaşımlarında gönderdiğiniz içerikler, seçtiğiniz bilgilerle birlikte sitede yayımlanabilir.</p>
        <h2 className="text-xl font-semibold">Hizmet sağlayıcılar</h2>
        <p>Site işlevleri için Supabase altyapısı, rezervasyon bildirimleri için e-posta gönderim hizmeti, otomatik kötüye kullanımı önlemek için Cloudflare Turnstile ve harita görüntülemek için Google Haritalar kullanılabilir. Bu hizmetlerin kullanımı sırasında ilgili sağlayıcılara teknik veriler aktarılabilir; yurt dışına aktarım dahil uygulanacak hukuki şartlar işletme tarafından ayrıca değerlendirilmelidir.</p>
        <h2 className="text-xl font-semibold">Saklama ve haklarınız</h2>
        <p>Veriler, işleme amacı ve yürürlükteki saklama yükümlülükleri gerektirdiği süreyle tutulmalıdır. 6698 sayılı KVKK kapsamındaki erişim, düzeltme, silme ve diğer taleplerinizi yukarıdaki e-posta adresine iletebilirsiniz. Bu metin, işletmenin fiili veri işleme ve saklama uygulamalarıyla uyumlu tutulmalıdır.</p>
      </>}
      {kind === "kullanim" && <>
        <h2 className="text-xl font-semibold">Sitenin kullanımı</h2>
        <p>Bu site, Gölköy Yaşam Resort'un oda, hizmet, tesis ve iletişim bilgilerini sunar. İçerikler bilgilendirme amaçlıdır; siteyi kullanırken yürürlükteki mevzuata ve üçüncü kişilerin haklarına uygun davranılmalıdır.</p>
        <h2 className="text-xl font-semibold">Rezervasyon talepleri</h2>
        <p>İnternet sitesindeki rezervasyon formunun gönderilmesi, tek başına kesinleşmiş rezervasyon anlamına gelmez. Müsaitlik, ücret, ödeme ve iptal koşulları işletme tarafından ayrıca teyit edilir.</p>
        <h2 className="text-xl font-semibold">Görseller ve içerikler</h2>
        <p>Fotoğraflar, metinler ve diğer site içerikleri izinsiz ticari amaçla kopyalanmamalıdır. Hizmetler, fiyatlar ve tesis olanakları zaman içinde değişebilir; güncel bilgi için işletmeyle iletişime geçiniz.</p>
        <h2 className="text-xl font-semibold">Misafir paylaşımları</h2>
        <p>Yorum ve fotoğraf gönderen kişiler, paylaşmaya yetkili oldukları içerikleri iletmelidir. Hukuka aykırı, yanıltıcı veya üçüncü kişilerin haklarını ihlal eden paylaşımlar yayımlanmayabilir ya da kaldırılabilir.</p>
        <h2 className="text-xl font-semibold">İletişim</h2>
        <p>Site kullanımına ilişkin sorularınızı info@golkoyyasamresort.com adresine gönderebilirsiniz.</p>
      </>}
      {kind === "cerezler" && <>
        <h2 className="text-xl font-semibold">Çerez ve yerel depolama nedir?</h2>
        <p>Çerezler, internet sitelerinin tarayıcınıza kaydedebildiği küçük verilerdir. Site ayrıca tercihlerinizi hatırlamak için tarayıcının yerel depolama (localStorage) alanını kullanabilir.</p>
        <h2 className="text-xl font-semibold">Sitemizdeki kullanım</h2>
        <p>Bu sitede oturum ve yönetici girişi gibi işlevlerin çalışması için gerekli teknik depolama kullanılabilir. Çerez bilgilendirmesini kapatma tercihiniz tarayıcınızda saklanır. Rezervasyon formunun güvenliği için Cloudflare Turnstile, harita alanı için Google Haritalar üçüncü taraf teknolojileri kullanabilir.</p>
        <h2 className="text-xl font-semibold">Tercihleriniz</h2>
        <p>Çerezleri tarayıcı ayarlarınızdan yönetebilir veya silebilirsiniz. Gerekli teknolojilerin engellenmesi giriş ya da form işlevlerini etkileyebilir. Bu sitedeki “Anladım” düğmesi yalnızca bilgilendirme mesajını kapatır; reklam veya analitik çerezlerine onay verildiği anlamına gelmez.</p>
        <h2 className="text-xl font-semibold">İletişim</h2>
        <p>Çerezlerle ilgili sorularınız için info@golkoyyasamresort.com adresinden bize ulaşabilirsiniz.</p>
      </>}
    </article>
  </main>;
}

export function CookieNotice() {
  const [visible, setVisible] = useState(() => {
    try { return localStorage.getItem("golkoy_cookie_notice_v1") !== "acknowledged"; }
    catch { return true; }
  });
  if (!visible) return null;
  return <div role="region" aria-label="Çerez bilgilendirmesi" className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 text-white shadow-2xl border-t border-amber-500 p-4 sm:p-5">
    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <p className="text-sm leading-relaxed">Sitemiz, gerekli işlevler ve tercihlerinizi hatırlamak için tarayıcı depolaması kullanır. Harita ve güvenlik hizmetleri üçüncü taraf teknolojileri kullanabilir. <a className="text-amber-300 underline" href="?politika=cerezler">Çerez Politikası</a></p>
      <button type="button" className="shrink-0 bg-amber-500 text-slate-950 font-semibold rounded-lg px-5 py-2 hover:bg-amber-400" onClick={() => { try { localStorage.setItem("golkoy_cookie_notice_v1", "acknowledged"); } catch {} setVisible(false); }}>Anladım</button>
    </div>
  </div>;
}
