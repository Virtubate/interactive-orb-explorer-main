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
    <footer className="w-full text-white py-6 px-12 flex justify-between items-center fixed bottom-0 z-50 bg-transparent">
      {/* Section 1 - Local Time - Aligned with "Rahul muthavarapu" */}
      <div className="flex-1 max-w-[200px]">
        <div className="flex flex-col">
          <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            Local Time
          </div>
          <div className="text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            PST {currentTime}
          </div>
        </div>
      </div>

      {/* Section 2 - Social Links */}
      <div className="flex-1 flex justify-start" style={{ marginLeft: '5%' }}>
        <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace', lineHeight: '24px' }}>
          <div>Linkedin</div>
          <div>Github</div>
          <div>Instagram</div>
        </div>
      </div>

      {/* Section 3 - Copyright - Aligned with Menu section */}
      <div className="flex-1 max-w-[120px] flex justify-end">
        <div className="text-left">
          <div 
            className="bebas"
            style={{
              fontSize: '12px',
              lineHeight: '17px',
              letterSpacing: '0.08em',
              color: '#FFFFFF'
            }}
          >
            © 2025 All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
}