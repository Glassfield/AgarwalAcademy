import { Helmet } from 'react-helmet-async';
import Card from '@/components/common/Card';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <Helmet>
        <title>About Us | Agarwal Academy</title>
        <meta name="description" content="Learn about Agarwal Academy - South Delhi's trusted home tuition platform. Privacy-first, verified tutors for Classes 1-12." />
      </Helmet>
      
      <div className="page-header">
        <div className="container-custom">
          <h1>About Agarwal Academy</h1>
          <p>Trusted Home Tuition in South Delhi Since 2004</p>
        </div>
      </div>
      
      <div className="container-custom section-padding">
        <div className="about-content">
          <Card padding="lg">
            <h2>About Agarwal Academy – Trusted Home Tuition in South Delhi Since 2004</h2>
            <p>
              Agarwal Academy is a leading provider of home tuition services in South Delhi, established in 2004 with a mission to deliver quality education through experienced home tutors. With over 20 years of experience, we have helped thousands of students improve their academic performance through personalized one-to-one tutoring at home.
            </p>
            <p>
              We understand that every student learns differently. That is why we focus on customized teaching methods, individual attention, and result-oriented learning.
            </p>
            
            <h3>Home Tutors for Classes 1 to 12 – All Boards</h3>
            <p>Agarwal Academy offers qualified and verified home tutors for:</p>
            <ul>
              <li>Classes 1 to 12</li>
              <li>CBSE, ICSE, and State Boards</li>
              <li>Subjects including Mathematics, Physics, Chemistry, Biology, Accounts, Economics, English, and more</li>
            </ul>
            <p>
              Our home tutors are selected based on subject expertise, teaching experience, and location convenience to ensure the best learning experience for students and parents.
            </p>

            <h3>Competitive Exam Coaching at Home</h3>
            <p>In addition to school academics, we provide personalized home coaching for competitive exams such as:</p>
            <ul>
              <li>IIT-JEE</li>
              <li>NEET / PMT</li>
            </ul>
            <p>
              Our experienced tutors focus on concept clarity, problem-solving skills, exam strategy, and regular assessments, helping students prepare effectively from the comfort of their homes.
            </p>

            <h3>Why Choose Agarwal Academy for Home Tuition?</h3>
            <ul>
              <li>✔ Trusted home tuition provider in South Delhi since 2004</li>
              <li>✔ Experienced and background-verified home tutors</li>
              <li>✔ One-to-one personalized teaching</li>
              <li>✔ Tutors available for all classes and subjects</li>
              <li>✔ Proven track record of excellent academic results</li>
              <li>✔ Student-centric and parent-friendly approach</li>
            </ul>

            <h3>Our Tutor Matching Process</h3>
            <p>
              We act as a reliable platform connecting students with independent home tutors. Based on the student's class, subject requirements, location, and learning needs, we assign the most suitable tutor. This structured matching process ensures effective learning and long-term academic success.
            </p>

            <h3>Our Commitment to Quality Education</h3>
            <p>
              At Agarwal Academy, our success is built on trust, consistency, and results. We are committed to providing the best home tutors in South Delhi, helping students build strong academic foundations and achieve their educational goals with confidence.
            </p>

            <h3>Looking for a Home Tutor in South Delhi?</h3>
            <p>
              Contact Agarwal Academy today to find the right tutor for your child and experience the difference of personalized home tuition.
            </p>
            <div style={{ margin: '2rem 0', textAlign: 'center' }}>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/8A6wf7M7NjM?autoplay=0&start=0&rel=0&enablejsapi=1"
                title="Agarwal Academy Introduction"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                style={{ maxWidth: '100%' }}
              ></iframe>
              <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
                Introduction to Agarwal Academy
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
