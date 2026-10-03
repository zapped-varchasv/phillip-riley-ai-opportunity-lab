// Shared deterministic validation. No model calls, scraping or identity inference.
export const fields={
 specialism:{label:'Specialism',kinds:['candidate'],days:365},skills:{label:'Skills',kinds:['candidate'],days:365},
 current_title:{label:'Current title',kinds:['candidate'],days:180},current_employer:{label:'Current employer',kinds:['candidate'],days:180},
 location:{label:'Location',kinds:['candidate','contact'],days:180},availability:{label:'Availability',kinds:['candidate'],days:30},
 company:{label:'Company',kinds:['contact'],days:180},job_title:{label:'Job title',kinds:['contact'],days:180},
 business_email:{label:'Business email',kinds:['contact'],days:90},business_phone:{label:'Business phone',kinds:['contact'],days:90}
};
export const normal=v=>String(v??'').trim().replace(/\s+/g,' ').toLowerCase();
export function issues(field,now=new Date()){
 const out=[],spec=fields[field.key];if(!spec)return ['This field is outside the enrichment scope.'];
 const s=field.source||{},date=new Date(s.date+'T00:00:00Z'),age=(now-date)/86400000;
 if(!s.reference?.trim())out.push('Add a traceable source reference.');
 if(!s.quote?.trim())out.push('Add the exact supporting excerpt.');
 if(!/^\d{4}-\d{2}-\d{2}$/.test(s.date||'')||!Number.isFinite(date.getTime())||date.toISOString().slice(0,10)!==s.date)out.push('Add a valid source date.');
 else if(s.date>now.toISOString().slice(0,10))out.push('The source date is in the future.');else if(age>spec.days)out.push(`Source is older than the proposed ${spec.days}-day freshness rule; obtain fresh evidence.`);
 if(s.identityConfirmed!==true)out.push('Confirm that the source belongs to this record.');
 if(!field.proposed?.trim())out.push('No proposed value.');
 else if(!normal(s.quote).includes(normal(field.proposed)))out.push('The proposed value is not present in the excerpt. Use an exact supported value.');
 if(normal(field.current)===normal(field.proposed))out.push('No change from the current value.');
 if(field.conflict&&!field.resolution?.trim())out.push('Record how the conflicting evidence was resolved.');
 if(field.key==='availability'&&s.type!=='candidate_confirmation')out.push('Availability needs a current candidate confirmation.');
 if(['business_email','business_phone'].includes(field.key)&&s.type!=='verified_provider'&&s.type!=='contact_confirmation')out.push('Contact details need a verified provider result or direct contact confirmation.');
 if(field.key==='business_email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.proposed||''))out.push('The proposed email format is invalid.');
 if(field.key==='business_phone'&&(field.proposed||'').replace(/\D/g,'').length<7)out.push('The proposed phone number is incomplete.');
 return out;
}
export function suggestTags(quote){
 const dictionary=['battery energy storage','BESS','solar PV','offshore wind','onshore wind','transmission','grid connection','commissioning','SCADA','PVsyst','PowerFactory','project development','electrical engineering'];
 const escaped=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 return dictionary.flatMap(term=>{const match=String(quote).match(new RegExp(`\\b${escaped(term)}\\b`,'i'));return match?[{value:match[0],basis:'Exact phrase in supplied excerpt'}]:[];});
}
export function costModel(x){
 const annualAvoidable=x.currentAnnual*x.removablePercent/100;
 const recurring=x.replacementAnnual+x.providerAnnual+x.supportAnnual;
 const recurringCash=annualAvoidable-recurring;
 const firstYearCash=recurringCash-x.transitionCost;
 const hours=x.recordsPerMonth*(x.manualMinutes-x.assistedMinutes)*12/60;
 return {annualAvoidable,recurring,recurringCash,firstYearCash,hours,capacityValue:hours*x.hourlyCost,paybackMonths:recurringCash>0?x.transitionCost/(recurringCash/12):null};
}
export function pilotMetrics(x){
 return {accuracy:x.audited?100*x.correct/x.audited:null,coverage:x.records?100*x.useful/x.records:null,acceptance:x.proposed?100*x.accepted/x.proposed:null,
 hours:(x.manualMinutes-x.assistedMinutes)/60,costPerUseful:x.useful?x.totalCost/x.useful:null};
}
