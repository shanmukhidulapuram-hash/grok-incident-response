import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Search, c as Layers, d as Brain, f as BookOpen, i as Send, l as Database, m as Activity, o as Radar, p as ArrowRight, r as Shield, s as MessageSquare, t as Zap, u as Cloud } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-jk30F_Hk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SAMPLE_PROMPTS = [
	"PaymentService returning 502s after latest deploy",
	"High database latency on Orders service",
	"Canary deployment failing health checks"
];
var REPLIES = {
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
				snippet: "Root cause: missing REDIS_HOST after blue-green deploy. Fix: restore env var and restart pods."
			},
			{
				title: "Runbook: PaymentService 5xx",
				meta: "SRE · last updated Jun 2025",
				similarity: 88,
				snippet: "Diagnostic path for 502/503 on payment endpoints: config, cache, and pool checks."
			},
			{
				title: "INC-3102 Ticket",
				meta: "3 Jun 2025 · connection pool",
				similarity: 76,
				snippet: "502s under load after pool size lagged behind checkout concurrency."
			}
		]
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
		evidence: [{
			title: "INC-1991 Post-Mortem",
			meta: "18 Jan 2025 · Orders DB · 32 min MTTR",
			similarity: 91,
			snippet: "Missing index after migration. IX_Orders_CustomerCreated brought p95 down ~80%."
		}, {
			title: "Runbook: High DB Latency",
			meta: "SRE team · v3.2",
			similarity: 85,
			snippet: "Query insight, replica scale, and index recovery for Azure SQL / Cosmos spikes."
		}]
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
		evidence: [{
			title: "INC-2650 Post-Mortem",
			meta: "18 Feb 2025 · canary deploy",
			similarity: 96,
			snippet: "Race in config-sync. Fix: readinessProbe.initialDelaySeconds 5 → 15."
		}, {
			title: "Runbook: Canary Rollback",
			meta: "Platform team",
			similarity: 82,
			snippet: "Pause, inspect, patch probes, then resume or full rollback."
		}]
	}
};
function matchIncident(text) {
	const l = text.toLowerCase();
	if (l.includes("database") || l.includes("latency") || l.includes("orders")) return REPLIES.database;
	if (l.includes("deploy") || l.includes("canary") || l.includes("health")) return REPLIES.deploy;
	return REPLIES.default;
}
var WELCOME = "I am the Hindsight Incident Copilot. I retain past incidents, post-mortems, and runbooks, then recall the closest matches when production fails.\n\nDescribe an alert or paste symptoms. I will return similar history, a recommended path, and the evidence I used.";
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function IncidentDemo() {
	const [messages, setMessages] = (0, import_react.useState)([{
		id: 0,
		role: "agent",
		text: WELCOME
	}]);
	const [input, setInput] = (0, import_react.useState)("");
	const [typing, setTyping] = (0, import_react.useState)(false);
	const [evidence, setEvidence] = (0, import_react.useState)([]);
	const listRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		listRef.current?.scrollTo({
			top: listRef.current.scrollHeight,
			behavior: "smooth"
		});
	}, [messages, typing]);
	function send(text) {
		const userText = (text ?? input).trim();
		if (!userText || typing) return;
		setMessages((prev) => [...prev, {
			id: Date.now(),
			role: "user",
			text: userText
		}]);
		setInput("");
		setTyping(true);
		setEvidence([]);
		const reply = matchIncident(userText);
		window.setTimeout(() => {
			setMessages((prev) => [...prev, {
				id: Date.now() + 1,
				role: "agent",
				text: reply.recommendation
			}]);
			setEvidence(reply.evidence);
			setTyping(false);
		}, 900);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-hidden rounded-xl border border-border bg-surface shadow-[0_24px_80px_rgba(0,0,0,0.35)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 border-b border-border bg-elevated px-4 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-danger/80" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-warn/80" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-ok/80" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-2 text-xs text-subtle",
					children: "Incident Copilot · memory bank org-incidents"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid min-h-[28rem] lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 flex-col border-b border-border lg:border-r lg:border-b-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					ref: listRef,
					className: "flex max-h-[22rem] flex-1 flex-col gap-3 overflow-y-auto p-4",
					children: [messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("max-w-[92%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap", m.role === "user" ? "ml-auto rounded-br-xs bg-accent text-accent-fg" : "rounded-bl-xs border border-border bg-elevated text-fg"),
						children: m.text
					}, m.id)), typing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-fit rounded-lg rounded-bl-xs border border-border bg-elevated px-3.5 py-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 animate-pulse rounded-full bg-subtle" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 animate-pulse rounded-full bg-subtle [animation-delay:120ms]" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 animate-pulse rounded-full bg-subtle [animation-delay:240ms]" })
							]
						})
					}) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-border p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: input,
							onChange: (e) => setInput(e.target.value),
							onKeyDown: (e) => {
								if (e.key === "Enter") send();
							},
							placeholder: "Describe the incident or paste an alert",
							className: "h-11 min-w-0 flex-1 rounded-sm border border-border bg-bg px-3 text-sm text-fg placeholder:text-subtle outline-none focus:border-border-strong"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => send(),
							className: "inline-flex h-11 min-w-11 items-center justify-center rounded-sm bg-accent px-4 text-sm font-medium text-accent-fg transition-opacity duration-150 hover:opacity-90 active:scale-[0.98]",
							"aria-label": "Send",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: SAMPLE_PROMPTS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => send(p),
							className: "rounded-full border border-border bg-elevated px-3 py-1.5 text-left text-xs text-muted transition-colors duration-150 hover:border-border-strong hover:text-fg",
							children: p
						}, p))
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "max-h-[28rem] overflow-y-auto bg-bg p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-3 text-[11px] font-medium tracking-wider text-subtle uppercase",
						children: "Retrieved evidence"
					}),
					evidence.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-subtle",
						children: "Memories appear here after you describe an incident — titles, snippets, and similarity."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2.5",
						children: evidence.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "rounded-md border border-border bg-surface p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-sm font-medium text-fg",
									children: e.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 text-xs text-subtle",
									children: e.meta
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted",
									children: e.snippet
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 h-1 overflow-hidden rounded-full bg-elevated",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full rounded-full bg-ok",
										style: { width: `${e.similarity}%` }
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 font-mono text-xs text-subtle tabular-nums",
									children: [e.similarity, "% similarity"]
								})
							]
						}, e.title))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 mb-3 text-[11px] font-medium tracking-wider text-subtle uppercase",
						children: "Memory bank"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2 text-sm",
						children: [
							["Incidents retained", "1,247"],
							["Post-mortems", "892"],
							["Runbooks", "156"]
						].map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between rounded-md border border-border bg-surface px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono tabular-nums",
								children: value
							})]
						}, label))
					})
				]
			})]
		})]
	});
}
var FLOW = [
	"Azure Monitor alert",
	"Context collector",
	"Hindsight recall",
	"Agent reflect",
	"Teams / UI",
	"Resolution",
	"Hindsight retain"
];
var STACK = [
	{
		icon: Cloud,
		name: "Azure",
		desc: "Infrastructure"
	},
	{
		icon: Brain,
		name: "Azure OpenAI",
		desc: "LLM reasoning"
	},
	{
		icon: Search,
		name: "Azure AI Search",
		desc: "Hybrid retrieval"
	},
	{
		icon: Activity,
		name: "Azure Monitor",
		desc: "Telemetry and alerts"
	},
	{
		icon: MessageSquare,
		name: "Microsoft Teams",
		desc: "Collaboration"
	},
	{
		icon: Layers,
		name: "Agent Framework",
		desc: "Hindsight provider"
	},
	{
		icon: Database,
		name: "Hindsight",
		desc: "Agent memory"
	},
	{
		icon: Radar,
		name: "Microsoft Fabric",
		desc: "Incident analytics"
	}
];
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-20 border-b border-border bg-bg/90 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-14 max-w-6xl items-center justify-between px-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "#top",
						className: "flex items-center gap-2 text-sm font-semibold tracking-tight",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-8 items-center justify-center rounded-sm bg-accent text-accent-fg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-4" })
						}), "Hindsight Incident Copilot"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "hidden items-center gap-6 text-sm text-muted md:flex",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#features",
								className: "hover:text-fg",
								children: "Features"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#demo",
								className: "hover:text-fg",
								children: "Demo"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#architecture",
								className: "hover:text-fg",
								children: "Architecture"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#impact",
								className: "hover:text-fg",
								children: "Impact"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#demo",
								className: "inline-flex h-9 items-center rounded-sm bg-accent px-3 font-medium text-accent-fg hover:opacity-90",
								children: "Open demo"
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				id: "top",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mx-auto max-w-6xl px-4 pt-16 pb-20 md:pt-24",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-5 inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted",
								children: "Microsoft hackathon · Hindsight memory"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "max-w-3xl text-4xl leading-tight font-semibold tracking-tight md:text-5xl",
								children: "AI that remembers how your team fixed production yesterday"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 max-w-2xl text-lg leading-relaxed text-muted",
								children: "An incident response agent that retains, recalls, and reflects on every past failure — so engineers resolve today’s alerts with evidence, not folklore."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-wrap gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "#demo",
									className: "inline-flex h-11 items-center gap-2 rounded-sm bg-accent px-5 text-sm font-medium text-accent-fg hover:opacity-90",
									children: ["Launch interactive demo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#architecture",
									className: "inline-flex h-11 items-center rounded-sm border border-border bg-surface px-5 text-sm font-medium text-fg hover:border-border-strong",
									children: "View architecture"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
								className: "mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3",
								children: [
									["40–70%", "Target MTTR reduction"],
									["94.6%", "Hindsight LongMemEval"],
									["Continuous", "Learning from post-mortems"]
								].map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t border-border pt-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "font-mono text-3xl font-medium tabular-nums",
										children: value
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "mt-1 text-sm text-subtle",
										children: label
									})]
								}, label))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "border-y border-border bg-surface py-20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto max-w-6xl px-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-3xl font-semibold tracking-tight",
									children: "The problem"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 max-w-xl text-muted",
									children: "The answers already exist in post-mortems, tickets, and runbooks. They are just too slow to find while production is burning."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-10 grid gap-4 md:grid-cols-3",
									children: [
										{
											icon: Search,
											title: "Knowledge is scattered",
											body: "Post-mortems, tickets, runbooks, logs, and chat live in different systems. Minutes vanish searching."
										},
										{
											icon: Activity,
											title: "MTTR stays high",
											body: "The same class of failure is diagnosed from scratch. Senior engineers become a single point of memory."
										},
										{
											icon: Shield,
											title: "Institutional memory fades",
											body: "When experienced SREs are offline, years of hard-won incident knowledge leave with them."
										}
									].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
										className: "rounded-lg border border-border bg-elevated p-6",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(c.icon, { className: "size-5 text-muted" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "mt-4 text-lg font-medium",
												children: c.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 text-sm leading-relaxed text-muted",
												children: c.body
											})
										]
									}, c.title))
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "features",
						className: "mx-auto max-w-6xl px-4 py-20",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-3xl font-semibold tracking-tight",
								children: "Powered by Hindsight memory"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 max-w-xl text-muted",
								children: "Not a vector-search wrapper. A memory system that retains facts, recalls across four strategies, and reflects with evidence."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-10 grid gap-4 md:grid-cols-3",
								children: [
									{
										icon: BookOpen,
										title: "Retain",
										body: "Extracts world facts, experience, and observations from incident reports, post-mortems, and runbooks."
									},
									{
										icon: Search,
										title: "Recall (TEMPR)",
										body: "Semantic, keyword, entity graph, and temporal search in parallel — fused with token-budget ranking."
									},
									{
										icon: Brain,
										title: "Reflect",
										body: "Consolidates observations and reasons with mission and directives to produce cited recommendations."
									}
								].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "rounded-lg border border-border bg-surface p-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(c.icon, { className: "size-5 text-muted" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-4 text-lg font-medium",
											children: c.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm leading-relaxed text-muted",
											children: c.body
										})
									]
								}, c.title))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						id: "demo",
						className: "border-y border-border bg-surface py-20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto max-w-6xl px-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-3xl font-semibold tracking-tight",
									children: "Interactive demo"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 mb-8 max-w-xl text-muted",
									children: "Simulate a live production incident. The agent returns similar history, a resolution path, and the memories it used."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IncidentDemo, {})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "architecture",
						className: "mx-auto max-w-6xl px-4 py-20",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-3xl font-semibold tracking-tight",
								children: "Architecture"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 max-w-xl text-muted",
								children: "From production alert to knowledge update, on Azure plus Hindsight."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
								className: "mt-10 flex flex-wrap items-stretch gap-2",
								children: FLOW.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: step.includes("Hindsight") ? "rounded-md border border-border-strong bg-elevated px-3 py-2 text-center text-xs font-medium" : "rounded-md border border-border bg-surface px-3 py-2 text-center text-xs font-medium text-muted",
										children: step
									}), i < FLOW.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "hidden size-3.5 text-subtle sm:block" }) : null]
								}, step))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-16 text-xl font-medium",
								children: "Microsoft technology stack"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4",
								children: STACK.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-md border border-border bg-surface p-4 text-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "mx-auto size-5 text-muted" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm font-medium",
											children: s.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-subtle",
											children: s.desc
										})
									]
								}, s.name))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						id: "impact",
						className: "border-t border-border bg-surface py-20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto max-w-6xl px-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-3xl font-semibold tracking-tight",
								children: "Expected impact"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
								children: [
									["Lower MTTR", "Faster resolution on recurring incident classes"],
									["Consistency", "The same evidence-backed path, every time"],
									["Knowledge kept", "Memory survives when experts are unavailable"],
									["Faster onboarding", "New SREs get expert guidance from day one"]
								].map(([title, body]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "rounded-lg border border-border bg-elevated p-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-medium",
										children: title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-muted",
										children: body
									})]
								}, title))
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mx-auto max-w-3xl px-4 py-20 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium tracking-wider text-subtle uppercase",
							children: "Pitch"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
							className: "mt-4 text-2xl leading-snug font-medium tracking-tight",
							children: "An AI incident response agent that remembers how your organization solved problems before — and uses that knowledge to resolve today’s production incidents faster."
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border py-8 text-center text-xs text-subtle",
				children: "Hindsight Incident Copilot · demo memory responses until a live Hindsight bank is connected"
			})
		]
	});
}
//#endregion
export { Home as component };
