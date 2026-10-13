import { useEffect, useState } from "react";
const URL_BASE = "https://pekpyiyivttrjjxsrarx.supabase.co";
const KEY = "sb_publishable_byqYtROGi5NKkIWiZJ07uw_RMPhuMzS";
type Room = {
  id: number;
  name: string;
  description: string;
  capacity: number;
  cover_image: string;
  gallery_images: string[];
  is_active: boolean;
  display_order: number;
};

export default function Rooms(){
const [hotelRooms, setHotelRooms] = useState<Room[]>([]);
useEffect(() => {
  fetch(`${URL_BASE}/rest/v1/hotel_rooms?select=*&is_active=eq.true&order=display_order.asc`, {
    headers: {
      apikey: KEY,
      Authorization: `Bearer ${KEY}`
    }
  })
    .then(response => response.json())
    .then(data => {
      if (Array.isArray(data)) setHotelRooms(data);
    })
    .catch(error => console.error("Odalar yüklenemedi:", error));
}, []);
 return <section id="rooms" className="py-20 bg-slate-50"><div className="max-w-7xl mx-auto px-4">
  <div className="text-center mb-12"><span className="text-amber-600 font-semibold">ODALARIMIZ</span><h2 className="text-4xl font-bold mt-3">Konforlu Konaklama</h2></div>
  <div className="grid md:grid-cols-3 gap-8">{hotelRooms.map(r=><article key={r.id} className="bg-white rounded-3xl overflow-hidden shadow-lg"><img src={r.cover_image} alt={r.name} className="h-64 w-full object-cover"/><div className="p-6"><h3 className="text-2xl font-bold">{r.name}</h3><p className="mt-3 text-gray-600">{r.description}</p></div></article>)}</div>
 </div></section>
}
