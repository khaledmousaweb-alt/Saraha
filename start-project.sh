#!/bin/bash

# Script to start Saraha V2 Project (Backend + Frontend)

echo "🚀 Starting Saraha V2 Project..."

# 1. Start Backend
echo "📡 Starting Backend Server on port 2000..."
cd ../Server
npm start &
BACKEND_PID=$!

# 2. Start Frontend
echo "💻 Starting Frontend Server on port 4200..."
cd ../frontend-angular_V_2
npm start &
FRONTEND_PID=$!

echo "✅ Servers are initiating."
echo "🔗 Backend: http://localhost:2000"
echo "🔗 Frontend: http://localhost:4200"
echo "Press Ctrl+C to stop both servers."

# Trap Ctrl+C to kill both background processes
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT

wait
