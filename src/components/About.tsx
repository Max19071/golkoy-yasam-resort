import {useSiteTexts} from "./useSiteTexts";
export default function About(){
 const t=useSiteTexts();
 return <section id="about" className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4">
   <div className="resort-section-banner mb-10"><div><span>HAKKIMIZDA</span><h2>Gölköy Yaşam Resort</h2></div><p>{t("about_heading","Doğanın İçinde, Şehrin Hemen Yanında")}</p></div>
   <div className="grid md:grid-cols-2 gap-10 items-center">
   <div>
    <h3 className="text-xl font-semibold text-gray-800 mb-6">{t("about_heading","Doğanın İçinde, Şehrin Hemen Yanında…")}</h3>
    <div className="space-y-4 text-gray-600 leading-8">
     <p>{t("about_paragraph_1","Kastamonu şehir merkezine yalnızca 5 km mesafede, Daday yolu üzerinde yer alan Gölköy Yaşam Resort, doğayla iç içe konumu, huzurlu atmosferi ve konforlu konaklama imkânlarıyla misafirlerine şehirden uzaklaşmadan doğayla buluşabilecekleri özel bir yaşam alanı sunuyor.")}</p>
     <p>{t("about_paragraph_2","Yeşillikler içerisinde, temiz havanın ve sakinliğin tadını çıkarırken rahat ve konforlu odalarımızda günün yorgunluğunu geride bırakabilir; doğanın huzuruyla dinlendirici bir konaklama deneyimi yaşayabilirsiniz.")}</p>
     <p>{t("about_paragraph_3","Gölköy Yaşam Resort’ta tatilinize hareket ve farklı deneyimler de katabilirsiniz. At binme deneyimiyle doğayla çok daha özel bir bağ kurabilir, tenis kortumuzda spor yaparak keyifli ve enerjik vakit geçirebilirsiniz. Doğanın içinde spor, dinlenme ve eğlenceyi bir arada yaşayabileceğiniz bir ortam sizi bekliyor.")}</p>
     <p>{t("about_paragraph_4","Akşamları Gölköy’ün atmosferi başka bir keyfe dönüşüyor. Cuma ve cumartesi akşamları canlı müzik eşliğinde sevdiklerinizle güzel vakit geçirebilir, gününüzü keyifli bir şekilde tamamlayabilirsiniz.")}</p>
     <p className="text-gray-800 font-semibold">{t("about_closing","Doğa, huzur, konfor, spor ve eğlence… Kastamonu’da hepsi Gölköy Yaşam Resort’ta bir arada.")}</p>
    </div>
   </div>
   <img className="rounded-3xl shadow-xl w-full h-96 object-cover" src="./etkili%20bah%C3%A7eden%20otel.jpg" alt="Gölköy Yaşam Resort"/>
   </div>
  </div>
 </section>
}