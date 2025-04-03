import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const location = useLocation();
  
  return (
    <header className="w-full text-white py-6 px-12 flex items-center fixed top-0 z-50 bg-transparent">
      {/* Section 1 - Name */}
      <div className="flex-1 max-w-[180px]">
        <Link to="/" className="text-xl font-mono">
          <div 
            className="bebas"
            style={{
              fontSize: '16px',
              lineHeight: '19px',
              letterSpacing: '0.08em',
              color: 'white',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
              filter: 'brightness(1.2)'
            }}
          >
            <div style={{ fontSize: '40px', marginBottom: '1px' }}>RAHUL</div>
            <div>MUTHAVARAPU</div>
          </div>
        </Link>
      </div>

      {/* Mobile Navigation (< 640px) - Using Projects page structure */}
      <div className="flex-1 flex justify-end sm:hidden">
        <nav className="text-center text-xs leading-5 mr-6" 
             style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          <Link 
            to="/" 
            className={`flex items-center ${location.pathname === '/' ? 'text-white' : 'text-gray-500 hover:text-white'}`}
          >
            Home
            <span className={`inline-block ml-1 text-orange-500 ${location.pathname === '/' ? 'opacity-100' : 'opacity-0'}`}>:</span>
          </Link>
          <Link 
            to="/projects"
            className={`flex items-center mt-1 ${location.pathname === '/projects' ? 'text-white' : 'text-gray-500 hover:text-white'}`}
          >
            Projects
            <span className={`inline-block ml-1 text-orange-500 ${location.pathname === '/projects' ? 'opacity-100' : 'opacity-0'}`}>:</span>
          </Link>
          <Link 
            to="/services"
            className={`flex items-center mt-1 ${location.pathname === '/services' ? 'text-white' : 'text-gray-500 hover:text-white'}`}
          >
            Services
            <span className={`inline-block ml-1 text-orange-500 ${location.pathname === '/services' ? 'opacity-100' : 'opacity-0'}`}>:</span>
          </Link>
        </nav>
      </div>

      {/* Web View Content (≥ 640px) - Original structure */}
      <div className="hidden sm:flex flex-1 max-w-[200px] justify-center items-start">
        <div className="flex flex-col">
          <div style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-xs text-gray-400">
            Get in touch
          </div>
          <a href="mailto:rmuth004@ucr.edu" style={{
            WebkitFontSmoothing: 'antialiased',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '14px',
            lineHeight: '17px',
            letterSpacing: '0.08em',
            color: 'white',
            textDecoration: 'underline',
            textTransform: 'lowercase'
          }}>
            rmuth004@ucr.edu
          </a>
        </div>
      </div>

      <div className="hidden sm:flex flex-1 justify-end items-start gap-16 mr-24">
        {/* Skills Section */}
        <div className="text-xs leading-5" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          <div className="text-white">Product Strategy</div>
          <div className="text-white">AI Automation, Data Analytics,</div>
          <div className="text-gray-400">UX Design, Python, n8n, Figma</div>
          <div className="text-gray-400">Tableau, Prompting</div>
        </div>

        {/* Web Navigation */}
        <nav className="text-center text-xs leading-5" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          <Link 
            to="/" 
            className={`flex items-center ${location.pathname === '/' ? 'text-white' : 'text-gray-500 hover:text-white'}`}
          >
            Home
            <span className={`inline-block ml-1 text-orange-500 ${location.pathname === '/' ? 'opacity-100' : 'opacity-0'}`}>:</span>
          </Link>
          <Link 
            to="/projects"
            className={`flex items-center mt-1 ${location.pathname === '/projects' ? 'text-white' : 'text-gray-500 hover:text-white'}`}
          >
            Projects
            <span className={`inline-block ml-1 text-orange-500 ${location.pathname === '/projects' ? 'opacity-100' : 'opacity-0'}`}>:</span>
          </Link>
          <Link 
            to="/services"
            className={`flex items-center mt-1 ${location.pathname === '/services' ? 'text-white' : 'text-gray-500 hover:text-white'}`}
          >
            Services
            <span className={`inline-block ml-1 text-orange-500 ${location.pathname === '/services' ? 'opacity-100' : 'opacity-0'}`}>:</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;