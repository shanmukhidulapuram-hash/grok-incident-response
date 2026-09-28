export type Evidence = {
  title: string;
  meta: string;
  similarity: number;
  snippet: string;
};

export type AgentReply = {
  recommendation: string;
  evidence: Evidence[];
};

export const SAMPLE_PROMPTS = [
  "PaymentService returning 502s after latest deploy",
  "High database latency on Orders service",
  "Canary deployment failing health checks",
] as const;

const REPLIES: Record<string, AgentReply> = {
  default: {
    recommendation: `Analyzed this alert against the organizational memory bank.

Similar incidents
• INC-2847 (Mar 2025) — PaymentService 502s after deploy. Missing REDIS_HOST in the new slot.
• INC-3102 (Jun 2025) — Same service. Connection pool exhaustion under checkout load.

Recommended resolution
1. Check Application Insights for the exception stack.
2. Verify environment variables in the current deployment slot.
3. Diff config against last known-good (v2.2.8).
4. Restart affected pods after the config fix.

I can open the full post-mortem for INC-2847 or walk the PaymentService 5xx runbook.`,
    evidence: [
      {
        title: "INC-2847 Post-Mortem",
        meta: "12 Mar 2025 · PaymentService · 47 min MTTR",
        similarity: 94,
        snippet:
          "Root cause: missing REDIS_HOST after blue-green deploy. Fix: restore env var and restart pods.",
      },
      {
        title: "Runbook: PaymentService 5xx",
        meta: "SRE · last updated Jun 2025",
        similarity: 88,
        snippet: "Diagnostic path for 502/503 on payment endpoints: config, cache, and pool checks.",
      },
      {
        title: "INC-3102 Ticket",
        meta: "3 Jun 2025 · connection pool",
        similarity: 76,
        snippet: "502s under load after pool size lagged behind checkout concurrency.",
      },
    ],
  },
  database: {
    recommendation: `Database latency pattern matched.

Root-cause pattern
In 4 of the last 6 similar incidents, long-running queries on Orders followed a schema change or a dropped index.

Recommended steps
1. Open Azure Monitor → Query Performance Insight for top queries.
2. Check schema or index changes in the last 24 hours.
3. Temporary mitigation: scale read replicas.
4. Permanent: covering index on (customer_id, created_at).

I can open runbook “High DB Latency” or the successful fix from INC-1991.`,
    evidence: [
      {
        title: "INC-1991 Post-Mortem",
        meta: "18 Jan 2025 · Orders DB · 32 min MTTR",
        similarity: 91,
        snippet:
          "Missing index after migration. IX_Orders_CustomerCreated brought p95 down ~80%.",
      },
      {
        title: "Runbook: High DB Latency",
        meta: "SRE team · v3.2",
        similarity: 85,
        snippet: "Query insight, replica scale, and index recovery for Azure SQL / Cosmos spikes.",
      },
    ],
  },
  deploy: {
    recommendation: `Deployment failure pattern identified.

Hindsight temporal + entity graph linked this to three prior incidents on the same pipeline and the config-sync step.

Most relevant memory
INC-2650 (Feb 2025) — identical canary symptoms. Race in ConfigMap update.

Suggested action
1. Pause the current rollout.
2. Diff ConfigMap between canary and stable.
3. Apply the known fix: increase readiness probe delay.
4. Resume with a smaller canary percentage.

I can generate the kubectl commands from the last successful remediation.`,
    evidence: [
      {
        title: "INC-2650 Post-Mortem",
        meta: "18 Feb 2025 · canary deploy",
        similarity: 96,
        snippet:
          "Race in config-sync. Fix: readinessProbe.initialDelaySeconds 5 → 15.",
      },
      {
        title: "Runbook: Canary Rollback",
        meta: "Platform team",
        similarity: 82,
        snippet: "Pause, inspect, patch probes, then resume or full rollback.",
      },
    ],
  },
};

export function matchIncident(text: string): AgentReply {
  const l = text.toLowerCase();
  if (l.includes("database") || l.includes("latency") || l.includes("orders")) {
    return REPLIES.database;
  }
  if (l.includes("deploy") || l.includes("canary") || l.includes("health")) {
    return REPLIES.deploy;
  }
  return REPLIES.default;
}

export const WELCOME =
  "I am the Hindsight Incident Copilot. I retain past incidents, post-mortems, and runbooks, then recall the closest matches when production fails.\n\nDescribe an alert or paste symptoms. I will return similar history, a recommended path, and the evidence I used.";
