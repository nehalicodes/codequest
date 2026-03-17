# CodeQuest - Full Stack Coding Platform

A modern full-stack coding practice platform built with **Angular**, **TypeScript**, **Express.js**, and **Gemini AI**.

## 🎯 Project Structure

```
codequest/
├── frontend/                    # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/     # Standalone Angular components
│   │   │   │   ├── navbar/
│   │   │   │   ├── problem-list/
│   │   │   │   ├── problem-detail/
│   │   │   │   └── add-problem-modal/
│   │   │   ├── services/       # Angular services
│   │   │   │   ├── problem.service.ts
│   │   │   │   ├── code-evaluation.service.ts
│   │   │   │   └── local-storage.service.ts
│   │   │   ├── models/         # TypeScript interfaces
│   │   │   │   ├── problem.model.ts
│   │   │   │   └── problems.data.ts
│   │   │   └── app.component.ts
│   │   ├── main.ts             # Angular bootstrap
│   │   ├── index.html
│   │   └── styles.scss
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── angular.json
│   ├── proxy.conf.json         # API proxy configuration
│   └── package.json
│
├── backend/                     # Express.js backend
│   ├── src/
│   │   ├── server.ts           # Express server with TypeScript
│   │   └── routes/             # API routes
│   ├── .env                    # Environment configuration
│   ├── tsconfig.json
│   └── package.json
│
├── package.json                # Root workspace configuration
├── tsconfig.json               # Root TypeScript configuration
├── .gitignore
└── README.md
```

## 📋 Prerequisites

- **Node.js** v20 or higher
- **npm** v10 or higher (or yarn/pnpm)
- **Gemini API Key** (get from https://ai.google.dev/)

## 🚀 Setup & Installation

### Step 1: Clone and Install Dependencies

```bash
# Install root dependencies
npm install

# Install all workspace dependencies
npm run install:all
```

### Step 2: Configure Environment Variables

Create or update `backend/.env`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
NODE_ENV=development
```

## 🛠️ Development

### Run Everything

```bash
npm run dev
```

This will start:
- **Frontend**: Angular dev server on `http://localhost:4200`
- **Backend**: Express server on `http://localhost:3001`

### Run Individual Services

```bash
# Frontend only
npm run dev:frontend

# Backend only
npm run dev:backend
```

## 📦 Production Build

### Build the Project

```bash
npm run build
```

Generates:
- `frontend/dist/` - Compiled Angular application
- `backend/dist/` - Compiled TypeScript backend

### Run Production Build

```bash
npm start
```

## 🏗️ Project Architecture

### Frontend (Angular)

**Standalone Components:**
- `AppComponent` - Root component managing state and routing
- `NavbarComponent` - Navigation and branding
- `ProblemListComponent` - Displays all problems
- `ProblemDetailComponent` - Problem details and code editor
- `AddProblemModalComponent` - Modal for adding new problems

**Services:**
- `ProblemService` - HTTP calls to backend API
- `CodeEvaluationService` - Code submission and evaluation
- `LocalStorageService` - Local storage for custom problems

**Models:**
- `Problem` - Core problem interface
- `EvaluationResult` - Code evaluation response
- `TestCase` - Test case definition

### Backend (Express + TypeScript)

**Endpoints:**
- `GET /api/problems` - Get all problems
- `GET /api/problems/:id` - Get specific problem
- `POST /api/evaluate` - Evaluate code submission
- `GET /api/health` - Health check

**Features:**
- CORS enabled
- JSON request/response handling
- Gemini AI integration for code evaluation
- Error handling and logging

## 💻 Technology Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Angular | 18+ | Framework |
| TypeScript | 5.5+ | Language |
| RxJS | 7.8+ | Reactive programming |
| Tailwind CSS | 4.1+ | Styling |
| Angular Forms | 18+ | Form handling |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Express.js | 4.21+ | Web framework |
| TypeScript | 5.8+ | Language |
| Gemini AI | 1.29+ | Code evaluation |
| CORS | 2.8+ | Cross-origin requests |
| dotenv | 17.2+ | Environment variables |

## 📡 API Documentation

### Authentication
API requests include base URL `/api` (proxied by frontend)

### Endpoints

#### 1. Get All Problems
```javascript
GET /api/problems

Response:
[
  {
    id: string,
    title: string,
    difficulty: "Easy" | "Medium" | "Hard",
    category: string,
    description: string,
    initialCode: { python: string, cpp: string, java: string },
    testCases: [{ input: string, expectedOutput: string }]
  }
]
```

#### 2. Get Problem by ID
```javascript
GET /api/problems/:id

Response: Problem
```

#### 3. Evaluate Code
```javascript
POST /api/evaluate

Request Body:
{
  problemId: string,
  code: string,
  language: "python" | "cpp" | "java"
}

Response:
{
  status: "Accepted" | "Wrong Answer" | "Time Limit Exceeded" | "Compile Error",
  results: [
    {
      input: string,
      expected: string,
      actual: string,
      passed: boolean
    }
  ],
  explanation: string
}
```

#### 4. Health Check
```javascript
GET /api/health

Response:
{
  status: "ok",
  message: "Backend is running"
}
```

## 🎨 UI Features

- **Dark Theme** - Modern dark interface with Emerald accent colors
- **Responsive Grid** - Problem list adapts to screen size
- **Code Editor** - Multi-language code input with syntax awareness
- **Real-time Feedback** - Immediate test case results
- **Modal Dialogs** - Smooth add problem modal
- **Smooth Animations** - Fade-in transitions between views

## 📝 Component Details

### AddProblemModalComponent
- Form for adding new problems
- Input validation
- Storage to localStorage
- Emits events to parent

### ProblemDetailComponent
- Language selector (Python/C++/Java)
- Code editor with initial template
- Test case display
- Evaluation results visualization
- Submit and reset buttons

### ProblemListComponent
- Grid display of problems
- Category and difficulty badges
- Click to view details
- Dynamic styling based on difficulty

### NavbarComponent
- Brand logo and title
- Home navigation
- Add problem button
- Sticky positioning

## 🔧 Configuration Files

### angular.json
- Angular build configuration
- Development server settings
- Production optimization options
- Proxy configuration for API

### tsconfig.json (Root)
- Shared TypeScript configuration
- Path aliases (@app/, @assets/)
- Strict mode enabled
- Module resolution settings

### proxy.conf.json
```json
{
  "/api": "http://localhost:3001/api"
}
```

## 📚 Example Usage

### Adding a New Component

```typescript
// 1. Create component file
// frontend/src/app/components/my-component/my-component.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [CommonModule],
  template: `<div>My Component</div>`,
})
export class MyComponentComponent {}

// 2. Use in parent
import { MyComponentComponent } from './my-component/my-component.component';

@Component({
  imports: [MyComponentComponent]
})
export class ParentComponent {}
```

### Making API Requests

```typescript
// frontend/src/app/services/my.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MyService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get('/api/data');
  }
}
```

## 🐛 Troubleshooting

### CORS Error
- Ensure backend is running on port 3001
- Check proxy.conf.json is correct
- Verify backend CORS middleware is enabled

### API Not Responding
- Run `npm run dev:backend` to start backend
- Check `.env` file for correct configuration
- Verify `GEMINI_API_KEY` is set

### Module Not Found
- Run `npm run install:all` to install all dependencies
- Check import paths are correct
- Verify tsconfig paths are configured

## 📖 Best Practices

✅ **Do:**
- Use standalone components (Angular 14+)
- Implement strict TypeScript
- Use reactive programming (RxJS)
- Keep components simple and focused
- Use services for shared logic
- Validate environment variables

❌ **Don't:**
- Use deprecated class-based NgModules
- Ignore TypeScript strict mode
- Make direct DOM manipulation
- Hardcode API URLs (use environment)
- Skip error handling

## 🚀 Deployment

### Vercel (Frontend + Backend)
```bash
npm run build
# Deploy both frontend/dist and backend/dist
```

### Docker
```dockerfile
# Use official Node image
FROM node:20-alpine

WORKDIR /app
COPY . .
RUN npm run install:all
RUN npm run build

EXPOSE 3001 4200
CMD npm start
```

## 📄 License

MIT

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Review error messages carefully
