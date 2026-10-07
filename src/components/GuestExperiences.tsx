import { useState } from "react";

const sampleReviews = [
  { name: "Misafir Yorumu", type: "Konaklama", stars: 5, text: "Doğayla iç içe, sakin ve keyifli bir deneyimdi. Burada onaylanan misafir yorumları ve fotoğrafları yayınlanacak." },
  { name: "Ziyaretçi Yorumu", type: "Günübirlik Ziyaret", stars: 5, text: "Tesisin atmosferini çok beğendik. Bu alan, gerçek misafir paylaşımları geldikçe onların yorumlarıyla güncellenecek." }
];

export default function GuestExperiences(){
 const [open,setOpen]=useState(false);
 const [sent,setSent]=useState(false);
 const submit=(e:React.FormEvent<HTMLFormElement>)=>{e.preventDefault();setSent(true)};
 return <section id="guest-experiences" className="py-20 bg-white"><div className="max-w-6xl mx-auto px-4">
  <div className="text-center mb-12">
   <span className="text-amber-600 font-semibold">MİSAFİRLERİMİZİN GÖZÜNDEN</span>
   <h2 className="text-4xl font-bold mt-3">Deneyiminizi Paylaşın</h2>
   <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Gölköy Yaşam Resort deneyiminizi yorum ve fotoğraflarınızla paylaşın. Gönderiler, yayınlanmadan önce yönetici onayından geçecektir.</p>
  </div>
  <div className="grid md:grid-cols-2 gap-6 mb-10">{sampleReviews.map((r,i)=><article key={i} className="rounded-3xl border bg-slate-50 p-7 shadow-sm">
   <div className="text-amber-500 text-xl tracking-wider">{"★".repeat(r.stars)}</div>
   <p className="mt-4 text-gray-700 leading-7">“{r.text}”</p>
   <div className="mt-5"><strong>{r.name}</strong><span className="text-gray-500"> · {r.type}</span></div>
  </article>)}</div>
  <div className="text-center"><button type="button" onClick={()=>{setOpen(true);setSent(false)}} className="px-7 py-3 rounded-full bg-amber-500 text-white font-semibold shadow hover:shadow-lg transition">Deneyimini Paylaş</button></div>
  {open&&<div className="fixed inset-0 z-[110] bg-black/70 flex items-center justify-center p-4" onClick={()=>setOpen(false)}>
   <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-7 md:p-9" onClick={e=>e.stopPropagation()}>
    <button type="button" onClick={()=>setOpen(false)} aria-label="Kapat" className="absolute top-4 right-5 text-3xl text-gray-500">×</button>
    <h3 className="text-2xl font-bold">Deneyimini Paylaş</h3>
    <p className="mt-2 text-sm text-gray-500">Bu ilk sürüm tasarım önizlemesidir. Veritabanı bağlanana kadar gönderiler kaydedilmez.</p>
    {sent?<div className="mt-8 rounded-2xl bg-green-50 p-6 text-green-800"><strong>Teşekkür ederiz.</strong><p className="mt-2">Formun çalışma şekli bu şekilde olacak. Gerçek sistemde gönderiniz yönetici onayına iletilecek.</p></div>:
    <form onSubmit={submit} className="mt-7 space-y-5">
     <div><label className="block font-medium mb-2">Adınız</label><input required className="w-full rounded-xl border px-4 py-3" placeholder="Adınız veya görünmesini istediğiniz isim"/></div>
     <div><label className="block font-medium mb-2">Ziyaret Türü</label><select className="w-full rounded-xl border px-4 py-3"><option>Konaklama</option><option>Restoran</option><option>Etkinlik</option><option>Günübirlik Ziyaret</option></select></div>
     <div><label className="block font-medium mb-2">Değerlendirme</label><select className="w-full rounded-xl border px-4 py-3"><option>★★★★★</option><option>★★★★☆</option><option>★★★☆☆</option><option>★★☆☆☆</option><option>★☆☆☆☆</option></select></div>
     <div><label className="block font-medium mb-2">Yorumunuz</label><textarea required rows={4} className="w-full rounded-xl border px-4 py-3" placeholder="Deneyiminizi bizimle paylaşın..."/></div>
     <div><label className="block font-medium mb-2">Fotoğraf Ekleyin <span className="font-normal text-gray-500">(en fazla 3)</span></label><input type="file" accept="image/*" multiple className="w-full rounded-xl border px-4 py-3 bg-slate-50"/><p className="mt-2 text-xs text-gray-500">Fotoğraflar da yayınlanmadan önce kontrol edilecektir.</p></div>
     <label className="flex gap-3 text-sm text-gray-600"><input required type="checkbox" className="mt-1"/><span>Gönderdiğim yorum ve fotoğrafların Gölköy Yaşam Resort internet sitesinde yayınlanmasını kabul ediyorum.</span></label>
     <button className="w-full rounded-xl bg-amber-500 text-white font-semibold py-3">Onaya Gönder</button>
    </form>}
   </div>
  </div>}
 </div></section>
}
