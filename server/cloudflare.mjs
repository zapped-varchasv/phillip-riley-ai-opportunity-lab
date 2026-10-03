import {createRemoteJWKSet,jwtVerify} from 'jose';
import {handle} from './worker.mjs';

// Only verified Cloudflare Access claims may enter the existing identity boundary.
export function createCloudflareWorker(keySetFactory=createRemoteJWKSet){
 const keySets=new Map();
 const error=(status,message)=>Response.json({error:message},{status,headers:{'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'}});
 return {async fetch(request,env){
  const url=new URL(request.url);
  if(!url.pathname.startsWith('/api/')&&!url.pathname.startsWith('/auth/'))return env.ASSETS.fetch(request);
  const issuer=env.ACCESS_ISSUER,audience=env.ACCESS_AUDIENCE;
  if(typeof issuer!=='string'||!/^https:\/\/[a-z0-9-]+\.cloudflareaccess\.com$/.test(issuer)||!audience){
   if(url.pathname==='/auth/login')return new Response('<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Staff access | Phillip Riley</title><body style="font-family:system-ui;max-width:640px;margin:12vh auto;padding:24px;line-height:1.7"><h1>Staff sign-in is being set up</h1><p>The public workspace is available to explore. Saving cases, reviews and measurements needs staff access to be configured first.</p><p><a href="/#home">Return to the workspace</a> · <a href="/#guide">Read the staff guide</a></p></body></html>',{status:503,headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
   return error(503,'Staff sign-in is not configured yet. Public guides remain available.');
  }
  const token=request.headers.get('cf-access-jwt-assertion');
  if(!token)return error(401,'Sign in with your approved staff account.');
  let claims;
  try{
   if(!keySets.has(issuer))keySets.set(issuer,keySetFactory(new URL(issuer+'/cdn-cgi/access/certs')));
   const verified=await jwtVerify(token,keySets.get(issuer),{issuer,audience,algorithms:['RS256'],requiredClaims:['exp','iat','sub','email']});
   claims=verified.payload;
   if(typeof claims.sub!=='string'||!claims.sub||claims.sub.length>200||typeof claims.email!=='string'||!claims.email.includes('@'))return error(401,'The sign-in identity is incomplete.');
  }catch{return error(401,'Your staff session could not be verified. Please sign in again.');}
  if(url.pathname==='/auth/login')return new Response(null,{status:303,headers:{Location:'/#home','Cache-Control':'no-store'}});
  if(url.pathname.startsWith('/auth/'))return error(404,'Page not found.');
  const headers=new Headers(request.headers);
  for(const name of [...headers.keys()])if(name.startsWith('oai-authenticated-user-'))headers.delete(name);
  headers.set('oai-authenticated-user-id','cf:'+claims.sub);
  headers.set('oai-authenticated-user-email',claims.email.toLowerCase());
  headers.set('oai-authenticated-user-full-name',encodeURIComponent(typeof claims.name==='string'?claims.name:claims.email));
  headers.set('oai-authenticated-user-full-name-encoding','percent-encoded-utf-8');
  return handle(new Request(request,{headers}),{...env,LOCAL_DEMO:undefined,ENABLE_LEGACY_PORTFOLIO_WRITES:undefined});
 }};
}
export default createCloudflareWorker();
