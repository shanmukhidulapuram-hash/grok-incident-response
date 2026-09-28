"""
Hindsight Incident Copilot — Backend Stub

Minimal FastAPI service that demonstrates:
  - Receiving an incident description / alert
  - Recalling similar memories from Hindsight
  - Asking an LLM (Azure OpenAI or OpenAI) to produce a recommendation
  - Returning evidence + recommendation to the UI

This is a teaching / demo stub. Production would add auth, audit logging,
Teams adaptive cards, Azure Monitor webhooks, etc.
"""

from __future__ import annotations

import os
from typing import Any

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Optional: real Hindsight client
try:
    from hindsight_client import Hindsight
    HINDSIGHT_AVAILABLE = True
except ImportError:
    HINDSIGHT_AVAILABLE = False

app = FastAPI(
    title="Hindsight Incident Copilot API",
    description="Demo backend for Microsoft Hackathon – Incident Response Agent",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

BANK_ID = os.getenv("HINDSIGHT_BANK_ID", "org-incidents")
HINDSIGHT_URL = os.getenv("HINDSIGHT_URL", "http://localhost:8888")


class IncidentRequest(BaseModel):
    description: str
    service: str | None = None
    alert_id: str | None = None


class EvidenceItem(BaseModel):
    title: str
    meta: str
    similarity: float
    snippet: str


class IncidentResponse(BaseModel):
    recommendation: str
    evidence: list[EvidenceItem]
    bank_id: str
    source: str  # "hindsight" | "simulated"


# --- Simulated fallback (same data as the website demo) -----------------
SIMULATED = {
    "default": {
        "recommendation": (
            "I've analyzed the current alert against our organizational memory bank powered by Hindsight.\n\n"
            "Similar Incidents Found:\n"
            "• INC-2847 (Mar 2025) — PaymentService 502s after deploy → missing REDIS_HOST env var\n"
            "• INC-3102 (Jun 2025) — Same service, connection pool exhaustion\n\n"
            "Recommended Resolution:\n"
            "1. Check Application Insights for the exact exception stack\n"
            "2. Verify environment variables in the latest deployment slot\n"
            "3. Compare with last successful config (v2.2.8)\n"
            "4. Restart the affected pods after config fix\n\n"
            "Would you like me to pull the full post-mortem for INC-2847 or suggest the runbook?"
        ),
        "evidence": [
            {
                "title": "INC-2847 Post-Mortem",
                "meta": "Mar 12, 2025 · PaymentService · Resolved in 47m",
                "similarity": 0.94,
                "snippet": "Root cause: Missing REDIS_HOST after blue-green deploy. Resolution: Added missing env var + restart.",
            },
            {
                "title": "Runbook: PaymentService 5xx",
                "meta": "Last updated Jun 2025",
                "similarity": 0.88,
                "snippet": "Standard steps for 502/503 on payment endpoints including cache and DB checks.",
            },
        ],
    }
}


def recall_from_hindsight(query: str) -> list[dict[str, Any]]:
    if not HINDSIGHT_AVAILABLE:
        return []
    client = Hindsight(base_url=HINDSIGHT_URL)
    results = client.recall(bank_id=BANK_ID, query=query)
    # The exact shape of results depends on the Hindsight client version.
    # Adapt the mapping below to the real response structure.
    evidence = []
    for i, r in enumerate(results[:5] if isinstance(results, list) else []):
        evidence.append(
            {
                "title": getattr(r, "title", None) or f"Memory #{i+1}",
                "meta": getattr(r, "timestamp", "") or "",
                "similarity": float(getattr(r, "score", 0.8) or 0.8),
                "snippet": str(getattr(r, "content", r))[:280],
            }
        )
    return evidence


@app.get("/health")
def health():
    return {
        "status": "ok",
        "hindsight_client": HINDSIGHT_AVAILABLE,
        "bank_id": BANK_ID,
    }


@app.post("/incident", response_model=IncidentResponse)
def analyze_incident(req: IncidentRequest):
    """Main entry point: describe an incident → get recommendation + evidence."""
    evidence = recall_from_hindsight(req.description)

    if evidence:
        # In a full implementation you would call Azure OpenAI / Agent Framework
        # with the recalled memories injected as context, then return the LLM answer.
        recommendation = (
            "Based on Hindsight recall of similar past incidents, here is a recommended path:\n\n"
            "1. Review the highest-similarity evidence below.\n"
            "2. Follow the linked runbook steps.\n"
            "3. After resolution, create a short post-mortem so the agent can retain the new learning.\n\n"
            "(Replace this stub text with a real Azure OpenAI / Agent Framework call that uses the evidence.)"
        )
        source = "hindsight"
    else:
        # Fallback for demo when Hindsight is not running
        sim = SIMULATED["default"]
        recommendation = sim["recommendation"]
        evidence = sim["evidence"]
        source = "simulated"

    return IncidentResponse(
        recommendation=recommendation,
        evidence=[EvidenceItem(**e) for e in evidence],
        bank_id=BANK_ID,
        source=source,
    )


@app.post("/retain")
def retain_postmortem(payload: dict):
    """After an incident is resolved, push the post-mortem into Hindsight."""
    content = payload.get("content") or payload.get("postmortem")
    if not content:
        return {"ok": False, "error": "content required"}
    if not HINDSIGHT_AVAILABLE:
        return {"ok": False, "error": "hindsight-client not installed"}
    client = Hindsight(base_url=HINDSIGHT_URL)
    client.retain(bank_id=BANK_ID, content=content)
    return {"ok": True, "bank_id": BANK_ID}
