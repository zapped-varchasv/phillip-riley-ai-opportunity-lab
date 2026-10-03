import {fields,issues,costModel,pilotMetrics} from '../dist/enrichment-rules.mjs';
const now=()=>new Date().toISOString(),uuid=()=>crypto.randomUUID();
const error=(status,message)=>{throw Object.assign(new Error(message),{status});};
const str=(x,max=2000)=>typeof x==='string'?x.trim().slice(0,max):'';
const num=(v,max=100000000)=>{if(typeof v!=='number'||!Number.isFinite(v)||v<0||v>max)error(400,'Enter a non-negative number within the allowed range.');return v;};
const json=(x,status=200)=>Response.json(x,{status,headers:{'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'}});
const isReviewer=u=>['reviewer','admin'].includes(u.role);
const decode=r=>({...r,payload:JSON.parse(r.payload)});
function cleanRecord(b){
 if(!/^DEMO-[CB]\d{3,8}$/.test(b.externalId||''))error(400,'Use a synthetic record ID such as DEMO-C001 or DEMO-B001. Real ATS imports are not enabled.');
 if(!['candidate','contact'].includes(b.kind)||!['permanent','contract','business_development'].includes(b.workflow))error(400,'Choose a record type and recruitment workflow.');
 if((b.kind==='contact')!==(b.workflow==='business_development'))error(400,'Client contacts must use the business development workflow.');
 if(!str(b.name,120))error(400,'Add a synthetic display name.');
 if(!Array.isArray(b.fields)||!b.fields.length||b.fields.length>10)error(400,'Include between one and ten proposed fields.');
 const seen=new Set();const list=b.fields.map(f=>{
  if(!fields[f.key]?.kinds.includes(b.kind)||seen.has(f.key))error(400,'A field is duplicated or outside the allowed scope.');seen.add(f.key);
  const s=f.source||{};if(!['cv','candidate_confirmation','consultant_note','company_website','verified_provider','contact_confirmation'].includes(s.type))error(400,'Choose an evidence source type.');
  return {key:f.key,current:str(f.current,1000),proposed:str(f.proposed,1000),conflict:f.conflict===true,resolution:str(f.resolution),
   source:{type:s.type,reference:str(s.reference,300),date:str(s.date,10),quote:str(s.quote,4000),identityConfirmed:s.identityConfirmed===true},decision:'pending',reviewer:null,reviewedAt:null,note:''};
 });return {externalId:b.externalId,name:str(b.name,120),kind:b.kind,workflow:b.workflow,fields:list,stage:str(b.stage,160)||'Database review',synthetic:true};
}
async function recordFor(db,u,id){const r=await db.first('SELECT * FROM enrichment_records WHERE id=?',[id]);if(!r||(!isReviewer(u)&&r.owner_id!==u.id))error(404,'Record not found.');return decode(r);}
function event(db,r,u,kind,note,conditional=false){return db.prepare(`INSERT INTO enrichment_events(id,record_id,actor_id,kind,version,note,snapshot,created_at) ${conditional?'SELECT ?,?,?,?,?,?,?,? WHERE changes()=1':'VALUES (?,?,?,?,?,?,?,?)'}`,[uuid(),r.id,u.id,kind,r.version,str(note),JSON.stringify(r.payload),now()]);}
function annotated(r){return {...r,payload:{...r.payload,fields:r.payload.fields.map(f=>({...f,issues:issues(f)}))}};}
async function update(db,u,r,payload,kind,note){const next={...r,payload,version:r.version+1,updated_at:now()};const result=await db.batch([
 db.prepare('UPDATE enrichment_records SET name=?,kind=?,workflow=?,payload=?,version=?,updated_at=? WHERE id=? AND version=?',[payload.name,payload.kind,payload.workflow,JSON.stringify(payload),next.version,next.updated_at,r.id,r.version]),event(db,next,u,kind,note,true)
 ]);if(!result[0].meta.changes)error(409,'This record changed in another session. Reload before reviewing.');return annotated(next);}
export async function enrichment(request,db,u,body){
 const path=new URL(request.url).pathname,method=request.method;
 if(path==='/api/enrichment/records'&&method==='GET'){
  const list=await db.all(`SELECT r.*,u.name AS author FROM enrichment_records r JOIN users u ON u.id=r.owner_id ${isReviewer(u)?'':'WHERE r.owner_id=?'} ORDER BY r.updated_at DESC LIMIT 500`,isReviewer(u)?[]:[u.id]);return json({records:list.map(r=>annotated(decode(r)))});
 }
 if(path==='/api/enrichment/records'&&method==='POST'){
  const b=await body(request);if(b.syntheticOnly!==true)error(400,'Confirm that the batch contains synthetic records only.');
  if(!Array.isArray(b.records)||!b.records.length||b.records.length>25)error(400,'Import one to 25 synthetic records at a time.');
  const cleaned=b.records.map(cleanRecord),seen=new Set();
  for(const r of cleaned){if(seen.has(r.externalId)||await db.first('SELECT id FROM enrichment_records WHERE owner_id=? AND external_id=?',[u.id,r.externalId]))error(409,`Record ${r.externalId} already exists. Edit the saved record instead of reimporting it.`);seen.add(r.externalId);}
  const records=cleaned.map(payload=>({id:uuid(),owner_id:u.id,external_id:payload.externalId,name:payload.name,kind:payload.kind,workflow:payload.workflow,payload,version:1,created_at:now(),updated_at:now()}));
  try{await db.batch(records.flatMap(r=>[db.prepare('INSERT INTO enrichment_records(id,owner_id,external_id,name,kind,workflow,payload,version,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?)',[r.id,u.id,r.external_id,r.name,r.kind,r.workflow,JSON.stringify(r.payload),1,r.created_at,r.updated_at]),event(db,r,u,'created','Synthetic source batch imported.')]));}catch(e){if(/UNIQUE/.test(e.message))error(409,'One of these records was just imported. Reload the queue.');throw e;}
  return json({records:records.map(annotated)},201);
 }
 const match=path.match(/^\/api\/enrichment\/records\/([a-zA-Z0-9-]+)(?:\/(review|export))?$/);
 if(match){const r=await recordFor(db,u,match[1]),action=match[2];
  if(method==='GET'&&!action)return json({record:annotated(r),events:await db.all('SELECT e.*,u.name AS actor FROM enrichment_events e JOIN users u ON e.actor_id=u.id WHERE record_id=? ORDER BY e.created_at,e.rowid',[r.id])});
  if(method==='PATCH'&&!action){if(r.owner_id!==u.id)error(403,'Only the record author can edit the source.');const b=await body(request);if(b.version!==r.version)error(409,'This record changed. Reload before editing.');if(b.record?.externalId!==r.external_id)error(400,'The record ID cannot be changed.');const payload=cleanRecord(b.record);return json({record:await update(db,u,r,payload,'edited','Source changed. Every field decision was reset.')});}
  if(method==='POST'&&action==='review'){
   if(!isReviewer(u))error(403,'A reviewer or owner must approve field changes.');const b=await body(request);if(b.version!==r.version)error(409,'This record changed. Reload before reviewing.');
   const f=r.payload.fields.find(f=>f.key===b.field);if(!f)error(400,'Field not found.');if(!['accepted','rejected','held'].includes(b.decision))error(400,'Choose accept, reject or hold.');
   if(b.decision==='accepted'){if(b.confirmed!==true)error(400,'Confirm that you checked the identity, source and proposed value.');const flags=issues(f);if(flags.length)error(422,flags.join(' '));}
   if(b.decision!=='accepted'&&!str(b.note))error(400,'Add a reason for holding or rejecting the change.');
   f.decision=b.decision;f.note=str(b.note);f.reviewer=u.name;f.reviewedAt=now();return json({record:await update(db,u,r,r.payload,b.decision,`${fields[f.key].label}: ${f.note||'Evidence reviewed.'}`)});
  }
  if(method==='POST'&&action==='export'){
   const b=await body(request);if(b.version!==r.version)error(409,'This record changed. Reload before exporting.');if(b.confirmed!==true)error(400,'Confirm that this is a manual review packet, not an ATS import file.');
   const accepted=r.payload.fields.filter(f=>f.decision==='accepted'&&!issues(f).length);if(!accepted.length)error(422,'No approved, currently valid fields are ready to export.');
   const packet={format:'prg-enrichment-review-v1',synthetic:true,recordId:r.external_id,version:r.version,exportedAt:now(),purpose:'Manual mapping and current-value comparison required. Not a JobAdder import file. No ATS write has occurred.',changes:accepted.map(f=>({field:f.key,expectedCurrent:f.current,proposed:f.proposed,source:f.source,reviewer:f.reviewer,reviewedAt:f.reviewedAt,resolution:f.resolution})),excludedFields:r.payload.fields.filter(f=>!accepted.includes(f)).map(f=>f.key)};
   // Guard export against concurrent edits; a successful export advances the same version as its audit event.
   const next=await update(db,u,r,r.payload,'exported',`Review packet for version ${r.version}; ${accepted.length} approved field(s). No ATS update.`);
   return json({packet,record:next});
  }
 }
 if(path==='/api/enrichment/studies'&&method==='GET')return json({studies:(await db.all('SELECT * FROM enrichment_studies WHERE owner_id=? ORDER BY created_at DESC,rowid DESC LIMIT 500',[u.id])).map(s=>({...s,payload:JSON.parse(s.payload)}))});
 if(path==='/api/enrichment/studies'&&method==='POST'){
  const b=await body(request),x=b.inputs||{};let payload;
  if(b.type==='cost'){
   const input={};for(const key of ['currentAnnual','removablePercent','replacementAnnual','providerAnnual','supportAnnual','transitionCost','recordsPerMonth','manualMinutes','assistedMinutes','hourlyCost'])input[key]=num(x[key],key==='removablePercent'?100:100000000);
   if(!['illustrative','invoice_based'].includes(b.basis))error(400,'Identify whether costs are illustrative or invoice based.');if(b.basis==='invoice_based'&&!str(b.evidence))error(400,'Add invoice, renewal and usage evidence references.');
   payload={inputs:input,basis:b.basis,evidence:str(b.evidence),results:costModel(input)};
  }else if(b.type==='pilot'){
   const input={};for(const key of ['records','useful','proposed','accepted','audited','correct','criticalErrors','manualMinutes','assistedMinutes','totalCost'])input[key]=num(x[key]);
   for(const key of ['records','useful','proposed','accepted','audited','correct','criticalErrors'])if(!Number.isInteger(input[key]))error(400,'Record and field counts must be whole numbers.');
   if(!input.records||input.useful>input.records||input.useful>input.accepted||input.accepted>input.proposed||input.audited>input.proposed||input.correct>input.audited)error(400,'Check the pilot counts and denominators. Useful records cannot exceed accepted fields.');
   if(!['rehearsal','observed'].includes(b.basis))error(400,'Choose rehearsal or observed pilot.');if(!str(b.evidence))error(400,'Add the cohort, measurement method and evidence reference.');
   payload={inputs:input,basis:b.basis,evidence:str(b.evidence),results:pilotMetrics(input)};
  }else if(b.type==='decision'){
   if(!['open','confirmed','deferred'].includes(b.status)||!str(b.note))error(400,'Add a decision status and note.');if(b.status==='confirmed'&&!str(b.evidence))error(400,'A confirmed decision needs an evidence reference.');payload={status:b.status,note:str(b.note,4000),owner:str(b.owner,120),evidence:str(b.evidence)};
  }else error(400,'Unknown study type.');
  const item={id:uuid(),owner_id:u.id,type:b.type,name:str(b.name,160)||'Untitled review',payload,created_at:now()};
  await db.run('INSERT INTO enrichment_studies(id,owner_id,type,name,payload,created_at) VALUES(?,?,?,?,?,?)',[item.id,u.id,item.type,item.name,JSON.stringify(payload),item.created_at]);return json({study:item},201);
 }
 return json({error:'Enrichment endpoint not found.'},404);
}
