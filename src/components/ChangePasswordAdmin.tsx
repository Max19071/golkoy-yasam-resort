import {useState} from "react";
const URL="https://pekpyiyivttrjjxsrarx.supabase.co";
const KEY="sb_publishable_byqYtROGi5NKkIWiZJ07uw_RMPhuMzS";
export default function ChangePasswordAdmin({token}:{token:string}){
 const [password,setPassword]=useState("");
 const [repeat,setRepeat]=useState("");
 const [busy,setBusy]=useState(false);
 const [message,setMessage]=useState("");
 const [success,setSuccess]=useState(false);
 const submit=async(e:React.FormEvent)=>{
  e.preventDefault();setMessage("");setSuccess(false);
  if(password.length<8){setMessage("Yeni şifre en az 8 karakter olmalıdır.");return;}
  if(password!==repeat){setMessage("Şifreler eşleşmiyor.");return;}
  setBusy(true);
  try{
   const r=await fetch(URL+"/auth/v1/user",{method:"PUT",headers:{apikey:KEY,Authorization:"Bearer "+token,"Content-Type":"application/json"},body:JSON.stringify({password})});
   if(!r.ok){
    const d=await r.json().catch(()=>({}));
    if(r.status===401||r.status===403)throw new Error("Oturumunuzun süresi dolmuş. Açık oturumla şifre değiştirme yapılamadı.");
    throw new Error(typeof d.msg==="string"?d.msg:"Şifre değiştirilemedi. Lütfen tekrar deneyin.");
   }
   setPassword("");setRepeat("");setSuccess(true);setMessage("Şifreniz başarıyla değiştirildi. Yeni şifrenizle diğer bilgisayardan giriş yapabilirsiniz.");
  }catch(e){setMessage(e instanceof Error?e.message:"Şifre değiştirilemedi.");}
  finally{setBusy(false);}
 };
 return <div className="max-w-xl"><h1 className="text-3xl font-bold mb-2">Şifremi Değiştir</h1><p className="text-gray-600 mb-6">Mevcut yönetici oturumunuzla yeni şifre belirleyin. Şifrenizi kimseyle paylaşmayın.</p><form onSubmit={submit} className="bg-white border rounded-2xl p-6 space-y-4"><label className="block font-medium">Yeni şifre<input type="password" autoComplete="new-password" minLength={8} required value={password} onChange={e=>setPassword(e.target.value)} className="mt-2 w-full border rounded-xl p-3"/></label><label className="block font-medium">Yeni şifre tekrar<input type="password" autoComplete="new-password" minLength={8} required value={repeat} onChange={e=>setRepeat(e.target.value)} className="mt-2 w-full border rounded-xl p-3"/></label><button type="submit" disabled={busy} className="bg-amber-500 text-white font-semibold rounded-xl px-6 py-3 disabled:opacity-50">{busy?"Kaydediliyor...":"Şifreyi Değiştir"}</button>{message&&<p role="status" className={success?"text-green-700":"text-red-700"}>{message}</p>}</form></div>;
}
