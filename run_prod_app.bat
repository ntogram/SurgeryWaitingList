@echo off
echo Starting Production Environment...

:: Start backend in production mode
start /B python "C:\Program Files\SurgeryWaitingList\backend\backend\app.py" --prod > NULL 2>&1
echo Backend starting in production
:: Directory change
cd C:\nginx-1.27.3
:: Start NGINX server to serve the React app and API
nginx.exe > NULL 2>&1
echo Frontend starting in production
echo Backend and NGINX are running in production mode.
pause
