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
          <div>Github</div>
          <div>Instagram</div>
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
          <div>Github</div>
          <div>Instagram</div>
        </div>
      </div>

      {/* Section 3 - Get in touch (replacing Copyright) */}
      <div className="flex-1 max-w-[100px] sm:max-w-[120px] flex justify-end">
        <div className="flex flex-col">
          <div style={{ fontFamily: 'JetBrains Mono, monospace' }} 
               className="text-[10px] sm:text-xs text-gray-400"
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
             className="sm:text-[14px] sm:leading-[17px]"
          >
            rmuth004@ucr.edu
          </a>
        </div>
      </div>
    </footer>
  );
}