import { useState } from "react";

const links = [
  ["home", "Ana Sayfa"],
  ["about", "Hakkımızda"],
  ["rooms", "Odalar"],
  ["services", "Hizmetler"],
  ["gallery", "Galeri"],
  ["contact", "İletişim"],
];

export default function Navbar() {
  const [open,setOpen]=useState(false);
  return <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100">
    <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
      <a href="#home" className="font-bold text-xl text-gray-900">Gölköy Yaşam Resort</a>
      <nav className="hidden md:flex gap-7">
        {links.map(([id,label])=><a key={id} href={'#'+id} className="text-sm font-medium text-gray-700 hover:text-amber-600">{label}</a>)}
      </nav>
      <button onClick={()=>setOpen(!open)} className="md:hidden px-3 py-2 border rounded-lg">Menü</button>
    </div>
    {open && <nav className="md:hidden px-4 pb-4 bg-white">
      {links.map(([id,label])=><a key={id} href={'#'+id} onClick={()=>setOpen(false)} className="block py-2 text-gray-700">{label}</a>)}
    </nav>}
  </header>
}
