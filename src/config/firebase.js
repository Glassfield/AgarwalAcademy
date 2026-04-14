/**
 * Firebase Configuration
 * For Phone Authentication (OTP Verification)
 */

console.log('🔥 firebase.js module loaded');

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Validate Firebase configuration
const validateFirebaseConfig = () => {
  const requiredKeys = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID'
  ];
  
  console.log('🔍 Checking Firebase environment variables...');
  console.log('API Key:', import.meta.env.VITE_FIREBASE_API_KEY ? '✅ Found' : '❌ Missing');
  console.log('Auth Domain:', import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? '✅ Found' : '❌ Missing');
  console.log('Project ID:', import.meta.env.VITE_FIREBASE_PROJECT_ID ? '✅ Found' : '❌ Missing');
  
  const missingKeys = requiredKeys.filter(key => !import.meta.env[key]);
  
  if (missingKeys.length > 0) {
    console.error(
      '❌ Firebase configuration incomplete. Missing:',
      missingKeys.join(', ')
    );
    console.error('OTP verification will not work until Firebase is configured.');
    console.error('Please check your .env file and restart the dev server.');
    return false;
  }
  
  console.log('✅ All Firebase configuration found');
  return true;
};

// Initialize Firebase only if configuration is valid
let app = null;
let auth = null;

if (validateFirebaseConfig()) {
  try {
    console.log('🔥 Initializing Firebase...');
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    
    // Configure reCAPTCHA for phone auth
    auth.languageCode = 'hi'; // Hindi
    
    console.log('✅ Firebase initialized successfully');
    console.log('Auth object:', auth);
  } catch (error) {
    console.error('❌ Firebase initialization failed:', error);
  }
} else {
  console.error('❌ Skipping Firebase initialization due to missing configuration');
}

export { auth };
export default app;
