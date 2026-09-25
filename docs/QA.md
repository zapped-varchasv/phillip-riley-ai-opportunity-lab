# Verification record

Checked on 25 September 2026 in the local Windows workspace.

## Automated checks

`npm run check` passed for frontend, Worker and local/build scripts. `npm run build` produced the Worker, client assets and schema migration package. The production dependency audit found zero vulnerabilities.

The original **11 engine tests** cover required brief fields, contact permission, status, pipeline integrity and commercial arithmetic. **14 backend tests** additionally cover identity, cross-site requests, cross-user access, role assignment, approval lifecycle, stale writes, server recalculation, private measurements and scenarios, persistence after reopening SQL, AI configuration, authorised context, quotas and provider credit-exhaustion errors.

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

## Saved workspace verification

In Chrome on the local server, an author saved and submitted a synthetic BESS draft. Refresh preserved the submission. A separate simulated reviewer approved it; history showed both actors and all three versions. Saved business-case assumptions reopened, a priority review saved, and a labelled synthetic measurement persisted with a correctly calculated 40% reduction (10 to 6 minutes). These are test fixtures, not observed PRG results.

A browser check caught a number-input step mismatch in the trial form; it was fixed and the observation then saved successfully. The API key was securely provisioned locally. A real OpenAI request returned HTTP 429 with `credit_balance_exhausted` and `insufficient_quota`. This proves the request reached the provider, not that generation or model quality was verified. Successful-response tests use an explicitly mocked transport.

## Limits of this verification

This is a functional check of a synthetic portfolio app, not an independent security, accessibility, fairness or production-readiness audit. No PRG integration, successful live language-model evaluation, operational pilot or PRG user acceptance test has occurred. The offline checkbox is illustrative; saved approvals have tested backend permission/version checks. Hosted runtime validation is distinct from local SQLite testing.

Development dependency audit: four moderate advisories remain in the Drizzle Kit → esbuild development-only chain (GHSA-67mh-4wv8-2f99). The affected esbuild web server is not used or deployed. The runtime dependency audit is clean; do not run an exposed esbuild development server.
