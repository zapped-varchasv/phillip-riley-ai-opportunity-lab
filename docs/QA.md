# Verification record

Checked on 25 September 2026 in the local Windows workspace.

## Automated checks

`npm run check` passed for all three JavaScript source files.

`npm test` passed **11 tests** covering required brief fields, absent contact permission, unknown candidate status, invalid pipeline counts, zero cohorts, an independently calculated cost baseline, review overhead, zero adoption/users/hourly value, opportunity data consistency and changed source fields.

The Windows sandbox initially prevented the Node test runner from spawning (`EPERM`). Running the same checks with the required process permission completed successfully; this was an environment restriction, not a failing business assertion.

## Browser acceptance checks

Verified in Chrome against the local static server:

- Overview renders with the included official logo and project disclosure.
- A complete role brief produces an inspectable draft.
- Review acknowledgement enables the reviewed export.
- The missing-salary scenario blocks review and release.
- Absent contact permission produces a hold instead of a candidate message.
- A valid pipeline produces the expected 42% screened-to-submitted figure.
- An interview count greater than submissions produces a validation hold.
- Searching “tool” filters the register to one result; its reason expands.
- Increasing review time to 20 minutes removes the existing-tool benefit and shows negative AUD 5,400 year-one net capacity value.
- Reset restores the default AUD 15,530 year-one net capacity value.
- Options-paper and reviewed-brief exports download as local Markdown files.
- Editing a reviewed input invalidates the old output and review state.
- No browser console errors were recorded during the checked workflows.
- Desktop layout was visually inspected. At 390px mobile width the logo loaded, the layout stacked and the document did not overflow horizontally; navigation scrolls within its own bar.

## Limits of this verification

This is a functional and visual check of a synthetic portfolio app, not a security, accessibility, fairness or production-readiness audit. No live integration, language-model quality evaluation, operational pilot or PRG user acceptance test has occurred. No claim is made that a front-end review checkbox enforces production access control.
