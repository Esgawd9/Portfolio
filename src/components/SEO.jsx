import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const SEO = ({ title, description, path }) => {
  const domain = "https://esgawd9-portfolio.vercel.app";
  const fullUrl = path ? `${domain}${path}` : domain;
  const image = `${domain}/og-image.png`;

  return (
    <HelmetProvider>
      <Helmet>
        {/* 1. Page Title */}
        <title>{title}</title>

        {/* 2. Meta Description */}
        <meta name="description" content={description} />

        {/* 3. Canonical URL */}
        <link rel="canonical" href={fullUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:image" content={image} />
      </Helmet>
    </HelmetProvider>
  );
};

export default SEO;
