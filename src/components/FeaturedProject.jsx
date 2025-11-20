// src/components/FeaturedProject.jsx
import { Code, Hash, ExternalLink } from "lucide-react";

export default function FeaturedProject({ isDarkMode }) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-8">
        <Code className="text-red-500" />
        <h2 className="text-3xl font-bold">Featured Project</h2>
      </div>

      <div className="border rounded-2xl overflow-hidden shadow">
        <div className="md:flex">
          <div className="md:w-1/3 p-8 bg-stone-100 dark:bg-slate-700 flex flex-col items-center">
            <Hash className="text-red-500 mb-4" size={64} />
            <h3 className="text-2xl font-bold">Maze Solver</h3>
          </div>

          <div className="p-8 md:w-2/3">
            <h3 className="text-2xl font-bold mb-3">Pathfinding Algorithm Visualizer</h3>
            <p className="mb-6">
              An interactive app that generates mazes and solves them with DFS & BFS.
            </p>
            <a
              href="/maze.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600"
            >
              Launch Maze Solver <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
