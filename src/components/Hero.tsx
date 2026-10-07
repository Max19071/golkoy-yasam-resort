import ResortLogo from "./ResortLogo";
export default function Hero(){
 return <section id="home" className="min-h-screen flex items-center pt-24 bg-[linear-gradient(rgba(0,0,0,.48),rgba(0,0,0,.48)),url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600')] bg-cover bg-center">
  <div className="max-w-7xl mx-auto px-4 text-white">
   <div className="flex items-center gap-5 mb-5"><div className="bg-white/90 rounded-2xl p-2 shadow-xl"><ResortLogo className="w-24 h-20"/></div><p className="uppercase tracking-[0.3em] text-sm">Konfor · Huzur · Doğa</p></div>
   <h1 className="text-5xl md:text-7xl font-bold max-w-4xl leading-tight">Gölköy Yaşam Resort</h1>
   <p className="mt-6 text-lg md:text-xl max-w-2xl text-white/90">Doğayla iç içe, sakin ve konforlu bir konaklama deneyimi.</p>
   <div className="mt-8 flex gap-4 flex-wrap"><a href="#rooms" className="px-6 py-3 rounded-full bg-amber-500 font-semibold">Odaları İncele</a><a href="#contact" className="px-6 py-3 rounded-full bg-white/15 border border-white/40 font-semibold">Rezervasyon</a></div>
  </div>
 </section>
}