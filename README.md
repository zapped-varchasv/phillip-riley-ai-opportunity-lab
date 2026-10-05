# Phillip Riley AI Discovery & Trials

A workspace for the AI internship deliverables: understand current work, validate opportunities, review existing AI, run controlled trials and recommend a practical commercial path. JobAdder remains the main recruitment record.

## Current status

Updated 5 October 2026: the homepage now maps all eight JD deliverables. Staff discovery, 15 unranked opportunity hypotheses, existing-agent reviews, three trial templates, a four-path cost comparison and a 12-month roadmap are the primary workflow. Enrichment and case boards remain supporting rehearsals.

**Public website: [PRG Workspace](https://prg-workspace.prg-team.workers.dev).** The website address contains neither a personal name nor ChatGPT branding. A company-approved domain can be attached later.

The repository is connected to Cloudflare and the database schema is deployed. **Staff sign-in is pending**, so the new site currently supports public browsing. Saved cases, approvals and measurements require activation of Cloudflare Access and configuration of staff permissions. Existing records on the previous host have not been migrated.

GitHub stores the source and runs verification. GitHub Pages alone cannot run this app's database or authenticated API. See [Hosting migration](docs/HOSTING_MIGRATION.md) for the current blocker and deployment checklist.

## Start here

| Task | Guide |
|---|---|
| Understand progress and remaining work | [Stakeholder progress](docs/STAKEHOLDER_PROGRESS.md) |
| Use the workspace | [User guide](docs/USER_GUIDE.md) |
| Set up work-email sign-in | [Work-email sign-in](docs/WORK_EMAIL_SIGN_IN.md) |
| Agree company access and integrations | [Implementation checklist](docs/IMPLEMENTATION_CHECKLIST.md) |
| Move hosting and choose an address | [Hosting migration](docs/HOSTING_MIGRATION.md) |
| Check logo attribution | [Asset attribution](docs/ASSETS.md) |

The printable stakeholder PDF and older technical notes are historical snapshots. Use the application source, current user guide and hosting migration document for the current version.

## Planning worksheets (available without sign-in)

Start on Project overview, then work through Staff discovery, Opportunity register, Agent reviews & trials, Four-path comparison and Roadmap & handover. Notes stay in the current tab only. Download the JSON worksheet before closing or refreshing, and import it to continue. There is no automatic server save, collaboration or approval submission. Use sanitised observations and references, not personal records or confidential documents.

Opportunity ratings are a proposed equal-weight discussion aid, not approved PRG criteria. Blank ratings are unranked. Cost totals stay unknown until all five components are entered; confirmed zero is allowed. Three-year totals count setup and initial training once and recurring costs three times. These are scenarios, not verified savings.

## Rehearsal capabilities (database saves require staff sign-in)

- Saved permanent, contract and client-research work items with stage checklists, evidence, notes and handoff exports.
- Field-by-field enrichment review with accept, hold and reject decisions, history and approved-field exports.
- Platform shortcuts, setup notes, workflow maps, cost cases, pilot measurements and project decisions.
- Search across saved cases, records, pages and platforms.
- Staff guidance for consultants, reviewers, operations and managers.

Use fictional examples only. Live AI, platform synchronisation and JobAdder writeback are not connected. Cases and shortcuts remain account-specific; an assignee label does not share a case or notify a colleague. These are prototype capabilities, not measured savings or production readiness.

## Run locally

Requires Node.js 22.13 or later:

```sh
npm ci
npm run check
npm test
npm start
```

Open `http://127.0.0.1:4174`. The localhost adapter simulates sign-in roles and saves fictional records in ignored `.local/prg.sqlite`. It must never be exposed as a production server. Run `npm run build` to build the existing hosted runtime.

## Hosting and information handling

The existing Site runtime expects its authenticated hosting gateway. The new Cloudflare entrypoint verifies Access tokens and rejects unauthenticated API calls. Use `npm run build:cloudflare` with a provisioned D1 database ID and follow the hosting migration guide to configure staff sign-in before enabling saved workflows. All 59 automated checks pass; public deployment is verified; authenticated end-to-end checks remain pending Access setup.

Original company documents, credentials, account lists, saved records and local databases are excluded. Repository code includes the workflow summaries already displayed in the public prototype. Store actual operational records only in approved company systems.

Original code is [MIT licensed](LICENSE). Phillip Riley's logo remains owned by its rights holder and is excluded from that licence; see [asset attribution](docs/ASSETS.md).
