import { build } from 'esbuild';
import {mkdir,cp,writeFile,readFile} from 'node:fs/promises';
await mkdir('dist/server',{recursive:true});await mkdir('dist/client',{recursive:true});await mkdir('dist/.openai',{recursive:true});
await build({entryPoints:['server/worker.mjs'],outfile:'dist/server/index.js',bundle:true,format:'esm',platform:'browser',target:'es2022'});
for(const file of ['index.html','app.js','data.js','engine.js','workspace.js','styles.css','workspace.css','assets'])await cp('dist/'+file,'dist/client/'+file,{recursive:true});
await cp('.openai/hosting.json','dist/.openai/hosting.json');await cp('drizzle','dist/.openai/drizzle',{recursive:true});
await writeFile('dist/server/wrangler.json',JSON.stringify({name:'prg-opportunity-lab',main:'index.js',compatibility_date:'2026-09-01',assets:{directory:'../client',binding:'ASSETS',run_worker_first:['/api/*']},d1_databases:[{binding:'DB',database_name:'prg-lab',database_id:'local'}]}));
console.log('Built Worker, static assets and database migration package.');
