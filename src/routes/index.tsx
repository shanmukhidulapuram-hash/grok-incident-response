import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  BookOpen,
  Brain,
  Cloud,
  Database,
  Layers,
  MessageSquare,
  Radar,
  Search,
  Shield,
  Zap,
} from "lucide-react";
import { IncidentDemo } from "@/components/incident-demo";

export const Route = createFileRoute("/")({ component: Home });

const FLOW = [
  "Azure Monitor alert",
  "Context collector",
  "Hindsight recall",
  "Agent reflect",
  "Teams / UI",
  "Resolution",
  "Hindsight retain",
];

const STACK = [
  { icon: Cloud, name: "Azure", desc: "Infrastructure" },
  { icon: Brain, name: "Azure OpenAI", desc: "LLM reasoning" },
  { icon: Search, name: "Azure AI Search", desc: "Hybrid retrieval" },
  { icon: Activity, name: "Azure Monitor", desc: "Telemetry and alerts" },
  { icon: MessageSquare, name: "Microsoft Teams", desc: "Collaboration" },
  { icon: Layers, name: "Agent Framework", desc: "Hindsight provider" },
  { icon: Database, name: "Hindsight", desc: "Agent memory" },
  { icon: Radar, name: "Microsoft Fabric", desc: "Incident analytics" },
];

function Home() {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <header className="sticky top-0 z-20 border-b border-border bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <a href="#top" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
            <span className="flex size-8 items-center justify-center rounded-sm bg-accent text-accent-fg">
              <Zap className="size-4" />
            </span>
            Hindsight Incident Copilot
          </a>
          <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
            <a href="#features" className="hover:text-fg">
              Features
            </a>
            <a href="#demo" className="hover:text-fg">
              Demo
            </a>
            <a href="#architecture" className="hover:text-fg">
              Architecture
            </a>
            <a href="#impact" className="hover:text-fg">
              Impact
            </a>
            <a
              href="#demo"
              className="inline-flex h-9 items-center rounded-sm bg-accent px-3 font-medium text-accent-fg hover:opacity-90"
            >
              Open demo
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="mx-auto max-w-6xl px-4 pt-16 pb-20 md:pt-24">
          <p className="mb-5 inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
            Microsoft hackathon · Hindsight memory
          </p>
          <h1 className="max-w-3xl text-4xl leading-tight font-semibold tracking-tight md:text-5xl">
            AI that remembers how your team fixed production yesterday
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            An incident response agent that retains, recalls, and reflects on every past failure —
            so engineers resolve today’s alerts with evidence, not folklore.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#demo"
              className="inline-flex h-11 items-center gap-2 rounded-sm bg-accent px-5 text-sm font-medium text-accent-fg hover:opacity-90"
            >
              Launch interactive demo
              <ArrowRight className="size-4" />
            </a>
            <a
              href="#architecture"
              className="inline-flex h-11 items-center rounded-sm border border-border bg-surface px-5 text-sm font-medium text-fg hover:border-border-strong"
            >
              View architecture
            </a>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              ["40–70%", "Target MTTR reduction"],
              ["94.6%", "Hindsight LongMemEval"],
              ["Continuous", "Learning from post-mortems"],
            ].map(([value, label]) => (
              <div key={label} className="border-t border-border pt-4">
                <dt className="font-mono text-3xl font-medium tabular-nums">{value}</dt>
                <dd className="mt-1 text-sm text-subtle">{label}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="border-y border-border bg-surface py-20">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-semibold tracking-tight">The problem</h2>
            <p className="mt-3 max-w-xl text-muted">
              The answers already exist in post-mortems, tickets, and runbooks. They are just too
              slow to find while production is burning.
            </p>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                {
                  icon: Search,
                  title: "Knowledge is scattered",
                  body: "Post-mortems, tickets, runbooks, logs, and chat live in different systems. Minutes vanish searching.",
                },
                {
                  icon: Activity,
                  title: "MTTR stays high",
                  body: "The same class of failure is diagnosed from scratch. Senior engineers become a single point of memory.",
                },
                {
                  icon: Shield,
                  title: "Institutional memory fades",
                  body: "When experienced SREs are offline, years of hard-won incident knowledge leave with them.",
                },
              ].map((c) => (
                <article key={c.title} className="rounded-lg border border-border bg-elevated p-6">
                  <c.icon className="size-5 text-muted" />
                  <h3 className="mt-4 text-lg font-medium">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="text-3xl font-semibold tracking-tight">Powered by Hindsight memory</h2>
          <p className="mt-3 max-w-xl text-muted">
            Not a vector-search wrapper. A memory system that retains facts, recalls across four
            strategies, and reflects with evidence.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: BookOpen,
                title: "Retain",
                body: "Extracts world facts, experience, and observations from incident reports, post-mortems, and runbooks.",
              },
              {
                icon: Search,
                title: "Recall (TEMPR)",
                body: "Semantic, keyword, entity graph, and temporal search in parallel — fused with token-budget ranking.",
              },
              {
                icon: Brain,
                title: "Reflect",
                body: "Consolidates observations and reasons with mission and directives to produce cited recommendations.",
              },
            ].map((c) => (
              <article key={c.title} className="rounded-lg border border-border bg-surface p-6">
                <c.icon className="size-5 text-muted" />
                <h3 className="mt-4 text-lg font-medium">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="demo" className="border-y border-border bg-surface py-20">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-semibold tracking-tight">Interactive demo</h2>
            <p className="mt-3 mb-8 max-w-xl text-muted">
              Simulate a live production incident. The agent returns similar history, a resolution
              path, and the memories it used.
            </p>
            <IncidentDemo />
          </div>
        </section>

        <section id="architecture" className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="text-3xl font-semibold tracking-tight">Architecture</h2>
          <p className="mt-3 max-w-xl text-muted">
            From production alert to knowledge update, on Azure plus Hindsight.
          </p>
          <ol className="mt-10 flex flex-wrap items-stretch gap-2">
            {FLOW.map((step, i) => (
              <li key={step} className="flex items-center gap-2">
                <span
                  className={
                    step.includes("Hindsight")
                      ? "rounded-md border border-border-strong bg-elevated px-3 py-2 text-center text-xs font-medium"
                      : "rounded-md border border-border bg-surface px-3 py-2 text-center text-xs font-medium text-muted"
                  }
                >
                  {step}
                </span>
                {i < FLOW.length - 1 ? (
                  <ArrowRight className="hidden size-3.5 text-subtle sm:block" />
                ) : null}
              </li>
            ))}
          </ol>
          <h3 className="mt-16 text-xl font-medium">Microsoft technology stack</h3>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {STACK.map((s) => (
              <div
                key={s.name}
                className="rounded-md border border-border bg-surface p-4 text-center"
              >
                <s.icon className="mx-auto size-5 text-muted" />
                <p className="mt-2 text-sm font-medium">{s.name}</p>
                <p className="text-xs text-subtle">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="impact" className="border-t border-border bg-surface py-20">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-semibold tracking-tight">Expected impact</h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Lower MTTR", "Faster resolution on recurring incident classes"],
                ["Consistency", "The same evidence-backed path, every time"],
                ["Knowledge kept", "Memory survives when experts are unavailable"],
                ["Faster onboarding", "New SREs get expert guidance from day one"],
              ].map(([title, body]) => (
                <article key={title} className="rounded-lg border border-border bg-elevated p-5">
                  <h3 className="font-medium">{title}</h3>
                  <p className="mt-2 text-sm text-muted">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-20 text-center">
          <p className="text-xs font-medium tracking-wider text-subtle uppercase">Pitch</p>
          <blockquote className="mt-4 text-2xl leading-snug font-medium tracking-tight">
            An AI incident response agent that remembers how your organization solved problems
            before — and uses that knowledge to resolve today’s production incidents faster.
          </blockquote>
        </section>
      </main>

      <footer className="border-t border-border py-8 text-center text-xs text-subtle">
        Hindsight Incident Copilot · demo memory responses until a live Hindsight bank is connected
      </footer>
    </div>
  );
}
