import Hero from "@/components/hero"
import About from "@/components/about"
import Services from "@/components/services"
import Technologies from "@/components/technologies"
import Experience from "@/components/experience"
import Testimonials from "@/components/testimonials"
import Projects from "@/components/projects"
import Contact from "@/components/contact"

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="fixed inset-0 -z-50 pointer-events-none">
        <div className="absolute -right-20 top-1/4 w-80 h-80 rounded-full bg-indigo-500/10 filter blur-3xl opacity-50" />
        <div className="absolute -left-20 top-2/3 w-80 h-80 rounded-full bg-purple-500/10 filter blur-3xl opacity-50" />
        <div className="absolute left-1/3 bottom-0 w-80 h-80 rounded-full bg-pink-500/10 filter blur-3xl opacity-50" />
      </div>
      
      {/* Hero Section */}
      <Hero />
      
      {/* About Section with divider */}
      <div className="container mx-auto px-4">
        <div className="section-divider" aria-hidden="true"></div>
      </div>
      <About />
      
      {/* Services Section with divider */}
      <div className="container mx-auto px-4">
        <div className="section-divider" aria-hidden="true"></div>
      </div>
      <Services />
      
      {/* Technologies Section with divider */}
      <div className="container mx-auto px-4">
        <div className="section-divider" aria-hidden="true"></div>
      </div>
      <Technologies />
      
      {/* Experience Section with divider */}
      <div className="container mx-auto px-4">
        <div className="section-divider" aria-hidden="true"></div>
      </div>
      <Experience />
      
      {/* Projects Section with divider */}
      <div className="container mx-auto px-4">
        <div className="section-divider" aria-hidden="true"></div>
      </div>
      <Projects />
      
      {/* Testimonials Section with divider */}
      <div className="container mx-auto px-4">
        <div className="section-divider" aria-hidden="true"></div>
      </div>
      <Testimonials />
      
      {/* Contact Section with divider */}
      <div className="container mx-auto px-4">
        <div className="section-divider" aria-hidden="true"></div>
      </div>
      <Contact />
    </main>
  )
} 