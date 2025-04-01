import React, { useEffect, useState } from "react";
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
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
      {showLoader && !showContent && !location.state?.isInternalNavigation && (
        <LoaderAnimation onAnimationComplete={handleLoaderComplete} />
      )}

      {/* Wave Animation */}
      <motion.div 
        className="absolute inset-0 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <WaveAnimation />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 w-full min-h-screen mx-auto flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : -20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Header />
        </motion.div>
        
        {/* Main content with orb and text */}
        <div className="w-full h-screen flex items-center justify-center">
          {/* Hero Text */}
          <motion.div 
            className="absolute left-[5%] max-w-[400px] text-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: showContent ? 1 : 0, x: showContent ? 0 : -20 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <h1 className="font-['Handjet'] font-thin text-[60px] leading-none tracking-wide">
              <span className="text-muted-foreground">Building the future at the nexus of</span>
              <span className="text-white"> tech & business</span>
            </h1>
          </motion.div>

          {/* Orb container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: showContent ? 1 : 0.8, 
              opacity: showContent ? 1 : 0 
            }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: 0.2
            }}
            className="relative w-[66.5vh] h-[66.5vh] orb-shadow"
            style={{ margin: '0 auto' }}
          >
            <OrbScene className="w-full h-full" />
          </motion.div>

          {/* Bio content */}
          <motion.div 
            className="absolute right-[6%] max-w-[400px]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: showContent ? 1 : 0, x: showContent ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <div
              className="flex flex-col gap-4 text-center"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '12px',
                lineHeight: '1.5',
                color: 'rgb(156 163 175)'
              }}
            >
              <p>Hi, I'm Rahul Muthavarapu, an <span className="text-white">automation expert</span> and <span className="text-white">UI/UX designer</span>, currently a Dean's Scholar MBA candidate at UC Riverside.</p>
              <p>Three years ago, I started as a Program Associate at an Indian business incubator, collaborating with startup founders on product innovation. That experience drove me to create tech solutions that are both sustainable and impactful.</p>
              <p>I'm always exploring how products meet evolving business needs, and when AI took off, I dove in to build automation tools that boost operational efficiency. By the way, this website came to life through "<span className="text-white">Vibecoding</span>" and I never wrote a single line of code!</p>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
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