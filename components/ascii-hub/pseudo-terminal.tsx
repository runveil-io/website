"use client"

import { useState, useRef, useEffect, type KeyboardEvent } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

const COMMANDS: Record<string, string[]> = {
  help: [
    "Available commands:",
    "  help       - Show this message",
    "  stats      - Network statistics",
    "  price      - Current pricing",
    "  providers  - Provider info",
    "  token      - Token economics",
    "  security   - Security model",
    "  privacy    - Privacy comparison",
    "  install    - Installation guide",
    "  whitepaper - Open whitepaper",
    "  clear      - Clear terminal",
    "  veil       - ...",
  ],
  stats: [
    "Providers: 1,247 | Relays: 8,420",
    "24h Volume: $84,200 | Burned: 1.2M TOKEN",
    "Uptime: 99.97% | Settlements: 12,420",
  ],
  price: [
    "Current: 42% of official API",
    "Surge: 0.84x | Trend: STABLE",
    "Floor: 30% | Ceiling: 80%",
    "Epoch: #4,217",
  ],
  providers: [
    "Online: 1,247",
    "TEE-enabled: 41 (3.3%)",
    "WASM-only: 1,206 (96.7%)",
    "Avg uptime: 14h 23m",
  ],
  token: [
    "Supply: 1,000,000,000 (fixed)",
    "Burned: 1,247,000",
    "Mining pool: 348,753,000",
    "Phase: Pre-TGE (Points)",
  ],
  security: [
    "",
    "┌─────────────────────────────────┐",
    "│      SECURITY MODEL             │",
    "├─────────────────────────────────┤",
    "│ Layer 1: CRYPTOGRAPHY           │",
    "│   E2E, Signatures               │",
    "│   Bypass: IMPOSSIBLE            │",
    "├─────────────────────────────────┤",
    "│ Layer 2: ON-CHAIN               │",
    "│   Escrow, Fraud Proofs          │",
    "│   Bypass: IMPOSSIBLE            │",
    "├─────────────────────────────────┤",
    "│ Layer 3: GAME THEORY            │",
    "│   Stake, Watchtower             │",
    "│   Bypass: IRRATIONAL            │",
    "├─────────────────────────────────┤",
    "│ Layer 4: HARDWARE TEE           │",
    "│   SGX, SEV                      │",
    "│   Bypass: IMPOSSIBLE (w/ TEE)   │",
    "└─────────────────────────────────┘",
    "",
  ],
  privacy: [
    "",
    "                Official  Veil     Veil",
    "Feature         API       Standard TEE",
    "──────────────  ────────  ───────  ───────",
    "Knows identity  YES       NO       NO",
    "Logs requests   YES       NO       NO",
    "Can ban you     YES       NO       NO",
    "Content protect TRUST     ECON     HARDWARE",
    "",
  ],
  install: [
    "",
    "# Provide (earn USDC + TOKEN)",
    "$ npx clawhub@latest install idle-provide",
    "$ clawd provide start",
    "",
    "# Consume (access AI models)",
    "$ npx clawhub@latest install idle-consume",
    "$ clawd credits add 10",
    "",
    "# Local gateway: http://localhost:7860/v1",
    "",
  ],
  veil: [
    "",
    "██╗   ██╗███████╗██╗██╗     ",
    "██║   ██║██╔════╝██║██║     ",
    "██║   ██║█████╗  ██║██║     ",
    "╚██╗ ██╔╝██╔══╝  ██║██║     ",
    " ╚████╔╝ ███████╗██║███████╗",
    "  ╚═══╝  ╚══════╝╚═╝╚══════╝",
    "",
    "  Private Access. Permissionless AI.",
    "  A decentralized protocol. Not a company.",
    "",
  ],
}

interface TerminalLine {
  type: "input" | "output" | "veil"
  content: string
}

export function PseudoTerminal() {
  const router = useRouter()
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", content: "Welcome to Veil Protocol Terminal v1.0.0" },
    { type: "output", content: 'Type "help" for available commands.' },
    { type: "output", content: "" },
  ])
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [lines])

  const processCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    const baseLines: TerminalLine[] = [
      ...lines,
      { type: "input", content: `$ ${cmd}` },
    ]

    if (trimmed === "clear") {
      setLines([])
      setInput("")
      return
    }

    if (trimmed === "whitepaper") {
      setLines([...baseLines, { type: "output", content: "Opening /whitepaper..." }])
      setInput("")
      setTimeout(() => {
        router.push("/whitepaper")
      }, 500)
      return
    }

    if (trimmed === "veil") {
      setLines([...baseLines, { type: "output", content: "" }])
      setInput("")
      const veilLines = COMMANDS["veil"]
      veilLines.forEach((line, i) => {
        setTimeout(() => {
          setLines((prev) => [...prev, { type: "veil", content: line }])
        }, i * 80)
      })
      return
    }

    const newLines: TerminalLine[] = [...baseLines]
    const response = COMMANDS[trimmed]
    if (response) {
      response.forEach((line) => {
        newLines.push({ type: "output", content: line })
      })
    } else if (trimmed === "") {
      // do nothing
    } else {
      newLines.push({ type: "output", content: `command not found: ${trimmed}` })
      newLines.push({ type: "output", content: 'Type "help" for available commands.' })
    }

    newLines.push({ type: "output", content: "" })
    setLines(newLines)
    setInput("")
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      processCommand(input)
    }
  }

  return (
    <motion.section
      id="terminal"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24"
    >
      <div className="mb-8 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm text-muted-foreground">{">"}</span>
          <div className="h-[1px] w-12 bg-border" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Interactive
          </span>
        </div>
        <h2 className="font-pixel-line text-3xl font-bold tracking-tight text-foreground md:text-5xl">
          Terminal
        </h2>
        <p className="max-w-prose font-mono text-sm leading-relaxed text-muted-foreground">
          Explore the protocol. Type commands to interact with the Veil network.
        </p>
      </div>

      <div
        className="border border-border"
        onClick={() => inputRef.current?.focus()}
        role="application"
        aria-label="Interactive pseudo-terminal"
      >
        {/* Terminal header */}
        <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
          <div className="h-2.5 w-2.5 bg-foreground" />
          <div className="h-2.5 w-2.5 bg-muted-foreground/50" />
          <div className="h-2.5 w-2.5 bg-muted-foreground/30" />
          <span className="ml-2 font-mono text-xs text-muted-foreground">
            veil@protocol ~ interactive
          </span>
        </div>

        {/* Terminal body */}
        <div
          ref={scrollRef}
          className="h-80 overflow-y-auto bg-secondary/20 p-4"
        >
          {lines.map((line, i) => (
            <div
              key={i}
              className={`font-mono text-xs leading-relaxed ${
                line.type === "input"
                  ? "text-foreground"
                  : line.type === "veil"
                  ? "text-foreground brightness-125"
                  : "text-muted-foreground"
              }`}
            >
              {line.content || "\u00A0"}
            </div>
          ))}

          {/* Input line */}
          <div className="relative flex items-center font-mono text-xs text-foreground">
            <span className="mr-1">{"$"}</span>
            <span>{input}</span>
            <span className="animate-blink">{"█"}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="absolute inset-0 h-full w-full cursor-default border-none bg-transparent opacity-0 outline-none"
              aria-label="Terminal input"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
            />
          </div>
        </div>
      </div>
    </motion.section>
  )
}
