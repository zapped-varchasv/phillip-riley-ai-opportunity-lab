export const clientCriteria = [
 ['first-option','Commitment to first option on positions','How consistently does this client give PRG the first opportunity to work on a vacancy?'],
 ['multiple-positions','Multiple positions','Consider the number and regularity of suitable vacancies.'],
 ['direct-interviews','Gives direct interviews','Consider access to interviews for appropriately qualified candidates.'],
 ['detailed-feedback','Detailed feedback','Consider how specific, useful and timely their feedback is.'],
 ['pays-on-time','Pays on time','Use payment history against agreed terms, where available.'],
 ['listens','Listens to my advice','Consider whether relevant recruitment advice is heard and acted on.'],
 ['brand','Great brand and name','Consider the brand’s ability to attract relevant candidates.'],
 ['process','Happy to work to our process','Consider cooperation with the agreed recruitment process.'],
 ['exclusivity','Exclusivity','Use the actual agreed terms and working arrangements.'],
 ['future','Lots of future potential','Use evidenced hiring plans rather than unsupported expectations.'],
 ['friendly','Friendly','Consider respectful, constructive professional interactions.'],
 ['trust','Trusts my judgement','Consider demonstrated confidence in professional recommendations.'],
 ['stable','Stable business with a clear plan','Use available business and hiring plans; flag missing information.'],
 ['location','Location','Assess fit with the team’s service coverage and relevant candidate market.'],
 ['environment','Great environment','Use evidenced working conditions and candidate feedback.'],
 ['relationship','Long term relationship already','Consider the established relationship and its continuity.'],
 ['above-average','Above average payer','Agree what “above average” means; keep distinct from payment timeliness and fee rates.'],
 ['campaign','Invites me in to plan for the recruitment campaign','Consider early involvement in planning and setting realistic expectations.'],
 ['fees','High rates / fees','Compare agreed commercial rates against a consistent team benchmark.'],
 ['communication','Clear, honest and regular communication','Consider clarity, reliability and responsiveness of communications.']
].map(([id,label,help])=>({id,label,help}));
const ids=new Set(clientCriteria.map(c=>c.id));
export const blankClientTrial=()=>({selected:[],clients:[]});
export function validSelection(selected){return Array.isArray(selected)&&selected.length===10&&new Set(selected).size===10&&selected.every(id=>ids.has(id));}
export function clientResult(client,selected){
 if(!validSelection(selected))return {complete:false,scored:0,total:null,category:null,reason:'Select 10 criteria'};
 const values=selected.map(id=>client.scores?.[id]);
 const isScore=v=>typeof v==='number'&&Number.isInteger(v)&&v>=0&&v<=10;
 const scored=values.filter(isScore).length;
 if(scored!==10||!client.name?.trim())return {complete:false,scored,total:null,category:null,reason:!client.name?.trim()?'Add a client label':`${10-scored} score${10-scored===1?'':'s'} missing`};
 const total=values.reduce((a,b)=>a+b,0);
 return {complete:true,scored,total,category:total>=80?'A':total>=60?'B':'C',reason:''};
}
export function rankClients(data){
 const rows=data.clients.map(client=>({client,...clientResult(client,data.selected)}));
 rows.sort((a,b)=>Number(b.complete)-Number(a.complete)||(b.total??-1)-(a.total??-1)||a.client.name.localeCompare(b.client.name));
 let lastTotal=null,lastRank=0;
 return rows.map((row,i)=>{if(row.complete){if(row.total!==lastTotal)lastRank=i+1;lastTotal=row.total;return {...row,rank:lastRank};}return {...row,rank:null};});
}
export function importClientTrial(value){
 if(value===undefined)return blankClientTrial();
 if(!value||!Array.isArray(value.selected)||!Array.isArray(value.clients)||value.clients.length>100)throw new Error('Client trial must contain a criteria list and no more than 100 clients.');
 if(!(value.selected.length===0||validSelection(value.selected)))throw new Error('The client trial must use exactly 10 different recognised criteria, or no criteria yet.');
 const seen=new Set(),text=(v,max)=>{if(v===undefined)return '';if(typeof v!=='string'||v.length>max)throw new Error('Invalid client assessment text.');return v;};
 return {selected:[...value.selected],clients:value.clients.map(c=>{
  if(!c||typeof c.id!=='string'||!/^[a-zA-Z0-9-]{1,80}$/.test(c.id)||seen.has(c.id))throw new Error('Each client assessment needs a unique valid ID.');seen.add(c.id);
  const out={id:c.id,name:text(c.name,120),reviewer:text(c.reviewer,120),next:text(c.next,2000),updatedAt:text(c.updatedAt,40),scores:{},evidence:{}};
  for(const field of ['scores','evidence'])if(c[field]!==undefined&&(!c[field]||typeof c[field]!=='object'||Array.isArray(c[field])))throw new Error('Invalid client assessment fields.');
  for(const id of ids){const score=c.scores?.[id];if(score!==undefined&&score!==null){if(typeof score!=='number'||!Number.isInteger(score)||score<0||score>10)throw new Error('Client scores must be whole numbers from 0 to 10; leave unknown scores blank.');out.scores[id]=score;}if(c.evidence?.[id]!==undefined)out.evidence[id]=text(c.evidence[id],1000);}
  return out;
 })};
}
