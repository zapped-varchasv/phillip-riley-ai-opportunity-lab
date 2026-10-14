export const modelCatalog={
 'gpt-6-luna':{input:.1,cached:.01,output:.5,efforts:['none','low','medium','high','xhigh','max']},
 'gpt-6.1-sol':{input:2,cached:.1,output:10,efforts:['low','medium','high','xhigh','max']},
 'gpt-6-astra':{input:10,cached:1,output:50,efforts:['low','medium','high','xhigh','max']}
};
export const defaults={enabled:false,emailMode:'off',monthlyCap:250,monthlyTarget:200,warningAt:150,criticalAt:180,shortlist:15,concurrency:2,sourceDomains:['arena.gov.au','aemo.com.au','cer.gov.au','dcceew.gov.au','tenders.gov.au','infrastructureaustralia.gov.au','planningportal.nsw.gov.au','planning.vic.gov.au','epw.qld.gov.au','plan.sa.gov.au','wa.gov.au','epa.tas.gov.au','planning.act.gov.au','ntepa.nt.gov.au'],routes:{discovery:{model:'gpt-6-luna',effort:'low',maxOutput:4000,maxSearches:2},verification:{model:'gpt-6.1-sol',effort:'medium',maxOutput:6000,maxSearches:3},deep:{model:'gpt-6-astra',effort:'xhigh',maxOutput:8000,maxSearches:6},synthesis:{model:'gpt-6.1-sol',effort:'high',maxOutput:6000,maxSearches:0}},pricingChecked:'2026-10-13',pricingSource:'https://developers.openai.com/api/docs/pricing'};
export function validateSettings(s){
 if(typeof s.enabled!=='boolean'||!['off','test','production'].includes(s.emailMode))throw new Error('Choose valid activation settings.');
 for(const [k,min,max]of [['monthlyCap',0,250],['monthlyTarget',0,250],['warningAt',0,250],['criticalAt',0,250],['shortlist',10,20],['concurrency',1,2]])if(!Number.isFinite(s[k])||s[k]<min||s[k]>max)throw new Error(`Invalid ${k}.`);
 if(!Number.isInteger(s.shortlist)||!Number.isInteger(s.concurrency)||s.warningAt>s.criticalAt||s.criticalAt>s.monthlyCap)throw new Error('Check budget thresholds and whole-number job limits.');
 if(!Array.isArray(s.sourceDomains)||!s.sourceDomains.length||s.sourceDomains.length>80||s.sourceDomains.some(x=>typeof x!=='string'||!/^([a-z0-9-]+\.)+[a-z]{2,}$/.test(x)))throw new Error('Use approved public domain names only.');
 for(const name of Object.keys(defaults.routes)){const r=s.routes?.[name],m=modelCatalog[r?.model];if(!m||!m.efforts.includes(r.effort)||r.effort==='max'||!Number.isInteger(r.maxOutput)||r.maxOutput<1000||r.maxOutput>8000||!Number.isInteger(r.maxSearches)||r.maxSearches<0||r.maxSearches>6)throw new Error('Unsupported model, effort or request limit. Max requires a separate evaluated release.');}
 return s;
}
// Reserve a conservative full-context, long-context-priced bound, including possible cache writes.
// This is deliberately larger than the expected cost. Uncertain requests retain their reservation.
export function reservation(route){const m=modelCatalog[route.model];return Math.ceil((1.05*(route.maxSearches+1)*m.input*2*1.25+route.maxOutput/1e6*m.output*1.5+route.maxSearches*.01)*1.1*1e6)/1e6;}
export function usageCost(model,usage,toolCalls){const m=modelCatalog[model];if(!m||!Number.isInteger(usage?.input_tokens)||!Number.isInteger(usage?.output_tokens)||usage.input_tokens<0||usage.output_tokens<0)throw new Error('Provider usage is missing; reservation retained.');const cached=usage.input_tokens_details?.cached_tokens||0,write=usage.input_tokens_details?.cache_write_tokens||0;if(cached+write>usage.input_tokens||cached<0||write<0)throw new Error('Invalid token accounting.');const long=usage.input_tokens>272000;return ((usage.input_tokens-cached-write)*m.input+cached*m.cached+write*m.input*1.25)*(long?2:1)/1e6+usage.output_tokens*m.output*(long?1.5:1)/1e6+toolCalls*.01;}
