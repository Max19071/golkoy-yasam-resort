
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
    prices_by_occupancy?: Record<string, number | null> | null;
};

export default function Rooms() {
  const [hotelRooms, setHotelRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    fetch(
      `${URL_BASE}/rest/v1/hotel_rooms?select=*&is_active=eq.true&order=display_order.asc`,
      {
        headers: {
          apikey: KEY,
          Authorization: `Bearer ${KEY}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setHotelRooms(data);
      })
      .catch((error) =>
        console.error("Odalar yüklenemedi:", error)
      );
  }, []);

  const getPhotos = (room: Room) => {
    return [
      room.cover_image,
      ...(Array.isArray(room.gallery_images)
        ? room.gallery_images
        : []),
    ].filter(
      (photo): photo is string =>
        typeof photo === "string" && photo.trim().length > 0
    );
  };

  const openGallery = (room: Room) => {
    if (getPhotos(room).length === 0) return;
    setSelectedRoom(room);
    setPhotoIndex(0);
  };

  const closeGallery = () => {
    setSelectedRoom(null);
    setPhotoIndex(0);
  };

  const changePhoto = (direction: number) => {
    if (!selectedRoom) return;

    const total = getPhotos(selectedRoom).length;
    if (total === 0) return;

    setPhotoIndex((current) =>
      (current + direction + total) % total
    );
  };

  const selectedPhotos = selectedRoom
    ? getPhotos(selectedRoom)
    : [];

  return (
    <>
      <section id="rooms" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-amber-600 font-semibold">
              ODALARIMIZ
            </span>
            <h2 className="text-4xl font-bold mt-3">
              Konforlu Konaklama
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {hotelRooms.map((room) => (
              <article
                key={room.id}
                className="bg-white rounded-3xl overflow-hidden shadow-lg"
              >
                <button
                  type="button"
                  onClick={() => openGallery(room)}
                  disabled={getPhotos(room).length === 0}
                  className="block w-full text-left cursor-pointer disabled:cursor-default"
                  aria-label={`${room.name} fotoğraf galerisini aç`}
                >
                  <img
                    src={room.cover_image}
                    alt={room.name}
                    className="h-64 w-full object-cover"
                  />
                </button>

                <div className="p-6">
                  <h3 className="text-2xl font-bold">
                    {room.name}
                  </h3>
                  <p className="mt-3 text-gray-600">
                    {room.description}
                  </p>
<div className="mt-4 rounded-xl bg-amber-50 p-4">
  <label className="block text-sm font-semibold mb-2">
    Kişi Sayısı ve Gecelik Fiyat
  </label>

  <div className="space-y-2">
    {Array.from(
      { length: Math.max(1, room.capacity) },
      (_, i) => i + 1
    ).map((count) => {
      const price = room.prices_by_occupancy?.[String(count)];

      return (
        <div
          key={count}
          className="flex justify-between text-sm"
        >
          <span>{count} Kişilik</span>
          <span className="font-semibold">
            {typeof price === "number"
              ? `${price.toLocaleString("tr-TR")} TL / gece`
              : "Fiyat için bilgi alınız"}
          </span>
        </div>
      );
    })}
  </div>
</div>
                  {getPhotos(room).length > 0 && (
                    <button
                      type="button"
                      onClick={() => openGallery(room)}
                      className="mt-4 text-amber-700 font-semibold hover:underline"
                    >
                      Fotoğrafları Gör (
                      {getPhotos(room).length})
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {selectedRoom && selectedPhotos.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedRoom.name} fotoğraf galerisi`}
          onClick={closeGallery}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between text-white mb-4">
              <h3 className="text-xl font-bold">
                {selectedRoom.name}
              </h3>
              <button
                type="button"
                onClick={closeGallery}
                className="text-3xl px-3"
                aria-label="Galeriyi kapat"
              >
                ×
              </button>
            </div>

            <div className="relative flex items-center justify-center">
              <img
                src={selectedPhotos[photoIndex]}
                alt={`${selectedRoom.name} - Fotoğraf ${
                  photoIndex + 1
                }`}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg"
              />

              {selectedPhotos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => changePhoto(-1)}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/60 text-white text-3xl rounded-full w-12 h-12"
                    aria-label="Önceki fotoğraf"
                  >
                    ‹
                  </button>

                  <button
                    type="button"
                    onClick={() => changePhoto(1)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/60 text-white text-3xl rounded-full w-12 h-12"
                    aria-label="Sonraki fotoğraf"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            <p className="text-center text-white mt-4">
              {photoIndex + 1} / {selectedPhotos.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
