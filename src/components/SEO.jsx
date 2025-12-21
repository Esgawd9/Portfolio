import React from "react";

const SEO = ({ title, description, path }) => {
  const domain = "https://www.zsombor-pinter.site";
  const fullUrl = path ? `${domain}${path}` : domain;
  
  const themeColor = "#EF4444"; 

  return (
    <>
      {/* --- STANDARD SEO --- */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      <meta name="author" content="Zsombor Pintér" />

      {/* --- OPEN GRAPH (Facebook, LinkedIn, Discord) --- */}
      {/* LinkedIn and Discord primarily use these tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Zsombor Pintér Portfolio" />
      
      {/* Note: og:image is in index.html for stability */}

      {/* --- TWITTER CARD (X) --- */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* --- DISCORD SPECIFIC --- */}
      <meta name="theme-color" content={themeColor} />
    </>
  );
};

export default SEO;