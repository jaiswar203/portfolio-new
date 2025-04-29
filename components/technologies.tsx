"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

const categories = [
  { id: "frontend", label: "Frontend", icon: "💻" },
  { id: "backend", label: "Backend", icon: "⚙️" },
  { id: "database", label: "Database", icon: "💾" },
  { id: "devops", label: "DevOps", icon: "🚀" },
  { id: "mobile", label: "Mobile", icon: "📱" },
  { id: "tools", label: "Tools", icon: "🔧" },
]

// Define the technology interface to fix TypeScript errors
interface Technology {
  name: string;
  image: string;
  showName?: boolean;
  description?: string;
}

// Define the technologies record type to fix indexing errors
type TechnologiesRecord = Record<string, Technology[]>;

const technologies: TechnologiesRecord = {
  frontend: [
    { name: "React JS", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1655638968/Portpolio/icon/reactjs_auyqqi.png", description: "Component-based UI library" },
    { name: "Next JS", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1655638969/Portpolio/icon/nextjs_mk077w.png", description: "React framework for SSR & SSG" },
    { name: "Typescript", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1677420771/Portpolio/icon/typescript_bwoe3t.png", description: "Typed JavaScript superset" },
    { name: "JavaScript", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1655638968/Portpolio/icon/javascript_vu2woi.png", description: "Dynamic scripting language" },
    { name: "HTML", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1655638968/Portpolio/icon/html_tpfjq5.png", description: "Web markup language" },
    { name: "CSS", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1655638968/Portpolio/icon/css_a6lhvw.png", description: "Web styling language" },
    { name: "SASS", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1655638969/Portpolio/icon/sass_lz7cw1.png", description: "CSS preprocessor" },
    { name: "Tailwind CSS", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1725285692/png-transparent-tailwind-css-hd-logo_q7w1uq.png", showName: true, description: "Utility-first CSS framework" },
    { name: "React Query", image: "/images/react-query.png", description: "Data fetching library" },
    { name: "ShadCN UI", image: "/images/shadcn-ui.png", description: "UI component library" },
  ],
  backend: [
    { name: "Node JS", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1655638969/Portpolio/icon/nodejs_mqnbin.png", description: "JavaScript runtime" },
    { name: "Express JS", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1655638969/Portpolio/icon/expressjs_dhz6b2.png", description: "Web application framework" },
    { name: "Nest JS", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1725285620/nestjs-icon-2048x2040-3rrvcej8_ckztk1.png", showName: true, description: "Progressive Node.js framework" },
  ],
  database: [
    { name: "MongoDB", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1655638969/Portpolio/icon/mongodb_ja4fwy.png", description: "NoSQL document database" },
    { name: "Redis", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1677420850/Portpolio/icon/icons8-redis-240_ixsphn.png", showName: true, description: "In-memory data structure store" },
  ],
  devops: [
    { name: "Git", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1655638968/Portpolio/icon/git_mqujeq.png", description: "Version control system" },
    { name: "GitHub", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1655638968/Portpolio/icon/github_rrpbxz.png", description: "Code hosting platform" },
    { name: "AWS", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1677421030/Portpolio/icon/icons8-amazon-web-services-240_ntif5d.png", description: "Cloud computing services" },
  ],
  mobile: [
    { name: "React Native", image: "/images/react-native.png", description: "Cross-platform mobile framework" },
    { name: "Expo", image: "/images/expo.png", description: "React Native toolkit" },
  ],
  tools: [
    { name: "Cursor IDE", image: "/images/cursor.png", description: "AI-powered code editor" },
  ],
}

export default function Technologies() {
  const [activeTab, setActiveTab] = useState("frontend")

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  }

  return (
    <section id="technologies" className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900/30 dark:to-gray-950/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white/80 to-transparent dark:from-black/80 pointer-events-none z-10"></div>
      <div className="absolute inset-0 -z-10 bg-mesh-pattern opacity-20"></div>
      <div className="absolute -top-40 left-1/4 w-80 h-80 bg-indigo-50 dark:bg-indigo-900/10 rounded-full filter blur-3xl opacity-50"></div>
      <div className="absolute -bottom-40 right-1/4 w-80 h-80 bg-purple-50 dark:bg-purple-900/10 rounded-full filter blur-3xl opacity-50"></div>

      <div className="container relative z-10 max-w-7xl mx-auto px-4">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={container}
          className="text-center mb-16"
        >
          <motion.div variants={item} className="inline-block mb-3">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-indigo-600"></div>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-sm font-medium border border-indigo-200 dark:border-indigo-800/30">My Tech Stack</span>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-indigo-600"></div>
            </div>
          </motion.div>
          <motion.h2 variants={item} className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Technologies</span> I Work With
          </motion.h2>
          <motion.div variants={item} className="w-24 h-1.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full mb-6 mx-auto" />
          <motion.p variants={item} className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto text-lg mb-10">
            These are the technologies I use to build modern, scalable, and efficient web applications.
          </motion.p>
        </motion.div>

        <Tabs defaultValue="frontend" className="w-full" onValueChange={setActiveTab}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center mb-12"
          >
            <TabsList className="p-1 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200/30 dark:border-gray-800/30 rounded-full shadow-glass">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className={`relative rounded-full px-4 py-2 transition-all duration-200 ${
                    activeTab === category.id 
                      ? "text-white shadow-md" 
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                  }`}
                >
                  {activeTab === category.id && (
                    <motion.span 
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full -z-10"
                    />
                  )}
                  <span className="mr-2">{category.icon}</span>
                  <span>{category.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </motion.div>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
                variants={container}
                initial="hidden"
                animate={activeTab === category.id ? "show" : "hidden"}
              >
                {technologies[category.id].map((tech, index) => (
                  <motion.div 
                    key={index} 
                    className="group relative flex flex-col items-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 shadow-glass hover:shadow-glass-strong transition-all duration-300 border border-gray-100/50 dark:border-gray-800/50 hover:border-indigo-200/30 dark:hover:border-indigo-800/30"
                    variants={item}
                    whileHover={{ y: -5, transition: { duration: 0.3 } }}
                  >
                    <div className="relative w-20 h-20 mb-4 p-3 rounded-full bg-gradient-to-br from-gray-50/80 to-white/80 dark:from-gray-800/80 dark:to-gray-900/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm border border-gray-100/50 dark:border-gray-700/50">
                      <Image
                        src={tech.image}
                        alt={tech.name}
                        width={64}
                        height={64}
                        className={`object-contain ${
                          tech.name === "Next JS" || tech.name === "ShadCN UI"
                            ? "bg-white p-1 rounded"
                            : tech.name === "Cursor IDE"
                              ? "bg-black p-1 rounded"
                              : ""
                        }`}
                      />
                    </div>
                    <h3 className="text-base font-semibold mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {tech.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {tech.description}
                    </p>
                    
                    {/* Bottom indicator line */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 group-hover:w-full transition-all duration-300 rounded-b-xl"></div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
