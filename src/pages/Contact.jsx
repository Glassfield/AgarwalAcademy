import { Helmet } from 'react-helmet-async';
import InquiryForm from '@/components/students/InquiryForm';
import { CONTACT_INFO } from '@/config/constants';
import './Contact.css';

const Contact = () => {
  const handleInquiry = async (data) => {
    // API call to submit inquiry
    console.log('Contact inquiry:', data);
  };
  
  return (
    <div className="contact-page">
      <Helmet>
        <title>Contact Us | Agarwal Academy</title>
        <meta name="description" content="Contact Agarwal Academy for home tuition inquiries in South Delhi. Get in touch via phone, email, or our inquiry form." />
      </Helmet>
      
      <div className="page-header">
        <div className="container-custom">
          <h1>Contact Us – Agarwal Academy</h1>
          <p>We're here to help you find the right home tutor for your academic needs</p>
        </div>
      </div>
      
      <div className="container-custom section-padding">
        <div className="contact-grid">
          <div className="contact-info-section">
            <h2>Get in Touch</h2>
            <p style={{ marginBottom: '1.5rem', color: '#6b7280' }}>
              Whether you are a student, parent, or tutor, feel free to reach out to us using the contact details below.
            </p>
            
            <div className="contact-details">
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <div>
                  <h4>Call Us</h4>
                  <p>For quick assistance and enquiries:</p>
                  <a href={`tel:${CONTACT_INFO.phone1}`} style={{ display: 'block', marginBottom: '0.25rem' }}>{CONTACT_INFO.phone1}</a>
                  <a href={`tel:${CONTACT_INFO.phone2}`} style={{ display: 'block' }}>{CONTACT_INFO.phone2}</a>
                </div>
              </div>
              
              <div className="contact-item">
                <span className="contact-icon">📅</span>
                <div>
                  <h4>Availability</h4>
                  <p>{CONTACT_INFO.timings}</p>
                </div>
              </div>
              
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <div>
                  <h4>Email</h4>
                  <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
                </div>
              </div>
              
              <div className="contact-item">
                <span className="contact-icon">🏢</span>
                <div>
                  <h4>Office Address</h4>
                  <p style={{ lineHeight: '1.6' }}>
                    Agarwal Academy<br />
                    {CONTACT_INFO.address}
                  </p>
                </div>
              </div>

              <div className="contact-item">
                <span className="contact-icon">📩</span>
                <div>
                  <h4>Looking For</h4>
                  <ul style={{ margin: '0.5rem 0', paddingLeft: '1.25rem', lineHeight: '1.8' }}>
                    <li>Home tuition for Classes 1 to 12</li>
                    <li>CBSE, ICSE, or State Board tutors</li>
                    <li>IIT-JEE / NEET home coaching</li>
                    <li>Tutor registration with Agarwal Academy</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-form-section">
            <InquiryForm onSubmit={handleInquiry} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
