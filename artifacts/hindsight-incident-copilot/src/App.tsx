import { useState, useRef, useEffect } from 'react'
import './App.css'

interface Message {
  id: number
  role: 'user' | 'agent'
  content: string
}

interface Evidence {
  title: string
  meta: string
  similarity: number
  snippet: string
}

const SAMPLE_RESPONSES: Record<string, { reply: string; evidence: Evidence[] }> = {
  default: {
    reply: `I've analyzed the current alert against our organizational memory bank powered by **Hindsight**.

**Similar Incidents Found:**
• INC-2847 (Mar 2025) — PaymentService 502s after deploy → missing REDIS_HOST env var
• INC-3102 (Jun 2025) — Same service, connection pool exhaustion

**Recommended Resolution:**
1. Check Application Insights for the exact exception stack
2. Verify environment variables in the latest deployment slot
3. Compare with last successful config (v2.2.8)
4. Restart the affected pods after config fix

Would you like me to pull the full post-mortem for INC-2847 or suggest the runbook?`,
    evidence: [
      { title: 'INC-2847 Post-Mortem', meta: 'Mar 12, 2025 · PaymentService · Resolved in 47m', similarity: 94, snippet: 'Root cause: Missing REDIS_HOST after blue-green deploy. Resolution: Added missing env var + restart.' },
      { title: 'Runbook: PaymentService 5xx', meta: 'Last updated Jun 2025', similarity: 88, snippet: 'Standard steps for 502/503 on payment endpoints including cache and DB checks.' },
      { title: 'INC-3102 Ticket', meta: 'Jun 3, 2025 · Connection pool', similarity: 76, snippet: 'High latency + 502s caused by exhausted connection pool under load test.' },
    ],
  },
  database: {
    reply: `**Database latency spike detected.** Hindsight recall found strong matches.

**Root-cause pattern:**
In 4 of the last 6 similar incidents, the cause was long-running queries on the Orders table after a schema migration or missing index.

**Recommended steps:**
1. Check Azure Monitor → Query Performance Insight for top queries
2. Look for recent schema changes in the last 24h
3. Temporary mitigation: scale read replicas
4. Permanent: add covering index on (customer_id, created_at)

I can open the exact runbook "DB Latency – Orders Service" or show the successful fix from INC-1991.`,
    evidence: [
      { title: 'INC-1991 Post-Mortem', meta: 'Jan 2025 · Orders DB · 32 min MTTR', similarity: 91, snippet: 'Missing index after migration. Added IX_Orders_CustomerCreated. Latency dropped 80%.' },
      { title: 'Runbook: High DB Latency', meta: 'SRE Team · v3.2', similarity: 85, snippet: 'Diagnostic queries + mitigation steps for Azure SQL / Cosmos latency spikes.' },
    ],
  },
  deploy: {
    reply: `**Deployment-related failure pattern identified.**

Hindsight's temporal + entity graph linked this to 3 prior incidents involving the same pipeline and the "config-sync" step.

**Most relevant memory:**
INC-2650 (Feb 2025) — identical symptoms after canary. Root cause was a race condition in the config ConfigMap update.

**Suggested action:**
1. Pause the current rollout
2. Diff the ConfigMap between canary and stable
3. Apply the known fix from the runbook (add readiness probe delay)
4. Resume with smaller canary percentage

Shall I generate the exact kubectl commands from the last successful remediation?`,
    evidence: [
      { title: 'INC-2650 Post-Mortem', meta: 'Feb 18, 2025 · Canary deploy', similarity: 96, snippet: 'Race in config-sync. Fix: increased readinessProbe initialDelaySeconds to 15.' },
      { title: 'Runbook: Canary Rollback', meta: 'Platform Team', similarity: 82, snippet: 'Standard canary pause / inspect / rollback procedure.' },
    ],
  },
}

const SAMPLE_PROMPTS = [
  'PaymentService returning 502s after latest deploy',
  'High database latency on Orders service',
  'Canary deployment failing health checks',
]

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: 'agent',
      content: "Hello! I'm the **Hindsight Incident Copilot**. I remember every past incident, post-mortem, and runbook in your organization.\n\nDescribe a production issue or paste an alert, and I'll find similar past incidents and recommend the fastest resolution path.",
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [evidence, setEvidence] = useState<Evidence[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const getResponseKey = (text: string) => {
    const lower = text.toLowerCase()
    if (lower.includes('database') || lower.includes('latency') || lower.includes('orders')) return 'database'
    if (lower.includes('deploy') || lower.includes('canary') || lower.includes('health')) return 'deploy'
    return 'default'
  }

  const handleSend = (text?: string) => {
    const userText = (text || input).trim()
    if (!userText || isTyping) return

    const userMsg: Message = { id: Date.now(), role: 'user', content: userText }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)
    setEvidence([])

    const key = getResponseKey(userText)
    const response = SAMPLE_RESPONSES[key]

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: 'agent', content: response.reply },
      ])
      setEvidence(response.evidence)
      setIsTyping(false)
    }, 1400)
  }

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="logo">
            <div className="logo-icon">⚡</div>
            <span>Hindsight Incident Copilot</span>
          </div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#demo">Live Demo</a>
            <a href="#architecture">Architecture</a>
            <a href="#impact">Impact</a>
            <a href="#demo" className="btn btn-primary">Try Demo</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="container hero-content">
          <div className="badge">
            <span>🏆 Microsoft Hackathon Project</span>
          </div>
          <h1>
            AI that remembers how your team fixed production yesterday
          </h1>
          <p className="hero-subtitle">
            An Incident Response Agent powered by <strong>Hindsight</strong> agent memory + Microsoft Azure.
            It retains, recalls, and reflects on every past incident so engineers resolve today's failures faster.
          </p>
          <div className="hero-cta">
            <a href="#demo" className="btn btn-primary btn-lg">
              Launch Interactive Demo →
            </a>
            <a href="#architecture" className="btn btn-secondary btn-lg">
              View Architecture
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-value">40-70%</div>
              <div className="stat-label">MTTR Reduction Target</div>
            </div>
            <div className="stat">
              <div className="stat-value">94.6%</div>
              <div className="stat-label">Hindsight LongMemEval</div>
            </div>
            <div className="stat">
              <div className="stat-value">∞</div>
              <div className="stat-label">Institutional Knowledge</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <h2>The Problem</h2>
            <p>Production incidents keep happening. The knowledge to fix them already exists — it's just scattered and hard to find under pressure.</p>
          </div>
          <div className="grid-3">
            <div className="card">
              <div className="card-icon" style={{ background: 'rgba(239,68,68,0.15)' }}>🔍</div>
              <h3 style={{ marginBottom: 8 }}>Knowledge Scattered</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Post-mortems, tickets, runbooks, logs and Slack threads live in different systems. Engineers waste critical minutes searching.
              </p>
            </div>
            <div className="card">
              <div className="card-icon" style={{ background: 'rgba(245,158,11,0.15)' }}>⏱️</div>
              <h3 style={{ marginBottom: 8 }}>Longer MTTR</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Repeated troubleshooting of the same class of failures. Dependency on senior engineers who "just know" the history.
              </p>
            </div>
            <div className="card">
              <div className="card-icon" style={{ background: 'rgba(139,92,246,0.15)' }}>🧠</div>
              <h3 style={{ marginBottom: 8 }}>Lost Institutional Memory</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                When experienced SREs leave or are offline, the organization loses years of hard-won incident knowledge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section" id="features">
        <div className="container">
          <div className="section-header">
            <h2>Powered by Hindsight Memory</h2>
            <p>Not just RAG. A true agent memory system that retains, recalls, and reflects — just like human memory.</p>
          </div>
          <div className="grid-3">
            <div className="card">
              <div className="card-icon" style={{ background: 'var(--accent-soft)' }}>📥</div>
              <h3 style={{ marginBottom: 8 }}>Retain</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Automatically extracts World Facts, Experience Facts and Observations from every incident report, post-mortem and runbook.
              </p>
            </div>
            <div className="card">
              <div className="card-icon" style={{ background: 'var(--success-soft)' }}>🔎</div>
              <h3 style={{ marginBottom: 8 }}>Recall (TEMPR)</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Four parallel strategies: Semantic + Keyword + Entity Graph + Temporal. Fused with RRF and token-budget optimization.
              </p>
            </div>
            <div className="card">
              <div className="card-icon" style={{ background: 'rgba(139,92,246,0.15)' }}>💭</div>
              <h3 style={{ marginBottom: 8 }}>Reflect</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Consolidates knowledge into observations, reasons with mission & directives, and produces evidence-backed recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="section" id="demo" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <h2>Interactive Demo</h2>
            <p>Simulate a live production incident. The agent uses Hindsight memory to find similar past failures and recommend resolution steps.</p>
          </div>

          <div className="demo-container">
            <div className="demo-header">
              <div className="demo-dot red"></div>
              <div className="demo-dot yellow"></div>
              <div className="demo-dot green"></div>
              <span className="demo-title">Incident Copilot · Connected to Hindsight Memory Bank</span>
            </div>
            <div className="demo-body">
              <div className="demo-chat">
                <div className="chat-messages">
                  {messages.map((m) => (
                    <div key={m.id} className={`message ${m.role}`}>
                      <div dangerouslySetInnerHTML={{ __html: m.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }} />
                    </div>
                  ))}
                  {isTyping && (
                    <div className="message agent">
                      <div className="typing">
                        <span></span><span></span><span></span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                <div className="chat-input-area">
                  <input
                    className="chat-input"
                    placeholder="Describe the incident or paste an alert..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  />
                  <button className="btn btn-primary" onClick={() => handleSend()}>
                    Send
                  </button>
                </div>
                <div style={{ padding: '0 16px 16px' }}>
                  <div className="sample-prompts">
                    {SAMPLE_PROMPTS.map((p) => (
                      <button key={p} className="sample-prompt" onClick={() => handleSend(p)}>
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="demo-sidebar">
                <div className="sidebar-section">
                  <h4>Retrieved Evidence (Hindsight)</h4>
                  {evidence.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      Evidence from memory will appear here after you send an incident description.
                    </p>
                  ) : (
                    evidence.map((e, i) => (
                      <div key={i} className="evidence-item">
                        <div className="title">{e.title}</div>
                        <div className="meta">{e.meta}</div>
                        <p style={{ marginTop: 6, color: 'var(--text-secondary)' }}>{e.snippet}</p>
                        <div className="similarity-bar">
                          <div className="similarity-fill" style={{ width: `${e.similarity}%` }}></div>
                        </div>
                        <div className="meta" style={{ marginTop: 4 }}>{e.similarity}% similarity</div>
                      </div>
                    ))
                  )}
                </div>
                <div className="sidebar-section">
                  <h4>Memory Bank Status</h4>
                  <div className="evidence-item">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Incidents retained</span>
                      <strong>1,247</strong>
                    </div>
                  </div>
                  <div className="evidence-item">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Post-mortems</span>
                      <strong>892</strong>
                    </div>
                  </div>
                  <div className="evidence-item">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Runbooks</span>
                      <strong>156</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="section" id="architecture">
        <div className="container">
          <div className="section-header">
            <h2>Architecture</h2>
            <p>End-to-end flow from production alert to knowledge update — built on Microsoft Azure + Hindsight.</p>
          </div>

          <div className="arch-flow">
            <div className="arch-node">Azure Monitor<br/>Alert</div>
            <span className="arch-arrow">→</span>
            <div className="arch-node">Context<br/>Collector</div>
            <span className="arch-arrow">→</span>
            <div className="arch-node highlight">Hindsight<br/>Recall</div>
            <span className="arch-arrow">→</span>
            <div className="arch-node highlight">Agent<br/>Reflect</div>
            <span className="arch-arrow">→</span>
            <div className="arch-node">Teams / UI<br/>Recommendation</div>
            <span className="arch-arrow">→</span>
            <div className="arch-node">Resolution +<br/>Post-Mortem</div>
            <span className="arch-arrow">→</span>
            <div className="arch-node highlight">Hindsight<br/>Retain</div>
          </div>

          <div className="section-header" style={{ marginTop: 64 }}>
            <h2>Microsoft Technology Stack</h2>
          </div>
          <div className="tech-grid">
            <div className="tech-item">
              <div className="icon">☁️</div>
              <div className="name">Azure</div>
              <div className="desc">Infrastructure</div>
            </div>
            <div className="tech-item">
              <div className="icon">🧠</div>
              <div className="name">Azure OpenAI</div>
              <div className="desc">LLM Reasoning</div>
            </div>
            <div className="tech-item">
              <div className="icon">🔍</div>
              <div className="name">Azure AI Search</div>
              <div className="desc">Hybrid Retrieval</div>
            </div>
            <div className="tech-item">
              <div className="icon">📊</div>
              <div className="name">Azure Monitor</div>
              <div className="desc">Telemetry & Alerts</div>
            </div>
            <div className="tech-item">
              <div className="icon">💬</div>
              <div className="name">Microsoft Teams</div>
              <div className="desc">Collaboration</div>
            </div>
            <div className="tech-item">
              <div className="icon">🤖</div>
              <div className="name">Agent Framework</div>
              <div className="desc">+ Hindsight Provider</div>
            </div>
            <div className="tech-item">
              <div className="icon">🧬</div>
              <div className="name">Hindsight</div>
              <div className="desc">Agent Memory</div>
            </div>
            <div className="tech-item">
              <div className="icon">📈</div>
              <div className="name">Microsoft Fabric</div>
              <div className="desc">Data Analysis</div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="section" id="impact" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <h2>Expected Impact</h2>
            <p>Measurable outcomes for SRE and DevOps teams.</p>
          </div>
          <div className="impact-grid">
            <div className="impact-card">
              <div className="value">↓ MTTR</div>
              <div className="label">Reduce Mean Time to Resolution on recurring incident classes</div>
            </div>
            <div className="impact-card">
              <div className="value">Consistency</div>
              <div className="label">Standardized, evidence-backed response every time</div>
            </div>
            <div className="impact-card">
              <div className="value">Knowledge</div>
              <div className="label">Preserve institutional memory when experts are unavailable</div>
            </div>
            <div className="impact-card">
              <div className="value">Onboarding</div>
              <div className="label">New engineers get expert-level guidance from day one</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pitch */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="badge">One-line Pitch</div>
          <h2 style={{ fontSize: '1.75rem', maxWidth: 800, margin: '16px auto 24px' }}>
            “An AI Incident Response Agent that remembers how your organization solved problems before — and uses that knowledge to help engineers resolve today's production incidents faster.”
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 32 }}>
            Built with Hindsight (vectorize-io) + Microsoft Azure OpenAI + Agent Framework
          </p>
          <div className="hero-cta">
            <a href="https://hindsight.vectorize.io/" target="_blank" rel="noreferrer" className="btn btn-primary btn-lg">
              Hindsight Docs
            </a>
            <a href="https://github.com/vectorize-io/hindsight" target="_blank" rel="noreferrer" className="btn btn-secondary btn-lg">
              GitHub · vectorize-io/hindsight
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>
            Hindsight Incident Copilot · Microsoft Hackathon Demo · Powered by{' '}
            <a href="https://hindsight.vectorize.io/" target="_blank" rel="noreferrer">Hindsight</a> & Azure
          </p>
          <p style={{ marginTop: 8, fontSize: '0.8rem' }}>
            This is a front-end demonstration. Connect a real Hindsight server + Azure OpenAI for production use.
          </p>
        </div>
      </footer>
    </>
  )
}

export default App
