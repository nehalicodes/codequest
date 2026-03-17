# CodeQuest Architecture

## Overview

CodeQuest is a full-stack application for coding practice, built with:
- **Frontend**: Angular 18+ with standalone components
- **Backend**: Express.js with TypeScript
- **AI Integration**: Google Gemini for code evaluation
- **Styling**: Tailwind CSS

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client Browser                        │
│                                                           │
│  ┌──────────────────────────────────────────────────┐   │
│  │          Angular Application (Port 4200)         │   │
│  │  ┌────────────────────────────────────────────┐  │   │
│  │  │   AppComponent (Root)                      │  │   │
│  │  │   - State Management                       │  │   │
│  │  │   - Routing & Navigation                   │  │   │
│  │  │   - Modal Control                          │  │   │
│  │  └────────────────────────────────────────────┘  │   │
│  │                      ↓                            │   │
│  │  ┌──────────────┬────────────┬────────────────┐  │   │
│  │  │ Navbar       │ Problem    │ Problem Detail │  │   │
│  │  │ Component    │ List       │ Component      │  │   │
│  │  │              │ Component  │                │  │   │
│  │  └──────────────┴────────────┴────────────────┘  │   │
│  │                      ↓                            │   │
│  │  ┌──────────────┬──────────────┬─────────────┐  │   │
│  │  │ Problem      │ Code         │ Local       │  │   │
│  │  │ Service      │ Evaluation   │ Storage     │  │   │
│  │  │              │ Service      │ Service     │  │   │
│  │  └──────────────┴──────────────┴─────────────┘  │   │
│  │           (Services with RxJS)                   │   │
│  └──────────────────────────────────────────────────┘  │
│                 HTTP/REST (with Proxy)                 │
└──────────────────────┬─────────────────────────────────┘
                       │
                       ↓
        ┌──────────────────────────────┐
        │   API Gateway (Proxy)         │
        │   localhost:4200/api →        │
        │   localhost:3001/api          │
        └──────────────────────┬────────┘
                               │
                               ↓
┌──────────────────────────────────────────────────────────┐
│        Express.js Server (Port 3001)                     │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │           Middleware Stack                         │ │
│  │  - CORS Configuration                             │ │
│  │  - JSON Parser                                    │ │
│  │  - Error Handler                                 │ │
│  └────────────────────────────────────────────────────┘ │
│                        ↓                                 │
│  ┌────────────────────────────────────────────────────┐ │
│  │           API Routes                               │ │
│  │  - GET    /api/problems                           │ │
│  │  - GET    /api/problems/:id                       │ │
│  │  - POST   /api/evaluate                           │ │
│  │  - GET    /api/health                             │ │
│  └────────────────────────────────────────────────────┘ │
│                        ↓                                 │
│  ┌────────────────────────────────────────────────────┐ │
│  │      Business Logic & Data                         │ │
│  │  - In-memory problem store                        │ │
│  │  - Gemini AI evaluation logic                     │ │
│  │  - Request/Response validation                    │ │
│  └────────────────────────────────────────────────────┘ │
│                        ↓                                 │
│  ┌────────────────────────────────────────────────────┐ │
│  │        External Services                           │ │
│  │  - Google Gemini AI                               │ │
│  │  - Environment Configuration                      │ │
│  └────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Load Problems
```
User → Frontend → ProblemService → HTTP → Backend → Response
      → LocalStorageService (cache)
```

### 2. View Problem Details
```
User Clicks → AppComponent → ProblemDetailComponent
           → Updates URL (?problem=id)
           → Service fetches from cache
```

### 3. Submit Code
```
User Submits Code → ProblemDetailComponent
                  → CodeEvaluationService
                  → HTTP POST /api/evaluate
                  → Backend processes
                  → Gemini AI evaluates
                  → Response with results
                  → Display on frontend
```

## Directory Structure

### Frontend (`frontend/`)

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── navbar/              # Navigation bar
│   │   │   ├── problem-list/        # Problem grid
│   │   │   ├── problem-detail/      # Detail + editor
│   │   │   └── add-problem-modal/   # Add dialog
│   │   │
│   │   ├── services/
│   │   │   ├── problem.service.ts        # API for problems
│   │   │   ├── code-evaluation.service.ts # Code eval
│   │   │   └── local-storage.service.ts  # Storage
│   │   │
│   │   ├── models/
│   │   │   ├── problem.model.ts      # Type definitions
│   │   │   └── problems.data.ts      # Sample data
│   │   │
│   │   └── app.component.ts          # Root
│   │
│   ├── main.ts                       # Bootstrap
│   ├── index.html                    # Entry HTML
│   └── styles.scss                   # Global styles
│
├── tsconfig.json                     # TypeScript config
├── angular.json                      # Angular config
├── tailwind.config.js                # Tailwind config
└── package.json
```

### Backend (`backend/`)

```
backend/
├── src/
│   ├── server.ts          # Express app setup & routes
│   └── routes/            # API endpoints
│
├── .env                   # Environment config
├── tsconfig.json          # TypeScript config
└── package.json
```

## Component Hierarchy

```
AppComponent (Root)
├── NavbarComponent
├── ProblemListComponent (if !selectedProblemId)
│   └── ProblemCard (repeated)
├── ProblemDetailComponent (if selectedProblemId)
│   ├── CodeEditor
│   ├── TestCases
│   └── EvaluationResult
└── AddProblemModalComponent (if isAddModalOpen)
    └── Form
```

## State Management

**AppComponent** maintains:
```typescript
- selectedProblemId: string | null
- selectedProblem: Problem | null
- problems: Problem[]
- isAddModalOpen: boolean
```

**Services** maintain:
- `LocalStorageService`: Custom problems (RxJS Subject)
- `CodeEvaluationService`: Loading state
- `ProblemService`: API caching

## Data Models

### Problem
```typescript
interface Problem {
  id: string
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  category: string
  order: number
  description: string
  initialCode: {
    python: string
    cpp: string
    java: string
  }
  testCases: TestCase[]
}
```

### CodeSubmission
```typescript
interface CodeSubmission {
  problemId: string
  code: string
  language: string
}
```

### EvaluationResult
```typescript
interface EvaluationResult {
  status: 'Accepted' | 'Wrong Answer' | ...
  results: TestResult[]
  explanation: string
}
```

## API Contracts

### GET /api/problems
**Response:**
```json
[Problem, Problem, ...]
```

### POST /api/evaluate
**Request:**
```json
{
  "problemId": "two-sum",
  "code": "...",
  "language": "python"
}
```

**Response:**
```json
{
  "status": "Accepted",
  "results": [...],
  "explanation": "..."
}
```

## Styling Strategy

- **Tailwind CSS** for utility classes
- **Dark theme** (dark gray/black background)
- **Emerald accent color** for highlights
- **Responsive grid** for problem list
- **Smooth animations** for transitions

## Key Design Patterns

### Singleton Services
All services are `providedIn: 'root'` - singleton pattern

### Standalone Components
All components are standalone with explicit imports

### Reactive Programming
RxJS Observables for data streams

### Proxy Configuration
Frontend proxies /api to backend

### TypeScript Strict Mode
All files use `strict: true` configuration

## Environment Configuration

**Frontend:**
- Dev: `ng serve` on port 4200
- Prod: `ng build` to dist/

**Backend:**
- Dev: `ts-node src/server.ts` on port 3001
- Prod: `node dist/server.js`

## Security Considerations

1. **CORS**: Configured for frontend only
2. **Environment Variables**: API keys in .env
3. **Input Validation**: At API level
4. **Error Handling**: User-friendly messages
5. **No sensitive data**: In logs or responses

## Performance Optimizations

1. **OnDemand Loading**: Problems infinite scrollable
2. **Local Storage**: Cache custom problems
3. **Code Splitting**: Angular build optimization
4. **HTTP Caching**: Service caching layer
5. **CompomentOnPush**: ChangeDetectionStrategy (optional)

## Future Enhancements

- [ ] User authentication
- [ ] MongoDB/PostgreSQL database
- [ ] Solution history tracking
- [ ] Leaderboard system
- [ ] Code collaboration
- [ ] WebSocket for real-time features
- [ ] GitHub integration
- [ ] Advanced code editor (Monaco)
