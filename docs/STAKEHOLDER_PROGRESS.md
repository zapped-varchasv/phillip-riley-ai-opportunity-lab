# PRG One Workspace progress and next steps

Prepared by Varchasv Gupta for project stakeholders  
Status as at 9 October 2026
Public project summary with confidential operational detail excluded

## The current position

The website is organised around ongoing company work: data quality, recruitment processes, tool usage, AI quality, costs and continuous improvement. Its intended audience is the whole team. Current access and integration limitations are listed below; the long-term goal is a maintained staff workspace.

The public site supports planning worksheets without sign-in. These cover staff discovery, 15 starting hypotheses, existing-agent reviews, three trial plans, four commercial paths with one- and three-year costs, the tailored-solution decision and a 12-month roadmap. Notes remain in the current tab and must be downloaded to keep them; they are not shared company records or approvals.

Trial 1 now has an interactive client-prioritisation worksheet: choose 10 of 20 criteria, record staff scores and view a ranked A/B/C list. Incomplete assessments remain unranked. Worksheet download/import includes these assessments; shared database saving and AI-generated scores are not part of this trial. The team still needs to agree scoring definitions, approve the sample and measure usefulness and time spent.

**Still needed:** validate actual tool usage and entitlements, review the existing agents, agree and run controlled trials, obtain cost evidence, compare options, agree roadmap owners, deliver training and present the recommendation. No measured business savings, completed staff trials or approved vendor recommendation are claimed.

The Cloudflare site is public and its database schema is deployed. Work-email sign-in remains pending setup; database saves are unavailable on this host until access is activated. Live AI, platform integrations and operational rollout are not connected. Previous-host records have not been migrated.

The next business decision is one agreed trial: scope, accountable owner, approved sample, reviewer, baseline and success measure. Check existing licensed capabilities before considering new spend.

## Supporting rehearsal capabilities

| Capability | Current position | Practical purpose |
|---|---|---|
| Project overview and rehearsal work board | Staff tasks and improvement areas on the homepage; synthetic case workflow behind staff access | Keep evidence gaps and next actions visible. |
| Three workflow types | Permanent, contract and client research prototypes | Keep different tasks and handoffs separate. |
| Enrichment review | Current and proposed values, evidence, accept, hold and reject | Make changes inspectable before use. |
| Case notes and history | Saved notes, stage checkpoints and change history | Retain context through a handoff. |
| Handoff exports | Review packets and text drafts | Prepare information for manual review. |
| Platform hub and search | 23 platform entries, shortcuts and setup notes | Find the right tool and understand its role. |
| Cost and pilot records | Saved assumptions and aggregate observations | Test value without presenting assumptions as results. |
| Live integrations and live AI | Not configured | Require approved access and further implementation. |

<!-- pagebreak -->

## What a fully working process should look like

End to end means a permitted record enters the workflow, useful changes are proposed, a person reviews them, approved changes reach the correct system, and the outcome can be measured and supported.

1. **Choose the right records.** A small, agreed group is selected from the recruitment system. Each record has a stable ID so the same person or contact is not confused with another.
2. **Find a useful missing or outdated value.** Check agreed fields only. An approved source supplies the evidence and its date. Existing tools should be used where they already provide this capability.
3. **Prepare a suggested change.** Show the current value, proposed value and supporting evidence. A suggestion must not silently become an accepted fact.
4. **Review the change.** A named reviewer accepts, holds or rejects it. Missing evidence and conflicting information remain visible.
5. **Apply the approved update.** Before changing JobAdder, check whether the original value has changed since review. Record what was updated and avoid duplicate writes.
6. **Carry the context forward.** Make the next action, receiving owner and relevant source references available. Any outward message or automation needs its own approved trigger and permissions.
7. **Measure and support the result.** Record useful updates, errors, review effort and total cost. Someone must own failures, corrections and ongoing support.

## How far along that process is the project

**Evidence of progress:** 45 automated tests passed for the current private prototype. Desktop and mobile screens were checked. Tests cover permissions, competing edits, stage checks and evidence handling. This is evidence of prototype behaviour, not production readiness or a live integration audit.

The current prototype supports manual preparation, field review, saved coordination and handoff preparation using fictional data. The live intake, provider connection, system update and operational monitoring stages remain to be implemented and tested.

Platform links are shortcuts, not data connections. A readiness checkbox records planning progress; it does not prove that access works. Assignee names are labels, not invitations or shared access. A completed checklist records a person's assertions; it does not independently verify compliance or hiring suitability.

The helper that finds skill phrases uses fixed matching rules. There is no live generative AI assistant or enrichment provider running in this version. Adding one is a separate decision based on need, evidence quality, permitted data use and cost.

**Scope recommendation:** prove one useful enrichment journey first. Avoid asking consultants to maintain a second version of their whole recruitment pipeline in this workspace.

<!-- pagebreak -->

## Information and decisions needed from PRG

The following is a request list for the project team. Suggested owners are roles to nominate, not people already assigned. Supply sensitive information through PRG-approved private channels; do not put it in GitHub issues, repository files or ordinary chat messages.

| Requested item | What a useful answer contains | Suggested owner |
|---|---|---|
| Pilot purpose and boundary | One desk or cohort, record type, fields to improve, exclusions and intended business result. | Sponsor and desk lead |
| Record and field definitions | System of record, stable IDs, exact field names, allowed values, custom fields and duplicate rules. | ATS owner |
| Review rules | Approved sources, freshness rules, who may approve, conflict handling and fields that must never be inferred. | Process owner and reviewer |
| Existing capabilities | Current modules and licences, enabled native integrations, limits, field coverage and configuration owner. | Tool owners |
| Safe access for testing | Approved sandbox or test tenant, test accounts, least-privilege access and a secure credential setup route. | IT and platform owners |
| Example inputs and outputs | Fictional or approved redacted examples of a current record, source evidence, expected update and failure case. | Desk lead and ATS owner |
| Data handling approval | Approved hosting and providers, permitted data, retention and deletion rules, access roles and incident contact. | IT and privacy owner |
| Handoff requirements | Receiving role, necessary fields, approved event trigger, permitted recipients and exception handling. | Operations and process owner |
| Costs and baseline | Relevant invoices, contract limits and renewals, usage, task frequency and observed manual effort. | Finance and desk lead |
| Acceptance and ownership | Agreed quality and cost thresholds, rollout approver, support owner and escalation process. | Sponsor and IT |

## The minimum starting pack

For the first connection, the project needs a written pilot boundary, an ATS contact, an approved testing route, a field map, fictional or approved test examples, and named reviewers. An API is a controlled way for systems to exchange data; permission to use a website does not necessarily include API access.

Actual passwords, API keys, candidate records, private system links, contracts and invoices should stay in approved private systems. This public document lists what is needed without disclosing those details.

**Recommended first access:** a narrowly scoped, read-only connection. This lets the team verify record matching and field interpretation before enabling updates.

<!-- pagebreak -->

## Remaining delivery stages

The sequence below is proposed. Dates and effort estimates should be agreed after access, scope and vendor constraints are known. Progress should be reported against working evidence rather than an unsupported percentage complete.

| Stage | Work to complete | Evidence needed before moving on |
|---|---|---|
| 1 Agree the pilot | Confirm the starting pack and compare existing-tool capability with the gap. | Written scope, owners, data approval and test access. |
| 2 Connect for reading | Map IDs and fields; show where information came from and when it was refreshed. | Correct matching on agreed test records; visible access and sync failures. |
| 3 Prepare and review | Connect one approved source or existing capability to suggested changes. | Traceable suggestions; held conflicts; measured reviewer effort. |
| 4 Test controlled updates | Apply approved changes in a sandbox with current-value checks, duplicate protection and correction procedures. | Successful updates, blocked conflicting updates, audit trail and recovery tests. |
| 5 Run a small live pilot | Use an approved cohort with supervision and a clear stop condition. | Agreed quality, usefulness, effort and cost results, including failed attempts. |
| 6 Hand over and expand | Document support, permissions, monitoring, training and any further integrations. | Named operating owner, runbook, recovery exercise and sponsor sign-off. |

## Improvements that would make adoption easier

Prioritise a short guided first run, clearer save indicators, warnings before losing unsaved input, a readable handoff report and automatic linking when a case starts from an enrichment record. Add saved views for pending reviews and overdue work, followed by controlled case archiving and reopening.

Shared assignments, notifications and live sync status need further implementation. They should reflect the agreed operating model rather than appear connected before they are ready.

## What fully functional must mean before rollout

A normal case must complete from intake to a verified update. An exception case must stop safely and show the owner what to do. The team must also demonstrate correct permissions, current-value checks, no duplicate updates, source traceability, recovery from a failed connection and clear support ownership.

The sponsor should approve measurable quality and cost thresholds before the pilot. No arbitrary accuracy target or delivery date is committed by this document.

<!-- pagebreak -->

## How progress and value will be reported

Each update should state what changed, what evidence supports it, what remains blocked, which decision is needed and the next checkable milestone. Separate a feature being built from it being tested in a sandbox, trialled with approved live data and accepted for ongoing use.

| Measure | Plain English meaning | Why it matters |
|---|---|---|
| Useful coverage | Records receiving a useful verified update divided by records attempted. | Avoids counting empty or irrelevant results as success. |
| Audited accuracy | Correct suggested fields divided by suggested fields independently checked. | Shows quality. Zero audited fields means unknown accuracy. |
| Review effort | Total checking, correction and rework time. | Prevents reporting gross automation time as the net benefit. |
| Cost per useful record | Total pilot cost divided by records with useful verified updates. | Includes failed attempts and support effort. |
| Update reliability | Approved updates applied correctly, with failed or duplicate attempts tracked. | Becomes meaningful once live updates are implemented. |
| Net business effect | Avoidable cash cost and time released, reported separately. | Staff capacity is not automatically a payroll saving. |

## Cost reduction decisions

Reuse included capabilities and process only useful records and fields. Compare native integrations before adding subscriptions or custom connections. Check usage, contracts and downstream dependencies before cancelling a tool.

Actual savings are not established. Measure manual and assisted effort, provider usage, support, transition costs and genuinely removable spend. Report negative results as well as positive ones.

## Decisions requested at the next stakeholder meeting

1. Select one pilot use case and the fields it will cover.
2. Nominate the sponsor, ATS owner, reviewer and support contact.
3. Agree the approved test environment and data handling route.
4. Confirm whether existing capabilities can cover the proposed pilot.
5. Agree acceptance measures and the evidence required for a live rollout decision.

**Instructions:** Read the [user guide](USER_GUIDE.md), then complete the [implementation checklist](IMPLEMENTATION_CHECKLIST.md) in a private working copy. This editable Markdown brief also has a [printable PDF](PRG_Stakeholder_Progress.pdf).

**Repository boundary:** Public code remains the earlier portfolio version. The current workbench source and operational configuration are private. Site access is separate from repository access.
