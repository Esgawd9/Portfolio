import React from "react";

const SEO = ({ title, description, path }) => {
  const domain = "https://esgawd9-portfolio.vercel.app";
  const fullUrl = path ? `${domain}${path}` : domain;

  return (
    <>
      {/* better than react-helmet-async */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </>
  );
};

export default SEO;