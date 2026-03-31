import type { Metadata, Viewport } from "next"
import { Geist_Mono, Silkscreen } from "next/font/google"
import { GeistPixelLine } from "geist/font/pixel"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const silkscreen = Silkscreen({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-pixel",
})

const geistPixelLine = GeistPixelLine

export const metadata: Metadata = {
  title: "Veil Protocol | Private Access. Permissionless AI.",
  description:
    "A decentralized AI inference protocol. Share idle AI capacity, earn rewards. Access top models with crypto. No KYC. No tracking. Open source.",
  generator: "v0.app",
  keywords: [
    "Veil Protocol",
    "decentralized AI",
    "AI inference",
    "crypto",
    "privacy",
    "Solana",
    "permissionless",
    "protocol",
  ],
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${geistPixelLine.variable}`}>
      <body
        className={`${geistMono.variable} ${silkscreen.variable} font-mono antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
