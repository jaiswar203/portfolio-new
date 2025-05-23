"use client"

import { motion } from "framer-motion"
import { BrainIcon, CodeIcon, ServerIcon } from "lucide-react"

export default function About() {
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
    <section id="about" className="py-24 bg-gray-50 dark:bg-gray-900/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-indigo-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-purple-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-gradient-to-tl from-teal-500/5 to-transparent rounded-full blur-3xl" />

        <div className="absolute top-1/4 left-10 w-72 h-72 border border-gray-200 dark:border-gray-700/30 rounded-full opacity-50" />
        <div className="absolute bottom-1/3 right-10 w-48 h-48 border border-gray-200 dark:border-gray-700/30 rounded-full opacity-40" />

        <svg className="absolute top-0 left-0 w-full h-full opacity-30 dark:opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container relative">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center mb-16 text-center"
        >
          <motion.div variants={fadeIn} className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4 border border-indigo-200 dark:border-indigo-800/30">
            <span>About Me</span>
          </motion.div>

          <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-4">
            My Journey & Expertise
          </motion.h2>

          <motion.div variants={fadeIn} className="w-24 h-1.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-500 rounded-full mb-6" />

          <motion.p variants={fadeIn} className="max-w-2xl text-gray-600 dark:text-gray-300 text-lg">
            Discover my background, expertise, and passion for creating exceptional digital experiences and intelligent solutions.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Abstract tech illustration instead of personal photo */}
            <div className="relative h-[500px] overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 shadow-xl border border-gray-200 dark:border-gray-700/50">
              {/* Code visualization */}
              <div className="absolute inset-0 opacity-10 dark:opacity-20 overflow-hidden">
                <pre className="text-xs p-6 font-mono text-gray-800 dark:text-gray-200">
                  <code>{`// AI Agent Code
import { Agent } from 'ai-framework';
import { NLP, ML } from 'intelligence';

class SmartAgent extends Agent {
  constructor() {
    super();
    this.nlp = new NLP();
    this.models = ML.loadModels([
      'language-understanding',
      'decision-making',
      'learning'
    ]);
  }

  async process(input) {
    const intent = await this.nlp.analyze(input);
    const context = this.getContext();
    
    // Choose appropriate model
    const model = this.selectModel(intent);
    
    // Generate response
    const response = await model.generate({
      input,
      intent,
      context,
      constraints: {
        helpful: true,
        accurate: true,
        efficient: true
      }
    });
    
    // Learn from interaction
    this.learn(input, response, context);
    
    return response;
  }
}

export default new SmartAgent();`}</code>
                </pre>
              </div>

              {/* Tech illustrations */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-48 h-48 relative">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="absolute top-0 left-0 w-32 h-32 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-xl backdrop-blur-sm border border-indigo-100 dark:border-indigo-800/30 flex items-center justify-center"
                  >
                    <CodeIcon className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="absolute top-8 right-0 w-32 h-32 bg-purple-500/10 dark:bg-purple-500/20 rounded-xl backdrop-blur-sm border border-purple-100 dark:border-purple-800/30 flex items-center justify-center"
                  >
                    <BrainIcon className="h-12 w-12 text-purple-600 dark:text-purple-400" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="absolute bottom-0 left-8 w-32 h-32 bg-teal-500/10 dark:bg-teal-500/20 rounded-xl backdrop-blur-sm border border-teal-100 dark:border-teal-800/30 flex items-center justify-center"
                  >
                    <ServerIcon className="h-12 w-12 text-teal-600 dark:text-teal-400" />
                  </motion.div>
                </div>

                {/* Connecting lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.5 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 1.2 }}
                    d="M180 140 L230 170"
                    stroke="url(#gradient1)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                  />
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.5 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 1.4 }}
                    d="M230 200 L180 230"
                    stroke="url(#gradient2)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                  />
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.5 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 1.6 }}
                    d="M150 230 L150 160"
                    stroke="url(#gradient3)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                  />
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#14b8a6" />
                    </linearGradient>
                    <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#14b8a6" />
                      <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Experience badge */}
              <div className="absolute top-4 right-4 bg-white dark:bg-gray-900 shadow-lg rounded-xl p-4 flex flex-col items-center">
                <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">3+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
              </div>
            </div>

            {/* Decorative glows */}
            <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-gradient-to-br from-indigo-500/50 to-purple-600/50 rounded-2xl -z-10 blur-[3px]" />
            <div className="absolute -left-6 -top-6 w-36 h-36 bg-gradient-to-tr from-teal-500/30 to-transparent rounded-2xl -z-10 blur-[3px]" />
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="flex flex-col"
          >
            <motion.h3 variants={fadeIn} className="text-2xl font-bold mb-4">
              Who I Am
            </motion.h3>

            <motion.p variants={fadeIn} className="text-gray-600 dark:text-gray-300 mb-6">
              I&apos;m a Full Stack Developer and AI Agent Integrator with over 3 years of experience building intelligent, scalable, and user-centric digital solutions across web, mobile, and AI domains. My work spans from architecting complex systems to integrating cutting-edge AI to solve real-world business problems.
            </motion.p>

            <motion.p variants={fadeIn} className="text-gray-600 dark:text-gray-300 mb-8">
              Over the past year, I&apos;ve focused heavily on streamlining internal operations through domain-specific AI agents—whether it&apos;s automating audit workflows in GRC platforms or generating AI-driven content for creators. I specialize in building full-stack applications enriched with custom CMS dashboards, automation layers, and deep AI integrations.
            </motion.p>

            <motion.div variants={fadeIn} className="mb-8">
              <h4 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-3">Key Projects Delivered:</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>A Fully Fledged Android & iOS Application with a Custom-Built CMS</li>
                <li>A centralized client/order/AMC management system replacing Excel workflows with a smart dashboard, automated reminders, and revenue analytics</li>
                <li>A Micro SaaS toolkit for YouTubers with tools for AI-generated reels, voice dubbing, thumbnail editing, and more</li>
                <li>A AI Agent for Generating Audit reports in PDF, Summary and Conversational Message flow with the user</li>
                <li>A Learning Management System with an integrated course builder and admin controls</li>
              </ul>
            </motion.div>

            <motion.p variants={fadeIn} className="text-gray-600 dark:text-gray-300 mb-8">
              I thrive at the intersection of usability, backend architecture, and AI — blending thoughtful engineering with powerful automation to deliver systems that drive efficiency and impact.
            </motion.p>


          </motion.div>
        </div>
      </div>
    </section >
  )
}
