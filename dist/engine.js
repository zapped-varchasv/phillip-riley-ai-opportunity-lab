(function(root){
const clamp=(v,min,max)=>Math.min(max,Math.max(min,Number.isFinite(+v)?+v:min));
function score(o){return Math.round((.35*o.impact+.25*o.feasibility+.2*o.adoption+.2*(6-o.risk))*20);}
function businessCase(input,path){
 const users=clamp(input.users,0,200),tasks=clamp(input.tasks,0,200),hourly=clamp(input.hourly,0,500),weeks=clamp(input.weeks??46,0,52);
 const minutes=clamp(path.minutes,0,180),review=clamp(input.review,0,180),adoption=clamp(path.adoption,0,100)/100;
 const hours=users*tasks*weeks*Math.max(0,minutes-review)/60*adoption;
 const benefit=hours*hourly,upfront=clamp(path.setup,0,1000000)+clamp(path.training,0,1000000);
 const recurring=(clamp(path.monthly,0,1000000)+clamp(path.support,0,1000000))*12;
 const year1=upfront+recurring,year3=upfront+recurring*3,annualNet=benefit-recurring;
 return {hours,benefit,upfront,recurring,year1,year3,net1:benefit-year1,net3:benefit*3-year3,payback:annualNet>0?upfront/(annualNet/12):null,breakEvenHours:hourly>0?year1/hourly:null};
}
function trial(type,s){
 if(type==='brief'){
  const missing=['role','sector','location','pattern','salary','skills','summary'].filter(k=>!String(s[k]||'').trim());
  return {title:'Role brief → advert draft',blocked:missing.length>0,flags:missing.length?missing.map(k=>`Confirm ${k} before approving this draft.`):['Confirm that all role facts are approved by the hiring manager.'],evidence:Object.entries(s).filter(([k])=>['role','sector','location','pattern','salary','skills','summary'].includes(k)),text:`${s.role || '[Role required]'}\n${s.location || '[Location required]'} | ${s.pattern || '[Work pattern required]'}\nSalary: ${s.salary || '[Confirm salary with client]'}\n\nThe opportunity\n${s.summary || '[Approved description required]'}\n\nExperience to discuss\n${s.skills || '[Approved requirements needed]'}\n\nSector: ${s.sector || '[Sector required]'}\n\nRecruiter review: verify all role requirements, salary, working arrangements and inclusive wording before publication.`,source:s.source};
 }
 if(type==='care'){
  const permitted=s.permission==='yes',known=!!s.status?.trim();
  return {title:'Candidate status → update draft',blocked:!permitted||!known,flags:[...(!permitted?['Contact permission is absent. Draft release is blocked.']:[]),...(!known?['Candidate status is missing. Verify it before drafting an update.']:[]),'A recruiter must verify the current status and approve any communication.'],evidence:[['Candidate reference',s.candidate],['Role',s.role],['Status',s.status],['Next action',s.next],['Contact permission',permitted?'Recorded for this synthetic example':'Not recorded']],text:!permitted?'HOLD — no candidate message prepared.\n\nContact permission is not recorded. Ask the record owner to confirm the permitted next step.':!known?'HOLD — verify the candidate status before preparing an update.':`Subject: Update on ${s.role}\n\nHello,\n\nAn update on your application: ${s.status.toLowerCase()}.\n\nOur next step: ${s.next}.\n\nWe will share a further update when verified information is available.\n\nYour recruitment consultant\n\n[Internal reference: ${s.candidate}; synthetic example]`,source:s.source};
 }
 if(type==='pulse'){
  const counts=['sourced','screened','submitted','interviews'],invalid=counts.some(k=>!Number.isInteger(+s[k])||+s[k]<0)||counts.some((k,i)=>i>0&&+s[k]>+s[counts[i-1]]);
  return {title:'Pipeline snapshot → client brief',blocked:invalid,flags:invalid?['Counts must be non-negative whole numbers in a single cumulative cohort: sourced ≥ screened ≥ submitted ≥ interviews.']:['Confirm the reporting period and cohort before sharing. Counts are cumulative stages, not unique people to sum.'],evidence:[...counts.map(k=>[k,s[k]]),['Blocker',s.blocker],['Next action',s.next]],text:invalid?'HOLD — pipeline counts are inconsistent. Confirm the reporting cohort and repair the snapshot.':`${s.client}\nWeekly progress | ${s.role}\n\n${s.sourced} sourced → ${s.screened} screened → ${s.submitted} submitted → ${s.interviews} at interview stage\n\nScreened to submitted: ${+s.screened?Math.round(+s.submitted/+s.screened*100):0}%\n\nCurrent blocker\n${s.blocker}\n\nNext action\n${s.next}\n\nRecruiter review: confirm the reporting period, definitions and permission to share this client-level summary.`,source:s.source};
 }
 throw new Error('Unknown trial type');
}
const api={score,businessCase,trial};root.PRG_ENGINE=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
