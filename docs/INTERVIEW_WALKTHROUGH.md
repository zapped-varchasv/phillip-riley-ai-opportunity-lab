# Five-minute interview walkthrough

## Understand the project before presenting

**In one sentence:** “This project shows how Phillip Riley could reduce repetitive recruitment administration, keep people in control of the output, and decide whether the benefit justifies the cost.”

| Everyday task | What the demo does | Potential value to test |
|---|---|---|
| Write a job advertisement | Turns a fictional role brief into a draft and flags missing details, such as salary | Less drafting time and fewer incomplete adverts |
| Update a candidate | Prepares a message from the recorded status; holds the workflow when contact permission is missing | Faster, more consistent communication |
| Update a client | Turns fictional recruitment progress numbers into a brief with a blocker and next action | Less reporting work and clearer client updates |

A person checks the draft before approving a local download. Nothing is sent to a candidate or client, and no company record changes. The demo uses fixed templates and rules; it does not call a live AI model.

The wider project lists 16 possible improvements, compares four ways to deliver them, and sets out a 12-week discovery, trial and handover plan. Its purpose is to help staff and management evaluate useful changes before committing to them.

**Why it fits the role:** the supplied brief asks for 10–20 ranked opportunities, two or three controlled trials, a review of current tools and assistants, four commercial options, and a practical roadmap. This project demonstrates that approach. The workflow assumptions still need validation with PRG staff. Job-ad assistance is an example of reviewing and improving existing work; candidate care and client reporting are additional hypotheses to investigate.

The timed sections below form the five-minute presentation. The calculation notes and questions afterwards are for preparation and follow-up discussion.

## Opening — 30 seconds

“I built a small prototype to explore how recruiters could spend less time writing adverts, preparing candidate updates and reporting to clients. I used your public services and the role brief as a starting point. The examples are fictional. I would begin by observing your teams and checking existing capabilities before deciding which ideas deserve a trial.”

## Show the advert workflow — 60 seconds

Open **Trial studio → Brief to advert**. Run the BESS example. Expand source evidence, tick the review checkbox, mark it reviewed and export the brief.

“This shows the operating pattern: approved input, visible evidence and human review. The important question is whether this removes rework in the actual recruiter workflow.”

Switch to the wind example and run it. Salary is missing and release is blocked.

“A useful assistant should show me the gap rather than inventing a plausible answer. I would compare this against the current advert assistant and JobAdder features before building anything else.”

## Show the control — 45 seconds

Open **Candidate care** and choose **permission absent**. Run the checks.

“This is a deliberate failure case. No candidate message is prepared. The purpose is to make ownership and release conditions visible, not to automate contact.”

If time permits, open **Client pulse**, generate the brief, then change interviews to more than the submitted count. The validation rules hold the result because the counts are inconsistent.

## Show prioritisation — 45 seconds

Open **Opportunity register**. Search “tool” or filter by Operations. Expand **Why**.

“I would bring a starting set of hypotheses, then score them with process owners. These provisional scores are explainable, and the success measures tell us how to evaluate each trial.”

## Challenge the economics — 60 seconds

Open **Business case** and show the starting figures for **A. Use existing tools**.

“In an illustrative ten-person team, this scenario releases about 322 hours a year. At an assumed AUD 65 an hour, that is about AUD 20,930 of staff-time value. After AUD 5,400 of assumed first-year costs, the net capacity value is about AUD 15,530. These are planning assumptions, not measured PRG savings or vendor quotes.”

Increase **Review minutes / task** from 3 to 12. The existing-tools option now shows no time benefit and negative AUD 5,400 first-year net value.

“If checking the output takes longer than the time saved, the case disappears. I would measure the complete task, including corrections and review. The immediate benefit is staff time available for clients and candidates; cash savings need an actual reduction in expenditure.”

Click **Reset assumptions** before moving on. If asked, explain that the four options are alternatives for the same workflow and their benefits must not be added together.

## Close with delivery — 40 seconds

Open **Delivery roadmap**.

“I would spend the first two weeks observing teams, mapping handovers and reviewing paid, configured and used capabilities. Then I would agree two or three small trials with the supervisor. Handover starts immediately: named owners, versioned examples, test evidence and a colleague who can rerun the workflow.”

## Savings calculation to keep ready

All amounts below are **AUD**. The example models one comparable workflow across a team; it is not a combined claim for all three demos.

| Starting assumption | Value |
|---|---:|
| Team members | 10 |
| Tasks per person per week | 8 |
| Gross time saved per task | 10 minutes |
| Human review per task | 3 minutes |
| Adoption across eligible tasks | 75% |
| Working weeks per year | 46 |
| Loaded hourly staff-time value | AUD 65 |

“Loaded hourly value” means an assumed value for an hour of staff time, including employment costs. It is not a quoted PRG salary or client billing rate.

The arithmetic is:

- **Per person each week:** 8 tasks × (10 − 3) minutes × 75% = **42 minutes**.
- **Across the team each year:** 42 minutes × 10 people × 46 weeks ÷ 60 = **322 hours**.
- **Annual staff-time value:** 322 hours × AUD 65 = **AUD 20,930**.
- **Year-one assumed cost:** AUD 1,800 setup + AUD 600 training + 12 × (AUD 150 software + AUD 100 support) = **AUD 5,400**.
- **Year-one net capacity value:** AUD 20,930 − AUD 5,400 = **AUD 15,530**.

The costs are illustrative incremental inputs for the existing-tools option. They do not assert that a named vendor charges those amounts. Verify any additional fees and internal setup, training and support effort.

### What if the benefit is smaller?

Keep the same team size, task frequency, working weeks, hourly value and costs. Change only gross time saved and adoption:

| Scenario | Gross saving / task | Review / task | Adoption | Annual hours released | Annual staff-time value | Year-one net capacity value |
|---|---:|---:|---:|---:|---:|---:|
| Starting illustration | 10 min | 3 min | 75% | 322 | AUD 20,930 | AUD 15,530 |
| Conservative illustration | 5 min | 3 min | 50% | About 61 | About AUD 3,987 | About **−AUD 1,413** |

The conservative case does not cover the assumed first-year costs. These are scenarios, not forecasts or confidence bounds. The calculator assumes steady-state adoption and excludes implementation delays, tax, inflation and revenue uplift.

### What the saving actually means

Staff salaries generally continue to be paid. The immediate benefit is time available for client conversations, candidate support or other useful work. Cash savings would require evidence that expenditure falls, such as reduced paid overtime or a genuinely removable software cost. Additional revenue also needs evidence; it is not included in this calculation.

**Safe interview wording:** “The illustrative case suggests around 322 hours of annual capacity for a ten-person team. I would validate task volumes, review time, adoption and costs before claiming any PRG saving.”

## Questions to ask

- Which two recurring tasks do recruiters or support staff most want to stop repeating?
- Which existing assistant has been most useful, and where does its output still need rework?
- Who owns the process and can verify whether a trial creates value?
- Which capabilities are included in your current contracts but not yet used consistently?
- What would make the final handover genuinely useful for the team after 12 weeks?
- How often does the selected task occur, and how long does it take including checking and corrections?

## Be precise if asked

**Is this live AI?** “No. This version uses deterministic templates and validation so the workflow is repeatable. I would evaluate an approved model or an existing product with the same inputs and quality criteria.”

**Why did you build it if the recommendation is existing tools first?** “The prototype makes requirements and controls tangible. It is a conversation and evaluation aid, not evidence that a custom production system should be funded.”

**How much could it save?** “The starting illustration releases 322 team hours a year, worth AUD 20,930 at the assumed hourly rate. After AUD 5,400 in assumed first-year costs, that is AUD 15,530 of net capacity value. I would validate those inputs before claiming a PRG saving.”

**Does that mean AUD 15,530 more profit?** “No. It values staff time released after the assumed costs. It becomes a cash saving only if expenditure actually falls. Any additional revenue from using that time would need separate measurement.”

**What if the savings do not appear?** “Then I would revise or stop the trial. If review time absorbs the saving, adoption is low or costs are too high, the workflow may not justify investment.”

**Is this exactly how PRG works today?** “I have researched your public services and used the supplied role brief. These are relevant starting hypotheses. I would confirm the actual process, staff pain points and tool usage with your team.”

**Can it connect to JobAdder?** “There is no connection here. First I would confirm entitlements, approved access, API or connector capability, record permissions and an owner. Any first integration trial should use approved read-only or supervised access.”

**Did you build this without assistance?** Describe your actual process truthfully: AI-assisted research and implementation, plus your own review, understanding and presentation. Do not imply independent engineering experience you cannot demonstrate. Be ready to explain the three layers: scenario data, calculation/validation engine, and interface.

## Before the interview

1. Download the repository and open `dist/index.html` locally as the backup.
2. Practise the flow twice and keep this guide open in a second window.
3. Test screen sharing, camera and audio on the platform you have arranged.
4. Keep the demo synthetic. Do not paste real candidate or client information.
5. Use the incomplete brief or permission hold to demonstrate judgment, then finish on the roadmap.
