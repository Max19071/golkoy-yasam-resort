const imgs=[
 "./etkili%20bah%C3%A7eden%20otel.jpg",
 "./etkili%20oda.jpg",
 "./etkili%20havuzdan%20otel.jpg",
 "./etkili%20restorant%20sahne.jpg",
 "./etkili%20manej%20ikili.jpg",
 "./etkili%20do%C4%9Fal%20ya%C5%9Fam.jpg"
];
export default function Gallery(){
 return <section id="gallery" className="py-20 bg-slate-50"><div className="max-w-7xl mx-auto px-4">
  <div className="text-center mb-12"><span className="text-amber-600 font-semibold">GALERİ</span><h2 className="text-4xl font-bold mt-3">Tesisten Kareler</h2></div>
  <div className="grid md:grid-cols-3 gap-4">{imgs.map((src,i)=><img key={src} src={src} alt={'Gölköy Yaşam Resort tesis fotoğrafı '+(i+1)} className="w-full h-72 object-cover rounded-2xl"/>)}</div>
 </div></section>
}
