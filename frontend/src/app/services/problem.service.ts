import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Problem, EvaluationResult, CodeSubmission } from '../models/problem.model';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) { }

  getProblems(): Observable<Problem[]> {
    return this.http.get<Problem[]>(`${this.apiUrl}/problems`);
  }

  getProblemById(id: string): Observable<Problem> {
    return this.http.get<Problem>(`${this.apiUrl}/problems/${id}`);
  }

  evaluateCode(submission: CodeSubmission): Observable<EvaluationResult> {
    return this.http.post<EvaluationResult>(`${this.apiUrl}/evaluate`, submission);
  }

  addProblem(problem: Problem): Observable<Problem> {
    return this.http.post<Problem>(`${this.apiUrl}/problems`, problem);
  }
}
