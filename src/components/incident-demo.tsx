import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import {
  SAMPLE_PROMPTS,
  WELCOME,
  matchIncident,
  type Evidence,
} from "@/lib/incident-knowledge";
import { cn } from "@/lib/utils";

type Message = { id: number; role: "user" | "agent"; text: string };

export function IncidentDemo() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: "agent", text: WELCOME },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [evidence, setEvidence] = useState<Evidence[]>([]);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  function send(text?: string) {
    const userText = (text ?? input).trim();
    if (!userText || typing) return;
    setMessages((prev) => [...prev, { id: Date.now(), role: "user", text: userText }]);
    setInput("");
    setTyping(true);
    setEvidence([]);
    const reply = matchIncident(userText);
    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "agent", text: reply.recommendation },
      ]);
      setEvidence(reply.evidence);
      setTyping(false);
    }, 900);
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
      <div className="flex items-center gap-2 border-b border-border bg-elevated px-4 py-3">
        <span className="size-2 rounded-full bg-danger/80" />
        <span className="size-2 rounded-full bg-warn/80" />
        <span className="size-2 rounded-full bg-ok/80" />
        <span className="ml-2 text-xs text-subtle">Incident Copilot · memory bank org-incidents</span>
      </div>
      <div className="grid min-h-[28rem] lg:grid-cols-2">
        <div className="flex min-h-0 flex-col border-b border-border lg:border-r lg:border-b-0">
          <div ref={listRef} className="flex max-h-[22rem] flex-1 flex-col gap-3 overflow-y-auto p-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "max-w-[92%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
                  m.role === "user"
                    ? "ml-auto rounded-br-xs bg-accent text-accent-fg"
                    : "rounded-bl-xs border border-border bg-elevated text-fg",
                )}
              >
                {m.text}
              </div>
            ))}
            {typing ? (
              <div className="w-fit rounded-lg rounded-bl-xs border border-border bg-elevated px-3.5 py-3">
                <span className="flex gap-1">
                  <span className="size-1.5 animate-pulse rounded-full bg-subtle" />
                  <span className="size-1.5 animate-pulse rounded-full bg-subtle [animation-delay:120ms]" />
                  <span className="size-1.5 animate-pulse rounded-full bg-subtle [animation-delay:240ms]" />
                </span>
              </div>
            ) : null}
          </div>
          <div className="border-t border-border p-3">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") send();
                }}
                placeholder="Describe the incident or paste an alert"
                className="h-11 min-w-0 flex-1 rounded-sm border border-border bg-bg px-3 text-sm text-fg placeholder:text-subtle outline-none focus:border-border-strong"
              />
              <button
                type="button"
                onClick={() => send()}
                className="inline-flex h-11 min-w-11 items-center justify-center rounded-sm bg-accent px-4 text-sm font-medium text-accent-fg transition-opacity duration-150 hover:opacity-90 active:scale-[0.98]"
                aria-label="Send"
              >
                <Send className="size-4" />
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {SAMPLE_PROMPTS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => send(p)}
                  className="rounded-full border border-border bg-elevated px-3 py-1.5 text-left text-xs text-muted transition-colors duration-150 hover:border-border-strong hover:text-fg"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
        <aside className="max-h-[28rem] overflow-y-auto bg-bg p-4">
          <p className="mb-3 text-[11px] font-medium tracking-wider text-subtle uppercase">
            Retrieved evidence
          </p>
          {evidence.length === 0 ? (
            <p className="text-sm text-subtle">
              Memories appear here after you describe an incident — titles, snippets, and similarity.
            </p>
          ) : (
            <div className="space-y-2.5">
              {evidence.map((e) => (
                <article key={e.title} className="rounded-md border border-border bg-surface p-3">
                  <h4 className="text-sm font-medium text-fg">{e.title}</h4>
                  <p className="mt-0.5 text-xs text-subtle">{e.meta}</p>
                  <p className="mt-2 text-sm text-muted">{e.snippet}</p>
                  <div className="mt-2 h-1 overflow-hidden rounded-full bg-elevated">
                    <div
                      className="h-full rounded-full bg-ok"
                      style={{ width: `${e.similarity}%` }}
                    />
                  </div>
                  <p className="mt-1 font-mono text-xs text-subtle tabular-nums">
                    {e.similarity}% similarity
                  </p>
                </article>
              ))}
            </div>
          )}
          <p className="mt-6 mb-3 text-[11px] font-medium tracking-wider text-subtle uppercase">
            Memory bank
          </p>
          <ul className="space-y-2 text-sm">
            {[
              ["Incidents retained", "1,247"],
              ["Post-mortems", "892"],
              ["Runbooks", "156"],
            ].map(([label, value]) => (
              <li
                key={label}
                className="flex items-center justify-between rounded-md border border-border bg-surface px-3 py-2"
              >
                <span className="text-muted">{label}</span>
                <span className="font-mono tabular-nums">{value}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
