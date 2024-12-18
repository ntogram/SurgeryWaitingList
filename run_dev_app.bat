@echo off
echo Starting Development Environment...

:: Start backend in development mode
start /B python "backend\backend\app.py" --dev > nul 2>&1

:: Directory change
cd frontend
:: Start frontend (React) in development mode
start /B npm start > nul 2>&1

echo Backend and Frontend are running in development mode.
pause
