#!/usr/bin/env bash

# CareerBridge — Hackathon MVP Startup Script

echo "========================================================"
echo "  🚀 Starting CareerBridge AI Platform (HACKN'TECH 10.0)"
echo "========================================================"

# Directory resolution
ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$ROOT_DIR"

# 1. Setup / Check Python Virtual Environment
if [ ! -d "venv" ]; then
    echo "📦 Creating Python virtual environment..."
    python3 -m venv venv
    ./venv/bin/pip install -r backend/requirements.txt
fi

# 2. Check Node Modules
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend && npm install && cd "$ROOT_DIR"
fi

# Function to handle process termination
cleanup() {
    echo ""
    echo "🛑 Shutting down CareerBridge services..."
    kill $(jobs -p) 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM EXIT

# 3. Start Backend FastAPI Server
echo "⚡ Starting FastAPI Backend Server on http://localhost:8000..."
PYTHONPATH=backend ./venv/bin/python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

# Wait briefly for backend startup
sleep 2

# 4. Start Frontend Vite Server
echo "🌐 Starting Vite React Frontend Server on http://localhost:5173..."
cd frontend
npm run dev -- --host 0.0.0.0 --port 5173 &
FRONTEND_PID=$!

sleep 2

echo ""
echo "========================================================"
echo "  ✨ CareerBridge Platform is LIVE & READY!"
echo "--------------------------------------------------------"
echo "  🌐 Web App Dashboard : http://localhost:5173"
echo "  ⚡ Backend REST API  : http://localhost:8000"
echo "  📚 API Docs (Swagger): http://localhost:8000/docs"
echo "========================================================"
echo "  Press Ctrl+C to stop all servers."
echo ""

# Keep script running
wait
