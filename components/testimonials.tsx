"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useMobile } from "@/hooks/use-mobile"
import { useQuery } from '@tanstack/react-query'
import { testimonialsApi } from "@/lib/api"

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const isMobile = useMobile()
  
  // Fetch testimonials with React Query
  const { data: testimonials = [], isLoading, error } = useQuery({
    queryKey: ['testimonials'],
    queryFn: testimonialsApi.getActiveTestimonials,
  });
  
  const itemsPerPage = isMobile ? 1 : 2
  const totalPages = Math.ceil(testimonials.length / itemsPerPage)

  // Reset active index when data changes
  useEffect(() => {
    setActiveIndex(0);
  }, [testimonials.length]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % Math.max(1, totalPages))
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + Math.max(1, totalPages)) % Math.max(1, totalPages))
  }

  // Auto-advance slides
  useEffect(() => {
    if (testimonials.length === 0) return;
    
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [activeIndex, testimonials.length, nextSlide])

  const visibleTestimonials = testimonials.slice(
    activeIndex * itemsPerPage, 
    activeIndex * itemsPerPage + itemsPerPage
  )

  return (
    <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-950">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Client <span className="text-red-600 dark:text-red-500">Testimonials</span>
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Don&apos;t just take my word for it. Here&apos;s what my clients have to say about working with me.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-red-600 dark:text-red-500" />
          </div>
        ) : error ? (
          <div className="text-center text-red-600 dark:text-red-500 py-10">
            <p>Failed to load testimonials. Please try again later.</p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center text-gray-700 dark:text-gray-300 py-10">
            <p>No testimonials available yet.</p>
          </div>
        ) : (
          <div className="relative">
            <div className="flex flex-col md:flex-row gap-6">
              {visibleTestimonials.map((testimonial) => (
                <Card key={testimonial._id} className="flex-1 border-none shadow-md">
                  <CardContent className="p-6">
                    <Quote className="h-10 w-10 text-red-600/20 dark:text-red-500/20 mb-4" />
                    <p className="text-gray-700 dark:text-gray-300 mb-6 italic">&quot;{testimonial.content}&quot;</p>
                    <div className="flex items-center">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                        <Image
                          src={testimonial.image || "/placeholder.svg?height=80&width=80"}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: Math.max(1, totalPages) }).map((_, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  className={`rounded-full w-3 h-3 p-0 ${
                    activeIndex === index ? "bg-red-600 dark:bg-red-500" : "bg-gray-300 dark:bg-gray-700"
                  }`}
                  onClick={() => setActiveIndex(index)}
                  disabled={testimonials.length === 0}
                >
                  <span className="sr-only">Go to slide {index + 1}</span>
                </Button>
              ))}
            </div>

            {testimonials.length > 0 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 rounded-full hidden md:flex"
                  onClick={prevSlide}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous testimonials</span>
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 rounded-full hidden md:flex"
                  onClick={nextSlide}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next testimonials</span>
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
