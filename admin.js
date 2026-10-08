const $=id=>document.getElementById(id),K="so_admin_listings",PK="so_admin_hash",SK="so_admin_session";
let L=[];
const sha=async s=>[...new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(s)))].map(b=>b.toString(16).padStart(2,"0")).join("");
const url=x=>!x.i?"":x.i.indexOf("http")===0?x.i:"https://images.unsplash.com/photo-"+x.i+"?auto=format&fit=crop&w=200&q=60";
const money=x=>"$"+x.p.toLocaleString("en-US")+(x.m==="rent"?"/mo":"");
const say=t=>{$("msg").textContent=t};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function gate(){const has=localStorage.getItem(PK);$("lt").textContent=has?"Admin login":"Create admin password";$("lh").textContent=has?"Enter your password to manage properties.":"First visit: choose a password (8+ characters). It is stored only in this browser.";if(sessionStorage.getItem(SK))start()}
$("login").addEventListener("submit",async e=>{e.preventDefault();const h=await sha($("pw").value),s=localStorage.getItem(PK);
 if(!s){localStorage.setItem(PK,h);sessionStorage.setItem(SK,"1");start()}else if(s===h){sessionStorage.setItem(SK,"1");start()}else $("le").textContent="Wrong password. Try again."});
$("out").addEventListener("click",()=>{sessionStorage.removeItem(SK);location.reload()});
async function start(){$("login").hidden=true;$("app").hidden=false;$("out").hidden=false;
 let o=null;try{o=JSON.parse(localStorage.getItem(K)||"null")}catch(e){}
 if(o&&o.length)L=o;else{try{L=await (await fetch("listings.json",{cache:"no-store"})).json()}catch(e){L=[];say("Could not load listings.json. Open this page from your live site or a local server.")}}
 draw()}
function save(){try{localStorage.setItem(K,JSON.stringify(L))}catch(e){say("Browser storage is full or blocked.")}}
function draw(){
 const buy=L.filter(x=>x.m==="buy").length;
 $("st").innerHTML=[["Total",L.length],["For sale",buy],["For rent",L.length-buy],["Cities",new Set(L.map(x=>x.c)).size]].map(a=>`<div class="panel"><div class="sp">${a[0]}</div><b>${a[1]}</b></div>`).join("");
 $("tb").innerHTML=L.length?L.map(x=>`<tr><td>${x.i?`<img src="${esc(url(x))}" alt="" onerror="this.style.visibility='hidden'">`:""}</td><td>${esc(x.t)}</td><td>${esc(x.c)}</td><td>${money(x)}</td><td>${x.m==="buy"?"Sale":"Rent"}</td><td><button class="btn alt sm" data-e="${x.id}">Edit</button> <button class="btn alt sm" data-d="${x.id}">Delete</button></td></tr>`).join(""):`<tr><td colspan="6">No properties yet. Add your first one above.</td></tr>`}
function clear(){$("pf").reset();$("eid").value="";$("ft").textContent="Add a property";$("sv").textContent="Add property"}
$("cl").addEventListener("click",clear);
$("pf").addEventListener("submit",e=>{e.preventDefault();
 const id=+$("eid").value||(Math.max(0,...L.map(x=>x.id))+1),old=L.find(x=>x.id===id);
 const x={id,i:$("i").value.trim(),t:$("t").value.trim(),c:$("c").value.trim(),y:$("y").value,m:$("m").value,p:+$("p").value,b:+$("b").value,ba:+$("ba").value,s:+$("s").value,h:old?old.h:Math.floor(Math.random()*360),n:$("n").value.trim()};
 old?L[L.indexOf(old)]=x:L.push(x);save();draw();clear();say(old?"Property updated.":"Property added.")});
$("tb").addEventListener("click",e=>{
 const ed=e.target.closest("[data-e]"),dl=e.target.closest("[data-d]");
 if(ed){const x=L.find(v=>v.id===+ed.dataset.e);[["eid","id"],["t","t"],["c","c"],["y","y"],["m","m"],["p","p"],["b","b"],["ba","ba"],["s","s"],["i","i"],["n","n"]].forEach(a=>$(a[0]).value=x[a[1]]??"");$("ft").textContent="Edit property";$("sv").textContent="Save changes";$("pf").scrollIntoView({behavior:"smooth"})}
 if(dl&&confirm("Delete this property?")){L=L.filter(v=>v.id!==+dl.dataset.d);save();draw();say("Property deleted.")}});
$("ex").addEventListener("click",()=>{const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(L,null,1)],{type:"application/json"}));a.download="listings.json";a.click();say("Downloaded. Upload listings.json to GitHub to publish.")});
$("imb").addEventListener("click",()=>$("imf").click());
$("imf").addEventListener("change",async e=>{try{const d=JSON.parse(await e.target.files[0].text());if(!Array.isArray(d))throw 0;L=d;save();draw();say("Imported "+d.length+" properties.")}catch(x){say("That file is not a valid listings.json.")}});
$("rs").addEventListener("click",async()=>{if(!confirm("Discard local changes and reload the published listings?"))return;localStorage.removeItem(K);try{L=await (await fetch("listings.json",{cache:"no-store"})).json()}catch(e){L=[]}draw();say("Reset to the published listings.")});
gate();
