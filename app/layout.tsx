import type React from "react"
import "@/app/globals.css"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/react"


const satoshi = localFont({
  src: [
    {
      path: '../public/fonts/satoshi/Satoshi-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/satoshi/Satoshi-LightItalic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../public/fonts/satoshi/Satoshi-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/satoshi/Satoshi-Italic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/satoshi/Satoshi-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/satoshi/Satoshi-MediumItalic.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../public/fonts/satoshi/Satoshi-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/satoshi/Satoshi-BoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../public/fonts/satoshi/Satoshi-Black.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../public/fonts/satoshi/Satoshi-BlackItalic.otf',
      weight: '900',
      style: 'italic',
    }
  ],
  variable: '--font-satoshi'
})

export const metadata = {
  title: "NJT - Nilesh Jaiswar Technologies",
  description: "Professional portfolio showcasing innovative full-stack development and AI solutions by Nilesh Jaiswar",
  keywords: ["web development", "full stack", "AI solutions", "portfolio", "Nilesh Jaiswar", "react", "nextjs"],
  authors: [{ name: "Nilesh Jaiswar" }],
  creator: "Nilesh Jaiswar",
  metadataBase: new URL("https://nileshjaiswar.tech"),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/logo-dark-bg.png", type: "image/png" }
    ],
    apple: [
      { url: "/images/logo-dark-bg.png", type: "image/png" }
    ]
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nileshjaiswar.tech",
    title: "NJT - Nilesh Jaiswar Technologies",
    description: "Professional portfolio showcasing innovative full-stack development and AI solutions by Nilesh Jaiswar",
    siteName: "NJT - Nilesh Jaiswar Technologies",
    images: [{
      url: "/images/logo-light-bg.png",
      width: 800,
      height: 600,
      alt: "NJT - Nilesh Jaiswar Technologies Logo"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NJT - Nilesh Jaiswar Technologies",
    description: "Professional portfolio showcasing innovative full-stack development and AI solutions by Nilesh Jaiswar",
    images: ["/images/logo-light-bg.png"],
    creator: "@nileshJaiswar"
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="light-theme-gradient">
      <body className={satoshi.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}