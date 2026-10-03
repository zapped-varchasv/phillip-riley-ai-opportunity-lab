import {test} from 'node:test';
import assert from 'node:assert/strict';
import {generateKeyPair,SignJWT,createLocalJWKSet,exportJWK} from 'jose';
import {createCloudflareWorker} from '../server/cloudflare.mjs';
import {sqliteAdapter,migrate} from '../scripts/sqlite-adapter.mjs';
import path from 'node:path';
const issuer='https://test-team.cloudflareaccess.com',audience='test-workspace';
const {privateKey,publicKey}=await generateKeyPair('RS256');
const jwk={...await exportJWK(publicKey),kid:'test-key',alg:'RS256'};
const app=createCloudflareWorker(()=>createLocalJWKSet({keys:[jwk]}));
const token=(options={})=>new SignJWT({email:'staff@test.local',...options.claims}).setProtectedHeader({alg:'RS256',kid:'test-key'}).setIssuedAt().setIssuer(options.issuer||issuer).setAudience(options.audience||audience).setSubject(options.sub||'member-1').setExpirationTime(options.exp||'5m').sign(privateKey);
function setup(t){const DB=sqliteAdapter();migrate(DB,path.resolve('drizzle'));t.after(()=>DB.close());return {DB,ACCESS_ISSUER:issuer,ACCESS_AUDIENCE:audience,STAFF_EMAIL_DOMAINS:'test.local',OWNER_EMAIL:'owner@test.local',ASSETS:{fetch:async()=>new Response('Public workspace')}};}
function request(route='/api/me',jwt,extra={}){return new Request('https://workspace.test'+route,{headers:{...extra,...(jwt?{'cf-access-jwt-assertion':jwt}:{})}});}
test('Cloudflare public pages do not require identity; API fails closed without configuration',async t=>{const env=setup(t);assert.equal(await(await app.fetch(request('/'),env)).text(),'Public workspace');assert.equal((await app.fetch(request(),{...env,ACCESS_ISSUER:undefined})).status,503);});
test('Cloudflare rejects fabricated identity headers and malformed or expired sessions',async t=>{const env=setup(t);assert.equal((await app.fetch(request('/api/me',undefined,{'oai-authenticated-user-id':'owner','oai-authenticated-user-email':'owner@test.local'}),env)).status,401);for(const value of ['fake',await token({exp:'-1s'}),await token({audience:'another-app'}),await token({issuer:'https://other.cloudflareaccess.com'})])assert.equal((await app.fetch(request('/api/me',value),env)).status,401);});
test('Cloudflare verified member cannot use forged headers to become administrator',async t=>{const env=setup(t),jwt=await token();const response=await app.fetch(request('/api/me',jwt,{'oai-authenticated-user-id':'owner','oai-authenticated-user-email':'owner@test.local','oai-authenticated-user-full-name':'Forged owner'}),env);assert.equal(response.status,200);const {user,localDemo}=await response.json();assert.equal(user.role,'member');assert.equal(user.id,'cf:member-1');assert.equal(user.email,'staff@test.local');assert.equal(user.name,'staff@test.local');assert.equal(localDemo,false);});
test('Cloudflare accepts configured owner only from verified identity and returns fixed login destination',async t=>{const env=setup(t),jwt=await token({claims:{email:'owner@test.local',name:'Workspace administrator'}});const result=await(await app.fetch(request('/api/me',jwt),env)).json();assert.equal(result.user.role,'admin');const r=await app.fetch(request('/auth/login?redirect=https://attacker.test',jwt),env);assert.equal(r.status,303);assert.equal(r.headers.get('location'),'/#home');});
test('Cloudflare requires an email claim, not a service-token identity',async t=>{const env=setup(t);const jwt=await token({claims:{email:null}});assert.equal((await app.fetch(request('/api/me',jwt),env)).status,401);});

test('Work-email policy fails closed when missing or malformed',async t=>{
 const env=setup(t),jwt=await token();
 for(const domain of [undefined,'*','@test.local','test.local,*.example.com']){
  const settings={...env,STAFF_EMAIL_DOMAINS:domain};
  assert.equal((await app.fetch(request('/api/me',jwt),settings)).status,503);
  const page=await app.fetch(request('/signin'),settings);
  assert.equal(page.status,503);
  assert.match(await page.text(),/Sign-in is not active yet/);
 }
});

test('Verified outsiders, lookalike domains and unapproved subdomains cannot access staff records',async t=>{
 const env=setup(t);
 for(const email of ['staff@personal.example','staff@sub.test.local','staff@test.local.attacker.example','staff@eviltest.local','staff@@test.local']){
  const jwt=await token({claims:{email}});
  assert.equal((await app.fetch(request('/api/me',jwt),env)).status,403,email);
 }
 const result=await(await app.fetch(request('/api/me',await token({claims:{email:'STAFF@TEST.LOCAL'}})),env)).json();
 assert.equal(result.user.email,'staff@test.local');
});

test('Explicit pilot email allowlist admits only that email, including for configured owner',async t=>{
 const env={...setup(t),STAFF_EMAIL_DOMAINS:undefined,STAFF_EMAILS:'staff@test.local'};
 assert.equal((await app.fetch(request('/api/me',await token()),env)).status,200);
 assert.equal((await app.fetch(request('/api/me',await token({claims:{email:'owner@test.local'}})),env)).status,403);
 const changed={...env,STAFF_EMAILS:'another@test.local'};
 assert.equal((await app.fetch(request('/api/me',await token()),changed)).status,403);
});

test('Public sign-in page offers the managed login only after configuration and does not expose email allowlist',async t=>{
 const env={...setup(t),STAFF_EMAILS:'private-admin@example.com'};
 const response=await app.fetch(request('/signin'),env),html=await response.text();
 assert.equal(response.status,200);
 assert.match(html,/Continue with work email/);
 assert.match(html,/href="\/auth\/login"/);
 assert.doesNotMatch(html,/private-admin@example.com/);
 assert.equal(response.headers.get('cache-control'),'private, no-store');
 const denied=await app.fetch(request('/auth/login',await token({claims:{email:'other@outside.example'}})),env);
 assert.equal(denied.status,403);
 assert.match(await denied.text(),/This account is not approved/);
});
