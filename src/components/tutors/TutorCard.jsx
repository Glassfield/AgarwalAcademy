import PropTypes from 'prop-types';
import Avatar from '../common/Avatar';
import Card from '../common/Card';
import Button from '../common/Button';
import AudioPlayer from './AudioPlayer';
import './TutorCard.css';

/**
 * Tutor Card Component
 * Displays tutor as "product" with privacy-preserved information
 */
const TutorCard = ({ tutor }) => {
  const {
    id,
    displayName,
    gender,
    ageGroup,
    subjects = [],
    classes = [],
    experience,
    areas = [],
    avatar,
    audioUrl,
    rating,
    verified = false,
    totalStudents = 0,
    bio = ''
  } = tutor;
  
  return (
    <Card className="tutor-card" hover>
      {/* Avatar */}
      <div className="tutor-avatar-wrapper">
        <Avatar name={displayName} size="large" />
        {verified && (
          <span className="verified-badge" title="Verified Tutor">✓</span>
        )}
      </div>
      
      {/* Tutor Info */}
      <div className="tutor-info">
        <h3 className="tutor-name">{displayName}</h3>
        
        <div className="tutor-meta">
          <span className="meta-item">
            <span className="meta-icon">{gender === 'male' ? '👨‍🏫' : '👩‍🏫'}</span>
            {experience}
          </span>
          {rating && (
            <span className="meta-item">
              <span className="meta-icon">⭐</span>
              {rating}</span>
          )}
        </div>
        
        <div className="tutor-details">
          {subjects.length > 0 && (
            <div className="detail-row">
              <span className="detail-label">📚 Subjects:</span>
              <span className="detail-value">{subjects.slice(0, 3).join(', ')}{subjects.length > 3 ? '...' : ''}</span>
            </div>
          )}
          
          {classes.length > 0 && (
            <div className="detail-row">
              <span className="detail-label">🎓 Classes:</span>
              <span className="detail-value">{classes.slice(0, 2).join(', ')}{classes.length > 2 ? '...' : ''}</span>
            </div>
          )}
          
          {experience && (
            <div className="detail-row">
              <span className="detail-label">💼 Experience:</span>
              <span className="detail-value">{experience}</span>
            </div>
          )}
          
          {areas.length > 0 && (
            <div className="detail-row">
              <span className="detail-label">📍 Areas:</span>
              <span className="detail-value">{areas.slice(0, 2).join(', ')}{areas.length > 2 ? '...' : ''}</span>
            </div>
          )}
          
          {totalStudents > 0 && (
            <div className="detail-row">
              <span className="detail-label">👥 Students:</span>
              <span className="detail-value">{totalStudents}+ taught</span>
            </div>
          )}
        </div>
        
        {/* Audio Introduction */}
        {audioUrl && (
          <AudioPlayer audioUrl={audioUrl} tutorName={displayName} />
        )}
        
        {/* Action Buttons */}
        <div className="tutor-actions">
          <Button
            variant="primary"
            size="md"
            fullWidth
            to="/enquiry"
          >
            Request This Tutor
          </Button>
        </div>
      </div>
    </Card>
  );
};

TutorCard.propTypes = {
  tutor: PropTypes.shape({
    id: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    gender: PropTypes.string,
    ageGroup: PropTypes.string,
    subjects: PropTypes.arrayOf(PropTypes.string),
    classes: PropTypes.arrayOf(PropTypes.string),
    experience: PropTypes.string,
    areas: PropTypes.arrayOf(PropTypes.string),
    avatar: PropTypes.string,
    audioUrl: PropTypes.string,
    rating: PropTypes.number,
    verified: PropTypes.bool,
    totalStudents: PropTypes.number,
    bio: PropTypes.string
  }).isRequired
};

export default TutorCard;
