"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { techSections } from "@/lib/sections-data"
import { ArrowRight } from "lucide-react"

const shadow = "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px"

const rules = [
  { id: "R1", text: "Code that passes verification can be merged." },
  { id: "R2", text: "Merge requires K independent stake signatures." },
  { id: "R3", text: "Protected modules require higher threshold." },
  { id: "R4", text: "Surviving code earns future revenue share." },
]

function RulesTerminal() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [visibleRules, setVisibleRules] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const interval = setInterval(() => {
      setVisibleRules((v) => {
        if (v >= rules.length) {
          clearInterval(interval)
          return v
        }
        return v + 1
      })
    }, 400)
    return () => clearInterval(interval)
  }, [isInView])

  return (
    <div ref={ref} className="border border-border" style={{ boxShadow: shadow }}>
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="h-1.5 w-1.5 bg-foreground" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          VEIL BUILD PROTOCOL — 4 RULES
        </span>
      </div>
      <div className="p-6">
        <div className="flex flex-col gap-4 font-mono text-sm">
          {rules.map((rule, i) => (
            <motion.div
              key={rule.id}
              initial={{ opacity: 0, x: -10 }}
              animate={i < visibleRules ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3 }}
              className="flex gap-3"
            >
              <span className="font-bold text-foreground">{rule.id}</span>
              <span className="text-muted-foreground">{rule.text}</span>
            </motion.div>
          ))}
        </div>
        {visibleRules >= rules.length && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 font-mono text-xs text-muted-foreground/60"
          >
            {"Everything else? Not specified. clawd figures it out."}
          </motion.p>
        )}
      </div>
    </div>
  )
}

const flywheelSteps = [
  { name: "INFERENCE", desc: "Network generates revenue" },
  { name: "TREASURY", desc: "Funds accumulate" },
  { name: "BUILD REWARDS", desc: "Contributors earn share" },
  { name: "BETTER PROTOCOL", desc: "Code improves" },
]

function FlywheelDiagram() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const interval = setInterval(() => {
      setActiveStep((s) => (s + 1) % flywheelSteps.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [isInView])

  return (
    <div ref={ref} className="mx-auto max-w-3xl">
      {/* Four boxes in a cycle */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {flywheelSteps.map((step, i) => (
          <motion.div
            key={step.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className="relative"
          >
            <div
              className={`flex flex-col items-center border p-4 text-center transition-all duration-300 ${
                activeStep === i
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-foreground"
              }`}
              style={{ boxShadow: shadow }}
            >
              <span className="font-mono text-xs font-bold">{step.name}</span>
              <span className={`mt-1 font-mono text-[10px] ${activeStep === i ? "text-background/70" : "text-muted-foreground"}`}>
                {step.desc}
              </span>
            </div>
            {/* Arrow to next */}
            {i < flywheelSteps.length - 1 && (
              <div className="absolute -right-2 top-1/2 hidden -translate-y-1/2 md:block" aria-hidden="true">
                <motion.div
                  animate={{ x: activeStep === i ? [0, 4, 0] : 0 }}
                  transition={{ duration: 0.5, repeat: activeStep === i ? Infinity : 0 }}
                >
                  <ArrowRight size={16} className="text-muted-foreground" />
                </motion.div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Center text */}
      <div className="mt-8 text-center">
        <p className="font-mono text-sm font-bold text-foreground">Two lungs. One organism.</p>
        <p className="mt-2 font-mono text-xs text-muted-foreground">
          The inference network funds development. Development makes the inference network better.
        </p>
      </div>

      {/* Loop arrow back to start */}
      <div className="mt-4 flex justify-center">
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="font-mono text-[10px] text-muted-foreground"
        >
          {"← cycle repeats →"}
        </motion.div>
      </div>
    </div>
  )
}

const terminalLines = [
  "$ clawd build",
  "Scanning veil-protocol repos...",
  "Found: 2 failing tests, 1 desired state",
  "[1] core — relay timeout not handled",
  "[2] core — TODO at src/provider.ts:42",
  "[3] core — DESIRED: provider reputation (500 PTS) *",
  "Select (or 'auto'): auto",
  "Working...",
  "All tests passing",
  "PR #42 created → awaiting verification",
]

function BuildTerminal() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const interval = setInterval(() => {
      setVisibleLines((v) => {
        if (v >= terminalLines.length) {
          clearInterval(interval)
          return v
        }
        return v + 1
      })
    }, 300)
    return () => clearInterval(interval)
  }, [isInView])

  return (
    <div ref={ref} className="border border-border" style={{ boxShadow: shadow }}>
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="h-1.5 w-1.5 bg-foreground" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          clawd build — autonomous development
        </span>
      </div>
      <div className="p-6">
        <div className="flex flex-col gap-1 font-mono text-xs">
          {terminalLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={i < visibleLines ? { opacity: 1 } : {}}
              transition={{ duration: 0.15 }}
              className={
                line.startsWith("$") ? "text-foreground" :
                line.includes("All tests passing") ? "text-foreground font-bold" :
                line.includes("PR #42") ? "text-foreground" :
                "text-muted-foreground"
              }
            >
              {line.includes("All tests passing") ? "✓ " + line : line}
            </motion.div>
          ))}
          {visibleLines < terminalLines.length && (
            <span className="animate-blink text-foreground">{"█"}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export function SectionBuild() {
  const section = techSections.find(s => s.id === "build")!
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-32">
      {/* Header with ghost number */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 flex items-end gap-6"
      >
        <span className="font-pixel-line text-7xl font-bold leading-none text-foreground/[0.08] md:text-9xl">
          {section.number}
        </span>
        <div className="pb-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{section.subtitle}</span>
          <h2 className="mt-2 font-pixel-line text-3xl font-bold text-foreground md:text-5xl">
            {section.title}
          </h2>
        </div>
      </motion.div>

      {/* Two columns: narrative + rules terminal */}
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
        {/* Left: Narrative text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6"
        >
          <p className="font-mono text-sm leading-relaxed text-muted-foreground">
            {section.description}
          </p>
          <p className="font-mono text-sm leading-relaxed text-muted-foreground">
            Linux wasn't planned by a committee. Wikipedia wasn't designed by an architect. Bitcoin wasn't managed by a CEO.
          </p>
          <p className="font-mono text-sm leading-relaxed text-muted-foreground">
            They were given rules. The rest emerged.
          </p>
          <p className="font-mono text-sm leading-relaxed text-foreground font-bold">
            Veil Build works the same way.
          </p>
        </motion.div>

        {/* Right: Rules terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          <RulesTerminal />
        </motion.div>
      </div>

      {/* Flywheel diagram */}
      <div className="mt-20">
        <FlywheelDiagram />
      </div>

      {/* clawd build terminal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20"
      >
        <BuildTerminal />
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20 text-center"
      >
        <p className="font-mono text-sm text-foreground">
          Linux wasn't planned. Wikipedia wasn't designed. Bitcoin wasn't managed.
        </p>
        <p className="mt-2 font-mono text-xs text-muted-foreground">
          They were given rules. The rest emerged.
        </p>
        <button className="mt-8 inline-flex items-center gap-2 bg-foreground px-8 py-3 font-mono text-sm text-background transition-all duration-200 hover:opacity-80 focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none">
          Start Building
          <ArrowRight size={16} />
        </button>
      </motion.div>

      {/* Bottom specs row */}
      <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
        {section.specs.map((spec, i) => (
          <motion.div
            key={spec.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="flex flex-col items-center border border-border p-4 text-center"
            style={{ boxShadow: shadow }}
          >
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{spec.label}</span>
            <span className="mt-1 font-mono text-lg font-bold text-foreground">{spec.value}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
