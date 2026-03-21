#!/bin/bash

# Function to kill background processes on exit
cleanup() {
    echo "Stopping servers..."
    kill $(jobs -p)
    exit
}

trap cleanup SIGINT

echo "🚀 Starting Django Backend..."
cd backend && source venv/bin/activate && python manage.py runserver & 

echo "⚛️ Starting React Frontend..."
cd ../frontend && npm run dev &

# Keep the script running
wait