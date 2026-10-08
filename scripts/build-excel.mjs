import {build} from 'esbuild';
// Self-hosted and loaded only when requested; assessment data stays in the browser.
await build({entryPoints:['src/client-trial-excel.mjs'],outfile:'dist/client-trial-excel.mjs',bundle:true,minify:true,format:'esm',platform:'browser',target:'es2022',legalComments:'eof'});
