#!/bin/bash

# Code Review Assistant - Quick Demo Script
# This script demonstrates the API functionality

echo "🚀 Code Review Assistant - API Demo"
echo "===================================="
echo ""

API_BASE="http://localhost:5000/api"

# Check if backend is running
echo "📡 Checking backend health..."
HEALTH=$(curl -s "$API_BASE/../health")
if [[ $HEALTH == *"ok"* ]]; then
    echo "✅ Backend is running!"
else
    echo "❌ Backend is not running. Start it with: cd backend && npm run dev"
    exit 1
fi

echo ""
echo "📤 Uploading sample Python file..."
UPLOAD_RESPONSE=$(curl -s -X POST "$API_BASE/files" \
  -H "Content-Type: application/json" \
  -d '{
    "filename": "fibonacci.py",
    "language": "python",
    "content": "def fibonacci(n):\n    \"\"\"Calculate fibonacci number recursively\"\"\"\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)\n\n# Usage\nfor i in range(10):\n    print(f\"F({i}) = {fibonacci(i)}\")"
  }')

FILE_ID=$(echo $UPLOAD_RESPONSE | grep -o '"fileId":"[^"]*"' | cut -d'"' -f4)
echo "✅ File uploaded! ID: $FILE_ID"

echo ""
echo "🔍 Creating code review..."
REVIEW_RESPONSE=$(curl -s -X POST "$API_BASE/reviews" \
  -H "Content-Type: application/json" \
  -d "{\"fileId\": \"$FILE_ID\"}")

REVIEW_ID=$(echo $REVIEW_RESPONSE | grep -o '"reviewId":"[^"]*"' | cut -d'"' -f4)
echo "✅ Review created! ID: $REVIEW_ID"

echo ""
echo "📊 Fetching review details..."
curl -s "$API_BASE/reviews/$REVIEW_ID" | python3 -m json.tool | head -80

echo ""
echo ""
echo "🧪 Generating unit tests..."
TEST_RESPONSE=$(curl -s -X POST "$API_BASE/tests" \
  -H "Content-Type: application/json" \
  -d "{\"fileId\": \"$FILE_ID\"}")

echo "✅ Tests generated!"
echo "$TEST_RESPONSE" | python3 -m json.tool | grep -A 20 '"testCode"'

echo ""
echo "📋 Listing all files..."
curl -s "$API_BASE/files" | python3 -m json.tool

echo ""
echo "🎉 Demo complete! Open http://localhost:5173 to see the UI"
