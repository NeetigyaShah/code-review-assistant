#!/bin/bash

# Code Review Assistant - Start Script
# Starts both backend and frontend in separate terminals

echo "🚀 Starting Code Review Assistant..."
echo ""

# Check if tmux is available
if command -v tmux &> /dev/null; then
    echo "Starting with tmux..."
    
    # Create new tmux session
    tmux new-session -d -s code-review-assistant
    
    # Split window
    tmux split-window -h
    
    # Start backend in left pane
    tmux send-keys -t code-review-assistant:0.0 'cd backend && npm run dev' C-m
    
    # Start frontend in right pane
    tmux send-keys -t code-review-assistant:0.1 'cd frontend && npm run dev' C-m
    
    # Attach to session
    echo "✅ Servers starting in tmux session 'code-review-assistant'"
    echo "   To attach: tmux attach -t code-review-assistant"
    echo "   To detach: Press Ctrl+B then D"
    echo "   To kill session: tmux kill-session -t code-review-assistant"
    echo ""
    
    tmux attach -t code-review-assistant
else
    echo "⚠️  tmux not found. Please start servers manually:"
    echo ""
    echo "Terminal 1: cd backend && npm run dev"
    echo "Terminal 2: cd frontend && npm run dev"
    echo ""
    echo "Or install tmux: sudo apt install tmux"
fi
