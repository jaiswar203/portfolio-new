import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Providers } from './providers'
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata = {
  title: "NJI - Nilesh Jaiswar Technologies",
  description: "Professional portfolio showcasing web development projects and services",
}

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      <Providers>
        <Header />
        <main>{children}</main>
        <Footer />
      </Providers>
    </ThemeProvider>
  )
} 