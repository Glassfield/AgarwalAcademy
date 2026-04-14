import PropTypes from 'prop-types';
import './Avatar.css';

/**
 * Avatar Component
 * Generates consistent avatars using free DiceBear API
 * Falls back to initials if image fails to load
 */
const Avatar = ({ 
  name, 
  size = 'medium', 
  style = 'avataaars', 
  className = '',
  showName = false 
}) => {
  // Generate avatar URL using DiceBear
  const avatarUrl = `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(name)}&backgroundColor=b6e3f4,c0aede,d1d4f9&radius=50`;
  
  // Fallback to UI Avatars if DiceBear fails
  const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=128`;
  
  // Get initials for ultimate fallback
  const getInitials = (fullName) => {
    return fullName
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  
  const sizeClasses = {
    small: 'avatar-small',
    medium: 'avatar-medium',
    large: 'avatar-large',
    xlarge: 'avatar-xlarge'
  };
  
  return (
    <div className={`avatar-container ${className}`}>
      <div className={`avatar ${sizeClasses[size]}`}>
        <img 
          src={avatarUrl} 
          alt={name}
          className="avatar-image"
          onError={(e) => {
            // First fallback to UI Avatars
            if (e.target.src !== fallbackUrl) {
              e.target.src = fallbackUrl;
            } else {
              // Ultimate fallback to initials
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }
          }}
        />
        <div className="avatar-initials" style={{ display: 'none' }}>
          {getInitials(name)}
        </div>
      </div>
      {showName && <span className="avatar-name">{name}</span>}
    </div>
  );
};

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  style: PropTypes.oneOf(['avataaars', 'personas', 'initials', 'bottts', 'lorelei', 'micah']),
  className: PropTypes.string,
  showName: PropTypes.bool
};

export default Avatar;
