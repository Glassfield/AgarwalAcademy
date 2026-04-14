/**
 * Inquiry Service
 * Handles student inquiry submissions and email notifications
 */

import axios from 'axios';
import { API_CONFIG } from '@/config/constants';

const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Submit a new student inquiry
 * Saves to database and sends email to agarwalacademy29@gmail.com
 */
export const submitInquiry = async (inquiryData) => {
  try {
    const response = await api.post('/inquiries', inquiryData);
    return {
      success: true,
      data: response.data,
      message: 'Inquiry submitted successfully! We will contact you within 24 hours.'
    };
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    
    // Fallback: If API is not ready, store locally and simulate success
    if (error.code === 'ERR_NETWORK' || error.response?.status === 404) {
      // Store in localStorage for demo purposes
      const existingInquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
      const newInquiry = {
        ...inquiryData,
        id: Date.now().toString(),
        status: 'new',
        submittedAt: new Date().toISOString()
      };
      existingInquiries.push(newInquiry);
      localStorage.setItem('inquiries', JSON.stringify(existingInquiries));
      
      return {
        success: true,
        data: newInquiry,
        message: 'Inquiry submitted successfully! (Demo mode - stored locally)',
        isDemo: true
      };
    }
    
    throw {
      success: false,
      message: error.response?.data?.message || 'Failed to submit inquiry. Please try again.',
      error: error
    };
  }
};

/**
 * Get all inquiries (Admin only)
 */
export const getAllInquiries = async () => {
  try {
    const response = await api.get('/inquiries');
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    // Fallback: Load from localStorage if API not available
    if (error.code === 'ERR_NETWORK' || error.response?.status === 404) {
      const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
      return {
        success: true,
        data: inquiries,
        isDemo: true
      };
    }
    
    throw {
      success: false,
      message: 'Failed to fetch inquiries',
      error: error
    };
  }
};

/**
 * Update inquiry status (Admin only)
 */
export const updateInquiryStatus = async (inquiryId, status) => {
  try {
    const response = await api.patch(`/inquiries/${inquiryId}/status`, { status });
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    // Fallback: Update in localStorage
    if (error.code === 'ERR_NETWORK' || error.response?.status === 404) {
      const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
      const updatedInquiries = inquiries.map(inq => 
        inq.id === inquiryId ? { ...inq, status } : inq
      );
      localStorage.setItem('inquiries', JSON.stringify(updatedInquiries));
      
      return {
        success: true,
        data: { id: inquiryId, status },
        isDemo: true
      };
    }
    
    throw {
      success: false,
      message: 'Failed to update inquiry status',
      error: error
    };
  }
};

/**
 * Delete inquiry (Admin only)
 */
export const deleteInquiry = async (inquiryId) => {
  try {
    await api.delete(`/inquiries/${inquiryId}`);
    return {
      success: true,
      message: 'Inquiry deleted successfully'
    };
  } catch (error) {
    // Fallback: Delete from localStorage
    if (error.code === 'ERR_NETWORK' || error.response?.status === 404) {
      const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
      const updatedInquiries = inquiries.filter(inq => inq.id !== inquiryId);
      localStorage.setItem('inquiries', JSON.stringify(updatedInquiries));
      
      return {
        success: true,
        message: 'Inquiry deleted successfully (Demo mode)',
        isDemo: true
      };
    }
    
    throw {
      success: false,
      message: 'Failed to delete inquiry',
      error: error
    };
  }
};

export default {
  submitInquiry,
  getAllInquiries,
  updateInquiryStatus,
  deleteInquiry
};
