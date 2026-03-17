import React, { useState } from 'react';
import { X, Plus, Trash2, Save, AlertCircle } from 'lucide-react';
import { Problem, Difficulty, TestCase } from '../types';
import { cn } from '../lib/utils';

interface AddProblemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (problem: Problem) => void;
}

export function AddProblemModal({ isOpen, onClose, onAdd }: AddProblemModalProps) {
  const [title, setTitle] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('Easy');
  const [category, setCategory] = useState('Array');
  const [description, setDescription] = useState('');
  const [pythonCode, setPythonCode] = useState('class Solution:\n    def solve(self, ...):\n        ');
  const [cppCode, setCppCode] = useState('class Solution {\npublic:\n    void solve(...) {\n        \n    }\n};');
  const [javaCode, setJavaCode] = useState('class Solution {\n    public void solve(...) {\n        \n    }\n}');
  const [testCases, setTestCases] = useState<TestCase[]>([{ input: '', expectedOutput: '' }]);

  if (!isOpen) return null;

  const handleAddTestCase = () => {
    setTestCases([...testCases, { input: '', expectedOutput: '' }]);
  };

  const handleRemoveTestCase = (index: number) => {
    setTestCases(testCases.filter((_, i) => i !== index));
  };

  const handleTestCaseChange = (index: number, field: keyof TestCase, value: string) => {
    const newTestCases = [...testCases];
    newTestCases[index][field] = value;
    setTestCases(newTestCases);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProblem: Problem = {
      id: title.toLowerCase().replace(/\s+/g, '-'),
      title,
      difficulty,
      category,
      order: Math.floor(Math.random() * 1000),
      description,
      initialCode: {
        python: pythonCode,
        cpp: cppCode,
        java: javaCode
      },
      testCases: testCases.filter(tc => tc.input && tc.expectedOutput)
    };

    onAdd(newProblem);
    onClose();
    // Reset form
    setTitle('');
    setDifficulty('Easy');
    setCategory('Array');
    setDescription('');
    setTestCases([{ input: '', expectedOutput: '' }]);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#262626] w-full max-w-4xl max-h-[90vh] rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/2">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Plus className="w-5 h-5 text-emerald-500" />
            Contribute a Problem
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Problem Title</label>
              <input 
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. 1. Two Sum"
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Difficulty</label>
                <select 
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Category</label>
                <input 
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Array"
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Description (Markdown Supported)</label>
            <textarea 
              required
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the problem, examples, and constraints..."
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 font-mono text-sm"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-400">Test Cases</label>
              <button 
                type="button"
                onClick={handleAddTestCase}
                className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add Case
              </button>
            </div>
            <div className="space-y-3">
              {testCases.map((tc, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <input 
                      required
                      placeholder="Input (e.g. n = 5)"
                      value={tc.input}
                      onChange={(e) => handleTestCaseChange(idx, 'input', e.target.value)}
                      className="bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    />
                    <input 
                      required
                      placeholder="Expected Output"
                      value={tc.expectedOutput}
                      onChange={(e) => handleTestCaseChange(idx, 'expectedOutput', e.target.value)}
                      className="bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    />
                  </div>
                  {testCases.length > 1 && (
                    <button 
                      type="button"
                      onClick={() => handleRemoveTestCase(idx)}
                      className="p-2 text-gray-500 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex gap-3">
            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
            <p className="text-xs text-amber-200/70 leading-relaxed">
              Since Firebase was declined, new problems will be saved to your browser's local storage. They will be visible to you, but not to other users until a shared database is connected.
            </p>
          </div>
        </form>

        <div className="px-6 py-4 border-t border-white/5 bg-white/2 flex justify-end gap-3">
          <button 
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-bold transition-all shadow-lg shadow-emerald-900/20"
          >
            <Save className="w-4 h-4" />
            Save Problem
          </button>
        </div>
      </div>
    </div>
  );
}
