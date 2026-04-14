import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getAllOptions } from '@/services/api/optionsService';
import './TutorFilter.css';

/**
 * Tutor Filter Component
 * Filters tutors by class, subject, board, locality, gender
 */
const TutorFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    class: '',
    subject: '',
    board: '',
    locality: '',
    gender: ''
  });
  
  const [options, setOptions] = useState({ subjects: [], classes: [], areas: [] });
  
  useEffect(() => {
    loadOptions();
  }, []);
  
  const loadOptions = async () => {
    try {
      const result = await getAllOptions();
      if (result.success) {
        setOptions(result.data);
      }
    } catch (error) {
      console.error('Error loading options:', error);
    }
  };
  
  const handleChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleReset = () => {
    const resetFilters = {
      class: '',
      subject: '',
      board: '',
      locality: '',
      gender: ''
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };
  
  return (
    <div className="tutor-filter">
      <div className="filter-header">
        <h3 className="filter-title">Filter Tutors</h3>
        <button className="filter-reset" onClick={handleReset}>
          Reset All
        </button>
      </div>
      
      <div className="filter-grid">
        {/* Class Filter */}
        <div className="filter-group">
          <label className="filter-label">Class</label>
          <select
            className="filter-select"
            value={filters.class}
            onChange={(e) => handleChange('class', e.target.value)}
          >
            <option value="">All Classes</option>
            {options.classes?.map(cls => (
              <option key={cls.id} value={cls.id}>{cls.label}</option>
            ))}
          </select>
        </div>
        
        {/* Subject Filter */}
        <div className="filter-group">
          <label className="filter-label">Subject</label>
          <select
            className="filter-select"
            value={filters.subject}
            onChange={(e) => handleChange('subject', e.target.value)}
          >
            <option value="">All Subjects</option>
            {options.subjects?.map(subj => (
              <option key={subj.id} value={subj.id}>{subj.label}</option>
            ))}
          </select>
        </div>
        
        {/* Board Filter */}
        <div className="filter-group">
          <label className="filter-label">Board</label>
          <select
            className="filter-select"
            value={filters.board}
            onChange={(e) => handleChange('board', e.target.value)}
          >
            <option value="">All Boards</option>
            <option value="CBSE">CBSE</option>
            <option value="ICSE">ICSE</option>
            <option value="State Board">State Board</option>
            <option value="IB">IB</option>
            <option value="IGCSE">IGCSE</option>
          </select>
        </div>
        
        {/* Locality Filter */}
        <div className="filter-group">
          <label className="filter-label">Locality</label>
          <select
            className="filter-select"
            value={filters.locality}
            onChange={(e) => handleChange('locality', e.target.value)}
          >
            <option value="">All Areas</option>
            {options.areas?.map(area => (
              <option key={area.id} value={area.id}>{area.label}</option>
            ))}
          </select>
        </div>
        
        {/* Gender Filter */}
        <div className="filter-group">
          <label className="filter-label">Gender Preference</label>
          <select
            className="filter-select"
            value={filters.gender}
            onChange={(e) => handleChange('gender', e.target.value)}
          >
            <option value="">Any</option>
            <option value="Male">Male Tutor</option>
            <option value="Female">Female Tutor</option>
          </select>
        </div>
      </div>
    </div>
  );
};

TutorFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired
};

export default TutorFilter;
