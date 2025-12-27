// ==========================================
// COMPONENT: PRIVACY POLICY
// ==========================================

import React from "react";
import { THEME } from "../config/theme";

const PrivacyPolicy = ({ isDarkMode }) => {
  const textSub = isDarkMode ? THEME.dark.textSub : THEME.light.textSub;
  const cardBg = isDarkMode ? THEME.dark.card : THEME.light.card;
  const border = isDarkMode ? THEME.dark.border : THEME.light.border;
  const headingClass = "text-xl font-bold mb-3 mt-8 first:mt-0";

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="py-8 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
        </div>
        <p className={textSub}>Last updated: {new Date().toLocaleDateString()}</p>
      </header>

      <div className={`p-8 rounded-2xl border ${cardBg} ${border}`}>
        <h2 className={headingClass}>1. Introduction</h2>
        <p className={`${textSub} mb-4`}>
          Welcome to my portfolio. I respect your privacy and am committed to protecting your personal data. This privacy policy explains what data is collected when you visit <strong>zsombor-pinter.site</strong> and how it is used.
        </p>

        <h2 className={headingClass}>2. Analytics (Vercel)</h2>
        <p className={`${textSub} mb-4`}>
          This website uses <strong>Vercel Analytics</strong> to understand how visitors interact with the content. Vercel Analytics is designed to be privacy-friendly:
        </p>
        <ul className={`list-disc list-inside ${textSub} mb-4 ml-4 space-y-2`}>
          <li>It collects <strong>anonymous</strong> usage data (page views, browser type, OS, country).</li>
          <li>It does <strong>not</strong> collect personally identifiable information (PII).</li>
          <li>It does <strong>not</strong> use cookies.</li>
          <li>It does <strong>not</strong> track you across other websites.</li>
        </ul>

        <h2 className={headingClass}>3. Local Storage</h2>
        <p className={`${textSub} mb-4`}>
          This website uses your browser's Local Storage for a single purpose: to save your <strong>Theme Preference</strong> (Dark Mode vs. Light Mode). This data remains on your device and is not transmitted to any server.
        </p>

        <h2 className={headingClass}>4. Contact Form</h2>
        <p className={`${textSub} mb-4`}>
          If you use the "Contact Me" form, the name, email address, and message you provide are processed via <strong>EmailJS</strong> solely to deliver your message to my inbox. This information is not stored in a marketing database and is used only to respond to your inquiry.
        </p>

        <h2 className={headingClass}>5. External Links</h2>
        <p className={`${textSub} mb-4`}>
          This portfolio contains links to external websites (e.g., GitHub, LinkedIn). I am not responsible for the privacy practices or content of these third-party sites.
        </p>

        <h2 className={headingClass}>6. Contact</h2>
        <p className={textSub}>
          If you have any questions about this privacy policy, please contact me via the email address listed in the footer.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;