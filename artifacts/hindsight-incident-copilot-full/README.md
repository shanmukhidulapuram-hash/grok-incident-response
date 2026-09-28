# Hindsight Incident Copilot

> **Microsoft Hackathon Project**  
> An AI Incident Response Agent that remembers how your organization solved problems before — and uses that knowledge to help engineers resolve today's production incidents faster.

**Powered by:** [Hindsight](https://hindsight.vectorize.io/) (vectorize-io) + Microsoft Azure OpenAI + Microsoft Agent Framework

---

## One-line Pitch

> “An AI Incident Response Agent that remembers how your organization solved problems before — and uses that knowledge to help engineers resolve today's production incidents faster.”

---

## Quick Start (Demo Website)

```bash
cd website
# Open in browser, or:
python3 -m http.server 8080
# → http://localhost:8080
```

The website is a fully interactive front-end demo with simulated Hindsight memory responses. No backend required to try it.

---

## Project Structure

```
hindsight-incident-copilot-full/
├── website/                 # Polished demo website (open index.html)
│   ├── index.html
│   └── README.md
├── data/                    # Sample incidents, post-mortems, runbooks
│   ├── sample-incidents.json
│   └── seed-hindsight.py    # Script to retain samples into Hindsight
├── backend-stub/            # Example FastAPI + Hindsight integration
│   ├── main.py
│   ├── requirements.txt
│   └── README.md
├── docs/
│   ├── architecture.md
│   ├── demo-script.md
│   └── pitch.md
├── scripts/
│   └── start-hindsight.sh
└── README.md                # You are here
```

---

## Core Capabilities

| Capability | How it works |
|------------|--------------|
| **Remember** | Hindsight retains symptoms, root causes, resolutions from historical incidents |
| **Search** | Multi-strategy recall (Semantic + Keyword + Graph + Temporal) |
| **Similar incidents** | Identifies past incidents matching the current alert |
| **Step-by-step resolution** | Evidence-backed recommendations with citations |
| **Explain reasoning** | Shows retrieved memories and confidence |
| **Suggest runbook** | Surfaces the most relevant remediation procedure |
| **Continuous learning** | After resolution + post-mortem → automatic `retain()` |
| **Audit trail** | Every recommendation logged |

---

## Microsoft Technology Integration

- **Azure** – Cloud infrastructure & deployment
- **Azure OpenAI Service** – LLM reasoning
- **Azure AI Search** – Optional hybrid retrieval
- **Microsoft Fabric / Azure Data Explorer** – Incident analytics
- **Microsoft Teams** – Collaboration & adaptive cards
- **Azure Monitor & Application Insights** – Real-time telemetry & alerts
- **Microsoft Agent Framework / Copilot** – Natural-language agent + `HindsightProvider`

---

## Expected Workflow

```
Production Alert → Incident Detection → Context & Log Collection
→ Similar Incident Retrieval (Hindsight Recall)
→ Root-Cause Analysis (Reflect)
→ Recommended Resolution → Engineer Approval
→ Resolution → Post-Mortem → Knowledge Update (Hindsight Retain)
```

---

## Expected Impact

- Reduce Mean Time to Resolution (MTTR)
- Reduce repetitive manual troubleshooting
- Improve consistency of incident response
- Preserve institutional knowledge
- Prevent repeated incidents through learning
- Faster onboarding of new DevOps/SRE engineers
- Explainable, evidence-backed recommendations

---

## Getting Started with Real Hindsight

### 1. Run Hindsight locally

```bash
export OPENAI_API_KEY=your-key   # or Azure OpenAI key
docker run -p 8888:8888 \
  -e HINDSIGHT_API_LLM_API_KEY=$OPENAI_API_KEY \
  ghcr.io/vectorize-io/hindsight:latest
```

### 2. Seed sample data

```bash
cd data
pip install hindsight-client
python seed-hindsight.py
```

### 3. Run the backend stub

```bash
cd backend-stub
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 4. Point the website at your API (optional)

Edit the simulated responses in `website/index.html` or replace with `fetch()` calls to `http://localhost:8000/incident`.

---

## Links

- Hindsight Docs: https://hindsight.vectorize.io/
- Hindsight GitHub: https://github.com/vectorize-io/hindsight
- Microsoft Agent Framework + Hindsight guide: https://hindsight.vectorize.io/sdks/integrations/agent-framework

---

## License

MIT (demo project). Hindsight itself is MIT-licensed.
