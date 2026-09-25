import http from 'node:http';
import {mkdirSync,readFileSync,existsSync} from 'node:fs';
import path from 'node:path';
import {handle} from '../server/worker.mjs';
import {sqliteAdapter,migrate} from './sqlite-adapter.mjs';
if(existsSync('.env.local'))process.loadEnvFile('.env.local');
const root=path.resolve('dist');mkdirSync('.local',{recursive:true});const DB=sqliteAdapter('.local/prg.sqlite');migrate(DB,path.resolve('drizzle'));
const env={DB,OWNER_EMAIL:'owner@local.test',LOCAL_DEMO:'true',OPENAI_API_KEY:process.env.OPENAI_API_KEY,OPENAI_MODEL:process.env.OPENAI_MODEL||'gpt-4.1-mini'};
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.svg':'image/svg+xml'};
// Local role chooser is implemented only in this localhost adapter, never in the hosted Worker.
const personas={author:{id:'local-author',email:'author@local.test',name:'Alex · author'},reviewer:{id:'local-reviewer',email:'reviewer@local.test',name:'Riley · reviewer'},owner:{id:'local-owner',email:'owner@local.test',name:'Varchasv · demo owner'}};
env.ASSETS={async fetch(req){const u=new URL(req.url);let file;try{file=path.resolve(root,'.'+(u.pathname==='/'?'/index.html':decodeURIComponent(u.pathname)));}catch{return new Response('Invalid path',{status:400});}if(!file.startsWith(root+path.sep)||!existsSync(file))return new Response('Not found',{status:404});try{return new Response(readFileSync(file),{headers:{'Content-Type':types[path.extname(file)]||'application/octet-stream'}});}catch{return new Response('Not found',{status:404});}}};
http.createServer(async(req,res)=>{
 try{
  if(!['127.0.0.1:4174','localhost:4174'].includes(req.headers.host)){res.writeHead(403).end();return;}
  const url=new URL(req.url,'http://'+req.headers.host);
  if(url.pathname==='/signin-with-chatgpt'){
   if(req.headers['sec-fetch-site']==='cross-site'){res.writeHead(403).end();return;}
   const role=url.searchParams.get('role')||'owner';if(!personas[role]){res.writeHead(400).end();return;}
   res.writeHead(302,{'Set-Cookie':`prg_local=${role}; Path=/; HttpOnly; SameSite=Strict`,'Location':'/#workspace'}).end();return;
  }
  if(url.pathname==='/signout-with-chatgpt'){res.writeHead(302,{'Set-Cookie':'prg_local=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict','Location':'/'}).end();return;}
  const headers=new Headers();for(const [k,v] of Object.entries(req.headers))if(!k.startsWith('oai-authenticated-user-')&&v)headers.set(k,Array.isArray(v)?v.join(','):v);
  const role=req.headers.cookie?.split(';').map(v=>v.trim()).find(v=>v.startsWith('prg_local='))?.split('=')[1];const person=personas[role];
  if(person){headers.set('oai-authenticated-user-id',person.id);headers.set('oai-authenticated-user-email',person.email);headers.set('oai-authenticated-user-full-name',person.name);if(role==='reviewer')await DB.prepare('INSERT INTO users(id,email,name,role,created_at) VALUES (?,?,?,?,?) ON CONFLICT(id) DO NOTHING').bind(person.id,person.email,person.name,'reviewer',new Date().toISOString()).run();}
  const request=new Request(url,{method:req.method,headers,...(!['GET','HEAD'].includes(req.method)?{body:req,duplex:'half'}:{})});
  const response=await handle(request,env);res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()));
 }catch(e){console.error('Local request failed:',e.name);res.writeHead(500).end('Local request failed.');}
}).listen(4174,'127.0.0.1',()=>console.log('PRG saved workspace: http://127.0.0.1:4174\nLocal role simulation only. Hosted accounts use ChatGPT sign-in.'));

