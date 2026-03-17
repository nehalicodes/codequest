import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Problem } from '../../models/problem.model';

@Component({
  selector: 'app-problem-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div 
        *ngFor="let problem of problems"
        (click)="onSelect.emit(problem.id)"
        class="p-5 bg-gray-900 border border-gray-800 rounded-lg hover:border-emerald-500 cursor-pointer transition-all hover:shadow-lg hover:shadow-emerald-500/20"
      >
        <div class="flex justify-between items-start mb-3">
          <h3 class="text-lg font-semibold text-white">{{ problem.title }}</h3>
          <span [ngClass]="getDifficultyClass(problem.difficulty)" class="text-xs font-semibold px-3 py-1 rounded">
            {{ problem.difficulty }}
          </span>
        </div>
        
        <p class="text-gray-400 text-sm mb-4">{{ problem.category }}</p>
        
        <div class="flex gap-2">
          <span class="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
            {{ problem.testCases.length }} test cases
          </span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ProblemListComponent {
  @Input() problems: Problem[] = [];
  @Output() onSelect = new EventEmitter<string>();

  getDifficultyClass(difficulty: string): string {
    const classes = {
      'Easy': 'bg-green-900/30 text-green-400',
      'Medium': 'bg-yellow-900/30 text-yellow-400',
      'Hard': 'bg-red-900/30 text-red-400'
    };
    return (classes as Record<string, string>)[difficulty] || '';
  }
}
