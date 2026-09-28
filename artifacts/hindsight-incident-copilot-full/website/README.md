# Hindsight Incident Copilot

**Microsoft Hackathon Demo Website**

An AI-powered Incident Response Agent that remembers how your organization solved problems before — powered by [Hindsight](https://hindsight.vectorize.io/) agent memory + Microsoft Azure.

## Quick Start

Open `index.html` in any modern browser (or serve with a static server):

```bash
# Option 1: open directly
open index.html

# Option 2: local server
npx serve .
# or
python3 -m http.server 8080
```

Then visit http://localhost:8080

## Features

- Dark, modern Microsoft-inspired design
- Interactive chat demo with 3 sample incident scenarios
- Live evidence panel showing Hindsight-style memory retrieval
- Architecture diagram + Microsoft tech stack
- Impact metrics and pitch section

## Connecting Real Backend

This is a front-end demonstration with simulated responses. To make it production-ready:

1. Deploy [Hindsight](https://github.com/vectorize-io/hindsight) (Docker or Cloud)
2. Seed historical incidents / post-mortems via `retain()`
3. Use Azure OpenAI + Microsoft Agent Framework with `HindsightProvider`
4. Replace the simulated `RESPONSES` object with real API calls to your agent endpoint

## Pitch

> “An AI Incident Response Agent that remembers how your organization solved problems before — and uses that knowledge to help engineers resolve today's production incidents faster.”

## Links

- Hindsight Docs: https://hindsight.vectorize.io/
- Hindsight GitHub: https://github.com/vectorize-io/hindsight
