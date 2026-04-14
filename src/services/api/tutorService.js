/**
 * Tutor Service
 * Handles tutor CRUD operations with the backend API
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
 * Get all tutors (Admin only)
 */
export const getAllTutors = async () => {
  try {
    const response = await api.get('/tutors');
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error fetching tutors:', error);
    throw {
      success: false,
      message: 'Failed to fetch tutors',
      error: error
    };
  }
};

/**
 * Get approved tutors only (Public)
 */
export const getApprovedTutors = async () => {
  try {
    const response = await api.get('/tutors/approved');
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error fetching approved tutors:', error);
    throw {
      success: false,
      message: 'Failed to fetch tutors',
      error: error
    };
  }
};

/**
 * Create new tutor
 */
export const createTutor = async (tutorData) => {
  try {
    const response = await api.post('/tutors', tutorData);
    return {
      success: true,
      data: response.data,
      message: 'Tutor registered successfully'
    };
  } catch (error) {
    console.error('Error creating tutor:', error);
    console.error('Error response:', error.response?.data);
    return {
      success: false,
      message: error.response?.data?.error || error.message || 'Failed to register tutor',
      error: error
    };
  }
};

/**
 * Update tutor
 */
export const updateTutor = async (tutorId, tutorData) => {
  try {
    const response = await api.put(`/tutors/${tutorId}`, tutorData);
    return {
      success: true,
      data: response.data,
      message: 'Tutor updated successfully'
    };
  } catch (error) {
    console.error('Error updating tutor:', error);
    throw {
      success: false,
      message: 'Failed to update tutor',
      error: error
    };
  }
};

/**
 * Delete tutor
 */
export const deleteTutor = async (tutorId) => {
  try {
    const response = await api.delete(`/tutors/${tutorId}`);
    return {
      success: true,
      message: 'Tutor deleted successfully'
    };
  } catch (error) {
    console.error('Error deleting tutor:', error);
    throw {
      success: false,
      message: 'Failed to delete tutor',
      error: error
    };
  }
};
