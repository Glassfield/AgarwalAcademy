import React, { useState, useEffect } from 'react';
import { getAllSettings } from '@/services/api/settingsService';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay loading to prevent blocking app initialization
    const timer = setTimeout(() => {
      loadSettings();
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const loadSettings = async () => {
    try {
      const result = await getAllSettings();
      if (result?.success && result?.data?.whatsappNumber) {
        setWhatsappNumber(result.data.whatsappNumber);
        setIsVisible(true);
      }
    } catch (error) {
      // Silently fail - button just won't appear
    }
  };

  const handleClick = () => {
    if (!whatsappNumber) return;
    
    // Remove any non-numeric characters except +
    const cleanNumber = whatsappNumber.replace(/[^\d+]/g, '');
    
    // Open WhatsApp chat
    const url = `https://wa.me/${cleanNumber}`;
    window.open(url, '_blank');
  };

  // Don't render if no number is configured
  if (!isVisible || !whatsappNumber) {
    return null;
  }

  return (
    <button 
      className="whatsapp-float-button" 
      onClick={handleClick}
      aria-label="Chat on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <svg 
        viewBox="0 0 32 32" 
        xmlns="http://www.w3.org/2000/svg"
        className="whatsapp-icon"
      >
        <path
          fill="currentColor"
          d="M16 0c-8.837 0-16 7.163-16 16 0 2.825 0.737 5.607 2.137 8.048l-2.137 7.952 7.933-2.127c2.42 1.37 5.173 2.127 8.067 2.127 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.467c-2.482 0-4.908-0.646-7.07-1.87l-0.507-0.292-5.247 1.414 1.414-5.247-0.292-0.507c-1.224-2.162-1.87-4.588-1.87-7.07 0-7.72 6.28-14 14-14s14 6.28 14 14-6.28 14-14 14z"
        />
        <path
          fill="currentColor"
          d="M23.547 19.507c-0.267-0.133-1.573-0.773-1.813-0.867-0.24-0.093-0.413-0.133-0.587 0.133s-0.667 0.867-0.827 1.040c-0.16 0.173-0.32 0.2-0.587 0.067s-1.147-0.427-2.173-1.36c-0.8-0.72-1.347-1.613-1.507-1.88s-0.013-0.413 0.12-0.547c0.12-0.12 0.267-0.32 0.4-0.48s0.173-0.267 0.267-0.44c0.093-0.173 0.040-0.333-0.027-0.467s-0.587-1.413-0.8-1.933c-0.213-0.52-0.427-0.44-0.587-0.453-0.16-0.013-0.333-0.013-0.507-0.013s-0.467 0.067-0.707 0.333c-0.24 0.267-0.933 0.907-0.933 2.213s0.96 2.56 1.093 2.733c0.133 0.173 1.867 2.853 4.533 4 2.667 1.147 2.667 0.76 3.147 0.72s1.573-0.64 1.787-1.267c0.213-0.627 0.213-1.16 0.147-1.267s-0.227-0.173-0.493-0.307z"
        />
      </svg>
    </button>
  );
};

export default WhatsAppButton;
