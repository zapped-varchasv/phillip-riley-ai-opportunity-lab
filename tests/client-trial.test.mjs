import test from 'node:test';
import assert from 'node:assert/strict';
import {clientCriteria,validSelection,clientResult,rankClients,importClientTrial} from '../dist/client-trial-model.mjs';
import {blankPlan,importPlan} from '../dist/project-model.mjs';
const selected=clientCriteria.slice(0,10).map(c=>c.id);
const client=(id,total)=>({id,name:id,reviewer:'Team',next:'Review',updatedAt:'',evidence:{},scores:Object.fromEntries(selected.map((k,i)=>[k,Math.min(10,Math.max(0,total-i*10))]))});
test('all 20 criteria are available, exactly 10 distinct known criteria required',()=>{
 assert.equal(clientCriteria.length,20);assert.equal(new Set(clientCriteria.map(c=>c.id)).size,20);
 assert.equal(validSelection(selected),true);
 for(const s of [selected.slice(1),[...selected,'brand'],Array(10).fill(selected[0]),[...selected.slice(1),'unknown']])assert.equal(validSelection(s),false);
});
test('category boundaries cover every whole-number total, including 59',()=>{
 for(const [total,category] of [[0,'C'],[59,'C'],[60,'B'],[79,'B'],[80,'A'],[100,'A']]){
  const r=clientResult(client('a',total),selected);assert.equal(r.total,total);assert.equal(r.category,category);assert.equal(r.complete,true);
 }
});
test('unknown or invalid scores and missing labels never become ranked zero scores',()=>{
 for(const value of [undefined,null,'',NaN,-1,11,1.5,'8']){const c=client('a',80);c.scores[selected[0]]=value;assert.equal(clientResult(c,selected).complete,false);}
 const c=client('a',0);assert.equal(clientResult(c,selected).complete,true);c.name=' ';assert.equal(clientResult(c,selected).complete,false);
});
test('clients sort by total, share tied ranks, and incomplete clients are unranked',()=>{
 const pending=client('pending',100);delete pending.scores[selected[0]];
 const rows=rankClients({selected,clients:[client('low',59),pending,client('tie-b',80),client('top',100),client('tie-a',80)]});
 assert.deepEqual(rows.map(r=>[r.client.id,r.rank]),[['top',1],['tie-a',2],['tie-b',2],['low',4],['pending',null]]);
});
test('changing selection requires new scores and returning restores previous assessment',()=>{
 const c=client('a',80),other=[...selected.slice(1),clientCriteria[10].id];
 assert.equal(clientResult(c,other).complete,false);assert.equal(clientResult(c,selected).total,80);
});
test('worksheet round-trip retains assessment and ignores supplied computed ranks',()=>{
 const p=blankPlan();p.clientTrial={selected,clients:[{...client('a',80),rank:99,category:'C'}]};
 const result=importPlan(JSON.parse(JSON.stringify(p)));
 assert.equal(rankClients(result.clientTrial)[0].category,'A');assert.equal(result.clientTrial.clients[0].rank,undefined);
 const old=blankPlan();delete old.clientTrial;assert.deepEqual(importPlan(old).clientTrial,{selected:[],clients:[]});
});
test('import rejects corrupt scores, duplicate ids, excess clients and oversized evidence',()=>{
 const c=client('a',80);
 assert.throws(()=>importClientTrial({selected,clients:[c,c]}));
 assert.throws(()=>importClientTrial({selected,clients:Array(101).fill(c)}));
 assert.throws(()=>importClientTrial({selected,clients:[{...c,scores:{[selected[0]]:11}}]}));
 assert.throws(()=>importClientTrial({selected,clients:[{...c,evidence:{[selected[0]]:'x'.repeat(1001)}}]}));
});
