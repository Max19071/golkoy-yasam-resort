const rooms=[
 {name:"Standart Oda",desc:"Konforlu ve ferah konaklama alanı.",img:"https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900"},
 {name:"Deluxe Oda",desc:"Daha geniş yaşam alanı ve şık detaylar.",img:"https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=900"},
 {name:"Aile Odası",desc:"Ailece rahat konaklama için tasarlandı.",img:"https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=900"},
];
export default function Rooms(){
 return <section id="rooms" className="py-20 bg-slate-50"><div className="max-w-7xl mx-auto px-4">
  <div className="text-center mb-12"><span className="text-amber-600 font-semibold">ODALARIMIZ</span><h2 className="text-4xl font-bold mt-3">Konforlu Konaklama</h2></div>
  <div className="grid md:grid-cols-3 gap-8">{rooms.map(r=><article key={r.name} className="bg-white rounded-3xl overflow-hidden shadow-lg"><img src={r.img} alt={r.name} className="h-64 w-full object-cover"/><div className="p-6"><h3 className="text-2xl font-bold">{r.name}</h3><p className="mt-3 text-gray-600">{r.desc}</p></div></article>)}</div>
 </div></section>
}
