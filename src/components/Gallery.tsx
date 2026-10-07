const imgs=[
"https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=900",
"https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900",
"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900",
"https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=900",
"https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=900",
"https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900"];
export default function Gallery(){
 return <section id="gallery" className="py-20 bg-slate-50"><div className="max-w-7xl mx-auto px-4">
  <div className="text-center mb-12"><span className="text-amber-600 font-semibold">GALERİ</span><h2 className="text-4xl font-bold mt-3">Tesisten Kareler</h2></div>
  <div className="grid md:grid-cols-3 gap-4">{imgs.map((src,i)=><img key={src} src={src} alt={'Galeri '+(i+1)} className="w-full h-72 object-cover rounded-2xl"/>)}</div>
 </div></section>
}
