-- Gölköy Yaşam Resort: yönetilebilir site metinleri
create table if not exists public.site_texts (
  key text primary key,
  label text not null,
  section text not null,
  content text not null default '',
  updated_at timestamptz not null default now()
);
alter table public.site_texts enable row level security;
drop policy if exists "site_texts_public_read" on public.site_texts;
create policy "site_texts_public_read" on public.site_texts for select to anon, authenticated using (true);
drop policy if exists "site_texts_admin_insert" on public.site_texts;
create policy "site_texts_admin_insert" on public.site_texts for insert to authenticated with check (public.is_admin());
drop policy if exists "site_texts_admin_update" on public.site_texts;
create policy "site_texts_admin_update" on public.site_texts for update to authenticated using (public.is_admin()) with check (public.is_admin());
insert into public.site_texts (key,label,section,content) values
('hero_eyebrow','Üst küçük yazı','Ana Sayfa','Konfor · Huzur · Doğa'),
('hero_title','Ana başlık','Ana Sayfa','Gölköy Yaşam Resort'),
('hero_description','Ana tanıtım yazısı','Ana Sayfa','Doğayla iç içe, sakin ve konforlu bir konaklama deneyimi.'),
('about_heading','Hakkımızda başlığı','Hakkımızda','Doğanın İçinde, Şehrin Hemen Yanında…'),
('about_paragraph_1','1. paragraf','Hakkımızda','Kastamonu şehir merkezine yalnızca 5 km mesafede, Daday yolu üzerinde yer alan Gölköy Yaşam Resort, doğayla iç içe konumu, huzurlu atmosferi ve konforlu konaklama imkânlarıyla misafirlerine şehirden uzaklaşmadan doğayla buluşabilecekleri özel bir yaşam alanı sunuyor.'),
('about_paragraph_2','2. paragraf','Hakkımızda','Yeşillikler içerisinde, temiz havanın ve sakinliğin tadını çıkarırken rahat ve konforlu odalarımızda günün yorgunluğunu geride bırakabilir; doğanın huzuruyla dinlendirici bir konaklama deneyimi yaşayabilirsiniz.'),
('about_paragraph_3','3. paragraf','Hakkımızda','Gölköy Yaşam Resort’ta tatilinize hareket ve farklı deneyimler de katabilirsiniz. At binme deneyimiyle doğayla çok daha özel bir bağ kurabilir, tenis kortumuzda spor yaparak keyifli ve enerjik vakit geçirebilirsiniz. Doğanın içinde spor, dinlenme ve eğlenceyi bir arada yaşayabileceğiniz bir ortam sizi bekliyor.'),
('about_paragraph_4','4. paragraf','Hakkımızda','Akşamları Gölköy’ün atmosferi başka bir keyfe dönüşüyor. Cuma ve cumartesi akşamları canlı müzik eşliğinde sevdiklerinizle güzel vakit geçirebilir, gününüzü keyifli bir şekilde tamamlayabilirsiniz.'),
('about_closing','Kapanış yazısı','Hakkımızda','Doğa, huzur, konfor, spor ve eğlence… Kastamonu’da hepsi Gölköy Yaşam Resort’ta bir arada.'),
('booking_heading','Rezervasyon başlığı','Rezervasyon','Hemen Rezervasyon Yapın'),
('booking_description','Rezervasyon açıklaması','Rezervasyon','Tatilinizi planlamaya bugün başlayın! Profesyonel ekibimiz size en uygun seçenekleri sunmak için hazır.'),
('footer_description','Alt bölüm tanıtımı','Alt Bölüm','15 yıldan fazla deneyimimizle, misafirlerimize unutulmaz tatil deneyimleri sunuyoruz. Konfor, kalite ve hizmet bir arada.')
on conflict (key) do nothing;
