# Architecture

## High-level flow

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────────┐
│ Azure Monitor / │────▶│ Context Collector│────▶│ Hindsight Memory    │
│ App Insights    │     │ (Functions /     │     │ Bank (org-incidents)│
│ Alert           │     │  webhook)        │     │                     │
└─────────────────┘     └──────────────────┘     └──────────┬──────────┘
                                                             │ recall()
                                                             ▼
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────────┐
│ Teams Adaptive  │◀────│ Incident Agent   │◀────│ Reflect + Azure     │
│ Card / Web UI   │     │ (Agent Framework │     │ OpenAI reasoning    │
│                 │     │  + HindsightProvider)│  │                     │
└────────┬────────┘     └──────────────────┘     └─────────────────────┘
         │ Engineer approval & resolution
         ▼
┌─────────────────┐
│ Post-Mortem     │──────▶ Hindsight retain()  (continuous learning)
└─────────────────┘
```

## Hindsight role

- **Retain** – every resolved incident and post-mortem is stored as structured World / Experience facts and later consolidated into Observations.
- **Recall (TEMPR)** – Semantic + Keyword (BM25) + Entity Graph + Temporal search run in parallel and are fused.
- **Reflect** – the agent reasons over mission, directives and retrieved memories to produce an explainable recommendation.

## Microsoft pieces

| Component | Purpose |
|-----------|---------|
| Azure OpenAI | LLM backbone for Reflect and recommendation generation |
| Microsoft Agent Framework | Agent runtime; `HindsightProvider` auto-recalls/retains |
| Azure Monitor + App Insights | Source of live alerts and telemetry context |
| Microsoft Teams | Collaboration surface and adaptive-card approvals |
| Azure AI Search (optional) | Hybrid retrieval alongside Hindsight |
| Microsoft Fabric / ADX | Historical incident analytics and MTTR dashboards |
| Azure Container Apps / AKS | Host agent + Hindsight |

## Security & audit

- Every recommendation is logged (who asked, which memories were used, timestamp).
- Engineer approval is required before any automated remediation.
- Memory banks can be scoped per team / service for isolation.
