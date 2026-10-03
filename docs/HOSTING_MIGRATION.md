# Hosting migration: PRG Workspace

Status: 4 October 2026. The current source is pushed to GitHub and the replacement public website is deployed at [PRG Workspace](https://prg-workspace.prg-team.workers.dev). The Cloudflare adapter and build are implemented and covered by 50 passing tests, including five authentication checks.

## What is being moved

The repository contains the current recruitment workspace UI, Worker API, tests and three database migrations. The public app uses fictional examples; original documents, credentials and saved databases are not committed.

The product name is **PRG Workspace**. Cloudflare has assigned `prg-workspace.prg-team.workers.dev`, with no personal name or ChatGPT branding in the address. A company-approved custom domain can be added later.

Completed: GitHub integration, build commands, public hostname, D1 database creation with an Oceania location hint, all three schema migrations and public deployment. The previous host and its saved records remain intact.

Pending: Cloudflare Access activation, identity-provider setup, runtime issuer/audience and administrator settings, and authenticated end-to-end verification. Cloudflare currently asks for billing details, acceptance of terms and overage authorisation even for its Zero Trust Free plan. No billing terms were accepted by the agent. Public guides work; saved staff workflows stay locked.

## Why GitHub Pages is insufficient

GitHub Pages serves static HTML, CSS and JavaScript. This application also needs a server, a persistent database and verified sign-in. Publishing only the static folder would break saved cases, approvals and history. The recommended migration target is Cloudflare Workers with static assets and D1, deployed from this GitHub repository.

## Deployment sequence

1. Connect Cloudflare to **only this repository**, `zapped-varchasv/phillip-riley-ai-opportunity-lab`, and select the `main` branch. Review the requested repository permissions before authorising.
2. Confirm a non-personal Workers account subdomain and the application name `prg-workspace`. Availability must be checked in the account; changing an account subdomain affects its other Workers.
3. Provision a D1 database in the approved location. Bind it as `DB`. Apply migrations 0000, 0001 and 0002 in order. Never overwrite an applied migration.
4. Configure a Cloudflare Access application for the new hostname at `/api/*` and `/auth/*`, leaving the public UI available. The new `server/cloudflare.mjs` adapter strips caller-supplied identity headers and validates RS256 Access tokens against issuer, audience and expiry before passing identity into the app. Set `ACCESS_ISSUER` and `ACCESS_AUDIENCE` from that application. Missing configuration fails closed.
5. The Cloudflare build replaces sign-in routes with `/auth/login` and adds Access logout. Configure the initial Access allowlist and `OWNER_EMAIL` in runtime settings; confirm new staff membership separately. Do not commit account lists or secrets.
6. Set build environment variable `CLOUDFLARE_D1_DATABASE_ID` to the provisioned D1 ID. Use build command `npm run build:cloudflare` and deploy command `npm run deploy:cloudflare`. The build creates `.cloudflare/wrangler.json` with the correct assets, Worker entrypoint and D1 binding. Use `npx wrangler d1 migrations apply prg-workspace --remote --config .cloudflare/wrangler.json` once the build has generated the configuration. The deployment script now runs this migration command automatically before each publish, and Wrangler skips previously applied migrations. `npm run build` remains the existing Site build.
7. Decide whether the new pilot starts empty or needs existing saved records. If records are migrated, export privately, back up first, map identities explicitly and verify ownership, review history and counts. Repository publication does not migrate database contents.
8. Verify public pages, sign-in, forbidden anonymous access, cross-account isolation, reviewer permissions, persistence, exports and rollback. Then publish the verified new URL and update repository links.
9. Keep the existing service available during cutover. Retire it only after the new service is verified and its record-migration decision is complete.

## Still required

- Production identity provider and staff membership rules.
- Live Access policy and runtime issuer/audience/administrator settings.
- Existing-record migration decision and end-to-end testing on the new host.
- Company approval before real candidate or client data is used.

Do not publish the current Worker directly to an unprotected public endpoint. A renamed URL does not make the app ready for company-wide operational data.

## References

- [GitHub Pages: static hosting](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [Cloudflare Workers Git builds](https://developers.cloudflare.com/workers/ci-cd/builds/)
- [Cloudflare workers.dev addresses](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/)

## Validation performed

All 50 tests pass. The new authentication tests reject forged identity headers, invalid signatures, expired tokens, wrong audiences and issuers, and identities without an email. They also verify owner derivation and a fixed post-login redirect. The Cloudflare bundle passed a Wrangler dry run with the actual database binding. The GitHub-connected deployment then applied migrations 0000–0002 and completed successfully. Public pages were inspected in a browser. Production dependency audit reports no known vulnerabilities.
