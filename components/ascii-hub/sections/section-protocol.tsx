"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { techSections } from "@/lib/sections-data"

const shadow = "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px"

const flowSteps = [
  { num: "1", text: "Consumer encrypts prompt, sends to Relay" },
  { num: "2", text: "Relay verifies identity + balance" },
  { num: "3", text: "Relay strips identity, forwards to Provider" },
  { num: "4", text: "Relay submits settlement witness on-chain" },
  { num: "5", text: "Provider processes in WASM sandbox, returns result" },
  { num: "6", text: "Result returned to Consumer via Relay" },
]

const stats = [
  { label: "Providers Online", value: "1,247" },
  { label: "Relays Active", value: "8,420" },
  { label: "24h Volume", value: "$8.4K" },
  { label: "Models Available", value: "12" },
]

function ArchitectureFlow() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div ref={ref} className="relative">
      {/* Desktop flow - horizontal */}
      <div className="hidden lg:block">
        <div className="relative flex items-start justify-between gap-4">
          {/* Consumer */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="flex flex-col items-center"
          >
            <div className="flex h-24 w-32 flex-col items-center justify-center border border-foreground bg-foreground text-background">
              <span className="font-mono text-xs font-bold">CONSUMER</span>
              <span className="font-mono text-[10px]">clawd</span>
            </div>
            <span className="mt-2 font-mono text-[10px] text-muted-foreground">Encrypt + Send</span>
          </motion.div>

          {/* Arrow 1 */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="mt-12 flex items-center"
            style={{ transformOrigin: "left" }}
          >
            <div className="h-px w-12 border-t border-dashed border-foreground" />
            <div className="h-0 w-0 border-y-[4px] border-l-[6px] border-y-transparent border-l-foreground" />
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 font-mono text-[10px] text-muted-foreground">1</span>
          </motion.div>

          {/* Relay */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="flex flex-col items-center"
          >
            <div className="flex h-24 w-40 flex-col items-center justify-center border-2 border-foreground bg-background">
              <span className="font-mono text-xs font-bold">RELAY</span>
              <div className="mt-1 flex gap-1 font-mono text-[9px] text-muted-foreground">
                <span className="border border-border px-1">VERIFY</span>
                <span className="border border-border px-1">STRIP</span>
                <span className="border border-border px-1">WITNESS</span>
              </div>
            </div>
            <span className="mt-2 font-mono text-[10px] text-muted-foreground">2, 3, 4</span>
          </motion.div>

          {/* Arrow 2 */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.3 }}
            className="mt-12 flex items-center"
            style={{ transformOrigin: "left" }}
          >
            <div className="h-px w-12 border-t border-dashed border-foreground" />
            <div className="h-0 w-0 border-y-[4px] border-l-[6px] border-y-transparent border-l-foreground" />
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 font-mono text-[10px] text-muted-foreground">5</span>
          </motion.div>

          {/* Provider */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="flex flex-col items-center"
          >
            <div className="flex h-24 w-32 flex-col items-center justify-center border border-foreground bg-background">
              <span className="font-mono text-xs font-bold">PROVIDER</span>
              <span className="mt-1 border border-border px-2 py-0.5 font-mono text-[9px]">WASM SANDBOX</span>
            </div>
            <span className="mt-2 font-mono text-[10px] text-muted-foreground">Process + Return</span>
          </motion.div>
        </div>

        {/* Solana below Relay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="mt-4 flex justify-center"
        >
          <div className="relative flex flex-col items-center">
            <div className="h-8 w-px border-l border-dashed border-foreground" />
            <div className="flex h-16 w-32 flex-col items-center justify-center border border-foreground bg-secondary/50">
              <span className="font-mono text-xs font-bold">SOLANA</span>
              <span className="font-mono text-[9px] text-muted-foreground">CHAIN</span>
            </div>
            <span className="mt-1 font-mono text-[10px] text-muted-foreground">Settlement</span>
          </div>
        </motion.div>
      </div>

      {/* Mobile flow - vertical */}
      <div className="flex flex-col items-center gap-4 lg:hidden">
        {/* Consumer */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="flex h-20 w-full max-w-xs flex-col items-center justify-center border border-foreground bg-foreground text-background"
        >
          <span className="font-mono text-xs font-bold">CONSUMER / clawd</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <div className="h-6 w-px border-l border-dashed border-foreground" />
          <span className="font-mono text-[10px] text-muted-foreground">1</span>
          <div className="h-6 w-px border-l border-dashed border-foreground" />
        </motion.div>

        {/* Relay */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex h-20 w-full max-w-xs flex-col items-center justify-center border-2 border-foreground"
        >
          <span className="font-mono text-xs font-bold">RELAY</span>
          <div className="mt-1 flex gap-1 font-mono text-[9px] text-muted-foreground">
            <span className="border border-border px-1">VERIFY</span>
            <span className="border border-border px-1">STRIP</span>
            <span className="border border-border px-1">WITNESS</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center"
        >
          <div className="h-6 w-px border-l border-dashed border-foreground" />
          <span className="font-mono text-[10px] text-muted-foreground">5</span>
          <div className="h-6 w-px border-l border-dashed border-foreground" />
        </motion.div>

        {/* Provider */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="flex h-20 w-full max-w-xs flex-col items-center justify-center border border-foreground"
        >
          <span className="font-mono text-xs font-bold">PROVIDER</span>
          <span className="mt-1 border border-border px-2 py-0.5 font-mono text-[9px]">WASM SANDBOX</span>
        </motion.div>

        {/* Solana */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-4 flex flex-col items-center"
        >
          <span className="font-mono text-[10px] text-muted-foreground">Settlement Layer</span>
          <div className="h-4 w-px border-l border-dashed border-foreground" />
          <div className="flex h-16 w-full max-w-xs flex-col items-center justify-center border border-foreground bg-secondary/50">
            <span className="font-mono text-xs font-bold">SOLANA CHAIN</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function BootSequence() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [lines, setLines] = useState<string[]>([])
  const bootLines = [
    "[  0.000000] Veil Protocol v1.0.0 initializing...",
    "[  0.000012] Loading cryptographic modules...",
    "[  0.000034] X25519 key exchange: READY",
    "[  0.000089] ChaCha20-Poly1305: READY",
    "[  0.001204] Connecting to Solana mainnet...",
    "[  0.002100] Registry program: verified",
    "[  0.003400] Escrow program: verified",
    "[  0.004200] Staking program: verified",
    "[  0.005100] Loading relay nodes...",
    "[  OK  ] Protocol ready. 1,247 providers online.",
  ]

  useEffect(() => {
    if (!isInView) return
    let i = 0
    const interval = setInterval(() => {
      if (i < bootLines.length) {
        const currentLine = bootLines[i]
        i++
        setLines((prev) => [...prev, currentLine])
      } else {
        clearInterval(interval)
      }
    }, 150)
    return () => clearInterval(interval)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView])

  return (
    <div ref={ref} className="bg-background p-6 font-mono text-xs leading-relaxed text-foreground">
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={
            typeof line === "string" && line.startsWith("[  OK")
              ? "mt-2 font-bold text-foreground"
              : "text-muted-foreground"
          }
        >
          {line}
        </motion.div>
      ))}
      {lines.length < bootLines.length && (
        <span className="animate-blink inline-block text-foreground">{"_"}</span>
      )}
    </div>
  )
}

export function SectionProtocol() {
  const section = techSections.find(s => s.id === "protocol-design")!
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-32">
      {/* Section label with ghost number */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-6 flex items-end gap-6"
      >
        <span className="font-pixel-line text-7xl font-bold leading-none text-foreground/[0.08] md:text-9xl">
          {section.number}
        </span>
        <div className="flex-1 pb-2">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
          </div>
        </div>
      </motion.div>

      {/* Title and description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="font-pixel-line text-3xl font-bold text-foreground md:text-5xl">{section.title}</h2>
        <p className="mt-4 max-w-2xl font-mono text-sm leading-relaxed text-muted-foreground">{section.description}</p>
      </motion.div>

      {/* Architecture Flow Diagram */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 border border-border p-6"
        style={{ boxShadow: shadow }}
      >
        <div className="mb-6 flex items-center gap-2">
          <div className="h-1.5 w-1.5 bg-foreground" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Request Flow Architecture
          </span>
        </div>
        <ArchitectureFlow />

        {/* Flow steps */}
        <div className="mt-8 grid gap-2 border-t border-border pt-6 md:grid-cols-2 lg:grid-cols-3">
          {flowSteps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
              className="flex items-start gap-2 font-mono text-xs"
            >
              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center bg-foreground text-[10px] text-background">
                {step.num}
              </span>
              <span className="text-muted-foreground">{step.text}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Stats cards */}
      <div className="mb-12 grid gap-4 md:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * i }}
            className="border border-border p-4"
            style={{ boxShadow: shadow }}
          >
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{stat.label}</span>
            <div className="mt-1 font-mono text-2xl font-bold text-foreground">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Giant terminal window */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="overflow-hidden border border-border"
        style={{ boxShadow: shadow }}
      >
        {/* Terminal title bar */}
        <div className="flex items-center justify-between border-b border-border bg-foreground px-4 py-2">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 border border-background/30 bg-background" />
              <div className="h-2.5 w-2.5 border border-background/30 bg-background/60" />
              <div className="h-2.5 w-2.5 border border-background/30 bg-background/30" />
            </div>
            <span className="font-mono text-xs text-background">
              veil@protocol:~
            </span>
          </div>
          <span className="font-mono text-[10px] text-background/50">bash 5.2.15</span>
        </div>

        {/* Terminal body with two columns */}
        <div className="grid lg:grid-cols-5">
          {/* Left: Boot sequence (3 cols) */}
          <div className="border-b border-border lg:col-span-3 lg:border-b-0 lg:border-r">
            <div className="border-b border-border px-4 py-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Boot Sequence
              </span>
            </div>
            <BootSequence />
          </div>

          {/* Right: System info panel (2 cols) */}
          <div className="flex flex-col lg:col-span-2">
            <div className="border-b border-border px-4 py-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                System Overview
              </span>
            </div>

            {/* Title area */}
            <div className="border-b border-border p-6">
              <h3 className="font-pixel-line text-2xl font-bold text-foreground">
                Protocol Core
              </h3>
              <p className="mt-3 font-mono text-xs leading-relaxed text-muted-foreground">
                Decentralized inference layer with cryptographic privacy guarantees.
              </p>
            </div>

            {/* Specs as system parameters */}
            <div className="flex-1 p-4">
              <div className="flex flex-col gap-3">
                {section.specs.map((spec, i) => (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-start gap-2 font-mono text-xs"
                  >
                    <span className="text-muted-foreground">{">"}</span>
                    <span className="text-muted-foreground">{spec.label}:</span>
                    <span className="font-bold text-foreground">{spec.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
