import { useEffect, useState } from "react";
const URL = "https://pekpyiyivttrjjxsrarx.supabase.co";
const KEY = "sb_publishable_byqYtROGi5NKkIWiZJ07uw_RMPhuMzS";
export function useSiteTexts() {
 const [texts,setTexts]=useState<Record<string,string>>({});
 useEffect(()=>{
  const controller=new AbortController();
  fetch(URL+"/rest/v1/site_texts?select=key,content",{headers:{apikey:KEY},signal:controller.signal})
   .then(r=>{if(!r.ok)throw new Error("Metinler okunamadı");return r.json()})
   .then((rows:{key:string;content:string}[])=>setTexts(Object.fromEntries(rows.map(row=>[row.key,row.content]))))
   .catch(e=>{if(e.name!=="AbortError")console.error(e)});
  return ()=>controller.abort();
 },[]);
 return (key:string,fallback:string)=>texts[key]??fallback;
}
