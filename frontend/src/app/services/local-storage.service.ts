import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Problem } from '../models/problem.model';
import { PROBLEMS } from '../models/problems.data';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private problems$ = new BehaviorSubject<Problem[]>([]);

  constructor() {
    this.loadProblems();
  }

  private loadProblems(): void {
    const defaultProblems = PROBLEMS as unknown as Problem[];
    const savedProblems = this.getCustomProblems();
    this.problems$.next([...defaultProblems, ...savedProblems]);
  }

  getProblems$(): Observable<Problem[]> {
    return this.problems$.asObservable();
  }

  getCustomProblems(): Problem[] {
    const saved = localStorage.getItem('user_problems');
    return saved ? JSON.parse(saved) : [];
  }

  addCustomProblem(problem: Problem): void {
    const customProblems = this.getCustomProblems();
    customProblems.push(problem);
    localStorage.setItem('user_problems', JSON.stringify(customProblems));
    this.loadProblems();
  }

  clearStorage(): void {
    localStorage.removeItem('user_problems');
    this.loadProblems();
  }
}
