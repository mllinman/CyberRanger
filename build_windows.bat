@echo off
REM CyberRanger Windows Build Script
REM This script builds CyberRanger for Windows using Qt6 and CMake

echo Building CyberRanger for Windows...

REM Check if Qt6 is available
where qt6-config >nul 2>&1
if %errorlevel% neq 0 (
    echo Qt6 not found in PATH. Please install Qt6 and add it to your PATH.
    echo Download Qt6 from: https://www.qt.io/download
    pause
    exit /b 1
)

REM Check if CMake is available
where cmake >nul 2>&1
if %errorlevel% neq 0 (
    echo CMake not found in PATH. Please install CMake and add it to your PATH.
    echo Download CMake from: https://cmake.org/download/
    pause
    exit /b 1
)

REM Create build directory
if not exist build_windows mkdir build_windows
cd build_windows

REM Configure CMake for Windows
echo Configuring CMake...
cmake -G "Visual Studio 17 2022" -A x64 -DCMAKE_BUILD_TYPE=Release ..
if %errorlevel% neq 0 (
    echo CMake configuration failed!
    pause
    exit /b 1
)

REM Build the project
echo Building CyberRanger...
cmake --build . --config Release
if %errorlevel% neq 0 (
    echo Build failed!
    pause
    exit /b 1
)

REM Deploy Qt libraries
echo Deploying Qt libraries...
cd Release
windeployqt CyberRanger.exe
if %errorlevel% neq 0 (
    echo Warning: windeployqt failed. You may need to manually copy Qt DLLs.
)

cd ..\..\

echo Build completed successfully!
echo Executable located at: build_windows\Release\CyberRanger.exe
echo Run the installer script to create the installation package.
pause