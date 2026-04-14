/**
 * Structured Data (Schema.org) for SEO
 * JSON-LD schemas for Organization, LocalBusiness, and Services
 */

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Agarwal Academy',
  alternateName: 'Agarwal Academy Home Tuition',
  url: 'https://agarwalacademy.in',
  logo: 'https://agarwalacademy.in/images/Modern logo.png',
  description: 'Premier home tuition services in South Delhi. Expert tutors for Classes 1-12, CBSE, ICSE, IIT-JEE preparation.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'South Delhi',
    addressRegion: 'Delhi',
    addressCountry: 'IN'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+919958334586',
    contactType: 'Customer Service',
    areaServed: 'IN',
    availableLanguage: ['English', 'Hindi']
  },
  sameAs: [
    'https://www.facebook.com/agarwalacademy',
    'https://www.instagram.com/agarwalacademy',
    'https://twitter.com/agarwalacademy'
  ]
};

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://agarwalacademy.in',
  name: 'Agarwal Academy',
  image: 'https://agarwalacademy.in/images/Modern logo.png',
  description: 'Home tuition and tutoring services in South Delhi for all subjects and classes.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'South Delhi',
    addressLocality: 'New Delhi',
    addressRegion: 'Delhi',
    postalCode: '110000',
    addressCountry: 'IN'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 28.5494,
    longitude: 77.2500
  },
  url: 'https://agarwalacademy.in',
  telephone: '+91-XXXXXXXXXX',
  priceRange: '₹₹',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '09:00',
    closes: '21:00'
  },
  areaServed: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: 28.5494,
      longitude: 77.2500
    },
    geoRadius: '25000'
  }
};

export const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Home Tuition Services',
  provider: {
    '@type': 'EducationalOrganization',
    name: 'Agarwal Academy',
    url: 'https://agarwalacademy.in'
  },
  areaServed: {
    '@type': 'Place',
    name: 'South Delhi'
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Tuition Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Mathematics Tuition',
          description: 'Expert Maths tutors for Classes 1-12, CBSE, ICSE, IIT-JEE'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Physics Tuition',
          description: 'Physics home tutors for Classes 9-12, Board & competitive exams'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Chemistry Tuition',
          description: 'Chemistry coaching for CBSE, ICSE, IIT-JEE preparation'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Biology Tuition',
          description: 'Biology tutors for NEET, CBSE, ICSE board preparation'
        }
      }
    ]
  }
};

export const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }))
});

export const faqSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
});

// Generate Article schema for blog posts or SEO pages
export const articleSchema = (title, description, publishDate, modifiedDate, author = 'Agarwal Academy') => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description: description,
  author: {
    '@type': 'Organization',
    name: author
  },
  publisher: {
    '@type': 'Organization',
    name: 'Agarwal Academy',
    logo: {
      '@type': 'ImageObject',
      url: 'https://agarwalacademy.in/images/Modern logo.png'
    }
  },
  datePublished: publishDate,
  dateModified: modifiedDate || publishDate
});

// Subject-specific service schema
export const subjectServiceSchema = (subject, description) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: `${subject} Home Tuition`,
  description: description,
  provider: {
    '@type': 'EducationalOrganization',
    name: 'Agarwal Academy',
    url: 'https://agarwalacademy.in'
  },
  areaServed: {
    '@type': 'Place',
    name: 'South Delhi, India'
  },
  audience: {
    '@type': 'EducationalAudience',
    educationalRole: 'Student'
  }
});
