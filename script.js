const CFG={wa:"919555083044",email:"vyashikadigital@gmail.com",brand:"Summit & Oak Realty",formspree:"",ga:""};
if(CFG.ga){const s=document.createElement("script");s.async=1;s.src="https://www.googletagmanager.com/gtag/js?id="+CFG.ga;document.head.appendChild(s);window.dataLayer=[];window.gtag=function(){dataLayer.push(arguments)};gtag("js",new Date());gtag("config",CFG.ga)}
async function loadData(){try{const r=await fetch("listings.json",{cache:"no-store"});if(r.ok)L=await r.json()}catch(e){}try{const o=JSON.parse(localStorage.getItem("so_admin_listings")||"null");if(o&&o.length)L=o}catch(e){}}
function fb(el,h){el.outerHTML=art(h)}
function pic(x){if(!x.i)return art(x.h);const u=x.i.indexOf("http")===0?x.i:"https://images.unsplash.com/photo-"+x.i+"?auto=format&fit=crop&w=800&q=70";return `<img src="${u}" alt="${x.t}" loading="lazy" onerror="fb(this,${x.h})">`}
let L=[
{id:1,i:"1564013799919-ab600027ffc6",t:"Hill Country Modern",c:"Austin, TX",y:"House",m:"buy",p:685000,b:4,ba:3,s:2850,h:160,n:"Open floor plan, chef's kitchen, covered patio and a two-car garage near top-rated schools."},
{id:2,i:"1545324418-cc1a3fa10c00",t:"Bayfront Corner Condo",c:"Miami, FL",y:"Condo",m:"buy",p:540000,b:2,ba:2,s:1320,h:200,n:"Floor-to-ceiling windows, water views, a resort-style pool and 24-hour concierge."},
{id:3,i:"1568605114967-8130f3a36994",t:"Desert Ridge Ranch",c:"Phoenix, AZ",y:"House",m:"buy",p:459000,b:3,ba:2,s:2100,h:25,n:"Single-story home with a pool, solar panels and a low-maintenance desert yard."},
{id:4,i:"1570129477492-45c003edd2be",t:"Uptown Townhome",c:"Charlotte, NC",y:"Townhome",m:"buy",p:398000,b:3,ba:3,s:1780,h:340,n:"Walkable to light rail, restaurants and parks. Rooftop deck and attached garage."},
{id:5,i:"1502672260266-1c1ef2d93688",t:"Music Row Loft",c:"Nashville, TN",y:"Condo",m:"rent",p:2450,b:1,ba:1,s:920,h:280,n:"Exposed brick, 12-foot ceilings, in-unit laundry and pet-friendly building."},
{id:6,i:"1580587771525-78b9dba3b914",t:"Garden Bungalow",c:"Denver, CO",y:"House",m:"buy",p:725000,b:4,ba:3,s:2400,h:100,n:"Renovated 1940s bungalow with a fenced yard and finished basement."},
{id:7,i:"1522708323590-d24dbb6b0267",t:"Harbor View Apartment",c:"Tampa, FL",y:"Condo",m:"rent",p:2980,b:2,ba:2,s:1210,h:180,n:"Balcony, gym, covered parking and a short walk to the Riverwalk."},
{id:8,i:"1600596542815-ffad4c1539a9",t:"Family Craftsman",c:"Austin, TX",y:"House",m:"rent",p:3650,b:4,ba:3,s:2300,h:40,n:"Available now. Large yard, two living areas, close to downtown."},
{id:9,i:"1605276374104-dee2a0ed3cd6",t:"Midtown Townhome",c:"Denver, CO",y:"Townhome",m:"rent",p:3100,b:3,ba:2,s:1650,h:300,n:"Bright end unit with a private patio and two reserved parking spots."}];
const $=id=>document.getElementById(id),$$=s=>[...document.querySelectorAll(s)];
let mode="buy",saved=new Set(),onlySaved=false;
try{saved=new Set(JSON.parse(localStorage.getItem("so_saved")||"[]"))}catch(e){}
const store=()=>{try{localStorage.setItem("so_saved",JSON.stringify([...saved]))}catch(e){}};
const money=n=>"$"+n.toLocaleString("en-US");
const price=x=>x.m==="rent"?money(x.p)+"/mo":money(x.p);
const wa=m=>"https://wa.me/"+CFG.wa+"?text="+encodeURIComponent(m);
const mail=(s,m)=>"mailto:"+CFG.email+"?subject="+encodeURIComponent(s)+"&body="+encodeURIComponent(m);
function art(h){return `<svg viewBox="0 0 320 200" role="img" aria-label="Illustration of the property"><defs><linearGradient id="g${h}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="hsl(${h},55%,82%)"/><stop offset="1" stop-color="hsl(${h},45%,94%)"/></linearGradient></defs><rect width="320" height="200" fill="url(#g${h})"/><circle cx="268" cy="44" r="18" fill="#fff" opacity=".8"/><rect y="150" width="320" height="50" fill="hsl(${h},30%,38%)"/><rect x="70" y="86" width="180" height="70" fill="hsl(${h},25%,96%)"/><polygon points="58,90 160,36 262,90" fill="hsl(${h},45%,28%)"/><rect x="146" y="112" width="28" height="44" fill="hsl(${h},45%,28%)"/><rect x="88" y="104" width="38" height="28" fill="hsl(${h},60%,75%)"/><rect x="194" y="104" width="38" height="28" fill="hsl(${h},60%,75%)"/></svg>`}
function init(){
 [...new Set(L.map(x=>x.c))].sort().forEach(c=>$("fc").add(new Option(c,c)));
 $("yr").textContent=new Date().getFullYear();
 $("aph").href=wa("Hi, I'd like to talk about a property.");$("aem").href="mailto:"+CFG.email;
 setPrices();calc();render();
}
function setPrices(){
 const o=mode==="buy"?[["Any price",0],["$400,000",400000],["$600,000",600000],["$800,000",800000]]:[["Any price",0],["$2,500/mo",2500],["$3,000/mo",3000],["$3,500/mo",3500]];
 $("fp").innerHTML=o.map(a=>`<option value="${a[1]}">${a[0]}</option>`).join("");
}
function list(){
 let r=L.filter(x=>x.m===mode);
 const c=$("fc").value,t=$("ft").value,p=+$("fp").value,b=+$("fb").value;
 if(c)r=r.filter(x=>x.c===c);if(t)r=r.filter(x=>x.y===t);if(p)r=r.filter(x=>x.p<=p);if(b)r=r.filter(x=>x.b>=b);
 if(onlySaved)r=r.filter(x=>saved.has(x.id));
 const s=$("so").value;
 if(s==="lo")r.sort((a,b)=>a.p-b.p);else if(s==="hi")r.sort((a,b)=>b.p-a.p);else if(s==="sq")r.sort((a,b)=>b.s-a.s);else r.sort((a,b)=>b.id-a.id);
 return r;
}
function render(){
 const r=list();
 $("count").textContent=r.length+(r.length===1?" property":" properties")+(mode==="buy"?" for sale":" for rent");
 $("savedNav").textContent="Saved ("+saved.size+")";
 $("grid").innerHTML=r.length?r.map(x=>`<article class="card"><div class="im"><button class="im" data-open="${x.id}" aria-label="View details for ${x.t}">${pic(x)}</button><span class="tag">${x.m==="buy"?"For sale":"For rent"}</span><button class="fav" data-fav="${x.id}" aria-pressed="${saved.has(x.id)}" aria-label="Save ${x.t}">&#9829;</button></div><div class="cb"><div class="pr">${price(x)}</div><h3 style="font-size:19px">${x.t}</h3><div class="sp">${x.b} bd &middot; ${x.ba} ba &middot; ${x.s.toLocaleString("en-US")} sqft</div><div class="sp">${x.c} &middot; ${x.y}</div><button class="btn alt" data-open="${x.id}" style="margin-top:8px">View details</button></div></article>`).join(""):`<div class="empty"><h3>No matches yet</h3><p class="sp" style="margin:6px 0 12px">Try a different city, a higher price or fewer bedrooms.</p><button class="btn" id="reset">Clear filters</button></div>`;
}
function openP(id){
 const x=L.find(v=>v.id===id),q="Hi, I'm interested in "+x.t+" ("+x.c+", "+price(x)+"). Is it still available?";
 $("dbody").innerHTML=`${pic(x)}<div class="dc"><div class="pr">${price(x)}</div><h3 style="font-size:24px">${x.t}</h3><div class="sp">${x.c} &middot; ${x.y} &middot; ${x.b} bd &middot; ${x.ba} ba &middot; ${x.s.toLocaleString("en-US")} sqft</div><p>${x.n}</p><div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn" href="${wa(q)}" target="_blank" rel="noopener">Ask on WhatsApp</a><a class="btn alt" href="${mail("Inquiry: "+x.t,q)}">Email an agent</a></div></div>`;
 $("dlg").showModal();
}
function calc(){
 const P=+$("cp").value||0,d=Math.min(Math.max(+$("cd").value||0,0),100),r=(+$("cr").value||0)/1200,n=(+$("cy").value)*12,L0=P*(1-d/100);
 const m=r?L0*r/(1-Math.pow(1+r,-n)):L0/n;
 $("cout").textContent=money(Math.round(m))+"/mo";
 $("cnote").textContent="Loan amount "+money(Math.round(L0))+" with "+money(Math.round(P-L0))+" down.";const tot=m*n,pp=tot?Math.round(L0/tot*100):100;$("dn").style.background="conic-gradient(var(--amber) 0 "+pp+"%,rgba(255,255,255,.18) 0)";$("dnote").textContent="Principal "+pp+"%, interest "+(100-pp)+"% over the full term.";
}
$("sf").addEventListener("submit",e=>{e.preventDefault();render();$("listings").scrollIntoView({behavior:"smooth"})});
$$(".tabs button").forEach(b=>b.addEventListener("click",()=>{mode=b.dataset.m;$$(".tabs button").forEach(k=>k.setAttribute("aria-pressed",k===b));setPrices();render()}));
["fc","ft","fp","fb","so"].forEach(i=>$(i).addEventListener("change",render));
$("savedOnly").addEventListener("click",e=>{onlySaved=!onlySaved;e.currentTarget.setAttribute("aria-pressed",onlySaved);render()});
$("savedNav").addEventListener("click",()=>{onlySaved=true;$("savedOnly").setAttribute("aria-pressed","true");render()});
$("grid").addEventListener("click",e=>{
 const o=e.target.closest("[data-open]"),f=e.target.closest("[data-fav]");
 if(o)openP(+o.dataset.open);
 if(f){const id=+f.dataset.fav;saved.has(id)?saved.delete(id):saved.add(id);store();render()}
 if(e.target.id==="reset"){["fc","ft","fp"].forEach(i=>$(i).value="");$("fb").value="0";onlySaved=false;$("savedOnly").setAttribute("aria-pressed","false");render()}
});
$("dx").addEventListener("click",()=>$("dlg").close());
$("dlg").addEventListener("click",e=>{if(e.target===$("dlg"))$("dlg").close()});
["cp","cd","cr","cy"].forEach(i=>$(i).addEventListener("input",calc));
$("cf").addEventListener("submit",e=>{
 e.preventDefault();
 const ch=e.submitter&&e.submitter.dataset.ch,m="Name: "+$("cn").value+"\nPhone: "+$("cph").value+"\n"+$("cm").value;
 if(ch==="em"&&CFG.formspree){fetch(CFG.formspree,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({name:$("cn").value,phone:$("cph").value,message:$("cm").value})}).then(r=>{$("cok").textContent=r.ok?"Thanks, we received your message.":"Could not send. Please use WhatsApp."});return}
 if(ch==="em")location.href=mail("Property inquiry from "+$("cn").value,m);else window.open(wa(m),"_blank","noopener");
 $("cok").textContent="Thanks, "+$("cn").value+". Your message is ready to send.";
});
loadData().then(()=>{init();
(function(){
const W=$("world");
[[-130,-100,70,70,150,170],[-40,-120,60,60,90,190],[40,-70,80,80,210,160],[-120,10,60,80,70,200],[10,40,70,60,120,175],[100,50,60,60,60,185],[-30,-30,40,40,250,165]].forEach(([x,y,w,d,h,hu])=>{
 const b=document.createElement("div");b.className="b";b.style.cssText=`left:${x}px;top:${y}px;width:${w}px;height:${d}px`;
 const f=(c,a,z,t)=>`<i class="f ${c}" style="width:${a}px;height:${z}px;--h:${hu};transform:${t}"></i>`;
 b.innerHTML=f("s1",w,h,"rotateX(90deg)")+f("s1",w,h,`translateY(${d}px) rotateX(90deg)`)+f("s2",d,h,"rotateZ(90deg) rotateX(90deg)")+f("s2",d,h,`translateX(${w}px) rotateZ(90deg) rotateX(90deg)`)+f("tp",w,d,`translateZ(${h}px)`);
 W.appendChild(b);
});
if(matchMedia("(hover:hover)").matches){
 const tilt=(el,k)=>{
  el.addEventListener("pointermove",e=>{const c=(el.id==="grid"?e.target.closest(".card"):el);if(!c)return;const r=c.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(900px) rotateY(${px*k}deg) rotateX(${-py*k}deg)`});
  el.addEventListener("pointerout",e=>{const c=(el.id==="grid"?e.target.closest(".card"):el);if(c&&!c.contains(e.relatedTarget))c.style.transform=""});
 };
 tilt($("grid"),10);tilt($("ph"),14);
}
const cities=[...new Set(L.map(x=>x.c))];let cur="";
function setMap(c){cur=c;$("mframe").src="https://maps.google.com/maps?q="+encodeURIComponent(c)+"&z=11&output=embed";$$("#mchips .chip").forEach(b=>b.setAttribute("aria-pressed",b.dataset.c===c));$("mgo").textContent="See homes in "+c}
$("mchips").innerHTML=cities.map(c=>`<button class="chip" data-c="${c}" aria-pressed="false">${c}</button>`).join("");
$("mchips").addEventListener("click",e=>{const b=e.target.closest("[data-c]");if(b)setMap(b.dataset.c)});
$("mgo").addEventListener("click",()=>{$("fc").value=cur;onlySaved=false;$("savedOnly").setAttribute("aria-pressed","false");render();$("listings").scrollIntoView({behavior:"smooth"})});
setMap(cities[0]);
})();});

const HI={nl:"लिस्टिंग",nm:"नक्शा",nc:"मॉर्गेज कैलकुलेटर",nt:"संपर्क",h1:"अपनी ज़िंदगी के हिसाब से सही घर खोजें।",fp:"चुनिंदा प्रॉपर्टी",ec:"शहर के अनुसार देखें",em:"अपनी मासिक किस्त का अंदाज़ा लगाएं",sh:"घर खोजें",tt:"ग्राहक क्या कहते हैं",bl:"खरीदने और किराये की गाइड",fq:"अक्सर पूछे जाने वाले सवाल"};
let lang="en",th="dark";
try{lang=localStorage.getItem("so_lang")||"en";th=localStorage.getItem("so_theme")||"dark"}catch(e){}
function applyLang(){$$("[data-t]").forEach(e=>{if(!e.dataset.en)e.dataset.en=e.textContent;e.textContent=lang==="hi"?HI[e.dataset.t]:e.dataset.en});document.documentElement.lang=lang==="hi"?"hi":"en-US";$("lng").textContent=lang==="hi"?"EN":"हिं"}
function applyTheme(){document.documentElement.dataset.theme=th;$("thm").textContent=th==="dark"?"Light":"Dark"}
$("lng").addEventListener("click",()=>{lang=lang==="hi"?"en":"hi";try{localStorage.setItem("so_lang",lang)}catch(e){}applyLang()});
$("thm").addEventListener("click",()=>{th=th==="dark"?"light":"dark";try{localStorage.setItem("so_theme",th)}catch(e){}applyTheme()});
applyLang();applyTheme();
