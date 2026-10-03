import {createRemoteJWKSet,jwtVerify} from 'jose';
import {handle} from './worker.mjs';
import {signInPage} from './signin-page.mjs';

const entries=value=>typeof value==='string'?value.split(',').map(s=>s.trim().toLowerCase()).filter(Boolean):[];
const emailPattern=/^[^\s@]+@([a-z0-9](?:[a-z0-9.-]*[a-z0-9])?)$/i;
function staffPolicy(env){
 const domains=entries(env.STAFF_EMAIL_DOMAINS),emails=entries(env.STAFF_EMAILS);
 const valid=(domains.length+emails.length)>0&&domains.every(d=>/^[a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z]{2,}$/.test(d))&&emails.every(e=>emailPattern.test(e));
 return {valid,allows(email){const match=emailPattern.exec(email);return !!match&&(emails.includes(email)||domains.includes(match[1]));}};
}

// Only verified Cloudflare Access claims may enter the existing identity boundary.
export function createCloudflareWorker(keySetFactory=createRemoteJWKSet){
 const keySets=new Map();
 const error=(status,message)=>Response.json({error:message},{status,headers:{'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'}});
 return {async fetch(request,env){
  const url=new URL(request.url);
  const policy=staffPolicy(env);
  const issuer=env.ACCESS_ISSUER,audience=env.ACCESS_AUDIENCE;
  const ready=typeof issuer==='string'&&/^https:\/\/[a-z0-9-]+\.cloudflareaccess\.com$/.test(issuer)&&typeof audience==='string'&&!!audience.trim()&&policy.valid;
  if(url.pathname==='/signin')return signInPage({ready});
  if(!url.pathname.startsWith('/api/')&&!url.pathname.startsWith('/auth/'))return env.ASSETS.fetch(request);
  if(!ready){
   if(url.pathname==='/auth/login')return signInPage();
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
  const email=claims.email.trim().toLowerCase();
  if(!policy.allows(email))return url.pathname==='/auth/login'?signInPage({ready,denied:true}):error(403,'This work email is not approved for the workspace. Contact your administrator.');
  if(url.pathname==='/auth/login')return new Response(null,{status:303,headers:{Location:'/#home','Cache-Control':'no-store'}});
  if(url.pathname.startsWith('/auth/'))return error(404,'Page not found.');
  const headers=new Headers(request.headers);
  for(const name of [...headers.keys()])if(name.startsWith('oai-authenticated-user-'))headers.delete(name);
  headers.set('oai-authenticated-user-id','cf:'+claims.sub);
  headers.set('oai-authenticated-user-email',email);
  headers.set('oai-authenticated-user-full-name',encodeURIComponent(typeof claims.name==='string'?claims.name:claims.email));
  headers.set('oai-authenticated-user-full-name-encoding','percent-encoded-utf-8');
  return handle(new Request(request,{headers}),{...env,LOCAL_DEMO:undefined,ENABLE_LEGACY_PORTFOLIO_WRITES:undefined});
 }};
}
export default createCloudflareWorker();
