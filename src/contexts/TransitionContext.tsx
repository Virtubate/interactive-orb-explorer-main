
import React, { createContext, useContext, useState } from 'react';
import { gsap } from 'gsap';

type TransitionType = 'orb' | 'globe';

interface TransitionContextType {
  initiateTransition: (from: TransitionType, to: TransitionType, onComplete?: () => void) => Promise<void>;
  currentScene: TransitionType;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export const TransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScene, setCurrentScene] = useState<TransitionType>('orb');

  const initiateTransition = async (from: TransitionType, to: TransitionType, onComplete?: () => void) => {
    const timeline = gsap.timeline();
    
    // Fade out current scene
    timeline.to(`#${from}-container`, {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      ease: 'power2.inOut'
    });

    // Switch scenes
    timeline.call(() => {
      setCurrentScene(to);
    });

    // Fade in new scene
    timeline.fromTo(`#${to}-container`,
      { 
        opacity: 0,
        scale: 0.8
      },
      { 
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'power2.inOut'
      }
    );

    // Call completion handler if provided
    if (onComplete) {
      timeline.call(onComplete);
    }

    return new Promise((resolve) => {
      timeline.call(resolve);
    });
  };

  return (
    <TransitionContext.Provider value={{ initiateTransition, currentScene }}>
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransition must be used within a TransitionProvider');
  }
  return context;
};
