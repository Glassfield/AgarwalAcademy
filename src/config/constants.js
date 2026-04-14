/**
 * Application Constants
 * Central configuration for classes, subjects, boards, and Indian education system
 */

// Classes offered (1st to 12th)
export const CLASSES = [
  { value: '1', label: 'Class 1' },
  { value: '2', label: 'Class 2' },
  { value: '3', label: 'Class 3' },
  { value: '4', label: 'Class 4' },
  { value: '5', label: 'Class 5' },
  { value: '6', label: 'Class 6' },
  { value: '7', label: 'Class 7' },
  { value: '8', label: 'Class 8' },
  { value: '9', label: 'Class 9' },
  { value: '10', label: 'Class 10' },
  { value: '11', label: 'Class 11' },
  { value: '12', label: 'Class 12' }
];

// Academic Boards
export const BOARDS = [
  { value: 'CBSE', label: 'CBSE' },
  { value: 'ICSE', label: 'ICSE' },
  { value: 'State Board', label: 'State Board' },
  { value: 'IB', label: 'IB (International Baccalaureate)' },
  { value: 'IGCSE', label: 'IGCSE (Cambridge)' }
];

// Subjects
export const SUBJECTS = {
  core: [
    { value: 'Mathematics', label: 'Mathematics', icon: '🔢' },
    { value: 'Physics', label: 'Physics', icon: '⚛️' },
    { value: 'Chemistry', label: 'Chemistry', icon: '🧪' },
    { value: 'Biology', label: 'Biology', icon: '🧬' },
    { value: 'English', label: 'English', icon: '📚' },
    { value: 'Hindi', label: 'Hindi', icon: '🇮🇳' },
    { value: 'Social Science', label: 'Social Science', icon: '🌍' },
    { value: 'Computer Science', label: 'Computer Science', icon: '💻' }
  ],
  languages: [
    { value: 'French', label: 'French', icon: '🇫🇷' },
    { value: 'German', label: 'German', icon: '🇩🇪' },
    { value: 'Russian', label: 'Russian', icon: '🇷🇺' },
    { value: 'Sanskrit', label: 'Sanskrit', icon: '📜' }
  ],
  commerce: [
    { value: 'Accountancy', label: 'Accountancy', icon: '📊' },
    { value: 'Business Studies', label: 'Business Studies', icon: '💼' },
    { value: 'Economics', label: 'Economics', icon: '💰' }
  ]
};

// All subjects flattened
export const ALL_SUBJECTS = [
  ...SUBJECTS.core,
  ...SUBJECTS.languages,
  ...SUBJECTS.commerce
];

// Competitive Exams
export const COMPETITIVE_EXAMS = [
  { value: 'IIT-JEE', label: 'IIT-JEE (Engineering)' },
  { value: 'NEET', label: 'NEET (Medical)' },
  { value: 'NDA', label: 'NDA (Defence)' },
  { value: 'Foundation', label: 'Foundation Courses' }
];

// South Delhi Localities
export const SOUTH_DELHI_LOCALITIES = [
  'Greater Kailash I',
  'Greater Kailash II',
  'Hauz Khas',
  'Saket',
  'Vasant Kunj',
  'Defence Colony',
  'Lajpat Nagar',
  'Green Park',
  'Malviya Nagar',
  'R.K. Puram',
  'Safdarjung Enclave',
  'Vasant Vihar',
  'Chanakyapuri',
  'Nehru Place',
  'Kalkaji',
  'Maharani Bagh',
  'Jangpura',
  'South Extension I',
  'South Extension II',
  'Panchsheel Park',
  'Kotla Mubarakpur',
  'Chirag Delhi',
  'East of Kailash',
  'Friends Colony',
  'Lajpat Nagar',
  'CR Park',
  'Kalkaji Extension'
];

// Gender Options
export const GENDER_OPTIONS = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Any', label: 'Any' }
];

// Age Groups for Tutors
export const AGE_GROUPS = [
  { value: '20-25', label: '20-25 years' },
  { value: '26-30', label: '26-30 years' },
  { value: '31-40', label: '31-40 years' },
  { value: '40+', label: '40+ years' }
];

// Experience Ranges
export const EXPERIENCE_RANGES = [
  { value: '0-2', label: '0-2 years' },
  { value: '2-5', label: '2-5 years' },
  { value: '5-10', label: '5-10 years' },
  { value: '10+', label: '10+ years' }
];

// Teaching Modes (All home-based per README)
export const TEACHING_MODES = [
  { value: 'home', label: 'At Student\'s Home', default: true }
];

// Weekly Availability
export const DAYS_OF_WEEK = [
  { value: 'Monday', label: 'Monday' },
  { value: 'Tuesday', label: 'Tuesday' },
  { value: 'Wednesday', label: 'Wednesday' },
  { value: 'Thursday', label: 'Thursday' },
  { value: 'Friday', label: 'Friday' },
  { value: 'Saturday', label: 'Saturday' },
  { value: 'Sunday', label: 'Sunday' }
];

// Time Slots
export const TIME_SLOTS = [
  { value: 'morning', label: 'Morning (6 AM - 12 PM)' },
  { value: 'afternoon', label: 'Afternoon (12 PM - 5 PM)' },
  { value: 'evening', label: 'Evening (5 PM - 9 PM)' }
];

// Tutor Status
export const TUTOR_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  SUSPENDED: 'suspended'
};

// Inquiry Status
export const INQUIRY_STATUS = {
  NEW: 'new',
  CONTACTED: 'contacted',
  MATCHED: 'matched',
  CLOSED: 'closed'
};

// Contact Information (Admin Configurable)
export const CONTACT_INFO = {
  phone1: '9958334586',
  phone2: '9582300228',
  email: 'agarwalacademy29@gmail.com',
  address: 'B-801, Urbtech Trade Center, Sector-132, Noida – 201304, Uttar Pradesh, India',
  timings: 'Monday to Saturday, 09:00 AM – 09:00 PM'
};

// API Configuration
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000
};

// File Upload Limits
export const UPLOAD_LIMITS = {
  maxAudioSize: (parseInt(import.meta.env.VITE_MAX_AUDIO_SIZE_MB) || 5) * 1024 * 1024, // 5MB
  maxDocumentSize: (parseInt(import.meta.env.VITE_MAX_DOCUMENT_SIZE_MB) || 10) * 1024 * 1024, // 10MB
  allowedAudioFormats: ['audio/mp3', 'audio/wav', 'audio/mpeg', 'audio/webm'],
  allowedDocumentFormats: ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
};

// Feature Flags
export const FEATURES = {
  enableWhatsApp: import.meta.env.VITE_ENABLE_WHATSAPP === 'true',
  enableAIFeatures: import.meta.env.VITE_ENABLE_AI_FEATURES === 'true'
};

export default {
  CLASSES,
  BOARDS,
  SUBJECTS,
  ALL_SUBJECTS,
  COMPETITIVE_EXAMS,
  SOUTH_DELHI_LOCALITIES,
  GENDER_OPTIONS,
  AGE_GROUPS,
  EXPERIENCE_RANGES,
  TEACHING_MODES,
  DAYS_OF_WEEK,
  TIME_SLOTS,
  TUTOR_STATUS,
  INQUIRY_STATUS,
  CONTACT_INFO,
  API_CONFIG,
  UPLOAD_LIMITS,
  FEATURES
};
