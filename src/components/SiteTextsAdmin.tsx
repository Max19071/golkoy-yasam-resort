import {useEffect,useState} from "react";
const URL="https://pekpyiyivttrjjxsrarx.supabase.co";
const KEY="sb_publishable_byqYtROGi5NKkIWiZJ07uw_RMPhuMzS";
type Entry={key:string;label:string;section:string;content:string};
export default function SiteTextsAdmin({token}:{token:string}){
 const [items,setItems]=useState<Entry[]>([]);
 const [drafts,setDrafts]=useState<Record<string,string>>({});
 const [loading,setLoading]=useState(true);
 const [saving,setSaving]=useState("");
 const [notice,setNotice]=useState("");
 const headers={apikey:KEY,Authorization:"Bearer "+token};
 const load=async()=>{
  setLoading(true);setNotice("");
  try{
   const r=await fetch(URL+"/rest/v1/site_texts?select=key,label,section,content&order=section.asc,label.asc",{headers});
   if(!r.ok)throw new Error("Yazılar okunamadı ("+r.status+")");
   const rows:Entry[]=await r.json();setItems(rows);setDrafts(Object.fromEntries(rows.map(x=>[x.key,x.content])));
  }catch(e){setNotice(e instanceof Error?e.message:"Bir hata oluştu");}
  finally{setLoading(false)}
 };
 useEffect(()=>{void load()},[token]);
 const save=async(item:Entry)=>{
  setSaving(item.key);setNotice("");
  try{
   const r=await fetch(URL+"/rest/v1/site_texts?key=eq."+encodeURIComponent(item.key),{
    method:"PATCH",headers:{...headers,"Content-Type":"application/json",Prefer:"return=representation"},
    body:JSON.stringify({content:drafts[item.key]??"",updated_at:new Date().toISOString()})
   });
   if(!r.ok)throw new Error("Kaydedilemedi ("+r.status+")");
   const rows:Entry[]=await r.json();
   if(!rows.length)throw new Error("Güncelleme yetkisi bulunamadı.");
   setItems(old=>old.map(x=>x.key===item.key?{...x,content:drafts[item.key]??""}:x));
   setNotice("Kaydedildi. Sitede sayfayı yenileyince görünecek.");
  }catch(e){setNotice(e instanceof Error?e.message:"Kayıt hatası");}
  finally{setSaving("")}
 };
 const sections=[...new Set(items.map(x=>x.section))];
 return <div><h1 className="text-3xl font-bold mb-2">Site İçerik Yönetimi</h1><p className="text-gray-500 mb-5">Metinleri değiştirip her birinin altındaki Kaydet düğmesine basın.</p>
 {notice&&<p role="status" className="bg-white border rounded-xl p-3 mb-4">{notice}</p>}
 {loading?<p>Yükleniyor...</p>:items.length===0?<p>Henüz düzenlenebilir metin bulunamadı.</p>:sections.map(section=><div key={section} className="mb-8"><h2 className="text-xl font-bold mb-3">{section}</h2><div className="grid gap-4">{items.filter(x=>x.section===section).map(item=><div key={item.key} className="bg-white border rounded-2xl p-5"><label htmlFor={item.key} className="block font-semibold mb-2">{item.label}</label><textarea id={item.key} rows={item.content.length>140?4:2} value={drafts[item.key]??""} onChange={e=>setDrafts(old=>({...old,[item.key]:e.target.value}))} className="w-full border rounded-xl p-3"/><div className="flex justify-end mt-2"><button type="button" disabled={saving!==""||drafts[item.key]===item.content} onClick={()=>save(item)} className="bg-amber-500 text-white rounded-xl px-5 py-2 font-semibold disabled:opacity-50">{saving===item.key?"Kaydediliyor...":"Kaydet"}</button></div></div>)}</div></div>)}
 </div>
}
