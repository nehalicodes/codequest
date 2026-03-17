# Angular & TypeScript Full-Stack Setup

This directory contains the **frontend** Angular application for CodeQuest.

## Directory Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/        # Standalone Angular components
│   │   ├── services/          # Injectable services
│   │   ├── models/            # TypeScript interfaces
│   │   └── app.component.ts   # Root component
│   ├── main.ts                # Bootstrap
│   ├── index.html
│   ├── styles.scss
│   └── types.d.ts             # Type definitions
├── tsconfig.json
├── tsconfig.app.json
├── angular.json
├── tailwind.config.js
├── postcss.config.js
├── proxy.conf.json
└── package.json
```

## Features

- ✅ **Standalone Components** - Modern Angular 18+ pattern
- ✅ **Strong Typing** - Full TypeScript strict mode
- ✅ **Reactive Programming** - RxJS observables
- ✅ **Tailwind CSS** - Utility-first styling
- ✅ **API Integration** - Proxied requests to backend
- ✅ **State Management** - Service-based state

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Starts dev server on `http://localhost:4200`

## Build

```bash
npm run build
```

Compiles to `dist/codequest/`

## Services

### ProblemService
- Handles API requests for problems
- Fetches all problems and individual ones

### CodeEvaluationService
- Submits code for evaluation
- Handles AI-powered evaluation results

### LocalStorageService
- Manages custom problems in localStorage
- Provides reactive updates via RxJS

## Components

All components are **standalone** and use:
- `@angular/common` - CommonModule
- `@angular/forms` - FormsModule
- Reactive patterns with Services

## Configuration

- `angular.json` - Build and dev server config
- `proxy.conf.json` - API proxy rules
- `tailwind.config.js` - Tailwind customization
- `tsconfig.json` - TypeScript strict settings
