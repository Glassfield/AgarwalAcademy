import { memo } from 'react';
import PropTypes from 'prop-types';
import './SelectionTile.css';

/**
 * SelectionTile Component
 * Reusable tile for multi-select or single-select options
 * Colorful, accessible, and mobile-friendly
 */
const SelectionTile = memo(({ 
  id,
  label, 
  description,
  icon, 
  color = 'blue',
  selected = false, 
  disabled = false,
  onClick,
  size = 'medium'
}) => {
  const handleClick = () => {
    if (!disabled) {
      onClick(id);
    }
  };

  const handleKeyPress = (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
      e.preventDefault();
      onClick(id);
    }
  };

  return (
    <div
      className={`selection-tile selection-tile--${size} selection-tile--${color} ${
        selected ? 'selected' : ''
      } ${disabled ? 'disabled' : ''}`}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-pressed={selected}
      aria-disabled={disabled}
    >
      {icon && <div className="tile-icon">{icon}</div>}
      <div className="tile-content">
        <div className="tile-label">{label}</div>
        {description && <div className="tile-description">{description}</div>}
      </div>
      {selected && (
        <div className="tile-check">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      )}
    </div>
  );
});

SelectionTile.displayName = 'SelectionTile';

SelectionTile.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
  icon: PropTypes.node,
  color: PropTypes.oneOf(['blue', 'green', 'orange', 'purple', 'pink', 'teal', 'red', 'indigo']),
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

export default SelectionTile;
