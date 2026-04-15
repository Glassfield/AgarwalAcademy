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
          🎓 Providing Home Tutors Since 2004 → <a href="/enquiry" className="announcement-link">Enquire Now</a>
        </p>
      </div>
      
      <Navbar />
    </header>
  );
};

export default Header;
