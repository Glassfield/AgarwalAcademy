/**
 * Form Options Service
 * Handles form options (subjects, classes, experience, areas) CRUD operations
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
 * Get all form options
 */
export const getAllOptions = async () => {
  try {
    const response = await api.get('/options');
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error fetching options:', error);
    throw {
      success: false,
      message: 'Failed to fetch options',
      error: error
    };
  }
};

/**
 * Add new option
 */
export const addOption = async (category, optionId, label) => {
  try {
    const response = await api.post('/options', { category, optionId, label });
    return {
      success: true,
      data: response.data,
      message: 'Option added successfully'
    };
  } catch (error) {
    console.error('Error adding option:', error);
    throw {
      success: false,
      message: error.response?.data?.error || 'Failed to add option',
      error: error
    };
  }
};

/**
 * Delete option
 */
export const deleteOption = async (category, optionId) => {
  try {
    const response = await api.delete(`/options/${category}/${optionId}`);
    return {
      success: true,
      message: 'Option deleted successfully'
    };
  } catch (error) {
    console.error('Error deleting option:', error);
    throw {
      success: false,
      message: 'Failed to delete option',
      error: error
    };
  }
};
