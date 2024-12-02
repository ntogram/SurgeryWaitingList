@echo off
echo Starting Development Environment...

:: Start backend in development mode
start /B python "C:\Program Files\SurgeryWaitingList\backend\backend\app.py" --dev > NULL 2>&1

:: Directory change
cd "C:\Program Files\SurgeryWaitingList\frontend"
:: Start frontend (React) in development mode
start /B npm start > NULL 2>&1

echo Backend and Frontend are running in development mode.
pause
