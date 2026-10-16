import {useEffect,useState} from "react";
const BASE="https://pekpyiyivttrjjxsrarx.supabase.co";
const KEY="sb_publishable_byqYtROGi5NKkIWiZJ07uw_RMPhuMzS";
type Block={id:number;start_date:string;end_date:string};
const tr=(date:string)=>date.split("-").reverse().join(".");
export default function BookingBlocksAdmin({token}:{token:string}){
 const [blocks,setBlocks]=useState<Block[]>([]);
 const [from,setFrom]=useState("");
 const [to,setTo]=useState("");
 const [show,setShow]=useState(false);
 const [busy,setBusy]=useState(false);
 const [loading,setLoading]=useState(true);
 const [notice,setNotice]=useState("");
 const headers={apikey:KEY,Authorization:"Bearer "+token,"Content-Type":"application/json"};
 const load=async()=>{setLoading(true);try{const r=await fetch(BASE+"/rest/v1/booking_blocks?select=id,start_date,end_date&order=start_date.asc",{headers});if(!r.ok)throw Error("Kapalı tarihler okunamadı. Supabase SQL kurulumu gerekli olabilir ("+r.status+").");setBlocks(await r.json());}catch(e){setNotice(e instanceof Error?e.message:"Bağlantı hatası");}finally{setLoading(false)}};
 useEffect(()=>{void load()},[token]);
 const save=async(e:React.FormEvent)=>{e.preventDefault();if(!from||!to||to<from){setNotice("Başlangıç ve bitiş tarihlerini kontrol edin.");return;}setBusy(true);setNotice("");try{const r=await fetch(BASE+"/rest/v1/booking_blocks",{method:"POST",headers:{...headers,Prefer:"return=representation"},body:JSON.stringify({start_date:from,end_date:to})});if(!r.ok){const d=await r.json().catch(()=>({}));throw Error("Tarihler kapatılamadı: "+(d.message||r.status));}setShow(false);setFrom("");setTo("");await load();setNotice("Seçilen tarihler rezervasyona kapatıldı.");}catch(e){setNotice(e instanceof Error?e.message:"Kayıt hatası");}finally{setBusy(false)}};
 const remove=async(b:Block)=>{if(!window.confirm(tr(b.start_date)+" - "+tr(b.end_date)+" aralığını yeniden rezervasyona açmak istiyor musunuz?"))return;setBusy(true);setNotice("");try{const r=await fetch(BASE+"/rest/v1/booking_blocks?id=eq."+b.id,{method:"DELETE",headers:{...headers,Prefer:"return=representation"}});if(!r.ok)throw Error("Tarihler açılamadı ("+r.status+").");const rows=await r.json();if(!rows.length)throw Error("Silme yetkisi bulunamadı.");await load();setNotice("Tarih aralığı yeniden açıldı.");}catch(e){setNotice(e instanceof Error?e.message:"İşlem hatası");}finally{setBusy(false)}};
 return <div className="space-y-6">
  <div><h1 className="text-3xl font-bold">Rezervasyonu Kapat</h1><p className="text-gray-500 mt-2">Tüm odaların dolu olduğu tarih aralıklarını belirleyin. Başlangıç ve bitiş günleri de kapalı sayılır.</p></div>
  <button type="button" onClick={()=>setShow(true)} className="rounded-xl bg-red-700 text-white font-semibold px-6 py-3">+ Rezervasyonu Kapat</button>
  {notice&&<p role="status" className="bg-white border rounded-xl p-4">{notice}</p>}
  {show&&<div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"><form onSubmit={save} className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl space-y-5"><h2 className="text-xl font-bold">Tarih Aralığını Kapat</h2><label className="block font-medium">Başlangıç tarihi<input type="date" required value={from} onChange={e=>{setFrom(e.target.value);if(to&&to<e.target.value)setTo("");}} className="mt-2 block w-full border rounded-xl p-3"/></label><label className="block font-medium">Bitiş tarihi<input type="date" required min={from||undefined} value={to} onChange={e=>setTo(e.target.value)} className="mt-2 block w-full border rounded-xl p-3"/></label><p className="text-sm text-gray-600">Bu günlerde rezervasyon talebi kabul edilmeyecek. Çıkış günü dahil seçilen tarihler kapalı olacaktır.</p><div className="flex gap-3 justify-end"><button type="button" onClick={()=>setShow(false)} className="border rounded-xl px-5 py-3">Vazgeç</button><button disabled={busy} className="bg-red-700 text-white font-semibold rounded-xl px-5 py-3 disabled:opacity-50">{busy?"Kaydediliyor...":"Tarihleri Kapat"}</button></div></form></div>}
  <div className="bg-white border rounded-2xl p-5"><h2 className="text-xl font-semibold mb-4">Kapalı Tarihler</h2>{loading?<p>Yükleniyor...</p>:blocks.length===0?<p className="text-gray-500">Kapatılmış tarih bulunmuyor.</p>:<div className="space-y-3">{blocks.map(b=><div key={b.id} className="flex flex-wrap items-center justify-between gap-3 border rounded-xl p-4"><span className="font-medium">{tr(b.start_date)} – {tr(b.end_date)}</span><button type="button" disabled={busy} onClick={()=>remove(b)} className="border border-green-600 text-green-700 rounded-lg px-4 py-2 disabled:opacity-50">Yeniden Aç</button></div>)}</div>}</div>
 </div>;
}