import SEO from '@/components/common/SEO';
import Button from '@/components/common/Button';
import InquiryForm from '@/components/students/InquiryForm';
import { SUBJECT_SEO } from '@/config/seoConfig';
import { subjectServiceSchema, breadcrumbSchema, faqSchema } from '@/config/structuredData';

const MathsTuition = () => {
  const seo = SUBJECT_SEO.maths;
  
  // Breadcrumb structured data
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://agarwalacademy.in/' },
    { name: 'Maths Tuition', url: 'https://agarwalacademy.in/maths-tuition' }
  ]);
  
  // Subject service schema
  const serviceData = subjectServiceSchema(
    'Mathematics',
    'Expert Maths home tuition for Classes 1-12, CBSE, ICSE, IIT-JEE preparation in South Delhi'
  );
  
  // FAQ schema
  const faqs = faqSchema([
    {
      question: 'What classes do you offer Maths tuition for?',
      answer: 'We provide Maths tuition for Classes 1-12, including CBSE, ICSE, and IIT-JEE preparation.'
    },
    {
      question: 'Are the Maths tutors experienced?',
      answer: 'Yes, all our tutors are verified, experienced, and trained in modern teaching methods.'
    },
    {
      question: 'Do you provide home tuition in South Delhi?',
      answer: 'Yes, we provide home tuition across all areas of South Delhi including Greater Kailash, Hauz Khas, Saket, and more.'
    }
  ]);
  
  const structuredData = [breadcrumbs, serviceData, faqs];
  
  return (
    <div className="seo-page">
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl="https://agarwalacademy.in/maths-tuition"
        structuredData={structuredData}
      />
      
      <div className="page-header">
        <div className="container-custom">
          <h1>🔢 Maths Home Tuition in South Delhi</h1>
          <p>Expert Mathematics tutors for all classes & competitive exams</p>
        </div>
      </div>
      
      <div className="container-custom section-padding">
        <div className="seo-content">
          <section className="content-section">
            <h2>Excellence in Mathematics Education</h2>
            <p>
              Mathematics is the foundation of logical thinking and problem-solving. Our experienced home tutors make Maths easy, interesting, and relevant for students from Class 1 to Class 12.
            </p>
            
            <h3>Classes Covered:</h3>
            <ul>
              <li>📚 Class 1-5: Basic Arithmetic, Mental Maths</li>
              <li>📐 Class 6-8: Algebra, Geometry, Fractions</li>
              <li>🔢 Class 9-10: Advanced Algebra, Trigonometry, Mensuration</li>
              <li>📊 Class 11-12: Calculus, Vectors, Probability, Statistics</li>
              <li>🎯 IIT-JEE: Advanced Problem Solving</li>
            </ul>
            
            <h3>Why Our Maths Tutors Stand Out:</h3>
            <ul>
              <li>✓ Proven methods to simplify complex concepts</li>
              <li>✓ Focus on both board exams and competitive tests</li>
              <li>✓ Regular practice tests and doubt clearing</li>
              <li>✓ Experience with CBSE, ICSE, IB curricula</li>
            </ul>
          </section>
          
          <section className="cta-section">
            <h2>Request a Maths Tutor Today</h2>
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

export default MathsTuition;
