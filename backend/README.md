# Express.js Backend with TypeScript

This directory contains the **backend** Express.js server for CodeQuest.

## Directory Structure

```
backend/
├── src/
│   ├── server.ts              # Main Express app
│   └── routes/                # API route handlers
├── .env                       # Environment variables
├── tsconfig.json              # TypeScript config
└── package.json
```

## Features

- ✅ **TypeScript** - Fully typed backend
- ✅ **Express.js** - Lightweight framework
- ✅ **CORS Support** - Cross-origin requests
- ✅ **Error Handling** - Robust error management
- ✅ **Gemini AI** - Code evaluation integration
- ✅ **RESTful API** - Clean API design

## Installation

```bash
npm install
```

## Configuration

Create `.env` file:

```env
GEMINI_API_KEY=your_api_key_here
PORT=3001
NODE_ENV=development
```

## Development

```bash
npm run dev
```

Runs with ts-node on port 3001

## Build

```bash
npm run build
```

Compiles TypeScript to `dist/`

## API Endpoints

### Problems
- `GET /api/problems` - List all problems
- `GET /api/problems/:id` - Get specific problem

### Evaluation
- `POST /api/evaluate` - Evaluate code submission

### Health
- `GET /api/health` - Health check

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key | Yes |
| `PORT` | Server port (default: 3001) | No |
| `NODE_ENV` | Environment (development/production) | No |

## Response Format

All API responses follow JSON format:

```json
{
  "status": "success",
  "data": {},
  "message": "Optional message"
}
```

Errors return proper HTTP status codes with error details.

## Type Safety

All routes and controllers are fully typed with TypeScript interfaces defined in the Route handlers.
