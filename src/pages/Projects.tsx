import React, { useState, useEffect } from "react";
import ProjectsHeader from "@/components/ProjectsHeader";
import { ParticleGlobe } from "../../Globe_particle/ParticleGlobe";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
}

// Project Card Component
const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, image, tags }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
    className="relative group overflow-hidden rounded-lg bg-[#1a1a1a] aspect-[16/9]"
  >
    <div className="absolute inset-0">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
      />
    </div>
    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 sm:p-6 flex flex-col justify-end">
      <h3 className="text-white font-['Handjet'] text-[0.9rem] sm:text-[1.2rem] mb-1 sm:mb-2">{title}</h3>
      <p className="hidden sm:block text-gray-300 font-['JetBrains_Mono'] text-[0.65rem] leading-relaxed mb-3">
        {description}
      </p>
      <div className="flex flex-wrap gap-1 sm:gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="text-[0.5rem] sm:text-xs font-['JetBrains_Mono'] px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white/5 text-white/90 rounded border border-white/10"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

const Projects = () => {
  return (
    <div className="relative w-full min-h-screen bg-black">
      {/* Fixed Globe Container */}
      <div className="fixed inset-0 pointer-events-none" style={{ perspective: '1000px' }}>
        <div 
          className="w-[1380px] h-[1380px] globe-container 
                     absolute 
                     left-[-1000px]  // Changed from -800px to -1000px for mobile
                     sm:left-auto   // Reset left for web view
                     sm:right-[-20px]  // Web view position unchanged
                     top-1/2 
                     -translate-y-1/2"
          style={{
            transformStyle: 'preserve-3d',
            transformOrigin: 'center center'
          }}
        >
          <ParticleGlobe />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full min-h-screen">
        <ProjectsHeader />
        <main>
          <div className="w-full mx-auto px-5 sm:px-8 md:px-12 max-w-[100%] sm:max-w-[90%] md:max-w-[1800px]">
            {/* Featured Portfolio Section */}
            <div className="grid 
                          grid-cols-1 sm:grid-cols-[400px,1fr] 
                          gap-4 sm:gap-6 md:gap-8 
                          mt-[60px] sm:mt-[80px] md:mt-[80px]">
              {/* Left Column - Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="relative"
              >
                <div className="pr-0 sm:pr-4">
                  <h1 className="font-['JetBrains_Mono'] font-medium 
                               text-[14px] sm:text-[14px] 
                               text-white mb-4 sm:mb-6">
                    Featured Portfolio
                  </h1>
                  <p className="text-gray-400 font-['JetBrains_Mono'] 
                              text-[12px] sm:text-[12px] 
                              leading-relaxed">
                    I designed and developed these showcase projects with n8n, tableau, replit, supabase, and obviously GPT between 2024 to 2025.
                  </p>
                  <p className="text-gray-400 font-['JetBrains_Mono'] 
                              text-[12px] sm:text-[12px] 
                              leading-relaxed mt-4 sm:mt-6">
                    Implemented these solutions across diverse D2C companies for improved operational efficiencies
                  </p>
                </div>
              </motion.div>

              {/* Right Column - Project Cards */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="pl-0 sm:pl-4 relative"
              >
                {/* Electric Blue Line */}
                <div className="absolute top-0 left-0 sm:left-4 right-0 h-[1px] bg-[#00ffff]/20 max-w-[1000px]" />
                
                <div className="grid 
                              grid-cols-2 sm:grid-cols-2  // Changed to 2 columns for both mobile and web
                              gap-2 sm:gap-3  // Smaller gap for mobile, larger for web
                              max-w-[1000px] 
                              mt-[7px]">
                  {/* All cards in 2x2 grid for both mobile and web */}
                  <ProjectCard
                    title="AI-Powered Business Automation Agent"
                    description="Engineered an AI-driven workflow to automate customer support, lead qualification, and logistics for a solo-owner e-commerce business slashing operational inefficiency by 60%"
                    image="/assets/projects/featured/ai-automation.png"
                    tags={["n8n", "Supabase", "Elevenlabs"]}
                  />
                  <ProjectCard
                    title="Predictive Market Adoption Model"
                    description="Developed a forecast tool leveraging Bass Model and Roger's Diffusion Theory to predict market adoption and CAC at different stage. Achieved 72% accuracy on a sample FMCG data"
                    image="/assets/projects/featured/market-adoption.png"
                    tags={["Python", "Statistical Modelling", "GPT-4"]}
                  />
                  <ProjectCard
                    title="Hyperspace AI Analytics MVP"
                    description="Built an AI-based analytics platform consolidating e-commerce sales and marketing data for D2C brands. Proven to improve ad budget allocation by 30% across 3 pilots"
                    image="/assets/projects/featured/analytics-mvp.png"
                    tags={["Tableau", "D.E.R.N"]}
                  />
                  <ProjectCard
                    title="My Portfolio Website (Vibecoded)"
                    description="Created this responsive, animated portfolio you're viewing now in a week to showcase my work. Proof that I can innovate fast at the tech-business nexus."
                    image="/assets/projects/featured/portfolio.png"
                    tags={["Cursor", "Three.js", "React.js"]}
                  />
                </div>
              </motion.div>
            </div>

            {/* Design Portfolio Section */}
            <div className="grid 
                          grid-cols-1 sm:grid-cols-[400px,1fr] 
                          gap-4 sm:gap-6 md:gap-8 
                          mt-[60px] sm:mt-[60px]">
              {/* Left Column - Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.7 }}
                className="relative"
              >
                <div className="pr-0 sm:pr-4">
                  <h1 className="font-['JetBrains_Mono'] font-medium 
                               text-[14px] sm:text-[14px] 
                               text-white mb-4 sm:mb-6">
                    Design Portfolio
                  </h1>
                  <p className="text-gray-400 font-['JetBrains_Mono'] 
                              text-[12px] sm:text-[12px] 
                              leading-relaxed">
                    I combined my figma skills and business acumen to create solutions that are not just functional, but strategically aligned with business goals to deliver impact. Click to explore the designs
                  </p>
                </div>
              </motion.div>

              {/* Right Column - Project Cards */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 2 }}
                className="pl-0 sm:pl-4 relative"
              >
                {/* Electric Blue Line */}
                <div className="absolute top-0 left-0 sm:left-4 right-0 h-[1px] bg-[#00ffff]/20 max-w-[1000px]" />
                
                <div className="grid 
                              grid-cols-2 sm:grid-cols-2  // Changed to 2 columns for both mobile and web
                              gap-2 sm:gap-3  // Smaller gap for mobile, larger for web
                              max-w-[1000px] 
                              mt-[7px]">
                  {/* Project Cards */}
                  <ProjectCard
                    title="Agri-machinery Service App"
                    description="Designed a mobile app to connect farmers with agricultural machinery service providers and marketplaces, increasing rural income opportunities through technology accessibility."
                    image="/assets/projects/design/agri-machinery.png"
                    tags={["User Research", "Information Architecture", "Prototyping", "Usability Testing"]}
                  />
                  <ProjectCard
                    title="Urban Commute Solution"
                    description="Designed an integrated public transport solution that combines multiple modes of transit into one seamless user interface, reducing commute complexity"
                    image="/assets/projects/design/urban-commute.png"
                    tags={["UX Design", "UI Design", "User Research"]}
                  />
                  <ProjectCard
                    title="Women Entrepreneur Platform"
                    description="Designed an educational and networking platform specifically for women entrepreneurs, featuring mentorship matching and funding resources"
                    image="/assets/projects/design/women-platform.png"
                    tags={["User Interviews", "Interaction Design", "Design System Creation"]}
                  />
                  <ProjectCard
                    title="Inventory Management System"
                    description="Designed an intuitive interface for warehouse management with real-time tracking, predictive inventory suggestions, and customizable reporting"
                    image="/assets/projects/design/inventory.png"
                    tags={["Data Visualization", "User Testing", "System Design"]}
                  />
                  <ProjectCard
                    title="Water Works Feedback System"
                    description="Created a user-friendly feedback system for municipal water services, enabling citizens to report issues and track resolution processes."
                    image="/assets/projects/design/water-works.png"
                    tags={["Service Design", "Community Engagement", "Accessibility"]}
                  />
                  <ProjectCard
                    title="Drone Service Platform"
                    description="Designed a platform connecting drone operators with farmers for crop monitoring, spraying, and analysis services through an intuitive booking interface."
                    image="/assets/projects/design/drone-service.png"
                    tags={["Interaction Design", "User Research", "Prototyping"]}
                  />
                </div>
              </motion.div>
            </div>

            {/* Bottom Spacing Section */}
            <div className="h-[100px] sm:h-[200px]"></div>
          </div>
        </main>
      </div>

      <style>
        {`
          /* Hide scrollbar completely */
          * {
            -ms-overflow-style: none !important;
            scrollbar-width: none !important;
          }
          
          ::-webkit-scrollbar {
            display: none !important;
            width: 0 !important;
          }
        `}
      </style>
    </div>
  );
};

export default Projects;