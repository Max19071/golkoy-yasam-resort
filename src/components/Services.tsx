const items=["Restoran","Açık Havuz","Oda Servisi","Transfer","Ücretsiz Wi‑Fi","Resepsiyon"];
export default function Services(){
 return <section id="services" className="py-20 bg-white"><div className="max-w-6xl mx-auto px-4">
  <div className="text-center mb-12"><span className="text-amber-600 font-semibold">HİZMETLER</span><h2 className="text-4xl font-bold mt-3">Misafirlerimiz İçin</h2></div>
  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">{items.map(x=><div key={x} className="p-8 rounded-2xl border bg-slate-50"><h3 className="text-xl font-semibold">{x}</h3></div>)}</div>
 </div></section>
}
