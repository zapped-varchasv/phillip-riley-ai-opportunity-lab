import {build} from 'esbuild';
import {mkdir,cp,readFile,writeFile} from 'node:fs/promises';
const databaseId=process.env.CLOUDFLARE_D1_DATABASE_ID;
if(!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(databaseId||''))throw new Error('Set CLOUDFLARE_D1_DATABASE_ID to the provisioned database ID before building for Cloudflare.');
await mkdir('.cloudflare/client',{recursive:true});
await build({entryPoints:['server/cloudflare.mjs'],outfile:'.cloudflare/worker.js',bundle:true,format:'esm',platform:'browser',target:'es2022'});
for(const file of ['index.html','workbench-ui.mjs','workbench.css','platforms.mjs','enrichment.js','enrichment.css','enrichment-data.mjs','enrichment-rules.mjs','assets'])await cp('dist/'+file,'.cloudflare/client/'+file,{recursive:true});
for(const file of ['index.html','enrichment.js']){
 const path='.cloudflare/client/'+file;
 let text=await readFile(path,'utf8');
 text=text.replaceAll('/signin-with-chatgpt','/auth/login').replaceAll('/signout-with-chatgpt','/cdn-cgi/access/logout');
 if(file==='enrichment.js')text=text.replace(' · <a href="#guide">Staff guide</a>',' · <a href="#guide">Staff guide</a> · <a href="/cdn-cgi/access/logout">Sign out</a>');
 await writeFile(path,text);
}
await writeFile('.cloudflare/wrangler.json',JSON.stringify({name:'prg-workspace',main:'worker.js',compatibility_date:'2026-10-03',workers_dev:true,assets:{directory:'client',binding:'ASSETS',run_worker_first:['/api/*','/auth/*']},d1_databases:[{binding:'DB',database_name:'prg-workspace',database_id:databaseId,migrations_dir:'../drizzle'}]},null,2));
console.log('Cloudflare build complete. Configure Access and runtime secrets before enabling saved staff workflows.');
