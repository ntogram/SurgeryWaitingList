timeout /t 10 >nul

echo Installing dependencies
install_dependencies.bat
echo App Installation
install_app.bat --prod