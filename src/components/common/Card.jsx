import PropTypes from 'prop-types';
import './Card.css';

/**
 * Reusable Card Component
 * For tutor profiles, feature sections, testimonials, etc.
 */
const Card = ({
  children,
  hover = true,
  padding = 'md',
  shadow = 'base',
  className = '',
  onClick,
  ...props
}) => {
  const paddingClasses = {
    sm: 'card-padding-sm',
    md: 'card-padding-md',
    lg: 'card-padding-lg',
    none: ''
  };
  
  const shadowClasses = {
    none: 'card-shadow-none',
    sm: 'card-shadow-sm',
    base: 'card-shadow-base',
    lg: 'card-shadow-lg'
  };
  
  const classes = `
    card
    ${paddingClasses[padding] || paddingClasses.md}
    ${shadowClasses[shadow] || shadowClasses.base}
    ${hover ? 'card-hover' : ''}
    ${onClick ? 'card-clickable' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  return (
    <div className={classes} onClick={onClick} {...props}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  hover: PropTypes.bool,
  padding: PropTypes.oneOf(['none', 'sm', 'md', 'lg']),
  shadow: PropTypes.oneOf(['none', 'sm', 'base', 'lg']),
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default Card;
