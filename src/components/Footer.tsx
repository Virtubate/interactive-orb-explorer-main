import React, { useEffect, useState } from 'react';

export default function Footer() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full text-white py-4 sm:py-6 px-6 sm:px-12 flex justify-between items-center fixed bottom-0 z-50 bg-transparent">
      {/* Section 1 - Mobile: Social Links, Web: Time */}
      <div className="flex-1 max-w-[120px] sm:max-w-[200px]">
        {/* Mobile View: Social Links */}
        <div className="sm:hidden text-[10px] text-gray-400" 
             style={{ fontFamily: 'JetBrains Mono, monospace', lineHeight: '20px' }}
        >
          <a href="https://www.linkedin.com/in/rmuth004/" 
             target="_blank" 
             rel="noopener noreferrer" 
             className="hover:text-white transition-colors"
          >
            Linkedin
          </a>
          <a href="https://github.com/Virtubate"
             target="_blank" 
             rel="noopener noreferrer" 
             className="block hover:text-white transition-colors"
          >
            Github
          </a>
          <a href="https://medium.com/@rmuth004"
             target="_blank" 
             rel="noopener noreferrer" 
             className="block hover:text-white transition-colors"
          >
            Medium
          </a>
        </div>
        
        {/* Web View: Time (original) */}
        <div className="hidden sm:flex flex-col">
          <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            Local Time
          </div>
          <div className="text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            PST {currentTime}
          </div>
        </div>
      </div>

      {/* Section 2 - Social Links (Hidden in mobile) */}
      <div className="hidden sm:flex flex-1 justify-start" style={{ marginLeft: '5%' }}>
        <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace', lineHeight: '24px' }}>
          <a href="https://www.linkedin.com/in/rmuth004/" 
             target="_blank" 
             rel="noopener noreferrer" 
             className="hover:text-white transition-colors"
          >
            Linkedin
          </a>
          <a href="https://github.com/Virtubate"
             target="_blank" 
             rel="noopener noreferrer" 
             className="block hover:text-white transition-colors"
          >
            Github
          </a>
          <a href="https://medium.com/@rmuth004"
             target="_blank" 
             rel="noopener noreferrer" 
             className="block hover:text-white transition-colors"
          >
            Medium
          </a>
        </div>
      </div>

      {/* Section 3 - Mobile: Get in touch, Web: Copyright */}
      <div className="flex-1 max-w-[100px] sm:max-w-[200px] flex sm:justify-start">
        {/* Mobile View: Get in touch */}
        <div className="flex sm:hidden flex-col">
          <div style={{ fontFamily: 'JetBrains Mono, monospace' }} 
               className="text-[10px] text-gray-400"
          >
            Get in touch
          </div>
          <a href="mailto:rmuth004@ucr.edu" 
             style={{
               WebkitFontSmoothing: 'antialiased',
               fontFamily: 'JetBrains Mono, monospace',
               fontSize: '10px',
               letterSpacing: '0.08em',
               color: 'white',
               textDecoration: 'underline',
               textTransform: 'lowercase'
             }}
          >
            rmuth004@ucr.edu
          </a>
        </div>

        {/* Web View: Copyright - Increased container width */}
        <div className="hidden sm:flex flex-col mr-24 min-w-[150px]">
          <div className="bebas text-[10px] text-white text-left">
            © 2025
          </div>
          <div className="bebas text-[10px] text-white text-left">
            ALL RIGHTS RESERVED
          </div>
        </div>
      </div>
    </footer>
  );
}