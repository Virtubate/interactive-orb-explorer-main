import React from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

const ServicesHeader: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleProjectsClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/projects', { state: { isInternalNavigation: true } });
  };

  const handleHomeClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/', { state: { isInternalNavigation: true } });
  };

  return (
    <header className="w-full text-white py-6 px-12 flex items-center fixed top-0 z-50 bg-transparent">
      {/* Section 1 - Name (consistent left padding) */}
      <div className="flex-1 max-w-[180px]">
        <Link to="/" onClick={handleHomeClick} className="text-xl font-mono">
          <div className="bebas"
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

      {/* Section 2 - Contact (Hidden in mobile) */}
      <div className="hidden sm:flex flex-col">
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

      {/* Section 3 - Navigation */}
      <div className="flex-1 flex justify-end">
        <nav className="text-center text-xs leading-5 
                        mr-6              // Mobile right margin (24px)
                        sm:mr-24          // Web right margin (96px)
                        " 
             style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          <Link 
            to="/" 
            onClick={handleHomeClick}
            className={`flex items-center ${location.pathname === '/' ? 'text-white' : 'text-gray-500 hover:text-white'}`}
          >
            Home
            <span className={`inline-block ml-1 text-orange-500 ${location.pathname === '/' ? 'opacity-100' : 'opacity-0'}`}>:</span>
          </Link>
          <Link 
            to="/projects" 
            onClick={handleProjectsClick}
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

export default ServicesHeader; 