@echo off
echo.
echo ===============================================
echo   CyberRanger Network Security Scanner v1.0
echo ===============================================
echo.
echo Starting CyberRanger...
echo.
echo IMPORTANT: This tool is for authorized penetration testing only!
echo Use only on networks you own or have permission to test.
echo.

REM Check if running on Windows
if not exist "CyberRanger.exe" (
    echo Error: CyberRanger.exe not found in current directory.
    echo Please ensure all files are properly installed.
    pause
    exit /b 1
)

REM Start the application
echo Launching CyberRanger Network Security Scanner...
start "" "CyberRanger.exe"

REM Wait a moment to see if it starts successfully
timeout /t 2 /nobreak >nul

echo.
echo If the application doesn't start, please check:
echo 1. Visual C++ Redistributable is installed
echo 2. Qt6 libraries are present
echo 3. Windows Defender/Antivirus isn't blocking the application
echo.
echo For support, visit: https://github.com/mllinman/CyberRanger
echo.