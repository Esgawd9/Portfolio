import React from "react";

const EducationCard = ({ education, isDarkMode, theme }) => {
  const cardBg = isDarkMode ? theme.dark.card : theme.light.card;
  const border = isDarkMode ? theme.dark.border : theme.light.border;
  const textSub = isDarkMode ? theme.dark.textSub : theme.light.textSub;

  return (
    <div className={`p-6 rounded-xl border ${cardBg} ${border}`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold">{education.degree}</h3>
        <span className="text-sm opacity-90 italic shrink-0 ml-4">
          {education.period}
        </span>
      </div>
      <p className={`mt-2 ${textSub}`}>{education.institution}</p>
    </div>
  );
};

export default EducationCard;
