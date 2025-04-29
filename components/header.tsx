"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Technologies", href: "#technologies" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
]

// Split nav items for desktop view
const primaryNavItems = navItems.filter(item => ["Home", "About", "Projects", "Contact"].includes(item.name));
const secondaryNavItems = navItems.filter(item => !["Home", "About", "Projects", "Contact"].includes(item.name));

// Define animation variants centrally
const smoothSpring = { type: "spring", stiffness: 350, damping: 30 };

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("") // Initialize empty, let effect handle initial
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const isMobile = useMobile()
  const moreMenuRef = useRef<HTMLDivElement>(null);

  // Effect for closing dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setShowMoreMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [moreMenuRef]);

  // Effect for scroll spy
  useEffect(() => {
    const sections = navItems.map(item => document.getElementById(item.href.substring(1)))

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) { // Trigger when 50% visible
          setActiveSection(`#${entry.target.id}`);
        }
      });
    }, {
      rootMargin: "-80px 0px -50% 0px", // Adjust rootMargin: top offset for header, bottom offset to prefer top item
      threshold: 0.5 // Trigger at 50% visibility
    });

    // Set initial active section on load without observer
    let initialSectionFound = false;
    for (const section of sections) {
      if (section) {
        const rect = section.getBoundingClientRect();
        // Check if section is at the top of the viewport
        if (rect.top >= 0 && rect.top <= 150) {
          setActiveSection(`#${section.id}`);
          initialSectionFound = true;
          break;
        }
      }
    }
    // Fallback if no section is initially in view (e.g., page bottom)
    if (!initialSectionFound) {
      const firstSection = sections.find(s => s);
      if (firstSection) setActiveSection(`#${firstSection.id}`);
    }


    sections.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []); // Rerun only on mount

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false)
    setShowMoreMenu(false)
    // Manually set active section immediately for faster UI feedback
    setActiveSection(href)

    requestAnimationFrame(() => {
      const element = document.querySelector(href)
      if (element) {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    });
  }

  return (
    <motion.header
      // Removed initial animation here, handled by scroll state
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        "bg-transparent py-4",
      )}
    >
      <div className="container flex items-center justify-between">
        <Link
          href="#home"
          className="group relative font-extrabold text-2xl transition-all duration-300"
          onClick={(e) => {
            e.preventDefault()
            scrollToSection("#home")
          }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-500 dark:from-indigo-400 dark:via-purple-400 dark:to-teal-400">
            JaisFolio
          </span>
          {/* Optional: Underline on hover for logo */}
          {/* <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 dark:from-indigo-400 dark:via-purple-400 dark:to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span> */}
        </Link>

        {isMobile ? (
          <>
            {/* Mobile Menu Toggle and Theme Toggle */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden rounded-full hover:bg-indigo-50/50 dark:hover:bg-indigo-950/50 transition-colors duration-300 p-2"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={mobileMenuOpen ? "x" : "menu"}
                    initial={{ rotate: mobileMenuOpen ? -90 : 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: mobileMenuOpen ? 90 : -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {mobileMenuOpen ?
                      <X className="h-5 w-5 text-indigo-600 dark:text-indigo-400" /> :
                      <Menu className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    }
                  </motion.div>
                </AnimatePresence>
              </Button>
            </div>

            {/* Mobile Menu Panel */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="fixed inset-x-0 top-16 z-40 bg-white/90 dark:bg-gray-950/90 backdrop-blur-lg shadow-lg overflow-hidden"
                  style={{ borderBottomLeftRadius: '1rem', borderBottomRightRadius: '1rem' }}
                >
                  <nav className="flex flex-col gap-2 p-4">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="relative"
                      >
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center text-base font-medium transition-colors duration-200 py-3 px-4 rounded-lg w-full",
                            activeSection === item.href
                              ? "text-indigo-700 dark:text-indigo-300 font-semibold bg-indigo-50/80 dark:bg-indigo-950/60"
                              : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30"
                          )}
                          onClick={(e) => {
                            e.preventDefault()
                            scrollToSection(item.href)
                          }}
                        >
                          {activeSection === item.href && (
                            <motion.span
                              layoutId="activeMobileIndicator" // Unique layoutId for mobile
                              className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 via-purple-500 to-teal-500 rounded-r-full"
                              initial={false}
                              transition={smoothSpring} // Use smooth spring animation
                            />
                          )}
                          <motion.span
                            className="ml-4 relative z-10" // Ensure text is above indicator
                            animate={{ scale: activeSection === item.href ? 1.03 : 1 }} // Subtle scale on active
                            transition={{ duration: 0.2 }}
                          >
                            {item.name}
                          </motion.span>
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          // Desktop Navigation
          <div className="flex items-center gap-5">
            <nav className="flex items-center gap-1 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md rounded-full px-2 py-1 border border-gray-200/30 dark:border-gray-800/30 shadow-sm">
              {/* Primary Nav Items */}
              {primaryNavItems.map((item) => (
                <div key={item.name} className="relative">
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 relative block group", // Use block for layout anim
                      activeSection === item.href
                        ? "text-white dark:text-gray-950" // Active text color
                        : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                    )}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(item.href)
                    }}
                  >
                    {activeSection === item.href && (
                      <motion.span
                        layoutId="activeDesktopIndicator" // Unique layoutId for desktop
                        className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-500 rounded-full -z-10 shadow-md"
                        initial={false}
                        transition={smoothSpring} // Use smooth spring animation
                      />
                    )}
                    <motion.span
                      className="relative z-10" // Ensure text is above indicator
                      animate={{ scale: activeSection === item.href ? 1.05 : 1 }} // Subtle scale on active
                      transition={{ duration: 0.2 }}
                    >
                      {item.name}
                    </motion.span>
                  </Link>
                </div>
              ))}

              {/* More Dropdown Button */}
              {secondaryNavItems.length > 0 && (
                <div className="relative" ref={moreMenuRef}>
                  <button
                    onClick={() => setShowMoreMenu(!showMoreMenu)}
                    className={cn(
                      "flex items-center text-sm font-medium px-4 py-2 rounded-full transition-colors duration-200 group relative", // Use relative for indicator positioning
                      secondaryNavItems.some(item => item.href === activeSection)
                        ? "text-white dark:text-gray-950" // Active style if an item inside is active
                        : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                    )}
                    aria-haspopup="true"
                    aria-expanded={showMoreMenu}
                  >
                    {secondaryNavItems.some(item => item.href === activeSection) && (
                      // Apply gradient background if an item inside is active
                      <motion.span
                        layoutId="activeDesktopIndicator" // Share the same layoutId
                        className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-500 rounded-full -z-10 shadow-md"
                        initial={false}
                        transition={smoothSpring}
                      />
                    )}
                    <motion.span
                      className="relative z-10" // Ensure text is above indicator
                      animate={{ scale: secondaryNavItems.some(item => item.href === activeSection) ? 1.05 : 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      More
                    </motion.span>
                    <ChevronDown className={cn(
                      "ml-1 h-4 w-4 transition-transform duration-200 relative z-10",
                      showMoreMenu ? "transform rotate-180" : "",
                      secondaryNavItems.some(item => item.href === activeSection) ? "" : "text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400" // Icon color
                    )} />
                  </button>

                  {/* Dropdown Menu Content */}
                  <AnimatePresence>
                    {showMoreMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -5, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -5, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute top-full right-0 mt-2 w-48 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-lg shadow-xl py-2 z-50 origin-top-right"
                      >
                        {secondaryNavItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                              "block px-4 py-2 text-sm transition-colors duration-200 w-full text-left",
                              activeSection === item.href
                                ? "font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50/60 dark:bg-indigo-900/40"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                            )}
                            onClick={(e) => {
                              e.preventDefault()
                              scrollToSection(item.href)
                              // setShowMoreMenu(false) // Already handled by effect
                            }}
                          >
                            {/* Add subtle scale on hover/active for dropdown items too */}
                            <motion.span
                              animate={{ scale: activeSection === item.href ? 1.03 : 1 }}
                              transition={{ duration: 0.2 }}
                              className="inline-block"
                            >
                              {item.name}
                            </motion.span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </nav>
            {/* Theme toggle outside the nav group */}
            <ThemeToggle />
          </div>
        )}
      </div>
    </motion.header>
  )
}
