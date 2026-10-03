# PRG One Workspace implementation checklist

Blank planning template as at 3 October 2026. Copy this into an approved private project space before filling it in. **Do not post credentials, candidate information, private links, contracts or internal configuration to this public repository.** Suggested owners and dates below are intentionally unassigned.

## Pilot agreement

| Decision | Answer to record privately | Owner | Status |
|---|---|---|---|
| Business purpose | What task will improve and for whom? | To nominate | Open |
| Scope | Record type, desk/cohort, allowed fields and exclusions. | To nominate | Open |
| Success measures | Quality, useful coverage, effort and cost thresholds. | To nominate | Open |
| Stop conditions | What errors or risks pause the pilot, and who decides? | To nominate | Open |
| Approval | Who approves testing, live data use and rollout separately? | To nominate | Open |

## Access and integration preparation

- [ ] Confirm the authoritative system and system owner.
- [ ] Compare existing licensed capability against the gap before commissioning a new connection.
- [ ] Establish approved hosting, provider and data handling requirements.
- [ ] Obtain a sandbox or other explicitly approved testing environment.
- [ ] Arrange scoped access through an approved secret-management route; do not email or commit keys.
- [ ] Supply stable record identifiers, field names, allowed values and a small set of safe test examples.
- [ ] Agree source permissions, freshness, review authority and overwrite/conflict rules.
- [ ] Define read/write scopes, event triggers, record volumes and vendor limits.
- [ ] Document how duplicates, stale records, failed requests and revoked access should be handled.
- [ ] Name a receiving owner and support contact for every proposed handoff.

## Evidence before live updates

| Check | Expected evidence | Result |
|---|---|---|
| Identity and mapping | Each test record maps to the correct ID and field. | Not yet recorded |
| Evidence quality | Every proposed value can be traced to a permitted source and date. | Not yet recorded |
| Reviewer authority | Only authorised users can approve or release an update. | Not yet recorded |
| Concurrent changes | A changed source-system value is detected before overwrite. | Not yet recorded |
| Duplicate prevention | Repeated events or retries do not create repeated updates. | Not yet recorded |
| Failure visibility | Failed or delayed updates have a clear status and owner. | Not yet recorded |
| Correction and recovery | An incorrect update and a lost connection can be handled using the agreed runbook. | Not yet recorded |
| Live pilot result | Agreed quality, usefulness, effort and total-cost measures are met. | Not yet recorded |
| Operating ownership | Training, monitoring, support, retention and access reviews are assigned. | Not yet recorded |

These are future live-integration acceptance checks. Existing prototype tests do not count as evidence that a real vendor connection meets them.

## Business case inputs

Collect the relevant spend and contractual commitments, current usage, renewal dates, task frequency, manual time, assisted time including review/rework, provider usage, implementation cost and ongoing support cost. Record the source and date for each value. Distinguish a measured observation from an assumption.

Report separately:

- **Cash effect:** genuinely avoidable spend less new recurring and transition costs.
- **Capacity effect:** time released or added after review and correction.
- **Quality effect:** useful verified updates and audited correctness.

## Suggested ownership

The sponsor approves scope and business acceptance. The desk lead defines the actual work and baseline. The ATS/platform owner confirms mappings and access. A reviewer checks field evidence. IT and the privacy owner approve data handling and operating controls. Finance validates cash assumptions. A named support owner maintains the connection after handover. One person may hold several roles, but each responsibility needs an explicit owner.

## Reusable progress update

Copy the following into the private status report for each agreed review meeting:

**Reporting date:** To enter  
**Current stage:** Prototype / sandbox connection / supervised live pilot / accepted operation  
**Completed since last update:** What changed and where the evidence is held  
**Measured result:** Observations, denominators and limits; otherwise state not measured  
**Outstanding dependency:** What is needed, from whom, and the agreed response date  
**Decision requested:** Specific decision and its effect on the next stage  
**Next milestone:** One outcome that can be demonstrated  
**Owner:** To nominate

Advance a stage only when its evidence is available. Do not describe a shortcut as an integration or a synthetic demonstration as a live pilot.
