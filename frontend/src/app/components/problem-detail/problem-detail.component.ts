import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Problem, EvaluationResult } from '../../models/problem.model';
import { CodeEvaluationService, CompileError } from '../../services/code-evaluation.service';

@Component({
  selector: 'app-problem-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex flex-col gap-6 h-full">
      <!-- Header -->
      <div class="flex items-center justify-between border-b border-gray-800 pb-4">
        <div>
          <button 
            (click)="onBack.emit()"
            class="text-emerald-500 hover:text-emerald-400 mb-2 text-sm"
          >
            ← Back
          </button>
          <h1 class="text-4xl font-bold text-white">{{ problem.title }}</h1>
          <p class="text-gray-400 mt-1 text-[1.0625rem]">{{ problem.category }}</p>
        </div>
        <span [ngClass]="getDifficultyClass(problem.difficulty)" class="text-lg font-semibold px-4 py-2 rounded">
          {{ problem.difficulty }}
        </span>
      </div>

      <!-- Main Content -->
      <div class="flex-1 overflow-hidden">
        <div class="grid grid-cols-[31.5%_68.5%] gap-6 h-[53vh] sm:h-[55vh] md:h-[59vh] lg:h-[61vh] xl:h-[64vh]">
          <!-- Problem Description -->
          <div class="border border-gray-800 rounded-lg p-6 bg-gray-900 overflow-auto min-h-0">
            <h2 class="text-[1.375rem] font-semibold text-white mb-4">Problem Description</h2>
            <div class="text-gray-300 prose prose-invert max-w-none">
              {{ problem.description }}
            </div>
            
            <div class="mt-6 pt-6 border-t border-gray-800">
              <h3 class="text-[0.9375rem] font-semibold text-white mb-3">Test Cases</h3>
              <div class="space-y-2">
                <div *ngFor="let tc of problem.testCases; let i = index" class="text-[0.8125rem] bg-gray-800 p-3 rounded">
                  <p class="text-gray-400 text-[0.8125rem]"><strong>Input:</strong> {{ tc.input }}</p>
                  <p class="text-gray-400 text-[0.8125rem]"><strong>Expected:</strong> {{ tc.expectedOutput }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Code Editor -->
          <div class="flex flex-col gap-4 min-h-0">
            <div class="bg-gray-900 border border-gray-800 rounded-lg p-6 flex-1 flex flex-col min-h-0">
              <div class="flex gap-2 mb-4">
                <select 
                  [(ngModel)]="selectedLanguage"
                  (change)="onLanguageChange()"
                  class="px-3 py-2 bg-gray-800 text-white rounded border border-gray-700"
                >
                  <option value="python">Python</option>
                  <option value="cpp">C++</option>
                  <option value="java">Java</option>
                </select>
              </div>
              
              <textarea 
                [(ngModel)]="code"
                (change)="checkCodeSyntax()"
                class="flex-1 bg-gray-800 text-white p-4 rounded font-mono text-[0.9375rem] border border-gray-700 focus:border-emerald-500 outline-none resize-none min-h-0"
                placeholder="Write your code here..."
              ></textarea>
            </div>

            <!-- Syntax Errors/Hints -->
            <div *ngIf="compileErrors.length > 0" class="p-3 bg-yellow-900/20 border border-yellow-700 rounded flex-shrink-0 max-h-24 overflow-auto">
              <h4 class="font-semibold text-yellow-400 mb-2 text-[0.9375rem]">Code Hints</h4>
              <div class="space-y-1 text-[0.8125rem]">
                <div *ngFor="let error of compileErrors" [ngClass]="error.type === 'error' ? 'text-red-400' : 'text-yellow-400'" class="flex items-start gap-2">
                  <span>{{ error.type === 'error' ? '✗' : '⚠' }}</span>
                  <span><strong>Line {{ error.line }}:</strong> {{ error.message }}</span>
                </div>
              </div>
            </div>

            <!-- Buttons and Results -->
            <div class="flex gap-2 flex-shrink-0">
              <button 
                (click)="submitCode()"
                [disabled]="isEvaluating"
                class="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 disabled:opacity-50 transition-colors"
              >
                {{ isEvaluating ? 'Evaluating...' : 'Submit Code' }}
              </button>
              <button 
                (click)="runTests()"
                [disabled]="isEvaluating"
                class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                Run Tests
              </button>
              <button 
                (click)="resetCode()"
                class="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
              >
                Reset
              </button>
            </div>

            <!-- Evaluation Result -->
            <div *ngIf="evaluationResult" [ngClass]="getResultClass()" class="p-4 rounded border flex-shrink-0 max-h-32 overflow-auto">
              <h4 class="font-semibold mb-2 text-[1rem]">{{ evaluationResult.status }}</h4>
              <p class="text-[0.9375rem] mb-3 whitespace-pre-wrap break-words">{{ evaluationResult.explanation }}</p>
              <div *ngIf="evaluationResult.results.length > 0" class="space-y-2 text-[0.8125rem]">
                <div *ngFor="let result of evaluationResult.results" class="p-2 bg-black/30 rounded">
                  <p [ngClass]="result.passed ? 'text-green-400' : 'text-red-400'">
                    {{ result.passed ? '✓ PASS' : '✗ FAIL' }} - Input: {{ result.input }}
                  </p>
                  <p class="text-gray-400 text-[0.75rem]">Expected: {{ result.expected }}</p>
                  <p class="text-gray-400 text-[0.75rem]">Got: {{ result.actual }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
  `]
})
export class ProblemDetailComponent implements OnInit {
  @Input() problem!: Problem;
  @Output() onBack = new EventEmitter<void>();

  code: string = '';
  selectedLanguage: string = 'python';
  isEvaluating: boolean = false;
  evaluationResult: EvaluationResult | null = null;
  compileErrors: CompileError[] = [];

  constructor(private evaluationService: CodeEvaluationService) { }

  ngOnInit(): void {
    this.code = this.problem.initialCode[this.selectedLanguage as keyof typeof this.problem.initialCode];
  }

  submitCode(): void {
    // First check for syntax errors
    this.compileErrors = this.evaluationService.checkSyntax(this.code, this.selectedLanguage);
    if (this.compileErrors.length > 0) {
      this.evaluationResult = {
        status: 'Compile Error',
        results: [],
        explanation: 'Fix syntax errors before submitting. Check the hints below.'
      };
      return;
    }

    this.isEvaluating = true;
    this.evaluationService.evaluateCode(this.problem.id, this.code, this.selectedLanguage)
      .subscribe({
        next: (result) => {
          this.evaluationResult = result;
          this.isEvaluating = false;
        },
        error: (error) => {
          this.isEvaluating = false;
          const errorMessage = error?.error?.explanation || error?.message || 'Unknown error occurred';
          const errorType = this.getErrorType(errorMessage);
          this.evaluationResult = {
            status: 'Compile Error',
            results: [],
            explanation: `${errorType}: ${errorMessage}`
          };
        }
      });
  }

  getErrorType(message: string): string {
    if (message.toLowerCase().includes('syntax')) return 'Syntax Error';
    if (message.toLowerCase().includes('undefined') || message.toLowerCase().includes('not defined')) return 'Reference Error';
    if (message.toLowerCase().includes('type')) return 'Type Error';
    if (message.toLowerCase().includes('timeout') || message.toLowerCase().includes('exceeded')) return 'Time Limit Exceeded';
    if (message.toLowerCase().includes('memory')) return 'Memory Error';
    return 'Runtime Error';
  }

  resetCode(): void {
    this.code = this.problem.initialCode[this.selectedLanguage as keyof typeof this.problem.initialCode];
    this.evaluationResult = null;
    this.compileErrors = [];
  }

  onLanguageChange(): void {
    this.code = this.problem.initialCode[this.selectedLanguage as keyof typeof this.problem.initialCode];
    this.evaluationResult = null;
    this.compileErrors = [];
  }

  checkCodeSyntax(): void {
    this.compileErrors = this.evaluationService.checkSyntax(this.code, this.selectedLanguage);
  }

  runTests(): void {
    // First check for syntax errors
    this.compileErrors = this.evaluationService.checkSyntax(this.code, this.selectedLanguage);
    if (this.compileErrors.length > 0) {
      this.evaluationResult = {
        status: 'Compile Error',
        results: [],
        explanation: 'Fix syntax errors before running tests. Check the hints below.'
      };
      return;
    }

    this.isEvaluating = true;
    this.evaluationService.evaluateCode(this.problem.id, this.code, this.selectedLanguage)
      .subscribe({
        next: (result) => {
          this.evaluationResult = result;
          this.isEvaluating = false;
        },
        error: (error) => {
          this.isEvaluating = false;
          const errorMessage = error?.error?.explanation || error?.message || 'Unknown error';
          this.evaluationResult = {
            status: 'Compile Error',
            results: [],
            explanation: `Error: ${errorMessage}`
          };
        }
      });
  }

  getDifficultyClass(difficulty: string): string {
    const classes = {
      'Easy': 'bg-green-900/30 text-green-400',
      'Medium': 'bg-yellow-900/30 text-yellow-400',
      'Hard': 'bg-red-900/30 text-red-400'
    };
    return (classes as Record<string, string>)[difficulty] || '';
  }

  getResultClass(): string {
    if (!this.evaluationResult) return '';
    if (this.evaluationResult.status === 'Accepted') {
      return 'bg-green-900/30 border-green-700 text-green-400';
    }
    return 'bg-red-900/30 border-red-700 text-red-400';
  }
}
