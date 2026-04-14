import { Link } from 'react-router-dom';
import './Footer.css';

/**
 * Footer Component
 * Contains links, contact info, and copyright
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Footer Grid */}
        <div className="footer-grid">
          {/* About Section */}
          <div className="footer-section">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                background: 'linear-gradient(135deg, #ff9933 0%, #ff6b35 100%)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <img 
                  src="/images/Modern logo.png" 
                  alt="Agarwal Academy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '10px'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div style="font-size: 1.25rem;">🕉️</div>';
                  }}
                />
              </div>
              <h3 className="footer-heading" style={{ margin: 0 }}>Agarwal Academy</h3>
            </div>
            <p className="footer-text">
              Premier home tuition services in South Delhi. Connecting students with verified, experienced tutors for Classes 1-12, CBSE, ICSE, and competitive exam preparation.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-subheading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/enquiry">Enquire Now</Link></li>
              <li><Link to="/tutor-registration">Become a Tutor</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          {/* Popular Subjects */}
          <div className="footer-section">
            <h4 className="footer-subheading">Popular Subjects</h4>
            <ul className="footer-links">
              <li><Link to="/enquiry?subject=Physics">Physics Tuition</Link></li>
              <li><Link to="/enquiry?subject=Chemistry">Chemistry Tuition</Link></li>
              <li><Link to="/enquiry?subject=Mathematics">Maths Tuition</Link></li>
              <li><Link to="/enquiry?subject=Biology">Biology Tuition</Link></li>
              <li><Link to="/enquiry?subject=English">English Tuition</Link></li>
            </ul>
          </div>
          
          {/* Popular Topics */}
          <div className="footer-section">
            <h4 className="footer-subheading">Popular Topics</h4>
            <ul className="footer-links">
              <li><Link to="/1-on-1-online-tuition">1-on-1 Online Tuition</Link></li>
              <li><Link to="/10th-class-maths-tuition">10th Class Maths Tuition</Link></li>
              <li><Link to="/best-online-math-tutor">Best Online Math Tutor</Link></li>
              <li><Link to="/best-ielts-tutor">Best IELTS Tutor</Link></li>
              <li><Link to="/best-home-tutor-in-delhi">Best Home Tutor in Delhi</Link></li>
              <li><Link to="/best-english-speaking-tutor">Best English Speaking Tutor</Link></li>
              <li><Link to="/best-maths-tutor-in-gurgaon">Best Maths Tutor in Gurgaon</Link></li>
              <li><Link to="/best-tuition-centre-near-me">Best Tuition Centre Near Me</Link></li>
              <li><Link to="/best-tutor-for-math">Best Tutor for Math</Link></li>
              <li><Link to="/bsc-maths-tuition-near-me">BSc Maths Tuition Near Me</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="footer-subheading">Contact Us</h4>
            <ul className="footer-contact">
              <li>
                <span className="contact-icon">📞</span>
                <a href="tel:9958334586">9958334586</a>
              </li>
              <li>
                <span className="contact-icon">✉️</span>
                <a href="mailto:agarwalacademy29@gmail.com">agarwalacademy29@gmail.com</a>
              </li>
              <li>
                <span className="contact-icon">📍</span>
                <span>Noida, Uttar Pradesh</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Agarwal Academy. All rights reserved. | Home Tuition Experts, South Delhi, India
          </p>
          <div className="footer-legal">
            <Link to="/privacy">Privacy Policy</Link>
            <span className="separator">•</span>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
