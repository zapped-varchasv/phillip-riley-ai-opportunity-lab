import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
const archive=process.argv[2];
if(!archive)throw new Error('Pass the deployment archive path.');
const entries=execFileSync('tar',['-tzf',archive],{encoding:'utf8'}).split(/\r?\n/).map(p=>p.replace(/^\.\//,''));
for(const required of ['dist/server/index.js','dist/client/index.html','dist/.openai/hosting.json','dist/.openai/drizzle/0000_clever_talos.sql','dist/.openai/drizzle/meta/_journal.json'])assert.ok(entries.includes(required),`Deployment archive is missing ${required}`);
assert.ok(!entries.some(p=>/(^|\/)(\.env[^/]*|\.local|node_modules)(\/|$)/.test(p)),'Private local files must not be packaged.');
console.log('Deployment archive includes Worker, assets and database migrations; local secrets/data are excluded.');
