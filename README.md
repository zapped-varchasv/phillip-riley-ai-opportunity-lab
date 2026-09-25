# PRG Opportunity Lab

### Practical AI for renewable-energy recruitment

**An independent interview portfolio by Varchasv Gupta.** A working demonstration of how I would discover, test and explain useful AI opportunities for Phillip Riley.

The recommendation is simple: **understand the work, check what the business already owns, run small trials, and invest only where the evidence supports it.** This project makes that approach tangible with three interactive workflow demos, sixteen ranked opportunities and an editable commercial comparison.

> Synthetic data only. This is not an official Phillip Riley product, an internal systems audit or a production AI service. No operational access, live pilot or measured savings are claimed. The supplied role document is not published here. Brand assets remain the property of their owners.

## Start here

| You want to… | Open this |
|---|---|
| Understand the proposal in plain English | [Stakeholder guide](docs/STAKEHOLDER_GUIDE.md) |
| Present it in five minutes | [Interview walkthrough](docs/INTERVIEW_WALKTHROUGH.md) |
| Check what research supports it | [Research and assumptions](docs/RESEARCH.md) |
| See how a real pilot would be measured | [Trial playbook](docs/TRIAL_PLAYBOOK.md) |
| Understand the delivery and handover | [Delivery plan](docs/DELIVERY_PLAN.md) |
| Inspect the system and integration boundaries | [Architecture](docs/ARCHITECTURE.md) |

## Run the project

**Version 2 adds a backend and SQL database:** saved drafts, versioned approvals, user roles, saved cost scenarios, priority reviews, trial observations and an OpenAI assistant with private conversation history. The original offline demo remains available.

For the full local workspace, install Node.js **22.13 or later**, then:

```sh
git clone https://github.com/zapped-varchasv/phillip-riley-ai-opportunity-lab.git
cd phillip-riley-ai-opportunity-lab
npm ci
npm start
```

Open `http://127.0.0.1:4174`. Local sign-in simulates author, reviewer and owner accounts; it is strictly a development feature. Saved data is stored in ignored `.local/prg.sqlite`. The hosted Worker uses platform authentication and a D1 SQL database. See [setup and operating guide](docs/SETUP.md).

The AI assistant needs a server-side OpenAI API key and API credits. Local startup reads an ignored `.env.local`. A configured key does not prove that the account has credits or model access. At verification, the real API returned `credit_balance_exhausted`; no successful model answer or model-quality evaluation is claimed.

### Offline backup

**No install, API key or account is required.** Download the repository using **Code → Download ZIP**, extract it, and open [`dist/index.html`](dist/index.html) in a modern browser. All assets are included; the demo also works offline. Only external research and repository links need internet access.

To serve only the original offline pages:

```sh
npm run start:offline
```

Open `http://127.0.0.1:4173`. Saved workspace and AI features require the full server above.

## What works

| Demo | What the stakeholder sees | Why it matters |
|---|---|---|
| **Brief to advert** | Edit a fictional BESS or wind role, generate a draft, inspect source fields, and hold release if required information is absent | Shows consistent drafting without inventing salary or role facts |
| **Candidate care** | Draft a status update or hold the workflow when contact permission is absent | Demonstrates a useful service improvement with explicit human ownership |
| **Client pulse** | Turn cumulative pipeline counts into a client update; reject inconsistent numbers | Connects administration to client communication and agreed next actions |
| **Opportunity register** | Search, filter, sort, explain and export 16 proposed opportunities | Makes prioritisation inspectable rather than presenting an unexplained AI wish list |
| **Business case** | Adjust team size, frequency, review time, costs and adoption; export the options paper | Compares existing tools, general AI, specialist software and a tailored solution on the same basis |
| **Roadmap and research** | View decision gates, handover needs, sources and discovery questions | Shows how a small prototype becomes a supervised business project |

The trial engine uses **deterministic templates and validation rules**. The separate **AI assistant** calls OpenAI from the server to explain assumptions, plan trials and discuss a selected synthetic draft. It cannot send messages, approve work or make hiring decisions. Responses require human review.

| Saved feature | Business purpose |
|---|---|
| Drafts and review history | Keep source facts, output, actor and versions together; edits invalidate approval |
| Member, reviewer and owner roles | Enforce draft access and approval permissions on the server |
| Saved business cases and priority reviews | Preserve the reasoning behind changing assumptions and recommendations |
| Trial observations | Record total task time, review, corrections and failed cases before claiming value |
| AI assistant | Help staff understand the proposal and improve drafts using supplied project context |

## Why this is specific to Phillip Riley

Phillip Riley publicly describes recruitment across the renewable-energy lifecycle, including executive, permanent and contract services. Its sectors include wind, solar, energy storage and transmission. Those facts shape the fictional scenarios and the focus on client relationships, candidate communication and recruiter administration. [Company overview](https://www.phillipriley.com.au/) · [Sectors](https://www.phillipriley.com.au/industries-sectors/)

JobAdder publicly advertises AI job-ad drafting and candidate summaries, and ROI-AI describes a JobAdder integration. That makes an existing-capability review a sensible starting point. **Public vendor capability does not establish PRG’s licence entitlement or actual use.** [JobAdder](https://jobadder.com/ai-recruitment-software/) · [ROI-AI](https://www.roi-ai.com/integrations/)

## How value is estimated

The starting scenario for the existing-tools option assumes 10 people, 8 tasks per person per week, 46 working weeks, 10 gross minutes saved, 3 review minutes and 75% adoption. At AUD 65 per hour it models:

- **322 hours** of annual capacity released.
- **AUD 5,400** year-one incremental cost and **AUD 11,400** three-year cost.
- **AUD 15,530** year-one net capacity value.

These are **illustrative inputs, not PRG figures or vendor quotations**. Released capacity is not cash savings. The interface lets stakeholders challenge every input; setting review time above gross saving correctly eliminates the benefit. The four options are alternatives and their benefits must not be added together.

## Quality and boundaries

```sh
npm run check
npm test
```

Tests cover missing information, absent permission, pipeline integrity, zero cohorts, independent cost calculations, review burden, zero adoption and data consistency. Browser acceptance checks are recorded in [QA](docs/QA.md).

- Enter synthetic information only. Offline trial inputs stay in browser memory. Explicitly saved records and successful assistant conversations persist in SQL.
- Exports are local files. No email is sent and no live record changes.
- The offline review checkbox is illustrative. Saved-workspace approvals and exports are checked by the backend against identity, role and current version.
- Assistant requests send the question, recent conversation, public project notes and an explicitly selected draft to OpenAI. The API key is never sent to the browser. No real candidate or client data is authorised.
- No candidate scoring, screening decision, legal advice or autonomous outreach is implemented.
- Logo and observed navy/green colour references identify the subject of the portfolio; there is no endorsement claim.

## Repository map

```text
dist/                   Offline-ready app and included brand asset
  app.js                Views, state, review flow and local exports
  engine.js             Pure validation, ranking and cost calculations
  data.js               Fictional scenarios and proposed opportunities
docs/                   Stakeholder, research, trials and handover guides
tests/                  Business-rule and calculation tests
scripts/serve.cjs       Dependency-free local HTTP server
server/                 Worker API, permissions and AI provider integration
db/ and drizzle/        SQL schema and versioned schema-only migrations
dist/workspace.js       Saved workspace, assistant and observations UI
scripts/dev-server.mjs  Local SQL server and development-only account simulation
scripts/build.mjs       Worker bundle and asset packaging
.openai/hosting.json     Site identifier and logical SQL binding; no credentials
```

Original code is [MIT licensed](LICENSE). The Phillip Riley logo is excluded from that licence; see [asset attribution](docs/ASSETS.md).
