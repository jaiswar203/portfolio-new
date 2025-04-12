"use client"

import Link from "next/link"
import { Github, Linkedin, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-gray-50 dark:bg-gray-950 py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link
              href="#home"
              className="text-2xl font-bold text-red-600 dark:text-red-500"
              onClick={(e) => {
                e.preventDefault()
                scrollToTop()
              }}
            >
              JaisFolio
            </Link>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Creating elegant digital experiences</p>
          </div>

          <div className="flex gap-4 mb-6 md:mb-0">
            <Button variant="ghost" size="icon" className="rounded-full" asChild>
              <Link href="https://github.com/jaiswar203" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full" asChild>
              <Link href="https://www.linkedin.com/in/jaiswarnilesh/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
          </div>

          <Button variant="outline" size="icon" className="rounded-full" onClick={scrollToTop}>
            <ArrowUp className="h-4 w-4" />
            <span className="sr-only">Back to top</span>
          </Button>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} JaisFolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
