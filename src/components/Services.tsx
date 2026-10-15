import { useEffect, useState } from "react";

const items=["Restoran","Açık Havuz","Manej","Tenis Kortu","Doğallığı Yaşayın","Oyun Salonu","Çocuk Oyun Alanı","Düğün Organizasyonu"];
const restaurantImages=["./etkili%20restorant%20sahne.jpg","./etkili%20restorant.jpg"];
const poolImages=["./etkili%20havuz.jpg","./etkili%20havuz1.jpg"];
const manejImage = "./etkili%20manej%20ikili.jpg";
const manejImages = [manejImage];
const courtImages=["./etkili%20kort.jpg","./etkili%20tenis1.jpg"];
const natureImages=["./etkili%20do%C4%9Fal%20ya%C5%9Fam.jpg","./etkili%20do%C4%9Fal%20ya%C5%9Fam1.jpg"];
const gameImages=["./etkili%20%C5%9F%C3%B6mine.jpg","./etkili%20oyun%20salonu2.jpg","./etkili%20oyun%20salonu3.jpg"];
const childrenImage="./etkili%20%C3%A7ocuk%20alan%C4%B11.jpg";
const childrenImages = [childrenImage];
const weddingImage="./etkili%20d%C3%BC%C4%9F%C3%BCn.jpg";

export default function Services(){
 const [galeriFotograflari, setGaleriFotograflari] = useState<
  { image_url: string; category: string }[]
>([]);
 useEffect(() => {
  const controller = new AbortController();

  fetch(
    "https://pekpyiyivttrjjxsrarx.supabase.co/rest/v1/hotel_gallery?select=image_url,category&is_active=eq.true&order=display_order.asc",
    {
      headers: {
        apikey: "sb_publishable_byqYtROGi5NKkIWiZJ07uw_RMPhuMzS",
      },
      signal: controller.signal,
    }
  )
    .then((response) => {
      if (!response.ok) throw new Error("Galeri yüklenemedi");
      return response.json();
    })
    .then((data) => {
      setGaleriFotograflari(data.filter((foto: { image_url: string }) => foto.image_url));
    })
    .catch((error) => {
      if (error.name !== "AbortError") {
        console.error("Hizmet galerisi yüklenemedi:", error);
      }
    });

  return () => controller.abort();
}, []);
 const [cardIndices, setCardIndices] = useState<Record<string, number>>({});
 const [weddingOpen, setWeddingOpen] = useState(false);
 const [weddingIndex, setWeddingIndex] = useState(0);
 const weddingGalleryImages = [weddingImage, ...galeriFotograflari.filter(foto => foto.category === "Düğün Organizasyonu").map(foto => foto.image_url)];
 const nextWedding = () => setWeddingIndex(i => (i + 1) % weddingGalleryImages.length);
 const prevWedding = () => setWeddingIndex(i => (i - 1 + weddingGalleryImages.length) % weddingGalleryImages.length);
 const [restaurantOpen,setRestaurantOpen]=useState(false);
 const [restaurantIndex,setRestaurantIndex]=useState(0);
 const restaurantGalleryImages = [
 


  ...restaurantImages,
  ...galeriFotograflari
    .filter((foto) => foto.category === "Restoran")
    .map((foto) => foto.image_url),
];
 const havuzGaleriResimleri = [
  ...poolImages,
  ...galeriFotograflari
    .filter((foto) => foto.category === "Havuz")
    .map((foto) => foto.image_url),
];
 const [poolOpen,setPoolOpen]=useState(false);
 const [poolIndex,setPoolIndex]=useState(0);
 const openPool=()=>{setPoolIndex(0);setPoolOpen(true)};
 const nextPool=()=>setPoolIndex(i=>(i+1)%havuzGaleriResimleri.length);
 const prevPool=()=>setPoolIndex(i=>(i-1+havuzGaleriResimleri.length)%havuzGaleriResimleri.length);
 const [childrenOpen,setChildrenOpen]=useState(false);
 const tenisGaleriResimleri = [

  ...courtImages,
  ...galeriFotograflari
    .filter((foto) => foto.category === "Tenis Kortu")
    .map((foto) => foto.image_url),
];
const manejGaleriResimleri = [
  ...manejImages,
  ...galeriFotograflari
    .filter((foto) => foto.category === "Manej")
    .map((foto) => foto.image_url),
];
 const oyunGaleriResimleri = [
  ...gameImages,
  ...galeriFotograflari
    .filter((foto) => foto.category === "Oyun Salonu")
    .map((foto) => foto.image_url),
];
 const cocukGaleriResimleri = [
  ...childrenImages,
  ...galeriFotograflari
    .filter((foto) => foto.category === "Çocuk Oyun Alanı")
    .map((foto) => foto.image_url),
];

 const [childrenIndex, setChildrenIndex] = useState(0);
const nextChildren = () => setChildrenIndex(i => (i + 1) % cocukGaleriResimleri.length);
const prevChildren = () => setChildrenIndex(i => (i - 1 + cocukGaleriResimleri.length) % cocukGaleriResimleri.length);
const [manejOpen, setManejOpen] = useState(false);
const [manejIndex, setManejIndex] = useState(0);
const openManej = () => {
  setManejIndex(0);
  setManejOpen(true);
};
const nextManej = () =>
  setManejIndex(i => (i + 1) % manejGaleriResimleri.length);
const prevManej = () =>
  setManejIndex(i => (i - 1 + manejGaleriResimleri.length) % manejGaleriResimleri.length);
 const [courtOpen,setCourtOpen]=useState(false);
 const [courtIndex,setCourtIndex]=useState(0);
 const openCourt=()=>{setCourtIndex(0);setCourtOpen(true)};
 const nextCourt=()=>setCourtIndex(i=>(i+1)%tenisGaleriResimleri.length);
 const prevCourt=()=>setCourtIndex(i=>(i-1+tenisGaleriResimleri.length)%tenisGaleriResimleri.length);
 const [gameOpen,setGameOpen]=useState(false);
 const [gameIndex,setGameIndex]=useState(0);
 const openGame=()=>{setGameIndex(0);setGameOpen(true)};
 const nextGame=()=>setGameIndex(i=>(i+1)%oyunGaleriResimleri.length);
 const prevGame=()=>setGameIndex(i=>(i-1+oyunGaleriResimleri.length)%oyunGaleriResimleri.length);
 const [natureOpen,setNatureOpen]=useState(false);
 
const natureGalleryImages = [
  ...natureImages,
  ...galeriFotograflari
    .filter((foto) => foto.category === "Doğallığı Yaşayın")
    .map((foto) => foto.image_url),
];

 const [natureIndex,setNatureIndex]=useState(0);
 const openRestaurant=()=>{setRestaurantIndex(0);setRestaurantOpen(true)};
 const openNature=()=>{setNatureIndex(0);setNatureOpen(true)};
 const nextNature=()=>setNatureIndex(i=>(i+1)%natureGalleryImages.length);
 const prevNature=()=>setNatureIndex(i=>(i-1+natureGalleryImages.length)%natureGalleryImages.length);
 const nextRestaurant = () => setRestaurantIndex(i => (i + 1) % restaurantGalleryImages.length);
const prevRestaurant = () => setRestaurantIndex(i => (i - 1 + restaurantGalleryImages.length) % restaurantGalleryImages.length);
 

 // Rotate service-card previews and whichever enlarged gallery is open.
 useEffect(() => {
   const categories = [
     { key: 'restaurant', count: restaurantGalleryImages.length },
     { key: 'pool', count: havuzGaleriResimleri.length },
     { key: 'nature', count: natureGalleryImages.length },
     { key: 'court', count: tenisGaleriResimleri.length },
     { key: 'manej', count: manejGaleriResimleri.length },
     { key: 'game', count: oyunGaleriResimleri.length },
     { key: 'children', count: cocukGaleriResimleri.length },
     { key: 'wedding', count: weddingGalleryImages.length },
   ];
   const timers = categories.filter(({ count }) => count > 1).map(({ key, count }) => {
     const advance = () => {
       setCardIndices(previous => {
         const current = previous[key] ?? 0;
         const offset = 1 + Math.floor(Math.random() * (count - 1));
         return { ...previous, [key]: (current + offset) % count };
       });
     };
     const initialDelay = 1000 + Math.random() * 4000;
     let interval: number | undefined;
     const timeout = window.setTimeout(() => {
       advance();
       interval = window.setInterval(advance, 5000);
     }, initialDelay);
     return () => {
       window.clearTimeout(timeout);
       if (interval !== undefined) window.clearInterval(interval);
     };
   });
   return () => timers.forEach(stop => stop());
 }, [restaurantGalleryImages.length, havuzGaleriResimleri.length, natureGalleryImages.length, tenisGaleriResimleri.length, manejGaleriResimleri.length, oyunGaleriResimleri.length, cocukGaleriResimleri.length, weddingGalleryImages.length]);
 useEffect(() => {
   if (!restaurantOpen || restaurantGalleryImages.length < 2) return;
   const timer = window.setInterval(() => setRestaurantIndex(i => (i + 1) % restaurantGalleryImages.length), 5000);
   return () => window.clearInterval(timer);
 }, [restaurantOpen, restaurantGalleryImages.length]);
 useEffect(() => {
   if (!poolOpen || havuzGaleriResimleri.length < 2) return;
   const timer = window.setInterval(() => setPoolIndex(i => (i + 1) % havuzGaleriResimleri.length), 5000);
   return () => window.clearInterval(timer);
 }, [poolOpen, havuzGaleriResimleri.length]);
 useEffect(() => {
   if (!courtOpen || tenisGaleriResimleri.length < 2) return;
   const timer = window.setInterval(() => setCourtIndex(i => (i + 1) % tenisGaleriResimleri.length), 5000);
   return () => window.clearInterval(timer);
 }, [courtOpen, tenisGaleriResimleri.length]);
 useEffect(() => {
   if (!manejOpen || manejGaleriResimleri.length < 2) return;
   const timer = window.setInterval(() => setManejIndex(i => (i + 1) % manejGaleriResimleri.length), 5000);
   return () => window.clearInterval(timer);
 }, [manejOpen, manejGaleriResimleri.length]);
 useEffect(() => {
   if (!gameOpen || oyunGaleriResimleri.length < 2) return;
   const timer = window.setInterval(() => setGameIndex(i => (i + 1) % oyunGaleriResimleri.length), 5000);
   return () => window.clearInterval(timer);
 }, [gameOpen, oyunGaleriResimleri.length]);
 useEffect(() => {
   if (!childrenOpen || cocukGaleriResimleri.length < 2) return;
   const timer = window.setInterval(() => setChildrenIndex(i => (i + 1) % cocukGaleriResimleri.length), 5000);
   return () => window.clearInterval(timer);
 }, [childrenOpen, cocukGaleriResimleri.length]);
 useEffect(() => {
   if (!natureOpen || natureGalleryImages.length < 2) return;
   const timer = window.setInterval(() => setNatureIndex(i => (i + 1) % natureGalleryImages.length), 5000);
   return () => window.clearInterval(timer);
 }, [natureOpen, natureGalleryImages.length]);
 
 useEffect(() => {
   if (!weddingOpen || weddingGalleryImages.length < 2) return;
   const timer = window.setInterval(() => setWeddingIndex(i => (i + 1) % weddingGalleryImages.length), 5000);
   return () => window.clearInterval(timer);
 }, [weddingOpen, weddingGalleryImages.length]);
 return <section id="services" className="py-20 bg-white"><div className="max-w-6xl mx-auto px-4">
  <div className="text-center mb-12"><span className="text-amber-600 font-semibold">HİZMETLER</span><h2 className="text-4xl font-bold mt-3">Misafirlerimiz İçin</h2></div>
  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">{items.map(x=>x==="Restoran"?
   <button key={x} type="button" onClick={openRestaurant} className="text-left rounded-2xl border bg-slate-50 overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer">
    <img src={restaurantGalleryImages[(cardIndices.restaurant ?? 0) % restaurantGalleryImages.length]} alt="Gölköy Yaşam Resort restoran ve sahne" className="w-full h-48 object-cover"/>
    <div className="p-6"><h3 className="text-xl font-semibold">Restoran</h3><p className="mt-2 text-sm text-gray-500">Görselleri açmak için tıklayın</p></div>
   </button>
   :x==="Açık Havuz"?
   <button key={x} type="button" onClick={openPool} className="text-left rounded-2xl border bg-slate-50 overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer">
    <img src={havuzGaleriResimleri[(cardIndices.pool ?? 0) % havuzGaleriResimleri.length]} alt="Gölköy Yaşam Resort açık havuz" className="w-full h-48 object-cover"/>
    <div className="p-6"><h3 className="text-xl font-semibold">Açık Havuz</h3><p className="mt-2 text-sm text-gray-500">Görselleri açmak için tıklayın</p></div>
   </button>
   :x==="Doğallığı Yaşayın"?
   <button key={x} type="button" onClick={openNature} className="text-left rounded-2xl border bg-slate-50 overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer">
    <img src={natureGalleryImages[(cardIndices.nature ?? 0) % natureGalleryImages.length]} alt="Gölköy Yaşam Resort doğal yaşam alanı" className="w-full h-48 object-cover"/>
    <div className="p-6"><h3 className="text-xl font-semibold">Doğallığı Yaşayın</h3><p className="mt-2 text-sm text-gray-500">Görselleri açmak için tıklayın</p></div>
   </button>
   :x==="Tenis Kortu"?
   <button key={x} type="button" onClick={openCourt} className="text-left rounded-2xl border bg-slate-50 overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer">
    <img src={tenisGaleriResimleri[(cardIndices.court ?? 0) % tenisGaleriResimleri.length]} alt="Gölköy Yaşam Resort tenis kortu" className="w-full h-48 object-cover"/>
    <div className="p-6"><h3 className="text-xl font-semibold">Tenis Kortu</h3><p className="mt-2 text-sm text-gray-500">Görselleri açmak için tıklayın</p></div>
   </button>
   :x==="Manej"?
   <button key={x} type="button" onClick={openManej} className="text-left rounded-2xl border bg-slate-50 overflow-hidden shadow-sm">
    <img src={manejGaleriResimleri[(cardIndices.manej ?? 0) % manejGaleriResimleri.length]} alt="Gölköy Yaşam Resort manej" className="w-full h-48 object-cover"/>
    <div className="p-6"><h3 className="text-xl font-semibold">Manej</h3></div>
   </button>
   :x==="Oyun Salonu"?
   <button key={x} type="button" onClick={openGame} className="text-left rounded-2xl border bg-slate-50 overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer">
    <img src={oyunGaleriResimleri[(cardIndices.game ?? 0) % oyunGaleriResimleri.length]} alt="Gölköy Yaşam Resort oyun salonu" className="w-full h-48 object-cover"/>
    <div className="p-6"><h3 className="text-xl font-semibold">Oyun Salonu</h3><p className="mt-2 text-sm text-gray-500">Görselleri açmak için tıklayın</p></div>
   </button>
   :x==="Çocuk Oyun Alanı"?
   <button key={x} type="button" onClick={()=>setChildrenOpen(true)} className="text-left rounded-2xl border bg-slate-50 overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer">
    <img src={cocukGaleriResimleri[(cardIndices.children ?? 0) % cocukGaleriResimleri.length]} alt="Gölköy Yaşam Resort çocuk oyun alanı" className="w-full h-48 object-cover"/>
    <div className="p-6"><h3 className="text-xl font-semibold">Çocuk Oyun Alanı</h3><p className="mt-2 text-sm text-gray-500">Görseli açmak için tıklayın</p></div>
   </button>
   :x==="Düğün Organizasyonu"?
   <button key={x} type="button" onClick={() => {setWeddingIndex(0);setWeddingOpen(true)}} className="text-left rounded-2xl border bg-slate-50 overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer md:col-start-2">
    <img src={weddingGalleryImages[(cardIndices.wedding ?? 0) % weddingGalleryImages.length]} alt="Gölköy Yaşam Resort düğün organizasyonu" className="w-full h-48 object-cover"/>
    <div className="p-6"><h3 className="text-xl font-semibold">Düğün Organizasyonu</h3><p className="mt-2 text-sm text-gray-500">Görseli açmak için tıklayın</p></div>
   </button>
   :<div key={x} className="p-8 rounded-2xl border bg-slate-50"><h3 className="text-xl font-semibold">{x}</h3></div>)}</div>
  {restaurantOpen&&<div className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-4" onClick={()=>setRestaurantOpen(false)}>
   <div className="relative max-w-5xl w-full" onClick={e=>e.stopPropagation()}>
    <button type="button" onClick={()=>setRestaurantOpen(false)} aria-label="Kapat" className="absolute -top-12 right-0 text-white text-4xl leading-none">×</button>
    <img src={restaurantGalleryImages[restaurantIndex]} alt="Gölköy Yaşam Resort restoran" className="w-full max-h-[82vh] object-contain rounded-2xl"/>
    <button type="button" onClick={prevRestaurant} aria-label="Önceki fotoğraf" className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/55 text-white text-4xl flex items-center justify-center hover:bg-black/75">‹</button>
    <button type="button" onClick={nextRestaurant} aria-label="Sonraki fotoğraf" className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/55 text-white text-4xl flex items-center justify-center hover:bg-black/75">›</button>
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/55 text-white text-sm">{restaurantIndex+1} / {restaurantGalleryImages.length}</div>
   </div>
  </div>}
  {natureOpen&&<div className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-4" onClick={()=>setNatureOpen(false)}>
   <div className="relative max-w-5xl w-full" onClick={e=>e.stopPropagation()}>
    <button type="button" onClick={()=>setNatureOpen(false)} aria-label="Kapat" className="absolute -top-12 right-0 text-white text-4xl leading-none">×</button>
    <img src={natureGalleryImages[natureIndex]} alt="Gölköy Yaşam Resort doğal yaşam" className="w-full max-h-[82vh] object-contain rounded-2xl"/>
    <button type="button" onClick={prevNature} aria-label="Önceki fotoğraf" className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/55 text-white text-4xl flex items-center justify-center hover:bg-black/75">‹</button>
    <button type="button" onClick={nextNature} aria-label="Sonraki fotoğraf" className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/55 text-white text-4xl flex items-center justify-center hover:bg-black/75">›</button>
   
<div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/55 text-white text-sm">{natureIndex+1} / {natureGalleryImages.length}</div>

   </div>
  </div>}
  {gameOpen&&<div className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-4" onClick={()=>setGameOpen(false)}>
   <div className="relative max-w-5xl w-full" onClick={e=>e.stopPropagation()}>
    <button type="button" onClick={()=>setGameOpen(false)} aria-label="Kapat" className="absolute -top-12 right-0 text-white text-4xl leading-none">×</button>
    <img src={oyunGaleriResimleri[gameIndex]} alt="Gölköy Yaşam Resort oyun salonu" className="w-full max-h-[82vh] object-contain rounded-2xl"/>
    <button type="button" onClick={prevGame} aria-label="Önceki fotoğraf" className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/55 text-white text-4xl flex items-center justify-center hover:bg-black/75">‹</button>
    <button type="button" onClick={nextGame} aria-label="Sonraki fotoğraf" className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/55 text-white text-4xl flex items-center justify-center hover:bg-black/75">›</button>
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/55 text-white text-sm">{gameIndex+1} / {oyunGaleriResimleri.length}</div>
   </div>
  </div>}
  {courtOpen&&<div className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-4" onClick={()=>setCourtOpen(false)}>
   <div className="relative max-w-5xl w-full" onClick={e=>e.stopPropagation()}>
    <button type="button" onClick={()=>setCourtOpen(false)} aria-label="Kapat" className="absolute -top-12 right-0 text-white text-4xl leading-none">×</button>
    <img src={tenisGaleriResimleri[courtIndex]} alt="Gölköy Yaşam Resort tenis kortu" className="w-full max-h-[82vh] object-contain rounded-2xl"/>
    <button type="button" onClick={prevCourt} aria-label="Önceki fotoğraf" className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/55 text-white text-4xl flex items-center justify-center hover:bg-black/75">‹</button>
    <button type="button" onClick={nextCourt} aria-label="Sonraki fotoğraf" className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/55 text-white text-4xl flex items-center justify-center hover:bg-black/75">›</button>
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/55 text-white text-sm">{courtIndex+1} / {tenisGaleriResimleri.length}</div>
   </div>
  </div>}
  {manejOpen && (
  <div className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-4" onClick={() => setManejOpen(false)}>
    <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
      <button type="button" onClick={() => setManejOpen(false)} aria-label="Kapat" className="absolute -top-12 right-0 text-white text-4xl leading-none">×</button>
      <img src={manejGaleriResimleri[manejIndex]} alt="Gölköy Yaşam Resort manej" className="w-full max-h-[82vh] object-contain rounded-2xl"/>
      <button type="button" onClick={prevManej} aria-label="Önceki fotoğraf" className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/55 text-white text-4xl">‹</button>
      <button type="button" onClick={nextManej} aria-label="Sonraki fotoğraf" className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/55 text-white text-4xl">›</button>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/55 text-white text-sm">{manejIndex + 1} / {manejGaleriResimleri.length}</div>
    </div>
  </div>
)}
  {childrenOpen&&<div className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-4" onClick={()=>setChildrenOpen(false)}>
   <div className="relative max-w-5xl w-full" onClick={e=>e.stopPropagation()}>
    <button type="button" onClick={()=>setChildrenOpen(false)} aria-label="Kapat" className="absolute -top-12 right-0 text-white text-4xl leading-none">×</button>
    <img src={cocukGaleriResimleri[childrenIndex]} alt="Gölköy Yaşam Resort çocuk oyun alanı" className="w-full max-h-[82vh] object-contain rounded-2xl"/>
    <button type="button" onClick={prevChildren} aria-label="Önceki fotoğraf" className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/55 text-white text-4xl">‹</button>
<button type="button" onClick={nextChildren} aria-label="Sonraki fotoğraf" className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/55 text-white text-4xl">›</button>
  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/55 text-white text-sm">{childrenIndex + 1} / {cocukGaleriResimleri.length}</div>  
   </div>
  </div>}
  {poolOpen&&<div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4" onClick={()=>setPoolOpen(false)}>
   <div className="relative max-w-5xl w-full" onClick={e=>e.stopPropagation()}>
    <button type="button" onClick={()=>setPoolOpen(false)} aria-label="Kapat" className="absolute -top-12 right-0 text-white text-4xl leading-none">×</button>
    <img src={havuzGaleriResimleri[poolIndex]} alt="Gölköy Yaşam Resort açık havuz" className="w-full max-h-[82vh] object-contain rounded-2xl"/>
    <button type="button" onClick={prevPool} aria-label="Önceki fotoğraf" className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/55 text-white text-4xl flex items-center justify-center hover:bg-black/75">‹</button>
    <button type="button" onClick={nextPool} aria-label="Sonraki fotoğraf" className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/55 text-white text-4xl flex items-center justify-center hover:bg-black/75">›</button>
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/55 text-white text-sm">{poolIndex+1} / {havuzGaleriResimleri.length}</div>
   </div>
  </div>}
  {weddingOpen && <div className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-4" onClick={() => setWeddingOpen(false)}>
   <div className="relative max-w-5xl w-full" onClick={e => e.stopPropagation()}>
    <button type="button" onClick={() => setWeddingOpen(false)} aria-label="Kapat" className="absolute -top-12 right-0 text-white text-4xl leading-none">×</button>
    <img src={weddingGalleryImages[weddingIndex]} alt="Gölköy Yaşam Resort düğün organizasyonu" className="w-full max-h-[82vh] object-contain rounded-2xl"/>
    {weddingGalleryImages.length > 1 && <><button type="button" onClick={prevWedding} aria-label="Önceki fotoğraf" className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/55 text-white text-4xl">‹</button><button type="button" onClick={nextWedding} aria-label="Sonraki fotoğraf" className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/55 text-white text-4xl">›</button><div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/55 text-white text-sm">{weddingIndex + 1} / {weddingGalleryImages.length}</div></>}
   </div>
  </div>}
 </div></section>
}
