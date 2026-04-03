"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Copy, Check } from "lucide-react"

type PackageManager = "npm" | "pnpm" | "bun"

interface InstallCardProps {
  icon: string
  title: string
  description: string
  command: string
  commandByPm?: Record<PackageManager, string>
  belowText: string
  showPmTabs?: boolean
  delay: number
}

function InstallCard({
  icon,
  title,
  description,
  command,
  commandByPm,
  belowText,
  showPmTabs = true,
  delay,
}: InstallCardProps) {
  const [selectedPm, setSelectedPm] = useState<PackageManager>("npm")
  const [copied, setCopied] = useState(false)

  const actualCommand = commandByPm ? commandByPm[selectedPm] : command

  const handleCopy = async () => {
    await navigator.clipboard.writeText(actualCommand)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const pms: PackageManager[] = ["npm", "pnpm", "bun"]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="flex flex-col border border-border bg-background"
    >
      {/* Card header */}
      <div className="border-b border-border p-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          <span className="font-mono text-sm font-bold text-foreground">{title}</span>
        </div>
        <p className="mt-2 font-mono text-xs text-muted-foreground">{description}</p>
      </div>

      {/* Package manager tabs */}
      {showPmTabs && (
        <div className="flex border-b border-border">
          {pms.map((pm) => (
            <button
              key={pm}
              onClick={() => setSelectedPm(pm)}
              className={`flex-1 px-3 py-2 font-mono text-xs transition-colors ${
                selectedPm === pm
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {pm}
            </button>
          ))}
        </div>
      )}

      {/* Code block */}
      <div className="relative bg-secondary/50 p-4">
        <pre className="font-mono text-xs text-foreground">
          <code>{actualCommand}</code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute right-2 top-2 p-2 text-muted-foreground transition-colors hover:text-foreground"
          aria-label={copied ? "Copied" : "Copy to clipboard"}
        >
          {copied ? (
            <span className="flex items-center gap-1 font-mono text-[10px]">
              <Check size={12} />
              Copied
            </span>
          ) : (
            <Copy size={14} />
          )}
        </button>
      </div>

      {/* Below text */}
      <div className="border-t border-border p-3">
        <span className="font-mono text-[10px] text-muted-foreground">{belowText}</span>
      </div>
    </motion.div>
  )
}

export function InstallCards() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
      <div className="grid gap-6 md:grid-cols-3">
        {/* Card 1: Provide & Earn */}
        <InstallCard
          icon=">"
          title="PROVIDE & EARN"
          description="Share idle AI capacity. Earn USDC + TOKEN rewards."
          commandByPm={{
            npm: "$ npx veil init --provider",
            pnpm: "$ pnpm dlx veil init --provider",
            bun: "$ bunx veil init --provider",
          }}
          command=""
          belowText="Then run: veil provide start"
          delay={0.1}
        />

        {/* Card 2: Use AI */}
        <InstallCard
          icon=">"
          title="USE AI"
          description="Access top AI models. No KYC. Pay with crypto (staged)."
          commandByPm={{
            npm: "$ npx veil init",
            pnpm: "$ pnpm dlx veil init",
            bun: "$ bunx veil init",
          }}
          command=""
          belowText="Then run: veil start"
          delay={0.2}
        />

        {/* Card 3: Relay */}
        <InstallCard
          icon=">"
          title="RUN A RELAY"
          description="Earn relay fees with a $3/month VPS. No GPU needed."
          command={`$ veil relay start --public

✓ Registered with bootstrap
✓ Earning relay fees...`}
          belowText="Anyone with a VPS can relay traffic and earn"
          showPmTabs={false}
          delay={0.3}
        />
      </div>
    </section>
  )
}
