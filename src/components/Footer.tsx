export default function Footer(){
 return <footer className="bg-slate-950 text-white py-10"><div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-4 justify-between">
  <div><div className="font-bold text-xl">Gölköy Yaşam Resort</div><p className="text-white/60 mt-2">Konforlu ve huzurlu konaklama.</p></div>
  <div className="text-white/50 text-sm md:text-right">© {new Date().getFullYear()} Gölköy Yaşam Resort</div>
 </div></footer>
}
