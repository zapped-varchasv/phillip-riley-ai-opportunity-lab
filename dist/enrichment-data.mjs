export const sourceReview='2 October 2026';
export const sources=[
 {id:'S1',title:'Technology stack overview',file:'Phillip_Riley_Tech_Stack_draft 31082026.docx',location:'Recruitment, finance, marketing, BD and corporate sections',basis:'Internal draft · filename dated 31 Aug 2026',finding:'JobAdder is the core recruitment record. The overview identifies ROI-AI, CoRecruit, 8x8, Zapier and linked operational tools. This establishes the documented architecture, not today’s licence entitlements.'},
 {id:'S2',title:'Permanent recruitment process',file:'QM-PRO-002-Perm Recruitment Process-ver9.pdf',location:'Page 1 · flowchart · issued 17 Sep 2026',basis:'Supplied SOP · version 9',finding:'Source, screen, Authority to Represent, consultant interview, qualified submission, client interview, checks, offer, contract, commencement and aftercare. Suitability and acceptance branches remain human decisions.'},
 {id:'S3',title:'Contract recruitment process',file:'QM-PRO-006-Contract Recruitment Process-ver7 (1).pdf',location:'Page 1 · flowchart · issued 17 Sep 2026',basis:'Supplied SOP · version 7',finding:'Adds work order and PLSL eligibility confirmation, explicit Authority to Represent email, relevant checks and handoff to Operations Process QM-PRO-003.'},
 {id:'S4',title:'PRG Technology Stack workbook',file:'PRG Technology Stack.xlsx',location:'Tech!A1:D33; Stack!A1:C48',basis:'Working inventory and roadmap · date not established',finding:'All Cost p/a cells are blank. Tech lists additional tools not corroborated in the overview. Stack contains FY25/FY26 roadmap entries, which do not prove current availability.'}
];
export const vendorSources=[
 {title:'ROI-AI product FAQ',url:'https://www.roi-ai.com/faq/',note:'Lists automation, Marketing Cloud and Ainstein enrichment as separate products. An existing ROI-AI relationship does not establish which modules PRG owns.'},
 {title:'JobAdder + ROI-AI',url:'https://jobadder.com/integration/roi-ai/',note:'Describes enrichment, surveys, forms and automation; states ROI-AI powers JobAdder Advanced Automations. Check account entitlements before buying overlapping capability.'},
 {title:'Lusha pricing',url:'https://www.lusha.com/pricing/',note:'Check the current plan and credit rules against PRG’s contract. Target only needed fields; use actual invoices for the cost model.'},
 {title:'CoRecruit',url:'https://corecruit.com/',note:'Vendor context for recruitment call and meeting assistance. Validate the configured PRG workflow with the operations owner rather than assuming a second note-taking tool is needed.'}
];
export const stack=[
 {name:'JobAdder',area:'Recruitment core',role:'Candidates, clients, roles, activity and placements. Keep the authoritative record here.',action:'Start here',status:'Documented · S1, S2, S3',check:'Confirm custom fields, duplicate rules, import permissions, licence tier and enabled AI features.'},
 {name:'ROI-AI',area:'Enrichment & automation',role:'The overview says database cleansing, quality and targeted emails connected to JobAdder.',action:'Audit entitlement first',status:'Documented · S1',check:'Does PRG own Ainstein enrichment, Marketing Cloud or Advanced Automations? What overlaps with JobAdder’s bundled entitlement? Get written scope and usage.'},
 {name:'CoRecruit + 8x8',area:'Call evidence',role:'8x8 calls feed CoRecruit notes, which connect to JobAdder.',action:'Reuse approved evidence',status:'Documented · S1',check:'Check capture permissions, note accuracy and field mapping. A note is supporting evidence, not a verified qualification or availability status.'},
 {name:'LinkedIn Recruiter + SEEK',area:'Candidate sourcing',role:'Sourcing and paid advertising; SEEK roles are posted through JobAdder.',action:'Support the existing flow',status:'Documented · S1',check:'Check existing integration and sourcing usage. Do not scrape profiles or assume every tool grants unrestricted export.'},
 {name:'Sales Navigator + Lusha',area:'Client & contact enrichment',role:'Prospecting plus contact finding and verification.',action:'Separate BD cohort',status:'Documented · S1',check:'Measure valid, useful contacts per credit. Avoid repeatedly buying fields that are already current; evaluate any new provider on the same sample.'},
 {name:'Zapier → Google Chat / Mailchimp',area:'Post-placement automation',role:'Placement notification and post-placement survey/communication paths.',action:'Map before consolidating',status:'Documented · S1',check:'Inspect actual Zaps, task counts, retries, survey ownership and recipients. Preserve notifications and survey triggers in any replacement.'},
 {name:'OneUp Sales',area:'Performance reporting',role:'JobAdder placement/activity reporting; Astute also feeds operational reporting.',action:'Preserve dependencies',status:'Documented · S1',check:'Compare required dashboards and real usage before considering overlap with ATS reports.'},
 {name:'Xero + Dext + Astute',area:'Finance & contractors',role:'Accounting, invoice capture and contractor timesheet flows.',action:'Outside first pilot',status:'Documented · S1',check:'Do not change billing, payroll or timesheets as part of candidate enrichment.'},
 {name:'Canva / Agorapulse / Claude / Signite / Analytics / Eventbrite',area:'Marketing',role:'Content, scheduling, signatures, analytics and events.',action:'Later licence review',status:'Documented · S1',check:'These are different jobs; the presence of AI in multiple tools does not itself make them duplicates.'},
 {name:'Google Workspace / Microsoft / Zoom / Adobe / Dropbox / DocuSign / SurveyMonkey / ChatGPT',area:'Corporate tools',role:'Collaboration, documents, signatures, surveys and general AI.',action:'Usage-led review',status:'Documented · S1',check:'Inventory paid seats, use cases, renewal terms and required integrations. Review surveys and storage first only where function truly overlaps.'},
 {name:'Migration Manager / CodeSafe / Corporate Traveller',area:'Specialist operations',role:'Migration cases, safety processes and travel.',action:'Outside enrichment scope',status:'Documented · S1',check:'Retain specialist workflows; no evidence supports replacing them with a general AI assistant.'},
 {name:'AltGen Energy / ICN Gateway',area:'Market & project intelligence',role:'Energy-project research and project/EOI information.',action:'Evidence sources for BD',status:'Documented · S1',check:'Record project source/date and authorised access. A project signal is not proof of an open recruitment mandate.'},
 {name:'Bullhorn / HubSpot / Rippling / Kamal / Refari / Meet Alfred / TopRec',area:'Inventory discrepancies',role:'Mentioned in the workbook, but not established as active subscriptions by the overview.',action:'Reconcile inventory',status:'Unverified · S4',check:'Ask whether each is current, historical, proposed or used by another entity. Do not count a cancellation saving until invoices confirm spend.'}
];
export const costActions=[
 {title:'Use existing enrichment entitlement first',priority:'First',why:'JobAdder and ROI-AI are already in the documented stack. A new enrichment platform may duplicate available functionality.',steps:'Get the JobAdder and ROI-AI order forms and current module list. Run the same 50-record sample through the enabled tools and this review method.',condition:'Recommend purchase only if the measured gap remains after configuration and training.',evidence:'S1; ROI-AI FAQ; JobAdder integration page',owner:'ATS administrator + procurement'},
 {title:'Enrich only the records and fields needed now',priority:'First',why:'Refreshing the entire database consumes credits and creates review work, including records no one will use.',steps:'Start with an active renewable-energy desk, remove ID duplicates and suppressed contacts, then request only missing or genuinely stale fields. Cache results with source and date.',condition:'Track total provider spend / useful verified records. Do not count unreviewed suggestions as value.',evidence:'Design recommendation; S1 sourcing and enrichment tools',owner:'Desk lead + data owner'},
 {title:'Reuse the call-to-JobAdder evidence path',priority:'First',why:'The documented 8x8 → CoRecruit → JobAdder path already captures information consultants would otherwise retype.',steps:'Check whether notes are landing correctly and whether a small, approved field template improves retrieval. Correct the mapping before buying another assistant.',condition:'Retain consultant review and the existing recording permissions; do not auto-infer compliance from conversation.',evidence:'S1 recruitment integrations',owner:'Operations + consultants'},
 {title:'Review duplicate seats and quiet subscriptions',priority:'Next',why:'Unused paid seats can create a direct cash saving; overlapping product names alone cannot.',steps:'Collect 90-day activity, paid seats, owner, renewal date and invoice for each candidate. Reassign seats first; quantify avoidable spend only when contract terms permit it.',condition:'Preserve minimum seat commitments, specialist requirements and account access. Do not assume workbook-only tools are active.',evidence:'S1 and S4 discrepancy',owner:'Finance + tool owners'},
 {title:'Simplify survey and notification paths',priority:'Next',why:'Zapier, Mailchimp and survey tools may overlap with an already licensed recruitment automation feature.',steps:'Map the placement event, Chat notification, survey link, consent/suppression rules, responses and reporting. Compare total task, licence and support cost.',condition:'Replace one tested path at a time with rollback. Keep the old flow until the new one passes delivery and duplicate-send checks.',evidence:'S1; JobAdder + ROI-AI vendor capability',owner:'Operations + marketing'},
 {title:'Measure whether database reuse reduces new sourcing spend',priority:'Later',why:'Better records may help consultants find existing candidates sooner, but that does not automatically justify cutting SEEK or LinkedIn.',steps:'Measure database-sourced qualified submissions and placements alongside external-source performance for comparable roles.',condition:'Only adjust paid sourcing after coverage, quality and time-to-shortlist remain acceptable. Avoid attributing every placement to enrichment.',evidence:'Proposed experiment; S1 sourcing tools',owner:'Recruitment lead + finance'}
];
const commonStart=[
 ['Terms agreed','Terms of Business, amendment letter or PSA signed.','gate'],
 ['Job confirmed','Client confirms the role. Consultant records the role in JobAdder and agrees internal splits.',''],
 ['Source & search','Advertising, networking, headhunting and the available database; follow the referenced internal privacy policy.',''],
 ['Enrich the search record','Proposed insertion: review source-backed skills, specialism and current role details on the initial candidate list. Preserve the original record.','enrich'],
 ['Screen & represent','Consultant screens candidates and sends Authority to Represent.','gate'],
 ['Consultant interview','Consultant assesses suitability. If unsuitable, update JobAdder; if suitable, format and add CV, then submit qualified profile/CV.',''],
 ['Client selection & interview','Client suitability decision, interview confirmation, consultant scheduling and client interview. Unsuccessful candidates are informed and JobAdder is updated.',''],
 ['Required checks','Complete 2 references, qualifications and working rights (citizenship or VEVO), and record in JobAdder, before the verbal offer step.','gate'],
 ['Offer & negotiation','Client makes verbal offer via consultant; consultant presents and mediates negotiations; client issues employment contract.',''],
 ['Acceptance & records','If accepted, consultant uploads the permitted employment contract to JobAdder and obtains a PO if required. If declined, the diagram loops back to qualified profiles.','gate'],
 ['Commencement & finance','Candidate commences. The diagram refers onward to the Finance process.',''],
 ['Aftercare','Aftercare during probation. Proposed insertion: record confirmed changes and feedback with a source/date for future searches.','enrich']
];
export const flows={permanent:commonStart,contract:[
 ['Terms agreed','Terms of Business, amendment letter or PSA signed.','gate'],
 ['Work order & PLSL','Client confirms duties on the work order. Consultant confirms Portable Long Service Leave eligibility on it. This is a human operational check.','gate'],
 ['Job & sourcing','Add the role in JobAdder, agree internal splits and source through advertising, networking, headhunting or database search under the internal privacy policy.',''],
 ['Initial list & enrichment','Candidates enter the initial JobAdder list, automatically or manually. Proposed insertion: review missing/stale fields and route conflicting evidence to a consultant.','enrich'],
 ['Screen & represent','Consultant screens and obtains the Authority to Represent email. Enrichment does not grant permission to represent or contact someone.','gate'],
 ['Interview & submit','Consultant interviews, formats/adds CVs to JobAdder and submits qualified profiles. Client suitability decisions determine the next stage.',''],
 ['Client interview / phone screen','Client confirms; consultant arranges; client interviews/screens. Inform unsuccessful candidates and update JobAdder.',''],
 ['Required checks','Record certificates/qualifications and working rights (citizenship/passport and/or VEVO); medical and references where applicable, before verbal offer.','gate'],
 ['Offer & negotiation','Client makes verbal offer via consultant, who presents it and mediates negotiations. A declined offer loops back to qualified profiles.',''],
 ['Operations handoff','On acceptance, refer to QM-PRO-003. That document was not supplied; its onboarding steps are intentionally not reconstructed.','gate']
]};
export const decisions=[
 ['Which records are in scope?','Proposed: candidate skills and specialism first; client contacts as a separate cohort. Confirm with the project sponsor.'],
 ['Which enrichment product is already licensed?','Confirm JobAdder plan, ROI-AI modules, field limits, provider credits and whether Advanced Automations is included.'],
 ['Which tools in the workbook are actually active?','Reconcile Bullhorn, HubSpot, Rippling, Kamal, Refari, Meet Alfred and TopRec against owners and invoices.'],
 ['Where may live candidate data be processed?','Obtain PRG’s internal privacy policy, approved hosting/provider settings, retention rules and role-based access requirements. This workspace currently accepts synthetic records only.'],
 ['What is the approved field dictionary?','Agree controlled sector/skill terms, date freshness rules, JobAdder mappings and who can override existing values. The workspace defaults are proposed, not PRG policy.'],
 ['How does Operations receive contract placements?','Obtain QM-PRO-003 and validate the handoff with Operations before designing any downstream automation.'],
 ['How are exceptions handled?','Agree duplicate identity resolution, contradictory sources, missing Authority to Represent and the SOP’s New Zealand employment-contract restriction.'],
 ['Who owns decisions and the handover?','Nominate a data owner, desk reviewer, ATS admin and budget approver. Agree support, rollback and a configuration/runbook handover.']
];
export function demoRecords(){
 const date=new Date().toISOString().slice(0,10),old=new Date(Date.now()-400*86400000).toISOString().slice(0,10);
 const source=(type,reference,quote,opts={})=>({type,reference,date,quote,identityConfirmed:true,...opts});
 return [
 {externalId:'DEMO-C001',name:'Alex Morgan',kind:'candidate',workflow:'permanent',stage:'Initial list · database search',fields:[
  {key:'specialism',current:'',proposed:'battery energy storage',source:source('cv','Synthetic CV C001 · project history','Led battery energy storage commissioning for a utility-scale project.')},
  {key:'skills',current:'',proposed:'SCADA',source:source('cv','Synthetic CV C001 · skills','Skills: SCADA, commissioning and grid connection.')}]},
 {externalId:'DEMO-C002',name:'Jamie Chen',kind:'candidate',workflow:'contract',stage:'Screening · refresh needed',fields:[
  {key:'availability',current:'Unknown',proposed:'Available in two weeks',source:source('candidate_confirmation','Synthetic availability email C002','Available in two weeks',{date:old})},
  {key:'current_employer',current:'Example Wind Services',proposed:'Example Grid Services',conflict:true,resolution:'',source:source('cv','Synthetic CV C002 · current role','Current employer: Example Grid Services')}]},
 {externalId:'DEMO-C003',name:'Sam Taylor',kind:'candidate',workflow:'permanent',stage:'Initial list · identity review',fields:[
  {key:'current_title',current:'Engineer',proposed:'Senior Electrical Engineer',source:source('consultant_note','Synthetic interview note C003','Current title: Senior Electrical Engineer',{identityConfirmed:false})},
  {key:'skills',current:'',proposed:'PVsyst',source:source('cv','Synthetic CV C003 · skills','Solar design skills: PVsyst and commissioning.')}]},
 {externalId:'DEMO-B001',name:'Jordan Lee',kind:'contact',workflow:'business_development',stage:'Client contact refresh',fields:[
  {key:'business_email',current:'',proposed:'jordan.lee@example.com',source:source('verified_provider','Synthetic provider verification B001','Verified business email: jordan.lee@example.com')},
  {key:'job_title',current:'Project Manager',proposed:'Development Director',conflict:true,resolution:'Direct contact confirmation resolves the older CRM job title.',source:source('contact_confirmation','Synthetic confirmation B001','My current job title is Development Director.')}]}];
}
