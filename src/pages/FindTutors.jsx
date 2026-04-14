import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Button from '@/components/common/Button';
import TutorFilter from '@/components/tutors/TutorFilter';
import TutorList from '@/components/tutors/TutorList';
import { getApprovedTutors } from '@/services/api/tutorService';
import './FindTutors.css';

/**
 * Find Tutors Page
 * Browse and filter available tutors
 */
const FindTutors = () => {
  const [filters, setFilters] = useState({});
  const [tutors, setTutors] = useState([]);
  const [allTutors, setAllTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadTutors();
  }, []);
  
  const loadTutors = async () => {
    try {
      const result = await getApprovedTutors();
      if (result.success) {
        setAllTutors(result.data);
        setTutors(result.data);
      } else {
        setAllTutors([]);
        setTutors([]);
      }
    } catch (error) {
      console.error('Error loading tutors:', error);
      setAllTutors([]);
      setTutors([]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    
    // Filter tutors based on criteria
    const filteredTutors = allTutors.filter(tutor => {
      if (newFilters.subject && Array.isArray(tutor.subjects)) {
        if (!tutor.subjects.some(s => s.toLowerCase().includes(newFilters.subject.toLowerCase()))) {
          return false;
        }
        }
        if (newFilters.class && Array.isArray(tutor.classes)) {
          if (!tutor.classes.includes(newFilters.class)) {
            return false;
          }
        }
        if (newFilters.locality && Array.isArray(tutor.areas)) {
          if (!tutor.areas.some(a => a.toLowerCase().includes(newFilters.locality.toLowerCase()))) {
            return false;
          }
        }
        return true;
      });
      
      setTutors(filteredTutors);
  };
  
  return (
    <div className="find-tutors-page">
      <Helmet>
        <title>Find Tutors in South Delhi | Agarwal Academy</title>
        <meta name="description" content="Browse verified home tutors in South Delhi. Filter by subject, class, locality. Listen to audio introductions and request your perfect tutor." />
      </Helmet>
      
      <div className="page-header">
        <div className="container-custom">
          <h1>Find Your Perfect Tutor</h1>
          <p>Browse verified tutors, listen to their introductions, and make an informed choice</p>
          <div className="header-cta">
            <Button to="/enquiry" variant="primary" size="lg">
              📝 Request a Tutor - Quick Enquiry Form
            </Button>
            <p className="cta-note">Get matched with verified tutors in 24 hours</p>
          </div>
        </div>
      </div>
      
      <div className="container-custom section-padding">
        <TutorFilter onFilterChange={handleFilterChange} />
        <TutorList tutors={tutors} loading={loading} />
      </div>
    </div>
  );
};

export default FindTutors;
