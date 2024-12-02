@echo off
echo Starting Development Environment...

:: Start backend in development mode
start "" python app.py --dev
:: Directory Change
cd C:\Users\user123\Downloads\SurgeryWaitingList\SurgeryWaitingList\frontend
:: Start frontend (React) in development mode
start "" npm start

echo Backend and Frontend are running in development mode.
pause
