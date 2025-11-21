import React from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Github,
  FileText,
  Terminal,
  Briefcase,
  GraduationCap,
  Code,
  Hash,
  Cpu,
  ExternalLink,
} from "lucide-react";
import { THEME } from "../config/theme";

// ==========================================
// COMPONENT: HOME PAGE (DIGITAL CV)
// ==========================================
const Home = ({ isDarkMode }) => {
  const textSub = isDarkMode ? THEME.dark.textSub : THEME.light.textSub;
  const cardBg = isDarkMode ? THEME.dark.card : THEME.light.card;
  const border = isDarkMode ? THEME.dark.border : THEME.light.border;
  const bgSecondary = isDarkMode ? "bg-slate-700" : "bg-stone-100";

  return (
    <div className="space-y-24 animate-in slide-in-from-left-4 duration-500">
      {/* 1. HERO SECTION */}
      <header className="text-center py-12">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          Pinter <span className={THEME.accent.text}>Zsombor</span>
        </h1>

        <p className={`text-xl md:text-2xl mb-8 max-w-2xl mx-auto ${textSub}`}>
          Aspiring Software Engineer
        </p>

        {/* Contact Links */}
        <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm">
          <a
            href="mailto:zsombor.pinter0105@gmail.com"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${border} ${
              isDarkMode ? "hover:bg-slate-800" : "hover:bg-stone-100"
            }`}
          >
            <Mail size={16} className={THEME.accent.text} />
            Email Me
          </a>

          <a
            href="https://github.com/Esgawd9"
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${border} ${
              isDarkMode ? "hover:bg-slate-800" : "hover:bg-stone-100"
            }`}
          >
            <Github size={16} className={THEME.accent.text} />
            GitHub
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/gallery"
            className={`px-8 py-3 ${THEME.accent.bg} text-white rounded-full font-bold ${THEME.accent.bgHover} transition-transform hover:-translate-y-1 inline-flex items-center`}
          >
            View Origami Gallery
          </Link>

          {/* Download Resume Button */}
          <a
            href="/resume.pdf"
            download="Zsombor_Pinter_Resume.pdf"
            className={`px-8 py-3 rounded-full font-bold border inline-flex items-center gap-2 transition-transform hover:-translate-y-1 ${border} ${
              isDarkMode ? "hover:bg-slate-800" : "hover:bg-stone-100"
            }`}
          >
            <FileText size={18} />
            Download CV
          </a>
        </div>
      </header>

      {/* 2. TECHNICAL SKILLS */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <Terminal className={`w-6 h-6 ${THEME.accent.text}`} />
          <h2 className="text-3xl font-bold">Technical Skills</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "Python",
            "Java",
            "C/C++",
            "JavaScript",
            "React",
            "PHP",
            "HTML/CSS",
            "SQL",
            "Git",
            "PlatformOS",
          ].map((skill) => (
            <div
              key={skill}
              className={`p-4 rounded-xl border text-center font-medium transition-transform hover:-translate-y-1 ${cardBg} ${border}`}
            >
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* 3. EXPERIENCE & EDUCATION */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* Experience */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Briefcase className={`w-6 h-6 ${THEME.accent.text}`} />
            <h2 className="text-3xl font-bold">Experience</h2>
          </div>
          <div className={`p-6 rounded-2xl border h-full ${cardBg} ${border}`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">Intern - Web Developer</h3>
                <p className={`${THEME.accent.text} font-bold`}>
                  Origin Develop Kft.
                </p>
              </div>
              <span
                className={`text-xs font-bold uppercase tracking-wide ${THEME.accent.lightBg} ${THEME.accent.lightText} px-2 py-1 rounded`}
              >
                2025 (3 months)
              </span>
            </div>
            <ul
              className={`list-disc list-inside space-y-3 text-sm leading-relaxed ${textSub}`}
            >
              <li>
                Developed and maintained frontend features for a
                PlatformOS-hosted website using HTML, CSS, JavaScript, and
                Liquid.
              </li>
              <li>
                Collaborated in an agile team, ensuring seamless integration of
                frontend components.
              </li>
              <li>
                Debugged and optimized code to improve website performance.
              </li>
              <li>Assisted in version control workflows using Git.</li>
            </ul>
          </div>
        </section>

        {/* Education */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className={`w-6 h-6 ${THEME.accent.text}`} />
            <h2 className="text-3xl font-bold">Education</h2>
          </div>
          <div className="space-y-6">
            <div className={`p-6 rounded-2xl border ${cardBg} ${border}`}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">Software Engineering BSc</h3>
                <span className="text-sm opacity-60">2022 - Present</span>
              </div>
              <p className={`${THEME.accent.text} font-medium`}>
                University of Szeged
              </p>
              <p className={`text-sm mt-2 ${textSub}`}>
                Faculty of Science and Informatics
              </p>
            </div>
            <div
              className={`p-6 rounded-2xl border opacity-60 ${cardBg} ${border}`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold">High School Diploma</h3>
                <span className="text-sm">2017 - 2021</span>
              </div>
              <p>Dombóvári Illyés Gyula Gimnázium</p>
            </div>
          </div>
        </section>
      </div>

      {/* 4. FEATURED PROJECTS */}
      <section id="projects">
        <div className="flex items-center gap-3 mb-8">
          <Code className={`w-6 h-6 ${THEME.accent.text}`} />
          <h2 className="text-3xl font-bold">Featured Projects</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Project 1 */}
          <div
            className={`rounded-2xl overflow-hidden shadow-lg border flex flex-col ${cardBg} ${border}`}
          >
            <div
              className={`p-8 grow flex flex-col justify-center items-center ${bgSecondary}`}
            >
              <Hash size={64} className={`${THEME.accent.text} mb-4`} />
              <h3 className="text-2xl font-bold">Maze Solver</h3>
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold mb-2">
                Pathfinding Algorithm Visualizer
              </h3>
              <p className={`mb-4 text-sm ${textSub}`}>
                Interactive web app visualizing maze generation and solving
                algorithms (DFS, BFS).
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span
                  className={`px-2 py-1 text-xs rounded ${THEME.accent.lightBg} ${THEME.accent.lightText} font-bold`}
                >
                  JavaScript
                </span>
                <span
                  className={`px-2 py-1 text-xs rounded ${THEME.accent.lightBg} ${THEME.accent.lightText} font-bold`}
                >
                  HTML/CSS
                </span>
              </div>
              <a
                href="/maze.html"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 ${THEME.accent.text} font-bold hover:underline`}
              >
                Launch Project <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {/* Project 2 */}
          <div
            className={`rounded-2xl overflow-hidden shadow-lg border flex flex-col ${cardBg} ${border}`}
          >
            <div
              className={`p-8 grow flex flex-col justify-center items-center ${bgSecondary}`}
            >
              <Cpu size={64} className={`${THEME.accent.text} mb-4`} />
              <h3 className="text-2xl font-bold">Snake Game AI</h3>
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold mb-2">Autonomous Agent</h3>
              <p className={`mb-4 text-sm ${textSub}`}>
                AI-controlled Snake developed in Java using A* and BFS
                pathfinding algorithms. Focused on optimization and logic.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span
                  className={`px-2 py-1 text-xs rounded ${THEME.accent.lightBg} ${THEME.accent.lightText} font-bold`}
                >
                  Java
                </span>
                <span
                  className={`px-2 py-1 text-xs rounded ${THEME.accent.lightBg} ${THEME.accent.lightText} font-bold`}
                >
                  A* Algorithm
                </span>
                <span
                  className={`px-2 py-1 text-xs rounded ${THEME.accent.lightBg} ${THEME.accent.lightText} font-bold`}
                >
                  AI
                </span>
              </div>
              <a
                href="https://github.com/Esgawd9"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 ${THEME.accent.text} font-bold hover:underline`}
              >
                View on GitHub <Github size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
