import React, { useState, useEffect } from 'react';
import { getAllOptions, addOption, deleteOption } from '@/services/api/optionsService';
import './ManageOptions.css';

const DEFAULT_OPTIONS = {
  subjects: [
    { id: 'physics', label: 'Physics' },
    { id: 'chemistry', label: 'Chemistry' },
    { id: 'mathematics', label: 'Mathematics' },
    { id: 'biology', label: 'Biology' },
    { id: 'english', label: 'English' },
    { id: 'hindi', label: 'Hindi' },
    { id: 'computer-science', label: 'Computer Science' },
    { id: 'economics', label: 'Economics' },
    { id: 'accountancy', label: 'Accountancy' },
    { id: 'business-studies', label: 'Business Studies' }
  ],
  classes: [
    { id: 'class-1-5', label: 'Class 1-5' },
    { id: 'class-6-8', label: 'Class 6-8' },
    { id: 'class-9-10', label: 'Class 9-10' },
    { id: 'class-11-12', label: 'Class 11-12' },
    { id: 'competitive', label: 'Competitive Exams' }
  ],
  experience: [
    { id: '0-2', label: '0-2 years' },
    { id: '2-5', label: '2-5 years' },
    { id: '5-10', label: '5-10 years' },
    { id: '10+', label: '10+ years' }
  ],
  areas: [
    { id: 'saket', label: 'Saket' },
    { id: 'malviya-nagar', label: 'Malviya Nagar' },
    { id: 'hauz-khas', label: 'Hauz Khas' },
    { id: 'green-park', label: 'Green Park' },
    { id: 'vasant-kunj', label: 'Vasant Kunj' },
    { id: 'south-ex', label: 'South Extension' },
    { id: 'lajpat-nagar', label: 'Lajpat Nagar' },
    { id: 'greater-kailash', label: 'Greater Kailash' }
  ]
};

const ManageOptions = () => {
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('subjects');
  const [isAdding, setIsAdding] = useState(false);
  const [newOption, setNewOption] = useState({ id: '', label: '' });

  useEffect(() => {
    loadOptionsData();
  }, []);

  const loadOptionsData = async () => {
    setLoading(true);
    try {
      const result = await getAllOptions();
      if (result.success) {
        setOptions(result.data);
      } else {
        setOptions(DEFAULT_OPTIONS);
      }
    } catch (error) {
      console.error('Error loading options:', error);
      setOptions(DEFAULT_OPTIONS);
    } finally {
      setLoading(false);
    }
  };

  const handleAddOption = async () => {
    if (!newOption.id || !newOption.label) {
      alert('Please enter both ID and label');
      return;
    }

    // Check for duplicate ID
    if (options[activeCategory]?.some(opt => opt.id === newOption.id)) {
      alert('This ID already exists. Please use a unique ID.');
      return;
    }

    try {
      const result = await addOption(activeCategory, newOption.id, newOption.label);
      if (result.success) {
        await loadOptionsData(); // Reload from database
        setNewOption({ id: '', label: '' });
        setIsAdding(false);
      }
    } catch (error) {
      alert(error.message || 'Failed to add option');
    }
  };

  const handleDeleteOption = async (optionId) => {
    if (!window.confirm('Are you sure you want to delete this option? This may affect existing tutor profiles.')) {
      return;
    }
    
    try {
      const result = await deleteOption(activeCategory, optionId);
      if (result.success) {
        await loadOptionsData(); // Reload from database
      }
    } catch (error) {
      alert('Failed to delete option');
    }
  };

  const handleResetToDefaults = () => {
    alert('Reset functionality needs backend endpoint. Refresh page to see database defaults.');
  };

  const generateId = (label) => {
    return label.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const handleLabelChange = (value) => {
    setNewOption({
      id: generateId(value),
      label: value
    });
  };

  const categories = [
    { id: 'subjects', label: 'Subjects', icon: '📚' },
    { id: 'classes', label: 'Classes', icon: '🎓' },
    { id: 'experience', label: 'Experience Levels', icon: '⏱️' },
    { id: 'areas', label: 'Areas', icon: '📍' }
  ];

  if (loading) {
    return (
      <div className="manage-options">
        <div className="loading-state">Loading options...</div>
      </div>
    );
  }

  return (
    <div className="manage-options">
      <div className="options-header">
        <div>
          <h2>Manage Form Options</h2>
          <p>Add or remove options for tutor registration form dropdowns</p>
        </div>
        <button onClick={handleResetToDefaults} className="reset-btn">
          Reset to Defaults
        </button>
      </div>

      <div className="options-categories">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => {
              setActiveCategory(cat.id);
              setIsAdding(false);
            }}
          >
            <span className="category-icon">{cat.icon}</span>
            <span className="category-label">{cat.label}</span>
            <span className="category-count">({options[cat.id]?.length || 0})</span>
          </button>
        ))}
      </div>

      <div className="options-content">
        <div className="options-list">
          {options[activeCategory]?.map(option => (
            <div key={option.id} className="option-item">
              <div className="option-info">
                <span className="option-label">{option.label}</span>
                <span className="option-id">ID: {option.id}</span>
              </div>
              <button
                onClick={() => handleDeleteOption(option.id)}
                className="delete-option-btn"
                title="Delete option"
              >
                🗑️
              </button>
            </div>
          ))}

          {(!options[activeCategory] || options[activeCategory].length === 0) && (
            <div className="empty-state">
              <p>No options available. Add one below.</p>
            </div>
          )}
        </div>

        {!isAdding ? (
          <button onClick={() => setIsAdding(true)} className="add-option-btn">
            + Add New Option
          </button>
        ) : (
          <div className="add-option-form">
            <div className="form-group">
              <label>Option Label *</label>
              <input
                type="text"
                value={newOption.label}
                onChange={(e) => handleLabelChange(e.target.value)}
                placeholder="e.g., Social Science"
                autoFocus
              />
            </div>
            <div className="form-group">
              <label>Option ID (auto-generated) *</label>
              <input
                type="text"
                value={newOption.id}
                onChange={(e) => setNewOption({ ...newOption, id: e.target.value })}
                placeholder="e.g., social-science"
              />
              <small>Used internally. Must be unique and lowercase with hyphens.</small>
            </div>
            <div className="form-actions">
              <button onClick={handleAddOption} className="save-option-btn">
                Save Option
              </button>
              <button 
                onClick={() => {
                  setIsAdding(false);
                  setNewOption({ id: '', label: '' });
                }} 
                className="cancel-option-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageOptions;
