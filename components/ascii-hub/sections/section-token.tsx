"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { techSections } from "@/lib/sections-data"

const shadow = "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px"

// Oscilloscope component from old Surge section
const POINTS = 120

function Oscilloscope() {
  const ref = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let t = 0

    const draw = () => {
      const W = canvas.width
      const H = canvas.height
      ctx.clearRect(0, 0, W, H)

      // Scanline glow background lines
      ctx.strokeStyle = "rgba(255,255,255,0.03)"
      ctx.lineWidth = 1
      for (let y = 0; y < H; y += 4) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(W, y)
        ctx.stroke()
      }

      // Grid
      ctx.strokeStyle = "rgba(255,255,255,0.06)"
      ctx.lineWidth = 0.5
      const cols = 8
      const rows = 4
      for (let i = 0; i <= cols; i++) {
        const x = (W / cols) * i
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
      }
      for (let i = 0; i <= rows; i++) {
        const y = (H / rows) * i
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
      }

      // Floor and ceiling lines
      ctx.strokeStyle = "rgba(255,255,255,0.15)"
      ctx.lineWidth = 1
      ctx.setLineDash([4, 4])
      ctx.beginPath()
      ctx.moveTo(0, H * 0.7)
      ctx.lineTo(W, H * 0.7)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, H * 0.2)
      ctx.lineTo(W, H * 0.2)
      ctx.stroke()
      ctx.setLineDash([])

      // Main waveform
      ctx.strokeStyle = "rgba(255,255,255,0.85)"
      ctx.lineWidth = 2
      ctx.shadowColor = "rgba(255,255,255,0.5)"
      ctx.shadowBlur = 8
      ctx.beginPath()
      for (let i = 0; i <= POINTS; i++) {
        const x = (W / POINTS) * i
        const phase = (i / POINTS) * Math.PI * 2
        const base = 0.5
        const surge =
          Math.sin(phase * 2 + t * 0.5) * 0.15 +
          Math.sin(phase * 5 - t * 0.8) * 0.08 +
          Math.sin(phase * 0.5 + t * 0.3) * 0.1
        const normalized = Math.max(0.2, Math.min(0.7, base + surge))
        const y = H * normalized
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      ctx.stroke()

      // Secondary dim waveform (demand)
      ctx.strokeStyle = "rgba(255,255,255,0.2)"
      ctx.lineWidth = 1
      ctx.shadowBlur = 0
      ctx.beginPath()
      for (let i = 0; i <= POINTS; i++) {
        const x = (W / POINTS) * i
        const phase = (i / POINTS) * Math.PI * 2
        const y = H / 2 + (H / 6) * Math.sin(phase * 3 + t * 1.2 + 1.5)
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      ctx.stroke()

      t += 0.02
      animRef.current = requestAnimationFrame(draw)
    }

    const observer = new ResizeObserver(() => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    })
    observer.observe(canvas)
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    animRef.current = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(animRef.current)
      observer.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={ref}
      className="h-40 w-full border border-border bg-background"
      style={{ boxShadow: shadow }}
    />
  )
}

// Settlement Timeline from old Settlement section
interface ThreadLane {
  id: string
  label: string
  segments: { start: number; end: number; type: "work" | "wait" | "challenge" }[]
}

const staticLanes: ThreadLane[] = [
  {
    id: "relay",
    label: "Relay",
    segments: [
      { start: 0, end: 15, type: "work" },
      { start: 15, end: 100, type: "wait" },
    ],
  },
  {
    id: "escrow",
    label: "Escrow",
    segments: [
      { start: 0, end: 15, type: "wait" },
      { start: 15, end: 30, type: "work" },
      { start: 30, end: 90, type: "challenge" },
      { start: 90, end: 100, type: "work" },
    ],
  },
  {
    id: "watchtower",
    label: "Watchtower",
    segments: [
      { start: 0, end: 30, type: "wait" },
      { start: 30, end: 85, type: "work" },
      { start: 85, end: 100, type: "wait" },
    ],
  },
  {
    id: "provider",
    label: "Provider",
    segments: [
      { start: 0, end: 15, type: "work" },
      { start: 15, end: 90, type: "wait" },
      { start: 90, end: 100, type: "work" },
    ],
  },
]

function TimelineView() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const interval = setInterval(() => {
      setTick((t) => t + 1)
    }, 3000)
    return () => clearInterval(interval)
  }, [isInView])

  return (
    <div ref={ref} className="overflow-hidden border border-border" style={{ boxShadow: shadow }}>
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <div className="flex items-center gap-2">
          <motion.div
            className="h-2 w-2 bg-foreground"
            animate={isInView ? { opacity: [1, 0.3, 1] } : {}}
            transition={{ repeat: Infinity, duration: 1 }}
          />
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Settlement Timeline
          </span>
        </div>
        <span className="font-mono text-[10px] text-muted-foreground">0ms — 24h</span>
      </div>

      {/* Thread lanes */}
      {staticLanes.map((thread, i) => (
        <motion.div
          key={thread.id}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 + i * 0.1 }}
          className="flex items-center border-b border-border last:border-b-0"
        >
          <div className="flex w-20 flex-shrink-0 items-center gap-2 px-4 py-2">
            <div className="h-1.5 w-1.5 bg-foreground" />
            <span className="font-mono text-[10px] text-muted-foreground">{thread.label}</span>
          </div>
          <div className="relative flex-1 py-2 pr-4">
            <div className="h-3 w-full bg-border/30">
              {thread.segments.map((seg, j) => (
                <motion.div
                  key={`${tick}-${j}`}
                  className={`absolute top-2 h-3 ${
                    seg.type === "work" ? "bg-foreground"
                    : seg.type === "wait" ? "bg-foreground/20"
                    : "bg-muted-foreground/50"
                  }`}
                  style={{ left: `${seg.start}%`, width: `${seg.end - seg.start}%` }}
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.06 + j * 0.04, ease: "easeOut" }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      ))}

      {/* Legend */}
      <div className="flex gap-6 border-t border-border px-4 py-2">
        {[
          { label: "Working", cls: "bg-foreground" },
          { label: "Waiting", cls: "bg-foreground/20" },
          { label: "Challenge", cls: "bg-muted-foreground/50" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <div className={`h-2 w-4 ${l.cls}`} />
            <span className="font-mono text-[9px] text-muted-foreground">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// 7 stages pipeline
const stages = [
  {
    name: "POINTS",
    label: "Phase 0: Points + USDC",
    code: `1  // Phase 0: Points + USDC (Month 0-3)
2  provider.reward = {
3    usdc: transaction.amount * 0.80,
4    points: consumer.usdc_spent * RATE
5  }
6  relay.reward = { points: witness_count * RATE }
7  genesis_bonus = first_30_days ? 5x : 1x
8  max_monthly = 500_000 // per provider`,
    embed: null,
  },
  {
    name: "TGE",
    label: "Token Generation Event",
    code: `1  // Phase 1: TGE (Month 3)
2  token.total_supply = 1_000_000_000
3  token.initial_circulating = elastic_release()
4  
5  points_to_token = (points) => {
6    return points * CONVERSION_RATE
7  }
8  
9  // Points convert to TOKEN at TGE`,
    embed: null,
  },
  {
    name: "STAKING",
    label: "Staking & Governance",
    code: `1  // Phase 2: Staking (Month 4+)
2  stake(amount) {
3    provider.stake += amount
4    provider.priority = f(stake_amount)
5    provider.slash_risk = amount * 0.5
6  }
7  
8  unstake() {
9    delay = 7 days // cooldown period
10 }`,
    embed: null,
  },
  {
    name: "PRICING",
    label: "Surge Pricing Engine",
    code: `1  // Dynamic Pricing Formula
2  P(t) = P_base × S(t)
3  
4  S(t) = α × S(t-1) + (1-α) × D(t)/C(t)
5  
6  where:
7    α = 0.8 (smoothing)
8    P_floor ≤ P(t) ≤ P_ceiling
9    Floor: 30% | Ceiling: 80%`,
    embed: "oscilloscope",
  },
  {
    name: "SETTLE",
    label: "Optimistic Settlement",
    code: `1  // Settlement: Optimistic Finality
2  challenge_window = 24 hours
3  
4  relay.submit(witness_data)
5  escrow.hold(payment)
6  watchtower.scan(fraud_proof)
7  
8  if (!challenged) provider.payout()
9  else slash(50%) && reward(30%)`,
    embed: "timeline",
  },
  {
    name: "BURN",
    label: "Deflationary Mechanism",
    code: `1  // Continuous: Token Burn
2  protocol_fee = transaction.amount * 0.10
3  burn_amount = protocol_fee * 0.50
4  treasury_amount = protocol_fee * 0.50
5  
6  // Total burned: ~1.2M TOKEN
7  // Deflationary pressure increases
8  // as network usage grows`,
    embed: null,
  },
  {
    name: "DAO",
    label: "Decentralized Governance",
    code: `1  // Phase 3: DAO (Month 6+)
2  proposal.create(description, actions) {
3    require(staker.balance >= MIN_STAKE)
4  }
5  
6  vote(proposal_id, support) {
7    weight = staker.token_balance
8  }
9  
10 execute(proposal_id) {
11   require(votes.for > votes.against)
12 }`,
    embed: null,
  },
]

export function SectionToken() {
  const section = techSections.find(s => s.id === "token-economics")!
  const [activeStage, setActiveStage] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div id="token-economics" ref={ref} className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-32">
      {/* Header with ghost number */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 flex items-end gap-6"
      >
        <span className="font-pixel-line text-7xl font-bold leading-none text-foreground/[0.08] md:text-9xl">
          {section.number}
        </span>
        <div className="flex-1 pb-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{section.subtitle}</span>
          </div>
          <h2 className="mt-2 font-pixel-line text-3xl font-bold text-foreground md:text-5xl">
            {section.title}
          </h2>
          <p className="mt-4 max-w-2xl font-mono text-xs leading-relaxed text-muted-foreground">{section.description}</p>
        </div>
      </motion.div>

      {/* IDE-like panel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="overflow-hidden border border-border"
        style={{ boxShadow: shadow }}
      >
        {/* Tab bar - 7 stages */}
        <div className="flex overflow-x-auto border-b border-border">
          {stages.map((stage, i) => (
            <button
              key={stage.name}
              onClick={() => setActiveStage(i)}
              className={`flex items-center gap-2 border-r border-border px-4 py-3 font-mono text-xs transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-foreground focus-visible:outline-none ${
                activeStage === i
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              }`}
            >
              <span className="text-[10px] opacity-60">{String(i + 1).padStart(2, "0")}</span>
              <span className="whitespace-nowrap">{stage.name}</span>
            </button>
          ))}
        </div>

        {/* Content area */}
        <div className="grid lg:grid-cols-3">
          {/* Code pane (2 cols) */}
          <div className="border-b border-border lg:col-span-2 lg:border-b-0 lg:border-r">
            <div className="flex items-center justify-between border-b border-border px-4 py-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {stages[activeStage].label}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">
                Stage {activeStage + 1}/{stages.length}
              </span>
            </div>
            <motion.div
              key={activeStage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <pre className="overflow-x-auto p-6 font-mono text-xs leading-relaxed text-foreground">
                {stages[activeStage].code}
              </pre>
              
              {/* Embedded visualizations */}
              {stages[activeStage].embed === "oscilloscope" && (
                <div className="border-t border-border p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="h-2 w-2 animate-pulse bg-foreground" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">SIGNAL — SURGE WAVEFORM</span>
                  </div>
                  <Oscilloscope />
                </div>
              )}
              {stages[activeStage].embed === "timeline" && (
                <div className="border-t border-border p-4">
                  <TimelineView />
                </div>
              )}
            </motion.div>
          </div>

          {/* Info pane */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 border-b border-border px-4 py-2">
              <div className="h-1.5 w-1.5 bg-foreground" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Pipeline Info</span>
            </div>

            {/* Pipeline progress */}
            <div className="border-b border-border p-4">
              <div className="flex gap-1">
                {stages.map((_, i) => (
                  <motion.div
                    key={i}
                    className={`h-1.5 flex-1 ${i <= activeStage ? "bg-foreground" : "bg-border"}`}
                    initial={false}
                    animate={{ opacity: i <= activeStage ? 1 : 0.3 }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
              <div className="mt-2 flex justify-between font-mono text-[10px] text-muted-foreground">
                <span>Points</span>
                <span>DAO</span>
              </div>
            </div>

            {/* Specs */}
            <div className="flex-1 p-4">
              <div className="flex flex-col gap-3">
                {section.specs.map((spec, i) => (
                  <div key={spec.label} className="flex flex-col gap-0.5 font-mono text-xs">
                    <span className="text-[10px] text-muted-foreground">{spec.label}</span>
                    <span className="font-bold text-foreground">{spec.value}</span>
                    {i < section.specs.length - 1 && <div className="mt-2 h-px bg-border" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
