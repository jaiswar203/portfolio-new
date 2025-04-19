import Image from "next/image"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"

export default function About() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-black">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-red-600 dark:border-red-500">
              <Image
                src="https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="About Me Illustration"
                fill
                priority
                loading="eager"
                className="object-cover"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              About <span className="text-red-600 dark:text-red-500">Me</span>
            </h2>

            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                Hi, I&apos;m <span className="text-red-600 dark:text-red-500 font-medium">Nilesh Jaiswar</span>, a Full Stack Engineer with over two years of experience, mostly in the EdTech, digital media, and real estate sectors. Right now, I&apos;m focused on building <span className="text-red-600 dark:text-red-500 font-medium">CreatorEvolve</span>, a SaaS platform designed to help content creators boost their productivity, automate tasks, and better manage AI-powered services.
              </p>

              <p>
                My journey into web development started back in 2020 when I was a Computer Science student. A couple of friends and I got together to brainstorm project ideas, and we initially thought about creating a movie downloading website. We didn&apos;t end up pursuing that idea, but it was the spark that ignited my passion for web development.
              </p>

              <p>
                With a bit of HTML and CSS knowledge from junior college, I decided to dive deeper into the MERN stack—MongoDB, Express.js, React.js, and Node.js. After a lot of learning and experimenting, I built my first website. That initial project might not have taken off, but it was a huge learning experience that gave me the practical skills I needed to move forward.
              </p>

              <p>
                Over the course of my career, I&apos;ve had the chance to work with a variety of companies, from EdTech startups like <a className="text-red-600 dark:text-red-500 hover:underline" href="https://maukaeducation.com/">Mauka Education</a> to real estate platforms such as PropertyLoop. I&apos;ve been involved in both front-end and back-end development, always striving to deliver high-quality, scalable solutions that help businesses grow.
              </p>
            </div>

            <Button className="bg-red-600 hover:bg-red-700 text-white dark:bg-red-600 dark:hover:bg-red-700 mt-6">
              <FileText className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
