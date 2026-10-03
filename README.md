# PRG One Workspace

Project documentation and public prototype source by Varchasv Gupta for recruitment workflow and AI enrichment work.

The current private workbench brings a case's next action, enrichment evidence, review decisions, notes and handoff into one place. The intended benefit is less switching between tools and less repeated administration, while keeping JobAdder as the main recruitment record.

## Start here

| You need to | Read |
|---|---|
| Understand progress, remaining work and stakeholder decisions | [Stakeholder progress brief](docs/STAKEHOLDER_PROGRESS.md) |
| Download a printable meeting document | [Five-page stakeholder PDF](docs/PRG_Stakeholder_Progress.pdf) |
| Learn how to use the current workspace | [User guide](docs/USER_GUIDE.md) |
| Collect requirements and track readiness | [Implementation checklist](docs/IMPLEMENTATION_CHECKLIST.md) |

Read the progress brief first, use the user guide for a demonstration, then copy the blank implementation checklist into an approved private project space. Record confidential answers there, not in public GitHub issues.

## Current status

The private prototype includes saved cases, three workflow types, linked enrichment reviews, checkpoints, notes, handoff exports, a platform hub and search. Its 45 automated checks and desktop/mobile review establish prototype behaviour, not production readiness or measured business savings.

**Live integrations and live AI are not configured in the current workbench.** It uses fictional rehearsal data. Platform shortcuts and setup checklists do not synchronise records or establish API access.

[Open the private workspace](https://prg-opportunity-lab-varchasv.varchasvgupta0808.chatgpt.site). An authorised account is required; repository access does not grant Site access.

## What this repository contains

**The documentation above describes the current private workbench. The application source in this public repository is an earlier prototype.** The current workbench source is maintained separately because it includes internal workflow summaries. Cloning this repository does not run the current private Site.

The earlier source remains available for technical reference. Its speculative opportunity scores, cost examples and workflow demonstrations are not current project plans or measured results. Use the current stakeholder brief and implementation checklist for delivery decisions.

| Technical reference | Scope |
|---|---|
| [Setup](docs/SETUP.md) | Running and configuring the earlier public application |
| [Architecture](docs/ARCHITECTURE.md) | Public prototype components and integration boundaries |
| [Validation notes](docs/QA.md) | Checks performed on the earlier public application |
| [Public research](docs/RESEARCH.md) | Dated public sources and assumptions |
| [Asset attribution](docs/ASSETS.md) | Logo ownership and branding references |

## Run the earlier public prototype

Use Node.js 22.13 or later:

```sh
git clone https://github.com/zapped-varchasv/phillip-riley-ai-opportunity-lab.git
cd phillip-riley-ai-opportunity-lab
npm ci
npm start
```

Open `http://127.0.0.1:4174`. Local sign-in simulates development accounts and records persist in ignored `.local/prg.sqlite`. Follow the [setup guide](docs/SETUP.md) for details. The optional assistant in this earlier code requires server-side API configuration and credits; it is separate from the current workbench's capabilities.

## Information handling

Company documents, private configuration, credentials and operational records are excluded. Use fictional examples only. This repository is not an operational ATS or a place to store candidate or client information.

Original code is [MIT licensed](LICENSE). The Phillip Riley logo remains owned by its rights holder and is excluded from that licence; see [asset attribution](docs/ASSETS.md). No official product endorsement is claimed.
