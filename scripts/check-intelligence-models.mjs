import {existsSync} from 'node:fs';
if(existsSync('.env.local'))process.loadEnvFile('.env.local');
if(!process.env.OPENAI_API_KEY)throw new Error('Server API credential not found. No request was sent.');
for(const model of ['gpt-6-luna','gpt-6.1-sol','gpt-6-astra']){
 try{const r=await fetch('https://api.openai.com/v1/models/'+model,{headers:{Authorization:'Bearer '+process.env.OPENAI_API_KEY},signal:AbortSignal.timeout(15000)});console.log(JSON.stringify({model,status:r.status,available:r.ok,check:'Model metadata only; no inference request'}));await r.body?.cancel();}catch{console.log(JSON.stringify({model,available:false,check:'Metadata endpoint could not be reached'}));}
}
