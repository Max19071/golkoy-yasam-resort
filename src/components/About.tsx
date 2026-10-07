export default function About(){
  return <section id="about" className="py-20 bg-white">
    <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <span className="text-amber-600 font-semibold">HAKKIMIZDA</span>
        <h2 className="text-4xl font-bold mt-3 mb-6">Gölköy Yaşam Resort</h2>
        <p className="text-gray-600 leading-8">Misafirlerimize sakin, özenli ve konforlu bir konaklama deneyimi sunmayı amaçlayan Gölköy Yaşam Resort; dinlenmek, doğayla vakit geçirmek ve keyifli bir tatil geçirmek isteyen misafirler için sıcak bir atmosfer sunar.</p>
      </div>
      <img className="rounded-3xl shadow-xl w-full h-96 object-cover" src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200" alt="Gölköy Yaşam Resort"/>
    </div>
  </section>
}
