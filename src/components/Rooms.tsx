import { useEffect, useState } from "react";

const URL_BASE = "https://pekpyiyivttrjjxsrarx.supabase.co";
const KEY = "sb_publishable_byqYtROGi5NKkIWiZJ07uw_RMPhuMzS";

type Room = {
 id: number; name: string; slug: string; description: string;
 price_per_night: number | null; prices_by_occupancy?: Record<string, number> | null; currency: string; capacity: number;
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
 const [occupancyPrices,setOccupancyPrices]=useState<Record<string,string>>({});
 const [editing,setEditing]=useState<number|null>(null);
 const [loading,setLoading]=useState(true);
 const [saving,setSaving]=useState(false);
 const [uploading,setUploading]=useState(false);
 const [selectedImage,setSelectedImage]=useState<File|null>(null);
 const [selectedGalleryImage, setSelectedGalleryImage] = useState<File | null>(null);
 const [notice,setNotice]=useState("");
 const request=(path:string,options:RequestInit={})=>fetch(URL_BASE+"/rest/v1/"+path,{...options,headers:{apikey:KEY,Authorization:"Bearer "+token,"Content-Type":"application/json",...(options.headers||{})}});
 const load=async()=>{setLoading(true);try{const r=await request("hotel_rooms?select=*&order=display_order.asc,id.asc");if(!r.ok)throw Error("Odalar yüklenemedi.");setRooms(await r.json());setNotice("");}catch(e){setNotice(e instanceof Error?e.message:"Bağlantı hatası.");}finally{setLoading(false);}};
 useEffect(()=>{void load();},[token]);
 const field=(key:keyof Form,value:string|boolean)=>setForm(prev=>({...prev,[key]:value}));
 const edit=(room:Room)=>{setEditing(room.id);setForm({name:room.name,slug:room.slug,description:room.description||"",price_per_night:room.price_per_night==null?"":String(room.price_per_night),capacity:String(room.capacity),size_sqm:room.size_sqm==null?"":String(room.size_sqm),features:(room.features||[]).join(", "),cover_image:room.cover_image||"",is_active:room.is_active,display_order:String(room.display_order),seo_title:room.seo_title||"",seo_description:room.seo_description||""});setOccupancyPrices(Object.fromEntries(Object.entries(room.prices_by_occupancy||{}).map(([k,v])=>[k,String(v)])));window.scrollTo({top:0,behavior:"smooth"});};
 const cancel=()=>{setEditing(null);setForm({...blank});setSelectedImage(null);setOccupancyPrices({});setNotice("");};
 const save=async(e:React.FormEvent)=>{e.preventDefault();setNotice("");setSaving(true);try{
  const slug=slugify(form.slug||form.name);
  if(!slug)throw Error("Geçerli bir oda adı girin.");
  const capacity=Number(form.capacity);
  if(!Number.isInteger(capacity)||capacity<1)throw Error("Kapasite en az 1 olmalı.");
  const pricesByOccupancy:Record<string,number>={};
  for(let i=1;i<=capacity;i++){
   const value=(occupancyPrices[String(i)]||"").trim();
   if(value==="")continue;
   const amount=Number(value);
   if(!Number.isFinite(amount)||amount<0)throw Error(i+" kişilik fiyat geçerli olmalı.");
   pricesByOccupancy[String(i)]=amount;
  }
  const filled=Object.keys(pricesByOccupancy).map(Number).sort((a,b)=>a-b);
  const price=filled.length?pricesByOccupancy[String(filled[0])]:null;
  const size=form.size_sqm.trim()===""?null:Number(form.size_sqm);
  if(size!==null&&(!Number.isInteger(size)||size<1))throw Error("Oda büyüklüğü geçerli olmalı.");
  const order=Number(form.display_order);
  if(!Number.isInteger(order))throw Error("Sıralama tam sayı olmalı.");
  const payload={name:form.name.trim(),slug,description:form.description.trim(),price_per_night:price,prices_by_occupancy:pricesByOccupancy,currency:"TRY",capacity,size_sqm:size,features:form.features.split(",").map(s=>s.trim()).filter(Boolean),cover_image:form.cover_image.trim(),is_active:form.is_active,display_order:order,seo_title:form.seo_title.trim(),seo_description:form.seo_description.trim(),updated_at:new Date().toISOString()};
  const r=await request(editing===null?"hotel_rooms":"hotel_rooms?id=eq."+editing,{method:editing===null?"POST":"PATCH",headers:{Prefer:"return=minimal"},body:JSON.stringify(payload)});
  if(!r.ok){const detail=await r.json().catch(()=>({}));throw Error(detail.code==="23505"?"Bu kısa bağlantı adı zaten kullanılıyor.":"Kaydedilemedi: "+(detail.message||r.status));}
  cancel();await load();setNotice("Oda bilgileri kaydedildi.");
 }catch(e){setNotice(e instanceof Error?e.message:"Kayıt hatası.");}finally{setSaving(false);}};
 const uploadImage=async()=>{if(!selectedImage)return;setNotice("");if(!["image/jpeg","image/png","image/webp"].includes(selectedImage.type)){setNotice("Yalnızca JPG, PNG veya WebP fotoğraf yükleyebilirsiniz.");return;}if(selectedImage.size>5*1024*1024){setNotice("Fotoğraf en fazla 5 MB olabilir.");return;}setUploading(true);try{const ext=selectedImage.type==="image/png"?"png":selectedImage.type==="image/webp"?"webp":"jpg";const path=`rooms/${crypto.randomUUID()}.${ext}`;const response=await fetch(`${URL_BASE}/storage/v1/object/hotel-images/${path}`,{method:"POST",headers:{apikey:KEY,Authorization:"Bearer "+token,"Content-Type":selectedImage.type,"x-upsert":"false"},body:selectedImage});if(!response.ok){const detail=await response.json().catch(()=>({}));throw new Error("Fotoğraf yüklenemedi: "+(detail.message||response.status));}field("cover_image",`${URL_BASE}/storage/v1/object/public/hotel-images/${path}`);setSelectedImage(null);setNotice("Fotoğraf yüklendi. Odaya bağlamak için Odayı Kaydet veya Değişiklikleri Kaydet düğmesine basın.");}catch(e){setNotice(e instanceof Error?e.message:"Fotoğraf yüklenemedi.");}finally{setUploading(false);}};
 const uploadGalleryImage = async () => {
  if (!selectedGalleryImage || editing === null) {
    setNotice("Önce kayıtlı bir odayı düzenlemek için açın ve fotoğraf seçin.");
    return;
  }

  if (!["image/jpeg", "image/png", "image/webp"].includes(selectedGalleryImage.type)) {
    setNotice("Yalnızca JPG, PNG veya WebP fotoğraf yükleyebilirsiniz.");
    return;
  }

  if (selectedGalleryImage.size > 5 * 1024 * 1024) {
    setNotice("Fotoğraf en fazla 5 MB olabilir.");
    return;
  }

  setUploading(true);
  setNotice("");

  try {
    const ext = selectedGalleryImage.type === "image/png" ? "png"
      : selectedGalleryImage.type === "image/webp" ? "webp" : "jpg";

    const path = `rooms/${crypto.randomUUID()}.${ext}`;

    const response = await fetch(
      `${URL_BASE}/storage/v1/object/hotel-images/${path}`,
      {
        method: "POST",
        headers: {
          apikey: KEY,
          Authorization: "Bearer " + token,
          "Content-Type": selectedGalleryImage.type,
          "x-upsert": "false"
        },
        body: selectedGalleryImage
      }
    );

    if (!response.ok) {
      const detail = await response.json().catch(() => ({}));
      throw new Error("Fotoğraf yüklenemedi: " + (detail.message || response.status));
    }

    const imageUrl = `${URL_BASE}/storage/v1/object/public/hotel-images/${path}`;
    const room = rooms.find(r => r.id === editing);

    if (!room) throw new Error("Oda kaydı bulunamadı.");

    const updatedImages = [...(room.gallery_images || []), imageUrl];

    const saveResponse = await request(
      "hotel_rooms?id=eq." + editing,
      {
        method: "PATCH",
        headers: { Prefer: "return=minimal" },
        body: JSON.stringify({ gallery_images: updatedImages })
      }
    );

    if (!saveResponse.ok) {
      throw new Error("Fotoğraf yüklendi ancak oda galerisine kaydedilemedi.");
    }

    setSelectedGalleryImage(null);
    await load();
    setNotice("Fotoğraf oda galerisine başarıyla eklendi.");
  } catch (e) {
    setNotice(e instanceof Error ? e.message : "Galeri fotoğrafı yüklenemedi.");
  } finally {
    setUploading(false);
  }
};
  const removeGalleryImage = async (imageIndex: number) => {
    if (editing === null) return;

    const room = rooms.find(r => r.id === editing);
    if (!room) return;

    const images = room.gallery_images || [];
    if (imageIndex < 0 || imageIndex >= images.length) return;

    if (!window.confirm("Bu fotoğrafı galeriden silmek istiyor musunuz?")) {
      return;
    }

    setSaving(true);
    setNotice("");

    try {
      const updatedImages = images.filter(
        (_, index) => index !== imageIndex
      );

      const response = await request(
        "hotel_rooms?id=eq." + editing,
        {
          method: "PATCH",
          headers: { Prefer: "return=minimal" },
          body: JSON.stringify({
            gallery_images: updatedImages
          })
        }
      );

      if (!response.ok) {
        throw new Error("Fotoğraf galeriden silinemedi.");
      }

      await load();
      setNotice("Seçilen fotoğraf galeriden kaldırıldı.");
    } catch (error) {
      setNotice(
        error instanceof Error ? error.message : "Silme hatası."
      );
    } finally {
      setSaving(false);
    }
  };

 const remove=async(room:Room)=>{if(!window.confirm(room.name+" odasını kalıcı olarak silmek istiyor musunuz?"))return;const r=await request("hotel_rooms?id=eq."+room.id,{method:"DELETE"});if(r.ok){await load();setNotice("Oda silindi.");}else setNotice("Oda silinemedi.");};
 const inputClass="w-full border border-slate-300 rounded-xl px-3 py-2.5 bg-white text-slate-900";
 return <div className="space-y-6">
  <div><h1 className="text-2xl md:text-3xl font-bold">Odalar ve Fiyatlar</h1><p className="text-gray-500 mt-1">Oda bilgilerini yönetin. Genel sitede yayınlama bağlantısını sonraki aşamada kuracağız.</p></div>
  <form onSubmit={save} className="bg-white rounded-2xl border p-4 md:p-6 space-y-4">
   <h2 className="text-xl font-semibold">{editing===null?"Yeni Oda Ekle":"Odayı Düzenle"}</h2>
   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <label className="text-sm font-medium">Oda adı *<input required maxLength={150} className={inputClass} value={form.name} onChange={e=>field("name",e.target.value)}/></label>
    <label className="text-sm font-medium">Kısa bağlantı adı (isteğe bağlı)<input className={inputClass} value={form.slug} onChange={e=>field("slug",e.target.value)} placeholder="ornegin-deluks-oda"/></label>
    <div className="text-sm font-medium md:col-span-2">
      <p className="mb-2">Kişi sayısına göre gecelik fiyatlar (TL)</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
       {Array.from({length:Math.min(20,Math.max(0,Number(form.capacity)||0))},(_,index)=>index+1).map(count=>(
        <label key={count} className="block text-sm">{count} Kişilik
         <input type="number" min="0" step="0.01" className={inputClass} value={occupancyPrices[String(count)]||""} onChange={e=>setOccupancyPrices(prev=>({...prev,[String(count)]:e.target.value}))} placeholder="Fiyat girin"/>
        </label>
       ))}
      </div>
      <p className="mt-2 text-xs text-gray-500">Boş bırakılan kişi sayıları için fiyat gösterilmez. Kapasiteyi değiştirdiğinizde alan sayısı güncellenir.</p>
     </div>
    <label className="text-sm font-medium">Misafir kapasitesi *<input required type="number" min="1" step="1" className={inputClass} value={form.capacity} onChange={e=>field("capacity",e.target.value)}/></label>
    <label className="text-sm font-medium">Oda büyüklüğü (m²)<input type="number" min="1" step="1" className={inputClass} value={form.size_sqm} onChange={e=>field("size_sqm",e.target.value)}/></label>
    <label className="text-sm font-medium">Görüntüleme sırası<input type="number" step="1" className={inputClass} value={form.display_order} onChange={e=>field("display_order",e.target.value)}/></label>
   </div>
   <label className="block text-sm font-medium">Oda açıklaması<textarea rows={3} className={inputClass} value={form.description} onChange={e=>field("description",e.target.value)}/></label>
   <label className="block text-sm font-medium">Özellikler (virgülle ayırın)<input className={inputClass} value={form.features} onChange={e=>field("features",e.target.value)} placeholder="Wi-Fi, Klima, Balkon"/></label>
   <div className="border rounded-xl p-4 space-y-3"><label className="block text-sm font-medium">Bilgisayardan oda fotoğrafı seçin (JPG, PNG, WebP; en fazla 5 MB)<input type="file" accept="image/jpeg,image/png,image/webp" className="block w-full mt-2 text-sm" onChange={e=>setSelectedImage(e.target.files?.[0]||null)}/></label><button type="button" onClick={uploadImage} disabled={!selectedImage||uploading||saving} className="bg-slate-800 text-white rounded-xl px-4 py-2.5 disabled:opacity-50">{uploading?"Fotoğraf yükleniyor...":"Fotoğrafı Yükle"}</button><p className="text-sm text-gray-500">Yükledikten sonra oda bilgilerini ayrıca kaydedin.</p></div>
   {editing !== null && (
  <div className="border rounded-xl p-4 space-y-3">
    <h3 className="font-semibold">Oda ve Banyo Fotoğrafları</h3>
    <input
      type="file"
      accept="image/jpeg,image/png,image/webp"
      onChange={(e) =>
        setSelectedGalleryImage(e.target.files?.[0] || null)
      }
    />
    <button
      type="button"
      onClick={uploadGalleryImage}
      disabled={uploading || !selectedGalleryImage}
      className="bg-amber-500 text-white px-5 py-3 rounded-xl disabled:opacity-50"
    >
      {uploading ? "Fotoğraf Yükleniyor..." : "Galeriye Fotoğraf Ekle"}
    </button>
  </div>
)}
{editing !== null && (
  <div className="border rounded-xl p-4 space-y-3">
    <h3 className="font-semibold">Kayıtlı Galeri Fotoğrafları</h3>
    {(() => {
      const room = rooms.find(r => r.id === editing);
      const images = room?.gallery_images || [];

      if (images.length === 0) {
        return <p className="text-gray-500">Henüz galeri fotoğrafı yok.</p>;
      }

      return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {images.map((url, index) => (
            <div key={index} className="border rounded-xl p-2">
              <img
                src={url}
                alt={`Galeri fotoğrafı ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <p className="text-center text-sm mt-2">
                Fotoğraf {index + 1}
              </p>
             <button
  type="button"
  onClick={() => removeGalleryImage(index)}
  disabled={saving}
  className="mt-2 w-full bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
>
  Sil
</button>

            </div>
          ))}
        </div>
      );
    })()}
  </div>
)}

   <label className="block text-sm font-medium">Kapak görseli adresi<input className={inputClass} value={form.cover_image} onChange={e=>field("cover_image",e.target.value)} placeholder="Fotoğraf yüklediğinizde otomatik doldurulur"/></label>
   {form.cover_image&&<img src={form.cover_image} alt="Oda kapak fotoğrafı önizlemesi" className="w-full max-w-xs h-44 object-cover rounded-xl" loading="lazy"/>}
   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <label className="text-sm font-medium">Google sayfa başlığı<input className={inputClass} maxLength={180} value={form.seo_title} onChange={e=>field("seo_title",e.target.value)}/></label>
    <label className="text-sm font-medium">Google açıklaması<input className={inputClass} maxLength={300} value={form.seo_description} onChange={e=>field("seo_description",e.target.value)}/></label>
   </div>
   <label className="flex items-center gap-2"><input type="checkbox" checked={form.is_active} onChange={e=>field("is_active",e.target.checked)}/> Yayına hazır (aktif)</label>
   <div className="flex flex-wrap gap-2"><button disabled={saving} className="bg-amber-500 text-white font-semibold px-5 py-3 rounded-xl disabled:opacity-50">{saving?"Kaydediliyor...":editing===null?"Odayı Kaydet":"Değişiklikleri Kaydet"}</button>{editing!==null&&<button type="button" onClick={cancel} className="border px-5 py-3 rounded-xl">Vazgeç</button>}</div>
  </form>
  {notice&&<p role="status" className="bg-white border rounded-xl p-3 text-sm">{notice}</p>}
  <div className="space-y-3"><h2 className="text-xl font-semibold">Kayıtlı Odalar ({rooms.length})</h2>{loading?<p>Yükleniyor...</p>:rooms.length===0?<p className="bg-white p-6 rounded-xl">Henüz oda eklenmedi.</p>:rooms.map(room=><article key={room.id} className="bg-white border rounded-2xl p-4 flex flex-col sm:flex-row gap-4 justify-between"><div className="min-w-0"><h3 className="font-bold">{room.name}</h3><p className="text-sm text-gray-500">{Object.keys(room.prices_by_occupancy||{}).length ? Object.entries(room.prices_by_occupancy||{}).sort((a,b)=>Number(a[0])-Number(b[0])).map(([count,amount])=>count+" kişi: "+Number(amount).toLocaleString("tr-TR")+" TL").join(" · ") : room.price_per_night==null?"Fiyat belirtilmedi":Number(room.price_per_night).toLocaleString("tr-TR")+" TL / gece"} · {room.capacity} kişi · {room.is_active?"Aktif":"Pasif"}</p></div><div className="flex gap-2"><button onClick={()=>edit(room)} className="px-4 py-2 border rounded-xl">Düzenle</button><button onClick={()=>remove(room)} className="px-4 py-2 border border-red-200 text-red-700 rounded-xl">Sil</button></div></article>)}</div>
 </div>;
}
