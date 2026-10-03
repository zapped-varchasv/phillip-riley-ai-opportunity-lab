# PRG One Workspace user guide

Instructions for the current private prototype as at 3 October 2026. Start with fictional data. The workspace saves cases, reviews and notes, but it does not synchronise live systems or send messages.

## Choose the right version

- **Current private workspace:** [Open PRG One Workspace](https://prg-opportunity-lab-varchasv.varchasvgupta0808.chatgpt.site). Sign in with an authorised account. Having the URL does not grant access; access is currently restricted to the owner.
- **Public repository code:** the earlier portfolio application. Cloning this repository runs that earlier version, not the current private workbench.
- **Current progress and requests:** [Stakeholder progress brief](STAKEHOLDER_PROGRESS.md) and [implementation checklist](IMPLEMENTATION_CHECKLIST.md).

## A first demonstration

This sequence uses fictional examples and does not need a paid provider connection.

1. Open **Overview**. Notice the saved-case and pending-review counts. These are workspace figures, not live business performance.
2. Open **Enrichment review** and choose **Load demonstration**. This saves fictional records with different evidence situations. Loading again does not overwrite existing demo IDs.
3. Open **Work board** and choose **Load examples**. Open **Demo · Grid connection engineer**.
4. Choose **Edit details**. Set a demonstration due date and select **Alex Morgan · DEMO-C001** as the linked enrichment record. Save the details. Only matching records owned by your account are available.
5. In **Next action**, review the fictional brief checkpoints. Add a reference such as “Synthetic brief reviewed for demonstration.” Choose **Save checkpoints** to keep partial progress or **Complete stage** when all checkpoints and the evidence reference are present.
6. Open the case's **Enrichment** tab. Compare a current value, proposed value and supporting excerpt. Use **Accept field**, **Hold** or **Reject** as appropriate. An owner or reviewer can decide; an author prepares evidence.
7. Open **Notes & activity**. Select a source platform if relevant, enter a clearly fictional outcome and next action, then save the note.
8. Open **Handoff**. Inspect the progress and evidence summary. Download the handoff packet or message draft. An incomplete workflow stays marked in progress, and nothing is sent externally.

The source checks detect some missing or inconsistent evidence. They do not prove the truth of an excerpt, identity, qualifications or suitability. A checkpoint is a recorded human assertion, not an automated compliance result.

## Create your own fictional case

Choose **New work item**, then complete:

| Field | What to enter |
|---|---|
| Case title | A short, recognisable description, such as “Demo — engineer record review.” |
| Workflow | Permanent candidate, contract candidate or client contact research. |
| Assignee label | Who would own the next action in the rehearsal. This does not invite or notify anyone. |
| Due date and priority | When attention is needed and whether the case should be prioritised. |
| Linked enrichment record | An existing record you own that matches the workflow. Leave blank if not prepared yet. |
| Context | What needs improving, why, and what the intended outcome is. |

Confirm the case details are fictional and save. Work items and platform settings are private to the signed-in account. Team assignment and shared work-item access are not implemented.

## Make a field decision

Inspect the **current value**, **proposed value**, **source excerpt**, **source reference**, **source date**, **identity confirmation** and any conflict warning.

- **Accept:** the evidence supports the specific change and you have checked its meaning.
- **Hold:** something is missing or needs clarification. Record the reason and the next action.
- **Reject:** the proposed value should not be used. Record why.

If the evidence is wrong, correct it through **Edit evidence**. Saving an evidence edit resets all field approvals on that record. Changing the case's linked record resets its capture/enrichment and later checkpoints. Always recheck the current field decisions before a handoff.

**Export approved fields** creates a manual review packet containing approved fields that still pass the evidence checks. It does not update JobAdder and is not a vendor-ready import file. The case's separate **Download handoff packet** exports case progress, evidence and history. **Download message draft** creates a text summary for a person to review.

## Find tools without losing the case

Use **Platform hub** to search by name or capability. Open **View workflow & setup** to see the platform's distinct purpose, how it fits the work and the connection prerequisites.

Save a normal HTTPS workspace URL on an allowed vendor domain, add a system owner and notes, and choose **Pin to overview** for frequently used tools. Do not enter credentials, authentication links or sensitive configuration in these fields. The readiness checklist records planning only. “Not connected” remains true even if every readiness box is ticked.

Within a case, the tools relevant to its current stage appear beside the next action. A configured link opens the platform in a separate tab; an unconfigured tool opens its setup details. This is navigation, not data synchronisation.

Press **Ctrl K** on Windows or **Cmd K** on Mac to search pages, cases, enrichment records and platforms. The top search button does the same thing.

## Record costs and pilot results

Use **Cost review** to compare genuinely removable spend with replacement, provider, support and transition costs. Enter measured or evidenced figures and label assumptions. The example button loads an illustration; those figures are not company results.

Use **Pilot results** to save aggregate observations. Include failed attempts and all review/rework time. No audited fields means accuracy is unknown. Keep time released separate from cash saved.

Use **Sources & decisions** to record unresolved questions, decisions and their basis. Keep confidential answers in an approved private system; never use the public GitHub repository as the project's operational data store.

## Practical habits

- Keep one case focused on a specific record review or handoff, rather than duplicating the whole ATS pipeline.
- Work from **Overview → Next up** or a filtered **Work board**.
- Save explicitly before leaving a form. There is no general autosave or guaranteed recovery of unsaved text.
- Enter a useful reference and outcome instead of pasting large documents into notes.
- Review stale, conflicting and held fields before exporting.
- Treat the original recruitment systems and approved procedures as authoritative.

## When something does not work

| What you see | What it means and what to do |
|---|---|
| Access denied or sign-in required | The Site is private. Use an authorised account; the repository link does not confer permission. |
| No cases or records | Your account may have no saved work. Load the fictional examples or create a case. |
| A record is missing from the link selector | It must belong to your account and match the selected workflow. |
| Cannot complete a stage | Save every required checkpoint and a nonempty evidence reference. Do not invent evidence to proceed. |
| Cannot accept a field | Check reviewer permissions and the displayed evidence warnings. Hold it while the issue is resolved. |
| “This item changed” | Another save advanced the version. Preserve unsaved text separately, reload and review the latest values before retrying. |
| Workspace URL rejected | Use a normal HTTPS link on the listed domain, without user-info, authentication parameters or a fragment. |
| Platform still says “Not connected” | Expected. Saving a shortcut or readiness checklist does not create an integration. |

## Current limits

No live ATS intake or writeback, provider enrichment, live generative AI, external sending, shared assignments, automated reminders or background sync is enabled. There is no case archive/reopen control yet. Work lists are limited to the latest 200 cases; enrichment and study lists each show up to 500 entries. This is a small-pilot prototype, not a production operations system.

The retained technical setup guide applies only to the earlier public application. Follow the current stakeholder brief and implementation checklist for project plans and delivery requirements.
