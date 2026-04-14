import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../common/Button';
import './OTPModal.css';

/**
 * OTP Modal Component
 * 6-digit OTP verification modal for Firebase Phone Authentication
 */
const OTPModal = ({ 
  isOpen, 
  phoneNumber, 
  onVerify, 
  onResend,
  onClose,
  loading = false 
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);

  useEffect(() => {
    if (isOpen) {
      // Focus first input when modal opens
      inputRefs.current[0]?.focus();
    }
  }, [isOpen]);

  const handleChange = (index, value) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Focus previous input on backspace
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'Enter' && otp.every(digit => digit)) {
      handleVerify();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setError('कृपया 6 अंकों का OTP दर्ज करें');
      return;
    }
    onVerify(otpCode);
  };

  const handleResend = () => {
    setOtp(['', '', '', '', '', '']);
    setError('');
    onResend();
    inputRefs.current[0]?.focus();
  };

  if (!isOpen) return null;

  return (
    <div className="otp-modal-overlay" onClick={onClose}>
      <div className="otp-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="modal-header">
          <div className="modal-icon">📱</div>
          <h2>OTP Verification</h2>
          <p>
            हमने <strong>{phoneNumber}</strong> पर एक 6 अंकों का OTP भेजा है
          </p>
        </div>

        <div className="otp-inputs" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="otp-input"
              aria-label={`OTP digit ${index + 1}`}
              disabled={loading}
            />
          ))}
        </div>

        {error && (
          <div className="otp-error">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        <div className="modal-actions">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleVerify}
            loading={loading}
            disabled={otp.some(digit => !digit)}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </Button>

          <button 
            className="resend-btn" 
            onClick={handleResend}
            disabled={loading}
          >
            OTP नहीं मिला? <strong>दोबारा भेजें</strong>
          </button>
        </div>

        <p className="modal-note">
          🔒 आपकी जानकारी सुरक्षित है और केवल सत्यापन के लिए उपयोग की जाएगी
        </p>
      </div>
    </div>
  );
};

OTPModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  onVerify: PropTypes.func.isRequired,
  onResend: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

export default OTPModal;
