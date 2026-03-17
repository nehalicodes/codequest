import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  template: `
    <nav class="bg-[#1a1a1a] border-b border-gray-800 sticky top-0 z-50">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <div class="flex items-center gap-2 cursor-pointer" (click)="onHome.emit()">
          <div class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold">CQ</span>
          </div>
          <h1 class="text-xl font-bold text-white">CodeQuest</h1>
        </div>
        
        <button 
          (click)="onAddProblem.emit()"
          class="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
        >
          + Add Problem
        </button>
      </div>
    </nav>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class NavbarComponent {
  @Output() onHome = new EventEmitter<void>();
  @Output() onAddProblem = new EventEmitter<void>();
}
