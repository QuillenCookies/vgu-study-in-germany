# Get the current directory
$root = Get-Location

echo "🚀 Starting Django Backend in a new window..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; .\venv\Scripts\Activate.ps1; python manage.py runserver"

echo "⚛️ Starting React Frontend in a new window..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

echo "✅ Both servers are launching. Check the new windows for logs."