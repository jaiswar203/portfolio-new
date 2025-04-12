"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { animate } from "animejs"

const experience = [
  {
    id: 1,
    company: "CreatorEvolve",
    role: "Founder & Full Stack Engineer",
    date: "Jan 2023 - Present",
    detail: [
      "Developed a SaaS platform helping content creators automate tasks and boost productivity",
      "Built end-to-end solutions using Next.js, Express.js, and MongoDB",
      "Integrated AI capabilities for intelligent content optimization and workflow automation",
      "Implemented secure authentication and payment processing using Stripe"
    ]
  },
  {
    id: 2,
    company: "Mauka Education",
    role: "Lead Developer",
    date: "Aug 2021 - Dec 2022",
    detail: [
      "Led the development of a Course Builder that reduced course delivery time by 90%",
      "Integrated advanced features into their LMS to boost productivity for Course Developers",
      "Implemented real-time communication features for student-instructor interactions",
      "Optimized application performance for seamless user experience"
    ]
  },
  {
    id: 3,
    company: "PropertyLoop",
    role: "Full Stack Developer",
    date: "Mar 2021 - Jul 2021",
    detail: [
      "Developed real estate listing and management features using React and Node.js",
      "Created RESTful APIs for property data management and user interactions",
      "Implemented responsive UI components for optimal cross-device experience",
      "Collaborated with design team to create intuitive user interfaces"
    ]
  }
]

export default function Experience() {
  const [selectedTab, setSelectedTab] = useState("1")
  const contentRef = useRef<HTMLDivElement>(null)

  // Animation when tab changes
  useEffect(() => {
    if (contentRef.current) {
      // Animate the content when tab changes
      animate(contentRef.current, {
        opacity: [0, 1],
        translateX: [20, 0],
        easing: 'easeOutExpo',
        duration: 600
      })
    }
  }, [selectedTab])

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-950">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="text-red-600 dark:text-red-500">Experience</span>
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Where I&apos;ve worked and what I&apos;ve accomplished in my professional journey.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs
            defaultValue="1"
            value={selectedTab}
            onValueChange={setSelectedTab}
            className="flex flex-col md:flex-row gap-8"
          >
            <TabsList className="flex flex-row md:flex-col h-auto md:h-fit md:w-64 bg-transparent space-y-0 md:space-y-2 p-0">
              {experience.map((job) => (
                <TabsTrigger
                  key={job.id}
                  value={job.id.toString()}
                  className="w-full text-left p-4 data-[state=active]:bg-red-50 dark:data-[state=active]:bg-red-950/50 data-[state=active]:text-red-600 dark:data-[state=active]:text-red-500 border-b-2 md:border-b-0 md:border-l-2 data-[state=active]:border-red-600 dark:data-[state=active]:border-red-500 rounded-none justify-start"
                >
                  {job.company}
                </TabsTrigger>
              ))}
            </TabsList>

            <div ref={contentRef} className="flex-1">
              {experience.map((job) => (
                <TabsContent
                  key={job.id}
                  value={job.id.toString()}
                  className="mt-0 flex-1"
                >
                  <Card className="border-none shadow-md">
                    <CardHeader>
                      <CardTitle className="text-xl md:text-2xl">
                        {job.role} <span className="text-red-600 dark:text-red-500">@ {job.company}</span>
                      </CardTitle>
                      <CardDescription className="text-sm">{job.date}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {job.detail.map((point, index) => (
                          <li key={index} className="flex items-start">
                            <ChevronRight className="h-5 w-5 text-red-600 dark:text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                            <p className="text-gray-700 dark:text-gray-300">{point}</p>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  )
} 