// =========================================
// FILE: ProjectCard.jsx
// DESCRIPTION: A card component that displays project details.
// =========================================

import React from "react";
import { ExternalLink, Github } from "lucide-react";
import { THEME } from "../config/theme";

const ProjectCard = ({ project, isDarkMode }) => {
  // Theme shortcuts
  const cardBg = isDarkMode ? THEME.dark.card : THEME.light.card;
  const border = isDarkMode ? THEME.dark.border : THEME.light.border;
  const bgSecondary = isDarkMode ? THEME.dark.social : THEME.light.social;
  const textSub = isDarkMode ? THEME.dark.textSub : THEME.light.textSub;

  // Destructure project data
  const { title, description, icon: Icon, tags, link, repo } = project;

  return (
    <div
      className={`rounded-xl overflow-hidden border flex flex-col ${cardBg} ${border}`}
    >
      {/* Top Section: Icon & Title */}
      <a
        className={`p-6 grow flex flex-col justify-center items-center cursor-pointer ${bgSecondary}`}
        href={link || repo}
        target="_blank"
      >
        <Icon size={64} className={`${THEME.accent.text} mb-4`} />
        <h3 className="text-2xl font-bold text-center">{title}</h3>
      </a>

      {/* Bottom Section: Details */}
      <div className="p-6 flex flex-col h-full">
        {/* Description */}
        <p
          className={`mb-8 text-sm leading-relaxed grow line-clamp-4 ${textSub}`}
        >
          {description}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 mb-6 mt-auto">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`px-2 py-1 text-xs rounded font-bold ${bgSecondary} ${textSub}`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className={`flex gap-8 mt-auto pt-4 border-t ${border} `}>
          {repo && (
            <a
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 ${THEME.accent.text} font-bold hover:underline`}
              aria-label="View GitHub Repository"
            >
              <Github size={16} /> Source Code
            </a>
          )}
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 ${THEME.accent.text} font-bold hover:underline`}
              aria-label="Launch Project"
            >
              Launch <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
