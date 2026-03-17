#!/bin/bash

# CodeQuest Quick Setup Script
# Run this to set up the entire project

echo "🚀 CodeQuest Full-Stack Setup"
echo "==============================="
echo ""

# Check Node.js
echo "Checking Node.js version..."
node --version || { echo "❌ Node.js not found!"; exit 1; }
echo "✓ Node.js found"
echo ""

# Install all dependencies
echo "📦 Installing dependencies..."
npm install
cd frontend && npm install && cd ..
cd backend && npm install && cd ..
echo "✓ Dependencies installed"
echo ""

# Check for environment file
echo "⚙️  Checking environment configuration..."
if [ ! -f "backend/.env" ]; then
  echo "Creating backend/.env file..."
  cat > backend/.env << EOF
GEMINI_API_KEY=your_api_key_here
PORT=3001
NODE_ENV=development
EOF
  echo "⚠️  Please update backend/.env with your Gemini API key"
else
  echo "✓ backend/.env exists"
fi
echo ""

echo "✅ Setup complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Update backend/.env with your GEMINI_API_KEY"
echo "2. Run 'npm run dev' to start development"
echo "   - Frontend on http://localhost:4200"
echo "   - Backend on http://localhost:3001"
echo ""
echo "For more information, see README.md"
