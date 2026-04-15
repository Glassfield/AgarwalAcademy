import React, { useState, useEffect } from 'react';
import { getAllOptions, addOption, deleteOption } from '@/services/api/optionsService';
import './ManageOptions.css';

const DEFAULT_OPTIONS = {
  classes: [
    { id: 'I', label: 'I' }, { id: 'II', label: 'II' }, { id: 'III', label: 'III' },
    { id: 'IV', label: 'IV' }, { id: 'V', label: 'V' }, { id: 'VI', label: 'VI' },
    { id: 'VII', label: 'VII' }, { id: 'VIII', label: 'VIII' }, { id: 'IX', label: 'IX' },
    { id: 'X', label: 'X' }, { id: 'XI', label: 'XI' }, { id: 'XII', label: 'XII' },
    { id: 'JEE', label: 'JEE' }, { id: 'NEET', label: 'NEET' },
    { id: 'BA', label: 'BA' }, { id: 'BCOM', label: 'BCOM' }, { id: 'BSc', label: 'BSc' },
    { id: 'CLAT', label: 'CLAT' }, { id: 'CUET', label: 'CUET' }, { id: 'IELTS', label: 'IELTS' }
  ],
  boards: [
    { id: 'CBSE', label: 'CBSE' }, { id: 'ICSE', label: 'ICSE' },
    { id: 'IB', label: 'IB' }, { id: 'IGCSE', label: 'IGCSE' }
  ],
  subjects: [
    { id: 'English', label: 'English' }, { id: 'Hindi', label: 'Hindi' },
    { id: 'Maths', label: 'Maths' }, { id: 'Science', label: 'Science' },
    { id: 'SST', label: 'SST' }, { id: 'Sanskrit', label: 'Sanskrit' },
    { id: 'French', label: 'French' }, { id: 'Spanish', label: 'Spanish' },
    { id: 'Physics', label: 'Physics' }, { id: 'Chemistry', label: 'Chemistry' },
    { id: 'Biology', label: 'Biology' }, { id: 'Accounts', label: 'Accounts' },
    { id: 'Computer Science', label: 'Computer Science' },
    { id: 'Information Practice', label: 'Information Practice' },
    { id: 'Business Studies', label: 'Business Studies' },
    { id: 'Political Science', label: 'Political Science' },
    { id: 'Economics', label: 'Economics' }, { id: 'Psychology', label: 'Psychology' },
    { id: 'Sociology', label: 'Sociology' }, { id: 'History', label: 'History' },
    { id: 'Geography', label: 'Geography' }, { id: 'Spoken English', label: 'Spoken English' },
    { id: 'Corporate Accounting', label: 'Corporate Accounting' },
    { id: 'Cost Accounting', label: 'Cost Accounting' },
    { id: 'Management Accounting', label: 'Management Accounting' },
    { id: 'Tax', label: 'Tax' }, { id: 'Finance', label: 'Finance' },
    { id: 'Statistics', label: 'Statistics' }
  ],
  experience: [
    { id: '0-2', label: '0-2 years' }, { id: '2-5', label: '2-5 years' },
    { id: '5-10', label: '5-10 years' }, { id: '10+', label: '10+ years' }
  ],
  areas: [
    { id: 'Safdarjung Enclave', label: 'Safdarjung Enclave' },
    { id: 'South Ex', label: 'South Ex' }, { id: 'GK', label: 'GK' },
    { id: 'Vasant Kunj', label: 'Vasant Kunj' }, { id: 'Vasant Vihar', label: 'Vasant Vihar' },
    { id: 'Dhaula Kuan', label: 'Dhaula Kuan' }, { id: 'Moti Bagh', label: 'Moti Bagh' },
    { id: 'RK Puram Sector 1', label: 'RK Puram Sector 1' },
    { id: 'RK Puram Sector 2', label: 'RK Puram Sector 2' },
    { id: 'RK Puram Sector 3', label: 'RK Puram Sector 3' },
    { id: 'RK Puram Sector 4', label: 'RK Puram Sector 4' },
    { id: 'RK Puram Sector 5', label: 'RK Puram Sector 5' },
    { id: 'RK Puram Sector 6', label: 'RK Puram Sector 6' },
    { id: 'RK Puram Sector 7', label: 'RK Puram Sector 7' },
    { id: 'RK Puram Sector 8', label: 'RK Puram Sector 8' },
    { id: 'RK Puram Sector 9', label: 'RK Puram Sector 9' },
    { id: 'RK Puram Sector 10', label: 'RK Puram Sector 10' },
    { id: 'Nivedita Kunj', label: 'Nivedita Kunj' },
    { id: 'RK Puram Sector 11', label: 'RK Puram Sector 11' },
    { id: 'RK Puram Sector 12', label: 'RK Puram Sector 12' },
    { id: 'RK Puram Sector 13', label: 'RK Puram Sector 13' },
    { id: 'Aradhna Enclave', label: 'Aradhna Enclave' },
    { id: 'Arjun Nagar', label: 'Arjun Nagar' },
    { id: 'Krishna Nagar', label: 'Krishna Nagar' },
    { id: 'Hauzkhas', label: 'Hauzkhas' }, { id: 'Munirka', label: 'Munirka' },
    { id: 'Munirka Vihar', label: 'Munirka Vihar' },
    { id: 'Munirka Enclave', label: 'Munirka Enclave' },
    { id: 'Saket', label: 'Saket' },
    { id: 'Safdarjung Development Enclave', label: 'Safdarjung Development Enclave' },
    { id: 'Green Park', label: 'Green Park' }, { id: 'West End', label: 'West End' },
    { id: 'Anand Niketan', label: 'Anand Niketan' },
    { id: 'Panchsheel', label: 'Panchsheel' },
    { id: 'Sarvodya Enclave', label: 'Sarvodya Enclave' },
    { id: 'Kidwai Nagar', label: 'Kidwai Nagar' },
    { id: 'Sarojni Nagar', label: 'Sarojni Nagar' },
    { id: 'Mohammadpur', label: 'Mohammadpur' },
    { id: 'Humayupur', label: 'Humayupur' }, { id: 'Ber Sarai', label: 'Ber Sarai' },
    { id: 'Adchini', label: 'Adchini' }, { id: 'Katwaria Sarai', label: 'Katwaria Sarai' },
    { id: 'Azad Apartment', label: 'Azad Apartment' },
    { id: 'Malviya Nagar', label: 'Malviya Nagar' },
    { id: 'Defence Colony', label: 'Defence Colony' },
    { id: 'Shankar Vihar', label: 'Shankar Vihar' },
    { id: 'Anuj Vihar', label: 'Anuj Vihar' },
    { id: 'Mahipalpur', label: 'Mahipalpur' }, { id: 'Delhi Cantt', label: 'Delhi Cantt' },
    { id: 'Dwarka', label: 'Dwarka' }, { id: 'Kalkaji', label: 'Kalkaji' },
    { id: 'Andrews Gunj', label: 'Andrews Gunj' }, { id: 'Nanakpura', label: 'Nanakpura' },
    { id: 'Sainik Farm', label: 'Sainik Farm' }, { id: 'Ladoo Sarai', label: 'Ladoo Sarai' },
    { id: 'Mehrauli', label: 'Mehrauli' }, { id: 'Satyaniketan', label: 'Satyaniketan' }
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
    { id: 'classes', label: 'Classes', icon: '🎓' },
    { id: 'boards', label: 'Boards', icon: '🏫' },
    { id: 'subjects', label: 'Subjects', icon: '📚' },
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
