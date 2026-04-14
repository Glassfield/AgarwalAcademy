import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { DEFAULT_SEO } from '@/config/seoConfig';

/**
 * SEO Component for managing meta tags and structured data
 * Uses react-helmet-async for dynamic head management
 */
const SEO = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  structuredData = null,
  noIndex = false,
  children
}) => {
  // Use defaults if not provided
  const pageTitle = title || DEFAULT_SEO.title;
  const pageDescription = description || DEFAULT_SEO.description;
  const pageKeywords = keywords || DEFAULT_SEO.keywords;
  const pageOgImage = ogImage || DEFAULT_SEO.ogImage;
  const fullOgImageUrl = pageOgImage.startsWith('http') 
    ? pageOgImage 
    : `https://agarwalacademy.in${pageOgImage}`;
  
  const canonicalHref = canonicalUrl || window.location.href;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      
      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalHref} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalHref} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={fullOgImageUrl} />
      <meta property="og:site_name" content="Agarwal Academy" />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={fullOgImageUrl} />
      
      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* Additional custom tags */}
      {children}
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  canonicalUrl: PropTypes.string,
  ogImage: PropTypes.string,
  ogType: PropTypes.string,
  twitterCard: PropTypes.string,
  structuredData: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  noIndex: PropTypes.bool,
  children: PropTypes.node
};

export default SEO;
