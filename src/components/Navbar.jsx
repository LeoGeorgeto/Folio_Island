import { NavLink, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

const Navbar = ({ sceneLoaded }) => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isTouched, setIsTouched] = useState(false);

    useEffect(() => {
      setIsMenuOpen(false);
    }, [location.pathname]);

    if (!sceneLoaded && location.pathname === '/') return null;
    
    const commonButtonClasses = `nav-animated-btn min-w-[120px] h-[55px] px-4 py-4 rounded-lg flex items-center justify-center font-bold btn-front ${
      location.pathname === '/' ? 'hover:animate-none active:animate-none md:hover:animate-initial' : ''
    }`;
    return (
      <header className="header animate-fadeIn relative">
          <div className="block-container min-w-[140px]">
            <NavLink to="/" className={commonButtonClasses} onTouchStart={() => setIsTouched(true)}
              onTouchEnd={() => setIsTouched(false)}
              onClick={() => isMenuOpen && setIsMenuOpen(false)}
            >
              {({ isActive }) => (
                  <p className={`${isActive ? 'info-btn-animated_text' : 'blue-gradient_text'} ${
                    isTouched && location.pathname === '/' ? 'animate-buttonPress' : ''
                  }`}>
                      Folio Island
                  </p>
              )}
            </NavLink>
            <div className="btn-back sunset-gradient_text"></div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex text-lg gap-4 sm:gap-7 font-medium">
              <div className="block-container reverse-motion min-w-[140px]">
                <NavLink to="/about" className={commonButtonClasses}>
                    {({ isActive }) => (
                        <span className={isActive ? 'info-btn-animated_text' : 'blue-gradient_text'}>
                            About
                        </span>
                    )}
                </NavLink>
                <div className="btn-back sunset-gradient_text"></div>
              </div>
              <div className="block-container reverse-motion min-w-[140px]">
                <NavLink to="/projects" className={commonButtonClasses}>
                    {({ isActive }) => (
                        <span className={isActive ? 'info-btn-animated_text' : 'blue-gradient_text'}>
                            Projects
                        </span>
                    )}
                </NavLink>
                <div className="btn-back sunset-gradient_text"></div>
              </div>
          </nav>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden absolute top-full left-0 right-10 -my-9 z-50">
              <div className="flex flex-col items-end gap-10 px-6"> 
                <div className="block-container reverse-motion min-w-[140px] z-10"> 
                  <NavLink 
                    to="/about" 
                    className={commonButtonClasses}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {({ isActive }) => (
                      <span className={isActive ? 'info-btn-animated_text' : 'blue-gradient_text'}>
                        About
                      </span>
                    )}
                  </NavLink>
                  <div className="btn-back sunset-gradient_text"></div>
                </div>
                <div className="block-container reverse-motion min-w-[140px]">
                  <NavLink 
                    to="/projects" 
                    className={commonButtonClasses}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {({ isActive }) => (
                      <span className={isActive ? 'info-btn-animated_text' : 'blue-gradient_text'}>
                        Projects
                      </span>
                    )}
                  </NavLink>
                  <div className="btn-back sunset-gradient_text"></div>
                </div>
              </div>
            </nav>
          )}
      </header>
    )
}

export default Navbar