import { useEffect, useState } from "react";

const URL_BASE = "https://pekpyiyivttrjjxsrarx.supabase.co";
const KEY = "sb_publishable_byqYtROGi5NKkIWiZJ07uw_RMPhuMzS";

type Room = {
 id: number; name: string; slug: string; description: string;
 price_per_night: number | null; currency: string; capacity: number;
 size_sqm: number | null; features: string[]; cover_image: string;
 gallery_images: string[]; is_active: boolean; display_order: number;
 seo_title: string; seo_description: string;
};
const blank = { name:"",slug:"",description:"",price_per_night:"",capacity:"2",size_sqm:"",features:"",cover_image:"",is_active:true,display_order:"0",seo_title:"",seo_description:"" };
type Form = typeof blank;
const slugify = (s:string) => s.toLocaleLowerCase("tr-TR").replace(/ı/g,"i").replace(/ğ/g,"g").replace(/ü/g,"u").replace(/ş/g,"s").replace(/ö/g,"o").replace(/ç/g,"c").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
export default function RoomsAdmin({token}:{token:string}){
 const [rooms,setRooms]=useState<Room[]>([]);
 const [form,setForm]=useState<Form>(blank);
 const [editing,setEditing]=useState<number|null>(null);
 const [loading,setLoading]=useState(true);
 const [saving,setSaving]=useState(false);
 const [notice,setNotice]=useState("");
 const request=(path:string,options:RequestInit={})=>fetch(URL_BASE+"/rest/v1/"+path,{...options,headers:{apikey:KEY,Authorization:"Bearer "+token,"Content-Type":"application/json",...(options.headers||{})}});
 const load=async()=>{setLoading(true);try{const r=await request("hotel_rooms?select=*&order=display_order.asc,id.asc");if(!r.ok)throw Error("Odalar yüklenemedi.");setRooms(await r.json());setNotice("");}catch(e){setNotice(e instanceof Error?e.message:"Bağlantı hatası.");}finally{setLoading(false);}};
 useEffect(()=>{void load();},[token]);
 const field=(key:keyof Form,value:string|boolean)=>setForm(prev=>({...prev,[key]:value}));
 const edit=(room:Room)=>{setEditing(room.id);setForm({name:room.name,slug:room.slug,description:room.description||"",price_per_night:room.price_per_night==null?"":String(room.price_per_night),capacity:String(room.capacity),size_sqm:room.size_sqm==null?"":String(room.size_sqm),features:(room.features||[]).join(", "),cover_image:room.cover_image||"",is_active:room.is_active,display_order:String(room.display_order),seo_title:room.seo_title||"",seo_description:room.seo_description||""});window.scrollTo({top:0,behavior:"smooth"});};
 const cancel=()=>{setEditing(null);setForm({...blank});setNotice("");};
 const save=async(e:React.FormEvent)=>{e.preventDefault();setNotice("");setSaving(true);try{
  const slug=slugify(form.slug||form.name);
  if(!slug)throw Error("Geçerli bir oda adı girin.");
  const price=form.price_per_night.trim()===""?null:Number(form.price_per_night);
  if(price!==null&&(!Number.isFinite(price)||price<0))throw Error("Fiyat geçerli olmalı.");
  const capacity=Number(form.capacity);
  if(!Number.isInteger(capacity)||capacity<1)throw Error("Kapasite en az 1 olmalı.");
  const size=form.size_sqm.trim()===""?null:Number(form.size_sqm);
  if(size!==null&&(!Number.isInteger(size)||size<1))throw Error("Oda büyüklüğü geçerli olmalı.");
  const order=Number(form.display_order);
  if(!Number.isInteger(order))throw Error("Sıralama tam sayı olmalı.");
  const payload={name:form.name.trim(),slug,description:form.description.trim(),price_per_night:price,currency:"TRY",capacity,size_sqm:size,features:form.features.split(",").map(s=>s.trim()).filter(Boolean),cover_image:form.cover_image.trim(),is_active:form.is_active,display_order:order,seo_title:form.seo_title.trim(),seo_description:form.seo_description.trim(),updated_at:new Date().toISOString()};
  const r=await request(editing===null?"hotel_rooms":"hotel_rooms?id=eq."+editing,{method:editing===null?"POST":"PATCH",headers:{Prefer:"return=minimal"},body:JSON.stringify(payload)});
  if(!r.ok){const detail=await r.json().catch(()=>({}));throw Error(detail.code==="23505"?"Bu kısa bağlantı adı zaten kullanılıyor.":"Kaydedilemedi: "+(detail.message||r.status));}
  cancel();await load();setNotice("Oda bilgileri kaydedildi.");
 }catch(e){setNotice(e instanceof Error?e.message:"Kayıt hatası.");}finally{setSaving(false);}};
 const remove=async(room:Room)=>{if(!window.confirm(room.name+" odasını kalıcı olarak silmek istiyor musunuz?"))return;const r=await request("hotel_rooms?id=eq."+room.id,{method:"DELETE"});if(r.ok){await load();setNotice("Oda silindi.");}else setNotice("Oda silinemedi.");};
 const inputClass="w-full border border-slate-300 rounded-xl px-3 py-2.5 bg-white text-slate-900";
 return <div className="space-y-6">
  <div><h1 className="text-2xl md:text-3xl font-bold">Odalar ve Fiyatlar</h1><p className="text-gray-500 mt-1">Oda bilgilerini yönetin. Genel sitede yayınlama bağlantısını sonraki aşamada kuracağız.</p></div>
  <form onSubmit={save} className="bg-white rounded-2xl border p-4 md:p-6 space-y-4">
   <h2 className="text-xl font-semibold">{editing===null?"Yeni Oda Ekle":"Odayı Düzenle"}</h2>
   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <label className="text-sm font-medium">Oda adı *<input required maxLength={150} className={inputClass} value={form.name} onChange={e=>field("name",e.target.value)}/></label>
    <label className="text-sm font-medium">Kısa bağlantı adı (isteğe bağlı)<input className={inputClass} value={form.slug} onChange={e=>field("slug",e.target.value)} placeholder="ornegin-deluks-oda"/></label>
    <label className="text-sm font-medium">Gecelik fiyat (TL)<input type="number" min="0" step="0.01" className={inputClass} value={form.price_per_night} onChange={e=>field("price_per_night",e.target.value)} placeholder="Boş bırakılabilir"/></label>
    <label className="text-sm font-medium">Misafir kapasitesi *<input required type="number" min="1" step="1" className={inputClass} value={form.capacity} onChange={e=>field("capacity",e.target.value)}/></label>
    <label className="text-sm font-medium">Oda büyüklüğü (m²)<input type="number" min="1" step="1" className={inputClass} value={form.size_sqm} onChange={e=>field("size_sqm",e.target.value)}/></label>
    <label className="text-sm font-medium">Görüntüleme sırası<input type="number" step="1" className={inputClass} value={form.display_order} onChange={e=>field("display_order",e.target.value)}/></label>
   </div>
   <label className="block text-sm font-medium">Oda açıklaması<textarea rows={3} className={inputClass} value={form.description} onChange={e=>field("description",e.target.value)}/></label>
   <label className="block text-sm font-medium">Özellikler (virgülle ayırın)<input className={inputClass} value={form.features} onChange={e=>field("features",e.target.value)} placeholder="Wi-Fi, Klima, Balkon"/></label>
   <label className="block text-sm font-medium">Kapak görseli adresi<input className={inputClass} value={form.cover_image} onChange={e=>field("cover_image",e.target.value)} placeholder="https://..."/></label>
   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <label className="text-sm font-medium">Google sayfa başlığı<input className={inputClass} maxLength={180} value={form.seo_title} onChange={e=>field("seo_title",e.target.value)}/></label>
    <label className="text-sm font-medium">Google açıklaması<input className={inputClass} maxLength={300} value={form.seo_description} onChange={e=>field("seo_description",e.target.value)}/></label>
   </div>
   <label className="flex items-center gap-2"><input type="checkbox" checked={form.is_active} onChange={e=>field("is_active",e.target.checked)}/> Yayına hazır (aktif)</label>
   <div className="flex flex-wrap gap-2"><button disabled={saving} className="bg-amber-500 text-white font-semibold px-5 py-3 rounded-xl disabled:opacity-50">{saving?"Kaydediliyor...":editing===null?"Odayı Kaydet":"Değişiklikleri Kaydet"}</button>{editing!==null&&<button type="button" onClick={cancel} className="border px-5 py-3 rounded-xl">Vazgeç</button>}</div>
  </form>
  {notice&&<p role="status" className="bg-white border rounded-xl p-3 text-sm">{notice}</p>}
  <div className="space-y-3"><h2 className="text-xl font-semibold">Kayıtlı Odalar ({rooms.length})</h2>{loading?<p>Yükleniyor...</p>:rooms.length===0?<p className="bg-white p-6 rounded-xl">Henüz oda eklenmedi.</p>:rooms.map(room=><article key={room.id} className="bg-white border rounded-2xl p-4 flex flex-col sm:flex-row gap-4 justify-between"><div className="min-w-0"><h3 className="font-bold">{room.name}</h3><p className="text-sm text-gray-500">{room.price_per_night==null?"Fiyat belirtilmedi":Number(room.price_per_night).toLocaleString("tr-TR")+" TL / gece"} · {room.capacity} kişi · {room.is_active?"Aktif":"Pasif"}</p></div><div className="flex gap-2"><button onClick={()=>edit(room)} className="px-4 py-2 border rounded-xl">Düzenle</button><button onClick={()=>remove(room)} className="px-4 py-2 border border-red-200 text-red-700 rounded-xl">Sil</button></div></article>)}</div>
 </div>;
}
