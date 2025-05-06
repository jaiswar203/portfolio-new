import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Providers } from '@/app/(site)/providers'
import Header from "@/components/header"
import { generateMetadata } from "./page-metadata"

// Export the generateMetadata function
export { generateMetadata }

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      <Providers>
        <Header />
        <main>{children}</main>
      </Providers>
    </ThemeProvider>
  )
} 