import PropTypes from 'prop-types';
import TutorCard from './TutorCard';
import './TutorList.css';

/**
 * Tutor List Component
 * Displays grid of tutor cards with loading and empty states
 */
const TutorList = ({ tutors, loading = false }) => {
  if (loading) {
    return (
      <div className="tutor-list-loading">
        <div className="spinner-large"></div>
        <p>Finding the best tutors for you...</p>
      </div>
    );
  }
  
  if (!tutors || tutors.length === 0) {
    return (
      <div className="tutor-list-empty">
        <div className="empty-icon">🔍</div>
        <h3>No Tutors Found</h3>
        <p>Try adjusting your filters to see more results.</p>
      </div>
    );
  }
  
  return (
    <div className="tutor-list">
      <div className="tutor-list-header">
        <h2 className="tutor-list-title">
          {tutors.length} {tutors.length === 1 ? 'Tutor' : 'Tutors'} Available
        </h2>
        <p className="tutor-list-subtitle">
          All tutors are verified and background-checked for your safety
        </p>
      </div>
      
      <div className="tutor-grid">
        {Array.isArray(tutors) && tutors.map((tutor) => (
          <TutorCard key={tutor.id} tutor={tutor} />
        ))}
      </div>
    </div>
  );
};

TutorList.propTypes = {
  tutors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  ).isRequired,
  loading: PropTypes.bool
};

export default TutorList;
