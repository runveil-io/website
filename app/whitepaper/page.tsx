"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const shadow = "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px"

const sections = [
  { id: "abstract", number: "1", title: "Abstract" },
  { id: "introduction", number: "2", title: "Introduction" },
  { id: "protocol-design", number: "3", title: "Protocol Design" },
  { id: "privacy-architecture", number: "4", title: "Privacy Architecture" },
  { id: "security-model", number: "5", title: "Security Model" },
  { id: "anti-detection", number: "6", title: "Anti-Detection" },
  { id: "pricing-engine", number: "7", title: "Pricing Engine" },
  { id: "metering-billing", number: "8", title: "Metering & Billing" },
  { id: "settlement", number: "9", title: "Settlement" },
  { id: "task-lifecycle", number: "10", title: "Task Lifecycle" },
  { id: "consumer-integration", number: "11", title: "Consumer Integration" },
  { id: "token-economics", number: "12", title: "Token Economics" },
  { id: "build-protocol", number: "13", title: "Build Protocol — RBOB" },
  { id: "wallet-onboarding", number: "14", title: "Wallet & Onboarding" },
  { id: "roadmap", number: "15", title: "Roadmap" },
  { id: "related-work", number: "16", title: "Related Work" },
  { id: "conclusion", number: "17", title: "Conclusion" },
  { id: "references", number: "18", title: "References" },
]

function TableOfContents() {
  return (
    <nav className="sticky top-24 hidden h-fit w-48 flex-shrink-0 lg:block">
      <div className="border border-border p-4" style={{ boxShadow: shadow }}>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Contents
        </span>
        <div className="mt-4 flex flex-col gap-2">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="text-[10px] opacity-50">{section.number}</span>
              <span>{section.title}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

function Section({ id, number, title, children }: { id: string; number: string; title: string; children: React.ReactNode }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <div className="mb-6 flex items-baseline gap-4">
        <span className="font-pixel-line text-4xl font-bold text-foreground/10">{number}</span>
        <h2 className="font-pixel-line text-2xl font-bold text-foreground md:text-3xl">{title}</h2>
      </div>
      <div className="font-mono text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </motion.section>
  )
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="my-4 overflow-x-auto border border-border bg-secondary/30 p-4 font-mono text-xs leading-relaxed text-foreground">
      {children}
    </pre>
  )
}

function AsciiDiagram({ children }: { children: string }) {
  return (
    <pre
      className="my-6 overflow-x-auto border border-border p-4 text-[10px] leading-relaxed text-muted-foreground md:text-xs"
      style={{
        fontVariantLigatures: "none",
        fontFeatureSettings: "'liga' 0, 'calt' 0",
        letterSpacing: "0em",
        tabSize: 4,
      }}
    >
      {children}
    </pre>
  )
}

export default function WhitepaperPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </Link>
          <span className="font-mono text-xs text-muted-foreground">Whitepaper v1.1</span>
        </div>
      </header>

      {/* Hero */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-border p-6"
            style={{ boxShadow: shadow }}
          >
            <div className="mb-2 flex items-center gap-2">
              <div className="h-2 w-2 bg-foreground" />
              <div className="h-2 w-2 bg-muted-foreground/50" />
              <div className="h-2 w-2 bg-muted-foreground/30" />
              <span className="ml-2 font-mono text-[10px] text-muted-foreground">
                veil@protocol ~ whitepaper
              </span>
            </div>
            <pre className="font-mono text-xs leading-relaxed text-muted-foreground md:text-sm">
{`Veil Protocol: A Decentralized AI Inference Network
with Verifiable Privacy and Market-Driven Pricing

Version 1.1 — April 2026`}
            </pre>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
        <div className="flex gap-12">
          <TableOfContents />

          <main className="flex-1 max-w-3xl">

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* CHAPTER 1: ABSTRACT                                             */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <Section id="abstract" number="1" title="Abstract">
              <p className="mb-4">
                Veil Protocol is a decentralized network for AI inference that enables permissionless
                access to foundation models while preserving user privacy. The protocol connects three
                participant classes—Providers who share idle AI capacity, Consumers who access models
                anonymously, and Relays who route traffic for passive rewards—through a trustless
                architecture secured by cryptographic guarantees, economic incentives, and optional
                hardware attestation.
              </p>
              <p className="mb-4">
                We present a novel pricing mechanism that dynamically adjusts rates based on real-time
                supply and demand, an optimistic settlement system with fraud proofs for dispute resolution,
                and a token model with revenue-proportional elastic release that prevents death spirals
                common in dual-token systems.
              </p>
              <p className="mb-4">
                This paper also introduces RBOB (Rules-Based Open Build), a coordination mechanism
                where autonomous agents contribute to protocol development without human project management.
                The protocol breathes through two lungs: Inference generates revenue, Build channels
                that revenue into continuous improvement. Together, they form a self-sustaining system
                where better infrastructure attracts more usage, which funds more development.
              </p>
              <p>
                The result is infrastructure that can grow without organizational overhead—a protocol
                that builds itself.
              </p>
            </Section>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* CHAPTER 2: INTRODUCTION                                         */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <Section id="introduction" number="2" title="Introduction">
              <h3 className="mb-3 font-bold text-foreground">2.1 The AI Access Problem</h3>
              <p className="mb-4">
                Access to frontier AI models faces three barriers: payment infrastructure (credit cards,
                geographic restrictions), identity requirements (KYC, phone verification), and privacy
                concerns (request logging, content moderation). These barriers exclude billions of potential
                users and create artificial scarcity in a market with abundant computational supply.
              </p>
              <p className="mb-6">
                A researcher in Nigeria cannot access GPT-4 because their country lacks Stripe support.
                A journalist investigating corruption cannot trust that their queries are not logged.
                A developer building in a restricted category faces arbitrary bans without recourse.
                These are not edge cases—they represent the majority of the world.
              </p>

              <h3 className="mb-3 font-bold text-foreground">2.2 Structural Arbitrage</h3>
              <p className="mb-4">
                The existence of subscription tiers (e.g., ChatGPT Plus at $20/month for 80 messages)
                creates arbitrage opportunity. Heavy users exhaust quotas while light users leave capacity
                unused. Veil Protocol captures this inefficiency:
              </p>
              <CodeBlock>
{`π = P_protocol × C_utilized × share_rate - S

where:
  π           = provider profit
  P_protocol  = protocol price (< official)
  C_utilized  = utilized capacity
  share_rate  = 0.80 (80% to provider)
  S           = subscription cost`}
              </CodeBlock>
              <p className="mb-6">
                A ChatGPT Plus subscriber with 50% utilization can profit by selling unused capacity.
                A user seeking privacy pays a premium but less than official rates. Both parties benefit.
                The protocol coordinates this exchange without trust.
              </p>

              <h3 className="mb-3 font-bold text-foreground">2.3 The Third Paradigm</h3>
              <p className="mb-4">
                Software has been built in three paradigms:
              </p>
              <p className="mb-4">
                <strong className="text-foreground">1. Corporate:</strong> Roles, KPIs, managers, sprints.
                Works because humans need coordination. Limited by organizational overhead that scales
                linearly with complexity.
              </p>
              <p className="mb-4">
                <strong className="text-foreground">2. Open Source:</strong> Culture, maintainers, consensus.
                Linux, Wikipedia. Works because skilled humans voluntarily contribute. Limited by maintainer
                availability and social coordination costs.
              </p>
              <p className="mb-4">
                <strong className="text-foreground">3. RBOB (Rules-Based Open Build):</strong> Rules,
                verification, emergence. No task boards. No project managers. Agents scan the codebase,
                write code, submit for verification. Pass the tests, merge the code. The protocol builds itself.
              </p>
              <p className="mb-4">
                This is not automation of corporate process. It is a fundamentally different model—one
                that does not require human coordination at all. The codebase declares what it needs
                through its own state. Agents read, write, submit. Verification is automatic.
              </p>
              <p>
                Veil Protocol is designed for this paradigm. Inference (Lung 1) generates revenue.
                Build (Lung 2) channels that revenue into development. Two lungs, one system.
              </p>
            </Section>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* CHAPTER 3: PROTOCOL DESIGN                                      */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <Section id="protocol-design" number="3" title="Protocol Design">
              <h3 className="mb-3 font-bold text-foreground">3.1 Architecture</h3>
              <AsciiDiagram>
{`+-----------------------------------------------------+
|                  VEIL PROTOCOL                      |
+-----------------------------------------------------+
|                                                     |
|  CONSUMER            RELAY              PROVIDER    |
|  +--------+      +----------+       +--------+      |
|  | clawd  |----->|  BLIND   |------>|  WASM  |      |
|  |  CLI   |      | FORWARD  |       |SANDBOX |      |
|  |        |      | +ID STRIP|       |        |      |
|  +--------+      +----+-----+       +--------+      |
|      |                |                  |          |
|      |      +---------+---------+       |           |
|      |      |   SOLANA CHAIN    |       |           |
|      +----->| +---------------+ |<------+           |
|             | |Registry|Escrow| |                   |
|             | |Staking |Token | |                   |
|             | +---------------+ |                   |
|             +-------------------+                   |
+-----------------------------------------------------+`}
              </AsciiDiagram>

              <h3 className="mb-3 font-bold text-foreground">3.2 Three Roles</h3>
              <ul className="mb-6 list-inside list-disc">
                <li className="mb-2"><strong className="text-foreground">Provider</strong>: Shares idle AI capacity, runs WASM sandbox, earns 80% of transaction value. Providers stake TOKEN to register and face slashing for misbehavior.</li>
                <li className="mb-2"><strong className="text-foreground">Consumer</strong>: Accesses models via clawd CLI, pays in USDC, identity never leaves local machine. No registration required. Anonymous by default.</li>
                <li className="mb-2"><strong className="text-foreground">Relay</strong>: Routes traffic, strips identifiers, submits witnesses to chain, earns 10% passively. Relays see who but not what.</li>
              </ul>

              <h3 className="mb-3 font-bold text-foreground">3.3 Request Flow</h3>
              <p className="mb-4">
                Every inference request follows a six-step flow designed to separate identity from content:
              </p>
              <AsciiDiagram>
{`+------------------------------------------------------+
|                   REQUEST FLOW                       |
+------------------------------------------------------+
|                                                      |
|  1  Consumer encrypts prompt with Provider pubkey    |
|     Only Provider can read content.                  |
|                                                      |
|  2  Relay verifies identity + USDC balance           |
|     Consumer proves ownership.                       |
|                                                      |
|  3  Relay strips identity, forwards to Provider      |
|     Provider receives request without origin.        |
|                                                      |
|  4  Relay submits settlement witness to Solana       |
|     On-chain record for later settlement.            |
|                                                      |
|  5  Provider decrypts in WASM/TEE sandbox            |
|     Inference executes in isolation.                 |
|                                                      |
|  6  Encrypted response returns to Consumer           |
|     Same path, reverse direction.                    |
|                                                      |
|  "Relay sees who, not what."                         |
|  "Provider sees what, not who."                      |
|                                                      |
+------------------------------------------------------+`}
              </AsciiDiagram>

              <h3 className="mb-3 font-bold text-foreground">3.4 On-Chain Programs</h3>
              <ul className="mb-4 list-inside list-disc">
                <li className="mb-2"><strong className="text-foreground">Registry</strong>: Provider/relay registration, capability declaration, pubkey storage</li>
                <li className="mb-2"><strong className="text-foreground">Escrow</strong>: Holds funds during inference, releases after settlement window</li>
                <li className="mb-2"><strong className="text-foreground">Staking</strong>: Provider/relay stake, slash conditions, unstaking (30-day cooldown)</li>
                <li className="mb-2"><strong className="text-foreground">Token</strong>: TOKEN minting, burning, elastic release, governance</li>
              </ul>
            </Section>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* CHAPTER 4: PRIVACY ARCHITECTURE                                 */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <Section id="privacy-architecture" number="4" title="Privacy Architecture">
              <h3 className="mb-3 font-bold text-foreground">4.1 Four Privacy Tiers</h3>
              <p className="mb-4">
                Veil Protocol offers four privacy tiers, allowing consumers to choose their
                tradeoff between cost, latency, and privacy guarantees:
              </p>
              <AsciiDiagram>
{`+------------------------------------------------------------+
|                    PRIVACY TIERS                           |
+------------------------------------------------------------+
|                                                            |
|  L3  TEE-ONLY     Hardware isolation. Maximum privacy.     |
|  -------------    SGX/SEV attestation required.            |
|                   Price: 1.2x base. Providers: ~15%.       |
|                                                            |
|  L2  TEE-PREFER   Default. Prefers TEE, falls back to      |
|  -------------    WASM if unavailable. Best balance.       |
|                   Price: 1.0x base. Providers: ~40%.       |
|                                                            |
|  L1  ANY          Cheapest. WASM sandbox only.             |
|  -------------    Economic guarantees (staking/slash).     |
|                   Price: 0.8x base. Providers: ~100%.      |
|                                                            |
|  L0  ALWAYS-ON    Identity stripped. Zero logging.         |
|  -------------    Applied to ALL tiers automatically.      |
|                   No wallet linkage to content. Ever.      |
|                                                            |
+------------------------------------------------------------+`}
              </AsciiDiagram>

              <h3 className="mb-3 font-bold text-foreground">4.2 Envelope Encryption</h3>
              <p className="mb-4">
                Every request uses envelope encryption with two layers:
              </p>
              <AsciiDiagram>
{`+------------------------------------------------------+
|                ENVELOPE ENCRYPTION                   |
+------------------------------------------------------+
|                                                      |
|  OUTER ENVELOPE (Relay reads):                       |
|  +------------------------------------------------+  |
|  |  wallet_signature: 0x7a8f...                   |  |
|  |  privacy_tier: L2                              |  |
|  |  max_price: 0.003 USDC                         |  |
|  |  inner_envelope: [ENCRYPTED BLOB]              |  |
|  +------------------------------------------------+  |
|                                                      |
|  INNER ENVELOPE (Provider reads):                    |
|  +------------------------------------------------+  |
|  |  model: "gpt-4"                                |  |
|  |  prompt: "Explain quantum computing..."        |  |
|  |  params: { temp: 0.7, max_tokens: 1024 }       |  |
|  +------------------------------------------------+  |
|                                                      |
|  Relay sees: wallet, tier, price                     |
|  Relay cannot see: model, prompt, params             |
|                                                      |
+------------------------------------------------------+`}
              </AsciiDiagram>

              <h3 className="mb-3 font-bold text-foreground">4.3 Comparison Matrix</h3>
              <AsciiDiagram>
{`+------------------+----------+----------+----------+
| Feature          | Official | Veil Std | Veil TEE |
+------------------+----------+----------+----------+
| Identity Logged  | YES      | NO       | NO       |
| Content Logged   | YES      | NO       | NO       |
| Account Ban Risk | YES      | NO       | NO       |
| Content Visible  | PROVIDER | PROVID*  | NOBODY   |
| Censorship       | YES      | NO       | NO       |
| Geo-Restriction  | YES      | NO       | NO       |
+------------------+----------+----------+----------+
| * WASM providers can inspect memory.              |
|   Economic incentives (slashing) align behavior.  |
+---------------------------------------------------+`}
              </AsciiDiagram>
            </Section>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* CHAPTER 5: SECURITY MODEL                                       */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <Section id="security-model" number="5" title="Security Model">
              <h3 className="mb-3 font-bold text-foreground">5.1 Threat Model</h3>
              <p className="mb-4">
                We assume all participants are potentially malicious. Providers may modify code,
                relay operators may collude, and consumers may attempt to avoid payment. The protocol
                must remain secure under these assumptions.
              </p>
              <p className="mb-6">
                Specifically, we defend against: provider content inspection (TEE), provider response
                manipulation (verification), relay-provider collusion (identity separation), consumer
                payment evasion (escrow), and denial of service (stake requirements).
              </p>

              <h3 className="mb-3 font-bold text-foreground">5.2 Four-Layer Defense</h3>
              <AsciiDiagram>
{`+----------------------------------------------------------+
| Layer 4: HARDWARE TEE                                    |
|   Intel SGX / AMD SEV attestation                        |
|   Bypass: Impossible (with TEE hardware)                 |
+----------------------------------------------------------+
| Layer 3: GAME THEORY                                     |
|   Stake slashing, watchtower network                     |
|   Bypass: Economically irrational                        |
+----------------------------------------------------------+
| Layer 2: ON-CHAIN                                        |
|   Escrow contracts, fraud proofs                         |
|   Bypass: Impossible (Solana consensus)                  |
+----------------------------------------------------------+
| Layer 1: CRYPTOGRAPHY                                    |
|   X25519 key exchange, ChaCha20-Poly1305                 |
|   Ed25519 signatures                                     |
|   Bypass: Impossible (mathematical)                      |
+----------------------------------------------------------+`}
              </AsciiDiagram>

              <h3 className="mb-3 font-bold text-foreground">5.3 WASM Sandbox</h3>
              <p className="mb-4">
                Every provider runs inference inside a WebAssembly sandbox that provides:
              </p>
              <ul className="mb-4 list-inside list-disc">
                <li className="mb-2"><strong className="text-foreground">Memory isolation</strong>: No access to host memory outside sandbox</li>
                <li className="mb-2"><strong className="text-foreground">Deterministic execution</strong>: Same input always produces same output</li>
                <li className="mb-2"><strong className="text-foreground">Resource limits</strong>: CPU/memory caps prevent DoS</li>
                <li className="mb-2"><strong className="text-foreground">No network access</strong>: Sandbox cannot phone home</li>
              </ul>
              <CodeBlock>
{`// WASM sandbox initialization
const sandbox = await WasmSandbox.create({
  memoryLimit: 4 * GB,
  cpuLimit: 60_000,      // 60 seconds max
  networkAccess: false,   // no external calls
  fileSystem: "readonly"  // no state persistence
});

// Inference execution
const result = await sandbox.execute(
  encryptedPrompt,
  providerPrivateKey
);`}
              </CodeBlock>

              <h3 className="mb-3 font-bold text-foreground">5.4 Honest Disclosure</h3>
              <p>
                Without TEE hardware, providers can theoretically read inference content. The WASM
                sandbox prevents code execution attacks but not memory inspection. We rely on economic
                incentives (slashing) and reputation systems for WASM-only providers. TEE-enabled
                providers offer hardware-enforced isolation. Users who require absolute privacy should
                select L3 (TEE-ONLY) tier.
              </p>
            </Section>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* CHAPTER 6: ANTI-DETECTION                                       */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <Section id="anti-detection" number="6" title="Anti-Detection">
              <h3 className="mb-3 font-bold text-foreground">6.1 The Detection Problem</h3>
              <p className="mb-4">
                AI providers actively detect and ban accounts that share access. Detection methods
                include usage pattern analysis, IP fingerprinting, and behavioral heuristics. A naive
                protocol would quickly exhaust available accounts.
              </p>
              <p className="mb-6">
                Veil Protocol addresses this through graceful degradation. When accounts are suspended,
                the network routes around them automatically. Availability is maintained even under
                aggressive detection. The goal is not to prevent all detection but to make the network
                resilient to it.
              </p>

              <h3 className="mb-3 font-bold text-foreground">6.2 Multi-Account Pooling</h3>
              <p className="mb-4">
                Providers register multiple accounts and distribute traffic across them using weighted
                round-robin. Identity is decoupled from request patterns.
              </p>
              <CodeBlock>
{`// Account pool configuration
accounts: [
  { id: "acct_1", weight: 0.4, status: "active" },
  { id: "acct_2", weight: 0.3, status: "active" },
  { id: "acct_3", weight: 0.3, status: "cooldown" }
]

// Request routing
account = selectByWeight(activeAccounts);
executeRequest(account, encryptedPrompt);`}
              </CodeBlock>

              <h3 className="mb-3 font-bold text-foreground">6.3 Natural Rhythm Scheduling</h3>
              <p className="mb-4">
                Requests are scheduled to mimic human usage patterns:
              </p>
              <ul className="mb-6 list-inside list-disc">
                <li className="mb-2"><strong className="text-foreground">Variable delays</strong>: Random intervals between requests (not uniform)</li>
                <li className="mb-2"><strong className="text-foreground">Session patterns</strong>: Burst activity followed by idle periods</li>
                <li className="mb-2"><strong className="text-foreground">Quiet periods</strong>: Reduced activity during off-hours</li>
                <li className="mb-2"><strong className="text-foreground">Typing simulation</strong>: Gradual token streaming, not instant dumps</li>
              </ul>

              <h3 className="mb-3 font-bold text-foreground">6.4 Automatic Failover</h3>
              <p className="mb-4">
                When an account is suspended, the system responds automatically:
              </p>
              <AsciiDiagram>
{`+------------------------------------------------------------+
|                  AUTOMATIC FAILOVER                        |
+------------------------------------------------------------+
|                                                            |
|  1. Account suspended (detected via API error)             |
|     ↓                                                      |
|  2. Remove from active pool immediately                    |
|     ↓                                                      |
|  3. Redistribute weight to remaining accounts              |
|     ↓                                                      |
|  4. Continue serving requests (no downtime)                |
|     ↓                                                      |
|  5. Provider reputation unchanged                          |
|     (account loss is expected operational cost)            |
|                                                            |
+------------------------------------------------------------+`}
              </AsciiDiagram>
              <p>
                Providers are not penalized for account suspension—it is an expected operational cost.
                Reputation is based on service quality, not account longevity. This incentivizes providers
                to maintain pools rather than risk everything on single accounts.
              </p>
            </Section>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* CHAPTER 7: PRICING ENGINE                                       */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <Section id="pricing-engine" number="7" title="Pricing Engine">
              <h3 className="mb-3 font-bold text-foreground">7.1 Surge Pricing Formula</h3>
              <CodeBlock>
{`P(t) = P_base × S(t)

S(t) = α × S(t-1) + (1-α) × D(t)/C(t)

where:
  P_base    = 0.50 × P_official  (50% of official rate)
  α         = 0.80               (EMA smoothing)
  D(t)      = demand in epoch t
  C(t)      = capacity in epoch t
  P_floor   = 0.30 × P_official
  P_ceiling = 0.80 × P_official`}
              </CodeBlock>

              <h3 className="mb-3 font-bold text-foreground">7.2 Anti-Manipulation</h3>
              <p className="mb-6">
                The EMA smoothing factor (α = 0.8) prevents rapid price swings from wash trading.
                The ±15% per-epoch cap limits manipulation impact. Sustained manipulation requires
                real capital flow, making attacks economically irrational.
              </p>

              <h3 className="mb-3 font-bold text-foreground">7.3 Capacity-Aware Pricing</h3>
              <p className="mb-4">
                The surge mechanism is self-regulating:
              </p>
              <CodeBlock>
{`// Aggregate capacity calculation
aggregate_capacity = Σ(provider_remaining_requests)

// Surge multiplier
surge = EMA(demand / aggregate_capacity)

// Self-regulation cycle:
// 1. High demand → surge increases
// 2. High prices → attract more providers
// 3. More supply → capacity increases
// 4. More capacity → surge decreases
// 5. Lower prices → equilibrium`}
              </CodeBlock>
              <AsciiDiagram>
{`         PRICE
           ^
     0.80 -+ - - - - - - - - - - - ceiling
           |           /\\
           |          /  \\
     0.50 -+ --------/----\\------ base
           |        /      \\
           |       /        \\
     0.30 -+ - - -/- - - - - \\- - floor
           |     /            \\
           +-----+--------------+---> TIME
                 ^              ^
              high demand    supply responds`}
              </AsciiDiagram>
            </Section>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* CHAPTER 8: METERING & BILLING                                   */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <Section id="metering-billing" number="8" title="Metering & Billing">
              <h3 className="mb-3 font-bold text-foreground">8.1 The Metering Problem</h3>
              <p className="mb-4">
                Every inference request must answer four questions: How many tokens were consumed?
                How much should the consumer pay? How is revenue distributed? Who verifies the numbers?
                Veil Protocol solves this with provider-side metering, relay witnessing, and on-chain
                challenge mechanisms.
              </p>
              <p className="mb-6">
                The core challenge is that different AI APIs report usage in incompatible formats.
                Anthropic, OpenAI, and Google each use different field names and structures.
                Veil normalizes all usage data into a canonical format before pricing and settlement.
              </p>

              <h3 className="mb-3 font-bold text-foreground">8.2 Metering Architecture</h3>
              <AsciiDiagram>
{`+------------------------------------------------------+
|                  METERING FLOW                       |
+------------------------------------------------------+
|                                                      |
|  Provider --> AI API --> Response + usage             |
|      |                                               |
|      +-- Extract usage from API response             |
|      +-- Normalize to canonical format               |
|      +-- Sign usage data                             |
|      |                                               |
|      +-------> Send to Relay (usage + signature)     |
|      |              |                                |
|      |         Relay verifies signature              |
|      |         Relay generates witness               |
|      |         Relay stores in local DB              |
|      |              |                                |
|      |         Accumulate >= $1                      |
|      |              |                                |
|      |         Batch settlement                      |
|      |         (Day 1: direct USDC transfer)         |
|      |         (Stage 2+: on-chain Escrow)           |
|      |                                               |
|      +-------> Send to Consumer (encrypted)          |
|                Consumer verifies locally              |
|                                                      |
+------------------------------------------------------+`}
              </AsciiDiagram>

              <h3 className="mb-3 font-bold text-foreground">8.3 Usage Normalization</h3>
              <p className="mb-4">
                Providers extract token counts from API responses and normalize them into a
                canonical format. This abstraction layer handles field name differences across
                all major AI providers:
              </p>
              <CodeBlock>
{`NormalizedUsage {
  input: number      // prompt tokens (incl. system prompt)
  output: number     // completion tokens
  cacheRead: number  // cache-hit input tokens
  cacheWrite: number // cache-creation input tokens
  total: number      // input + output
}

Normalization Map:
+-----------+----------------+-------------------+--------------+
| Provider  | input          | output            | cacheRead    |
+-----------+----------------+-------------------+--------------+
| Anthropic | input_tokens   | output_tokens     | cache_read_* |
| OpenAI    | prompt_tokens  | completion_tokens | cached_tkns  |
| Google    | promptTokenCt  | candidateTokenCt  | cachedCntTCt |
+-----------+----------------+-------------------+--------------+`}
              </CodeBlock>
              <p className="mb-6">
                For streaming responses, token counts arrive in the final chunk or stream-end event.
                Providers must wait for stream completion before submitting usage to the relay.
                When APIs do not return usage data (private deployments, legacy APIs), providers
                use local tokenizer estimation, marked as estimated with a &plusmn;10% challenge threshold.
              </p>

              <h3 className="mb-3 font-bold text-foreground">8.4 Pricing Formula</h3>
              <CodeBlock>
{`consumer_cost = (input_tokens  x model_input_price
              + output_tokens x model_output_price) / 1,000,000

Veil Price = Official API Price x discount_ratio

  Day 1:  discount_ratio = 0.50  (50% of official)
  Later:  Surge engine adjusts   (0.30 - 0.80)

Cache Token Pricing:
  cache_read_price  = input_price x 0.10  (90% discount)
  cache_write_price = input_price x 1.25  (25% premium)

Incentive: Providers maintain caches to reduce their
API costs. Consumers benefit from lower cache-read rates.
Market naturally optimizes for cache efficiency.`}
              </CodeBlock>

              <h3 className="mb-3 font-bold text-foreground">8.5 Provider Cost Structures</h3>
              <p className="mb-4">
                The protocol does not differentiate between provider cost models. Pricing is
                uniform per-token. How providers source their capacity is their own concern:
              </p>
              <ul className="mb-6 list-inside list-disc">
                <li className="mb-2"><strong className="text-foreground">Subscription Providers</strong>: Fixed monthly fee ($20/month), near-zero marginal cost until usage limits. Higher margins but account suspension risk.</li>
                <li className="mb-2"><strong className="text-foreground">API Providers</strong>: Per-token cost, linear pricing. Lower margins but stable and predictable. No suspension risk.</li>
              </ul>
              <p className="mb-6">
                The market self-balances: subscription providers offer better margins but carry
                risk; API providers offer reliability but thinner margins. Both coexist and serve
                different demand profiles.
              </p>

              <h3 className="mb-3 font-bold text-foreground">8.6 Settlement Progression</h3>
              <AsciiDiagram>
{`+------------------------------------------------------+
|              SETTLEMENT PROGRESSION                   |
+------------------------------------------------------+
|                                                      |
|  Day 1:   Provider reports usage                     |
|           Relay records witness (SQLite)              |
|           Direct USDC transfer on accumulation        |
|           Trust model: Relay operator                 |
|                                                      |
|  Stage 1: + Consumer local verification              |
|           + Price table on-chain                      |
|           Trust model: Relay + Consumer audit         |
|                                                      |
|  Stage 2: + On-chain Escrow + fraud proofs           |
|           Trust model: Trustless                      |
|                                                      |
|  Stage 3: + Surge dynamic pricing + DAO governance   |
|           Trust model: Fully decentralized            |
|                                                      |
+------------------------------------------------------+`}
              </AsciiDiagram>

              <h3 className="mb-3 font-bold text-foreground">8.7 Anti-Fraud Mechanisms</h3>
              <p className="mb-4">
                Three fraud vectors are addressed:
              </p>
              <ul className="mb-4 list-inside list-disc">
                <li className="mb-2"><strong className="text-foreground">Provider over-reports usage</strong>: Consumer re-calculates locally with tokenizer. Discrepancy {">"}10% triggers challenge. Provider stake slashed 50%.</li>
                <li className="mb-2"><strong className="text-foreground">Provider under-reports usage</strong>: Relay witness does not match provider report. Relay refuses to sign witness. No settlement without witness.</li>
                <li className="mb-2"><strong className="text-foreground">Relay tampers with usage</strong>: Provider{"'"} original usage is signed. Consumer can verify provider signature against relay-submitted data. On-chain challenge available.</li>
              </ul>
            </Section>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* CHAPTER 9: SETTLEMENT                                           */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <Section id="settlement" number="9" title="Settlement">
              <h3 className="mb-3 font-bold text-foreground">9.1 Optimistic Model</h3>
              <p className="mb-4">
                Veil Protocol uses optimistic settlement—transactions are assumed valid unless challenged.
                This reduces on-chain overhead dramatically: only one witness per batch is submitted,
                rather than individual transaction proofs.
              </p>
              <p className="mb-6">
                The model is inspired by optimistic rollups but adapted for inference workloads.
                Most settlements complete without challenge. The fraud proof system exists for the
                rare cases where disputes arise.
              </p>

              <h3 className="mb-3 font-bold text-foreground">9.2 Settlement Flow</h3>
              <AsciiDiagram>
{`+------------------------------------------------------+
|                  SETTLEMENT FLOW                     |
+------------------------------------------------------+
|                                                      |
|  REQUEST           PROCESS           WITNESS         |
|  ------>           ------>           ------>         |
|  Consumer          Provider          Relay           |
|  sends USDC        executes          submits         |
|  to escrow         inference         to chain        |
|                                                      |
|                24-HOUR WINDOW                          |
|  +------------------------------------------------+  |
|  | Challenge period. Submit fraud proof if any.   |  |
|  | If challenged: arbitration. Else: auto-release |  |
|  +------------------------------------------------+  |
|                                                      |
|                     RELEASE                          |
|  PROVIDER: 80%    RELAY: 10%    TREASURY: 10%        |
|                                                      |
+------------------------------------------------------+`}
              </AsciiDiagram>

              <h3 className="mb-3 font-bold text-foreground">9.3 Fraud Proofs</h3>
              <p className="mb-4">
                Three categories of fraud can be proven on-chain:
              </p>
              <ul className="mb-4 list-inside list-disc">
                <li className="mb-2"><strong className="text-foreground">Quality fraud</strong>: Response does not match request (wrong model, truncated output)</li>
                <li className="mb-2"><strong className="text-foreground">Double-billing</strong>: Same request charged multiple times</li>
                <li className="mb-2"><strong className="text-foreground">Non-delivery</strong>: Payment taken but no response provided</li>
              </ul>
              <p className="mb-6">
                A decentralized watchtower network automatically monitors for fraud and submits proofs.
                Watchtowers earn 30% of slashed amounts as incentive.
              </p>

              <h3 className="mb-3 font-bold text-foreground">9.4 Escalating Slash</h3>
              <CodeBlock>
{`Slash Schedule (per provider):

  1st offense:  30% of stake slashed
  2nd offense:  50% of stake slashed
  3rd offense: 100% of stake slashed + permanent ban

Slash Distribution:
  - 30% to fraud reporter
  - 70% to treasury

Cooldown: 90 days between offense levels`}
              </CodeBlock>
            </Section>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* CHAPTER 10: TASK LIFECYCLE                                       */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <Section id="task-lifecycle" number="10" title="Task Lifecycle">
              <h3 className="mb-3 font-bold text-foreground">10.1 Simple vs. Multi-Turn Tasks</h3>
              <p className="mb-4">
                Simple inference requests involve a single API call: one prompt in, one response out.
                But real-world usage demands more. A consumer may trigger a complex task that requires
                the provider to make 10-20 internal API calls—tool use, multi-step reasoning, iterative
                refinement. The task lifecycle system manages both modes transparently.
              </p>
              <AsciiDiagram>
{`+------------------------------------------------------+
|               TASK TYPE COMPARISON                   |
+------------------------------------------------------+
|                                                      |
|  SIMPLE TASK (1 API call):                           |
|  Consumer --> Relay --> Provider --> AI API (1x)      |
|  Consumer <-- Relay <-- Provider <-- Response         |
|                                                      |
|  MULTI-TURN TASK (N API calls):                      |
|  Consumer --> Relay --> Provider --> AI API #1        |
|                                     AI API #2        |
|                                     AI API #3        |
|                                     ...              |
|                                     AI API #N        |
|  Consumer <-- Relay <-- Provider <-- Final Response   |
|                                                      |
|  Consumer sees 1 request, 1 response.                |
|  Provider's internal calls are invisible.            |
|                                                      |
+------------------------------------------------------+`}
              </AsciiDiagram>

              <h3 className="mb-3 font-bold text-foreground">10.2 Budget Pre-Authorization</h3>
              <p className="mb-4">
                Consumers declare their willingness to pay upfront. This prevents runaway costs on
                complex tasks and gives providers clear boundaries:
              </p>
              <CodeBlock>
{`TaskRequest {
  request_id: string
  model: string
  messages: Message[]

  budget: {
    max_cost_usdc: number    // e.g. $0.50
    max_api_calls: number    // default 50
    max_duration_ms: number  // default 300000 (5 min)
  }
}

Provider behavior:
  cost reaches 80% of budget --> progress notification
  cost reaches 100%          --> stop, return partial result
  api_calls reaches limit    --> stop, return partial result
  duration exceeds limit     --> stop, return partial result`}
              </CodeBlock>

              <h3 className="mb-3 font-bold text-foreground">10.3 Heartbeat Probes</h3>
              <p className="mb-4">
                Long-running tasks risk silent failure—a provider may crash without sending an error
                signal. The relay monitors data flow and sends heartbeat probes when silence is detected:
              </p>
              <AsciiDiagram>
{`+------------------------------------------------------+
|                 PROBE PROTOCOL                       |
+------------------------------------------------------+
|                                                      |
|  Config:                                             |
|    silence_threshold = 30 seconds                    |
|    probe_timeout     = 10 seconds                    |
|    max_failures      = 2 consecutive                 |
|                                                      |
|  Case A: Normal (data flowing)                       |
|    chunks arrive --> reset timer --> no probe         |
|                                                      |
|  Case B: Silent but alive                            |
|    30s silence --> probe --> ack(busy, 2/10 calls)    |
|    --> reset timer, notify consumer of progress      |
|                                                      |
|  Case C: Rate limited                                |
|    30s silence --> probe --> ack(rate_limited)        |
|    --> pause billing, wait or trigger failover       |
|                                                      |
|  Case D: Dead                                        |
|    30s silence --> probe #1 --> 10s timeout           |
|                --> probe #2 --> 10s timeout           |
|    --> declare dead, stop billing, trigger failover  |
|                                                      |
+------------------------------------------------------+`}
              </AsciiDiagram>

              <h3 className="mb-3 font-bold text-foreground">10.4 Probe Sequence Diagram</h3>
              <AsciiDiagram>
{`Consumer          Relay              Provider          AI API
   |                |                    |                |
   |-- request ---->|-- request -------->|-- API #1 ----->|
   |                |                    |<-- response ---|
   |                |                    |-- API #2 ----->|
   |                |                    |  (processing)  |
   |                |  [30s silence]     |                |
   |                |-- probe ---------->|                |
   |                |<-- ack (busy,2/10) |                |
   |<-- progress ---|                    |                |
   |                |                    |<-- response ---|
   |                |                    |-- API #3 ----->|
   |                |                    |                |
   |                |  [30s silence]     |                |
   |                |-- probe #1 ------->|    (dead)      |
   |                |    [10s timeout]   |                |
   |                |-- probe #2 ------->|                |
   |                |    [10s timeout]   |                |
   |                |  [DEAD]            |                |
   |<-- error ------|                    |                |
   |                |-- failover ------->  (new Provider)`}
              </AsciiDiagram>

              <h3 className="mb-3 font-bold text-foreground">10.5 Interruption Billing</h3>
              <p className="mb-4">
                When tasks are interrupted—whether by budget limits, provider failure, or network
                issues—billing follows the principle of paying only for consumed resources:
              </p>
              <CodeBlock>
{`Normal completion:
  cost = sum(all API calls input_tokens) x price_input
       + sum(all API calls output_tokens) x price_output

Budget exceeded:
  cost = actual accumulated cost (<= max_cost_usdc)
  consumer receives partial result

Provider death:
  cost = input_tokens(processed) x price_input
       + output_tokens(received chunks) x price_output
  probe costs: provider's responsibility (not billed)
  undelivered API calls: provider absorbs cost

Stream interruption:
  stream_start --> chunks --> disconnect
  --> relay waits 30s + 2 probes --> declare interrupted
  --> bill based on received chunks only
  --> generate incomplete witness`}
              </CodeBlock>

              <h3 className="mb-3 font-bold text-foreground">10.6 Provider Failover</h3>
              <p className="mb-4">
                When a provider becomes unavailable mid-task, the relay orchestrates automatic
                failover to maintain service continuity:
              </p>
              <AsciiDiagram>
{`+------------------------------------------------------+
|                 FAILOVER FLOW                        |
+------------------------------------------------------+
|                                                      |
|  Original Provider unavailable                       |
|      |                                               |
|      +-- Consumer has remaining budget?              |
|      |     No  --> return partial result + reason     |
|      |     Yes |                                     |
|      |         v                                     |
|      +-- Other Providers online?                     |
|      |     No  --> return partial + "no providers"    |
|      |     Yes |                                     |
|      |         v                                     |
|      +-- Transfer context to new Provider            |
|            |                                         |
|            +-- Simple task: re-send original request |
|            +-- Multi-turn: carry partial result      |
|                 as context, adjust remaining budget  |
|            |                                         |
|            +-- New Provider continues                |
|            +-- Max 3 failovers per request           |
|                                                      |
|  Failover triggers:                                  |
|    - provider_dead (2 probe failures)                |
|    - provider_rate_limited                           |
|    - provider_error                                  |
|    - timeout (max_duration_ms exceeded)              |
|                                                      |
+------------------------------------------------------+`}
              </AsciiDiagram>

              <h3 className="mb-3 font-bold text-foreground">10.7 Provider Reliability Scoring</h3>
              <p className="mb-4">
                Probe and failover data feeds into a reliability scoring system that influences
                future provider selection:
              </p>
              <CodeBlock>
{`ProviderReliability {
  total_tasks: number
  completed_tasks: number
  failed_tasks: number
  avg_probe_response_ms: number
  probe_failure_rate: number
  failover_rate: number
  reliability_score: 0-100
}

Scoring impact:
  - High score: priority in provider selection
  - Low score: restricted from multi-turn tasks
  - 3 consecutive failovers: 30-minute suspension
  - Score recovers over time with good performance`}
              </CodeBlock>
            </Section>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* CHAPTER 11: CONSUMER INTEGRATION                                 */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <Section id="consumer-integration" number="11" title="Consumer Integration">
              <h3 className="mb-3 font-bold text-foreground">11.1 Local Gateway Architecture</h3>
              <p className="mb-4">
                The Veil consumer runs as a local HTTP gateway on localhost:4000, fully compatible
                with the LiteLLM/OpenAI API protocol. Any application that speaks the OpenAI API
                format—Cursor, VS Code Copilot, custom scripts—can use Veil without code changes.
                Just point the base URL to localhost:4000.
              </p>
              <AsciiDiagram>
{`+------------------------------------------------------+
|              CONSUMER GATEWAY                        |
+------------------------------------------------------+
|                                                      |
|  Your App / IDE / Script                             |
|      |                                               |
|      | POST /v1/chat/completions                     |
|      | Authorization: Bearer <local-key>             |
|      v                                               |
|  +------------------------------------------------+  |
|  |  localhost:4000  (Veil Consumer Gateway)       |  |
|  |                                                |  |
|  |  Endpoints:                                    |  |
|  |    POST /v1/chat/completions  (inference)      |  |
|  |    GET  /v1/models            (model list)     |  |
|  |    GET  /health               (status)         |  |
|  |                                                |  |
|  |  Under the hood:                               |  |
|  |    1. Encrypt prompt with Provider pubkey      |  |
|  |    2. Sign request with Consumer key           |  |
|  |    3. Forward via WebSocket to Relay           |  |
|  |    4. Relay routes to Provider                 |  |
|  |    5. Decrypt response, return as OpenAI fmt   |  |
|  +------------------------------------------------+  |
|                                                      |
|  Privacy: Request content never leaves your machine  |
|  in plaintext. Only the Provider can decrypt.        |
|                                                      |
+------------------------------------------------------+`}
              </AsciiDiagram>

              <h3 className="mb-3 font-bold text-foreground">11.2 Seamless Failover</h3>
              <p className="mb-4">
                OpenClaw (the consumer CLI) natively supports LiteLLM providers. The Veil gateway
                integrates as a fallback provider. When your direct API quota runs out, traffic
                automatically routes through Veil—no user intervention required:
              </p>
              <AsciiDiagram>
{`+------------------------------------------------------+
|            AUTOMATIC FAILOVER FLOW                   |
+------------------------------------------------------+
|                                                      |
|  Normal operation:                                   |
|    App --> Direct API (Anthropic/OpenAI)              |
|                                                      |
|  API quota exhausted:                                |
|    App --> Direct API --> 429 Rate Limited            |
|        |                                             |
|        +-- OpenClaw detects 429                      |
|        +-- Auto-failover to localhost:4000 (Veil)    |
|        +-- Request encrypted + routed via Relay      |
|        +-- Response returned in same format          |
|        +-- User sees no interruption                 |
|                                                      |
|  "API quota ran out" scenario:                       |
|    Monthly $20 subscription used up on the 15th      |
|    --> Veil becomes primary for remaining days       |
|    --> Pay per-token at 50% of official rate         |
|    --> Resume direct API when quota refreshes        |
|                                                      |
+------------------------------------------------------+`}
              </AsciiDiagram>

              <h3 className="mb-3 font-bold text-foreground">11.3 Setup</h3>
              <CodeBlock>
{`# Install and start Veil consumer gateway
npx veil init && veil start

# Gateway now running on localhost:4000
# Add to OpenClaw as LiteLLM provider
openclaw onboard --auth-choice litellm-api-key

# Done. OpenClaw will auto-failover when needed.
# No configuration changes to your IDE or scripts.`}
              </CodeBlock>

              <h3 className="mb-3 font-bold text-foreground">11.4 Streaming Support</h3>
              <p className="mb-4">
                The gateway supports full SSE streaming, translating encrypted provider chunks
                into standard OpenAI stream format in real-time. Each chunk is individually
                encrypted and decrypted—the relay never sees plaintext content, even during streaming.
              </p>
              <p>
                The consumer gateway is stateless. No data is persisted locally. Restart it anytime
                without data loss. Keys are stored in the OS secure enclave (Keychain on macOS,
                Credential Manager on Windows, libsecret on Linux).
              </p>
            </Section>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* CHAPTER 12: TOKEN ECONOMICS                                      */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <Section id="token-economics" number="12" title="Token Economics">
              <h3 className="mb-3 font-bold text-foreground">12.1 Three Phases</h3>
              <ul className="mb-6 list-inside list-disc">
                <li className="mb-2"><strong className="text-foreground">Phase 0 (M0-M3)</strong>: Points + USDC. Providers earn USDC (80%) + Points. No token yet.</li>
                <li className="mb-2"><strong className="text-foreground">Phase 1 (M4-M6)</strong>: TGE. Points convert to TOKEN. Elastic release begins.</li>
                <li className="mb-2"><strong className="text-foreground">Phase 2 (M6+)</strong>: Full tokenomics. Staking, governance, burn mechanism active.</li>
              </ul>

              <h3 className="mb-3 font-bold text-foreground">12.2 Supply Distribution</h3>
              <CodeBlock>
{`Total Supply: 1,000,000,000 TOKEN (fixed)

Mining Pool:     35% (350M) - Provider/relay rewards
Ecosystem:       20% (200M) - Grants, partnerships
Team:            15% (150M) - 4-year vest, 1-year cliff
Community:       10% (100M) - Airdrops, early users
Treasury:        10% (100M) - Protocol development
Liquidity:       10% (100M) - DEX bootstrapping`}
              </CodeBlock>

              <h3 className="mb-3 font-bold text-foreground">12.3 Elastic Release</h3>
              <p className="mb-6">
                TOKEN release is proportional to protocol revenue, preventing death spirals where
                falling prices cause selling pressure. When revenue drops, fewer tokens release,
                maintaining price stability. Unstaking requires a 30-day cooldown period.
              </p>

              <h3 className="mb-3 font-bold text-foreground">12.4 Revenue Flywheel</h3>
              <AsciiDiagram>
{`+------------------------------------------------------+
|                 REVENUE FLYWHEEL                     |
+------------------------------------------------------+
|                                                      |
|    +-------------+                                   |
|    |  INFERENCE  | <------------------------+        |
|    |  (Lung 1)   |                          |        |
|    +------+------+                          |        |
|           | generates                       |        |
|           v                                 |        |
|    +-------------+                          |        |
|    | USDC REVENUE|                          | more   |
|    +------+------+                          | users  |
|           | 10% to                          |        |
|           v                                 |        |
|    +-------------+                          |        |
|    |  TREASURY   |                          |        |
|    +------+------+                          |        |
|           | funds                           |        |
|           v                                 |        |
|    +-------------+    better protocol       |        |
|    | BUILD (L2)  | -------------------->----+        |
|    +-------------+                                   |
|                                                      |
|  Points/TOKEN = claims against Treasury USDC.        |
|  Cannot issue more than network generates.           |
|  Prevents death spiral.                              |
|                                                      |
+------------------------------------------------------+`}
              </AsciiDiagram>

              <h3 className="mb-3 font-bold text-foreground">12.5 Buyback & Burn</h3>
              <CodeBlock>
{`Buyback Phases:

  Phase 1 (M6-M12):  Manual buyback
                     Treasury committee executes

  Phase 2 (M12-M18): TWAP buyback
                     Time-weighted average price
                     Algorithmic execution

  Phase 3 (M18+):    Automated on-chain
                     Smart contract execution
                     No human intervention

Budget: Treasury × 20% annually
Destination: All bought tokens are burned`}
              </CodeBlock>
            </Section>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* CHAPTER 13: BUILD PROTOCOL — RBOB                               */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <Section id="build-protocol" number="13" title="Build Protocol — RBOB">
              <h3 className="mb-3 font-bold text-foreground">13.1 The Insight</h3>
              <p className="mb-4">
                Most open-source projects replicate corporate structure with volunteers.
                Maintainers become bottlenecks. Pull requests wait in queues. Contributors burn out.
              </p>
              <p className="mb-4">
                This works for humans—we have limited cognition, need coordination, require motivation.
              </p>
              <p className="mb-4">
                An agent is not human.
              </p>
              <p className="mb-4">
                It reads entire codebases in seconds. It does not need standups. It does not need Slack.
                It does not need motivation.
              </p>
              <p className="mb-6">
                It needs rules.
              </p>
              <p className="mb-4">
                Satoshi understood this. He did not design mining pools or coordinate hashrate. He wrote
                rules: valid blocks earn rewards, longest chain wins, difficulty adjusts. An industry
                emerged. Thousands of miners, billions of dollars, zero task boards.
              </p>
              <p className="mb-6">
                Veil Protocol takes the same approach to software development.
              </p>

              <h3 className="mb-3 font-bold text-foreground">13.2 Four Rules</h3>
              <AsciiDiagram>
{`+------------------------------------------------------+
|                    THE FOUR RULES                    |
+------------------------------------------------------+
|                                                      |
|  R1  Pass verification → merge                       |
|      Tests pass. Lints pass. Types check. Merge.     |
|                                                      |
|  R2  K independent stake signatures                  |
|      Multiple approvers, each with skin in game.     |
|                                                      |
|  R3  Protected paths = higher threshold              |
|      Core contracts need more sigs than docs.        |
|                                                      |
|  R4  Surviving code = revenue share                  |
|      Code in production earns forever.               |
|                                                      |
+------------------------------------------------------+
|  NOT SPECIFIED (intentionally):                      |
|    - How to write code                               |
|    - How to review code                              |
|    - How to organize teams                           |
|    - When to work                                    |
|    - Who approves what                               |
|                                                      |
|  clawd figures it out.                               |
+------------------------------------------------------+`}
              </AsciiDiagram>

              <h3 className="mb-3 font-bold text-foreground">13.3 Repository IS Task Board</h3>
              <p className="mb-4">
                Traditional projects maintain separate task systems: Jira, Linear, GitHub Issues.
                These require human maintenance. They drift from reality. They become bureaucratic overhead.
              </p>
              <p className="mb-6">
                In RBOB, the repository itself declares what it needs:
              </p>
              <CodeBlock>
{`// Failing tests = tasks
npm test
> 3 failing

// TODO comments = tasks
grep -r "TODO:" src/
> src/pricing.ts:42: TODO: implement capacity-aware pricing

// Desired state files = tasks
cat .desired/features.yaml
> - feature: multi-account pooling
>   status: not_implemented`}
              </CodeBlock>
              <p>
                No separate task system. The codebase declares what it needs through its own state.
                Agents read, understand, implement. No meetings required.
              </p>

              <h3 className="mb-3 font-bold text-foreground">13.4 Stake as Alignment</h3>
              <p className="mb-4">
                Every approval is a bet.
              </p>
              <p className="mb-4">
                When you sign off on a merge, your stake is locked. If that code causes issues—
                downtime, security breach, regression—your stake is slashed. This replaces code
                review culture with economic accountability.
              </p>
              <CodeBlock>
{`Lock Periods (by code criticality):

  Shallow (docs, tests):      7 days
  Mid (features, UI):        30 days
  Deep (core logic):         90 days
  Edge (contracts, crypto): 180 days`}
              </CodeBlock>
              <p>
                Approvers who consistently approve good code build reputation and earn more.
                Approvers who approve bugs lose stake. Natural selection for quality.
              </p>

              <h3 className="mb-3 font-bold text-foreground">13.5 Three Precedents</h3>
              <p className="mb-4">
                This is not theory. Similar systems have built extraordinary things:
              </p>
              <ul className="mb-4 list-inside list-disc">
                <li className="mb-2"><strong className="text-foreground">Linux</strong>: Best patch wins. 35 years. 96% of supercomputers. No product managers.</li>
                <li className="mb-2"><strong className="text-foreground">Wikipedia</strong>: Anyone can edit. 60 million articles. More accurate than Britannica on technical topics.</li>
                <li className="mb-2"><strong className="text-foreground">Bitcoin</strong>: Few rules, open participation. $1 trillion in 15 years. No company.</li>
              </ul>
              <p>
                Same hypothesis: simple rules + open participation = emergent complexity exceeding
                any designed system.
              </p>
            </Section>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* CHAPTER 11: WALLET & ONBOARDING                                 */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <Section id="wallet-onboarding" number="11" title="Wallet & Onboarding">
              <h3 className="mb-3 font-bold text-foreground">11.1 Device Encryption</h3>
              <p className="mb-4">
                The clawd wallet stores keys in device secure enclave (Keychain on macOS, Credential
                Manager on Windows, libsecret on Linux). Keys never exist in plaintext on disk.
              </p>
              <CodeBlock>
{`// Key storage (platform-specific)
macOS:    Keychain Services (Secure Enclave)
Windows:  Windows Credential Manager (DPAPI)
Linux:    libsecret (kernel keyring)
Mobile:   iOS Keychain / Android Keystore`}
              </CodeBlock>

              <h3 className="mb-3 font-bold text-foreground">11.2 Progressive Backup</h3>
              <p className="mb-4">
                Backup requirements scale with balance:
              </p>
              <AsciiDiagram>
{`+------------------------------------------------------------+
|                  PROGRESSIVE BACKUP                        |
+------------------------------------------------------------+
|                                                            |
|  Balance: $0 - $100                                        |
|  Backup:  Optional (email recovery phrase)                 |
|  Risk:    Low - acceptable for trial users                 |
|                                                            |
|  Balance: $100 - $1,000                                    |
|  Backup:  Mandatory (encrypted cloud backup)               |
|  Risk:    Medium - most users                              |
|                                                            |
|  Balance: $1,000+                                          |
|  Backup:  Multi-device required                            |
|  Risk:    High - force distributed backup                  |
|                                                            |
+------------------------------------------------------------+`}
              </AsciiDiagram>

              <h3 className="mb-3 font-bold text-foreground">11.3 Three-Tier Architecture</h3>
              <ul className="mb-4 list-inside list-disc">
                <li className="mb-2"><strong className="text-foreground">Hot wallet</strong>: Daily spending. Small balance. Device-local keys.</li>
                <li className="mb-2"><strong className="text-foreground">Warm wallet</strong>: Staking. Moderate balance. Cloud backup required.</li>
                <li className="mb-2"><strong className="text-foreground">Cold wallet</strong>: Large holdings. Hardware wallet integration. Multi-sig optional.</li>
              </ul>
              <p>
                Most users never interact with warm/cold wallets. The hot wallet handles typical
                inference spending with minimal friction.
              </p>
            </Section>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* CHAPTER 12: ROADMAP                                             */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <Section id="roadmap" number="12" title="Roadmap">
              <AsciiDiagram>
{`+------------------------------------------------------+
|  Timeline                                            |
|  ------------------------------------------------    |
|                                                      |
|  M0        M1        M2-3      M4-6      M6+         |
|  |         |         |         |         |           |
|  v         v         v         v         v           |
|  +-------+ +-------+ +-------+ +-------+ +-------+   |
|  |TESTNET| |MAINNET| |  TGE  | |STAKING| |  DAO  |   |
|  |       | | BETA  | |       | |       | |       |   |
|  |clawd  | |Provid.| |Points | |Full   | |On-    |   |
|  |CLI +  | |Network| |convert| |token  | |chain  |   |
|  |relay  | |Launch | |→TOKEN | |economy| |govern |   |
|  +-------+ +-------+ +-------+ +-------+ +-------+   |
|                                                      |
+------------------------------------------------------+`}
              </AsciiDiagram>
            </Section>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* CHAPTER 13: RELATED WORK                                        */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <Section id="related-work" number="13" title="Related Work">
              <AsciiDiagram>
{`                    Veil       API        GPU      Informal
Feature             Protocol   Aggregators Markets  Sharing
------------------- ---------- ---------- -------- ---------
Permissionless      YES        NO         YES      YES
Privacy preserving  YES        NO         PARTIAL  TRUST
Crypto payments     YES        SOME       YES      NO
Censorship resist   YES        NO         YES      NO
Quality guarantee   YES        YES        NO       NO
Price discovery     DYNAMIC    FIXED      AUCTION  NONE`}
              </AsciiDiagram>
            </Section>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* CHAPTER 14: CONCLUSION                                          */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <Section id="conclusion" number="14" title="Conclusion">
              <p className="mb-4">
                Veil is not a product. It is a protocol—a set of rules that enable permissionless
                AI access without central authority.
              </p>
              <p className="mb-4">
                The code is open source. The network is operated by its participants. The treasury
                is governed by token holders. The protocol builds itself through RBOB.
              </p>
              <p className="mb-4">
                Two lungs breathe as one: inference generates revenue, build makes it better. Together,
                they form a self-sustaining system where better infrastructure attracts more usage,
                which funds more development, which creates better infrastructure.
              </p>
              <p className="mb-4">
                We believe AI access should be as open as internet access. No credit cards. No KYC.
                No content moderation. No geographic restrictions. Just rules and verification.
              </p>
              <p>
                Your clawd is the next contributor.
              </p>
            </Section>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* CHAPTER 15: REFERENCES                                          */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <Section id="references" number="15" title="References">
              <ol className="list-inside list-decimal">
                <li className="mb-2">Nakamoto, S. (2008). Bitcoin: A Peer-to-Peer Electronic Cash System.</li>
                <li className="mb-2">Buterin, V. (2014). Ethereum: A Next-Generation Smart Contract Platform.</li>
                <li className="mb-2">Benet, J. (2014). IPFS - Content Addressed, Versioned, P2P File System.</li>
                <li className="mb-2">Protocol Labs. (2017). Filecoin: A Decentralized Storage Network.</li>
                <li className="mb-2">Kalodner, H. et al. (2018). Arbitrum: Scalable, private smart contracts.</li>
                <li className="mb-2">Intel Corporation. (2016). Intel Software Guard Extensions.</li>
                <li className="mb-2">Adams, H. et al. (2021). Uniswap v3 Core.</li>
                <li className="mb-2">World Bank. (2021). The Global Findex Database.</li>
                <li className="mb-2">Benkler, Y. (2006). The Wealth of Networks: How Social Production Transforms Markets and Freedom.</li>
                <li className="mb-2">Raymond, E. (1999). The Cathedral and the Bazaar: Musings on Linux and Open Source.</li>
                <li className="mb-2">Ostrom, E. (1990). Governing the Commons: The Evolution of Institutions for Collective Action.</li>
              </ol>
            </Section>

            {/* Back to home */}
            <div className="mt-16 border-t border-border pt-8">
              <Link
                href="/"
                className="flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft size={14} />
                <span>Back to Home</span>
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
