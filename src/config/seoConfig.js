/**
 * SEO Configuration
 * Meta tags, schemas, and SEO data for all pages
 */

export const DEFAULT_SEO = {
  title: 'Agarwal Academy - Home Tuition Services in South Delhi',
  description: 'Expert home tutors for Classes 1-12 in South Delhi. CBSE, ICSE, IIT-JEE preparation. Verified tutors at your doorstep. Privacy guaranteed.',
  keywords: 'home tuition South Delhi, CBSE tutors, ICSE coaching, IIT JEE preparation, home tutors Delhi, verified tutors',
  author: 'Agarwal Academy',
  ogType: 'website',
  ogImage: '/assets/og-image.jpg',
  twitterCard: 'summary_large_image'
};

// Class-wise SEO Pages
export const CLASS_SEO = {
  '10': {
    title: 'Class 10 Home Tuition in South Delhi | CBSE, ICSE | Agarwal Academy',
    description: 'Expert Class 10 home tutors in South Delhi. Board exam preparation for CBSE, ICSE. Physics, Chemistry, Maths, Biology tutoring at your home.',
    keywords: 'Class 10 tuition South Delhi, CBSE Class 10 tutors, ICSE Class 10 coaching, board exam preparation',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Class 10 Home Tuition',
      description: 'Personalized home tuition for Class 10 students',
      provider: {
        '@type': 'Organization',
        name: 'Agarwal Academy',
        url: 'https://agarwalacademy.in'
      },
      areaServed: 'South Delhi, India'
    }
  },
  '12': {
    title: 'Class 12 Home Tuition in South Delhi | CBSE, ICSE, IIT-JEE | Agarwal Academy',
    description: 'Class 12 home tutors for CBSE, ICSE boards and IIT-JEE preparation. Expert Physics, Chemistry, Maths coaching at your doorstep in South Delhi.',
    keywords: 'Class 12 tuition South Delhi, IIT JEE preparation, CBSE Class 12 tutors, board exam coaching',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Class 12 Home Tuition',
      description: 'Advanced home tuition for Class 12 and competitive exam preparation',
      provider: {
        '@type': 'Organization',
        name: 'Agarwal Academy'
      }
    }
  }
};

// Subject-wise SEO Pages
export const SUBJECT_SEO = {
  physics: {
    title: 'Physics Home Tuition in South Delhi | Classes 9-12 | Agarwal Academy',
    description: 'Expert Physics tutors for Classes 9, 10, 11, 12. CBSE, ICSE, IIT-JEE Physics coaching at home in South Delhi. Experienced teachers.',
    keywords: 'Physics tuition South Delhi, Physics home tutors, IIT JEE Physics coaching, CBSE Physics tutors',
    slug: 'physics-tuition',
    subject: 'Physics',
    icon: '⚛️'
  },
  chemistry: {
    title: 'Chemistry Home Tuition in South Delhi | CBSE, ICSE | Agarwal Academy',
    description: 'Chemistry home tutors for Classes 9-12. Organic, Inorganic, Physical Chemistry coaching. CBSE, ICSE, IIT-JEE preparation in South Delhi.',
    keywords: 'Chemistry tuition South Delhi, Chemistry home tutors, IIT JEE Chemistry, CBSE Chemistry coaching',
    slug: 'chemistry-tuition',
    subject: 'Chemistry',
    icon: '🧪'
  },
  maths: {
    title: 'Maths Home Tuition in South Delhi | Classes 1-12 | Agarwal Academy',
    description: 'Expert Maths tutors for all classes. CBSE, ICSE Maths coaching at home. IIT-JEE Maths preparation by experienced teachers in South Delhi.',
    keywords: 'Maths tuition South Delhi, Mathematics home tutors, IIT JEE Maths, CBSE Maths coaching',
    slug: 'maths-tuition',
    subject: 'Mathematics',
    icon: '🔢'
  },
  biology: {
    title: 'Biology Home Tuition in South Delhi | CBSE, ICSE, NEET | Agarwal Academy',
    description: 'Biology home tutors for Classes 9-12. NEET preparation, CBSE, ICSE Biology coaching. Botany, Zoology experts in South Delhi.',
    keywords: 'Biology tuition South Delhi, NEET Biology coaching, Biology home tutors, CBSE Biology',
    slug: 'biology-tuition',
    subject: 'Biology',
    icon: '🧬'
  },
  english: {
    title: 'English Home Tuition in South Delhi | Classes 1-12 | Agarwal Academy',
    description: 'English tutors for all classes. Literature, Grammar, Writing skills. CBSE, ICSE English coaching at your home in South Delhi.',
    keywords: 'English tuition South Delhi, English home tutors, CBSE English coaching, English grammar',
    slug: 'english-tuition',
    subject: 'English',
    icon: '📚'
  }
};

// Location-based SEO Pages
export const LOCATION_SEO = {
  'south-delhi': {
    title: 'Home Tuition in South Delhi | Verified Tutors for All Subjects | Agarwal Academy',
    description: 'Find verified home tutors in South Delhi. Classes 1-12, CBSE, ICSE, IIT-JEE. Expert tutors in Greater Kailash, Hauz Khas, Saket, and more.',
    keywords: 'home tuition South Delhi, tutors in South Delhi, CBSE coaching South Delhi, private tutors',
    location: 'South Delhi',
    areas: ['Greater Kailash', 'Hauz Khas', 'Saket', 'Vasant Kunj', 'Defence Colony']
  },
  'greater-kailash': {
    title: 'Home Tuition in Greater Kailash | Expert Tutors | Agarwal Academy',
    description: 'Home tutors in Greater Kailash (GK-1, GK-2). All subjects, Classes 1-12, CBSE, ICSE. Verified teachers at your doorstep.',
    keywords: 'home tuition Greater Kailash, tutors in GK, Greater Kailash tutors, private tuition GK',
    location: 'Greater Kailash',
    areas: ['GK-1', 'GK-2', 'Nearby Areas']
  },
  'hauz-khas': {
    title: 'Home Tuition in Hauz Khas | Verified Tutors | Agarwal Academy',
    description: 'Expert home tutors in Hauz Khas, South Delhi. All subjects and classes. CBSE, ICSE board preparation at your home.',
    keywords: 'home tuition Hauz Khas, tutors in Hauz Khas, private coaching Hauz Khas',
    location: 'Hauz Khas',
    areas: ['Hauz Khas Village', 'Hauz Khas Enclave']
  }
};

// Organization Schema (Global)
export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Agarwal Academy',
  url: 'https://agarwalacademy.in',
  logo: 'https://agarwalacademy.in/logo.png',
  description: 'Premier home tuition services in South Delhi for Classes 1-12',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'South Delhi',
    addressRegion: 'Delhi',
    addressCountry: 'IN'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    availableLanguage: ['English', 'Hindi']
  },
  areaServed: {
    '@type': 'City',
    name: 'South Delhi'
  }
};

// Breadcrumb Schema Generator
export const generateBreadcrumb = (items) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
};

// FAQ Schema for SEO pages
export const COMMON_FAQS = [
  {
    question: 'How do I find a tutor near me in South Delhi?',
    answer: 'Use our locality filter to search for tutors in your area. We have verified tutors in Greater Kailash, Hauz Khas, Saket, and all major South Delhi localities.'
  },
  {
    question: 'Are all tutors verified?',
    answer: 'Yes, all tutors go through KYC verification including Aadhaar, PAN, and police verification. Only approved tutors appear on our platform.'
  },
  {
    question: 'Do tutors come to our home?',
    answer: 'Yes, all tuition is provided at the student\'s home. We do not have a physical coaching center.'
  },
  {
    question: 'What boards do you cover?',
    answer: 'We provide tutors for CBSE, ICSE, State Boards, IB, and IGCSE curricula.'
  }
];

export const generateFAQSchema = (faqs) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
};

export default {
  DEFAULT_SEO,
  CLASS_SEO,
  SUBJECT_SEO,
  LOCATION_SEO,
  ORGANIZATION_SCHEMA,
  COMMON_FAQS,
  generateBreadcrumb,
  generateFAQSchema
};
