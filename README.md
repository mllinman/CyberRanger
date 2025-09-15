CyberRanger - Wi-Fi & Bluetooth Scanner
====================================================

## 🎯 Project Status: DEPLOYMENT READY

✅ **Working Linux executable** - Fully functional Qt6 application  
✅ **Windows build system** - Complete automated build process  
✅ **Professional installer** - Inno Setup configuration ready  
✅ **Distribution packages** - Ready for deployment  

## 📦 Quick Start

### Linux Users:
```bash
# Run the self-extracting installer
chmod +x CyberRanger_Linux_Installer.run
./CyberRanger_Linux_Installer.run
```

### Windows Users:
```cmd
REM Extract CyberRanger_Windows_v1.0.0.zip
REM Run build_windows.bat to compile (requires Qt6)
REM Run create_installer.bat to build final installer
```

## 🔧 Features:
- Dark mode modern UI
- Tabbed interface: Wi-Fi & Bluetooth & Network scanners
- Real-time scanning capabilities (demonstration implementations)
- Legal compliance with built-in disclaimer
- Cross-platform Qt6-based architecture
- White-hat/Pentester use only

## 📁 New Files Added:
- `release/` - Ready-to-deploy executables and packages
- `build_windows.bat` - Automated Windows compilation
- `deploy_windows.bat` - Windows Qt6 library packaging  
- `create_installer.bat` - Professional installer creation
- `CMakeLists_windows.txt` - Windows-specific CMake configuration
- `installer/CyberRanger.iss` - Enhanced Inno Setup installer script
- `DEPLOYMENT_COMPLETE.md` - Comprehensive deployment documentation

## 🚀 Build Instructions:

### Linux:
1. Install Qt 6 and CMake: `sudo apt install qt6-base-dev cmake`
2. Run: `./build_linux.sh`
3. Execute: `./release/CyberRanger`

### Windows:
1. Install Qt 6, CMake, and Visual Studio 2022
2. Open Qt command prompt and navigate to project folder:
   ```cmd
   build_windows.bat
   deploy_windows.bat  
   create_installer.bat
   ```
3. Run: `release/CyberRanger_Setup_v1.0.0.exe`

## 📋 Distribution Packages Created:
- **Linux**: `CyberRanger_Linux_Installer.run` (67KB) - Self-extracting installer
- **Windows**: `CyberRanger_Windows_v1.0.0.zip` (57KB) - Complete deployment package  
- **Installer Source**: Professional Inno Setup script for Windows installer creation

Resources:
- /resources/darkmode.qss
- /resources/icons/ (wifi.png, bluetooth.png, dashboard.png)
- /assets/ (splash.png, app_icon.png)

**⚖️ Legal Notice**: For authorized penetration testing only. Use responsibly and legally.
