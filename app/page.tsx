import { Navigation } from "@/components/ascii-hub/navigation"
import { HeroSection } from "@/components/ascii-hub/hero-section"
import { InstallCards } from "@/components/ascii-hub/install-cards"
import { TechTicker } from "@/components/ascii-hub/tech-ticker"
import { SectionProtocol } from "@/components/ascii-hub/sections/section-protocol"
import { SectionSecurity } from "@/components/ascii-hub/sections/section-security"
import { SectionNetwork } from "@/components/ascii-hub/sections/section-network"
import { SectionToken } from "@/components/ascii-hub/sections/section-token"
import { SectionBuild } from "@/components/ascii-hub/sections/section-build"
import { PseudoTerminal } from "@/components/ascii-hub/pseudo-terminal"
import { Footer } from "@/components/ascii-hub/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main>
        <HeroSection />

        <InstallCards />

        <TechTicker />

        {/* Section 01: Protocol Design */}
        <SectionProtocol />

        {/* Section 02: Security & Privacy (merged) */}
        <SectionSecurity />

        {/* Section 03: Network & Install */}
        <SectionNetwork />

        {/* Section 04: Token Economics (merged with Surge + Settlement) */}
        <SectionToken />

        {/* Section 05: Build (RBOB) */}
        <SectionBuild />

        {/* Interactive Terminal (no nav entry) */}
        <PseudoTerminal />
      </main>

      <Footer />
    </div>
  )
}
