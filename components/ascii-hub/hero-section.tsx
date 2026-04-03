"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { motion } from "framer-motion"

const ASCII_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*+=-~^"

function useAsciiFrame(rows: number, cols: number, enabled: boolean) {
  const [frame, setFrame] = useState("")
  const rafRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)

  const generateFrame = useCallback(() => {
    let result = ""
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const distFromCenter = Math.abs(c - cols / 2) / (cols / 2)
        const vertDist = Math.abs(r - rows / 2) / (rows / 2)
        const dist = Math.sqrt(distFromCenter ** 2 + vertDist ** 2)
        if (Math.random() > dist * 0.7) {
          result += ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)]
        } else {
          result += " "
        }
      }
      if (r < rows - 1) result += "\n"
    }
    return result
  }, [rows, cols])

  useEffect(() => {
    if (!enabled) {
      setFrame(generateFrame())
      return
    }

    const animate = (time: number) => {
      if (time - lastTimeRef.current > 120) {
        lastTimeRef.current = time
        setFrame(generateFrame())
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [enabled, generateFrame])

  return frame
}

function TerminalAnimation() {
  const [lines, setLines] = useState<string[]>([])
  const terminalLines = [
    '> claude "explain quantum computing"',
    '  ⚠ API rate limit reached.',
    '  Switching to Veil network...',
    '  ✓ Provider found (latency: 45ms)',
    '  ✓ Encrypted with X25519',
    '  Quantum computing uses qubits...',
    '  Cost: $0.003 (142 tokens)',
    '  Provider: accountless          [OK]',
  ]

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < terminalLines.length) {
        setLines((prev) => [...prev, terminalLines[i]])
        i++
      } else {
        clearInterval(interval)
      }
    }, 200)
    return () => clearInterval(interval)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="border border-border bg-secondary/50">
      {/* Terminal header */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="h-2 w-2 bg-foreground" />
        <div className="h-2 w-2 bg-muted-foreground/50" />
        <div className="h-2 w-2 bg-muted-foreground/30" />
        <span className="ml-2 font-mono text-[10px] text-muted-foreground">
          veil@protocol ~ v1.0.0
        </span>
      </div>
      {/* Terminal body */}
      <pre className="p-4 font-mono text-[10px] leading-relaxed text-foreground/80 md:text-xs">
        <code>
{`+--------------------------------------+
| veil@protocol ~ v1.0.0              |
+--------------------------------------+`}
        </code>
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-muted-foreground"
          >
            {`| ${line.padEnd(36)}|`}
          </motion.div>
        ))}
        {lines.length < terminalLines.length && (
          <div className="text-muted-foreground">
            {`| > `}<span className="animate-blink">{"█"}</span>{" ".repeat(33)}{`|`}
          </div>
        )}
        {lines.length >= terminalLines.length && (
          <div className="text-muted-foreground">
            {`| > _`}<span className="animate-blink">{"█"}</span>{" ".repeat(32)}{`|`}
          </div>
        )}
        <code>
{`+--------------------------------------+`}
        </code>
      </pre>
    </div>
  )
}

export function HeroSection() {
  const [motionEnabled, setMotionEnabled] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setMotionEnabled(!mq.matches)
    const handler = (e: MediaQueryListEvent) => setMotionEnabled(!e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  const asciiFrame = useAsciiFrame(30, 80, motionEnabled)

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4">
      {/* Scanline overlay */}
      {motionEnabled && (
        <div
          className="animate-scanline pointer-events-none absolute inset-0 z-10 h-[2px] w-full bg-foreground/5"
          aria-hidden="true"
        />
      )}

      {/* ASCII Background */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-[0.10]"
        aria-hidden="true"
      >
        <pre className="font-mono text-sm leading-[18px] text-foreground lg:text-base lg:leading-[22px]">
          {asciiFrame}
        </pre>
      </div>

      {/* Main Content */}
      <div className="relative z-20 grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left side - Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col items-start gap-6"
        >
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 border border-border px-3 py-1 font-mono text-xs text-muted-foreground">
              <span className="inline-block h-1.5 w-1.5 bg-foreground" />
              <span>DECENTRALIZED AI INFERENCE PROTOCOL</span>
            </div>
            <div className="inline-flex items-center gap-2 border border-foreground/30 px-3 py-1 font-mono text-[10px] text-foreground/50">
              <motion.span
                className="inline-block h-1.5 w-1.5 bg-foreground/50"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <span>TESTNET — BUILDING IN PUBLIC</span>
            </div>
          </div>

          <h1 className="font-pixel-line text-5xl font-bold leading-none tracking-tight text-foreground text-balance md:text-7xl">
            AI quota ran out?
            <br />
            <span className="text-muted-foreground">Use someone else&apos;s.</span>
          </h1>

          <p className="max-w-prose font-mono text-sm leading-relaxed text-muted-foreground md:text-base">
            Veil connects you to idle AI capacity worldwide. Pay per token. No subscription needed.
          </p>

          <div className="flex flex-col items-start gap-4 sm:flex-row">
            <a
              href="#protocol-design"
              className="group flex items-center gap-2 border border-foreground bg-foreground px-6 py-3 font-mono text-sm text-background transition-all duration-200 hover:bg-transparent hover:text-foreground focus-visible:ring-2 focus-visible:ring-foreground focus-visible:outline-none"
            >
              Use AI
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                {"→"}
              </span>
            </a>
            <a
              href="#network-install"
              className="flex items-center gap-2 border border-border px-6 py-3 font-mono text-sm text-muted-foreground transition-all duration-200 hover:border-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-foreground focus-visible:outline-none"
            >
              Share & Earn →
            </a>
          </div>

          {/* Project Status */}
          <div className="mt-2 w-full border border-border/50 p-4">
            <div className="flex items-center gap-2 mb-3">
              <motion.div
                className="h-2 w-2 bg-foreground/50"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Project Status — Testnet
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 font-mono text-[11px]">
              <div className="flex items-center gap-2 text-foreground/70">
                <span className="text-foreground">[x]</span>
                <span>Protocol design + whitepaper</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/70">
                <span className="text-foreground">[x]</span>
                <span>Core implementation (36/36 tests)</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/70">
                <span className="text-foreground">[x]</span>
                <span>E2E: Consumer → Relay → Provider</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/70">
                <span className="text-foreground">[x]</span>
                <span>Streaming + envelope encryption</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/30">
                <span>[ ]</span>
                <span>Multi-provider support</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/30">
                <span>[ ]</span>
                <span>On-chain settlement (Solana)</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/30">
                <span>[ ]</span>
                <span>TOKEN economics + Points</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/30">
                <span>[ ]</span>
                <span>RBOB build system live</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right side - Terminal Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="w-full"
          role="img"
          aria-label="ASCII art animation representing Veil Protocol terminal"
        >
          <TerminalAnimation />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Scroll to Explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="h-4 w-[1px] bg-muted-foreground"
        />
      </motion.div>
    </section>
  )
}
