import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  keywords?: string;
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Chat & Griddle",
  "image": "https://chatandgriddle.com/hero-brunch.jpg",
  "description": "Neighborhood brunch spot serving all-day breakfast, fresh lunch sandwiches, and classic diner fare in Kenilworth, NJ.",
  "@id": "https://chatandgriddle.com",
  "url": "https://chatandgriddle.com",
  "telephone": "(908) 276-2222",
  "priceRange": "$10-$20",
  "servesCuisine": ["American", "Breakfast", "Brunch"],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "242 Boulevard",
    "addressLocality": "Kenilworth",
    "addressRegion": "NJ",
    "postalCode": "07033",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.6769,
    "longitude": -74.2909
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "06:00",
      "closes": "15:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "07:00",
      "closes": "15:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Sunday",
      "opens": "07:00",
      "closes": "14:00"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": "150"
  }
};

const SEO = ({
  title = "Chat & Griddle | Brunch & Breakfast in Kenilworth, NJ",
  description = "Chat & Griddle serves fresh, homemade breakfast and brunch in Kenilworth, NJ. All-day breakfast, signature sandwiches, and classic diner favorites. Order online for pickup!",
  canonical = "https://chatandgriddle.com",
  keywords
}: SEOProps) => {
  const fullTitle = title.includes("Chat & Griddle") ? title : `${title} | Chat & Griddle`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="Chat & Griddle" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      
      {/* Local SEO */}
      <meta name="geo.region" content="US-NJ" />
      <meta name="geo.placename" content="Kenilworth" />
      
      {/* Schema.org LocalBusiness */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;
