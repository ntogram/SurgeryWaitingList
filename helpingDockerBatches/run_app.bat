@echo off
:: Check if an argument is provided
if "%1"=="" (
    echo Usage: run_app.bat --prod or --dev
    exit /b 1
)

:: Execute the appropriate Docker Compose command
if "%1"=="--prod" (
    docker-compose -f docker-compose-prod.yml --env-file ./backend/backend/.env up
) else if "%1"=="--dev" (
    docker-compose -f docker-compose-dev.yml --env-file ./backend/backend/.env up
) else (
    echo Invalid argument. Use --prod or --dev.
    exit /b 1
)

echo App is running.
