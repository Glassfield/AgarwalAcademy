import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '@/config/firebase';
import SelectionTile from '@/components/common/SelectionTile';
import Button from '@/components/common/Button';
import OTPModal from '@/components/students/OTPModal';
import { getAllOptions } from '@/services/api/optionsService';
import { createTutor } from '@/services/api/tutorService';
import './TutorRegistrationForm.css';

/**
 * Tutor Registration Form - Multi-Step with OTP
 * Privacy-focused tutor onboarding
 * @param {boolean} skipOTP - If true, skips mobile OTP verification (for admin use)
 */
const TutorRegistrationForm = ({ skipOTP = false }) => {
  const totalSteps = skipOTP ? 3 : 4;
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
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
    subjectOther: '',
    classes: [],
    experience: '',
    areas: [],
    aadharFile: null,
    panFile: null,
    mobileNumber: ''
  });
  const [errors, setErrors] = useState({});
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Load dynamic options from API
  const [dynamicOptions, setDynamicOptions] = useState({ subjects: [], classes: [], experience: [], areas: [] });
  
  useEffect(() => {
    loadOptions();
  }, []);
  
  const loadOptions = async () => {
    try {
      const result = await getAllOptions();
      if (result.success) {
        setDynamicOptions(result.data);
      }
    } catch (error) {
      console.error('Error loading options:', error);
    }
  };
  
  // Add color mapping for dynamic options
  const colors = ['blue', 'green', 'purple', 'orange', 'teal', 'pink', 'indigo', 'red'];
  const addColors = (options) => options.map((opt, idx) => ({ ...opt, color: colors[idx % colors.length] }));

  const SUBJECT_OPTIONS = addColors(dynamicOptions.subjects || []);
  const CLASS_OPTIONS = addColors(dynamicOptions.classes || []);
  const EXPERIENCE_OPTIONS = addColors(dynamicOptions.experience || []);
  const AREA_OPTIONS = addColors(dynamicOptions.areas || []);

  // Options
  const GENDER_OPTIONS = [
    { id: 'male', label: 'Male', icon: '👨', color: 'blue' },
    { id: 'female', label: 'Female', icon: '👩', color: 'pink' },
    { id: 'other', label: 'Other', icon: '🧑', color: 'purple' }
  ];

  const AGE_OPTIONS = [
    { id: '18-25', label: '18-25 years', color: 'blue' },
    { id: '26-35', label: '26-35 years', color: 'green' },
    { id: '36-45', label: '36-45 years', color: 'orange' },
    { id: '46+', label: '46+ years', color: 'purple' }
  ];

  // Cleanup reCAPTCHA on unmount
  useState(() => {
    return () => {
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch (e) {
          console.error('Error clearing recaptcha:', e);
        }
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Please enter your full name';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Please enter your date of birth';
      if (!formData.gender) newErrors.gender = 'Please select your gender';
      if (!formData.currentAddressLine1.trim()) newErrors.currentAddressLine1 = 'Please enter address line 1';
      if (!formData.currentCity.trim()) newErrors.currentCity = 'Please enter city';
      if (!formData.currentState.trim()) newErrors.currentState = 'Please enter state';
      if (!/^[0-9]{6}$/.test(formData.currentPinCode)) newErrors.currentPinCode = 'Please enter valid 6-digit PIN code';
      if (!formData.permanentAddressLine1.trim()) newErrors.permanentAddressLine1 = 'Please enter address line 1';
      if (!formData.permanentCity.trim()) newErrors.permanentCity = 'Please enter city';
      if (!formData.permanentState.trim()) newErrors.permanentState = 'Please enter state';
      if (!/^[0-9]{6}$/.test(formData.permanentPinCode)) newErrors.permanentPinCode = 'Please enter valid 6-digit PIN code';
    } else if (step === 2) {
      if (formData.subjects.length === 0) newErrors.subjects = 'Please select at least one subject';
      if (formData.classes.length === 0) newErrors.classes = 'Please select at least one class';
      if (!formData.experience) newErrors.experience = 'Please select your experience';
    } else if (step === 3) {
      if (formData.areas.length === 0) newErrors.areas = 'Please select at least one area';
      if (!formData.aadharFile) newErrors.aadharFile = 'Please upload Aadhar card';
    } else if (step === 4) {
      if (!/^[0-9]{10}$/.test(formData.mobileNumber)) {
        newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (skipOTP && currentStep === 3) {
        // Admin mode - submit directly without OTP
        handleFinalSubmit();
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSendOTP = async () => {
    if (!validateStep(4)) return;

    if (!auth) {
      alert('Firebase not configured. OTP verification unavailable.');
      await handleFinalSubmit();
      return;
    }

    setLoading(true);
    const phoneNumber = `+91${formData.mobileNumber}`;

    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          'recaptcha-container',
          {
            size: 'invisible',
            callback: () => console.log('reCAPTCHA verified')
          }
        );
      }

      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
      setConfirmationResult(confirmation);
      setShowOTPModal(true);
    } catch (error) {
      console.error('OTP send error:', error);
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch (clearError) {
          console.error('Error clearing verifier:', clearError);
        }
        window.recaptchaVerifier = null;
      }

      const errorCode = error?.code || '';
      let errorMessage = 'There was a problem sending the OTP. Please try again.';
      
      if (errorCode === 'auth/invalid-phone-number') {
        errorMessage = 'Invalid mobile number format. Please enter a 10 digit number.';
      } else if (errorCode === 'auth/operation-not-allowed') {
        errorMessage = 'Firebase Phone Authentication is not enabled.';
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (otpCode) => {
    setLoading(true);
    try {
      await confirmationResult.confirm(otpCode);
      setShowOTPModal(false);
      await handleFinalSubmit();
    } catch (error) {
      console.error('OTP verification error:', error);
      alert('Invalid OTP. Please enter the correct OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleFinalSubmit = async () => {
    setLoading(true);
    try {
      // Prepare tutor data for API
      const tutorData = {
        fullName: formData.fullName,
        displayName: formData.fullName.split(' ')[0], // Use first name as display name
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        mobileNumber: formData.mobileNumber || '',
        currentAddressLine1: formData.currentAddressLine1,
        currentAddressLine2: formData.currentAddressLine2 || '',
        currentCity: formData.currentCity,
        currentState: formData.currentState,
        currentPinCode: formData.currentPinCode,
        permanentAddressLine1: formData.permanentAddressLine1,
        permanentAddressLine2: formData.permanentAddressLine2 || '',
        permanentCity: formData.permanentCity,
        permanentState: formData.permanentState,
        permanentPinCode: formData.permanentPinCode,
        subjects: formData.subjects,
        classes: formData.classes,
        experience: formData.experience,
        areas: formData.areas,
        aadharFile: formData.aadharFile?.name || '',
        panFile: formData.panFile?.name || ''
      };
      
      console.log('Submitting tutor data:', tutorData);
      
      // Submit to API
      const result = await createTutor(tutorData);
      
      console.log('API response:', result);
      
      if (result.success) {
        setSubmitted(true);
      } else {
        alert(result.message || 'Failed to register tutor');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectToggle = (id) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(id)
        ? prev.subjects.filter(s => s !== id)
        : [...prev.subjects, id]
    }));
    setErrors({ ...errors, subjects: '' });
  };

  const handleClassToggle = (id) => {
    setFormData(prev => ({
      ...prev,
      classes: prev.classes.includes(id)
        ? prev.classes.filter(c => c !== id)
        : [...prev.classes, id]
    }));
    setErrors({ ...errors, classes: '' });
  };

  const handleAreaToggle = (id) => {
    setFormData(prev => ({
      ...prev,
      areas: prev.areas.includes(id)
        ? prev.areas.filter(a => a !== id)
        : [...prev.areas, id]
    }));
    setErrors({ ...errors, areas: '' });
  };

  if (submitted) {
    return (
      <div className="success-page">
        <Helmet>
          <title>Registration Successful | Agarwal Academy</title>
        </Helmet>
        <div className="success-icon">🎉</div>
        <h1>Registration Successful!</h1>
        <p className="success-message">
          {skipOTP 
            ? 'Tutor has been registered successfully by admin.'
            : 'Thank you for registering! Our admin team will review your profile and contact you within 24-48 hours.'}
        </p>
        {!skipOTP && formData.mobileNumber && (
          <p className="success-mobile">
            Registered mobile: +91 {formData.mobileNumber}
          </p>
        )}
        {!skipOTP && (
          <Button to="/" variant="primary" size="lg">
            Back to Home
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="tutor-form-page">
      <Helmet>
        <title>{`Tutor Registration - Step ${currentStep} of ${totalSteps} | Agarwal Academy`}</title>
      </Helmet>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${(currentStep / totalSteps) * 100}%` }} />
      </div>

      <div className="tutor-container">
        <div className="step-indicator">
          <span className="step-current">Step {currentStep}</span>
          <span className="step-total"> / {totalSteps}</span>
        </div>

        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <div className="form-step">
            <h1 className="step-title">Personal Information</h1>
            <p className="step-description">Your personal information</p>

            <div style={{ marginBottom: '1rem' }}>
              <label className="field-label">Full Name *</label>
              <input
                type="text"
                className={`full-input ${errors.fullName ? 'error' : ''}`}
                placeholder="Enter your full name as per Aadhar"
                value={formData.fullName}
                onChange={(e) => {
                  setFormData({ ...formData, fullName: e.target.value });
                  setErrors({ ...errors, fullName: '' });
                }}
              />
              {errors.fullName && <div className="error-message">{errors.fullName}</div>}
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label className="field-label">Date of Birth *</label>
              <input
                type="date"
                className={`full-input ${errors.dateOfBirth ? 'error' : ''}`}
                value={formData.dateOfBirth}
                max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                onChange={(e) => {
                  setFormData({ ...formData, dateOfBirth: e.target.value });
                  setErrors({ ...errors, dateOfBirth: '' });
                }}
              />
              {errors.dateOfBirth && <div className="error-message">{errors.dateOfBirth}</div>}
            </div>

            <h2 className="step-subtitle">Gender *</h2>
            <div className="tiles-grid-rows">
              {GENDER_OPTIONS.map(option => (
                <SelectionTile
                  key={option.id}
                  {...option}
                  selected={formData.gender === option.id}
                  onClick={(id) => {
                    setFormData({ ...formData, gender: id });
                    setErrors({ ...errors, gender: '' });
                  }}
                  size="medium"
                />
              ))}
            </div>
            {errors.gender && <div className="error-message">{errors.gender}</div>}

            <h2 className="step-subtitle" style={{ marginTop: '1.5rem' }}>Current Address *</h2>
            
            <div style={{ marginBottom: '1rem' }}>
              <label className="field-label">Address Line 1 *</label>
              <input
                type="text"
                className={`full-input ${errors.currentAddressLine1 ? 'error' : ''}`}
                placeholder="House/Flat No., Building Name"
                value={formData.currentAddressLine1}
                onChange={(e) => {
                  setFormData({ ...formData, currentAddressLine1: e.target.value });
                  setErrors({ ...errors, currentAddressLine1: '' });
                }}
              />
              {errors.currentAddressLine1 && <div className="error-message">{errors.currentAddressLine1}</div>}
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label className="field-label">Address Line 2</label>
              <input
                type="text"
                className="full-input"
                placeholder="Street Name, Area, Locality"
                value={formData.currentAddressLine2}
                onChange={(e) => setFormData({ ...formData, currentAddressLine2: e.target.value })}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label className="field-label">City *</label>
                <input
                  type="text"
                  className={`full-input ${errors.currentCity ? 'error' : ''}`}
                  placeholder="City"
                  value={formData.currentCity}
                  onChange={(e) => {
                    setFormData({ ...formData, currentCity: e.target.value });
                    setErrors({ ...errors, currentCity: '' });
                  }}
                />
                {errors.currentCity && <div className="error-message">{errors.currentCity}</div>}
              </div>
              <div>
                <label className="field-label">State *</label>
                <input
                  type="text"
                  className={`full-input ${errors.currentState ? 'error' : ''}`}
                  placeholder="State"
                  value={formData.currentState}
                  onChange={(e) => {
                    setFormData({ ...formData, currentState: e.target.value });
                    setErrors({ ...errors, currentState: '' });
                  }}
                />
                {errors.currentState && <div className="error-message">{errors.currentState}</div>}
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label className="field-label">Pin Code *</label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                className={`full-input ${errors.currentPinCode ? 'error' : ''}`}
                placeholder="6-digit PIN code"
                value={formData.currentPinCode}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  setFormData({ ...formData, currentPinCode: value });
                  setErrors({ ...errors, currentPinCode: '' });
                }}
              />
              {errors.currentPinCode && <div className="error-message">{errors.currentPinCode}</div>}
            </div>

            <h2 className="step-subtitle" style={{ marginTop: '1.5rem' }}>Permanent Address *</h2>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData({
                        ...formData,
                        permanentAddressLine1: formData.currentAddressLine1,
                        permanentAddressLine2: formData.currentAddressLine2,
                        permanentCity: formData.currentCity,
                        permanentState: formData.currentState,
                        permanentPinCode: formData.currentPinCode
                      });
                    }
                  }}
                />
                Same as current address
              </label>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label className="field-label">Address Line 1 *</label>
              <input
                type="text"
                className={`full-input ${errors.permanentAddressLine1 ? 'error' : ''}`}
                placeholder="House/Flat No., Building Name"
                value={formData.permanentAddressLine1}
                onChange={(e) => {
                  setFormData({ ...formData, permanentAddressLine1: e.target.value });
                  setErrors({ ...errors, permanentAddressLine1: '' });
                }}
              />
              {errors.permanentAddressLine1 && <div className="error-message">{errors.permanentAddressLine1}</div>}
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label className="field-label">Address Line 2</label>
              <input
                type="text"
                className="full-input"
                placeholder="Street Name, Area, Locality"
                value={formData.permanentAddressLine2}
                onChange={(e) => setFormData({ ...formData, permanentAddressLine2: e.target.value })}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label className="field-label">City *</label>
                <input
                  type="text"
                  className={`full-input ${errors.permanentCity ? 'error' : ''}`}
                  placeholder="City"
                  value={formData.permanentCity}
                  onChange={(e) => {
                    setFormData({ ...formData, permanentCity: e.target.value });
                    setErrors({ ...errors, permanentCity: '' });
                  }}
                />
                {errors.permanentCity && <div className="error-message">{errors.permanentCity}</div>}
              </div>
              <div>
                <label className="field-label">State *</label>
                <input
                  type="text"
                  className={`full-input ${errors.permanentState ? 'error' : ''}`}
                  placeholder="State"
                  value={formData.permanentState}
                  onChange={(e) => {
                    setFormData({ ...formData, permanentState: e.target.value });
                    setErrors({ ...errors, permanentState: '' });
                  }}
                />
                {errors.permanentState && <div className="error-message">{errors.permanentState}</div>}
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label className="field-label">Pin Code *</label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                className={`full-input ${errors.permanentPinCode ? 'error' : ''}`}
                placeholder="6-digit PIN code"
                value={formData.permanentPinCode}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  setFormData({ ...formData, permanentPinCode: value });
                  setErrors({ ...errors, permanentPinCode: '' });
                }}
              />
              {errors.permanentPinCode && <div className="error-message">{errors.permanentPinCode}</div>}
            </div>
          </div>
        )}

        {/* Step 2: Teaching Details */}
        {currentStep === 2 && (
          <div className="form-step">
            <h1 className="step-title">What do you teach?</h1>
            <p className="step-description">Subjects, classes, and experience</p>

            <h2 className="step-subtitle">Subjects (select multiple) *</h2>
            <div className="tiles-grid-rows">
              {SUBJECT_OPTIONS.map(option => (
                <SelectionTile
                  key={option.id}
                  {...option}
                  selected={formData.subjects.includes(option.id)}
                  onClick={handleSubjectToggle}
                  size="medium"
                />
              ))}
            </div>
            {errors.subjects && <div className="error-message">{errors.subjects}</div>}

            {formData.subjects.includes('other') && (
              <div style={{ marginTop: '1rem' }}>
                <input
                  type="text"
                  className="full-input"
                  placeholder="Specify your subject"
                  value={formData.subjectOther}
                  onChange={(e) => setFormData({ ...formData, subjectOther: e.target.value })}
                />
              </div>
            )}

            {formData.subjects.length > 0 && (
              <div className="selected-count">
                ✓ {formData.subjects.length} subject{formData.subjects.length > 1 ? 's' : ''} selected
              </div>
            )}

            <h2 className="step-subtitle">Classes (select multiple) *</h2>
            <div className="tiles-grid-rows">
              {CLASS_OPTIONS.map(option => (
                <SelectionTile
                  key={option.id}
                  {...option}
                  selected={formData.classes.includes(option.id)}
                  onClick={handleClassToggle}
                  size="medium"
                />
              ))}
            </div>
            {errors.classes && <div className="error-message">{errors.classes}</div>}

            {formData.classes.length > 0 && (
              <div className="selected-count">
                ✓ {formData.classes.length} class{formData.classes.length > 1 ? 'es' : ''} selected
              </div>
            )}

            <h2 className="step-subtitle">Teaching Experience *</h2>
            <div className="tiles-grid-rows">
              {EXPERIENCE_OPTIONS.map(option => (
                <SelectionTile
                  key={option.id}
                  {...option}
                  selected={formData.experience === option.id}
                  onClick={(id) => {
                    setFormData({ ...formData, experience: id });
                    setErrors({ ...errors, experience: '' });
                  }}
                  size="medium"
                />
              ))}
            </div>
            {errors.experience && <div className="error-message">{errors.experience}</div>}
          </div>
        )}

        {/* Step 3: Documents & Location */}
        {currentStep === 3 && (
          <div className="form-step">
            <h1 className="step-title">Documents and Location</h1>
            <p className="step-description">KYC documents and preferred teaching areas</p>

            <h2 className="step-subtitle">Preferred Teaching Areas (select multiple) *</h2>
            <div className="tiles-grid-rows">
              {AREA_OPTIONS.map(option => (
                <SelectionTile
                  key={option.id}
                  {...option}
                  selected={formData.areas.includes(option.id)}
                  onClick={handleAreaToggle}
                  size="medium"
                />
              ))}
            </div>
            {errors.areas && <div className="error-message">{errors.areas}</div>}

            {formData.areas.length > 0 && (
              <div className="selected-count">
                ✓ {formData.areas.length} area{formData.areas.length > 1 ? 's' : ''} selected
              </div>
            )}

            <div style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
              <label className="field-label">Aadhar Card Upload *</label>
              <input
                type="file"
                accept="image/*,application/pdf"
                className={`full-input ${errors.aadharFile ? 'error' : ''}`}
                onChange={(e) => {
                  setFormData({ ...formData, aadharFile: e.target.files[0] });
                  setErrors({ ...errors, aadharFile: '' });
                }}
              />
              {errors.aadharFile && <div className="error-message">{errors.aadharFile}</div>}
              <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                Upload scanned copy or photo of Aadhar card (JPG, PNG, or PDF)
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label className="field-label">PAN Card Upload (Optional)</label>
              <input
                type="file"
                accept="image/*,application/pdf"
                className="full-input"
                onChange={(e) => {
                  setFormData({ ...formData, panFile: e.target.files[0] });
                }}
              />
              <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                Optional but recommended for verification
              </div>
            </div>

            <div className="privacy-note">
              🔒 All documents are encrypted and stored securely. Only used for verification purposes.
            </div>
          </div>
        )}

        {/* Step 4: Mobile & OTP */}
        {!skipOTP && currentStep === 4 && (
          <div className="form-step">
            <h1 className="step-title">Mobile Number Verification</h1>
            <p className="step-description">Complete registration by verifying with OTP</p>

            <div className="phone-input-wrapper">
              <span className="country-code">+91</span>
              <input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                className={`phone-input ${errors.mobileNumber ? 'error' : ''}`}
                placeholder="9876543210"
                value={formData.mobileNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  setFormData({ ...formData, mobileNumber: value });
                  setErrors({ ...errors, mobileNumber: '' });
                }}
                autoFocus
              />
            </div>
            {errors.mobileNumber && <div className="error-message">{errors.mobileNumber}</div>}

            <div className="privacy-note">
              🔒 Your number will remain completely private. It will only be used for admin verification.
            </div>

            <div id="recaptcha-container"></div>
          </div>
        )}

        {/* Navigation */}
        <div className="form-actions">
          {currentStep > 1 && (
            <Button variant="outline" onClick={prevStep} size="lg">
              ← Back
            </Button>
          )}
          
          {currentStep < totalSteps ? (
            <Button variant="primary" onClick={nextStep} size="lg" fullWidth={currentStep === 1}>
              {skipOTP && currentStep === 3 ? 'Submit & Register' : 'Continue →'}
            </Button>
          ) : !skipOTP && (
            <Button 
              variant="primary" 
              onClick={handleSendOTP} 
              size="lg" 
              fullWidth
              loading={loading}
            >
              {loading ? 'Sending OTP...' : 'Send OTP & Register'}
            </Button>
          )}
        </div>
      </div>

      {/* OTP Modal */}
      {!skipOTP && (
        <OTPModal
          isOpen={showOTPModal}
          phoneNumber={`+91 ${formData.mobileNumber}`}
          onClose={() => setShowOTPModal(false)}
          onVerify={handleVerifyOTP}
          onResend={handleSendOTP}
          loading={loading}
        />
      )}
    </div>
  );
};

export default TutorRegistrationForm;
