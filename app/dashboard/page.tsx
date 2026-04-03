"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Navigation } from "@/components/ascii-hub/navigation"
import { Footer } from "@/components/ascii-hub/footer"

const terminalLines = [
  "> connecting to solana mainnet...",
  "> loading on-chain data...",
  "> status: COMING SOON",
  "> dashboard launches with protocol v1.0",
  "> for now, use: veil provide status",
  "> _█",
]

const features = [
  { label: "PROVIDER_STATUS", description: "Monitor your mining activity" },
  { label: "EARNINGS", description: "Track USDC + TOKEN rewards" },
  { label: "NETWORK", description: "Global protocol statistics" },
  { label: "WALLET_SETTINGS", description: "Manage wallet and privacy" },
]

export default function DashboardPage() {
  const [visibleLines, setVisibleLines] = useState<string[]>([])

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < terminalLines.length) {
        setVisibleLines((prev) => [...prev, terminalLines[i]])
        i++
      } else {
        clearInterval(interval)
      }
    }, 400)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="container mx-auto px-4 py-24 md:py-32">
        {/* Terminal Header */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="border border-border">
            <div className="border-b border-border px-4 py-2 flex items-center gap-2">
              <div className="h-2 w-2 bg-foreground" />
              <div className="h-2 w-2 bg-muted-foreground/50" />
              <div className="h-2 w-2 bg-muted-foreground/30" />
              <span className="ml-2 font-mono text-[10px] text-muted-foreground">
                veil@protocol ~ dashboard
              </span>
            </div>
            <div className="p-4 font-mono text-sm">
              <div className="space-y-1 text-muted-foreground">
                {visibleLines.map((line, i) => (
                  <p key={i} className={line.includes("COMING SOON") ? "text-foreground font-bold" : ""}>
                    {line}
                  </p>
                ))}
                {visibleLines.length < terminalLines.length && (
                  <p>
                    <span className="animate-pulse">█</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="font-mono text-xs text-muted-foreground mb-6 text-center uppercase tracking-widest">
            // Planned Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature) => (
              <div
                key={feature.label}
                className="border border-border p-5 bg-muted/10"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-foreground">
                    {feature.label}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground px-2 py-0.5 border border-border">
                    PENDING
                  </span>
                </div>
                <p className="font-mono text-xs text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CLI Section */}
        <div className="max-w-xl mx-auto mb-12 text-center">
          <p className="font-mono text-xs text-muted-foreground mb-3">
            For now, use CLI:
          </p>
          <div className="border border-border px-4 py-3 inline-block bg-muted/10">
            <code className="font-mono text-sm text-foreground">
              veil provide status
            </code>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link
            href="/"
            className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
          >
            <span>{"<-"}</span>
            <span>BACK TO HOME</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
