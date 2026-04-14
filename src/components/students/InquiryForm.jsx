import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import Button from '../common/Button';
import { submitInquiry } from '@/services/api/inquiryService';
import './InquiryForm.css';

/**
 * Student Inquiry Form Component
 * For requesting tutors - captures student details and requirements
 * Sends email to agarwalacademy29@gmail.com and saves to admin dashboard
 */
const InquiryForm = ({ tutorId = null, onSubmit, preSelectedSubject = null }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  
  // Pre-fill subject from URL params or props
  useEffect(() => {
    const subjectFromUrl = searchParams.get('subject');
    const subject = preSelectedSubject || subjectFromUrl;
    if (subject) {
      setValue('subjects', subject);
    }
  }, [searchParams, preSelectedSubject, setValue]);
  
  const onFormSubmit = async (data) => {
    setLoading(true);
    setError('');
    
    const inquiryData = {
      ...data,
      tutorId,
      timestamp: new Date().toISOString(),
      status: 'new'
    };
    
    try {
      const result = await submitInquiry(inquiryData);
      
      if (result.success) {
        setSubmitted(true);
        reset();
        
        // Call parent callback if provided
        if (onSubmit) {
          await onSubmit(inquiryData);
        }
        
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(result.message || 'Failed to submit inquiry');
      }
    } catch (err) {
      console.error('Error submitting inquiry:', err);
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="inquiry-form-wrapper">
      {submitted && (
        <div className="success-message">
          <span className="success-icon">✓</span>
          <p>Thank you! We'll contact you within 24 hours. A notification has been sent to our team at agarwalacademy29@gmail.com</p>
        </div>
      )}
      
      {error && (
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          <p>{error}</p>
        </div>
      )}
      
      <form className="inquiry-form" onSubmit={handleSubmit(onFormSubmit)}>
        <h3 className="form-title">Request a Tutor</h3>
        <p className="form-subtitle">
          Fill in your details and we'll connect you with the perfect tutor
        </p>
        
        {/* Student Name */}
        <div className="form-group">
          <label className="form-label">Student Name *</label>
          <input
            type="text"
            className={`form-input ${errors.studentName ? 'error' : ''}`}
            placeholder="Enter student's name"
            {...register('studentName', { required: 'Student name is required' })}
          />
          {errors.studentName && (
            <span className="error-text">{errors.studentName.message}</span>
          )}
        </div>
        
        {/* Parent Name */}
        <div className="form-group">
          <label className="form-label">Parent/Guardian Name *</label>
          <input
            type="text"
            className={`form-input ${errors.parentName ? 'error' : ''}`}
            placeholder="Enter parent's name"
            {...register('parentName', { required: 'Parent name is required' })}
          />
          {errors.parentName && (
            <span className="error-text">{errors.parentName.message}</span>
          )}
        </div>
        
        {/* Phone Number */}
        <div className="form-group">
          <label className="form-label">Phone Number *</label>
          <input
            type="tel"
            className={`form-input ${errors.phone ? 'error' : ''}`}
            placeholder="+91-XXXXXXXXXX"
            {...register('phone', {
              required: 'Phone number is required',
              pattern: {
                value: /^[6-9]\d{9}$/,
                message: 'Enter a valid 10-digit mobile number'
              }
            })}
          />
          {errors.phone && (
            <span className="error-text">{errors.phone.message}</span>
          )}
        </div>
        
        {/* Email (Optional) */}
        <div className="form-group">
          <label className="form-label">Email (Optional)</label>
          <input
            type="email"
            className="form-input"
            placeholder="your@email.com"
            {...register('email', {
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Enter a valid email address'
              }
            })}
          />
          {errors.email && (
            <span className="error-text">{errors.email.message}</span>
          )}
        </div>
        
        {/* Class */}
        <div className="form-group">
          <label className="form-label">Class *</label>
          <select
            className={`form-input ${errors.class ? 'error' : ''}`}
            {...register('class', { required: 'Please select a class' })}
          >
            <option value="">Select Class</option>
            <option value="1">Class 1</option>
            <option value="2">Class 2</option>
            <option value="3">Class 3</option>
            <option value="4">Class 4</option>
            <option value="5">Class 5</option>
            <option value="6">Class 6</option>
            <option value="7">Class 7</option>
            <option value="8">Class 8</option>
            <option value="9">Class 9</option>
            <option value="10">Class 10</option>
            <option value="11">Class 11</option>
            <option value="12">Class 12</option>
          </select>
          {errors.class && (
            <span className="error-text">{errors.class.message}</span>
          )}
        </div>
        
        {/* Board */}
        <div className="form-group">
          <label className="form-label">Board *</label>
          <select
            className={`form-input ${errors.board ? 'error' : ''}`}
            {...register('board', { required: 'Please select a board' })}
          >
            <option value="">Select Board</option>
            <option value="CBSE">CBSE</option>
            <option value="ICSE">ICSE</option>
            <option value="State Board">State Board</option>
            <option value="IB">IB</option>
            <option value="IGCSE">IGCSE</option>
          </select>
          {errors.board && (
            <span className="error-text">{errors.board.message}</span>
          )}
        </div>
        
        {/* Subjects */}
        <div className="form-group">
          <label className="form-label">Subjects Required *</label>
          <input
            type="text"
            className={`form-input ${errors.subjects ? 'error' : ''}`}
            placeholder="e.g., Mathematics, Physics, Chemistry"
            {...register('subjects', { required: 'Please enter subjects' })}
          />
          {errors.subjects && (
            <span className="error-text">{errors.subjects.message}</span>
          )}
        </div>
        
        {/* Locality */}
        <div className="form-group">
          <label className="form-label">Locality *</label>
          <input
            type="text"
            className={`form-input ${errors.locality ? 'error' : ''}`}
            placeholder="e.g., Hauz Khas, Greater Kailash"
            {...register('locality', { required: 'Please enter your locality' })}
          />
          {errors.locality && (
            <span className="error-text">{errors.locality.message}</span>
          )}
        </div>
        
        {/* Additional Requirements */}
        <div className="form-group">
          <label className="form-label">Additional Requirements (Optional)</label>
          <textarea
            className="form-textarea"
            rows="4"
            placeholder="Any specific requirements or preferences..."
            {...register('requirements')}
          />
        </div>
        
        {/* Submit Button */}
        <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
          {loading ? 'Submitting...' : 'Submit Inquiry'}
        </Button>
        
        <p className="form-note">
          🔒 Your information is safe with us. We'll never share it without your consent.
        </p>
      </form>
    </div>
  );
};

InquiryForm.propTypes = {
  tutorId: PropTypes.string,
  onSubmit: PropTypes.func,
  preSelectedSubject: PropTypes.string
};

export default InquiryForm;
