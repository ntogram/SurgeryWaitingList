@echo off
echo Starting Production Environment...

:: Start backend in production mode
start "" python "C:\Users\user123\Downloads\SurgeryWaitingList\SurgeryWaitingList\backend\backend\app.py" --prod

:: Start NGINX server to serve the React app and API
cd C:\nginx-1.27.3
start "" nginx

echo Backend and NGINX are running in production mode.
pause
