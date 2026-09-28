# Demo Script (for judges)

## 1. Open the website (30 s)

- Show the hero and one-line pitch.
- Scroll quickly through Problem → Features → Architecture.

## 2. Live interactive demo (2–3 min)

1. Click **“PaymentService returning 502s after latest deploy”**.
2. Watch the agent respond with similar incidents and step-by-step resolution.
3. Point out the **Retrieved Evidence** panel (similarity scores, post-mortem snippets).
4. Optionally try the database latency or canary prompts to show different memory matches.

## 3. Architecture & Microsoft integration (1 min)

- Walk the flow diagram: Alert → Hindsight Recall → Reflect → Teams → Retain.
- Highlight Azure OpenAI, Agent Framework + HindsightProvider, Teams, Monitor.

## 4. Impact & close (30 s)

- MTTR reduction, knowledge preservation, faster onboarding.
- “This is the institutional memory your SRE team has always needed.”

## Optional live Hindsight (if time / internet)

- Show Docker Hindsight running.
- Run `python data/seed-hindsight.py`.
- Call the backend stub `/incident` endpoint and show real recall.
