import React from "react";
import ServicesHeader from "@/components/ServicesHeader";
import Footer from "@/components/Footer";
import { ServicesGlobe } from "../../Globe_particle/ServicesGlobe";
import { motion } from 'framer-motion';

const Services = () => {
  const [showContent, setShowContent] = React.useState(false);

  React.useEffect(() => {
    const handleGlobeAnimationComplete = () => {
      setShowContent(true);
    };

    window.addEventListener('globeAnimationComplete', handleGlobeAnimationComplete);
    return () => {
      window.removeEventListener('globeAnimationComplete', handleGlobeAnimationComplete);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[1380px] h-[1380px] globe-container">
          <ServicesGlobe />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full min-h-screen mx-auto flex flex-col">
        <ServicesHeader />
        <main className="flex-grow flex items-center">
          <motion.div 
            className="w-full px-4" 
            style={{ 
              position: 'absolute',
              right: '10vw',
              marginTop: '-120px',
              transform: 'translateX(-60%)',
              maxWidth: '600px',
              paddingLeft: '20px'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: showContent ? 1 : 0,
              y: showContent ? 0 : 20
            }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 1.2 }}
          >
            {/* Services Content */}
            <div className="flex flex-col gap-8 mt-24">
              {/* Design Services Section */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: showContent ? 1 : 0,
                  y: showContent ? 0 : 20
                }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col items-start"
              >
                <div className="flex items-start gap-12">
                  {/* Design Services Logos - Horizontal */}
                  <div className="flex gap-4 mt-2">
                    <img
                      src="/assets/logos/figma-1-logo-svgrepo-com.svg"
                      alt="Figma Logo"
                      className="w-10 h-10 opacity-70 hover:opacity-100 transition-opacity"
                    />
                    <img
                      src="/assets/logos/3js.png"
                      alt="Three.js Logo"
                      className="w-10 h-10 opacity-70 hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h2 
                      className="bebas mb-8 text-left w-full"
                      style={{
                        fontSize: '26.6px',
                        lineHeight: '34px',
                        letterSpacing: '0.08em',
                        color: 'white',
                        textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                        filter: 'brightness(1.2)'
                      }}
                    >
                      DESIGN SERVICES
                    </h2>
                    <div className="flex flex-wrap gap-4" style={{ maxWidth: '450px' }}>
                      <div 
                        style={{ fontFamily: 'JetBrains Mono, monospace' }} 
                        className="inline-flex text-[#888888] hover:text-white text-[13px] bg-transparent border border-white/70 rounded-2xl px-5 py-2.5 transition-all duration-300 hover:shadow-[0_0_10px_rgba(255,255,255,0.4),0_0_20px_rgba(255,255,255,0.2),0_0_30px_rgba(255,255,255,0.1)] hover:border-white/90"
                      >
                        Web Design
                      </div>
                      <div 
                        style={{ fontFamily: 'JetBrains Mono, monospace' }} 
                        className="inline-flex text-[#888888] hover:text-white text-[13px] bg-transparent border border-white/70 rounded-2xl px-5 py-2.5 transition-all duration-300 hover:shadow-[0_0_10px_rgba(255,255,255,0.4),0_0_20px_rgba(255,255,255,0.2),0_0_30px_rgba(255,255,255,0.1)] hover:border-white/90"
                      >
                        App Design
                      </div>
                      <div 
                        style={{ fontFamily: 'JetBrains Mono, monospace' }} 
                        className="inline-flex text-[#888888] hover:text-white text-[13px] bg-transparent border border-white/70 rounded-2xl px-5 py-2.5 transition-all duration-300 hover:shadow-[0_0_10px_rgba(255,255,255,0.4),0_0_20px_rgba(255,255,255,0.2),0_0_30px_rgba(255,255,255,0.1)] hover:border-white/90"
                      >
                        HCI
                      </div>
                      <div 
                        style={{ fontFamily: 'JetBrains Mono, monospace' }} 
                        className="inline-flex text-[#888888] hover:text-white text-[13px] bg-transparent border border-white/70 rounded-2xl px-5 py-2.5 transition-all duration-300 hover:shadow-[0_0_10px_rgba(255,255,255,0.4),0_0_20px_rgba(255,255,255,0.2),0_0_30px_rgba(255,255,255,0.1)] hover:border-white/90"
                      >
                        Prototyping
                      </div>
                      <div 
                        style={{ fontFamily: 'JetBrains Mono, monospace' }} 
                        className="inline-flex text-[#888888] hover:text-white text-[13px] bg-transparent border border-white/70 rounded-2xl px-5 py-2.5 transition-all duration-300 hover:shadow-[0_0_10px_rgba(255,255,255,0.4),0_0_20px_rgba(255,255,255,0.2),0_0_30px_rgba(255,255,255,0.1)] hover:border-white/90"
                      >
                        Pitchdecks
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Professional Services Section */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: showContent ? 1 : 0,
                  y: showContent ? 0 : 20
                }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col items-start"
              >
                <div className="flex items-start gap-12">
                  {/* Professional Services Logos - Two rows */}
                  <div className="flex flex-col gap-1 mt-2">
                    <div className="flex gap-4 items-center">
                      <img
                        src="/assets/logos/Replit_Logo_Symbol.svg"
                        alt="Replit Logo"
                        className="w-10 h-10 opacity-70 hover:opacity-100 transition-opacity"
                      />
                      <img
                        src="/assets/logos/shopify-logo-svgrepo-com.svg"
                        alt="Shopify Logo"
                        className="w-10 h-10 opacity-70 hover:opacity-100 transition-opacity"
                      />
                    </div>
                    <div className="flex gap-4 items-center">
                      <img
                        src="/assets/logos/tableau-software.svg"
                        alt="Tableau Logo"
                        className="w-10 h-10 opacity-70 hover:opacity-100 transition-opacity"
                      />
                      <img
                        src="/assets/logos/N8N.Io_idQ-KxEpHW_1.svg"
                        alt="n8n Logo"
                        className="w-12 h-12 opacity-70 hover:opacity-100 transition-opacity"
                      />
                    </div>
                    <div className="flex gap-4 items-center">
                      <img
                        src="/assets/logos/supabase-logo-wordmark--dark.svg"
                        alt="Supabase Logo"
                        className="w-[62px] h-[62px] opacity-70 hover:opacity-100 transition-opacity"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h2 
                      className="bebas mb-8 text-left w-full"
                      style={{
                        fontSize: '26.6px',
                        lineHeight: '34px',
                        letterSpacing: '0.08em',
                        color: 'white',
                        textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                        filter: 'brightness(1.2)'
                      }}
                    >
                      PROFESSIONAL SERVICES
                    </h2>
                    <div className="flex flex-wrap gap-3 justify-start" style={{ maxWidth: '520px' }}>
                      <div 
                        style={{ fontFamily: 'JetBrains Mono, monospace' }} 
                        className="inline-flex text-[#888888] hover:text-white text-[13px] bg-transparent border border-white/70 rounded-2xl px-5 py-2.5 transition-all duration-300 hover:shadow-[0_0_10px_rgba(255,255,255,0.4),0_0_20px_rgba(255,255,255,0.2),0_0_30px_rgba(255,255,255,0.1)] hover:border-white/90"
                      >
                        Product (5P) Strategy
                      </div>
                      <div 
                        style={{ fontFamily: 'JetBrains Mono, monospace' }} 
                        className="inline-flex text-[#888888] hover:text-white text-[13px] bg-transparent border border-white/70 rounded-2xl px-5 py-2.5 transition-all duration-300 hover:shadow-[0_0_10px_rgba(255,255,255,0.4),0_0_20px_rgba(255,255,255,0.2),0_0_30px_rgba(255,255,255,0.1)] hover:border-white/90"
                      >
                        AI Automation
                      </div>
                      <div 
                        style={{ fontFamily: 'JetBrains Mono, monospace' }} 
                        className="inline-flex text-[#888888] hover:text-white text-[13px] bg-transparent border border-white/70 rounded-2xl px-5 py-2.5 transition-all duration-300 hover:shadow-[0_0_10px_rgba(255,255,255,0.4),0_0_20px_rgba(255,255,255,0.2),0_0_30px_rgba(255,255,255,0.1)] hover:border-white/90"
                      >
                        Data Analytics
                      </div>
                      <div 
                        style={{ fontFamily: 'JetBrains Mono, monospace' }} 
                        className="inline-flex text-[#888888] hover:text-white text-[13px] bg-transparent border border-white/70 rounded-2xl px-5 py-2.5 transition-all duration-300 hover:shadow-[0_0_10px_rgba(255,255,255,0.4),0_0_20px_rgba(255,255,255,0.2),0_0_30px_rgba(255,255,255,0.1)] hover:border-white/90"
                      >
                        Fullstack Development
                      </div>
                      <div 
                        style={{ fontFamily: 'JetBrains Mono, monospace' }} 
                        className="inline-flex text-[#888888] hover:text-white text-[13px] bg-transparent border border-white/70 rounded-2xl px-5 py-2.5 transition-all duration-300 hover:shadow-[0_0_10px_rgba(255,255,255,0.4),0_0_20px_rgba(255,255,255,0.2),0_0_30px_rgba(255,255,255,0.1)] hover:border-white/90"
                      >
                        Database Setup
                      </div>
                      <div 
                        style={{ fontFamily: 'JetBrains Mono, monospace' }} 
                        className="inline-flex text-[#888888] hover:text-white text-[13px] bg-transparent border border-white/70 rounded-2xl px-5 py-2.5 transition-all duration-300 hover:shadow-[0_0_10px_rgba(255,255,255,0.4),0_0_20px_rgba(255,255,255,0.2),0_0_30px_rgba(255,255,255,0.1)] hover:border-white/90"
                      >
                        WordPress
                      </div>
                      <div 
                        style={{ fontFamily: 'JetBrains Mono, monospace' }} 
                        className="inline-flex text-[#888888] hover:text-white text-[13px] bg-transparent border border-white/70 rounded-2xl px-5 py-2.5 transition-all duration-300 hover:shadow-[0_0_10px_rgba(255,255,255,0.4),0_0_20px_rgba(255,255,255,0.2),0_0_30px_rgba(255,255,255,0.1)] hover:border-white/90"
                      >
                        Shopify
                      </div>
                      <div 
                        style={{ fontFamily: 'JetBrains Mono, monospace' }} 
                        className="inline-flex text-[#888888] hover:text-white text-[13px] bg-transparent border border-white/70 rounded-2xl px-5 py-2.5 transition-all duration-300 hover:shadow-[0_0_10px_rgba(255,255,255,0.4),0_0_20px_rgba(255,255,255,0.2),0_0_30px_rgba(255,255,255,0.1)] hover:border-white/90"
                      >
                        Market Research
                      </div>
                      <div 
                        style={{ fontFamily: 'JetBrains Mono, monospace' }} 
                        className="inline-flex text-[#888888] hover:text-white text-[13px] bg-transparent border border-white/70 rounded-2xl px-5 py-2.5 transition-all duration-300 hover:shadow-[0_0_10px_rgba(255,255,255,0.4),0_0_20px_rgba(255,255,255,0.2),0_0_30px_rgba(255,255,255,0.1)] hover:border-white/90"
                      >
                        n8n
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
          </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Services;
