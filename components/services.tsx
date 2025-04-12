import { Code, Layout, Database, Cloud, Smartphone, Bot, Cpu } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  {
    icon: <Code className="h-10 w-10 text-red-600 dark:text-red-500" />,
    title: "Frontend",
    description: "Creating responsive and interactive user interfaces with modern frameworks like React and Next.js.",
  },
  {
    icon: <Database className="h-10 w-10 text-red-600 dark:text-red-500" />,
    title: "Backend",
    description: "Building robust server-side applications with Node.js, Express, and NestJS for scalable performance.",
  },
  {
    icon: <Layout className="h-10 w-10 text-red-600 dark:text-red-500" />,
    title: "Full Stack",
    description: "End-to-end development with integrated frontend and backend solutions for complete web applications.",
  },
  {
    icon: <Cloud className="h-10 w-10 text-red-600 dark:text-red-500" />,
    title: "DevOps",
    description: "Implementing CI/CD pipelines, containerization, and cloud infrastructure using AWS and other services.",
  },
  {
    icon: <Smartphone className="h-10 w-10 text-red-600 dark:text-red-500" />,
    title: "Mobile App Development",
    description: "Building native mobile applications for iOS and Android using React Native and Expo for seamless cross-platform experiences.",
  },
  {
    icon: <Bot className="h-10 w-10 text-red-600 dark:text-red-500" />,
    title: "AI Agents Development",
    description: "Creating intelligent AI agents and assistants that can automate tasks, provide insights, and enhance productivity.",
  },
  {
    icon: <Cpu className="h-10 w-10 text-red-600 dark:text-red-500" />,
    title: "AI Integration",
    description: "Integrating AI capabilities into existing applications to add intelligence, automation, and advanced features.",
  }
]

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-950">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="text-red-600 dark:text-red-500">Services</span>
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            I offer specialized development services to help businesses create modern, scalable applications for web, mobile, and AI solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-2">
                <div className="mb-4">{service.icon}</div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-700 dark:text-gray-300 text-base">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
