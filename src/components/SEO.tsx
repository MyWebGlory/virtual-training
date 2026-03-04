import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  structuredData?: object | object[];
  noIndex?: boolean;
}

const SITE_URL = "https://www.vmproducers.com";
const DEFAULT_OG_IMAGE = "https://www.vmproducers.com/og-image.png";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Virtual Producers",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  description:
    "Expert virtual production for corporate cohort training programs. We handle every technical detail so facilitators can focus on delivery.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    url: `${SITE_URL}`,
  },
  sameAs: [
    "https://www.linkedin.com/company/virtual-producers",
  ],
};

const SEO = ({
  title,
  description,
  canonicalUrl,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  structuredData,
  noIndex = false,
}: SEOProps) => {
  const fullTitle = title.includes("Virtual Producers")
    ? title
    : `${title} | Virtual Producers`;
  const fullCanonicalUrl = canonicalUrl
    ? `${SITE_URL}${canonicalUrl}`
    : SITE_URL;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonicalUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Organization schema on every page */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      {/* Page-specific structured data */}
      {structuredData &&
        (Array.isArray(structuredData)
          ? structuredData.map((data, index) => (
              <script key={index} type="application/ld+json">
                {JSON.stringify(data)}
              </script>
            ))
          : (
              <script type="application/ld+json">
                {JSON.stringify(structuredData)}
              </script>
            ))}
    </Helmet>
  );
};

export default SEO;
