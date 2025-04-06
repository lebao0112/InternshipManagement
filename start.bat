@echo off
echo Starting the application...

REM Start PHP Server
cd server
start cmd /k "php -S localhost:8000 -t public"

REM Start React Frontend
cd ../client
start cmd /k "npm run dev"

echo Servers are starting...
echo Backend will be available at: http://localhost:8000
echo Frontend will be available at: http://localhost:5173 (or check the terminal output)
pause 