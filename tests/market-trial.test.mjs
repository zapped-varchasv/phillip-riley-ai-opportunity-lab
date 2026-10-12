import test from 'node:test';
import assert from 'node:assert/strict';
import {blankPlan,importPlan} from '../dist/project-model.mjs';
import {signalFields,importMarketTrial,briefReady,marketBrief,measuredSignals,safeSource,updateSignal} from '../dist/market-trial-model.mjs';
const sample=()=>({...Object.fromEntries(signalFields.map(k=>[k,''])),id:'signal-1',title:'Fictional project update',company:'Example',type:'Project update',url:'https://example.com/news',published:'2026-10-12',fact:'An example milestone',relevance:'A question to validate',question:'What happens next?',owner:'Consultant',reviewer:'Sales reviewer',status:'Approved for brief'});
test('only reviewed, source-backed complete signals can produce a brief',()=>{
 const s=sample();assert.equal(briefReady(s),true);assert.match(marketBrief(s),/STAFF HYPOTHESIS/);
 for(const key of ['url','published','fact','reviewer','question']){const x={...s,[key]:''};assert.equal(briefReady(x),false);assert.throws(()=>marketBrief(x));}
 assert.equal(briefReady({...s,status:'Hold'}),false);
 for(const url of ['javascript:alert(1)','http://example.com','https://user:pass@example.com'])assert.equal(safeSource(url),'');
});
test('editing approved evidence requires fresh review but recording timing does not',()=>{
 const s=sample();updateSignal(s,'baseline','12');assert.equal(s.status,'Approved for brief');updateSignal(s,'fact','Changed claim');assert.equal(s.status,'Needs verification');assert.throws(()=>marketBrief(s));
});
test('missing time is excluded; slower assisted work is reported as negative',()=>{
 assert.deepEqual(measuredSignals([{baseline:'10',assisted:'15'},{baseline:'',assisted:'0'}]),{count:1,baseline:10,assisted:15,released:-5,percent:-50});
 assert.equal(measuredSignals([{baseline:'0',assisted:'0'}]).percent,null);
 assert.equal(measuredSignals([{}]).count,0);
});
test('trial survives worksheet export/import and older worksheets still open',()=>{
 const p=blankPlan();p.marketTrial.signals.push(sample());assert.deepEqual(importPlan(JSON.parse(JSON.stringify(p))),p);
 delete p.marketTrial;assert.deepEqual(importPlan(p).marketTrial,{signals:[]});
});
test('import rejects duplicate IDs, invalid dates, values and oversized inputs',()=>{
 const s=sample();for(const signals of [[s,s],[{...s,published:'2026-02-30'}],[{...s,baseline:'-1'}],[{...s,status:'Invented'}],[{...s,fact:{bad:true}}],[{...s,title:'x'.repeat(4001)}]])assert.throws(()=>importMarketTrial({signals}));
 assert.throws(()=>importMarketTrial({signals:Array(101).fill(s)}));
});
