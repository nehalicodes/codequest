import React from 'react';
import { Problem } from '../types';
import { ChevronRight, CheckCircle2, Circle } from 'lucide-react';
import { cn } from '../lib/utils';

interface ProblemListProps {
  problems: Problem[];
  onSelect: (id: string) => void;
}

export function ProblemList({ problems, onSelect }: ProblemListProps) {
  return (
    <div className="bg-[#262626] rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/5 text-xs uppercase tracking-wider text-gray-500 bg-white/2">
            <th className="px-6 py-4 font-semibold">Status</th>
            <th className="px-6 py-4 font-semibold">Title</th>
            <th className="px-6 py-4 font-semibold">Category</th>
            <th className="px-6 py-4 font-semibold text-right">Difficulty</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {problems.map((problem) => (
            <tr 
              key={problem.id}
              onClick={() => onSelect(problem.id)}
              className="group hover:bg-white/5 cursor-pointer transition-colors"
            >
              <td className="px-6 py-4 w-16">
                <Circle className="w-5 h-5 text-gray-600 group-hover:text-gray-500 transition-colors" />
              </td>
              <td className="px-6 py-4">
                <span className="text-gray-200 font-medium group-hover:text-white transition-colors">
                  {problem.title}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 rounded-md bg-white/5 text-xs text-gray-400">
                  {problem.category}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <span className={cn(
                  "text-xs font-bold px-2 py-1 rounded uppercase tracking-tighter",
                  problem.difficulty === 'Easy' && "bg-emerald-500/10 text-emerald-400",
                  problem.difficulty === 'Medium' && "bg-amber-500/10 text-amber-400",
                  problem.difficulty === 'Hard' && "bg-rose-500/10 text-rose-400"
                )}>
                  {problem.difficulty}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
