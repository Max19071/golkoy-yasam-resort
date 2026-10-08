import { useState } from "react";

const items=["Restoran","Açık Havuz","Manej","Tenis Kortu","Doğallığı Yaşayın","Oyun Salonu","Çocuk Oyun Alanı","Resepsiyon"];
const restaurantImages=["./etkili%20restorant%20sahne.jpg","./etkili%20restorant.jpg"];
const poolImage="./etkili%20havuz.jpg";
const manejImage="./etkili%20manej%20ikili.jpg";
const courtImages=["./etkili%20kort.jpg","./etkili%20tenis1.jpg"];
const natureImages=["./etkili%20do%C4%9Fal%20ya%C5%9Fam.jpg","./etkili%20do%C4%9Fal%20ya%C5%9Fam1.jpg"];
const gameImages=["./etkili%20%C5%9F%C3%B6mine.jpg","./etkili%20oyun%20salonu2.jpg","./etkili%20oyun%20salonu3.jpg"];
const childrenImage="./etkili%20%C3%A7ocuk%20alan%C4%B11.jpg";
const receptionImage="./etkili%20giri%C5%9F.jpg";

export default function Services(){
 const [restaurantOpen,setRestaurantOpen]=useState(false);
 const [restaurantIndex,setRestaurantIndex]=useState(0);
 const [poolOpen,setPoolOpen]=useState(false);
 const [childrenOpen,setChildrenOpen]=useState(false);
 const [courtOpen,setCourtOpen]=useState(false);
 const [courtIndex,setCourtIndex]=useState(0);
 const openCourt=()=>{setCourtIndex(0);setCourtOpen(true)};
 const nextCourt=()=>setCourtIndex(i=>(i+1)%courtImages.length);
 const prevCourt=()=>setCourtIndex(i=>(i-1+courtImages.length)%courtImages.length);
 const [gameOpen,setGameOpen]=useState(false);
 const [gameIndex,setGameIndex]=useState(0);
 const openGame=()=>{setGameIndex(0);setGameOpen(true)};
 const nextGame=()=>setGameIndex(i=>(i+1)%gameImages.length);
 const prevGame=()=>setGameIndex(i=>(i-1+gameImages.length)%gameImages.length);
 const [natureOpen,setNatureOpen]=useState(false);
 const [natureIndex,setNatureIndex]=useState(0);
 const openRestaurant=()=>{setRestaurantIndex(0);setRestaurantOpen(true)};
 const openNature=()=>{setNatureIndex(0);setNatureOpen(true)};
 const nextNature=()=>setNatureIndex(i=>(i+1)%natureImages.length);
 const prevNature=()=>setNatureIndex(i=>(i-1+natureImages.length)%natureImages.length);
 const nextRestaurant=()=>setRestaurantIndex(i=>(i+1)%restaurantImages.length);
 const prevRestaurant=()=>setRestaurantIndex(i=>(i-1+restaurantImages.length)%restaurantImages.length);
 return <section id="services" className="py-20 bg-white"><div className="max-w-6xl mx-auto px-4">
  <div className="text-center mb-12"><span className="text-amber-600 font-semibold">HİZMETLER</span><h2 className="text-4xl font-bold mt-3">Misafirlerimiz İçin</h2></div>
  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">{items.map(x=>x==="Restoran"?
   <button key={x} type="button" onClick={openRestaurant} className="text-left rounded-2xl border bg-slate-50 overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer">
    <img src={restaurantImages[0]} alt="Gölköy Yaşam Resort restoran ve sahne" className="w-full h-48 object-cover"/>
    <div className="p-6"><h3 className="text-xl font-semibold">Restoran</h3><p className="mt-2 text-sm text-gray-500">Görselleri açmak için tıklayın</p></div>
   </button>
   :x==="Açık Havuz"?
   <button key={x} type="button" onClick={()=>setPoolOpen(true)} className="text-left rounded-2xl border bg-slate-50 overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer">
    <img src={poolImage} alt="Gölköy Yaşam Resort açık havuz" className="w-full h-48 object-cover"/>
    <div className="p-6"><h3 className="text-xl font-semibold">Açık Havuz</h3><p className="mt-2 text-sm text-gray-500">Görseli açmak için tıklayın</p></div>
   </button>
   :x==="Doğallığı Yaşayın"?
   <button key={x} type="button" onClick={openNature} className="text-left rounded-2xl border bg-slate-50 overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer">
    <img src={natureImages[0]} alt="Gölköy Yaşam Resort doğal yaşam alanı" className="w-full h-48 object-cover"/>
    <div className="p-6"><h3 className="text-xl font-semibold">Doğallığı Yaşayın</h3><p className="mt-2 text-sm text-gray-500">Görselleri açmak için tıklayın</p></div>
   </button>
   :x==="Tenis Kortu"?
   <button key={x} type="button" onClick={openCourt} className="text-left rounded-2xl border bg-slate-50 overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer">
    <img src={courtImages[0]} alt="Gölköy Yaşam Resort tenis kortu" className="w-full h-48 object-cover"/>
    <div className="p-6"><h3 className="text-xl font-semibold">Tenis Kortu</h3><p className="mt-2 text-sm text-gray-500">Görselleri açmak için tıklayın</p></div>
   </button>
   :x==="Manej"?
   <div key={x} className="text-left rounded-2xl border bg-slate-50 overflow-hidden shadow-sm">
    <img src={manejImage} alt="Gölköy Yaşam Resort manej" className="w-full h-48 object-cover"/>
    <div className="p-6"><h3 className="text-xl font-semibold">Manej</h3></div>
   </div>
   :x==="Oyun Salonu"?
   <button key={x} type="button" onClick={openGame} className="text-left rounded-2xl border bg-slate-50 overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer">
    <img src={gameImages[0]} alt="Gölköy Yaşam Resort oyun salonu" className="w-full h-48 object-cover"/>
    <div className="p-6"><h3 className="text-xl font-semibold">Oyun Salonu</h3><p className="mt-2 text-sm text-gray-500">Görselleri açmak için tıklayın</p></div>
   </button>
   :x==="Çocuk Oyun Alanı"?
   <button key={x} type="button" onClick={()=>setChildrenOpen(true)} className="text-left rounded-2xl border bg-slate-50 overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer">
    <img src={childrenImage} alt="Gölköy Yaşam Resort çocuk oyun alanı" className="w-full h-48 object-cover"/>
    <div className="p-6"><h3 className="text-xl font-semibold">Çocuk Oyun Alanı</h3><p className="mt-2 text-sm text-gray-500">Görseli açmak için tıklayın</p></div>
   </button>
   :x==="Resepsiyon"?
   <div key={x} className="text-left rounded-2xl border bg-slate-50 overflow-hidden shadow-sm md:col-start-2">
    <img src={receptionImage} alt="Gölköy Yaşam Resort resepsiyon girişi" className="w-full h-48 object-cover"/>
    <div className="p-6"><h3 className="text-xl font-semibold">Resepsiyon</h3><p className="mt-2 text-sm text-gray-500">0366 252 85 89</p></div>
   </div>
   :<div key={x} className="p-8 rounded-2xl border bg-slate-50"><h3 className="text-xl font-semibold">{x}</h3></div>)}</div>
  {restaurantOpen&&<div className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-4" onClick={()=>setRestaurantOpen(false)}>
   <div className="relative max-w-5xl w-full" onClick={e=>e.stopPropagation()}>
    <button type="button" onClick={()=>setRestaurantOpen(false)} aria-label="Kapat" className="absolute -top-12 right-0 text-white text-4xl leading-none">×</button>
    <img src={restaurantImages[restaurantIndex]} alt="Gölköy Yaşam Resort restoran" className="w-full max-h-[82vh] object-contain rounded-2xl"/>
    <button type="button" onClick={prevRestaurant} aria-label="Önceki fotoğraf" className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/55 text-white text-4xl flex items-center justify-center hover:bg-black/75">‹</button>
    <button type="button" onClick={nextRestaurant} aria-label="Sonraki fotoğraf" className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/55 text-white text-4xl flex items-center justify-center hover:bg-black/75">›</button>
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/55 text-white text-sm">{restaurantIndex+1} / {restaurantImages.length}</div>
   </div>
  </div>}
  {natureOpen&&<div className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-4" onClick={()=>setNatureOpen(false)}>
   <div className="relative max-w-5xl w-full" onClick={e=>e.stopPropagation()}>
    <button type="button" onClick={()=>setNatureOpen(false)} aria-label="Kapat" className="absolute -top-12 right-0 text-white text-4xl leading-none">×</button>
    <img src={natureImages[natureIndex]} alt="Gölköy Yaşam Resort doğal yaşam" className="w-full max-h-[82vh] object-contain rounded-2xl"/>
    <button type="button" onClick={prevNature} aria-label="Önceki fotoğraf" className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/55 text-white text-4xl flex items-center justify-center hover:bg-black/75">‹</button>
    <button type="button" onClick={nextNature} aria-label="Sonraki fotoğraf" className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/55 text-white text-4xl flex items-center justify-center hover:bg-black/75">›</button>
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/55 text-white text-sm">{natureIndex+1} / {natureImages.length}</div>
   </div>
  </div>}
  {gameOpen&&<div className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-4" onClick={()=>setGameOpen(false)}>
   <div className="relative max-w-5xl w-full" onClick={e=>e.stopPropagation()}>
    <button type="button" onClick={()=>setGameOpen(false)} aria-label="Kapat" className="absolute -top-12 right-0 text-white text-4xl leading-none">×</button>
    <img src={gameImages[gameIndex]} alt="Gölköy Yaşam Resort oyun salonu" className="w-full max-h-[82vh] object-contain rounded-2xl"/>
    <button type="button" onClick={prevGame} aria-label="Önceki fotoğraf" className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/55 text-white text-4xl flex items-center justify-center hover:bg-black/75">‹</button>
    <button type="button" onClick={nextGame} aria-label="Sonraki fotoğraf" className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/55 text-white text-4xl flex items-center justify-center hover:bg-black/75">›</button>
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/55 text-white text-sm">{gameIndex+1} / {gameImages.length}</div>
   </div>
  </div>}
  {courtOpen&&<div className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-4" onClick={()=>setCourtOpen(false)}>
   <div className="relative max-w-5xl w-full" onClick={e=>e.stopPropagation()}>
    <button type="button" onClick={()=>setCourtOpen(false)} aria-label="Kapat" className="absolute -top-12 right-0 text-white text-4xl leading-none">×</button>
    <img src={courtImages[courtIndex]} alt="Gölköy Yaşam Resort tenis kortu" className="w-full max-h-[82vh] object-contain rounded-2xl"/>
    <button type="button" onClick={prevCourt} aria-label="Önceki fotoğraf" className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/55 text-white text-4xl flex items-center justify-center hover:bg-black/75">‹</button>
    <button type="button" onClick={nextCourt} aria-label="Sonraki fotoğraf" className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/55 text-white text-4xl flex items-center justify-center hover:bg-black/75">›</button>
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/55 text-white text-sm">{courtIndex+1} / {courtImages.length}</div>
   </div>
  </div>}
  {childrenOpen&&<div className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-4" onClick={()=>setChildrenOpen(false)}>
   <div className="relative max-w-5xl w-full" onClick={e=>e.stopPropagation()}>
    <button type="button" onClick={()=>setChildrenOpen(false)} aria-label="Kapat" className="absolute -top-12 right-0 text-white text-4xl leading-none">×</button>
    <img src={childrenImage} alt="Gölköy Yaşam Resort çocuk oyun alanı" className="w-full max-h-[82vh] object-contain rounded-2xl"/>
   </div>
  </div>}
  {poolOpen&&<div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4" onClick={()=>setPoolOpen(false)}>
   <div className="relative max-w-5xl w-full" onClick={e=>e.stopPropagation()}>
    <button type="button" onClick={()=>setPoolOpen(false)} aria-label="Kapat" className="absolute -top-12 right-0 text-white text-4xl leading-none">×</button>
    <img src={poolImage} alt="Gölköy Yaşam Resort açık havuz" className="w-full max-h-[82vh] object-contain rounded-2xl"/>
   </div>
  </div>}
 </div></section>
}
