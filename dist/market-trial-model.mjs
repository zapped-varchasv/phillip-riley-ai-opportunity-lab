export const signalTypes=['Industry news','Project update','Role change','Hiring activity'];
export const signalStatuses=['Needs verification','Ready for review','Approved for brief','Hold','Dismissed'];
export const signalFields=['title','company','type','url','published','captured','fact','relevance','question','owner','jobadder','capability','reviewer','status','baseline','assisted','outcome'];
export const blankMarketTrial=()=>({signals:[]});
export function updateSignal(s,key,value){
 if(!signalFields.includes(key))return;
 if(s[key]!==value&&s.status==='Approved for brief'&&!['status','baseline','assisted','outcome'].includes(key))s.status='Needs verification';
 s[key]=value;
}
export function safeSource(value){try{const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password?u.href:'';}catch{return '';}}
export function briefReady(s){return s.status==='Approved for brief'&&Boolean(safeSource(s.url))&&['title','company','published','fact','relevance','question','owner','reviewer'].every(k=>Boolean(s[k]?.trim()));}
export function importMarketTrial(input){
 if(input===undefined)return blankMarketTrial();
 if(!input||!Array.isArray(input.signals)||input.signals.length>100)throw new Error('Use a market worksheet with up to 100 signals.');
 const ids=new Set();
 return {signals:input.signals.map(s=>{
  if(!s||typeof s.id!=='string'||!/^[a-zA-Z0-9-]{1,80}$/.test(s.id)||ids.has(s.id))throw new Error('Market signal IDs must be unique.');
  ids.add(s.id);const out={id:s.id};
  for(const key of signalFields){const v=s[key]??'';if(typeof v!=='string'||v.length>4000)throw new Error('Market signal fields must be text of up to 4,000 characters.');out[key]=v;}
  if(!signalTypes.includes(out.type)||!signalStatuses.includes(out.status))throw new Error('Unknown market signal type or review status.');
  for(const k of ['published','captured'])if(out[k]&&(!/^\d{4}-\d{2}-\d{2}$/.test(out[k])||!Number.isFinite(Date.parse(out[k]))||new Date(out[k]).toISOString().slice(0,10)!==out[k]))throw new Error('Use valid dates for market signals.');
  for(const k of ['baseline','assisted'])if(out[k]!==''&&(!Number.isFinite(Number(out[k]))||Number(out[k])<0||Number(out[k])>10000))throw new Error('Minutes must be between 0 and 10,000.');
  return out;
 })};
}
export function measuredSignals(signals){
 const paired=signals.filter(s=>['baseline','assisted'].every(k=>s[k]?.trim()!==''&&s[k]!==undefined&&Number.isFinite(Number(s[k]))&&Number(s[k])>=0));
 const baseline=paired.reduce((n,s)=>n+Number(s.baseline),0),assisted=paired.reduce((n,s)=>n+Number(s.assisted),0);
 return {count:paired.length,baseline,assisted,released:baseline-assisted,percent:baseline>0?Math.round((baseline-assisted)/baseline*100):null};
}
export function marketBrief(s){
 if(!briefReady(s))throw new Error('Verify the source and complete the required fields before approving a brief.');
 return `PRG — MARKET INTELLIGENCE CALL BRIEF\nDraft for human review. No message has been sent.\n\nCompany: ${s.company}\nSignal: ${s.title}\nType: ${s.type}\nPublished: ${s.published}\nSource: ${s.url}\n\nSOURCE-SUPPORTED FACT\n${s.fact}\n\nPOSSIBLE RELEVANCE — STAFF HYPOTHESIS\n${s.relevance}\n\nQUESTION TO ASK\n${s.question}\n\nOWNER / REVIEWER\n${s.owner} / ${s.reviewer}\nJobAdder reference: ${s.jobadder||'Not linked'}\n\nCAPABILITY DOCUMENT INPUT\n${s.capability||'No approved capability content supplied. Ask Marketing for the current template and approved claims.'}\n\nNEXT STEP\nCheck existing JobAdder activity before contacting the company. Record the outcome in JobAdder; this worksheet does not sync.\nOutcome: ${s.outcome||'Not recorded'}\n\nThis is a template assembled from staff inputs, not AI research or a verified hiring forecast. Recheck dates and source accuracy before use.\n`;
}
