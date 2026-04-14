import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@/components/common/Button';
import { getAllOptions } from '@/services/api/optionsService';
import './TutorEditModal.css';

/**
 * Tutor Edit Modal Component
 * Allows admin to view and edit tutor details
 */
const TutorEditModal = ({ tutor, onClose, onSave }) => {
  const [options, setOptions] = useState({ subjects: [], classes: [], experience: [], areas: [] });
  
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
  
  const SUBJECT_OPTIONS = options.subjects || [];
  const CLASS_OPTIONS = options.classes || [];
  const EXPERIENCE_OPTIONS = options.experience || [];
  const AREA_OPTIONS = options.areas || [];
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    dateOfBirth: '',
    mobileNumber: '',
    currentAddressLine1: '',
    currentAddressLine2: '',
    currentCity: '',
    currentState: '',
    currentPinCode: '',
    permanentAddressLine1: '',
    permanentAddressLine2: '',
    permanentCity: '',
    permanentState: '',
    permanentPinCode: '',
    subjects: [],
    classes: [],
    experience: '',
    areas: [],
    status: 'pending',
    verified: false
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (tutor) {
      setFormData({
        fullName: tutor.fullName || '',
        gender: tutor.gender || '',
        dateOfBirth: tutor.dateOfBirth || '',
        mobileNumber: tutor.mobileNumber || '',
        currentAddressLine1: tutor.currentAddressLine1 || '',
        currentAddressLine2: tutor.currentAddressLine2 || '',
        currentCity: tutor.currentCity || '',
        currentState: tutor.currentState || '',
        currentPinCode: tutor.currentPinCode || '',
        permanentAddressLine1: tutor.permanentAddressLine1 || '',
        permanentAddressLine2: tutor.permanentAddressLine2 || '',
        permanentCity: tutor.permanentCity || '',
        permanentState: tutor.permanentState || '',
        permanentPinCode: tutor.permanentPinCode || '',
        subjects: Array.isArray(tutor.subjects) ? tutor.subjects : [],
        classes: Array.isArray(tutor.classes) ? tutor.classes : [],
        experience: tutor.experience || '',
        areas: Array.isArray(tutor.areas) ? tutor.areas : [],
        status: tutor.status || 'pending',
        verified: tutor.verified || false
      });
    }
  }, [tutor]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave({ ...tutor, ...formData });
      onClose();
    } catch (error) {
      console.error('Error saving tutor:', error);
      alert('Failed to save tutor details');
    } finally {
      setSaving(false);
    }
  };

  const handleSubjectToggle = (id) => {
    const newSubjects = formData.subjects.includes(id)
      ? formData.subjects.filter(s => s !== id)
      : [...formData.subjects, id];
    setFormData({ ...formData, subjects: newSubjects });
  };

  const handleClassToggle = (id) => {
    const newClasses = formData.classes.includes(id)
      ? formData.classes.filter(c => c !== id)
      : [...formData.classes, id];
    setFormData({ ...formData, classes: newClasses });
  };

  const handleAreaToggle = (id) => {
    const newAreas = formData.areas.includes(id)
      ? formData.areas.filter(a => a !== id)
      : [...formData.areas, id];
    setFormData({ ...formData, areas: newAreas });
  };

  return (
    <div className="tutor-edit-modal">
      <div className="modal-header">
        <h2>Edit Tutor Details</h2>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <div className="modal-body">
        <div className="form-section">
          <h3>Personal Information</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Gender *</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="form-input"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Mobile Number *</label>
              <input
                type="tel"
                value={formData.mobileNumber}
                onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                className="form-input"
                maxLength={10}
                placeholder="10-digit mobile number"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Current Address</h3>
          
          <div className="form-group">
            <label>Address Line 1</label>
            <input
              type="text"
              value={formData.currentAddressLine1}
              onChange={(e) => setFormData({ ...formData, currentAddressLine1: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Address Line 2</label>
            <input
              type="text"
              value={formData.currentAddressLine2}
              onChange={(e) => setFormData({ ...formData, currentAddressLine2: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                value={formData.currentCity}
                onChange={(e) => setFormData({ ...formData, currentCity: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                value={formData.currentState}
                onChange={(e) => setFormData({ ...formData, currentState: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>PIN Code</label>
              <input
                type="text"
                value={formData.currentPinCode}
                onChange={(e) => setFormData({ ...formData, currentPinCode: e.target.value })}
                className="form-input"
                maxLength={6}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Teaching Details</h3>
          
          <div className="form-group">
            <label>Subjects *</label>
            <div className="checkbox-group">
              {SUBJECT_OPTIONS.map(subject => (
                <label key={subject.id} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.subjects.includes(subject.id)}
                    onChange={() => handleSubjectToggle(subject.id)}
                  />
                  <span>{subject.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Classes *</label>
            <div className="checkbox-group">
              {CLASS_OPTIONS.map(cls => (
                <label key={cls.id} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.classes.includes(cls.id)}
                    onChange={() => handleClassToggle(cls.id)}
                  />
                  <span>{cls.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Experience *</label>
            <select
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              className="form-input"
              required
            >
              <option value="">Select Experience</option>
              {EXPERIENCE_OPTIONS.map(exp => (
                <option key={exp.id} value={exp.id}>{exp.label}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Areas *</label>
            <div className="checkbox-group">
              {AREA_OPTIONS.map(area => (
                <label key={area.id} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.areas.includes(area.id)}
                    onChange={() => handleAreaToggle(area.id)}
                  />
                  <span>{area.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Approval Status</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label>Status *</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="form-input"
              >
                <option value="pending">Pending Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>

            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.75rem' }}>
                <input
                  type="checkbox"
                  checked={formData.verified}
                  onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
                />
                Verified Tutor
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave} loading={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
};

TutorEditModal.propTypes = {
  tutor: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

export default TutorEditModal;
