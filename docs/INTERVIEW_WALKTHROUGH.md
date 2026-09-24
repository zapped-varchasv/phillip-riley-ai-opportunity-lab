# Five-minute interview walkthrough

## Opening — 30 seconds

“I built a small, independent prototype to show how I would approach this placement. I started with your public services and the role brief. My first recommendation is to understand the work and check what your current tools can already do. The examples are fictional, and I have not assumed access to your systems or measured any PRG savings.”

## Show the advert workflow — 60 seconds

Open **Trial studio → Brief to advert**. Run the BESS example. Expand source evidence, tick the review checkbox, mark it reviewed and export the brief.

“This shows the operating pattern: approved input, visible evidence and human review. The important question is whether this removes rework in the actual recruiter workflow.”

Switch to the wind example and run it. Salary is missing and release is blocked.

“A useful assistant should show me the gap rather than inventing a plausible answer. I would compare this against the current advert assistant and JobAdder features before building anything else.”

## Show the control — 45 seconds

Open **Candidate care** and choose **permission absent**. Run the checks.

“This is a deliberate failure case. No candidate message is prepared. The purpose is to make ownership and release conditions visible, not to automate contact.”

If time permits, open **Client pulse**, generate the brief, then change interviews to more than the submitted count. The model holds the result because the cohort is inconsistent.

## Show prioritisation — 45 seconds

Open **Opportunity register**. Search “tool” or filter by Operations. Expand **Why**.

“I would bring a starting set of hypotheses, then score them with process owners. These provisional scores are explainable, and the success measures tell us how to evaluate each trial.”

## Challenge the economics — 60 seconds

Open **Business case**. Point out the AUD assumptions and the distinction between capacity value and cash savings. Increase review time from 3 to 12 minutes.

“If review work absorbs the saving, the case deteriorates. That is why I would time the complete task. These four options are alternatives for the same workflow, not four benefits to add together.”

Expand an option’s assumptions and change its software or support cost. Reset when finished.

## Close with delivery — 40 seconds

Open **Delivery roadmap**.

“I would spend the first two weeks observing teams, mapping handovers and reviewing paid, configured and used capabilities. Then I would agree two or three small trials with the supervisor. Handover starts immediately: named owners, versioned examples, test evidence and a colleague who can rerun the workflow.”

## Questions to ask

- Which two recurring tasks do recruiters or support staff most want to stop repeating?
- Which existing assistant has been most useful, and where does its output still need rework?
- Who owns the process and can verify whether a trial creates value?
- Which capabilities are included in your current contracts but not yet used consistently?
- What would make the final handover genuinely useful for the team after 12 weeks?

## Be precise if asked

**Is this live AI?** “No. This version uses deterministic templates and validation so the workflow is repeatable. I would evaluate an approved model or an existing product with the same inputs and quality criteria.”

**Why did you build it if the recommendation is existing tools first?** “The prototype makes requirements and controls tangible. It is a conversation and evaluation aid, not evidence that a custom production system should be funded.”

**How much will it save?** “I cannot claim a PRG saving before measuring. The model shows assumptions and includes review, adoption, setup, training and support.”

**Can it connect to JobAdder?** “There is no connection here. First I would confirm entitlements, approved access, API or connector capability, record permissions and an owner. Any first integration trial should use approved read-only or supervised access.”

**Did you build this without assistance?** Describe your actual process truthfully: AI-assisted research and implementation, plus your own review, understanding and presentation. Do not imply independent engineering experience you cannot demonstrate. Be ready to explain the three layers: scenario data, calculation/validation engine, and interface.

## Before the interview

1. Download the repository and open `dist/index.html` locally as the backup.
2. Practise the flow twice and keep this guide open in a second window.
3. Test screen sharing, camera and audio on the platform you have arranged.
4. Keep the demo synthetic. Do not paste real candidate or client information.
5. Use the incomplete brief or permission hold to demonstrate judgment, then finish on the roadmap.
