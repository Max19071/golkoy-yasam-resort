import { useState } from "react";
const links=[["home","Ana Sayfa"],["about","Hakkımızda"],["rooms","Odalar"],["services","Hizmetler"],["gallery","Galeri"],["contact","İletişim"]];
export default function Navbar(){
 const [open,setOpen]=useState(false);
 return <header className="fixed top-0 inset-x-0 z-50 bg-[#287233]/95 backdrop-blur border-b border-[#17572b] shadow-lg">
  <div className="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between">
   <a href="#home" className="flex items-center gap-3"><img src="./amblem.jpg" alt="Gölköy Yaşam Resort amblemi" className="w-16 h-16 object-contain shrink-0" /><span className="font-semibold text-xl text-white leading-tight tracking-wide">Gölköy<br/><span className="text-[#e4efc3]">Yaşam Resort</span></span></a>
   <nav className="hidden md:flex gap-7">{links.map(([id,label])=><a key={id} href={'#'+id} className="text-[15px] font-medium tracking-wide text-white/95 hover:text-[#e4efc3] transition-colors">{label}</a>)}</nav>
   <button onClick={()=>setOpen(!open)} className="md:hidden px-3 py-2 border border-white/60 rounded-lg text-white">Menü</button>
  </div>
  {open&&<nav className="md:hidden px-4 pb-4 bg-[#287233]">{links.map(([id,label])=><a key={id} href={'#'+id} onClick={()=>setOpen(false)} className="block py-2 text-white/95">{label}</a>)}</nav>}
 </header>
}