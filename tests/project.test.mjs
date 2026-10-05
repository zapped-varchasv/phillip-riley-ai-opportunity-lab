import test from 'node:test';
import assert from 'node:assert/strict';
import {score,optionTotals,readyForTrial,blankPlan,importPlan} from '../dist/project-model.mjs';
test('unknown ratings cannot produce a rank or trial-ready indication',()=>{
 assert.equal(score({impact:'5',frequency:'',feasibility:'5'}),null);
 assert.equal(score({impact:'6',frequency:'4',feasibility:'5'}),null);
 assert.equal(readyForTrial({status:'Validated',impact:'5',frequency:'4',feasibility:'3'}),false);
 assert.equal(readyForTrial({status:'Validated',impact:'5',frequency:'4',feasibility:'3',owner:'Process owner',evidence:'Approved observation reference'}),true);
});
test('missing cost is unknown, confirmed zero is valid',()=>{
 assert.equal(optionTotals({setup:'0',training:'0',subscription:'10',support:'',usage:'0'}),null);
 assert.deepEqual(optionTotals({setup:'0',training:'0',subscription:'0',support:'0',usage:'0'}),{year1:0,year3:0});
});
test('three-year total includes one-off costs only once',()=>{
 assert.deepEqual(optionTotals({setup:'1000',training:'500',subscription:'1200',support:'200',usage:'100'}),{year1:3000,year3:6000});
 assert.equal(optionTotals({setup:'-1',training:'0',subscription:'0',support:'0',usage:'0'}),null);
});
test('worksheet round-trip preserves recognised notes without importing extra fields',()=>{
 const p=blankPlan();p.opportunities.O01={owner:'Reviewer',evidence:'Reference only',unexpected:'discard'};p.opportunities.unknown={owner:'discard'};
 const result=importPlan(JSON.parse(JSON.stringify(p)));
 assert.deepEqual(result.opportunities,{O01:{owner:'Reviewer',evidence:'Reference only'}});
 assert.deepEqual(importPlan(blankPlan()),blankPlan());
});
test('malformed or oversized worksheet values are rejected',()=>{
 assert.throws(()=>importPlan({format:'other'}));
 assert.throws(()=>importPlan({...blankPlan(),options:[]}));
 assert.throws(()=>importPlan({...blankPlan(),opportunities:{O01:{evidence:'x'.repeat(4001)}}}));
 assert.throws(()=>importPlan({...blankPlan(),opportunities:{O01:{evidence:{html:'bad'}}}}));
});
