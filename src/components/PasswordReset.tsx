import {useEffect,useState} from "react";
const URL="https://pekpyiyivttrjjxsrarx.supabase.co";
const KEY="sb_publishable_byqYtROGi5NKkIWiZJ07uw_RMPhuMzS";
export function isRecoveryLink(){
 const hash=new URLSearchParams(window.location.hash.slice(1));
 const query=new URLSearchParams(window.location.search);
 return hash.get("type")==="recovery" || query.get("type")==="recovery" || query.has("token_hash") || hash.has("error");
}
export default function PasswordReset(){
 const [token,setToken]=useState("");
 const [password,setPassword]=useState("");
 const [confirm,setConfirm]=useState("");
 const [message,setMessage]=useState("");
 const [busy,setBusy]=useState(false);
 const [complete,setComplete]=useState(false);
 useEffect(()=>{
  const hash=new URLSearchParams(window.location.hash.slice(1));
  const query=new URLSearchParams(window.location.search);
  const access=hash.get("access_token");
  const tokenHash=query.get("token_hash");
  const error=hash.get("error_description")||query.get("error_description");
  // Remove recovery credentials from the browser address bar immediately.
  window.history.replaceState(null,"",window.location.pathname);
  if(error){setMessage(decodeURIComponent(error.replace(/\+/g," ")));return;}
  if(access){setToken(access);return;}
  if(tokenHash){
   fetch(URL+"/auth/v1/verify",{method:"POST",headers:{apikey:KEY,"Content-Type":"application/json"},body:JSON.stringify({token_hash:tokenHash,type:"recovery"})})
    .then(async r=>{const d=await r.json();if(!r.ok||!d.access_token)throw new Error("Bağlantı geçersiz veya süresi dolmuş.");setToken(d.access_token)})
    .catch(e=>setMessage(e.message));
   return;
  }
  setMessage("Şifre sıfırlama bağlantısı geçersiz veya süresi dolmuş. Yeni e-posta isteyin.");
 },[]);
 const submit=async(e:React.FormEvent)=>{
  e.preventDefault();setMessage("");
  if(password.length<8){setMessage("Şifreniz en az 8 karakter olmalı.");return;}
  if(password!==confirm){setMessage("İki şifre aynı değil.");return;}
  setBusy(true);
  try{
   const r=await fetch(URL+"/auth/v1/user",{method:"PUT",headers:{apikey:KEY,Authorization:"Bearer "+token,"Content-Type":"application/json"},body:JSON.stringify({password})});
   if(!r.ok)throw new Error("Şifre güncellenemedi. Bağlantı süresi dolmuş olabilir; yeni sıfırlama e-postası isteyin.");
   setComplete(true);setToken("");setPassword("");setConfirm("");setMessage("Şifreniz başarıyla değiştirildi.");
  }catch(e){setMessage(e instanceof Error?e.message:"Bir hata oluştu.");}
  finally{setBusy(false);}
 };
 return <main className="min-h-screen bg-slate-100 flex items-center justify-center p-4"><div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8"><img src="./amblem.jpg" alt="Gölköy Yaşam Resort" className="w-20 h-20 object-contain mx-auto"/><h1 className="text-2xl font-bold text-center mt-4">Yeni Şifre Oluştur</h1><p className="text-center text-gray-500 mt-2">Gölköy Yaşam Resort Yönetim Paneli</p>
 {message&&<p role="status" className="mt-5 p-3 rounded-xl bg-amber-50 text-slate-800">{message}</p>}
 {complete?<a href="./?admin=1" className="block text-center mt-6 rounded-xl bg-amber-500 text-white font-semibold py-3">Yönetim Paneline Giriş Yap</a>:token?<form onSubmit={submit} className="mt-6 space-y-4"><label className="block font-medium">Yeni şifre<input type="password" autoComplete="new-password" required minLength={8} value={password} onChange={e=>setPassword(e.target.value)} className="mt-2 w-full border rounded-xl px-4 py-3"/></label><label className="block font-medium">Yeni şifre (tekrar)<input type="password" autoComplete="new-password" required minLength={8} value={confirm} onChange={e=>setConfirm(e.target.value)} className="mt-2 w-full border rounded-xl px-4 py-3"/></label><button disabled={busy} className="w-full bg-amber-500 text-white font-semibold rounded-xl py-3 disabled:opacity-50">{busy?"Kaydediliyor...":"Şifreyi Değiştir"}</button></form>:<p className="text-sm text-gray-500 mt-4">Bağlantı geçersizse Supabase üzerinden yeni şifre sıfırlama e-postası gönderin.</p>}
 </div></main>;
}
