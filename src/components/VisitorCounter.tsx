import { useEffect, useState } from "react";

const SUPABASE_URL = "https://pekpyiyivttrjjxsrarx.supabase.co";
const SUPABASE_KEY = "sb_publishable_byqYtROGi5NKkIWiZJ07uw_RMPhuMzS";

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const headers = {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
    };

    async function loadCounter() {
      try {
        const alreadyVisited =
          localStorage.getItem("golkoy_visitor_counted") === "yes";

        if (!alreadyVisited) {
          const response = await fetch(
            `${SUPABASE_URL}/rest/v1/rpc/increment_visitor_count`,
            { method: "POST", headers, body: "{}" }
          );

          if (!response.ok) throw new Error("Sayaç artırılamadı");

          const total = await response.json();
          setCount(Number(total));
          localStorage.setItem("golkoy_visitor_counted", "yes");
        } else {
          const response = await fetch(
            `${SUPABASE_URL}/rest/v1/site_visitor_counter?id=eq.1&select=total`,
            { headers }
          );

          if (!response.ok) throw new Error("Sayaç okunamadı");

          const data = await response.json();
          setCount(Number(data[0]?.total ?? 560));
        }
      } catch (error) {
        console.error("Ziyaretçi sayacı:", error);
      }
    }

    loadCounter();
  }, []);

  return (
    <section className="bg-white py-8 text-center">
      <div className="mx-auto max-w-xs rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5 shadow-sm">
        <p className="text-sm font-semibold tracking-wide text-amber-800">
          TOPLAM ZİYARETÇİ
        </p>
        <p className="mt-2 text-4xl font-bold text-slate-800">
          {count === null ? "—" : count.toLocaleString("tr-TR")}
        </p>
        <p className="mt-2 text-xs text-slate-500">
          Gölköy Yaşam Resort
        </p>
      </div>
    </section>
  );
}
