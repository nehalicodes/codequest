@echo off
REM CodeQuest Quick Setup Script (Windows)
REM Run this to set up the entire project

echo.
echo 🚀 CodeQuest Full-Stack Setup
echo ===============================
echo.

REM Check Node.js
echo Checking Node.js version...
node --version >nul 2>&1 || (
  echo ❌ Node.js not found!
  exit /b 1
)
echo ✓ Node.js found
echo.

REM Install all dependencies
echo 📦 Installing dependencies...
call npm install
cd frontend
call npm install
cd ..
cd backend
call npm install
cd ..
echo ✓ Dependencies installed
echo.

REM Check for environment file
echo ⚙️  Checking environment configuration...
if not exist "backend\.env" (
  echo Creating backend\.env file...
  (
    echo GEMINI_API_KEY=your_api_key_here
    echo PORT=3001
    echo NODE_ENV=development
  ) > backend\.env
  echo ⚠️  Please update backend\.env with your Gemini API key
) else (
  echo ✓ backend\.env exists
)
echo.

echo ✅ Setup complete!
echo.
echo 🎯 Next steps:
echo 1. Update backend\.env with your GEMINI_API_KEY
echo 2. Run 'npm run dev' to start development
echo    - Frontend on http://localhost:4200
echo    - Backend on http://localhost:3001
echo.
echo For more information, see README.md
