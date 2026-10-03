# Work-email sign-in

## Current status

The application supports Cloudflare Access authentication and has a dedicated [work-email sign-in page](https://prg-workspace.prg-team.workers.dev/signin). Live email-code delivery is **not activated yet**. Cloudflare account activation and company email access settings are still required. The page shows this explicitly and does not collect credentials while setup is pending.

## How employees will sign in

1. Choose **Sign in with work email** in the workspace.
2. Choose **Continue with work email**, then enter your approved work email on Cloudflare's secure sign-in screen.
3. Open your inbox and enter the one-time code on that screen. No new password is needed.
4. Return to the workspace to save cases, reviews and measurements. Your account starts as a staff member; reviewer access is assigned by the administrator.
5. Choose **Sign out** when you finish on a shared computer. If a session expires, sign in again before saving; do not close a form containing unsaved work.

If the code does not arrive, check spam and confirm that you entered your work address. If access is denied, contact the workspace administrator. A personal email, a similar-looking company domain or an unapproved subdomain does not qualify.

## Administrator activation

1. The Cloudflare account owner completes Zero Trust activation. The current checkout requires billing details and authorisation for possible usage charges, even though it shows $0 due today. This must be completed by the account owner.
2. Enable **One-time PIN** as an Access login method. Cloudflare delivers the codes; this app does not store passwords or send its own codes.
3. Create **one** self-hosted Access application with both public-hostname paths `prg-workspace.prg-team.workers.dev/api/*` and `prg-workspace.prg-team.workers.dev/auth/*`. Using one application gives both paths the same audience. Keep `/signin` and the public guidance outside that application. Do not use separate audiences for the two paths.
4. Set an Allow policy for the approved email domain, or an explicit list of pilot staff. Do not add an unrestricted Everyone or One-time PIN Include rule: that would allow other email addresses. Set a suitable session length, initially eight hours. Keep default denial for others.
5. In the Worker's runtime variables, set the following. These are runtime settings, not build variables. Never commit actual staff email lists to this public repository.

| Setting | Purpose |
| --- | --- |
| `ACCESS_ISSUER` | Exact team URL, such as `https://your-team.cloudflareaccess.com`, with no trailing slash |
| `ACCESS_AUDIENCE` | Application audience (AUD) tag from the single Access application |
| `STAFF_EMAIL_DOMAINS` | Comma-separated approved domains, without `@` or wildcard; exact domain matching |
| `STAFF_EMAILS` | Optional comma-separated approved individual emails for a restricted pilot |
| `OWNER_EMAIL` | First administrator's verified email; it must also satisfy the allowed domain/email policy |

`STAFF_EMAIL_DOMAINS` and `STAFF_EMAILS` are alternatives joined by OR. For an individual-only pilot, leave domains unset. At least one valid list is required; missing or malformed configuration locks staff APIs. Match the Cloudflare policy to these app settings. To remove access, update both where applicable. The owner setting alone never bypasses the staff allowlist.

6. Save the runtime settings and deploy. The deployment uses `keep_vars` to retain dashboard settings on later GitHub builds.
7. Validate with an approved work inbox: receive a code, sign in, create a fictional case, reload and confirm persistence, then sign out. Check that a second member cannot read the first member's private cases and that ordinary members cannot grant reviewer roles. Test that an unapproved address cannot enter. Only mark sign-in live after these checks succeed.

## What authentication does and does not enable

Verified sign-in identifies the staff member and unlocks the existing saved workspace. It does not connect JobAdder, ROI-AI, email accounts or other company systems. Those integrations need separate approval and setup. Existing records on the previous host are not migrated by signing in here.

The server validates token signature, issuer, audience and expiry, checks the approved email policy on every staff request, and ignores caller-supplied identity headers. Administrator authority comes from the configured owner email. Session management, email-code delivery and Access policy enforcement are handled by Cloudflare.

References: [Cloudflare email one-time PIN](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/one-time-pin/), [Access for Workers](https://developers.cloudflare.com/workers/configuration/cloudflare-access/).
