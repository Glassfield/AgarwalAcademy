import { Link } from 'react-router-dom';
import Button from './Button';
import './Navbar.css';

/**
 * Responsive Navbar Component
 * Simple header with logo and CTA
 */
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">
            <img 
              src="/images/Modern logo.png" 
              alt="Agarwal Academy"
              className="logo-image"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<div style="font-size: 1.5rem;">🕉️</div>';
              }}
            />
          </div>
          <div className="logo-content">
            <span className="logo-text">Agarwal Academy</span>
            <span className="logo-tagline">ज्ञान की देवी के आशीर्वाद से</span>
          </div>
        </Link>
        
        {/* CTA Button */}
        <div className="navbar-cta">
          <Button to="/enquiry" variant="primary" size="md">
            Request a Tutor
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
