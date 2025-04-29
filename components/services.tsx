"use client"

import { Code, Layout, Database, Cloud, Smartphone, Bot, Cpu } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const services = [
  {
    icon: <Code className="h-10 w-10" />,
    title: "Frontend",
    description: "Creating responsive and interactive user interfaces with modern frameworks like React and Next.js.",
    gradient: "from-indigo-500 to-indigo-600",
    delay: 0.1
  },
  {
    icon: <Database className="h-10 w-10" />,
    title: "Backend",
    description: "Building robust server-side applications with Node.js, Express, and NestJS for scalable performance.",
    gradient: "from-purple-500 to-purple-600",
    delay: 0.2
  },
  {
    icon: <Layout className="h-10 w-10" />,
    title: "Full Stack",
    description: "End-to-end development with integrated frontend and backend solutions for complete web applications.",
    gradient: "from-pink-500 to-pink-600",
    delay: 0.3
  },
  {
    icon: <Cloud className="h-10 w-10" />,
    title: "DevOps",
    description: "Implementing CI/CD pipelines, containerization, and cloud infrastructure using AWS and other services.",
    gradient: "from-teal-500 to-teal-600",
    delay: 0.4
  },
  {
    icon: <Smartphone className="h-10 w-10" />,
    title: "Mobile App Development",
    description: "Building native mobile applications for iOS and Android using React Native and Expo for seamless cross-platform experiences.",
    gradient: "from-purple-500 to-indigo-600",
    delay: 0.5
  },
  {
    icon: <Bot className="h-10 w-10" />,
    title: "AI Agents Development",
    description: "Creating intelligent AI agents and assistants that can automate tasks, provide insights, and enhance productivity.",
    gradient: "from-indigo-500 to-purple-600",
    delay: 0.6
  },
  {
    icon: <Cpu className="h-10 w-10" />,
    title: "AI Integration",
    description: "Integrating AI capabilities into existing applications to add intelligence, automation, and advanced features.",
    gradient: "from-purple-500 to-pink-600",
    delay: 0.7
  }
]

export default function Services() {
  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <section id="services" className="py-24 bg-gray-50 dark:bg-gray-900/30 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 bg-mesh-pattern opacity-30"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-200/30 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-3xl opacity-50"></div>
      
      <div className="container relative z-10 max-w-7xl mx-auto px-4">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.div variants={fadeIn} className="inline-block mb-3">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-indigo-600"></div>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-sm font-medium border border-indigo-200 dark:border-indigo-800/30">What I Offer</span>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-indigo-600"></div>
            </div>
          </motion.div>
          <motion.h2 variants={fadeIn} className="text-3xl md:text-5xl font-bold mb-4">
            My <span className="text-gradient">Services</span>
          </motion.h2>
          <motion.div variants={fadeIn} className="w-24 h-1.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full mb-6 mx-auto" />
          <motion.p variants={fadeIn} className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto text-lg mb-8">
            I offer specialized development services to help businesses create modern, scalable applications for web, mobile, and AI solutions.
          </motion.p>
        </motion.div>

        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: service.delay }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Card 
                className="group h-full overflow-hidden border-none bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg dark:shadow-gray-900/30 hover:shadow-xl hover:shadow-indigo-200/20 dark:hover:shadow-indigo-900/20 transition-all duration-300 rounded-xl"
              >
                <CardContent className="p-0">
                  <div className="p-6 md:p-8 h-full flex flex-col">
                    <div className={cn(
                      "w-16 h-16 mb-6 rounded-xl bg-gradient-to-br flex items-center justify-center text-white shadow-lg",
                      service.gradient
                    )}>
                      {service.icon}
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-700 dark:text-gray-300 flex-grow">
                      {service.description}
                    </p>
                    
                    <div className="mt-6 w-12 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-transparent group-hover:w-full transition-all duration-300 rounded-full"></div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
