import React, { useState, useRef } from 'react';
import { Problem } from '../types';
import Editor from '@monaco-editor/react';
import Markdown from 'react-markdown';
import { Play, Send, ChevronLeft, RotateCcw, Terminal, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { evaluateCode } from '../services/geminiService';
import { cn } from '../lib/utils';

interface ProblemDetailProps {
  problem: Problem;
  onBack: () => void;
}

export function ProblemDetail({ problem, onBack }: ProblemDetailProps) {
  const [language, setLanguage] = useState<'python' | 'cpp' | 'java'>('python');
  const [code, setCode] = useState(problem.initialCode.python);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'solution' | 'submissions'>('description');

  const handleLanguageChange = (newLang: 'python' | 'cpp' | 'java') => {
    setLanguage(newLang);
    setCode(problem.initialCode[newLang]);
    setResult(null);
  };

  const handleRun = async () => {
    setIsEvaluating(true);
    setResult(null);
    const evaluation = await evaluateCode(problem, code, language);
    setResult(evaluation);
    setIsEvaluating(false);
  };

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Header */}
      <div className="flex items-center justify-between bg-[#262626] p-2 rounded-xl border border-white/5">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="h-6 w-px bg-white/10" />
          <h2 className="text-lg font-semibold text-white">{problem.title}</h2>
        </div>
        
        <div className="flex items-center gap-2">
          <select 
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value as any)}
            className="bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-1.5 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          >
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
          </select>
          <button 
            onClick={() => setCode(problem.initialCode[language])}
            className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white"
            title="Reset Code"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={handleRun}
            disabled={isEvaluating}
            className="flex items-center gap-2 px-4 py-1.5 bg-white/5 hover:bg-white/10 text-gray-200 rounded-lg text-sm font-medium transition-all disabled:opacity-50"
          >
            {isEvaluating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            Run
          </button>
          <button 
            onClick={handleRun}
            disabled={isEvaluating}
            className="flex items-center gap-2 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-all shadow-lg shadow-emerald-900/20 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            Submit
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* Left Panel: Description */}
        <div className="w-1/2 bg-[#262626] rounded-2xl border border-white/5 flex flex-col overflow-hidden">
          <div className="flex border-b border-white/5 px-4">
            {['description', 'solution', 'submissions'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={cn(
                  "px-4 py-3 text-sm font-medium capitalize transition-all relative",
                  activeTab === tab ? "text-emerald-400" : "text-gray-500 hover:text-gray-300"
                )}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400" />
                )}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto p-6 prose prose-invert max-w-none">
            {activeTab === 'description' && (
              <div className="markdown-body">
                <div className="flex items-center gap-2 mb-4">
                  <span className={cn(
                    "px-2 py-0.5 rounded text-xs font-bold uppercase",
                    problem.difficulty === 'Easy' && "bg-emerald-500/10 text-emerald-400",
                    problem.difficulty === 'Medium' && "bg-amber-500/10 text-amber-400",
                    problem.difficulty === 'Hard' && "bg-rose-500/10 text-rose-400"
                  )}>
                    {problem.difficulty}
                  </span>
                  <span className="text-gray-500 text-xs">•</span>
                  <span className="text-gray-500 text-xs">{problem.category}</span>
                </div>
                <Markdown>{problem.description}</Markdown>
              </div>
            )}
            {activeTab === 'solution' && (
              <div className="text-gray-400 italic">Solution content coming soon...</div>
            )}
            {activeTab === 'submissions' && (
              <div className="text-gray-400 italic">No submissions yet.</div>
            )}
          </div>
        </div>

        {/* Right Panel: Editor & Results */}
        <div className="w-1/2 flex flex-col gap-4 overflow-hidden">
          {/* Editor */}
          <div className="flex-1 bg-[#262626] rounded-2xl border border-white/5 overflow-hidden relative">
            <Editor
              height="100%"
              language={language === 'cpp' ? 'cpp' : language}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                readOnly: false,
                automaticLayout: true,
                padding: { top: 16, bottom: 16 }
              }}
            />
          </div>

          {/* Results Panel */}
          <div className="h-1/3 bg-[#262626] rounded-2xl border border-white/5 flex flex-col overflow-hidden">
            <div className="px-4 py-2 border-b border-white/5 flex items-center justify-between bg-white/2">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <Terminal className="w-4 h-4" />
                Console
              </div>
              {result && (
                <div className={cn(
                  "text-xs font-bold px-2 py-0.5 rounded",
                  result.status === 'Accepted' ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                )}>
                  {result.status}
                </div>
              )}
            </div>
            <div className="flex-1 overflow-y-auto p-4 font-mono text-sm">
              {!result && !isEvaluating && (
                <div className="text-gray-600 flex flex-col items-center justify-center h-full gap-2">
                  <Terminal className="w-8 h-8 opacity-20" />
                  <p>Run your code to see results</p>
                </div>
              )}
              
              {isEvaluating && (
                <div className="flex items-center gap-3 text-emerald-500 animate-pulse">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Evaluating your solution...
                </div>
              )}

              {result && (
                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                    <p className="text-gray-400 text-xs mb-1">Result Explanation:</p>
                    <p className="text-gray-200">{result.explanation}</p>
                  </div>
                  
                  <div className="space-y-2">
                    {result.results?.map((res: any, idx: number) => (
                      <div key={idx} className="p-3 rounded-lg bg-white/2 border border-white/5 flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">Case {idx + 1}:</span>
                            {res.passed ? (
                              <span className="text-emerald-400 flex items-center gap-1 text-xs">
                                <CheckCircle2 className="w-3 h-3" /> Passed
                              </span>
                            ) : (
                              <span className="text-rose-400 flex items-center gap-1 text-xs">
                                <XCircle className="w-3 h-3" /> Failed
                              </span>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-4 mt-2">
                            <div>
                              <p className="text-[10px] text-gray-500 uppercase">Input</p>
                              <p className="text-gray-300 text-xs truncate">{res.input}</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-gray-500 uppercase">Output</p>
                              <p className="text-gray-300 text-xs truncate">{res.actual || 'null'}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
