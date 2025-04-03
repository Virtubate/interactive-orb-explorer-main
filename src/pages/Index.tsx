import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import OrbScene from '@/components/OrbScene';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WaveAnimation from "@/components/WaveAnimation";
import LoaderAnimation from "@/components/LoaderAnimation";
import { useTransition } from '../contexts/TransitionContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { transitionManager } from '../transitions/TransitionManager';

const Index = () => {
  const [showContent, setShowContent] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [isSlowLoad, setIsSlowLoad] = useState(false);
  const { initiateTransition, currentScene } = useTransition();
  const navigate = useNavigate();
  const location = useLocation();
  const [fadeProgress, setFadeProgress] = useState(0);
  const touchStartRef = useRef(0);

  useEffect(() => {
    // Check if this is first visit
    const isFirstVisit = !sessionStorage.getItem('hasVisited');
    
    // Check if this is a page refresh using the newer Performance API
    const navigationEntries = performance.getEntriesByType('navigation');
    const isRefresh = navigationEntries.length > 0 && 
      (navigationEntries[0] as PerformanceNavigationTiming).type === 'reload';

    // Check if this is internal navigation (from state)
    const isInternalNavigation = location.state?.isInternalNavigation;
    
    // If it's internal navigation, show content immediately
    if (isInternalNavigation) {
      setShowContent(true);
      return;
    }

    // Set up slow load detection
    const slowLoadTimeout = setTimeout(() => {
      if (!showContent && !isInternalNavigation) {
        setIsSlowLoad(true);
        setShowLoader(true);
      }
    }, 1000);

    // Show loader only on first visit or actual refresh
    if (isFirstVisit || isRefresh) {
      setShowLoader(true);
      // Mark that user has visited
      sessionStorage.setItem('hasVisited', 'true');
    } else {
      // For returning visits, show content immediately
      setShowContent(true);
    }

    return () => {
      clearTimeout(slowLoadTimeout);
    };
  }, [location]);

  // Touch handlers for mobile only
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (window.innerWidth < 640) {
        touchStartRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (window.innerWidth < 640) {
        const currentY = e.touches[0].clientY;
        const diff = touchStartRef.current - currentY;
        
        // Calculate progress based on touch movement
        const progress = Math.max(0, Math.min(1, diff / 150));
        setFadeProgress(progress);
        
        // Prevent actual scrolling
        e.preventDefault();
      }
    };

    // Add touch event listeners
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const handleLoaderComplete = () => {
    setTimeout(() => {
      setShowContent(true);
    }, 500);
  };

  const handleProjectsClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    try {
      await transitionManager.morphToGlobe();
      await initiateTransition('orb', 'globe', () => {
        navigate('/projects');
      });
    } catch (error) {
      console.error('Transition failed:', error);
      navigate('/projects');
    }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {showLoader && !showContent && !location.state?.isInternalNavigation && (
        <LoaderAnimation onAnimationComplete={handleLoaderComplete} />
      )}

      {/* Fixed Wave Animation */}
      <motion.div 
        className="fixed inset-0 z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <WaveAnimation />
      </motion.div>

      {/* Content Container */}
      <div className="relative z-20 w-full h-screen">
        {/* Fixed Header */}
        <motion.div
          className="fixed top-0 left-0 right-0 z-50 sm:relative sm:z-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : -20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Header />
        </motion.div>
        
        {/* Main Content */}
        <div className="relative w-full h-screen flex flex-col sm:flex-row items-center justify-between">
          {/* Hero Text */}
          <motion.div 
            className="
              /* Mobile (<640px) */
              w-full
              px-4
              absolute 
              top-[160px]
              text-center
              
              /* Tablet & Web rules - unchanged */
              sm:w-[400px]
              sm:px-0
              sm:relative 
              sm:top-auto
              sm:left-[5%]
              sm:text-left
              md:left-[8%]"
            style={{ 
              opacity: window.innerWidth < 640 ? 1 - fadeProgress : 1,
              transition: 'opacity 0.2s ease'
            }}
          >
            <h1 className="font-['Handjet'] font-thin 
                          text-[38px]
                          sm:text-[48px]
                          md:text-[60px]
                          leading-none tracking-wide">
              <span className="text-muted-foreground">Building the future at the nexus of</span>
              <span className="text-white"> tech & business</span>
            </h1>
          </motion.div>

          {/* Orb */}
          <motion.div
            className="
              /* Mobile (<640px) */
              absolute
              top-[50%]
              left-[50%]
              -translate-x-1/2
              -translate-y-1/2
              w-[337px]
              h-[337px]
              
              /* Tablet & Web rules - unchanged */
              sm:static
              sm:transform-none
              sm:w-[383px]
              sm:h-[383px]
              sm:mx-0
              md:w-[66.5vh]
              md:h-[66.5vh]
              orb-shadow"
            style={{ 
              opacity: window.innerWidth < 640 ? 1 - fadeProgress : 1,
              transition: 'opacity 0.2s ease'
            }}
          >
            <OrbScene className="w-full h-full" />
          </motion.div>

          {/* Arrow and Text - Mobile Only with Fade Out */}
          <div className="
            /* Mobile (<640px) */
            absolute
            top-[calc(50%+230px)]
            left-1/2
            -translate-x-1/2
            flex
            flex-col
            items-center
            
            /* Hide in tablet/web */
            sm:hidden"
            style={{ 
              opacity: window.innerWidth < 640 ? 1 - fadeProgress : 1,
              transition: 'opacity 0.2s ease'
            }}
          >
            {/* Thin Upward Arrow */}
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              className="mb-2"
            >
              <path 
                d="M12 20V4M12 4L6 10M12 4L18 10" 
                stroke="white" 
                strokeWidth="1" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>

            {/* Scroll Up Text */}
            <span className="
              font-['JetBrains_Mono']
              text-xs
              text-gray-400
              tracking-wider
            ">
              Scroll Up
            </span>
          </div>

          {/* Bio content */}
          <motion.div 
            className="
              /* Mobile (<640px) */
              w-full
              px-4
              absolute 
              top-1/2 
              left-1/2 
              -translate-x-1/2 
              -translate-y-1/2
              text-center
              
              /* Tablet & Web rules - unchanged */
              sm:w-[400px]
              sm:px-0
              sm:relative
              sm:transform-none
              sm:top-auto
              sm:left-auto
              sm:absolute 
              sm:right-[6%]
              sm:text-left
              md:right-[8%]"
            style={{ 
              opacity: window.innerWidth < 640 ? 
                (fadeProgress > 0.3 ? (fadeProgress - 0.3) * 1.4 : 0) : 1,
              transition: 'opacity 0.3s ease',
              pointerEvents: window.innerWidth < 640 && fadeProgress < 0.5 ? 'none' : 'auto',
              zIndex: window.innerWidth < 640 ? (fadeProgress > 0.5 ? 20 : 0) : 'auto'
            }}
          >
            <div className="flex flex-col gap-3 sm:gap-4 text-center sm:text-left">
              <p className="font-['JetBrains_Mono'] 
                          text-[16px]
                          sm:text-[11px]
                          md:text-[12px]
                          leading-relaxed text-gray-400">
                Hi, I'm Rahul Muthavarapu, an <span className="text-white">automation expert</span> and <span className="text-white">UI/UX designer</span>, currently a Dean's Scholar MBA candidate at UC Riverside.
              </p>
              <p className="font-['JetBrains_Mono'] 
                          text-[16px]
                          sm:text-[11px]
                          md:text-[12px]
                          leading-relaxed text-gray-400">
                Three years ago, I started as a Program Associate at an Indian business incubator, collaborating with startup founders on product innovation. That experience drove me to create tech solutions that are both sustainable and impactful.
              </p>
              <p className="font-['JetBrains_Mono'] 
                          text-[16px]
                          sm:text-[11px]
                          md:text-[12px]
                          leading-relaxed text-gray-400">
                I'm always exploring how products meet evolving business needs, and when AI took off, I dove in to build automation tools that boost operational efficiency. By the way, this website came to life through "<span className="text-white">Vibecoding</span>" and I never wrote a single line of code!
              </p>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50 sm:relative sm:z-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Footer />
        </motion.div>
      </div>
    </div>
  );
};

export default Index;