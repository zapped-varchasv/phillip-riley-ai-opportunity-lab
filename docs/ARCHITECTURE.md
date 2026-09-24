# How the project works

The app is deliberately small and inspectable. It runs entirely in the browser, with no server-side application, database, external model call, analytics or secret key.

```mermaid
flowchart LR
  A[Fictional scenario fields] --> B[Rules and template engine]
  B --> C[Draft and missing-field checks]
  C --> D[Human review in the interface]
  D --> E[Local Markdown download]
  F[Editable planning assumptions] --> G[Cost and capacity calculations]
  G --> H[Four-option comparison]
```

## Code responsibilities

| File | Responsibility |
|---|---|
| `dist/data.js` | Fictional fixtures, 16 opportunity hypotheses, starting cost inputs |
| `dist/engine.js` | Pure functions for trial checks, weighted priority score and commercial arithmetic |
| `dist/app.js` | Page rendering, forms, ephemeral state, review acknowledgement and export |
| `dist/styles.css` | Responsive navy/green interface, keyboard focus and print layout |
| `scripts/serve.cjs` | Optional local static server; no data-processing endpoint |
| `tests/engine.test.cjs` | Business-rule and arithmetic regression checks |

`data.js` and `engine.js` expose browser globals and CommonJS exports so the same business functions can be tested with Node without a build or dependency installation. User-entered values are HTML-escaped before rendering. Downloads use browser Blob URLs.

## State and trust boundaries

Inputs and session activity live in memory. Refresh resets them. Exporting explicitly creates a local file; it does not email, upload or update a record. Evidence labels identify synthetic fixtures, not authenticated operational documents. The session activity list is useful for demonstration, not immutable audit evidence.

The review checkbox is a UX control only. A person with browser developer tools could bypass it. It must never be treated as a production security or authorisation mechanism.

## What a future approved integration might require

| Component | Proposed requirement | Status here |
|---|---|---|
| Recruitment system | Confirm licensed functionality first; then approved scoped/read-only access where needed | No connection |
| Communication | Trusted permission/status records; draft-only outputs; human approval | Fictional input field only |
| AI provider | Approved account, contractual/privacy review, scoped data, controlled prompts and structured output checks | No model calls |
| Knowledge | Approved source repository with permissions, citations, freshness and refusal when evidence is absent | Not implemented |
| Automation | Record identity, deduplication, retries, rate limits, approval state and failure handling | Not implemented |
| Audit | Server-side actor identity, input/version provenance and immutable release events | In-memory demonstration only |
| Deployment | Authentication, access control, secrets management, monitoring, retention and support ownership | Static portfolio hosting only |

The first live connection should follow PRG approval and the scope agreed with the supervisor. A proposed architecture is not evidence that a particular vendor API, plan or permission is available.

## Commercial arithmetic

Priority score = 20 × (0.35 × impact + 0.25 × feasibility + 0.20 × adoption + 0.20 × (6 − risk)). All rubric dimensions are 1–5; risk increases with exposure.

Annual hours = people × tasks per week × working weeks × max(0, gross minutes saved − review minutes) ÷ 60 × adoption fraction.

Year-one cost = setup + training + 12 × (monthly software + monthly support).

Three-year cost = setup + training + 36 × (monthly software + monthly support).

Payback months = upfront costs ÷ ((annual capacity value − annual recurring cost) ÷ 12), only when the denominator is positive. This is a capacity-based planning measure, not a cash-flow forecast.

No price claims are made for named vendors. Costs are illustrative incremental planning assumptions in AUD; no tax, inflation, finance cost, implementation delay, adoption ramp or revenue benefit is included.
