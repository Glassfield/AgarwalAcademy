import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { keywordSlugs } from '@/pages/seo/KeywordPages/keywordSlugs';
import { Helmet } from 'react-helmet-async';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '@/config/firebase';
import Button from '@/components/common/Button';
import OTPModal from './OTPModal';
import { submitInquiry } from '@/services/api/inquiryService';
import './EnquiryForm.css';

console.log('EnquiryForm loaded, auth object:', auth);

/**
 * Student Enquiry Form - Full Page Multi-Step
 * Redesigned as per README.md requirements
 * Mobile-first, distraction-free, high-conversion form
 */
const EnquiryForm = () => {
  const location = useLocation();
  // Parse topic from query string
  const params = new URLSearchParams(location.search);
  const topicParam = params.get('topic');
  // Only use topic if it's a valid keyword slug
  const validTopic = topicParam && keywordSlugs.includes(topicParam) ? topicParam : '';
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fillerName: '',
    class: '',
    classOther: '',
    board: '',
    boardOther: '',
    subjects: validTopic ? [validTopic] : [],
    subjectsOther: '',
    location: '',
    locationOther: '',
    coordinates: null,
    mobileNumber: ''
  });
  const [errors, setErrors] = useState({});
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Static dropdown options
  const CLASS_OPTIONS = [
    'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII',
    'JEE', 'NEET', 'BA', 'BCOM', 'BSc', 'BCom', 'CLAT', 'CUET', 'IELTS', 'Others (please specify)'
  ];

  const FOUNDATION_SUBJECTS = ['English', 'Hindi', 'Maths', 'Science', 'SST', 'EVS'];

  const SUBJECT_GROUPS = [
    {
      label: 'Foundation (Classes I–VIII)',
      emoji: '📚',
      allKey: '__all_foundation__',
      subjects: FOUNDATION_SUBJECTS
    },
    {
      label: 'Languages',
      emoji: '🌐',
      subjects: ['Sanskrit', 'French', 'Spanish', 'Spoken English']
    },
    {
      label: 'Science Stream (XI–XII / JEE / NEET)',
      emoji: '🔬',
      subjects: ['Maths', 'Physics', 'Chemistry', 'Biology']
    },
    {
      label: 'Commerce Stream (XI–XII / BCom)',
      emoji: '📊',
      subjects: ['Accounts', 'Business Studies', 'Economics', 'Corporate Accounting', 'Cost Accounting', 'Management Accounting', 'Tax', 'Finance', 'Statistics']
    },
    {
      label: 'Humanities (XI–XII)',
      emoji: '🏛️',
      subjects: ['Political Science', 'Psychology', 'Sociology', 'History', 'Geography']
    },
    {
      label: 'Computer & IT',
      emoji: '💻',
      subjects: ['Computer Science', 'Information Practice']
    },
  ];

  const BOARD_OPTIONS = ['CBSE', 'ICSE', 'IB', 'IGCSE', 'Others (please specify)'];

  const LOCATION_OPTIONS = [
    'Safdarjung Enclave', 'South Ex', 'GK', 'Vasant Kunj', 'Vasant Vihar',
    'Dhaula Kuan', 'Moti Bagh', 'RK Puram Sector 1', 'RK Puram Sector 2',
    'RK Puram Sector 3', 'RK Puram Sector 4', 'RK Puram Sector 5',
    'RK Puram Sector 6', 'RK Puram Sector 7', 'RK Puram Sector 8',
    'RK Puram Sector 9', 'RK Puram Sector 10', 'Nivedita Kunj',
    'RK Puram Sector 11', 'RK Puram Sector 12', 'RK Puram Sector 13',
    'Aradhna Enclave', 'Arjun Nagar', 'Krishna Nagar', 'Hauzkhas', 'Munirka',
    'Munirka Vihar', 'Munirka Enclave', 'Saket', 'Safdarjung Development Enclave',
    'Green Park', 'West End', 'Anand Niketan', 'Panchsheel', 'Sarvodya Enclave',
    'Kidwai Nagar', 'Sarojni Nagar', 'Mohammadpur', 'Humayupur', 'Ber Sarai',
    'Adchini', 'Katwaria Sarai', 'Azad Apartment', 'Malviya Nagar',
    'Defence Colony', 'Shankar Vihar', 'Anuj Vihar', 'Mahipalpur',
    'Delhi Cantt', 'Dwarka', 'Kalkaji', 'Andrews Gunj', 'Nanakpura',
    'Sainik Farm', 'Ladoo Sarai', 'Mehrauli', 'Satyaniketan', 'Other (please specify)'
  ];

  // Cleanup reCAPTCHA on unmount only
  useEffect(() => {
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

  const handleEnquiryForSelect = (id) => {
    setFormData(prev => ({
      ...prev,
      enquiryFor: id,
      studentName: id === 'self' ? prev.fillerName : ''
    }));
    setErrors(prev => ({ ...prev, enquiryFor: '' }));
  };

  const handleSubjectToggle = (id) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(id)
        ? prev.subjects.filter(s => s !== id)
        : [...prev.subjects, id]
    }));
    setErrors(prev => ({ ...prev, subjects: '' }));
  };

  const handleLocationSelect = (id) => {
    setFormData(prev => ({
      ...prev,
      location: id,
      coordinates: null
    }));
    setErrors(prev => ({ ...prev, location: '' }));
  };

  const handleUseCurrentLocation = () => {
    if ('geolocation' in navigator) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            location: 'current-location',
            coordinates: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          }));
          setErrors(prev => ({ ...prev, location: '' }));
          setLoading(false);
        },
        (error) => {
          console.error('Geolocation error:', error);
          alert('Please allow location permission or select area manually.');
          setLoading(false);
        }
      );
    } else {
      alert('Your browser does not support location.');
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.fillerName.trim()) {
        newErrors.fillerName = 'Please enter your name';
      }
    } else if (step === 2) {
      if (!formData.class) {
        newErrors.class = 'Please select a class';
      }
      if (formData.class === 'Others (please specify)' && !formData.classOther.trim()) {
        newErrors.classOther = 'Please specify the class';
      }
      if (!formData.board) {
        newErrors.board = 'Please select a board';
      }
      if (formData.board === 'Others (please specify)' && !formData.boardOther.trim()) {
        newErrors.boardOther = 'Please specify the board';
      }
      if (formData.subjects.length === 0) {
        newErrors.subjects = 'Please select at least one subject';
      }
      if (formData.subjects.includes('Others (please specify)') && !formData.subjectsOther.trim()) {
        newErrors.subjectsOther = 'Please specify the subject';
      }
    } else if (step === 3) {
      if (!formData.location) {
        newErrors.location = 'Please select a location';
      }
      if (formData.location === 'Other (please specify)' && !formData.locationOther.trim()) {
        newErrors.locationOther = 'Please specify your location';
      }
    } else if (step === 4) {
      if (!formData.mobileNumber.match(/^[6-9]\d{9}$/)) {
        newErrors.mobileNumber = 'Please enter a valid 10 digit mobile number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 5) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
    console.log('🚀 handleSendOTP called');
    console.log('Form data:', formData);
    console.log('Auth object exists:', !!auth);
    
    if (!validateStep(currentStep)) {
      console.log('❌ Validation failed at step', currentStep);
      return;
    }

    if (!auth) {
      console.log('❌ Auth is null - Firebase not initialized');
      alert('Firebase not configured. OTP verification unavailable.');
      // For demo, skip OTP and submit directly
      await handleFinalSubmit();
      return;
    }

    setLoading(true);
    const phoneNumber = `+91${formData.mobileNumber}`;
    console.log('📱 Attempting to send OTP to:', phoneNumber);

    try {
      // Ensure reCAPTCHA is initialized
      if (!window.recaptchaVerifier) {
        console.log('🔧 Initializing reCAPTCHA...');
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          'recaptcha-container',
          {
            size: 'invisible',
            callback: () => {
              console.log('reCAPTCHA verified');
            },
            'error-callback': () => {
              console.error('reCAPTCHA verification failed');
            }
          }
        );
      }
      
      const appVerifier = window.recaptchaVerifier;
      console.log('Sending OTP to:', phoneNumber);
      console.log('Auth object:', auth);
      console.log('AppVerifier:', appVerifier);
      
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(confirmation);
      setShowOTPModal(true);
      console.log('✅ OTP sent successfully');
    } catch (error) {
      console.error('❌ OTP send error (Full object):', error);
      console.error('Error code:', error?.code);
      console.error('Error message:', error?.message);
      
      // Clear reCAPTCHA on error for retry
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch (clearError) {
          console.error('Error clearing verifier:', clearError);
        }
        window.recaptchaVerifier = null;
      }
      
      // Provide more helpful error messages
      let errorMessage = 'There was a problem sending the OTP. Please try again.';
      
      const errorCode = error?.code || '';
      
      if (errorCode === 'auth/invalid-phone-number') {
        errorMessage = 'Invalid mobile number format. Please enter a 10 digit number.';
      } else if (errorCode === 'auth/too-many-requests') {
        errorMessage = 'Too many requests. Please try again later.';
      } else if (errorCode === 'auth/quota-exceeded') {
        errorMessage = 'SMS quota exceeded. Please try again later.';
      } else if (errorCode === 'auth/operation-not-allowed') {
        errorMessage = 'Firebase Phone Authentication is not enabled. Please contact admin.\n\nPlease enable Phone Authentication in Firebase Console:\nAuthentication → Sign-in method → Phone';
      } else if (errorCode === 'auth/unauthorized-domain') {
        errorMessage = 'OTP cannot be sent from this domain. Please contact admin.';
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
      alert('Incorrect OTP. Please try again.');
      setLoading(false);
    }
  };

  const handleResendOTP = () => {
    setShowOTPModal(false);
    handleSendOTP();
  };

  const handleFinalSubmit = async () => {
    setLoading(true);
    try {
      const submissionData = {
        studentName: formData.fillerName,
        parentName: '',
        phone: formData.mobileNumber,
        email: formData.email || '',
        subject: formData.subjects.includes('Others (please specify)')
          ? formData.subjects.filter(s => s !== 'Others (please specify)').concat(formData.subjectsOther ? [formData.subjectsOther] : []).join(', ')
          : formData.subjects.join(', '),
        class: formData.class === 'Others (please specify)' ? formData.classOther : formData.class,
        board: formData.board === 'Others (please specify)' ? formData.boardOther : formData.board,
        locality: formData.location === 'Other (please specify)' ? formData.locationOther : formData.location,
        message: `Board: ${formData.board === 'Others (please specify)' ? formData.boardOther : formData.board}`
      };

      const result = await submitInquiry(submissionData);
      
      if (result.success) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was a problem submitting the form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="enquiry-form-page">
        <Helmet>
          <title>Enquiry Submitted | Agarwal Academy</title>
        </Helmet>
        <div className="success-page">
          <div className="success-icon">✅</div>
          <h1>Thank you!</h1>
          <p className="success-message">
            Your form has been submitted successfully.
          </p>
          <p className="success-message">
            We will contact you shortly.
          </p>
          <div className="success-contact">
            <p className="success-contact-label">For immediate response, you can also call us:</p>
            <a href="tel:9958334586" className="success-phone">📞 9958334586</a>
            <a href="tel:9582300228" className="success-phone">📞 9582300228</a>
          </div>
          <Button variant="primary" onClick={() => window.location.href = '/'}>
            Go to Home Page
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="enquiry-form-page">
      <Helmet>
        <title>Student Enquiry Form | Agarwal Academy</title>
        <meta name="description" content="Find the perfect home tutor in South Delhi. Expert tutors for all classes and subjects." />
      </Helmet>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${(currentStep / 4) * 100}%` }} />
      </div>

      <div className="enquiry-container">
        {/* Step Indicator */}
        <div className="step-indicator">
          <span className="step-current">Step {currentStep}</span>
          <span className="step-total">of 4</span>
        </div>

        {/* Step 1: Name */}
        {currentStep === 1 && (
          <div className="form-step">
            <h1 className="step-title">What is your name?</h1>
            <p className="step-description">Please enter your full name</p>

            <input
              type="text"
              className={`full-input ${errors.fillerName ? 'error' : ''}`}
              placeholder="Your Full Name"
              value={formData.fillerName}
              onChange={(e) => {
                setFormData({ ...formData, fillerName: e.target.value });
                setErrors({ ...errors, fillerName: '' });
              }}
              autoFocus
            />
            {errors.fillerName && <div className="error-message">{errors.fillerName}</div>}
          </div>
        )}

        {/* Step 2: Class, Board & Subject Selection */}
        {currentStep === 2 && (
          <div className="form-step">
            <h1 className="step-title">Class, Board & Subject</h1>
            <p className="step-description">Tell us about the student's academic details</p>

            <label className="field-label">Select the student class</label>
            <select
              className={`select-input ${errors.class ? 'error' : ''}`}
              value={formData.class}
              onChange={(e) => {
                setFormData({ ...formData, class: e.target.value, classOther: '' });
                setErrors({ ...errors, class: '', classOther: '' });
              }}
            >
              <option value="">-- Select Class --</option>
              {CLASS_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {errors.class && <div className="error-message">{errors.class}</div>}
            {formData.class === 'Others (please specify)' && (
              <input
                type="text"
                className={`full-input ${errors.classOther ? 'error' : ''}`}
                placeholder="Please specify the class"
                value={formData.classOther}
                onChange={(e) => {
                  setFormData({ ...formData, classOther: e.target.value });
                  setErrors({ ...errors, classOther: '' });
                }}
              />
            )}
            {errors.classOther && <div className="error-message">{errors.classOther}</div>}

            <label className="field-label">Select Board</label>
            <select
              className={`select-input ${errors.board ? 'error' : ''}`}
              value={formData.board}
              onChange={(e) => {
                setFormData({ ...formData, board: e.target.value, boardOther: '' });
                setErrors({ ...errors, board: '', boardOther: '' });
              }}
            >
              <option value="">-- Select Board --</option>
              {BOARD_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {errors.board && <div className="error-message">{errors.board}</div>}
            {formData.board === 'Others (please specify)' && (
              <input
                type="text"
                className={`full-input ${errors.boardOther ? 'error' : ''}`}
                placeholder="Please specify the board"
                value={formData.boardOther}
                onChange={(e) => {
                  setFormData({ ...formData, boardOther: e.target.value });
                  setErrors({ ...errors, boardOther: '' });
                }}
              />
            )}
            {errors.boardOther && <div className="error-message">{errors.boardOther}</div>}

            <label className="field-label">Select Subjects <span className="field-label-hint">(select all that apply)</span></label>
            <div className="subject-groups">
              {SUBJECT_GROUPS.map(group => (
                <div key={group.label} className="subject-group">
                  <div className="subject-group-header">
                    <span className="subject-group-emoji">{group.emoji}</span>
                    <span className="subject-group-label">{group.label}</span>
                  </div>
                  <div className="subject-chips">
                    {group.allKey && (
                      <button
                        type="button"
                        className={`subject-chip ${FOUNDATION_SUBJECTS.every(s => formData.subjects.includes(s)) ? 'selected' : ''}`}
                        onClick={() => {
                          const allSelected = FOUNDATION_SUBJECTS.every(s => formData.subjects.includes(s));
                          const updated = allSelected
                            ? formData.subjects.filter(s => !FOUNDATION_SUBJECTS.includes(s))
                            : [...new Set([...formData.subjects, ...FOUNDATION_SUBJECTS])];
                          setFormData({ ...formData, subjects: updated });
                          setErrors({ ...errors, subjects: '' });
                        }}
                      >
                        {FOUNDATION_SUBJECTS.every(s => formData.subjects.includes(s)) && <span className="chip-check">✓</span>}
                        All Subjects
                      </button>
                    )}
                    {group.subjects.map(subj => (
                      <button
                        key={subj}
                        type="button"
                        className={`subject-chip ${formData.subjects.includes(subj) ? 'selected' : ''}`}
                        onClick={() => {
                          const current = formData.subjects;
                          const updated = current.includes(subj)
                            ? current.filter(s => s !== subj)
                            : [...current, subj];
                          setFormData({ ...formData, subjects: updated });
                          setErrors({ ...errors, subjects: '' });
                        }}
                      >
                        {formData.subjects.includes(subj) && <span className="chip-check">✓</span>}
                        {subj}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              {/* Others */}
              <div className="subject-group">
                <div className="subject-group-header">
                  <span className="subject-group-emoji">➕</span>
                  <span className="subject-group-label">Other</span>
                </div>
                <div className="subject-chips">
                  <button
                    type="button"
                    className={`subject-chip ${formData.subjects.includes('Others (please specify)') ? 'selected' : ''}`}
                    onClick={() => {
                      const current = formData.subjects;
                      const updated = current.includes('Others (please specify)')
                        ? current.filter(s => s !== 'Others (please specify)')
                        : [...current, 'Others (please specify)'];
                      setFormData({ ...formData, subjects: updated, subjectsOther: updated.includes('Others (please specify)') ? formData.subjectsOther : '' });
                      setErrors({ ...errors, subjects: '' });
                    }}
                  >
                    {formData.subjects.includes('Others (please specify)') && <span className="chip-check">✓</span>}
                    Others (please specify)
                  </button>
                </div>
              </div>
            </div>
            {errors.subjects && <div className="error-message">{errors.subjects}</div>}
            {formData.subjects.includes('Others (please specify)') && (
              <input
                type="text"
                className={`full-input ${errors.subjectsOther ? 'error' : ''}`}
                placeholder="Please specify the subject"
                value={formData.subjectsOther}
                onChange={(e) => {
                  setFormData({ ...formData, subjectsOther: e.target.value });
                  setErrors({ ...errors, subjectsOther: '' });
                }}
              />
            )}
            {errors.subjectsOther && <div className="error-message">{errors.subjectsOther}</div>}
            {formData.subjects.length > 0 && (
              <div className="selected-count">
                ✓ {formData.subjects.length} subject{formData.subjects.length > 1 ? 's' : ''} selected
              </div>
            )}
          </div>
        )}

        {/* Step 3: Location */}
        {currentStep === 3 && (
          <div className="form-step">
            <h1 className="step-title">Where do you live?</h1>
            <p className="step-description">Select your location in South Delhi</p>

            <select
              className={`select-input ${errors.location ? 'error' : ''}`}
              value={formData.location}
              onChange={(e) => {
                setFormData({ ...formData, location: e.target.value, locationOther: '' });
                setErrors({ ...errors, location: '', locationOther: '' });
              }}
            >
              <option value="">-- Select Location --</option>
              {LOCATION_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {errors.location && <div className="error-message">{errors.location}</div>}
            {formData.location === 'Other (please specify)' && (
              <input
                type="text"
                className={`full-input ${errors.locationOther ? 'error' : ''}`}
                placeholder="Please specify your location"
                value={formData.locationOther}
                onChange={(e) => {
                  setFormData({ ...formData, locationOther: e.target.value });
                  setErrors({ ...errors, locationOther: '' });
                }}
              />
            )}
            {errors.locationOther && <div className="error-message">{errors.locationOther}</div>}

            <div className="divider">
              <span>or</span>
            </div>

            <Button
              variant="outline"
              fullWidth
              onClick={handleUseCurrentLocation}
              loading={loading && !formData.location}
            >
              📍 Use My Current Location
            </Button>

            {formData.location === 'current-location' && formData.coordinates && (
              <div className="location-confirmed">
                ✓ Location detected successfully
              </div>
            )}
          </div>
        )}

        {/* Step 4: Mobile Number */}
        {currentStep === 4 && (
          <div className="form-step">
            <h1 className="step-title">Enter your Mobile Number</h1>
            <p className="step-description">We will verify with OTP</p>

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
              🔒 Your number is completely safe. We will only contact you to share tutor details.
            </div>

            <div id="recaptcha-container"></div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="form-actions">
          {currentStep > 1 && (
            <Button variant="outline" onClick={prevStep} size="lg">
              ← Back
            </Button>
          )}
          
          {currentStep < 4 ? (
            <Button variant="primary" onClick={nextStep} size="lg" fullWidth={currentStep === 1}>
              Continue →
            </Button>
          ) : (
            <Button 
              variant="primary" 
              onClick={handleSendOTP} 
              size="lg" 
              fullWidth
              loading={loading}
            >
              {loading ? 'Sending OTP...' : 'Send OTP & Submit'}
            </Button>
          )}
        </div>
      </div>

      {/* OTP Modal */}
      <OTPModal
        isOpen={showOTPModal}
        phoneNumber={`+91 ${formData.mobileNumber}`}
        onVerify={handleVerifyOTP}
        onResend={handleResendOTP}
        onClose={() => setShowOTPModal(false)}
        loading={loading}
      />
    </div>
  );
};

export default EnquiryForm;
