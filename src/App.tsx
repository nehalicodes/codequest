import React, { useState, useEffect } from 'react';
import { PROBLEMS, Problem } from './types';
import { ProblemList } from './components/ProblemList';
import { ProblemDetail } from './components/ProblemDetail';
import { Navbar } from './components/Navbar';
import { AddProblemModal } from './components/AddProblemModal';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [selectedProblemId, setSelectedProblemId] = useState<string | null>(null);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Load problems from localStorage and default set
  useEffect(() => {
    const savedProblems = localStorage.getItem('user_problems');
    const userProblems = savedProblems ? JSON.parse(savedProblems) : [];
    setProblems([...PROBLEMS, ...userProblems]);
  }, []);

  const handleAddProblem = (newProblem: Problem) => {
    const savedProblems = localStorage.getItem('user_problems');
    const userProblems = savedProblems ? JSON.parse(savedProblems) : [];
    const updatedUserProblems = [...userProblems, newProblem];
    localStorage.setItem('user_problems', JSON.stringify(updatedUserProblems));
    setProblems([...PROBLEMS, ...updatedUserProblems]);
  };

  const selectedProblem = problems.find(p => p.id === selectedProblemId);

  // Handle browser back button
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const problemId = params.get('problem');
      setSelectedProblemId(problemId);
    };

    window.addEventListener('popstate', handlePopState);
    
    // Initial check
    const params = new URLSearchParams(window.location.search);
    const problemId = params.get('problem');
    if (problemId) setSelectedProblemId(problemId);

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectProblem = (id: string | null) => {
    setSelectedProblemId(id);
    const url = new URL(window.location.href);
    if (id) {
      url.searchParams.set('problem', id);
    } else {
      url.searchParams.delete('problem');
    }
    window.history.pushState({}, '', url);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-gray-200 font-sans selection:bg-emerald-500/30">
      <Navbar 
        onHome={() => handleSelectProblem(null)} 
        onAddProblem={() => setIsAddModalOpen(true)}
      />
      
      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {!selectedProblemId ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Problem Set</h1>
                <p className="text-gray-400">Sharpen your coding skills with our curated list of challenges.</p>
              </div>
              <ProblemList 
                problems={problems} 
                onSelect={handleSelectProblem} 
              />
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="h-[calc(100vh-120px)]"
            >
              {selectedProblem && (
                <ProblemDetail 
                  problem={selectedProblem} 
                  onBack={() => handleSelectProblem(null)} 
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AddProblemModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddProblem}
      />
    </div>
  );
}
