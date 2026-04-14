# Quick SEO Implementation Template

## How to Add SEO to Any Page

### Step 1: Import Required Modules
```jsx
import SEO from '@/components/common/SEO';
import { breadcrumbSchema, faqSchema } from '@/config/structuredData';
```

### Step 2: Define Structured Data (Inside Component)
```jsx
const YourPage = () => {
  // Breadcrumb
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://agarwalacademy.in/' },
    { name: 'Your Page', url: 'https://agarwalacademy.in/your-page' }
  ]);
  
  // Optional: FAQs
  const faqs = faqSchema([
    {
      question: 'Your question here?',
      answer: 'Your answer here.'
    }
  ]);
  
  const structuredData = [breadcrumbs, faqs];
  
  return (
    // ... your JSX
  );
};
```

### Step 3: Add SEO Component
```jsx
return (
  <div className="your-page">
    <SEO
      title="Your Page Title - Agarwal Academy"
      description="Your compelling page description here (150-160 chars)"
      keywords="keyword1, keyword2, keyword3"
      canonicalUrl="https://agarwalacademy.in/your-page"
      structuredData={structuredData}
    />
    
    {/* Rest of your page content */}
  </div>
);
```

---

## Example: Find Tutors Page

```jsx
import SEO from '@/components/common/SEO';
import { breadcrumbSchema } from '@/config/structuredData';

const FindTutors = () => {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://agarwalacademy.in/' },
    { name: 'Find Tutors', url: 'https://agarwalacademy.in/find-tutors' }
  ]);
  
  return (
    <div className="find-tutors-page">
      <SEO
        title="Find Home Tutors in South Delhi | Verified Teachers | Agarwal Academy"
        description="Browse verified home tutors in South Delhi. Filter by subject, class, location. CBSE, ICSE, IIT-JEE tutors available. Book your tutor today!"
        keywords="find tutors, home tutors South Delhi, verified tutors, book tutor, CBSE tutors"
        canonicalUrl="https://agarwalacademy.in/find-tutors"
        structuredData={breadcrumbs}
      />
      
      {/* Page content */}
    </div>
  );
};
```

---

## Example: Contact Page

```jsx
import SEO from '@/components/common/SEO';
import { breadcrumbSchema, organizationSchema } from '@/config/structuredData';

const Contact = () => {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://agarwalacademy.in/' },
    { name: 'Contact', url: 'https://agarwalacademy.in/contact' }
  ]);
  
  const structuredData = [breadcrumbs, organizationSchema];
  
  return (
    <div className="contact-page">
      <SEO
        title="Contact Agarwal Academy | Home Tuition Services in South Delhi"
        description="Get in touch with Agarwal Academy for home tuition services. Call us or fill the form. Available in South Delhi for all subjects and classes."
        keywords="contact Agarwal Academy, tuition inquiry, home tuition contact, South Delhi"
        canonicalUrl="https://agarwalacademy.in/contact"
        structuredData={structuredData}
      />
      
      {/* Contact form and details */}
    </div>
  );
};
```

---

## SEO Checklist for Each Page

- [ ] Import SEO component
- [ ] Add breadcrumb schema
- [ ] Write unique title (50-60 chars)
- [ ] Write unique description (150-160 chars)
- [ ] Add relevant keywords (5-10 keywords)
- [ ] Set correct canonical URL
- [ ] Add FAQs if applicable
- [ ] Ensure H1 tag is present and unique
- [ ] Add alt text to all images
- [ ] Include internal links to related pages
- [ ] Minimum 500 words of quality content

---

## Testing Your SEO

### 1. Rich Results Test
- Go to: https://search.google.com/test/rich-results
- Enter your page URL
- Check for errors

### 2. Meta Tags Preview
- Use browser DevTools → Elements → `<head>`
- Verify all meta tags are present
- Check `<script type="application/ld+json">` for structured data

### 3. Mobile Friendly Test
- Go to: https://search.google.com/test/mobile-friendly
- Enter your page URL
- Fix any mobile issues

### 4. Page Speed Test
- Go to: https://pagespeed.web.dev/
- Test both mobile and desktop
- Aim for 90+ score

---

## Priority Pages to Update (In Order)

1. ✅ Home.jsx (DONE)
2. ✅ MathsTuition.jsx (DONE)
3. FindTutors.jsx
4. About.jsx
5. Contact.jsx
6. TutorRegistration.jsx
7. PhysicsTuition.jsx
8. SouthDelhiTutors.jsx
9. Class10Physics.jsx
10. Class12Maths.jsx

---

## Common Structured Data Schemas

### For Subject Pages
```jsx
import { subjectServiceSchema, breadcrumbSchema, faqSchema } from '@/config/structuredData';

const serviceData = subjectServiceSchema(
  'Physics',
  'Expert Physics home tuition for Classes 9-12, IIT-JEE in South Delhi'
);
```

### For Location Pages
```jsx
import { localBusinessSchema, breadcrumbSchema } from '@/config/structuredData';

// Use localBusinessSchema from structuredData.js
const structuredData = [breadcrumbs, localBusinessSchema];
```

### For Class Pages
```jsx
import { breadcrumbSchema } from '@/config/structuredData';
import { CLASS_SEO } from '@/config/seoConfig';

const classSchema = CLASS_SEO['10'].schema; // or '12'
const structuredData = [breadcrumbs, classSchema];
```

---

## Tips for Writing SEO Content

### Title Tag Best Practices
- Include primary keyword at the beginning
- Add location (South Delhi)
- Add brand name at the end
- Keep under 60 characters
- Example: "Physics Tuition in South Delhi | Classes 9-12 | Agarwal Academy"

### Meta Description Best Practices
- Include primary and secondary keywords
- Add a call-to-action
- Highlight unique value proposition
- Keep 150-160 characters
- Example: "Find expert Physics tutors in South Delhi for Classes 9-12, CBSE, ICSE, IIT-JEE. Verified teachers at your doorstep. Book your free demo today!"

### Content Best Practices
- Use H1 for main title (only once)
- Use H2 for main sections
- Use H3 for subsections
- Include bullet points and lists
- Add local references (South Delhi areas)
- Include student testimonials
- Add clear CTAs (Call to Actions)

---

## Need Help?

If you get stuck:
1. Check the example pages (Home.jsx, MathsTuition.jsx)
2. Review structuredData.js for available schemas
3. Review seoConfig.js for pre-defined SEO data
4. Test with Rich Results Test
5. Check browser console for errors
