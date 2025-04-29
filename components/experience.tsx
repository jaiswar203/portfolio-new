"use client"

import { useState } from "react"
import { ChevronRight, Briefcase, Calendar, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, Variants } from "framer-motion"

// Define type for experience data
interface ExperienceItem {
  id: number;
  company: string;
  role: string;
  date: string;
  location: string;
  detail: string[];
}

const experience: ExperienceItem[] = [
  {
    id: 1,
    company: "Professional Service Provider",
    role: "Full Stack Developer",
    date: "May 2024 - Present",
    location: "Remote",
    detail: [
      "Delivered AI-integrated Solutions: Helped companies integrate domain-specific AI agents into their workflows — such as analyzing audit data in GRC platforms to automate insights and reporting.",
      "Built Full Stack Web Applications: Developed fully functional custom tools and internal software tailored to unique business needs — from admin panels to interactive dashboards.",
      "Developed Scalable Mobile Apps: Created Android/iOS applications for institutions, each with a custom CMS for dynamic content control and seamless updates.",
      "Created an End-to-End LMS: Designed and built a Learning Management System with a course builder, user management, and progress tracking.",
      "Integrated Multiple AI Services: Engineered platforms combining OpenAI, voice synthesis models, image generation tools, and other AI APIs to deliver rich, intelligent user experiences.",
      "Improved Team Efficiency with Automation: Streamlined operational processes by embedding AI into repetitive or data-heavy workflows.",
      "Handled Complete Deployment: Managed end-to-end deployment on cloud servers using Docker, AWS, and CI/CD pipelines for continuous delivery."
    ]
  },
  {
    id: 2,
    company: "PropertyLoop",
    role: "Full Stack Developer",
    date: "Feb 2024 - May 2024",
    location: "Remote",
    detail: [
      "Developed real estate listing and management features using React and Node.js",
      "Created RESTful APIs for property data management and user interactions",
      "Implemented responsive UI components for optimal cross-device experience",
      "Collaborated with design team to create intuitive user interfaces"
    ]
  },
  {
    id: 3,
    company: "Mauka Education",
    role: "Lead Developer",
    date: "Sep 2022 - Feb 2024",
    location: "Mumbai, India",
    detail: [
      "Led the development of a Course Builder that reduced course delivery time by 90%",
      "Integrated advanced features into their LMS to boost productivity for Course Developers",
      "Implemented real-time communication features for student-instructor interactions",
      "Optimized application performance for seamless user experience"
    ]
  }
]

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
}

// Reusable Section Header Component (defined inline for now)
interface SectionHeaderProps {
  badgeText: string;
  title: React.ReactNode; // Allow JSX in title
  subtitle: string;
  gradientColors?: string; // e.g., "from-indigo-600 via-purple-600 to-teal-500"
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  badgeText,
  title,
  subtitle,
  gradientColors = "from-indigo-600 via-purple-600 to-teal-500"
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      className="text-center mb-16"
    >
      <motion.div variants={itemVariants} className="inline-block mb-3">
        <div className="flex items-center justify-center space-x-2 mb-1">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-indigo-600"></div>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-sm font-medium border border-indigo-200 dark:border-indigo-800/30">{badgeText}</span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-indigo-600"></div>
        </div>
      </motion.div>
      <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold mb-4">
        {title}
      </motion.h2>
      <motion.div variants={itemVariants} className={`w-24 h-1.5 bg-gradient-to-r ${gradientColors} rounded-full mb-6 mx-auto`} />
      <motion.p variants={itemVariants} className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto text-lg mb-6">
        {subtitle}
      </motion.p>
    </motion.div>
  );
};

export default function Experience() {
  const [selectedTab, setSelectedTab] = useState<string>("1") // Explicit type

  return (
    <section id="experience" className="py-24 bg-gray-50 dark:bg-gray-900/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-40 -left-20 w-96 h-96 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-40 -right-20 w-96 h-96 bg-gradient-to-tl from-teal-500/10 via-purple-500/10 to-transparent rounded-full blur-3xl -z-10" />
      <div className="absolute inset-0 bg-mesh-pattern opacity-10 -z-10" />

      <div className="container relative z-10 max-w-7xl mx-auto px-4">
        <SectionHeader 
          badgeText="Professional Journey"
          title={<>My <span className="text-gradient">Experience</span></>}
          subtitle="Where I've worked and what I've accomplished in my professional journey."
        />

        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }} // Use whileInView for consistency
          viewport={{ once: true, amount: 0.2 }} // Adjust viewport slightly
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs
            defaultValue="1"
            value={selectedTab}
            onValueChange={setSelectedTab}
            className="w-full"
          >
            {/* Make TabsList scrollable on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }} // Use whileInView
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center mb-10"
            >
              <div className="overflow-x-auto pb-2 scrollbar-hide">
                <TabsList className="p-1 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200/30 dark:border-gray-800/30 rounded-full shadow-glass whitespace-nowrap">
                  {experience.map((job) => (
                    <TabsTrigger
                      key={job.id}
                      value={job.id.toString()}
                      className={`relative rounded-full px-4 py-2 transition-all duration-300 text-sm ${selectedTab === job.id.toString()
                        ? "text-white shadow-md"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                        }`}
                    >
                      {selectedTab === job.id.toString() && (
                        <motion.span
                          layoutId="activeExperienceTabIndicator"
                          className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-500 rounded-full -z-10"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }} // Smoother transition
                        />
                      )}
                      <span className="relative z-10 font-semibold mr-2 hidden md:inline-block">{job.company}</span>
                      <span className="relative z-10 font-semibold md:hidden">{job.company.split(' ')[0]}</span>
                      <span className="relative z-10 text-xs text-gray-500 dark:text-gray-400 hidden md:inline-block ml-1">({job.date.split(' - ')[0]})</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </motion.div>

            <div className="p-4">
              {experience.map((job) => (
                <TabsContent
                  key={job.id}
                  value={job.id.toString()}
                  className="mt-0 focus-visible:outline-none focus-visible:ring-0"
                >
                  <motion.div
                    // Animate based on tab change
                    key={selectedTab} // Add key to re-trigger animation
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }} // Optional exit animation
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="border-none shadow-glass-strong overflow-hidden bg-white/80 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl border border-gray-100/20 dark:border-gray-800/20">
                      <CardContent className="p-0">
                        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-700 text-white p-6 md:p-8">
                          <h3 className="text-2xl font-bold mb-1">{job.role}</h3>
                          <div className="flex flex-wrap gap-x-4 gap-y-2 text-white/90 mt-2 text-sm">
                            <div className="flex items-center">
                              <Briefcase className="h-4 w-4 mr-1.5" />
                              <span>{job.company}</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1.5" />
                              <span>{job.date}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1.5" />
                              <span>{job.location}</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-6 md:p-8">
                          <h4 className="text-lg font-semibold mb-6 text-gray-900 dark:text-gray-100">Responsibilities & Achievements</h4>
                          <motion.ul
                            className="space-y-4"
                            variants={containerVariants} // Use defined variants
                            initial="hidden"
                            animate="show"
                          >
                            {job.detail.map((point, index) => (
                              <motion.li
                                key={index}
                                className="flex items-start bg-gray-50/70 dark:bg-gray-900/40 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700/30 group hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 transition-colors duration-200"
                                variants={itemVariants} // Use defined variants
                              >
                                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white mr-4 flex-shrink-0 mt-1 shadow-md group-hover:scale-110 transition-transform duration-200">
                                  <ChevronRight className="h-4 w-4" />
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 flex-1 leading-relaxed">{point}</p>
                              </motion.li>
                            ))}
                          </motion.ul>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
} 