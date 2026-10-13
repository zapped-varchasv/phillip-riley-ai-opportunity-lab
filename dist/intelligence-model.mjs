export const sectors={engineering:'Renewable Energy Engineering',solar:'Solar',hydro:'Hydro',wind:'Wind',waste:'Waste to Energy',storage:'Energy Storage',transmission:'Transmission',ev:'Electric Vehicles'};
export const states=['NSW','VIC','QLD','SA','WA','TAS','ACT','NT'];
export const stages=['Concept and feasibility','Planning applications','Environmental assessment','Government approvals','Financing and investment decisions','Tendering and procurement','EPC contract awards','Detailed engineering','Construction preparation','Construction','Commissioning','Operational expansion'];
export const weights={maturity:25,demand:20,scale:15,momentum:15,relevance:15,confidence:10};
export const labels={maturity:'Maturity & hiring proximity',demand:'Evidence of recruitment demand',scale:'Scale & investment',momentum:'Recent project momentum',relevance:'Fit for Phillip Riley',confidence:'Source confidence'};
export const leadStatuses=['New','Reviewing','Ready to approach','Contacted','Follow-up','Monitor','Dismissed'];
export const normalise=v=>String(v??'').normalize('NFKC').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim().replace(/\s+/g,' ');
export function projectKey(p){return [normalise(p.name),p.state,normalise(p.region)].join('|');}
export function matchProject(p,existing){
 const exact=existing.filter(x=>projectKey(x)===projectKey(p));if(exact.length===1){const x=exact[0],conflict=['capacity','developer','technology'].some(k=>p[k]&&x[k]&&normalise(p[k])!==normalise(x[k]));return conflict?{kind:'review',ids:[x.id]}:{kind:'exact',id:x.id};}
 const names=new Set([p.name,...(p.aliases||[])].map(normalise));
 const candidates=existing.filter(x=>x.state===p.state&&([x.name,...(x.aliases||[])].some(n=>names.has(normalise(n)))||(normalise(x.region)===normalise(p.region)&&normalise(x.developer)===normalise(p.developer)&&!!p.developer&&x.sectors?.some(s=>p.sectors.includes(s)))));
 return candidates.length?{kind:'review',ids:candidates.map(x=>x.id)}:{kind:'new'};
}
export function scoreLead(assessment={}){
 let total=0;const breakdown=Object.entries(weights).map(([key,max])=>{const a=assessment[key]||{},points=Number(a.points??0);if(!Number.isFinite(points)||points<0||points>max)throw new Error(`${labels[key]} must be 0–${max}.`);if(points>0&&(!String(a.reason||'').trim()||!a.claimIds?.length))throw new Error(`${labels[key]} needs a reason and linked evidence.`);total+=points;return {key,label:labels[key],points,max,reason:a.reason||'No supported evidence supplied',claimIds:a.claimIds||[]};});
 return {total,priority:total>=80?'High priority':total>=60?'Medium priority':'Monitor',breakdown};
}
export function sydneyParts(at=new Date()) {const p=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:'Australia/Sydney',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',weekday:'short',hourCycle:'h23'}).formatToParts(new Date(at)).map(p=>[p.type,p.value]));return {date:`${p.year}-${p.month}-${p.day}`,month:`${p.year}-${p.month}`,day:p.weekday,minute:Number(p.hour)*60+Number(p.minute)};}
export const timetable=[['daily-discovery',360,null],['daily-normalise',420,null],['daily-verify',450,null],['daily-score',480,null],['weekly-snapshot',1380,'Sun'],['weekly-rank',0,'Mon'],['weekly-deep',60,'Mon'],['weekly-synthesis',300,'Mon'],['weekly-validate',420,'Mon'],['weekly-deliver',480,'Mon']];
export function dueSchedules(at){const p=sydneyParts(at);return timetable.filter(([,minute,day])=>(!day||day===p.day)&&minute<=p.minute).map(([kind])=>({kind,key:`${p.date}:${kind}`,date:p.date}));}
export const escapeHtml=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function safeUrl(value){try{const u=new URL(value);if(u.protocol!=='https:'||u.username||u.password||u.port||!u.hostname.includes('.')||/^(localhost|127\.|10\.|192\.168\.|169\.254\.|\[)/.test(u.hostname))return null;u.hash='';return u.href;}catch{return null;}}
