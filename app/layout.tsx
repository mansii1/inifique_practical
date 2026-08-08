import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"

import "./globals.css"
import { QueryProvider } from "@/components/providers/query-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: {
    default: "Infiniqe Dashboard",
    template: "%s | Infiniqe Dashboard",
  },
  description:
    "CRUD dashboard for products, users, and recipes — Infiniqe frontend practical.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans antialiased", dmSans.variable)}
    >
      <body>
        <ThemeProvider>
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
