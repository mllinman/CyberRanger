@echo off
REM CyberRanger Installer Creation Script
REM Creates Windows installer using Inno Setup

echo Creating CyberRanger installer...

REM Check if Inno Setup is installed
where iscc >nul 2>&1
if %errorlevel% neq 0 (
    echo Inno Setup Compiler not found in PATH.
    echo Please install Inno Setup from: https://jrsoftware.org/isinfo.php
    echo Make sure to add the installation directory to your PATH.
    echo.
    echo Typical installation path: C:\Program Files ^(x86^)\Inno Setup 6\
    pause
    exit /b 1
)

REM Check if deployment exists
if not exist "release\windows\CyberRanger.exe" (
    echo Error: Deployed application not found.
    echo Please run deploy_windows.bat first to prepare the application for packaging.
    pause
    exit /b 1
)

REM Create installer output directory
if not exist "release" mkdir "release"

REM Compile installer
echo Compiling installer with Inno Setup...
cd installer
iscc CyberRanger.iss
if %errorlevel% neq 0 (
    echo Error: Installer compilation failed.
    echo Check the Inno Setup script for errors.
    pause
    exit /b 1
)
cd ..

REM Check if installer was created
if exist "release\CyberRanger_Setup_v1.0.0.exe" (
    echo.
    echo ===============================================
    echo Installer created successfully!
    echo ===============================================
    echo.
    echo Installer location: release\CyberRanger_Setup_v1.0.0.exe
    echo File size: 
    for %%A in ("release\CyberRanger_Setup_v1.0.0.exe") do echo %%~zA bytes
    echo.
    echo The installer includes:
    echo - CyberRanger.exe ^(main application^)
    echo - Qt6 libraries and dependencies
    echo - Resources and assets
    echo - Documentation
    echo - Desktop and Start Menu shortcuts
    echo - Uninstaller
    echo.
    echo You can now distribute this installer to end users.
    echo.
) else (
    echo Error: Installer file not found after compilation.
    echo Check the Inno Setup output for errors.
)

pause