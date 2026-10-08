import { useEffect, useState } from "react";

const SUPABASE_URL="https://pekpyiyivttrjjxsrarx.supabase.co";
const SUPABASE_KEY="sb_publishable_byqYtROGi5NKkIWiZJ07uw_RMPhuMzS";

type Review={id:number;guest_name:string;visit_type:string;rating:number;review_text:string;photo_urls:string[]};

function ReviewPhotos({paths,name}:{paths:string[];name:string}){
 const [index,setIndex]=useState(0);
 const [urls,setUrls]=useState<string[]>([]);
 useEffect(()=>{let active=true; Promise.all((paths||[]).map(async path=>{
  const r=await fetch(`${SUPABASE_URL}/storage/v1/object/sign/guest-photos/${encodeURIComponent(path)}`,{method:"POST",headers:{apikey:SUPABASE_KEY,Authorization:`Bearer ${SUPABASE_KEY}`,"Content-Type":"application/json"},body:JSON.stringify({expiresIn:3600})});
  if(!r.ok)return ""; const d=await r.json(); return d.signedURL?`${SUPABASE_URL}/storage/v1${d.signedURL}`:"";
 })).then(x=>{if(active)setUrls(x.filter(Boolean))}); return()=>{active=false}},[paths]);
 if(!urls.length)return null;
 return <div className="relative mb-3 -mx-4 -mt-4 overflow-hidden rounded-t-2xl bg-slate-100"><img src={urls[index]} alt={`${name} misafir fotoğrafı`} className="w-full h-36 sm:h-40 object-cover"/>{urls.length>1&&<><button type="button" onClick={()=>setIndex(i=>(i-1+urls.length)%urls.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/55 text-white text-3xl flex items-center justify-center">‹</button><button type="button" onClick={()=>setIndex(i=>(i+1)%urls.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/55 text-white text-3xl flex items-center justify-center">›</button><span className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/55 text-white text-xs">{index+1} / {urls.length}</span></>}</div>
}

export default function GuestExperiences({allReviews=false}:{allReviews?:boolean}){
 const [open,setOpen]=useState(false);
 const [sent,setSent]=useState(false);
 const [sending,setSending]=useState(false);
 const [error,setError]=useState("");
 const [reviews,setReviews]=useState<Review[]>([]);
 const [visibleCount,setVisibleCount]=useState(9);
 const displayedReviews=allReviews?reviews.slice(0,visibleCount):reviews.slice(0,3);

 useEffect(()=>{fetch(`${SUPABASE_URL}/rest/v1/guest_reviews?select=id,guest_name,visit_type,rating,review_text,photo_urls&approved=eq.true&order=created_at.desc`,{headers:{apikey:SUPABASE_KEY,Authorization:`Bearer ${SUPABASE_KEY}`}})
  .then(r=>r.ok?r.json():[]).then(setReviews).catch(()=>setReviews([]))},[]);

 const submit=async(e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault(); setSending(true); setError("");
  const form=e.currentTarget; const data=new FormData(form);
  const files=(data.getAll("photos") as File[]).filter(f=>f.size>0);
  if(files.length>3){setError("En fazla 3 fotoğraf yükleyebilirsiniz.");setSending(false);return}
  try{
   const paths:string[]=[];
   for(const file of files){
    if(file.size>5*1024*1024) throw new Error("Her fotoğraf en fazla 5 MB olabilir.");
    if(!["image/jpeg","image/png","image/webp"].includes(file.type)) throw new Error("Yalnızca JPG, PNG veya WebP fotoğraf yükleyebilirsiniz.");
    const ext=file.name.split(".").pop()||"jpg";
    const path=`${Date.now()}-${crypto.randomUUID()}.${ext}`;
    const up=await fetch(`${SUPABASE_URL}/storage/v1/object/guest-photos/${path}`,{method:"POST",headers:{apikey:SUPABASE_KEY,Authorization:`Bearer ${SUPABASE_KEY}`,"Content-Type":file.type,"x-upsert":"false"},body:file});
    if(!up.ok) throw new Error("Fotoğraf yüklenemedi.");
    paths.push(path);
   }
   const res=await fetch(`${SUPABASE_URL}/rest/v1/guest_reviews`,{method:"POST",headers:{apikey:SUPABASE_KEY,Authorization:`Bearer ${SUPABASE_KEY}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify({
    guest_name:data.get("guest_name"),visit_type:data.get("visit_type"),rating:Number(data.get("rating")),review_text:data.get("review_text"),photo_urls:paths,approved:false
   })});
   if(!res.ok) throw new Error("Yorum gönderilemedi.");
   setSent(true); form.reset();
  }catch(err){setError(err instanceof Error?err.message:"Gönderim sırasında bir hata oluştu.");}
  finally{setSending(false)}
 };

 return <section id="guest-experiences" className="py-14 bg-white"><div className="max-w-6xl mx-auto px-4">
  <div className="text-center mb-12"><span className="text-amber-600 font-semibold">MİSAFİRLERİMİZİN GÖZÜNDEN</span><h2 className="text-3xl font-bold mt-3">{allReviews?"Misafir Yorumları":"Deneyiminizi Paylaşın"}</h2><p className="mt-4 text-gray-600 max-w-2xl mx-auto">Gölköy Yaşam Resort deneyiminizi yorum ve fotoğraflarınızla paylaşın. Gönderiler, yayınlanmadan önce yönetici onayından geçecektir.</p></div>
  {reviews.length>0&&<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">{displayedReviews.map(r=><article key={r.id} className="rounded-2xl border bg-slate-50 p-4 shadow-sm overflow-hidden"><ReviewPhotos paths={r.photo_urls||[]} name={r.guest_name}/><div className="text-amber-500 text-base tracking-wider">{"★".repeat(r.rating)}{"☆".repeat(5-r.rating)}</div><p className={`mt-2 text-sm text-gray-700 leading-6 ${allReviews?"whitespace-pre-wrap break-words":"line-clamp-3"}`}>“{r.review_text}”</p><div className="mt-3 text-sm"><strong>{r.guest_name}</strong><span className="text-gray-500"> · {r.visit_type}</span></div></article>)}</div>}
  <div className="text-center flex flex-wrap items-center justify-center gap-3">
   {allReviews?<a href="./#guest-experiences" className="px-6 py-3 rounded-full border border-amber-500 text-amber-700 font-semibold hover:bg-amber-50">Ana Sayfaya Dön</a>:<a href="?yorumlar=1" className="px-6 py-3 rounded-full border border-amber-500 text-amber-700 font-semibold hover:bg-amber-50">Diğer Yorumlar</a>}
   {allReviews&&visibleCount<reviews.length&&<button type="button" onClick={()=>setVisibleCount(n=>n+9)} className="px-6 py-3 rounded-full border border-slate-300 font-semibold">Daha Fazla Göster</button>}
   <button type="button" onClick={()=>{setOpen(true);setSent(false);setError("")}} className="px-7 py-3 rounded-full bg-amber-500 text-white font-semibold shadow hover:shadow-lg transition">Deneyimini Paylaş</button></div>
  {open&&<div className="fixed inset-0 z-[110] bg-black/70 flex items-center justify-center p-4" onClick={()=>setOpen(false)}><div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-7 md:p-9" onClick={e=>e.stopPropagation()}>
   <button type="button" onClick={()=>setOpen(false)} aria-label="Kapat" className="absolute top-4 right-5 text-3xl text-gray-500">×</button><h3 className="text-2xl font-bold">Deneyimini Paylaş</h3><p className="mt-2 text-sm text-gray-500">Yorumunuz ve fotoğraflarınız yayınlanmadan önce yönetici onayına gönderilir.</p>
   {sent?<div className="mt-8 rounded-2xl bg-green-50 p-6 text-green-800"><strong>Teşekkür ederiz.</strong><p className="mt-2">Paylaşımınız alındı ve onaya gönderildi.</p></div>:
   <form onSubmit={submit} className="mt-7 space-y-5">
    <div><label className="block font-medium mb-2">Adınız</label><input name="guest_name" required maxLength={80} className="w-full rounded-xl border px-4 py-3" placeholder="Adınız veya görünmesini istediğiniz isim"/></div>
    <div><label className="block font-medium mb-2">Ziyaret Türü</label><select name="visit_type" className="w-full rounded-xl border px-4 py-3"><option>Konaklama</option><option>Restoran</option><option>Etkinlik</option><option>Günübirlik Ziyaret</option></select></div>
    <div><label className="block font-medium mb-2">Değerlendirme</label><select name="rating" className="w-full rounded-xl border px-4 py-3"><option value="5">★★★★★</option><option value="4">★★★★☆</option><option value="3">★★★☆☆</option><option value="2">★★☆☆☆</option><option value="1">★☆☆☆☆</option></select></div>
    <div><label className="block font-medium mb-2">Yorumunuz</label><textarea name="review_text" required maxLength={2000} rows={4} className="w-full rounded-xl border px-4 py-3" placeholder="Deneyiminizi bizimle paylaşın..."/></div>
    <div><label className="block font-medium mb-2">Fotoğraf Ekleyin <span className="font-normal text-gray-500">(en fazla 3, fotoğraf başına 5 MB)</span></label><input name="photos" type="file" accept="image/jpeg,image/png,image/webp" multiple className="w-full rounded-xl border px-4 py-3 bg-slate-50"/></div>
    <label className="flex gap-3 text-sm text-gray-600"><input required type="checkbox" className="mt-1"/><span>Gönderdiğim yorum ve fotoğrafların Gölköy Yaşam Resort internet sitesinde yayınlanmasını kabul ediyorum.</span></label>
    {error&&<div className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</div>}
    <button disabled={sending} className="w-full rounded-xl bg-amber-500 disabled:opacity-60 text-white font-semibold py-3">{sending?"Gönderiliyor...":"Onaya Gönder"}</button>
   </form>}
  </div></div>}
 </div></section>
}
