@echo off
REM CyberRanger Windows Deployment Script
REM This script deploys Qt libraries and prepares the application for distribution

echo Deploying CyberRanger for Windows distribution...

REM Check if build exists
if not exist "build_windows\Release\CyberRanger.exe" (
    echo Error: CyberRanger.exe not found in build_windows\Release\
    echo Please run build_windows.bat first to build the application.
    pause
    exit /b 1
)

REM Create deployment directory
if not exist "release\windows" mkdir "release\windows"

REM Copy main executable
echo Copying executable...
copy "build_windows\Release\CyberRanger.exe" "release\windows\"

REM Copy resources and assets
echo Copying resources...
if exist "assets" xcopy "assets" "release\windows\assets\" /E /I /Y
if exist "resources" xcopy "resources" "release\windows\resources\" /E /I /Y
if exist "modules" xcopy "modules" "release\windows\modules\" /E /I /Y
if exist "config" xcopy "config" "release\windows\config\" /E /I /Y

REM Copy documentation
echo Copying documentation...
copy "README.md" "release\windows\" 2>nul
copy "BUILD_README.md" "release\windows\" 2>nul
copy "LICENSE" "release\windows\" 2>nul

REM Deploy Qt libraries using windeployqt
echo Deploying Qt libraries...
cd "release\windows"
windeployqt CyberRanger.exe --release --qmldir ..\..\resources
if %errorlevel% neq 0 (
    echo Warning: windeployqt failed. Manual DLL copying may be required.
    echo Please ensure Qt6 bin directory is in your PATH.
)
cd ..\..

REM Create run script for easier execution
echo Creating launcher script...
echo @echo off > "release\windows\run_cyberranger.bat"
echo echo Starting CyberRanger Network Security Scanner... >> "release\windows\run_cyberranger.bat"
echo start CyberRanger.exe >> "release\windows\run_cyberranger.bat"

echo.
echo Deployment completed successfully!
echo.
echo Files deployed to: release\windows\
echo Main executable: release\windows\CyberRanger.exe
echo Launcher script: release\windows\run_cyberranger.bat
echo.
echo To create an installer, run: create_installer.bat
echo.
pause