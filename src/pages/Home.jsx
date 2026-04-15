import { useState, useEffect } from 'react';
import SEO from '@/components/common/SEO';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import { DEFAULT_SEO } from '@/config/seoConfig';
import { organizationSchema, localBusinessSchema, serviceSchema } from '@/config/structuredData';
import { getAllOptions } from '@/services/api/optionsService';
import './Home.css';

/**
 * Home Page Component
 * Landing page with hero, features, how it works, and CTAs
 */
const SUBJECT_EMOJI = {
  'Mathematics': '📐', 'Maths': '📐',
  'Physics': '⚛️',
  'Chemistry': '🧪',
  'Biology': '🧬',
  'English': '📚',
  'Hindi': '🇮🇳',
  'Sanskrit': '📜',
  'Social Science': '🌍', 'SST': '🌍', 'EVS': '🌿',
  'Computer Science': '💻', 'Computer': '💻',
  'French': '🇫🇷',
  'Spanish': '🇪🇸',
  'German': '🇩🇪',
  'Accountancy': '📊', 'Accounts': '📊',
  'Economics': '📈',
  'Business Studies': '💼',
  'History': '🏛️',
  'Geography': '🗺️',
  'Political Science': '⚖️',
  'Psychology': '🧠',
  'Sociology': '👥',
  'Science': '🔬',
  'Spoken English': '🗣️',
  'IT': '🖥️',
};
const getEmoji = (label) => {
  for (const [key, emoji] of Object.entries(SUBJECT_EMOJI)) {
    if (label.toLowerCase().includes(key.toLowerCase())) return emoji;
  }
  return '📖';
};

const Home = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    getAllOptions()
      .then(result => { if (result.success) setSubjects(result.data.subjects || []); })
      .catch(() => {}); // silently fall back to empty — no subjects shown if API fails
  }, []);

  // Combine multiple schemas
  const structuredData = [
    organizationSchema,
    localBusinessSchema,
    serviceSchema
  ];

  return (
    <div className="home-page">
      <SEO
        title={DEFAULT_SEO.title}
        description={DEFAULT_SEO.description}
        keywords={DEFAULT_SEO.keywords}
        canonicalUrl="https://agarwalacademy.in/"
        ogImage="/images/Modern logo.png"
        structuredData={structuredData}
      />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container-custom">
          <div className="hero-content">
            <h1 className="hero-title">
              Expert Home Tutors in <span className="highlight">South Delhi</span>
            </h1>
            <p className="hero-subtitle">
              Verified, experienced tutors for Classes 1-12. CBSE, ICSE, IIT-JEE preparation at your doorstep.
            </p>
            <div className="hero-cta">
              <Button to="/enquiry" variant="primary" size="lg">
                Enquire Now
              </Button>
              <Button to="/enquiry" variant="outline" size="lg">
                Request a Tutor
              </Button>
              <Button to="/tutor-registration" variant="outline" size="lg">
                Register as Tutor
              </Button>
            </div>
            <p className="hero-trust">
              ✓ 100% Verified Tutors &nbsp; | &nbsp; ✓ Privacy Guaranteed &nbsp; | &nbsp; ✓ Trusted by 25000+ Families
            </p>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="features-section section-padding">
        <div className="container-custom">
          <h2 className="section-title">Why Choose Agarwal Academy?</h2>
          <p className="section-subtitle">
            We make finding the perfect tutor simple, safe, and effective
          </p>
          
          <div className="features-grid">
            <Card className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Privacy First</h3>
              <p>Tutor identities protected. Only admin-verified information shared.</p>
            </Card>
            
            <Card className="feature-card">
              <div className="feature-icon">✓</div>
              <h3>100% Verified</h3>
              <p>All tutors undergo KYC verification with Aadhaar, PAN, and police checks.</p>
            </Card>
            
            <Card className="feature-card">
              <div className="feature-icon">🏠</div>
              <h3>At Your Home</h3>
              <p>All classes conducted at your home. No coaching center visits required.</p>
            </Card>
            
            <Card className="feature-card">
              <div className="feature-icon">📍</div>
              <h3>Local Tutors</h3>
              <p>Find tutors in your South Delhi locality. Hauz Khas, GK, Saket, and more.</p>
            </Card>
            
            <Card className="feature-card">
              <div className="feature-icon">🎤</div>
              <h3>Audio Introduction</h3>
              <p>Listen to tutor's teaching style before making a decision.</p>
            </Card>
            
            <Card className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Quick Matching</h3>
              <p>Get matched with suitable tutors within 24 hours of your inquiry.</p>
            </Card>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="how-it-works-section section-padding bg-light">
        <div className="container-custom">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Simple 3-step process to connect with your ideal tutor
          </p>
          
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Tell Us Your Needs</h3>
              <p>Share your class, subjects, locality, and preferences through our simple form.</p>
            </div>
            
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Browse & Listen</h3>
              <p>View matched tutors, listen to their audio introductions, and check their profiles.</p>
            </div>
            
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Start Learning</h3>
              <p>We connect you with your chosen tutor. Classes begin at your home!</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Subjects Covered */}
      <section className="subjects-section section-padding">
        <div className="container-custom">
          <h2 className="section-title">Subjects We Cover</h2>
          <div className="subjects-grid">
            {subjects.length > 0
              ? subjects.map(s => (
                  <div key={s.id} className="subject-badge">
                    {getEmoji(s.label)} {s.label}
                  </div>
                ))
              : /* fallback while loading or if API is unavailable */
                ['Mathematics','Physics','Chemistry','Biology','English','Hindi','Social Science','Computer Science','French','German']
                  .map(name => (
                    <div key={name} className="subject-badge">{getEmoji(name)} {name}</div>
                  ))
            }
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="cta-section section-padding">
        <div className="container-custom">
          <div className="cta-content">
            <h2>Ready to Excel in Your Studies?</h2>
            <p>Join 25000+ students who found their perfect tutor with us</p>
            <Button to="/enquiry" variant="accent" size="lg">
              Request a Tutor
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
