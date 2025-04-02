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
    <div className="relative w-full min-h-screen bg-black overflow-hidden services-page">
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
            className="w-full 
                         absolute
                         mt-[-40px] md:mt-[-140px] lg:mt-[-160px] 
                         mb-[100px] 
                         lg:pl-8 lg:pr-8 
                         right-[5vw] md:right-[7vw] lg:right-[5vw] 
                         transform 
                         translate-x-[-35%] md:translate-x-[-50%] lg:translate-x-[-35%] 
                         max-w-[90%] md:max-w-[900px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: showContent ? 1 : 0,
              y: showContent ? 0 : 20
            }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 1.2 }}
          >
            <div className="flex flex-col 
                            gap-5 md:gap-6 lg:gap-8 
                            mt-[104px] md:mt-[140px] lg:mt-[180px] 
                            mb-8 md:mb-12 lg:mb-[100px] 
                            px-6 md:px-6 lg:px-8"
            >
              {/* Design Services Section */}
              <section>
                {/* Logos container */}
                <div className="flex items-center gap-4 justify-start">
                  <img
                    src="/assets/logos/figma-1-logo-svgrepo-com.svg"
                    alt="Figma Logo"
                    className="w-6 h-6 md:w-8 md:h-8 opacity-70 hover:opacity-100 transition-opacity"
                  />
                  <img
                    src="/assets/logos/3js.png"
                    alt="Three.js Logo"
                    className="w-[31px] h-[31px] md:w-[58px] md:h-[58px] opacity-70 hover:opacity-100 transition-opacity"
                  />
                </div>
                
                {/* Content section */}
                <div>
                  <h2 className="bebas mb-2 md:mb-4 
                                 text-[17.6px] md:text-[22px] lg:text-[26.6px] text-left"
                    style={{
                      lineHeight: '28px',
                      letterSpacing: '0.08em',
                      color: 'white',
                      textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                      filter: 'brightness(1.2)'
                    }}
                  >
                    DESIGN SERVICES
                  </h2>
                  
                  {/* Keywords container */}
                  <div className="flex flex-wrap 
                                gap-1 sm:gap-1.5 md:gap-2 
                                w-full sm:w-[800px] md:w-[900px]
                                max-w-[99vw] sm:max-w-none"
                  >
                    <div style={{ fontFamily: 'JetBrains Mono, monospace' }} 
                         className="inline-flex 
                                   text-white/50 sm:text-[#888888] 
                                   hover:text-white 
                                   text-[11.62px] sm:text-[11px] md:text-[14.98px] 
                                   bg-transparent 
                                   border 
                                   border-white/70 
                                   rounded-2xl 
                                   px-4 
                                   py-2 
                                   transition-all 
                                   duration-300 
                                   hover:shadow-[0_0_10px_rgba(255,255,255,0.4),0_0_20px_rgba(255,255,255,0.2),0_0_30px_rgba(255,255,255,0.1)] 
                                   hover:border-white/90">
                      Web Design
                    </div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace' }} 
                         className="inline-flex 
                                   text-white/50 sm:text-[#888888] 
                                   hover:text-white 
                                   text-[11.62px] sm:text-[11px] md:text-[14.98px] 
                                   bg-transparent 
                                   border 
                                   border-white/70 
                                   rounded-2xl 
                                   px-4 
                                   py-2 
                                   transition-all 
                                   duration-300 
                                   hover:shadow-[0_0_10px_rgba(255,255,255,0.4),0_0_20px_rgba(255,255,255,0.2),0_0_30px_rgba(255,255,255,0.1)] 
                                   hover:border-white/90">
                      App Design
                    </div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace' }} 
                         className="inline-flex 
                                   text-white/50 sm:text-[#888888] 
                                   hover:text-white 
                                   text-[11.62px] sm:text-[11px] md:text-[14.98px] 
                                   bg-transparent 
                                   border 
                                   border-white/70 
                                   rounded-2xl 
                                   px-4 
                                   py-2 
                                   transition-all 
                                   duration-300 
                                   hover:shadow-[0_0_10px_rgba(255,255,255,0.4),0_0_20px_rgba(255,255,255,0.2),0_0_30px_rgba(255,255,255,0.1)] 
                                   hover:border-white/90">
                      HCI
                    </div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace' }} 
                         className="inline-flex 
                                   text-white/50 sm:text-[#888888] 
                                   hover:text-white 
                                   text-[11.62px] sm:text-[11px] md:text-[14.98px] 
                                   bg-transparent 
                                   border 
                                   border-white/70 
                                   rounded-2xl 
                                   px-4 
                                   py-2 
                                   transition-all 
                                   duration-300 
                                   hover:shadow-[0_0_10px_rgba(255,255,255,0.4),0_0_20px_rgba(255,255,255,0.2),0_0_30px_rgba(255,255,255,0.1)] 
                                   hover:border-white/90">
                      Prototyping
                    </div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace' }} 
                         className="inline-flex 
                                   text-white/50 sm:text-[#888888] 
                                   hover:text-white 
                                   text-[11.62px] sm:text-[11px] md:text-[14.98px] 
                                   bg-transparent 
                                   border 
                                   border-white/70 
                                   rounded-2xl 
                                   px-4 
                                   py-2 
                                   transition-all 
                                   duration-300 
                                   hover:shadow-[0_0_10px_rgba(255,255,255,0.4),0_0_20px_rgba(255,255,255,0.2),0_0_30px_rgba(255,255,255,0.1)] 
                                   hover:border-white/90">
                      Pitchdecks
                    </div>
                  </div>
                </div>
              </section>

              {/* Professional Services Section */}
              <section>
                {/* Logos container */}
                <div className="flex items-center gap-4 justify-start">
                  <img
                    src="/assets/logos/Replit_Logo_Symbol.svg"
                    alt="Replit Logo"
                    className="w-[31px] h-[31px] md:w-[58px] md:h-[58px] opacity-70 hover:opacity-100 transition-opacity"
                  />
                  <img
                    src="/assets/logos/shopify-logo-svgrepo-com.svg"
                    alt="Shopify Logo"
                    className="w-6 h-6 md:w-8 md:h-8 opacity-70 hover:opacity-100 transition-opacity"
                  />
                  <img
                    src="/assets/logos/tableau-software.svg"
                    alt="Tableau Logo"
                    className="w-6 h-6 md:w-8 md:h-8 opacity-70 hover:opacity-100 transition-opacity"
                  />
                  <img
                    src="/assets/logos/supabase-logo-wordmark--dark.svg"
                    alt="Supabase Logo"
                    className="w-[48px] h-[48px] md:w-[90px] md:h-[90px] opacity-70 hover:opacity-100 transition-opacity"
                  />
                  <img
                    src="/assets/logos/N8N.Io_idQ-KxEpHW_1.svg"
                    alt="n8n Logo"
                    className="w-[37px] h-[37px] md:w-[70px] md:h-[70px] opacity-70 hover:opacity-100 transition-opacity"
                  />
                </div>

                {/* Content section */}
                <div>
                  <h2 className="bebas mb-2 md:mb-4 text-[17.6px] md:text-[22px] lg:text-[26.6px] text-left"
                    style={{
                      lineHeight: '28px',
                      letterSpacing: '0.08em',
                      color: 'white',
                      textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                      filter: 'brightness(1.2)'
                    }}
                  >
                    PROFESSIONAL SERVICES
                  </h2>
                  
                  {/* Keywords container */}
                  <div className="flex flex-wrap 
                                gap-1 sm:gap-1.5 md:gap-2 
                                w-full sm:w-[800px] md:w-[900px] 
                                max-w-[99vw] sm:max-w-none"
                  >
                    <div style={{ fontFamily: 'JetBrains Mono, monospace' }} 
                         className="inline-flex 
                                   text-white/50 sm:text-[#888888] 
                                   hover:text-white 
                                   text-[11.62px] sm:text-[11px] md:text-[14.98px] 
                                   bg-transparent 
                                   border 
                                   border-white/70 
                                   rounded-2xl 
                                   px-4 
                                   py-2 
                                   transition-all 
                                   duration-300 
                                   hover:shadow-[0_0_10px_rgba(255,255,255,0.4),0_0_20px_rgba(255,255,255,0.2),0_0_30px_rgba(255,255,255,0.1)] 
                                   hover:border-white/90">
                      Product (5P) Strategy
                    </div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace' }} 
                         className="inline-flex 
                                   text-white/50 sm:text-[#888888] 
                                   hover:text-white 
                                   text-[11.62px] sm:text-[11px] md:text-[14.98px] 
                                   bg-transparent 
                                   border 
                                   border-white/70 
                                   rounded-2xl 
                                   px-4 
                                   py-2 
                                   transition-all 
                                   duration-300 
                                   hover:shadow-[0_0_10px_rgba(255,255,255,0.4),0_0_20px_rgba(255,255,255,0.2),0_0_30px_rgba(255,255,255,0.1)] 
                                   hover:border-white/90">
                      AI Automation
                    </div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace' }} 
                         className="inline-flex 
                                   text-white/50 sm:text-[#888888] 
                                   hover:text-white 
                                   text-[11.62px] sm:text-[11px] md:text-[14.98px] 
                                   bg-transparent 
                                   border 
                                   border-white/70 
                                   rounded-2xl 
                                   px-4 
                                   py-2 
                                   transition-all 
                                   duration-300 
                                   hover:shadow-[0_0_10px_rgba(255,255,255,0.4),0_0_20px_rgba(255,255,255,0.2),0_0_30px_rgba(255,255,255,0.1)] 
                                   hover:border-white/90">
                      Data Analytics
                    </div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace' }} 
                         className="inline-flex 
                                   text-white/50 sm:text-[#888888] 
                                   hover:text-white 
                                   text-[11.62px] sm:text-[11px] md:text-[14.98px] 
                                   bg-transparent 
                                   border 
                                   border-white/70 
                                   rounded-2xl 
                                   px-4 
                                   py-2 
                                   transition-all 
                                   duration-300 
                                   hover:shadow-[0_0_10px_rgba(255,255,255,0.4),0_0_20px_rgba(255,255,255,0.2),0_0_30px_rgba(255,255,255,0.1)] 
                                   hover:border-white/90">
                      Fullstack Development
                    </div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace' }} 
                         className="inline-flex 
                                   text-white/50 sm:text-[#888888] 
                                   hover:text-white 
                                   text-[11.62px] sm:text-[11px] md:text-[14.98px] 
                                   bg-transparent 
                                   border 
                                   border-white/70 
                                   rounded-2xl 
                                   px-4 
                                   py-2 
                                   transition-all 
                                   duration-300 
                                   hover:shadow-[0_0_10px_rgba(255,255,255,0.4),0_0_20px_rgba(255,255,255,0.2),0_0_30px_rgba(255,255,255,0.1)] 
                                   hover:border-white/90">
                      Database Setup
                    </div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace' }} 
                         className="inline-flex 
                                   text-white/50 sm:text-[#888888] 
                                   hover:text-white 
                                   text-[11.62px] sm:text-[11px] md:text-[14.98px] 
                                   bg-transparent 
                                   border 
                                   border-white/70 
                                   rounded-2xl 
                                   px-4 
                                   py-2 
                                   transition-all 
                                   duration-300 
                                   hover:shadow-[0_0_10px_rgba(255,255,255,0.4),0_0_20px_rgba(255,255,255,0.2),0_0_30px_rgba(255,255,255,0.1)] 
                                   hover:border-white/90">
                      WordPress
                    </div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace' }} 
                         className="inline-flex 
                                   text-white/50 sm:text-[#888888] 
                                   hover:text-white 
                                   text-[11.62px] sm:text-[11px] md:text-[14.98px] 
                                   bg-transparent 
                                   border 
                                   border-white/70 
                                   rounded-2xl 
                                   px-4 
                                   py-2 
                                   transition-all 
                                   duration-300 
                                   hover:shadow-[0_0_10px_rgba(255,255,255,0.4),0_0_20px_rgba(255,255,255,0.2),0_0_30px_rgba(255,255,255,0.1)] 
                                   hover:border-white/90">
                      Shopify
                    </div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace' }} 
                         className="inline-flex 
                                   text-white/50 sm:text-[#888888] 
                                   hover:text-white 
                                   text-[11.62px] sm:text-[11px] md:text-[14.98px] 
                                   bg-transparent 
                                   border 
                                   border-white/70 
                                   rounded-2xl 
                                   px-4 
                                   py-2 
                                   transition-all 
                                   duration-300 
                                   hover:shadow-[0_0_10px_rgba(255,255,255,0.4),0_0_20px_rgba(255,255,255,0.2),0_0_30px_rgba(255,255,255,0.1)] 
                                   hover:border-white/90">
                      Market Research
                    </div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace' }} 
                         className="inline-flex 
                                   text-white/50 sm:text-[#888888] 
                                   hover:text-white 
                                   text-[11.62px] sm:text-[11px] md:text-[14.98px] 
                                   bg-transparent 
                                   border 
                                   border-white/70 
                                   rounded-2xl 
                                   px-4 
                                   py-2 
                                   transition-all 
                                   duration-300 
                                   hover:shadow-[0_0_10px_rgba(255,255,255,0.4),0_0_20px_rgba(255,255,255,0.2),0_0_30px_rgba(255,255,255,0.1)] 
                                   hover:border-white/90">
                      n8n
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Services;
