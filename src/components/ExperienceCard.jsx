import React from "react";

const ExperienceCard = ({ experience, isDarkMode, theme }) => {
  const cardBg = isDarkMode ? theme.dark.card : theme.light.card;
  const border = isDarkMode ? theme.dark.border : theme.light.border;
  const textSub = isDarkMode ? theme.dark.textSub : theme.light.textSub;

  return (
    <div className={`p-6 rounded-xl border ${cardBg} ${border}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold">{experience.title}</h3>
          <p className={`${theme.accent.text} font-bold`}>
            {experience.company}
          </p>
        </div>
        <span className="text-sm opacity-90 italic shrink-0 ml-4">
          {experience.period}
        </span>
      </div>

      <ul className={`space-y-3 text-sm leading-relaxed ${textSub}`}>
        {experience.points && experience.points.map((point, index) => (
          <li key={index}>
            <strong>{point.label}: </strong> {point.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExperienceCard;
