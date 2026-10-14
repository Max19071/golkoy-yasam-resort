import { useEffect, useState } from "react";

const heroImages=["./etkili%20havuzdan%20otel.jpg","./etkili%20bah%C3%A7e%20evleri.jpg"];

export default function Hero(){
 const [active,setActive]=useState(0);
 useEffect(()=>{
  const timer=window.setInterval(()=>setActive(i=>(i+1)%heroImages.length),10000);
  return ()=>window.clearInterval(timer);
 },[]);
 return <section id="home" className="relative min-h-screen flex items-center pt-24 overflow-hidden">
  {heroImages.map((src,i)=><div key={src} aria-hidden="true" className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${active===i?"opacity-100":"opacity-0"}`} style={{backgroundImage:`linear-gradient(rgba(0,0,0,.12),rgba(0,0,0,.12)),url("${src}")`}}/>)}
  <div className="relative z-10 max-w-7xl mx-auto px-4 text-white">
   <p className="uppercase tracking-[0.3em] text-sm mb-4 drop-shadow-md">Konfor · Huzur · Doğa</p>
   <h1 className="text-5xl md:text-7xl font-bold max-w-4xl leading-tight drop-shadow-lg">Gölköy Yaşam Resort</h1>
   <p className="mt-6 text-lg md:text-xl max-w-2xl text-white drop-shadow-md">Doğayla iç içe, sakin ve konforlu bir konaklama deneyimi.</p>
   <div className="mt-8 flex gap-4 flex-wrap"><a href="#rooms" className="px-6 py-3 rounded-full bg-amber-500 font-semibold">Odaları İncele</a><a href="#contact" className="px-6 py-3 rounded-full bg-white/15 border border-white/40 font-semibold">Rezervasyon</a></div>
  </div>
 </section>
}
