(function(root){
const opportunities = [
// ID, title, team, impact, feasibility, adoption, risk (1 low to 5 high), path, rationale, success measure
['O01','Brief completeness & advert draft','Recruitment',5,5,5,2,'Existing tools','Turn an approved renewable-energy role brief into a consistent draft; flag missing salary, work pattern and must-have skills. Check the current agent and JobAdder first.','Reduce median drafting and review time by 30%; zero invented role facts.'],
['O02','Recruiter call-note structure','Recruitment',5,5,4,2,'Existing tools','Reduce repeated typing after candidate conversations using a standard note template and explicit missing-field flags.','30% less note administration; all factual statements traceable to notes.'],
['O03','Weekly client progress brief','Client service',4,5,5,2,'Existing tools','Convert approved pipeline counts into a clear client update, showing blockers and the next agreed action.','30% less preparation time; 100% numerical accuracy.'],
['O04','Candidate follow-up drafts','Candidate care',4,5,4,3,'Existing tools','Draft a factual update from a recruiter-approved status; withhold outreach when permission is absent or status is unknown.','Faster reviewed responses; zero messages released without permission and review.'],
['O05','Sales meeting preparation','Sales',4,4,4,2,'General AI','Summarise approved public company and project information with source dates before a client meeting.','Every project claim has a source; 25% less preparation time.'],
['O06','CRM missing-field review','Operations',4,5,4,2,'Existing tools','Find incomplete records for a person to correct; check existing JobAdder prompts before adding automation.','Reduce required-field gaps; zero unattended record writes.'],
['O07','Existing agent quality review','Operations',4,5,5,2,'Existing tools','Build a reusable set of synthetic tests for sales, advertising and chief-of-staff assistants.','All critical tests pass; prompt version and owner recorded.'],
['O08','Approved knowledge search','Operations',4,3,4,3,'Tailored solution','Help staff find approved procedures with citations; refuse to guess when the source is absent.','95% citation correctness on an agreed test set; access rules enforced.'],
['O09','Renewable project signals','Sales',5,3,3,3,'General AI','Review approved project announcements for possible workforce needs; validate before adding an opportunity.','Useful signals per reviewer hour; no invented project dates.'],
['O10','Interview coordination checklist','Candidate care',3,5,4,2,'Existing tools','Check availability, time zone, platform and preparation tasks before a recruiter arranges an interview.','Fewer coordination loops; every time zone confirmed.'],
['O11','Contractor onboarding checklist','Workforce',4,3,3,4,'Existing tools','Surface missing onboarding items for workforce staff; no identity assessment or compliance sign-off by AI.','Fewer incomplete handovers; authorised staff retain every clearance.'],
['O12','Timesheet exception triage','Finance',4,3,3,4,'Existing tools','Route apparent missing or inconsistent timesheets for payroll review without calculating or changing pay.','Fewer manual checks; zero payroll changes by the trial.'],
['O13','Invoice query categorisation','Finance',3,4,4,3,'Existing tools','Organise invoice questions for the finance team using approved examples and categories.','Correct routing rate and median handling time.'],
['O14','Event follow-up preparation','Marketing',3,4,4,3,'Existing tools','Prepare personalised follow-up drafts after renewable-energy networking events, using approved contact permissions.','Reviewed follow-ups completed faster; unsubscribe preferences respected.'],
['O15','Tool overlap & renewal review','Operations',4,4,4,1,'Existing tools','Compare paid, configured and used capabilities before proposing subscriptions or cancelling tools.','Owner-verified duplication and a renewal decision log; no assumed savings.'],
['O16','Approved market-content reuse','Marketing',3,4,4,2,'General AI','Adapt approved energy-sector insights for different channels while preserving source dates and claims.','Less drafting time; every figure checked against its source.']
].map(([id,title,team,impact,feasibility,adoption,risk,path,why,measure])=>({id,title,team,impact,feasibility,adoption,risk,path,why,measure}));
const scenarios = {
 brief:[
  {id:'bess',label:'BESS project engineer · complete brief',role:'BESS Project Engineer',sector:'Battery energy storage',location:'Sydney, NSW',pattern:'Hybrid; site travel as agreed',salary:'AUD 145,000–165,000 + super',skills:'Grid connection coordination; electrical engineering; commissioning support',summary:'Support a utility-scale battery project from design coordination through commissioning.',source:'SYN-BRIEF-001',missing:false},
  {id:'wind',label:'Wind O&M lead · missing salary',role:'Wind Operations & Maintenance Lead',sector:'Wind energy',location:'Regional Victoria',pattern:'Site-based; roster to be confirmed',salary:'',skills:'Asset maintenance planning; contractor coordination; safety leadership',summary:'Coordinate maintenance planning for a fictional onshore wind portfolio.',source:'SYN-BRIEF-002',missing:true}
 ],
 care:[
  {id:'update',label:'Candidate C-104 · update permitted',candidate:'C-104',role:'Grid Connection Engineer',status:'Client feedback pending',next:'Recruiter to request feedback on the next business day',permission:'yes',source:'SYN-CARE-001'},
  {id:'hold',label:'Candidate C-208 · permission absent',candidate:'C-208',role:'Solar Project Manager',status:'Recruiter review pending',next:'Confirm contact permission with the record owner',permission:'no',source:'SYN-CARE-002'}
 ],
 pulse:[
  {id:'solar',label:'Solar hiring programme · weekly update',client:'Example Solar Co (fictional)',role:'Solar commissioning programme',sourced:24,screened:12,submitted:5,interviews:3,blocker:'Client interview availability has not been confirmed.',next:'Account lead to agree interview slots with the client.',source:'SYN-PIPELINE-001'},
  {id:'storage',label:'Battery hiring programme · weekly update',client:'Example Storage Co (fictional)',role:'Battery engineering programme',sourced:18,screened:9,submitted:4,interviews:0,blocker:'Salary range requires client confirmation.',next:'Account lead to confirm the salary range before further submissions.',source:'SYN-PIPELINE-002'}
 ]
};
const paths=[
 {id:'existing',name:'Use existing tools',tag:'First path to validate',setup:1800,monthly:150,training:600,support:100,adoption:75,minutes:10,description:'Test licensed JobAdder / ROI-AI features and existing assistants before adding another platform.',risk:'Entitlements, configuration and actual staff usage are not confirmed.'},
 {id:'general',name:'General AI platform',tag:'Cross-team option',setup:2600,monthly:450,training:1000,support:200,adoption:70,minutes:12,description:'A managed AI workspace with approved templates, shared guidance and human review.',risk:'Copy-paste steps, information permissions and factual errors need controls.'},
 {id:'specialist',name:'Specialist software',tag:'Buy for a proven gap',setup:4500,monthly:900,training:1200,support:250,adoption:75,minutes:14,description:'Evaluate a focused recruitment product only against a measured capability gap.',risk:'Potential duplication, vendor dependency and additional integration effort.'},
 {id:'tailored',name:'Tailored PRG solution',tag:'Stage-gated investment',setup:14000,monthly:350,training:1800,support:900,adoption:65,minutes:16,description:'An internal interface and controlled connections around approved information.',risk:'Maintenance ownership, access controls and integration reliability add ongoing work.'}
];
const data={opportunities,scenarios,paths};root.PRG_DATA=data;if(typeof module!=='undefined')module.exports=data;
})(typeof window!=='undefined'?window:globalThis);
