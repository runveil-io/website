export interface TechSection {
  id: string
  number: string
  title: string
  subtitle: string
  description: string
  ascii: string
  specs: { label: string; value: string }[]
  commands: string[]
}

export const techSections: TechSection[] = [
  {
    id: "protocol-design",
    number: "01",
    title: "Protocol Design",
    subtitle: "Architecture",
    description:
      "Three roles. One network. No central authority. Providers share idle AI capacity through relays. Consumers access models anonymously. Everything settles on Solana.",
    ascii: `
┌─────────────────────────────────────┐
│       YOUR REQUEST JOURNEY          │
│                                     │
│  YOU          RELAY       PROVIDER  │
│  ┌──────┐  ┌─────────┐  ┌───────┐  │
│  │prompt│─>│ sees YOU │─>│ sees  │  │
│  │encryp│  │ can't    │  │prompt │  │
│  │ ted  │  │read it   │  │not YOU│  │
│  └──────┘  └────┬────┘  └───────┘  │
│                 │                   │
│      ┌──────────┴──────────┐       │
│      │    SOLANA CHAIN     │       │
│      │  payment settles    │       │
│      │  nobody sees both   │       │
│      └─────────────────────┘       │
└─────────────────────────────────────┘`,
    specs: [
      { label: "Cost", value: "~$0.003 per message" },
      { label: "Latency", value: "+50ms vs direct API" },
      { label: "Privacy", value: "Nobody sees both who and what" },
      { label: "Encryption", value: "X25519 + ChaCha20" },
    ],
    commands: [
      "$ veil status",
      "Protocol: v1.0.0 | Network: MAINNET",
      "$ veil providers --count",
      "Online: 1 (testnet) | TEE: 0",
      "$ veil relays --count",
      "Active: 1 relay (testnet)",
    ],
  },
  {
    id: "security-model",
    number: "02",
    title: "Security and Privacy",
    subtitle: "Trust architecture. Anonymity by design.",
    description:
      "Open source. Security by math and economics, not obscurity. Four layers. Each works even if providers modify their code. Identity stripped at source. Zero logging.",
    ascii: ``,
    specs: [
      { label: "Baseline", value: "Math + Economics" },
      { label: "Open Source", value: "MIT License" },
      { label: "Trust Required", value: "None" },
      { label: "Auditable", value: "By Anyone" },
    ],
    commands: [],
  },
  {
    id: "network-install",
    number: "03",
    title: "Network & Install",
    subtitle: "Decentralized access",
    description:
      "clawd is the only way to access Veil. No public API gateway. No API keys. A local OpenAI-compatible gateway that Cursor, Windsurf, or any tool can connect to.",
    ascii: `
       [C]───────[R]
       /│\\         │\\
      / │ \\        │ \\
    [P] │ [R]──────[R] [P]
     \\  │ /        │  /
      \\ │/         │ /
       [R]───────[R]
        │           │
       [P]───────[C]
       
    C = Consumer
    R = Relay
    P = Provider`,
    specs: [
      { label: "Protocol", value: "QUIC" },
      { label: "Transport", value: "E2E TLS" },
      { label: "Latency", value: "<50ms" },
      { label: "Bandwidth", value: "Adaptive" },
    ],
    commands: [
      "$ npx clawhub@latest install",
      "> clawd installed successfully",
      "$ clawd provide start",
      "> Mining started. Wallet: 7xK2...3mNp",
      "$ clawd credits add 10",
      "> Balance: $10.00",
    ],
  },
  {
    id: "token-economics",
    number: "04",
    title: "Token Economics",
    subtitle: "Sustainable incentives",
    description:
      "Seven phases: Points, TGE, Staking, Pricing, Settlement, Burn, DAO. 1B fixed supply with deflationary burns. Revenue-proportional elastic release prevents death spirals.",
    ascii: ``,
    specs: [
      { label: "Revenue Split", value: "80% / 10% / 10%" },
      { label: "Release", value: "Elastic (Revenue)" },
      { label: "Supply", value: "1B Fixed" },
      { label: "Anti-Sybil", value: "Points = USDC spent" },
    ],
    commands: [],
  },
  {
    id: "build",
    number: "05",
    title: "Build",
    subtitle: "Emergent development",
    description:
      "Satoshi didn't design mining pools. He wrote a few rules. Pools, farms, exchanges, Lightning Network — all emerged on their own.",
    ascii: ``,
    specs: [
      { label: "Rules", value: "4" },
      { label: "Verification", value: "Automated" },
      { label: "Stake", value: "Progressive" },
      { label: "Revenue", value: "Anchored" },
    ],
    commands: [],
  },
]

export const navLinks = [
  { id: "protocol-design", number: "01", title: "Protocol" },
  { id: "security-model", number: "02", title: "Security" },
  { id: "network-install", number: "03", title: "Network" },
  { id: "token-economics", number: "04", title: "Token" },
  { id: "build", number: "05", title: "Build" },
]
