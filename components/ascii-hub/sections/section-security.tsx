"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { techSections } from "@/lib/sections-data"
import { ChevronDown } from "lucide-react"

const shadow = "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px"

// Security layers data
const securityLayers = [
  {
    layer: "Layer 1",
    name: "CRYPTOGRAPHY",
    components: ["E2E Encryption", "Ed25519 Signatures"],
    bypass: "Impossible",
    coverage: 100,
    dependsOn: "Mathematics",
  },
  {
    layer: "Layer 2",
    name: "ON-CHAIN [Staged]",
    components: ["Escrow Contracts", "Fraud Proofs"],
    bypass: "Impossible",
    coverage: 100,
    dependsOn: "Solana Consensus",
  },
  {
    layer: "Layer 3",
    name: "GAME THEORY",
    components: ["Stake Slashing", "Watchtower Network"],
    bypass: "Irrational",
    coverage: 95,
    dependsOn: "Economic Incentives",
  },
  {
    layer: "Layer 4",
    name: "HARDWARE TEE [Phase 7]",
    components: ["Intel SGX", "AMD SEV"],
    bypass: "Impossible (with TEE)",
    coverage: 100,
    dependsOn: "Hardware Trust",
  },
]

// Privacy layers data
const privacyLayers = [
  {
    id: "L3",
    name: "TEE-ONLY [Roadmap]",
    description: "Hardware-encrypted processing. Even root can't read enclave data. Available when TEE providers join the network.",
    badge: "Maximum Security",
  },
  {
    id: "L2",
    name: "TEE-PREFERRED [Roadmap]",
    description: "Routes to TEE when available, falls back to WASM. Default mode for balanced privacy and availability. TEE routing available when hardware providers join.",
    badge: "Default",
  },
  {
    id: "L1",
    name: "ANY",
    description: "Any isolation level accepted. Cheapest option for non-sensitive workloads.",
    badge: "Economy",
  },
  {
    id: "L0",
    name: "ALWAYS ON",
    description: "Accountless access + privacy-preserving routing. Applied to ALL levels as the base privacy layer.",
    badge: "Base Layer",
  },
]

function LayerCard({ layer, index, isSelected, onSelect }: {
  layer: typeof securityLayers[0]
  index: number
  isSelected: boolean
  onSelect: () => void
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.15 + index * 0.1 }}
      onClick={onSelect}
      className={`group relative flex w-48 flex-shrink-0 flex-col border p-4 text-left font-mono transition-all duration-300 focus-visible:ring-2 focus-visible:ring-foreground focus-visible:outline-none ${
        isSelected
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-background text-foreground hover:border-foreground"
      }`}
      style={{ boxShadow: shadow }}
    >
      <span className={`text-[10px] uppercase tracking-wider ${isSelected ? "text-background/50" : "text-muted-foreground"}`}>
        {layer.layer}
      </span>
      <span className={`mt-2 text-sm font-bold ${isSelected ? "text-background" : "text-foreground"}`}>
        {layer.name}
      </span>
      <div className="mt-3 flex flex-col gap-1 text-[10px]">
        <div className="flex justify-between">
          <span className={isSelected ? "text-background/50" : "text-muted-foreground"}>Bypass</span>
          <span>{layer.bypass.split(" ")[0]}</span>
        </div>
        <div className="flex justify-between">
          <span className={isSelected ? "text-background/50" : "text-muted-foreground"}>Coverage</span>
          <span>{layer.coverage}%</span>
        </div>
      </div>
      {/* Chain connector */}
      {index < securityLayers.length - 1 && (
        <div className="absolute -right-6 top-1/2 hidden -translate-y-1/2 items-center md:flex" aria-hidden="true">
          <div className="h-px w-6 bg-border" />
          <div className="h-0 w-0 border-y-[3px] border-l-[5px] border-y-transparent border-l-border" />
        </div>
      )}
    </motion.button>
  )
}

function SecurityTab({ section }: { section: TechSection }) {
  const [selectedLayer, setSelectedLayer] = useState(0)

  return (
    <div>
      {/* Horizontal scrolling layers */}
      <div className="overflow-x-auto">
        <div className="mx-auto flex w-max items-center gap-6 px-8 pb-4">
          {securityLayers.map((layer, i) => (
            <LayerCard
              key={layer.layer}
              layer={layer}
              index={i}
              isSelected={selectedLayer === i}
              onSelect={() => setSelectedLayer(i)}
            />
          ))}
        </div>
      </div>

      {/* Selected layer detail + specs */}
      <div className="mx-auto mt-8 max-w-7xl px-4 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2">
          {/* Layer detail panel */}
          <motion.div
            key={selectedLayer}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="border border-border p-6"
            style={{ boxShadow: shadow }}
          >
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 bg-foreground" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Layer Inspector</span>
            </div>
            <div className="mt-4 flex flex-col gap-3 font-mono text-xs">
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Layer</span>
                <span className="font-bold text-foreground">{securityLayers[selectedLayer].layer}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Name</span>
                <span className="font-bold text-foreground">{securityLayers[selectedLayer].name}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Bypass Difficulty</span>
                <span className="text-foreground">{securityLayers[selectedLayer].bypass}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Depends On</span>
                <span className="text-foreground">{securityLayers[selectedLayer].dependsOn}</span>
              </div>
              <div className="flex flex-col gap-1 pt-2">
                <span className="text-muted-foreground">Components</span>
                {securityLayers[selectedLayer].components.map((comp) => (
                  <span key={comp} className="text-foreground">{">"} {comp}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Specs as vertical meter */}
          <div className="flex flex-col gap-3">
            {section.specs.map((spec, i) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-4 border border-border p-4"
                style={{ boxShadow: shadow }}
              >
                <div className="flex h-10 w-10 items-center justify-center bg-foreground font-mono text-xs font-bold text-background">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{spec.label}</div>
                  <div className="font-mono text-sm font-bold text-foreground">{spec.value}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function PrivacyAccordion() {
  const [expandedIndex, setExpandedIndex] = useState(1) // L2 TEE-PREFERRED default

  return (
    <div className="border border-border" style={{ boxShadow: shadow }}>
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="h-1.5 w-1.5 bg-foreground" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Privacy Level Selector
        </span>
      </div>

      <div className="flex flex-col">
        {privacyLayers.map((layer, i) => (
          <div key={layer.id} className={i < privacyLayers.length - 1 ? "border-b border-border" : ""}>
            <button
              onClick={() => setExpandedIndex(expandedIndex === i ? -1 : i)}
              className={`flex w-full items-center justify-between p-4 font-mono transition-colors ${
                expandedIndex === i
                  ? "bg-foreground text-background"
                  : "bg-background text-foreground hover:bg-secondary/50"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-lg font-bold">{layer.id}</span>
                <span className="text-sm">{layer.name}</span>
                <span
                  className={`border px-2 py-0.5 text-[10px] ${
                    expandedIndex === i
                      ? "border-background/30 text-background/70"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {layer.badge}
                </span>
              </div>
              <motion.div
                animate={{ rotate: expandedIndex === i ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={16} />
              </motion.div>
            </button>

            <AnimatePresence>
              {expandedIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-border bg-secondary/30 p-4">
                    <p className="font-mono text-xs leading-relaxed text-muted-foreground">
                      {layer.description}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}

function ComparisonTable() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [showTable, setShowTable] = useState(false)

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => setShowTable(true), 300)
      return () => clearTimeout(timeout)
    }
  }, [isInView])

  return (
    <div ref={ref} className="border border-border" style={{ boxShadow: shadow }}>
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="h-1.5 w-1.5 bg-foreground" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          veil@protocol ~ privacy-compare
        </span>
      </div>
      <div className="overflow-x-auto p-4">
        <motion.pre
          initial={{ opacity: 0 }}
          animate={showTable ? { opacity: 1 } : {}}
          className="font-mono text-[10px] leading-relaxed text-muted-foreground md:text-xs"
        >
{`                Official  Veil     Veil
Feature         API       Standard TEE*
──────────────  ────────  ───────  ───────
Knows identity  YES       NO       NO
Logs requests   YES       WITNESS  NO
Can ban you     YES       NO       NO
Content protect TRUST     ECON     HARDWARE
* TEE tier is on the roadmap`}
        </motion.pre>
      </div>
    </div>
  )
}

function PrivacyTab() {
  return (
    <div className="mx-auto max-w-7xl px-4 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left: Privacy accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          <PrivacyAccordion />
        </motion.div>

        {/* Right: Data sheet + comparison */}
        <div className="flex flex-col gap-6">
          {/* Specs as horizontal data sheet */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="border border-border" style={{ boxShadow: shadow }}
          >
            <div className="flex items-center gap-2 border-b border-border px-4 py-2">
              <div className="h-1.5 w-1.5 bg-foreground" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Data Sheet</span>
            </div>
            <div className="grid grid-cols-2 gap-0">
              {[
                { label: "Identity", value: "Accountless" },
                { label: "Content", value: "Tier-dependent" },
                { label: "Logging", value: "Minimal (witness only)" },
                { label: "Tracking", value: "Reduced coupling" },
              ].map((spec, i) => (
                <div
                  key={spec.label}
                  className={`flex flex-col gap-1 p-4 font-mono ${
                    i < 2 ? "border-b border-border" : ""
                  } ${i % 2 === 0 ? "border-r border-border" : ""}`}
                >
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{spec.label}</span>
                  <span className="text-sm font-bold text-foreground">{spec.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Comparison table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
          >
            <ComparisonTable />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export function SectionSecurity() {
  const section = techSections.find(s => s.id === "security-model")!
  const [activeTab, setActiveTab] = useState<"security" | "privacy">("security")

  return (
    <div id="security-model" className="py-20 lg:py-32">
      {/* Full-width top bar with number + title */}
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-end gap-6"
        >
          <span className="font-pixel-line text-7xl font-bold leading-none text-foreground/[0.08] md:text-9xl">
            {section.number}
          </span>
          <div className="pb-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{section.subtitle}</span>
            <div className="flex items-center gap-3">
              <h2 className="font-pixel-line text-3xl font-bold text-foreground md:text-5xl">
                {section.title}
              </h2>
              {/* LIVE badge */}
              <div className="flex items-center gap-1.5">
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="h-2 w-2 bg-foreground"
                />
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">LIVE</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-8 max-w-4xl font-mono text-sm leading-relaxed text-muted-foreground"
        >
          {section.description}
        </motion.p>

        {/* Tabs */}
        <div className="mt-8 flex gap-2">
          <button
            onClick={() => setActiveTab("security")}
            className={`px-6 py-2 font-mono text-xs transition-all duration-200 focus-visible:ring-2 focus-visible:ring-foreground focus-visible:outline-none ${
              activeTab === "security"
                ? "bg-foreground text-background"
                : "border border-border text-muted-foreground hover:border-foreground hover:text-foreground"
            }`}
          >
            SECURITY
          </button>
          <button
            onClick={() => setActiveTab("privacy")}
            className={`px-6 py-2 font-mono text-xs transition-all duration-200 focus-visible:ring-2 focus-visible:ring-foreground focus-visible:outline-none ${
              activeTab === "privacy"
                ? "bg-foreground text-background"
                : "border border-border text-muted-foreground hover:border-foreground hover:text-foreground"
            }`}
          >
            PRIVACY
          </button>
        </div>
      </div>

      {/* Tab content */}
      <div className="mt-12">
        <AnimatePresence mode="wait">
          {activeTab === "security" ? (
            <motion.div
              key="security"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <SecurityTab section={section} />
            </motion.div>
          ) : (
            <motion.div
              key="privacy"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <PrivacyTab />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
