import {journeys,platformById,validateWorkspaceUrl} from '../dist/platforms.mjs';
const now=()=>new Date().toISOString(),id=()=>crypto.randomUUID();
const fail=(status,message)=>{throw Object.assign(new Error(message),{status});};
const txt=(v,max=2000)=>typeof v==='string'?v.trim().slice(0,max):'';
const json=(x,status=200)=>Response.json(x,{status,headers:{'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'}});
const decode=w=>({...w,payload:JSON.parse(w.payload)});
const dayValid=d=>/^\d{4}-\d{2}-\d{2}$/.test(d)&&Number.isFinite(new Date(d).getTime())&&new Date(d).toISOString().slice(0,10)===d;
async function own(db,u,itemId){const w=await db.first('SELECT * FROM work_items WHERE id=? AND owner_id=?',[itemId,u.id]);if(!w)fail(404,'Work item not found.');return decode(w);}
async function link(db,u,recordId,kind){if(!recordId)return null;const r=await db.first('SELECT * FROM enrichment_records WHERE id=? AND owner_id=?',[recordId,u.id]);if(!r)fail(404,'Choose an enrichment record you own.');if((kind==='client')!==(r.kind==='contact')||(kind!=='client'&&kind!==r.workflow))fail(400,'Choose a record matching this workflow.');return r.id;}
function event(db,w,u,kind,note,guard=false){return db.prepare(`INSERT INTO work_events(id,work_id,actor_id,kind,note,version,created_at) ${guard?'SELECT ?,?,?,?,?,?,? WHERE changes()=1':'VALUES(?,?,?,?,?,?,?)'}`,[id(),w.id,u.id,kind,note,w.version,now()]);}
async function change(db,u,w,kind,note){const prior=w.version;w.version++;w.updated_at=now();const r=await db.batch([db.prepare('UPDATE work_items SET title=?,stage=?,record_id=?,payload=?,version=?,updated_at=? WHERE id=? AND owner_id=? AND version=?',[w.title,w.stage,w.record_id,JSON.stringify(w.payload),w.version,w.updated_at,w.id,u.id,prior]),event(db,w,u,kind,note,true)]);if(!r[0].meta.changes)fail(409,'This work item changed. Reload before saving.');return w;}
export async function workbench(req,db,u,body){const path=new URL(req.url).pathname,method=req.method;
 if(path==='/api/workbench'&&method==='GET')return json({items:(await db.all('SELECT * FROM work_items WHERE owner_id=? ORDER BY updated_at DESC LIMIT 200',[u.id])).map(decode),settings:(await db.all('SELECT * FROM platform_settings WHERE owner_id=?',[u.id])).map(decode),liveConnections:0});
 if(path==='/api/workbench/items'&&method==='POST'){
  const b=await body(req);if(b.syntheticOnly!==true)fail(400,'Use synthetic case details only.');if(!Object.hasOwn(journeys,b.kind)||!txt(b.title,160))fail(400,'Add a title and choose a workflow.');if(b.due&&!dayValid(b.due))fail(400,'Enter a valid due date.');
  const w={id:id(),owner_id:u.id,title:txt(b.title,160),kind:b.kind,stage:0,record_id:await link(db,u,b.recordId,b.kind),payload:{assignee:txt(b.assignee,120)||'Me',due:txt(b.due,10),priority:['normal','high'].includes(b.priority)?b.priority:'normal',summary:txt(b.summary),checks:{},evidence:{},synthetic:true},version:1,created_at:now(),updated_at:now()};
  await db.batch([db.prepare('INSERT INTO work_items(id,owner_id,title,kind,stage,record_id,payload,version,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?)',[w.id,u.id,w.title,w.kind,0,w.record_id,JSON.stringify(w.payload),1,w.created_at,w.updated_at]),event(db,w,u,'created','Synthetic workflow started.')]);return json({item:w},201);
 }
 const m=path.match(/^\/api\/workbench\/items\/([\w-]+)(?:\/(progress|note|packet))?$/);
 if(m){let w=await own(db,u,m[1]);const action=m[2];if(method==='GET'&&!action)return json({item:w,events:await db.all('SELECT e.*,u.name AS actor FROM work_events e JOIN users u ON u.id=e.actor_id WHERE work_id=? ORDER BY e.created_at,e.rowid',[w.id])});
  if(method==='PATCH'&&!action){const b=await body(req);if(b.version!==w.version)fail(409,'This work item changed. Reload it.');if(!txt(b.title,160)||(b.due&&!dayValid(b.due)))fail(400,'Check the title and due date.');w.title=txt(b.title,160);const newLink=await link(db,u,b.recordId,w.kind);const relink=newLink!==w.record_id;if(relink){w.stage=Math.min(w.stage,1);w.payload.checks=Object.fromEntries(Object.entries(w.payload.checks).filter(([k])=>Number(k)<1));w.payload.evidence=Object.fromEntries(Object.entries(w.payload.evidence).filter(([k])=>Number(k)<1));}w.record_id=newLink;w.payload={...w.payload,assignee:txt(b.assignee,120)||'Me',due:txt(b.due,10),priority:b.priority==='high'?'high':'normal',summary:txt(b.summary)};return json({item:await change(db,u,w,'updated',relink?'Linked record changed; capture/enrichment and downstream checkpoints reset.':'Work item details updated. Checklist history is unchanged.')});}
  if(method==='POST'&&action==='note'){const b=await body(req);if(b.version!==w.version)fail(409,'This work item changed. Reload it.');if(!txt(b.note,4000))fail(400,'Write a note or conversation outcome.');if(b.platform&&!platformById(b.platform))fail(400,'Unknown source platform.');return json({item:await change(db,u,w,'note',(b.platform?platformById(b.platform).name+': ':'')+txt(b.note,4000))});}
  if(method==='POST'&&action==='progress'){
   const b=await body(req);if(b.version!==w.version)fail(409,'This work item changed. Reload it.');const step=journeys[w.kind].steps[w.stage];if(!step)fail(409,'This workflow is already complete.');
   if(!Array.isArray(b.checks)||b.checks.length!==step.checks.length||b.checks.some(v=>typeof v!=='boolean'))fail(400,'Include a decision for every checkpoint.');
   if(b.advance===true&&(b.checks.some(v=>!v)||!txt(b.evidence)))fail(422,'Complete the stage checkpoints and add an evidence reference before advancing.');
   w.payload.checks[w.stage]=b.checks;w.payload.evidence[w.stage]=txt(b.evidence);const label=step.name;if(b.advance===true)w.stage++;
   return json({item:await change(db,u,w,b.advance?'stage_completed':'checkpoint_saved',`${label}: ${txt(b.evidence)||'Draft checkpoints saved.'}`)});
  }
  if(method==='POST'&&action==='packet'){
   const b=await body(req);if(b.version!==w.version)fail(409,'This work item changed. Reload it.');const events=await db.all('SELECT kind,note,created_at FROM work_events WHERE work_id=? ORDER BY created_at,rowid',[w.id]);
   const packet={format:'prg-work-handoff-v1',synthetic:true,title:w.title,workflow:journeys[w.kind].name,completedStages:w.stage,totalStages:journeys[w.kind].steps.length,status:w.stage===journeys[w.kind].steps.length?'Checklist complete':'In progress',assignee:w.payload.assignee,due:w.payload.due,summary:w.payload.summary,linkedEnrichmentRecord:w.record_id,checkpoints:w.payload.checks,evidence:w.payload.evidence,history:events,disclaimer:'Manual coordination packet. No platform sync, ATS update, message, invoice, hiring decision or compliance verification has occurred.'};
   return json({packet,item:await change(db,u,w,'packet_exported','Manual handoff packet exported. No external action.')});
  }
 }
 const setting=path.match(/^\/api\/workbench\/platforms\/([\w-]+)$/);
 if(setting&&method==='PUT'){
  const p=platformById(setting[1]);if(!p)fail(400,'Unknown platform.');const b=await body(req),old=await db.first('SELECT * FROM platform_settings WHERE owner_id=? AND platform_id=?',[u.id,p.id]);if(b.version!==(old?.version||0))fail(409,'These settings changed. Reload before saving.');
  let url;try{url=validateWorkspaceUrl(txt(b.workspaceUrl,1500),p);}catch(e){fail(400,e.message);}const payload={workspaceUrl:url,owner:txt(b.owner,120),notes:txt(b.notes),pinned:b.pinned===true,readiness:{owner:b.readiness?.owner===true,access:b.readiness?.access===true,mapping:b.readiness?.mapping===true,test:b.readiness?.test===true},connected:false};
  const record={id:old?.id||id(),owner_id:u.id,platform_id:p.id,payload,version:(old?.version||0)+1,updated_at:now()};
  if(old){const r=await db.run('UPDATE platform_settings SET payload=?,version=?,updated_at=? WHERE id=? AND version=?',[JSON.stringify(payload),record.version,record.updated_at,record.id,old.version]);if(!r.meta.changes)fail(409,'These settings changed. Reload before saving.');}
  else try{await db.run('INSERT INTO platform_settings(id,owner_id,platform_id,payload,version,updated_at) VALUES(?,?,?,?,?,?)',[record.id,u.id,p.id,JSON.stringify(payload),1,record.updated_at]);}catch(e){if(/UNIQUE/.test(e.message))fail(409,'Settings were created in another session. Reload.');throw e;}
  return json({setting:record});
 }
 return json({error:'Workplace endpoint not found.'},404);
}
