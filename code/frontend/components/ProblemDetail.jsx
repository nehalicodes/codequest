import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import Markdown from 'react-markdown';
import { Play, Send, ChevronLeft, RotateCcw, Terminal, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { evaluateCode } from '../services/geminiService';
import { cn } from '../lib/utils';

export function ProblemDetail({ problem, onBack }) {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(problem.initialCode.python);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('description');

  const handleLanguageChange = (newLang) => {
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
    <div className="flex flex-col h-full bg-white gap-4">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center gap-4 flex-1">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-orange-500 transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="h-6 w-px bg-gray-200" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{problem.title}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className={cn(
                "px-2.5 py-1 rounded text-xs font-medium",
                problem.difficulty === 'Easy' && "bg-emerald-100 text-emerald-700",
                problem.difficulty === 'Medium' && "bg-amber-100 text-amber-700",
                problem.difficulty === 'Hard' && "bg-rose-100 text-rose-700"
              )}>
                {problem.difficulty}
              </span>
              <span className="text-gray-400 text-xs">•</span>
              <span className="text-gray-500 text-xs">{problem.category}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <select 
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
          >
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
          </select>
          <button 
            onClick={() => setCode(problem.initialCode[language])}
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-orange-500 transition-all"
            title="Reset Code"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={handleRun}
            disabled={isEvaluating}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-all disabled:opacity-50"
          >
            {isEvaluating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
            Run
          </button>
          <button 
            onClick={handleRun}
            disabled={isEvaluating}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-all disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
            Submit
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* Left Panel: Description */}
        <div className="w-1/2 bg-gray-50 rounded-lg border border-gray-200 flex flex-col overflow-hidden">
          <div className="flex border-b border-gray-200 px-4 bg-white">
            {['description', 'solution', 'submissions'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-3 text-sm font-medium capitalize transition-all relative",
                  activeTab === tab ? "text-orange-500 text-gray-900" : "text-gray-600 hover:text-orange-500"
                )}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />
                )}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto p-6 prose max-w-none">
            {activeTab === 'description' && (
              <div className="markdown-body">
                <div className="text-gray-900">
                  <h1 className="text-xl font-bold mb-4 text-gray-900">{problem.title}</h1>
                  <Markdown>{problem.description}</Markdown>
                </div>
              </div>
            )}
            {activeTab === 'solution' && (
              <div className="text-gray-600 italic">Solution content coming soon...</div>
            )}
            {activeTab === 'submissions' && (
              <div className="text-gray-600 italic">No submissions yet.</div>
            )}
          </div>
        </div>

        {/* Right Panel: Editor & Results */}
        <div className="w-1/2 flex flex-col gap-4 overflow-hidden">
          {/* Editor */}
          <div className="flex-1 bg-gray-900 rounded-lg border border-gray-300 overflow-hidden relative">
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
          <div className="h-1/3 bg-white rounded-lg border border-gray-200 flex flex-col overflow-hidden">
            <div className="px-4 py-2 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                <Terminal className="w-5 h-5 text-orange-500" />
                Console
              </div>
              {result && (
                <div className={cn(
                  "text-xs font-bold px-2.5 py-1 rounded",
                  result.status === 'Accepted' ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                )}>
                  {result.status}
                </div>
              )}
            </div>
            <div className="flex-1 overflow-y-auto p-4 font-mono text-sm bg-gray-950 text-gray-100">
              {!result && !isEvaluating && (
                <div className="text-gray-400 flex flex-col items-center justify-center h-full gap-2">
                  <Terminal className="w-8 h-8 opacity-30 text-orange-500" />
                  <p>Run your code to see results</p>
                </div>
              )}

              {isEvaluating && (
                <div className="flex items-center gap-3 text-orange-500 animate-pulse">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Evaluating your solution...
                </div>
              )}

              {result && (
                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-gray-800 border border-gray-700">
                    <p className="text-gray-300 text-xs mb-1">Result Explanation:</p>
                    <p className="text-gray-100">{result.explanation}</p>
                  </div>

                  <div className="space-y-2">
                    {result.results?.map((res, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-gray-800 border border-gray-700 flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-300">Case {idx + 1}:</span>
                            {res.passed ? (
                              <span className="text-emerald-400 flex items-center gap-1 text-xs">
                                <CheckCircle2 className="w-4 h-4" /> Passed
                              </span>
                            ) : (
                              <span className="text-rose-400 flex items-center gap-1 text-xs">
                                <XCircle className="w-4 h-4" /> Failed
                              </span>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-4 mt-2">
                            <div>
                              <p className="text-[10px] text-orange-400 uppercase">Input</p>
                              <p className="text-gray-100 text-xs truncate">{res.input}</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-orange-400 uppercase">Output</p>
                              <p className="text-gray-100 text-xs truncate">{res.actual || 'null'}</p>
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
