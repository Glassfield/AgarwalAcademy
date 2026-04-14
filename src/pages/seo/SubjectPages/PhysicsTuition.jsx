import { Helmet } from 'react-helmet-async';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import InquiryForm from '@/components/students/InquiryForm';
import { SUBJECT_SEO } from '@/config/seoConfig';

const PhysicsTuition = () => {
  const seo = SUBJECT_SEO.physics;
  
  return (
    <div className="seo-page">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
      </Helmet>
      
      <div className="page-header">
        <div className="container-custom">
          <h1>⚛️ Physics Home Tuition in South Delhi</h1>
          <p>Expert tutors for Classes 9, 10, 11, 12 & IIT-JEE</p>
        </div>
      </div>
      
      <div className="container-custom section-padding">
        <div className="seo-content">
          <section className="content-section">
            <h2>Master Physics with Home Tuition</h2>
            <p>
              Physics requires deep conceptual understanding and practice. Our verified tutors bring years of teaching experience to help you excel in board exams and competitive tests like IIT-JEE.
            </p>
            
            <div className="features-grid" style={{ marginTop: '2rem' }}>
              <Card>
                <h3>Class 9-10 Physics</h3>
                <p>Foundation concepts, board exam preparation, practical understanding</p>
              </Card>
              
              <Card>
                <h3>Class 11-12 Physics</h3>
                <p>Advanced topics, Mechanics, Electromagnetism, Modern Physics</p>
              </Card>
              
              <Card>
                <h3>IIT-JEE Physics</h3>
                <p>Problem-solving techniques, JEE Main & Advanced preparation</p>
              </Card>
            </div>
            
            <h3>Topics We Cover:</h3>
            <ul>
              <li>⚡ Mechanics & Motion</li>
              <li>🔋 Electricity & Magnetism</li>
              <li>💡 Optics & Light</li>
              <li>🌡️ Heat & Thermodynamics</li>
              <li>⚛️ Modern Physics</li>
              <li>🔬 Practical & Lab Experiments</li>
            </ul>
          </section>
          
          <section className="cta-section">
            <h2>Find Your Physics Tutor</h2>
            <InquiryForm />
          </section>
          
          <Button to="/enquiry" variant="primary" size="lg" fullWidth>
            Enquire for Physics Tutor
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PhysicsTuition;
