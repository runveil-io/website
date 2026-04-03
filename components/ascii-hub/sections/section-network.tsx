"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { techSections } from "@/lib/sections-data"

const shadow = "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px"

const nodes = [
  { id: "C1", x: 15, y: 15, type: "consumer" },
  { id: "R1", x: 45, y: 10, type: "relay" },
  { id: "R2", x: 75, y: 15, type: "relay" },
  { id: "P1", x: 5, y: 45, type: "provider" },
  { id: "R3", x: 35, y: 50, type: "relay" },
  { id: "R4", x: 65, y: 45, type: "relay" },
  { id: "P2", x: 95, y: 50, type: "provider" },
  { id: "R5", x: 25, y: 80, type: "relay" },
  { id: "P3", x: 55, y: 85, type: "provider" },
  { id: "C2", x: 85, y: 80, type: "consumer" },
]

const connections = [
  [0, 1], [1, 2], [0, 4], [1, 4], [2, 5],
  [3, 4], [4, 5], [5, 6], [4, 7], [7, 8],
  [5, 8], [8, 9], [2, 9],
]

function NetworkMap() {
  return (
    <div className="relative aspect-[2/1] w-full overflow-hidden border border-border bg-background p-4" style={{ boxShadow: shadow }}>
      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.05]" aria-hidden="true">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={`h-${i}`} className="absolute h-px w-full bg-foreground" style={{ top: `${(i + 1) * 10}%` }} />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={`v-${i}`} className="absolute top-0 h-full w-px bg-foreground" style={{ left: `${(i + 1) * 10}%` }} />
        ))}
      </div>

      {/* Connections as dashed lines */}
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        {connections.map(([from, to], i) => (
          <motion.line
            key={i}
            x1={`${nodes[from].x}%`}
            y1={`${nodes[from].y}%`}
            x2={`${nodes[to].x}%`}
            y2={`${nodes[to].y}%`}
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 4"
            className="text-border"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 + i * 0.05 }}
          />
        ))}
      </svg>

      {/* Nodes */}
      {nodes.map((node, i) => (
        <motion.div
          key={node.id}
          className="absolute flex flex-col items-center"
          style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 + i * 0.08, type: "spring" }}
        >
          <div className={`flex h-8 w-8 items-center justify-center border font-mono text-[10px] font-bold ${
            node.type === "provider" ? "border-foreground bg-foreground text-background"
            : node.type === "consumer" ? "border-foreground bg-background text-foreground"
            : "border-border bg-background text-muted-foreground"
          }`}>
            {node.type === "provider" ? "P" : node.type === "consumer" ? "C" : "R"}
          </div>
          {node.type !== "relay" && (
            <motion.div
              className="mt-1 h-1 w-1 bg-foreground"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
            />
          )}
        </motion.div>
      ))}

      {/* Legend */}
      <div className="absolute bottom-2 right-2 flex gap-3 font-mono text-[9px] text-muted-foreground">
        <span>C = Consumer</span>
        <span>R = Relay</span>
        <span>P = Provider</span>
      </div>
    </div>
  )
}

const installTabs = [
  {
    id: "provide",
    label: "PROVIDE",
    code: `# Share idle AI capacity

$ npx veil init --provider
$ veil provide start

> Provider registered.
> Wallet: 7xK2...3mNp (auto-created)
> Models: claude-sonnet, claude-opus
> Status: ONLINE
> _`,
  },
  {
    id: "consume",
    label: "CONSUME",
    code: `# Access AI models — accountless, privacy-preserving

$ npx veil init
$ veil start

> Local gateway: http://localhost:4000/v1
> Use this URL in Cursor/Windsurf/any OpenAI client
> Privacy: split visibility (accountless routing)
> Status: READY`,
  },
  {
    id: "relay",
    label: "RELAY",
    code: `# Join the network, earn passively

$ clawd setup
> Join the Veil network? [Y/n] Y
> Relay: active (0 resource usage)
> Earning: TOKEN passively
> You are now part of the network.`,
  },
]

export function SectionNetwork() {
  const section = techSections.find(s => s.id === "network-install")!
  const [activeTab, setActiveTab] = useState(0)

  const metrics = [
    { label: "Nodes Online", value: "2 (testnet)", pct: 100 },
    { label: "Throughput", value: "Adaptive", pct: 75 },
    { label: "Latency p99", value: "<50ms", pct: 12 },
    { label: "Packet Loss", value: "0.001%", pct: 1 },
  ]

  return (
    <div id="network-install" className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-32">
      {/* Inverted header band */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col gap-4 bg-foreground p-8"
        style={{ boxShadow: shadow }}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-end gap-6">
            <span className="font-pixel-line text-7xl font-bold leading-none text-background/[0.15] md:text-9xl">
              {section.number}
            </span>
            <div className="pb-2">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-background/50">{section.subtitle}</span>
              </div>
              <h2 className="mt-2 font-pixel-line text-3xl font-bold text-background md:text-5xl">
                {section.title}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              className="h-2.5 w-2.5 bg-background"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
            <span className="font-mono text-xs text-background/70">LIVE</span>
          </div>
        </div>
        <p className="max-w-2xl font-mono text-xs leading-relaxed text-background/60">
          {section.description}
        </p>
      </motion.div>

      {/* Bento grid */}
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {/* Network map (2 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="lg:col-span-2"
        >
          <NetworkMap />
        </motion.div>

        {/* Metrics stack */}
        <div className="flex flex-col gap-4">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="flex flex-col gap-2 border border-border p-4"
              style={{ boxShadow: shadow }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{m.label}</span>
                <span className="font-mono text-sm font-bold text-foreground">{m.value}</span>
              </div>
              <div className="h-1 w-full bg-border">
                <motion.div
                  className="h-full bg-foreground"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${m.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.4 + i * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Install terminal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-4 border border-border"
        style={{ boxShadow: shadow }}
      >
        {/* Tab bar */}
        <div className="flex border-b border-border">
          {installTabs.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(i)}
              className={`flex-1 px-4 py-3 font-mono text-xs transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-foreground focus-visible:outline-none ${
                activeTab === i
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              }`}
            >
              [{tab.label}]
            </button>
          ))}
        </div>
        {/* Code content */}
        <div className="p-4">
          <div className="mb-2 flex items-center gap-2">
            <span className="font-mono text-[10px] text-muted-foreground">veil@protocol ~ install</span>
          </div>
          <motion.pre
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono text-xs leading-relaxed text-muted-foreground"
          >
            {installTabs[activeTab].code}
            <span className="animate-blink">{"█"}</span>
          </motion.pre>
        </div>
      </motion.div>

      {/* Specs row as horizontal badges */}
      <div className="mt-4 flex flex-wrap gap-3">
        {section.specs.map((spec, i) => (
          <motion.div
            key={spec.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.08 }}
            className="flex items-center gap-2 border border-border px-4 py-2 font-mono text-xs"
            style={{ boxShadow: shadow }}
          >
            <span className="text-muted-foreground">{spec.label}</span>
            <span className="text-foreground font-bold">{spec.value}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
