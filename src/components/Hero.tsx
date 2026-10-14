import { useEffect, useState } from "react";

const heroImages=["./etkili%20havuzdan%20otel.jpg","./etkili%20bah%C3%A7e%20evleri.jpg"];

export default function Hero(){
 const [active,setActive]=useState(0);
 useEffect(()=>{
  const timer=window.setInterval(()=>setActive(i=>(i+1)%heroImages.length),10000);
  return ()=>window.clearInterval(timer);
 },[]);
 return <section id="home" className="relative min-h-screen flex items-center pt-24 overflow-hidden">
  {heroImages.map((src,i)=><div key={src} aria-hidden="true" className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${active===i?"opacity-100":"opacity-0"}`} style={{backgroundImage:`linear-gradient(90deg,rgba(9,45,26,.64) 0%,rgba(13,51,30,.35) 58%,rgba(0,0,0,.12) 100%),url("${src}")`}}/>)}
  <div className="relative z-10 w-full max-w-7xl mx-auto px-4 text-white">
   <div className="max-w-4xl rounded-[1.75rem] border border-white/25 bg-[#17572b]/65 backdrop-blur-[3px] p-7 md:p-12 shadow-2xl"><p className="uppercase tracking-[0.24em] text-xs md:text-sm mb-5 text-[#e4efc3] font-semibold">Konfor · Huzur · Doğa</p>
   <h1 className="text-5xl md:text-7xl font-bold max-w-4xl leading-tight drop-shadow-lg tracking-tight" style={{fontFamily:"Georgia, serif"}}>Gölköy Yaşam Resort</h1>
   <p className="mt-6 text-lg md:text-xl max-w-2xl text-white/95 leading-relaxed drop-shadow-md">Doğayla iç içe, sakin ve konforlu bir konaklama deneyimi.</p>
   <div className="mt-8 flex gap-4 flex-wrap"><a href="#rooms" className="px-7 py-3 rounded-full bg-[#287233] hover:bg-[#17572b] border border-white/20 shadow-lg font-semibold transition-colors">Odaları İncele</a><a href="#contact" className="px-7 py-3 rounded-full bg-white/15 hover:bg-white/25 border border-white/60 font-semibold transition-colors">Rezervasyon</a></div>
   </div>
  </div>
 </section>
}
