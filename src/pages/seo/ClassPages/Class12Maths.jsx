import { Helmet } from 'react-helmet-async';
import Button from '@/components/common/Button';
import InquiryForm from '@/components/students/InquiryForm';
import { CLASS_SEO } from '@/config/seoConfig';

const Class12Maths = () => {
  const seo = CLASS_SEO['12'];
  
  return (
    <div className="seo-page">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <script type="application/ld+json">{JSON.stringify(seo.schema)}</script>
      </Helmet>
      
      <div className="page-header">
        <div className="container-custom">
          <h1>Class 12 Maths Home Tuition in South Delhi</h1>
          <p>Board exam & IIT-JEE preparation with expert tutors</p>
        </div>
      </div>
      
      <div className="container-custom section-padding">
        <div className="seo-content">
          <section className="content-section">
            <h2>Class 12 Maths - Board & Competitive Exam Prep</h2>
            <p>
              Class 12 Maths is critical for both board exams and engineering entrance preparation. Our tutors specialize in Calculus, Vectors, 3D Geometry, Probability, and more.
            </p>
            
            <h3>Topics Covered:</h3>
            <ul>
              <li>✓ Relations and Functions</li>
              <li>✓ Calculus (Differentiation & Integration)</li>
              <li>✓ Vectors and 3D Geometry</li>
              <li>✓ Linear Programming</li>
              <li>✓ Probability and Statistics</li>
              <li>✓ IIT-JEE Level Problem Solving</li>
            </ul>
            
            <h3>Why Choose Our Tutors?</h3>
            <ul>
              <li>🎓 Experienced in both CBSE boards and IIT-JEE</li>
              <li>📊 Proven track record of 90%+ results</li>
              <li>🏠 Convenience of home tuition</li>
              <li>✓ Audio introductions available</li>
            </ul>
          </section>
          
          <section className="cta-section">
            <h2>Request a Class 12 Maths Tutor</h2>
            <InquiryForm />
          </section>
          
          <Button to="/enquiry" variant="primary" size="lg" fullWidth>
            Enquire for Maths Tutor
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Class12Maths;
