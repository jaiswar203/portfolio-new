"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const categories = [
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "database", label: "Database" },
  { id: "devops", label: "DevOps" },
  { id: "mobile", label: "Mobile" },
  { id: "tools", label: "Tools" },
]

// Define the technology interface to fix TypeScript errors
interface Technology {
  name: string;
  image: string;
  showName?: boolean;
}

// Define the technologies record type to fix indexing errors
type TechnologiesRecord = Record<string, Technology[]>;

const technologies: TechnologiesRecord = {
  frontend: [
    { name: "React JS", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1655638968/Portpolio/icon/reactjs_auyqqi.png" },
    { name: "Next JS", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1655638969/Portpolio/icon/nextjs_mk077w.png" },
    { name: "Typescript", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1677420771/Portpolio/icon/typescript_bwoe3t.png" },
    { name: "", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1655638968/Portpolio/icon/javascript_vu2woi.png" },
    { name: "", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1655638968/Portpolio/icon/html_tpfjq5.png" },
    { name: "", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1655638968/Portpolio/icon/css_a6lhvw.png" },
    { name: "SASS", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1655638969/Portpolio/icon/sass_lz7cw1.png" },
    { name: "Tailwind CSS", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1725285692/png-transparent-tailwind-css-hd-logo_q7w1uq.png", showName: true },
    { name: "React Query", image: "/images/react-query.png" },
    { name: "ShadCN UI", image: "/images/shadcn-ui.png" },
  ],
  backend: [
    { name: "Node JS", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1655638969/Portpolio/icon/nodejs_mqnbin.png" },
    { name: "Express JS", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1655638969/Portpolio/icon/expressjs_dhz6b2.png" },
    { name: "Nest JS", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1725285620/nestjs-icon-2048x2040-3rrvcej8_ckztk1.png", showName: true },
  ],
  database: [
    { name: "MongoDB", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1655638969/Portpolio/icon/mongodb_ja4fwy.png" },
    { name: "Redis", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1677420850/Portpolio/icon/icons8-redis-240_ixsphn.png", showName: true },
  ],
  devops: [
    { name: "Git", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1655638968/Portpolio/icon/git_mqujeq.png" },
    { name: "GitHub", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1655638968/Portpolio/icon/github_rrpbxz.png" },
    { name: "AWS", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1677421030/Portpolio/icon/icons8-amazon-web-services-240_ntif5d.png" },

  ],
  mobile: [
    { name: "React Native", image: "/images/react-native.png" },
    { name: "Expo", image: "/images/expo.png" },
  ],
  tools: [
    { name: "Cursor IDE", image: "/images/cursor.png" },

  ],
}

export default function Technologies() {
  const [activeTab, setActiveTab] = useState("frontend")

  return (
    <section id="technologies" className="py-20 bg-white dark:bg-black">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-red-600 dark:text-red-500">Technologies</span> I Work With
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            These are the technologies I use to build modern, scalable, and efficient web applications.
          </p>
        </div>

        <Tabs defaultValue="frontend" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className={`${activeTab === category.id ? "text-red-600 dark:text-red-500" : ""}`}
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
                {technologies[category.id].map((tech, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="relative w-16 h-16 mb-3">
                      <Image
                        src={tech.image}
                        alt={tech.name}
                        width={64}
                        height={64}
                        className={`object-contain ${tech.name === "Next JS" || tech.name === "ShadCN UI"
                            ? "bg-white p-1 rounded"
                            : tech.name === "Cursor IDE"
                              ? "bg-black p-1 rounded"
                              : ""
                          }`}
                      />
                    </div>
                    <p className="text-sm font-medium">{tech.name}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
