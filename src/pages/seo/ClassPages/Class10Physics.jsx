import { Helmet } from 'react-helmet-async';
import Button from '@/components/common/Button';
import InquiryForm from '@/components/students/InquiryForm';
import { CLASS_SEO, generateBreadcrumb } from '@/config/seoConfig';

const Class10Physics = () => {
  const seo = CLASS_SEO['10'];
  
  const breadcrumb = generateBreadcrumb([
    { name: 'Home', url: 'https://agarwalacademy.in/' },
    { name: 'Class 10 Physics Tuition', url: 'https://agarwalacademy.in/class-10-physics-tuition' }
  ]);
  
  return (
    <div className="seo-page">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <script type="application/ld+json">{JSON.stringify(seo.schema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      </Helmet>
      
      <div className="page-header">
        <div className="container-custom">
          <h1>Class 10 Physics Home Tuition in South Delhi</h1>
          <p>Expert Physics tutors for CBSE & ICSE board preparation</p>
        </div>
      </div>
      
      <div className="container-custom section-padding">
        <div className="seo-content">
          <section className="content-section">
            <h2>Why Class 10 Physics Home Tuition?</h2>
            <p>
              Class 10 Physics is a crucial subject for board exams and future science streams. Our home tutors provide personalized attention to help students understand concepts like Electricity, Magnetism, Optics, and more.
            </p>
            
            <h3>What We Cover:</h3>
            <ul>
              <li>✓ Light - Reflection and Refraction</li>
              <li>✓ Human Eye and Colorful World</li>
              <li>✓ Electricity and Magnetic Effects</li>
              <li>✓ Sources of Energy</li>
              <li>✓ Practical and Lab Work</li>
            </ul>
            
            <h3>Benefits of Home Tuition:</h3>
            <ul>
              <li>🏠 One-on-one attention at your home</li>
              <li>📚 Customized learning pace</li>
              <li>🎯 Focused board exam preparation</li>
              <li>✓ Verified and experienced tutors</li>
            </ul>
          </section>
          
          <section className="cta-section">
            <h2>Request a Class 10 Physics Tutor</h2>
            <InquiryForm />
          </section>
          
          <section className="tutor-cta">
            <h3>Browse All Physics Tutors</h3>
            <Button to="/enquiry" variant="primary" size="lg">
              Enquire Now
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Class10Physics;
