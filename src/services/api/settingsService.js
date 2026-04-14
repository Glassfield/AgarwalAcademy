/**
 * Settings Service
 * Handles application settings CRUD operations
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
 * Get all settings
 */
export const getAllSettings = async () => {
  try {
    const response = await api.get('/settings');
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error fetching settings:', error);
    return {
      success: false,
      message: 'Failed to fetch settings',
      error: error
    };
  }
};

/**
 * Update a specific setting
 */
export const updateSetting = async (key, value) => {
  try {
    const response = await api.put(`/settings/${key}`, { value });
    return {
      success: true,
      data: response.data,
      message: 'Setting updated successfully'
    };
  } catch (error) {
    console.error('Error updating setting:', error);
    return {
      success: false,
      message: error.response?.data?.error || 'Failed to update setting',
      error: error
    };
  }
};
