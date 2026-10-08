import test from 'node:test';
import assert from 'node:assert/strict';
import ExcelJS from 'exceljs';
import {createTrialWorkbook,trialExcelBytes} from '../src/client-trial-excel.mjs';
import {clientCriteria} from '../dist/client-trial-model.mjs';
const selected=clientCriteria.slice(0,10).map(c=>c.id);
const client=(id,value)=>({id,name:id,reviewer:'Consultant',next:'Review relationship',updatedAt:'2026-10-09T00:00:00.000Z',scores:Object.fromEntries(selected.map(k=>[k,value])),evidence:{[selected[0]]:'Reference only'}});
test('Excel report preserves sorted results, ties, zeros and missing scores',async()=>{
 const pending=client('Pending',10);delete pending.scores[selected[0]];
 const data={selected,clients:[client('Zero',0),pending,client('B',6),client('A2',8),client('A1',8)]};
 const wb=new ExcelJS.Workbook();await wb.xlsx.load(await trialExcelBytes(data));
 assert.deepEqual(wb.worksheets.map(s=>s.name),['Priority list','Scores and evidence','Criteria and method']);
 const s=wb.getWorksheet('Priority list');
 assert.deepEqual([7,8,9,10,11].map(r=>[s.getCell(r,1).value,s.getCell(r,2).value,s.getCell(r,3).value,s.getCell(r,4).value]),[[1,'A1',80,'A'],[1,'A2',80,'A'],[3,'B',60,'B'],[4,'Zero',0,'C'],[null,'Pending',null,'Needs review']]);
 const detail=wb.getWorksheet('Scores and evidence');assert.equal(detail.rowCount,56);assert.equal(detail.getCell('C37').value,0);assert.equal(detail.getCell('C47').value,null);
 assert.equal(wb.getWorksheet('Criteria and method').rowCount,26);
 assert.equal(s.views[0].ySplit,6);assert.ok(s.autoFilter);
});
test('user input starting with formula characters stays text and is never executable',async()=>{
 const c=client('safe',8);c.name='=HYPERLINK("https://example.invalid","click")';c.next='+1+1';c.evidence[selected[0]]='@SUM(1,2)';
 const wb=new ExcelJS.Workbook();await wb.xlsx.load(await trialExcelBytes({selected,clients:[c]}));
 assert.equal(wb.getWorksheet('Priority list').getCell('B7').value,c.name);
 for(const sheet of wb.worksheets)sheet.eachRow(row=>row.eachCell(cell=>assert.notEqual(cell.type,ExcelJS.ValueType.Formula)));
});
test('empty or unapplied selections cannot produce a misleading report',()=>{
 assert.throws(()=>createTrialWorkbook({selected:[],clients:[]}));
 assert.throws(()=>createTrialWorkbook({selected,clients:[]}));
});
test('export excludes retained unselected scores and does not mutate trial data',()=>{
 const c=client('Client',8);c.scores[clientCriteria[10].id]=10;
 const data={selected,clients:[c]},before=JSON.stringify(data),wb=createTrialWorkbook(data);
 assert.equal(wb.getWorksheet('Scores and evidence').rowCount,16);
 assert.equal(wb.getWorksheet('Priority list').getCell('C7').value,80);assert.equal(JSON.stringify(data),before);
});
