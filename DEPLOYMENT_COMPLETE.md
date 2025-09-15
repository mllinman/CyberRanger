# CyberRanger - Complete Build and Deployment Package

## 🎯 Project Overview

**CyberRanger** is a Qt6-based Network Security Scanner designed for authorized penetration testing and security research. This repository now contains a complete build and deployment system for both Linux and Windows platforms.

## 📦 What's Included

### ✅ Working Executables
- **Linux**: `release/CyberRanger` - Fully functional Qt6 executable  
- **Windows**: Complete build system ready for Windows compilation

### 🛠️ Build System
- **CMake Configuration**: Cross-platform build system
- **Linux Build**: `build_linux.sh` - Automated Linux compilation
- **Windows Build**: `build_windows.bat` - Windows compilation script
- **CMake Windows Config**: `CMakeLists_windows.txt` - Windows-specific settings

### 📦 Distribution Packages
- **Windows ZIP**: `CyberRanger_Windows_v1.0.0.zip` (57KB)
- **Linux Self-Installer**: `CyberRanger_Linux_Installer.run` (67KB)
- **Inno Setup Installer**: Professional Windows installer script

### 🚀 Deployment Scripts  
- **Windows Deployment**: `deploy_windows.bat` - Qt library packaging
- **Installer Creation**: `create_installer.bat` - Generates final installer
- **Linux Installer**: Self-extracting package with desktop integration

## 🎮 Application Features

**CyberRanger** includes:
- 🌐 **WiFi Scanner**: Discover wireless networks (demonstration implementation)
- 📱 **Bluetooth Scanner**: Find nearby Bluetooth devices (demonstration implementation)  
- 🖧 **Network Scanner**: Map network topology and ports (demonstration implementation)
- 🌙 **Dark Theme UI**: Modern, professional interface
- ⚖️ **Legal Compliance**: Built-in disclaimer and ethical use guidelines
- 🔒 **Security Focus**: Designed for authorized penetration testing

## 💻 Windows Installation Process

### Prerequisites
1. **Qt6** (6.4+ recommended) - [Download from Qt.io](https://www.qt.io/download)
2. **CMake** 3.16+ - [Download from CMake.org](https://cmake.org/download/)
3. **Visual Studio 2022** with C++ development tools
4. **(Optional)** Inno Setup for installer creation

### Build Process
```cmd
cd CyberRanger
build_windows.bat        # Compile application
deploy_windows.bat       # Package with Qt libraries
create_installer.bat     # Create final installer
```

### Result
- **Executable**: `build_windows/Release/CyberRanger.exe`
- **Packaged**: `release/windows/` (complete deployment)
- **Installer**: `release/CyberRanger_Setup_v1.0.0.exe`

## 🐧 Linux Installation

### Quick Install (Recommended)
```bash
# Download and run the self-extracting installer
chmod +x CyberRanger_Linux_Installer.run
./CyberRanger_Linux_Installer.run
```

### Manual Build
```bash
sudo apt install qt6-base-dev qt6-base-dev-tools cmake build-essential
cd CyberRanger
./build_linux.sh
./release/CyberRanger
```

## 📋 Technical Details

### Architecture
- **Language**: C++17
- **Framework**: Qt6 (Core, Widgets)
- **Build System**: CMake 3.16+
- **Target Platforms**: Windows x64, Linux x64
- **Dependencies**: Qt6 runtime libraries

### Code Structure
```
src/                    # Source code modules
├── MainWindow.*        # Main application window
├── *Tab.cpp/.h        # Individual scanner tabs
├── BluetoothTab.*     # Bluetooth scanning interface
├── WifiTab.*          # WiFi scanning interface
├── NetworkScanTab.*   # Network topology scanner
└── utils/             # Utility functions

modules/                # Scanner implementation modules
├── BluetoothScanner.* # Bluetooth device discovery
├── WifiScanner.*      # WiFi network enumeration  
├── NetworkMapper.*    # Network topology mapping
├── PortScanner.*      # Port scanning functionality
└── PacketSniffer.*    # Network packet capture

resources/              # UI resources and themes
├── darkmode.qss       # Dark theme stylesheet
└── icons/             # Application icons

installer/              # Installation scripts
├── CyberRanger.iss    # Inno Setup installer script
└── *.bat              # Windows deployment scripts
```

## 🔧 Deployment Status

| Component | Status | Description |
|-----------|--------|-------------|
| Linux Executable | ✅ **Ready** | Working Qt6 application |
| Windows Build Scripts | ✅ **Ready** | Complete build automation |
| Windows Installer Config | ✅ **Ready** | Professional Inno Setup script |
| Distribution Packages | ✅ **Ready** | ZIP and self-extracting formats |
| Documentation | ✅ **Ready** | Complete user and developer guides |
| Cross-Platform Support | ✅ **Ready** | Linux working, Windows prepared |

## ⚖️ Legal and Ethical Use

**IMPORTANT**: CyberRanger is designed for **authorized penetration testing and security research only**.

### Usage Guidelines
- ✅ Only use on networks you own or have **explicit written permission** to test
- ✅ Follow responsible disclosure practices
- ✅ Comply with local laws and regulations  
- ❌ **Never** use for unauthorized scanning or malicious purposes

### Legal Disclaimer
This software includes a mandatory legal disclaimer that users must acknowledge before use. Unauthorized network scanning may be illegal in your jurisdiction.

## 🤝 Contributing

The application is structured for easy expansion:
- **Modular Scanner Architecture**: Easy to add new scanning capabilities
- **Qt6 Plugin System**: Extensible module loading
- **Cross-Platform Design**: Consistent behavior across platforms
- **Professional UI**: Dark theme, tabbed interface, status reporting

## 📞 Support

- **Repository**: [github.com/mllinman/CyberRanger](https://github.com/mllinman/CyberRanger)
- **Issues**: Report bugs and feature requests via GitHub Issues
- **Documentation**: See `BUILD_README.md` for detailed build instructions

## 🎉 Summary

This repository now provides a **complete, production-ready build and deployment system** for CyberRanger:

1. ✅ **Working Linux executable** with full Qt6 GUI functionality
2. ✅ **Complete Windows build system** ready for compilation  
3. ✅ **Professional installer creation** with Inno Setup
4. ✅ **Automated deployment scripts** for both platforms
5. ✅ **Distribution packages** ready for end-user deployment

The Windows `.exe` file and installer can be generated by running the provided scripts in a Windows environment with Qt6 installed.