# Setup and operating guide

## Local demonstration

Use Node.js 22.13 or newer. Run `npm ci`, then `npm start`, and open `http://127.0.0.1:4174`. Click Sign in; the local adapter opens a simulated owner account. Its Author / Reviewer / Owner links let you demonstrate different roles without creating real accounts. The server binds only to localhost. Never expose this development adapter to the internet.

The original static backup still works by opening `dist/index.html`, or running `npm run start:offline` on port 4173. It does not provide SQL persistence or an AI endpoint.

## AI connection

Local startup reads `OPENAI_API_KEY` from ignored `.env.local` and defaults `OPENAI_MODEL` to `gpt-4.1-mini`. Provision credentials through a secure setup flow; never commit a key or enter one into a client-side setting. The model can be changed using the server environment.

On 25 September 2026 the real provider returned `credit_balance_exhausted` / `insufficient_quota`. Key provisioning succeeded, but response generation is blocked by API billing. The owner must check [OpenAI API billing](https://platform.openai.com/settings/organization/billing). Buying credits is an account-owner action. The interface preserves the unsent question on failure and never presents a canned answer as live AI.

The integration uses the [OpenAI Responses API](https://developers.openai.com/api/docs/guides/text), sends `store: false`, limits output to 1,400 tokens and uses a 45-second timeout. `store: false` does not mean no provider-side retention under any policy. Only synthetic or public material is authorised for this portfolio.

## Hosted environment

The frontend remains plain HTML, CSS and JavaScript. `npm run build` bundles the API into a Cloudflare-compatible Worker and copies assets and migrations. `.openai/hosting.json` declares the logical D1 binding `DB`. The platform applies the committed schema migration at deployment. No runtime schema creation or sample-data seeding runs in the hosted Worker.

Package through the Sites workflow. The deployment archive must include `dist/.openai/hosting.json` and `dist/.openai/drizzle/`, alongside `dist/server/` and `dist/client/`. Putting migrations only at the archive root is insufficient. Before publishing, run `node scripts/check-package.mjs <archive-path>`. After deployment, inspect the live database overview: all eight application tables must exist. A successful Worker upload alone does not verify database readiness.

Configure `OWNER_EMAIL` and `OPENAI_API_KEY` as secret server environment values and `OPENAI_MODEL` as a normal value. Local env files are excluded from source and deployment archives. A local credential is not automatically a hosted secret. The hosted assistant clearly shows when its connection is absent.

Hosted accounts use platform sign-in. The server trusts identity headers supplied by the hosting gateway; do not expose this Worker behind an untrusted proxy that allows callers to forge those headers. The existing Site stays private to its owner. Platform sharing and application roles are separate controls. A permitted visitor starts as a member; the owner can grant reviewer access after the person first signs in.

## Saved workflow

1. Trial studio → choose fictional source fields → Save synthetic draft.
2. Edit source/output and save a version. Submit a complete draft for review.
3. A reviewer checks the current source and output, then approves or requests changes.
4. The approved version can be exported. Any edit resets approval, and stale updates are rejected.
5. Record observations in Trial results. Assisted total time includes checking and corrections; review time is a subset, not an extra subtraction.

The owner may also approve drafts in this small demonstration. Independent second-person approval is an additional production requirement, not a control claimed here.

## Maintenance and limits

Run `npm run check`, `npm test`, and `npm run build` before publication. After a schema change, run `npm run db:generate`, inspect the SQL, then build. Back up databases before migration. Local data is in `.local/prg.sqlite`; it is excluded from Git. Take a consistent backup while the local server is stopped.

Application audit events are append-only through the API, with no edit/delete route. They are not tamperproof against a database administrator. Retention/deletion tooling, backup restore drills, SSO policy review, monitoring, load testing and independent security review remain prerequisites for real recruitment data. This is a portfolio implementation, not a production ATS.

Assistant requests are limited to 20 per user and 100 per workspace per UTC day. Failed provider attempts count. Conversation and business-case records are private to their owner; reviewers can access workflow drafts. There are no email, JobAdder, CRM or other PRG system integrations.
