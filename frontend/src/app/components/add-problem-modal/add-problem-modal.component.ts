import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Problem } from '../../models/problem.model';

@Component({
  selector: 'app-add-problem-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" (click)="onClose.emit()">
      <div class="bg-gray-900 border border-gray-800 rounded-lg p-6 w-full max-w-2xl" (click)="$event.stopPropagation()">
        <h2 class="text-2xl font-bold text-white mb-4">Add New Problem</h2>
        
        <form class="space-y-4">
          <div>
            <label class="block text-sm text-gray-400 mb-2">Title</label>
            <input 
              [(ngModel)]="newProblem.title"
              name="title"
              class="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-emerald-500 outline-none"
              placeholder="Problem title"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm text-gray-400 mb-2">Category</label>
              <input 
                [(ngModel)]="newProblem.category"
                name="category"
                class="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-emerald-500 outline-none"
                placeholder="e.g., Array, String"
              />
            </div>
            <div>
              <label class="block text-sm text-gray-400 mb-2">Difficulty</label>
              <select 
                [(ngModel)]="newProblem.difficulty"
                name="difficulty"
                class="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-emerald-500 outline-none"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm text-gray-400 mb-2">Description</label>
            <textarea 
              [(ngModel)]="newProblem.description"
              name="description"
              rows="5"
              class="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-emerald-500 outline-none"
              placeholder="Problem description"
            ></textarea>
          </div>

          <div class="flex gap-2">
            <button 
              type="button"
              (click)="submitProblem()"
              class="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors"
            >
              Add Problem
            </button>
            <button 
              type="button"
              (click)="onClose.emit()"
              class="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AddProblemModalComponent {
  @Output() onClose = new EventEmitter<void>();
  @Output() onSubmit = new EventEmitter<Problem>();

  newProblem: Partial<Problem> = {
    difficulty: 'Medium',
    category: '',
    title: '',
    description: ''
  };

  submitProblem(): void {
    if (!this.newProblem.title || !this.newProblem.category) {
      alert('Please fill in all required fields');
      return;
    }

    const problem: Problem = {
      id: `problem-${Date.now()}`,
      title: this.newProblem.title || '',
      category: this.newProblem.category || '',
      difficulty: (this.newProblem.difficulty || 'Medium') as 'Easy' | 'Medium' | 'Hard',
      description: this.newProblem.description || '',
      order: Date.now(),
      initialCode: {
        python: '',
        cpp: '',
        java: ''
      },
      testCases: []
    };

    this.onSubmit.emit(problem);
    this.onClose.emit();
  }
}
