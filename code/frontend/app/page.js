'use client';

import { useState, useEffect } from 'react';
import { ProblemList } from '../components/ProblemList';
import { ProblemDetail } from '../components/ProblemDetail';

export default function Home() {
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);

  useEffect(() => {
    fetch('/api/problems?t=' + Date.now())
      .then(res => res.json())
      .then(data => setProblems(data));
  }, []);

  const handleSelect = (id) => {
    const problem = problems.find(p => p.id === id);
    setSelectedProblem(problem);
  };

  if (selectedProblem) {
    return (
      <div className="min-h-screen bg-white p-8">
        <ProblemDetail problem={selectedProblem} onBack={() => setSelectedProblem(null)} />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CQ</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">CodeQuest</h1>
                <p className="text-gray-600 mt-1">Master algorithms, one problem at a time</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Problems Solved</p>
                <p className="text-2xl font-bold text-orange-500">0</p>
              </div>
            </div>
          </div>
        </header>
        <ProblemList problems={problems} onSelect={handleSelect} />
      </div>
    </main>
  );
}