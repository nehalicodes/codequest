import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Problem } from './models/problem.model';
import { LocalStorageService } from './services/local-storage.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';
import { AddProblemModalComponent } from './components/add-problem-modal/add-problem-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    ProblemListComponent,
    ProblemDetailComponent,
    AddProblemModalComponent
  ],
  template: `
    <div class="min-h-screen bg-[#1a1a1a] text-gray-200 font-sans selection:bg-emerald-500/30">
      <app-navbar 
        (onHome)="handleHome()" 
        (onAddProblem)="handleAddProblem()"
      ></app-navbar>
      
      <main class="container mx-auto px-4 py-8">
        <div *ngIf="!selectedProblemId" class="animate-in fade-in duration-300">
          <div class="mb-8">
            <h1 class="text-3xl font-bold text-white mb-2">Problem Set</h1>
            <p class="text-gray-400">Sharpen your coding skills with our curated list of challenges.</p>
          </div>
          <app-problem-list 
            [problems]="problems" 
            (onSelect)="handleSelectProblem($event)" 
          ></app-problem-list>
        </div>

        <div *ngIf="selectedProblemId && selectedProblem" class="animate-in fade-in duration-300">
          <app-problem-detail 
            [problem]="selectedProblem" 
            (onBack)="handleHome()"
          ></app-problem-detail>
        </div>
      </main>

      <app-add-problem-modal 
        *ngIf="isAddModalOpen"
        (onClose)="isAddModalOpen = false"
        (onSubmit)="handleAddProblemSubmit($event)"
      ></app-add-problem-modal>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
      overflow-y: auto;
    }
  `]
})
export class AppComponent implements OnInit {
  problems: Problem[] = [];
  selectedProblemId: string | null = null;
  selectedProblem: Problem | null = null;
  isAddModalOpen: boolean = false;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Subscribe to problems
    this.localStorageService.getProblems$().subscribe(problems => {
      this.problems = problems;
      
      // Check URL for selected problem
      const params = new URLSearchParams(window.location.search);
      const problemId = params.get('problem');
      if (problemId) {
        this.selectedProblemId = problemId;
        this.selectedProblem = problems.find(p => p.id === problemId) || null;
      }
    });

    // Handle browser back button
    window.addEventListener('popstate', () => {
      const params = new URLSearchParams(window.location.search);
      const problemId = params.get('problem');
      this.selectedProblemId = problemId;
      this.selectedProblem = problemId ? this.problems.find(p => p.id === problemId) || null : null;
    });
  }

  handleHome(): void {
    this.selectedProblemId = null;
    this.selectedProblem = null;
    const url = new URL(window.location.href);
    url.searchParams.delete('problem');
    window.history.pushState({}, '', url);
  }

  handleSelectProblem(id: string): void {
    this.selectedProblemId = id;
    this.selectedProblem = this.problems.find(p => p.id === id) || null;
    const url = new URL(window.location.href);
    url.searchParams.set('problem', id);
    window.history.pushState({}, '', url);
  }

  handleAddProblem(): void {
    this.isAddModalOpen = true;
  }

  handleAddProblemSubmit(problem: Problem): void {
    this.localStorageService.addCustomProblem(problem);
  }
}
