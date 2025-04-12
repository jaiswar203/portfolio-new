"use client"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const scrollToContact = () => {
    const contactSection = document.querySelector("#contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToAbout = () => {
    const aboutSection = document.querySelector("#about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-white dark:from-red-950 dark:to-black z-0" />
      
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        {/* Content Column */}
        <div className="flex flex-col justify-center lg:pr-6 pt-8 lg:pt-0">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="text-red-600 dark:text-red-500">Crafting</span> Digital Experiences
          </h1>

          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mb-10">
            Full-stack developer specializing in creating elegant, high-performance web applications that solve real-world
            problems.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white dark:bg-red-600 dark:hover:bg-red-700"
              onClick={scrollToContact}
            >
              Get in Touch
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-red-600 text-red-600 hover:bg-red-50 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-950"
              onClick={scrollToAbout}
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Image Column */}
        <div className={`flex items-center justify-center lg:justify-end overflow-hidden transition-all duration-700 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="relative md:-right-4 lg:-right-8 xl:-right-12 select-none pointer-events-none">
            <Image 
              src="/illustrations/Devices-pana.png" 
              alt="Digital Devices Illustration" 
              width={700} 
              height={700}
              priority
              className="object-contain drop-shadow-sm"
              onLoad={() => setIsLoaded(true)}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Button variant="ghost" size="icon" className="rounded-full" onClick={scrollToAbout}>
          <ChevronDown className="h-6 w-6" />
          <span className="sr-only">Scroll down</span>
        </Button>
      </div>
    </section>
  )
}
