// Public planning templates. None of these ideas is a measured or approved PRG outcome.
export const opportunities = [
 ['Candidate skills enrichment','Recruitment','Test whether evidence-backed skills improve search usefulness.'],
 ['Availability refresh','Recruitment','Test a permitted confirmation process for stale availability.'],
 ['Duplicate record triage','Recruitment','Identify possible duplicates for staff review, without automatic merging.'],
 ['Call-note completeness','Recruitment','Review missing useful fields in the existing call-note workflow.'],
 ['Role brief quality','Recruitment','Check an agreed brief for missing requirements before sourcing.'],
 ['Job advert drafting','Recruitment','Review the existing agent against approved examples and brand guidance.'],
 ['Candidate profile preparation','Recruitment','Prepare factual client summaries from approved evidence.'],
 ['Placement handoff checks','Operations','Flag missing handoff information before Finance or Operations review.'],
 ['Contract onboarding checklist','Operations','Help staff find outstanding items; retain human compliance checks.'],
 ['Client research preparation','Sales','Compare existing licensed research tools before adding a provider.'],
 ['Sales assistant review','Sales','Evaluate the existing agent for grounded, useful meeting preparation.'],
 ['Aftercare follow-up preparation','Client service','Prepare reminders or drafts within existing approved tools.'],
 ['Invoice exception triage','Finance','Surface missing references for Finance review; do not approve payments.'],
 ['Marketing content reuse','Marketing','Compare current tools for adapting approved content with less rework.'],
 ['Internal knowledge and action retrieval','Shared services','Review chief-of-staff assistance and whether a tailored assistant is justified.']
].map(([name,team,hypothesis],i)=>({id:`O${String(i+1).padStart(2,'0')}`,name,team,hypothesis}));
export const agents=['Sales assistance','Job descriptions / adverts','Chief-of-staff assistance'];
export const paths=['Existing paid tools and simple connections','Managed general AI platform','Specialist software','Tailored PRG solution'];
export const deliverables=[
 ['Team needs and tool usage','Usage review','Maintain a clear view of what teams use, what is included and where work gets delayed.','discovery'],
 ['Improvement priorities','Opportunity register','Assess ideas using observed problems, expected value, effort and accountable owners.','opportunities'],
 ['AI quality and trial results','Review workspace','Review existing AI regularly and measure proposed changes before wider adoption.','reviews'],
 ['Tools and connections','Platform directory','Keep approved tools, access requirements, mappings and integration owners visible.','platforms'],
 ['Costs and business cases','Options comparison','Compare costs, benefits, risks and resources over one and three years.','options'],
 ['Solution decisions','Decision worksheet','Choose existing, general, specialist or tailored tools based on evidence and ongoing support needs.','options'],
 ['Delivery and review plan','Rolling roadmap','Maintain priorities, owners, dependencies and review points as business needs change.','roadmap'],
 ['Staff guidance and support','How to use the workspace','Keep working instructions, responsibilities and training up to date for every team.','guide']
];
export const costKeys=['setup','training','subscription','support','usage'];
export function optionTotals(x){
 const values=costKeys.map(k=>x[k]);
 if(values.some(v=>v===''||v===undefined||v===null||!Number.isFinite(Number(v))||Number(v)<0))return null;
 const [setup,training,subscription,support,usage]=values.map(Number),annual=subscription+support+usage;
 return {year1:setup+training+annual,year3:setup+training+3*annual};
}
export function score(x){
 const values=['impact','frequency','feasibility'].map(k=>Number(x[k]));
 return values.every(n=>Number.isInteger(n)&&n>=1&&n<=5)?values.reduce((a,b)=>a+b,0):null;
}
export function readyForTrial(x){return x.status==='Validated'&&Boolean(x.evidence?.trim())&&Boolean(x.owner?.trim())&&score(x)!==null;}
export function blankPlan(){return {format:'prg-discovery-v1',discovery:{},opportunities:{},agents:{},trials:{},options:{},roadmap:{},recommendation:{}};}
// Import only recognised fields, with bounded text and no HTML interpretation.
export function importPlan(input){
 if(!input||input.format!=='prg-discovery-v1')throw new Error('Choose a PRG discovery worksheet exported by this site.');
 const out=blankPlan();
 const schemas={discovery:{ids:['Recruitment','Operations','Sales','Finance','Marketing','Shared services'],keys:['owner','paid','configured','used','gap','evidence','next']},opportunities:{ids:opportunities.map(x=>x.id),keys:['status','impact','frequency','feasibility','owner','evidence','risk','next']},agents:{ids:agents,keys:['owner','purpose','access','evidence','quality','decision','next']},trials:{ids:['Trial 1','Trial 2','Trial 3'],keys:['scope','owner','approval','cohort','baseline','assisted','quality','cost','stop','evidence','outcome']},options:{ids:paths,keys:[...costKeys,'basis','risk','resources','benefit']},roadmap:{ids:['First 90 days','Months 3–6','Months 6–12'],keys:['owner','scope','dependencies','gate']},recommendation:{ids:['Decision'],keys:['choice','reason','unknowns','next']}};
 for(const [section,{ids,keys}]of Object.entries(schemas)){
  if(input[section]!==undefined&&(!input[section]||typeof input[section]!=='object'||Array.isArray(input[section])))throw new Error('The worksheet structure is invalid.');
  for(const id of ids){const item=input[section]?.[id];if(!item)continue;out[section][id]={};for(const key of keys){const v=item[key];if(v!==undefined){if(typeof v!=='string'||v.length>4000)throw new Error('Worksheet values must be text of up to 4,000 characters.');out[section][id][key]=v;}}}
 }
 return out;
}
