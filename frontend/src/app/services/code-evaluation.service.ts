import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EvaluationResult } from '../models/problem.model';

export interface CompileError {
  line: number;
  message: string;
  type: 'error' | 'warning';
}

@Injectable({
  providedIn: 'root'
})
export class CodeEvaluationService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) { }

  evaluateCode(problemId: string, code: string, language: string): Observable<EvaluationResult> {
    return this.http.post<EvaluationResult>(`${this.apiUrl}/evaluate`, {
      problemId,
      code,
      language
    }).pipe(
      catchError(error => {
        const errorMsg = error?.error?.explanation || error?.message || 'Network error or server unavailable';
        return throwError(() => new Error(errorMsg));
      })
    );
  }

  checkSyntax(code: string, language: string): CompileError[] {
    const errors: CompileError[] = [];
    const lines = code.split('\n');

    if (language === 'python') {
      // Python syntax checks
      let indentStack: number[] = [0];
      lines.forEach((line, index) => {
        const trimmed = line.trimLeft();
        
        // Check for incomplete statements
        if (trimmed.endsWith(':') && !trimmed.startsWith('#')) {
          const nextLine = lines[index + 1];
          if (!nextLine || nextLine.trim() === '') {
            errors.push({
              line: index + 1,
              message: 'Expected indented block after colon',
              type: 'error'
            });
          }
        }

        // Check for missing parentheses
        if ((trimmed.includes('if ') || trimmed.includes('for ') || trimmed.includes('while ')) && 
            trimmed.includes('(') && !trimmed.includes(')')) {
          errors.push({
            line: index + 1,
            message: 'Missing closing parenthesis',
            type: 'error'
          });
        }

        // Check for unclosed strings
        const doubleQuotes = (line.match(/"/g) || []).length;
        const singleQuotes = (line.match(/'/g) || []).length;
        if (doubleQuotes % 2 !== 0 || singleQuotes % 2 !== 0) {
          errors.push({
            line: index + 1,
            message: 'Unclosed string literal',
            type: 'error'
          });
        }
      });
    } else if (language === 'cpp' || language === 'java') {
      // C++ and Java syntax checks
      lines.forEach((line, index) => {
        // Check for unclosed braces
        const openBraces = (line.match(/{/g) || []).length;
        const closeBraces = (line.match(/}/g) || []).length;
        if (openBraces > closeBraces) {
          errors.push({
            line: index + 1,
            message: 'Missing closing brace }',
            type: 'error'
          });
        }

        // Check for unclosed parentheses
        const openParens = (line.match(/\(/g) || []).length;
        const closeParens = (line.match(/\)/g) || []).length;
        if (openParens > closeParens) {
          errors.push({
            line: index + 1,
            message: 'Missing closing parenthesis )',
            type: 'error'
          });
        }

        // Check for missing semicolon in C++
        if (language === 'cpp' && line.trim() && !line.trim().startsWith('//') && 
            !line.trim().endsWith('{') && !line.trim().endsWith(';') && 
            !line.trim().startsWith('#') && !line.includes('}')) {
          if (!(line.includes('if') && line.includes('(') && !line.includes(';'))) {
            errors.push({
              line: index + 1,
              message: 'Statement should end with semicolon',
              type: 'warning'
            });
          }
        }

        // Check for unclosed strings
        const doubleQuotes = (line.match(/"/g) || []).length;
        const singleQuotes = (line.match(/'/g) || []).length;
        if (doubleQuotes % 2 !== 0 || singleQuotes % 2 !== 0) {
          errors.push({
            line: index + 1,
            message: 'Unclosed string literal',
            type: 'error'
          });
        }
      });
    }

    return errors;
  }
}
