# CyberRanger Build and Deployment Scripts

This directory contains scripts and configuration files for building and deploying CyberRanger on different platforms.

## Files:

### Build Scripts
- `build_windows.bat` - Windows build script using Qt6 and CMake
- `build_linux.sh` - Linux build script (created below)
- `CMakeLists_windows.txt` - Windows-specific CMake configuration

### Deployment
- `deploy_windows.bat` - Windows deployment script with Qt libraries
- `create_installer.bat` - Creates Windows installer using Inno Setup

## Windows Build Instructions:

1. **Prerequisites:**
   - Install Qt6 (6.4+ recommended) from https://www.qt.io/download
   - Install CMake 3.16+ from https://cmake.org/download/
   - Install Visual Studio 2022 with C++ development tools
   - (Optional) Install Inno Setup for creating installers

2. **Build Process:**
   ```cmd
   cd CyberRanger
   build_windows.bat
   ```

3. **Create Installer:**
   ```cmd
   create_installer.bat
   ```

## Linux Build Instructions:

1. **Prerequisites:**
   ```bash
   sudo apt install qt6-base-dev qt6-base-dev-tools cmake build-essential
   ```

2. **Build Process:**
   ```bash
   cd CyberRanger
   ./build_linux.sh
   ```

## Current Status:

- ✅ Linux executable working and tested
- 🔄 Windows build scripts created (needs Windows environment to execute)
- ✅ Inno Setup installer scripts available
- 🔄 Deployment automation in progress

The application is a Qt6-based network security scanner with the following features:
- Modern dark-theme GUI
- WiFi network scanning (demonstration/stub)
- Bluetooth device discovery (demonstration/stub) 
- Network topology scanning (demonstration/stub)
- Legal disclaimer and compliance checks