import React from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

const ProjectsHeader: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleServicesClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/services', { state: { isInternalNavigation: true } });
  };

  const handleHomeClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/', { state: { isInternalNavigation: true } });
  };

  return (
    <header className="w-full text-white py-6 px-12 flex items-center bg-transparent">
      {/* Section 1 - Name */}
      <div className="flex-1 max-w-[180px]">
        <Link to="/" onClick={handleHomeClick} className="text-xl font-mono">
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

      {/* Section 2 - Navigation */}
      <div className="flex-1 flex justify-end mr-24">
        <nav className="text-center text-xs leading-5" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
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
            className={`flex items-center mt-1 ${location.pathname === '/projects' ? 'text-white' : 'text-gray-500 hover:text-white'}`}
          >
            Projects
            <span className={`inline-block ml-1 text-orange-500 ${location.pathname === '/projects' ? 'opacity-100' : 'opacity-0'}`}>:</span>
          </Link>
          <Link
            to="/services"
            onClick={handleServicesClick}
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

export default ProjectsHeader; 