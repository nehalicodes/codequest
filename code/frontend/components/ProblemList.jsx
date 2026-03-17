import { ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

export function ProblemList({ problems, onSelect }) {
  return (
    <div className="space-y-3">
      {problems.map((problem) => (
        <div
          key={problem.id}
          onClick={() => onSelect(problem.id)}
          className="flex items-center justify-between bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors border border-gray-200"
        >
          <div className="flex-1">
            <h3 className="text-gray-900 font-medium">{problem.title}</h3>
            <div className="flex items-center gap-2 mt-2">
              <span className={cn(
                "px-2.5 py-1 rounded text-xs font-medium",
                problem.difficulty === 'Easy' && "bg-emerald-100 text-emerald-700",
                problem.difficulty === 'Medium' && "bg-amber-100 text-amber-700",
                problem.difficulty === 'Hard' && "bg-rose-100 text-rose-700"
              )}>
                {problem.difficulty}
              </span>
              <span className="text-gray-500 text-xs">{problem.category}</span>
            </div>
          </div>
          <ChevronRight className="w-6 h-6 text-orange-500 flex-shrink-0" />
        </div>
      ))}
    </div>
  );
}
