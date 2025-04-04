import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

interface LoaderAnimationProps {
  onAnimationComplete: () => void;
}

const LoaderAnimation: React.FC<LoaderAnimationProps> = ({ onAnimationComplete }) => {
  const circleRef = useRef<SVGCircleElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<GSAPTimeline | null>(null);

  useEffect(() => {
    if (!circleRef.current || !containerRef.current) return;

    // Get dimensions matching the orb size but 25% smaller
    const orbSize = window.innerHeight * 0.665 * 0.75; // 66.5vh * 0.75
    const radius = orbSize / 2;
    
    // Set container size
    if (containerRef.current) {
      containerRef.current.style.width = `${orbSize}px`;
      containerRef.current.style.height = `${orbSize}px`;
    }

    // Set up the circle
    const circle = circleRef.current;
    const circumference = 2 * Math.PI * radius;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;

    // Reset any existing animation
    if (animationRef.current) {
      animationRef.current.kill();
    }

    // Create the animation sequence
    const tl = gsap.timeline({
      onComplete: () => {
        onAnimationComplete();
      }
    });

    // Store the timeline reference
    animationRef.current = tl;

    // Reset initial state
    gsap.set(circle, {
      strokeDashoffset: circumference,
      filter: "none",
      opacity: 1
    });
    gsap.set(containerRef.current, {
      opacity: 1
    });

    // Draw the circle with initial glow (1s)
    tl.to(circle, {
      strokeDashoffset: 0,
      filter: "drop-shadow(0 0 15px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 25px rgba(255, 255, 255, 0.7)) drop-shadow(0 0 35px rgba(255, 255, 255, 0.5))",
      duration: 1,
      ease: "power2.inOut"
    })
    // Enhance glow dramatically (0.3s)
    .to(circle, {
      filter: "drop-shadow(0 0 25px rgba(255, 255, 255, 1)) drop-shadow(0 0 45px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 65px rgba(255, 255, 255, 0.7)) drop-shadow(0 0 85px rgba(255, 255, 255, 0.5))",
      duration: 0.3,
      ease: "power2.inOut"
    })
    // Hold the enhanced glow (0.7s)
    .to({}, {
      duration: 0.7
    })
    // Fade out both circle and glow
    .to([circle, containerRef.current], {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut"
    });

    // Cleanup function
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [onAnimationComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center m-auto pointer-events-none overflow-hidden rounded-full"
      style={{
        background: 'transparent'
      }}
    >
      <svg 
        width="100%" 
        height="100%" 
        viewBox="-10 -10 120 120" 
        style={{
          overflow: 'hidden',
          borderRadius: '50%'
        }}
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <mask id="circleMask">
            <circle cx="50" cy="50" r="60" fill="white" />
          </mask>
        </defs>
        <g mask="url(#circleMask)">
          <circle
            ref={circleRef}
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="white"
            strokeWidth="1"
            strokeLinecap="round"
            style={{
              filter: 'url(#glow)'
            }}
          />
          {/* Inner glow circles */}
          <circle
            cx="50"
            cy="50"
            r="44.5"
            fill="none"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="2"
            style={{
              filter: 'blur(4px)'
            }}
          />
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="3"
            style={{
              filter: 'blur(6px)'
            }}
          />
          {/* Outer glow circles */}
          <circle
            cx="50"
            cy="50"
            r="45.5"
            fill="none"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="2"
            style={{
              filter: 'blur(4px)'
            }}
          />
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="3"
            style={{
              filter: 'blur(6px)'
            }}
          />
        </g>
      </svg>
    </div>
  );
};

export default LoaderAnimation; 