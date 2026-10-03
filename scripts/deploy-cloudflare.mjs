import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const wrangler=fileURLToPath(new URL('../node_modules/wrangler/bin/wrangler.js',import.meta.url));
// Wrangler records applied migrations; later builds apply only new migrations.
for(const args of [
 ['d1','migrations','apply','prg-workspace','--remote','--config','.cloudflare/wrangler.json'],
 ['deploy','--config','.cloudflare/wrangler.json']
])execFileSync(process.execPath,[wrangler,...args],{stdio:'inherit',env:process.env});
