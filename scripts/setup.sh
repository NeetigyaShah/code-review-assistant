#!/bin/bash

# Code Review Assistant - Setup Script
# This script sets up the development environment

set -e  # Exit on error

echo "🚀 Code Review Assistant - Setup Script"
echo "========================================"
echo ""

# Check Node.js
echo "📋 Checking prerequisites..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version must be 18 or higher. Current: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"
echo "✅ npm $(npm -v) detected"
echo ""

# Backend setup
echo "📦 Setting up backend..."
cd backend

if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
else
    echo "✅ Backend dependencies already installed"
fi

# Create .env if not exists
if [ ! -f ".env" ]; then
    echo "⚙️  Creating backend .env file..."
    cat > .env << 'EOF'
PORT=5000
GEMINI_API_KEY=your_api_key_here
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/codeReview
USE_MEMORY_DB=true
MOCK_AI=true
GEMINI_MODEL=gemini-pro
EOF
    echo "⚠️  Please update backend/.env with your Gemini API key!"
    echo "   Get one at: https://aistudio.google.com/app/apikey"
else
    echo "✅ Backend .env already exists"
fi

cd ..
echo "✅ Backend setup complete"
echo ""

# Frontend setup
echo "📦 Setting up frontend..."
cd frontend

if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
else
    echo "✅ Frontend dependencies already installed"
fi

# Create .env if not exists
if [ ! -f ".env" ]; then
    echo "⚙️  Creating frontend .env file..."
    cat > .env << 'EOF'
VITE_API_BASE=http://localhost:5000/api
EOF
else
    echo "✅ Frontend .env already exists"
fi

cd ..
echo "✅ Frontend setup complete"
echo ""

# Summary
echo "🎉 Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Update backend/.env with your Gemini API key (optional - MOCK_AI=true works without it)"
echo "2. Start backend:  cd backend && npm run dev"
echo "3. Start frontend: cd frontend && npm run dev"
echo "4. Open http://localhost:5173 in your browser"
echo ""
echo "For a quick API demo, run: bash scripts/demo.sh"
echo ""
