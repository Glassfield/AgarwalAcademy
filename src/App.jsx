import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ScrollToTop from '@/components/common/ScrollToTop';
import WhatsAppButton from '@/components/common/WhatsAppButton';

// Pages
import Home from '@/pages/Home';
import TutorRegistration from '@/pages/TutorRegistration';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import EnquiryForm from '@/components/students/EnquiryForm';

// Admin Pages
import AdminLogin from '@/pages/Admin/AdminLogin';
import AdminDashboard from '@/pages/Admin/AdminDashboard';

// SEO Pages
import Class10Physics from '@/pages/seo/ClassPages/Class10Physics';
import Class12Maths from '@/pages/seo/ClassPages/Class12Maths';
import PhysicsTuition from '@/pages/seo/SubjectPages/PhysicsTuition';
import MathsTuition from '@/pages/seo/SubjectPages/MathsTuition';
import SouthDelhiTutors from '@/pages/seo/LocationPages/SouthDelhiTutors';
import KeywordPageRouter from '@/pages/seo/KeywordPages/KeywordPageRouter';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Admin Routes (no header/footer) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        
        {/* Public Routes (with header/footer) */}
        <Route path="*" element={<PublicLayout />} />
      </Routes>
    </AuthProvider>
  );
}

// Public Layout with Header/Footer
const PublicLayout = () => (
  <div className="app">
    <ScrollToTop />
    <Header />
    <main className="main-content">
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/find-tutors" element={<Navigate to="/enquiry" replace />} />
        <Route path="/tutor-registration" element={<TutorRegistration />} />
        <Route path="/enquiry" element={<EnquiryForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* SEO Pages - Class-wise */}
        <Route path="/class-10-physics-tuition" element={<Class10Physics />} />
        <Route path="/class-12-maths-tuition" element={<Class12Maths />} />
        {/* SEO Pages - Subject-wise */}
        <Route path="/physics-tuition" element={<PhysicsTuition />} />
        <Route path="/maths-tuition" element={<MathsTuition />} />
        {/* SEO Pages - Location-wise */}
        <Route path="/home-tuition-south-delhi" element={<SouthDelhiTutors />} />
        {/* Dynamic Topic Pages (user-friendly URLs) */}
        <Route path="/:slug" element={<KeywordPageRouter />} />
        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <Footer />
    <WhatsAppButton />
  </div>
);

// Simple 404 component
const NotFound = () => (
  <div className="container-custom section-padding text-center">
    <h1>404 - Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
    <a href="/" className="btn btn-primary">Go Home</a>
  </div>
);

export default App;
