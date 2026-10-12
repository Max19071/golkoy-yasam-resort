import { useEffect, useState } from "react";

const originalImages=[
 "./etkili%20bah%C3%A7eden%20otel.jpg",
 "./etkili%20oda.jpg",
 "./etkili%20havuzdan%20otel.jpg",
 "./etkili%20restorant%20sahne.jpg",
 "./etkili%20manej%20ikili.jpg",
 "./etkili%20do%C4%9Fal%20ya%C5%9Fam.jpg"
];
type GalleryImage={id:number;image_url:string;alt_text:string;title:string};
const BASE="https://pekpyiyivttrjjxsrarx.supabase.co";
const KEY="sb_publishable_byqYtROGi5NKkIWiZJ07uw_RMPhuMzS";
export default function Gallery(){
 const [addedImages,setAddedImages]=useState<GalleryImage[]>([]);
 useEffect(()=>{
  const controller=new AbortController();
  fetch(BASE+"/rest/v1/hotel_gallery?select=id,image_url,alt_text,title&is_active=eq.true&order=display_order.asc,id.asc",{
   headers:{apikey:KEY},
   signal:controller.signal
  }).then(r=>{if(!r.ok)throw Error("Galeri yüklenemedi");return r.json();})
    .then((photos:GalleryImage[])=>setAddedImages(photos.filter(p=>p.image_url)))
    .catch(error=>{console.error("Galeri fotoğrafları alınamadı:",error);});
  return ()=>controller.abort();
 },[]);
 return <section id="gallery" className="py-20 bg-slate-50"><div className="max-w-7xl mx-auto px-4">
  <div className="text-center mb-12"><span className="text-amber-600 font-semibold">GALERİ</span><h2 className="text-4xl font-bold mt-3">Tesisten Kareler</h2></div>
  <div className="grid md:grid-cols-3 gap-4">
   {originalImages.map((src,i)=><img key={src} src={src} alt={"Gölköy Yaşam Resort tesis fotoğrafı "+(i+1)} loading="lazy" className="w-full h-72 object-cover rounded-2xl"/>)}
   {addedImages.map(photo=><img key={"gallery-"+photo.id} src={photo.image_url} alt={photo.alt_text||photo.title||"Gölköy Yaşam Resort fotoğrafı"} loading="lazy" className="w-full h-72 object-cover rounded-2xl"/>)}
  </div>
 </div></section>;
}
