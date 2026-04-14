import Navbar from './Navbar';
import './Header.css';

/**
 * Header Component
 * Contains Navbar and optional announcement bar
 */
const Header = () => {
  return (
    <header className="header">
      {/* Optional Announcement Bar */}
      <div className="announcement-bar">
        <p className="announcement-text">
          ✨ New! Submit your requirements in 2 minutes. Get matched with verified tutors instantly! → <a href="/enquiry" className="announcement-link">Start Now</a>
        </p>
      </div>
      
      <Navbar />
    </header>
  );
};

export default Header;
