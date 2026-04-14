import { useState } from 'react';
import PropTypes from 'prop-types';
import './LocalitySearch.css';

/**
 * Locality Search Component
 * Helps users find tutors by location in South Delhi
 */
const LocalitySearch = ({ onLocalitySelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocality, setSelectedLocality] = useState('');
  
  // South Delhi localities
  const localities = [
    'Greater Kailash I',
    'Greater Kailash II',
    'Hauz Khas',
    'Saket',
    'Vasant Kunj',
    'Defence Colony',
    'Lajpat Nagar',
    'Green Park',
    'Malviya Nagar',
    'R.K. Puram',
    'Safdarjung',
    'Vasant Vihar',
    'Chanakyapuri',
    'Nehru Place',
    'Kalkaji',
    'Maharani Bagh',
    'Jangpura',
    'South Extension',
    'Kotla Mubarakpur',
    'Panchsheel Park'
  ];
  
  const filteredLocalities = localities.filter(locality =>
    locality.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSelect = (locality) => {
    setSelectedLocality(locality);
    setSearchTerm(locality);
    if (onLocalitySelect) {
      onLocalitySelect(locality);
    }
  };
  
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSelectedLocality('');
  };
  
  return (
    <div className="locality-search">
      <div className="search-header">
        <h3 className="search-title">Tutors Near You</h3>
        <p className="search-subtitle">Select your locality in South Delhi</p>
      </div>
      
      {/* Search Input */}
      <div className="search-input-wrapper">
        <span className="search-icon">📍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Enter your locality..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        {searchTerm && (
          <button
            className="clear-button"
            onClick={() => {
              setSearchTerm('');
              setSelectedLocality('');
            }}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
      
      {/* Locality List */}
      {searchTerm && filteredLocalities.length > 0 && (
        <div className="locality-dropdown">
          {filteredLocalities.map((locality) => (
            <button
              key={locality}
              className={`locality-item ${selectedLocality === locality ? 'selected' : ''}`}
              onClick={() => handleSelect(locality)}
            >
              <span className="locality-icon">📍</span>
              <span className="locality-name">{locality}</span>
            </button>
          ))}
        </div>
      )}
      
      {/* No Results */}
      {searchTerm && filteredLocalities.length === 0 && (
        <div className="no-results">
          <p>No localities found matching "{searchTerm}"</p>
          <p className="no-results-hint">
            Try searching for areas in South Delhi
          </p>
        </div>
      )}
      
      {/* Popular Localities (when not searching) */}
      {!searchTerm && (
        <div className="popular-localities">
          <h4 className="popular-title">Popular Areas</h4>
          <div className="popular-grid">
            {localities.slice(0, 8).map((locality) => (
              <button
                key={locality}
                className="popular-item"
                onClick={() => handleSelect(locality)}
              >
                {locality}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

LocalitySearch.propTypes = {
  onLocalitySelect: PropTypes.func
};

export default LocalitySearch;
