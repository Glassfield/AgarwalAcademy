import { Helmet } from 'react-helmet-async';
import Button from '@/components/common/Button';
import LocalitySearch from '@/components/students/LocalitySearch';
import InquiryForm from '@/components/students/InquiryForm';
import { LOCATION_SEO, generateFAQSchema, COMMON_FAQS } from '@/config/seoConfig';

const SouthDelhiTutors = () => {
  const seo = LOCATION_SEO['south-delhi'];
  const faqSchema = generateFAQSchema(COMMON_FAQS);
  
  return (
    <div className="seo-page">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      
      <div className="page-header">
        <div className="container-custom">
          <h1>📍 Home Tuition in South Delhi</h1>
          <p>Find verified tutors in your locality - Greater Kailash, Hauz Khas, Saket & more</p>
        </div>
      </div>
      
      <div className="container-custom section-padding">
        <div className="seo-content">
          <section className="content-section">
            <h2>Expert Home Tutors Across South Delhi</h2>
            <p>
              Agarwal Academy connects students with verified, experienced tutors in all major South Delhi localities. Whether you're in Greater Kailash, Hauz Khas, Saket, Vasant Kunj, or Defence Colony, we have local tutors ready to teach at your home.
            </p>
            
            <h3>Popular Localities We Serve:</h3>
            <div className="localities-grid">
              {seo.areas.map(area => (
                <div key={area} className="locality-badge">{area}</div>
              ))}
            </div>
            
            <h3>All Subjects & Classes Covered:</h3>
            <ul>
              <li>📚 All subjects: Maths, Physics, Chemistry, Biology, English, Hindi</li>
              <li>🎓 Classes 1 to 12 (CBSE, ICSE, State Boards)</li>
              <li>🏆 Competitive exam prep: IIT-JEE, NEET</li>
              <li>🌍 International curricula: IB, IGCSE</li>
            </ul>
          </section>
          
          <section className="search-section">
            <h2>Tutors in Your Area</h2>
            <LocalitySearch />
          </section>
          
          <section className="faq-section">
            <h2>Frequently Asked Questions</h2>
            {COMMON_FAQS.map((faq, index) => (
              <div key={index} className="faq-item">
                <h4>{faq.question}</h4>
                <p>{faq.answer}</p>
              </div>
            ))}
          </section>
          
          <section className="cta-section">
            <h2>Request a Tutor in South Delhi</h2>
            <InquiryForm />
          </section>
          
          <Button to="/enquiry" variant="primary" size="lg" fullWidth>
            Enquire Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SouthDelhiTutors;
