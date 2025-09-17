# CyberRanger 

![CyberRanger Banner](assets/banner.png)

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)]()
[![Qt Version](https://img.shields.io/badge/Qt-6.x-green.svg)]()
[![Platform](https://img.shields.io/badge/Platform-Linux%20%7C%20Windows-lightgrey.svg)]()
[![Version](https://img.shields.io/badge/Version-1.0.0-orange.svg)]()

> **Professional Network Security Scanner & Penetration Testing Tool**

CyberRanger is a comprehensive, cross-platform network security scanner designed for authorized penetration testing and security research. Built with Qt6, it provides a modern dark-themed interface with modular scanner architecture for Wi-Fi networks, Bluetooth devices, and network topology analysis.

## 🚨 **IMPORTANT LEGAL NOTICE**

**⚖️ This tool is designed EXCLUSIVELY for authorized penetration testing and security research.**

- ✅ **Authorized Use**: Security professionals, penetration testers, network administrators
- ✅ **Permitted Scenarios**: Testing your own networks, authorized security assessments  
- ❌ **Prohibited Use**: Unauthorized scanning, illegal network access, malicious activities

**By using CyberRanger, you agree to comply with all applicable laws and regulations. Unauthorized access to computer systems is illegal. Users assume full responsibility for their actions.**

## ✨ Features

### 🔍 **Scanning Capabilities**
- **Wi-Fi Network Discovery** - Detect wireless networks with encryption details
- **Bluetooth Device Scanning** - Identify nearby Bluetooth-enabled devices
- **Network Topology Mapping** - Analyze network structure and open ports
- **Real-time Results** - Live scanning with immediate feedback

### 🎨 **User Interface**  
- **Modern Dark Theme** - Professional cybersecurity aesthetic
- **Tabbed Interface** - Organized modules for different scan types
- **Cross-Platform** - Native Qt6 application for Linux and Windows
- **Responsive Design** - Optimized for various screen sizes

### 🛡️ **Security & Compliance**
- **Legal Disclaimer System** - Built-in compliance verification
- **Authorized Use Only** - Ethical hacking and security research focus
- **Professional Standards** - Industry-standard security tool design

### 🔧 **Technical Architecture**
- **Qt6 Framework** - Modern C++ with cross-platform compatibility
- **Modular Design** - Extensible scanner architecture
- **CMake Build System** - Professional build and deployment pipeline
- **Resource Management** - Optimized assets and theming system

## 🚀 Quick Start

### 📋 Prerequisites

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install qt6-base-dev qt6-base-dev-tools cmake build-essential
```

#### Windows  
- Qt 6.4+ from [qt.io](https://www.qt.io/download)
- CMake 3.16+ from [cmake.org](https://cmake.org/download/)  
- Visual Studio 2022 with C++ development tools

### ⬇️ Installation

#### Option 1: Pre-built Releases (Recommended)

**Linux:**
```bash
# Download and run the self-extracting installer
wget https://github.com/mllinman/CyberRanger/releases/latest/download/CyberRanger_Linux_Installer.run
chmod +x CyberRanger_Linux_Installer.run
./CyberRanger_Linux_Installer.run
```

**Windows:**
```cmd
REM Download CyberRanger_Windows_v1.0.0.zip from releases
REM Extract and run CyberRanger.exe
```

#### Option 2: Build from Source

**Linux:**
```bash
git clone https://github.com/mllinman/CyberRanger.git
cd CyberRanger
chmod +x build_linux.sh
./build_linux.sh
./release/CyberRanger
```

**Windows:**
```cmd
git clone https://github.com/mllinman/CyberRanger.git
cd CyberRanger
build_windows.bat
deploy_windows.bat
create_installer.bat
```

## 📖 Usage Guide

### 🎯 Dashboard
Launch CyberRanger and start with the **Dashboard** tab for an overview of all scanning modules and quick system status.

### 📡 Wi-Fi Scanner
1. Navigate to the **Wi-Fi Scanner** tab
2. Click **"Scan Wi-Fi Networks"** 
3. Review discovered networks with encryption details
4. Analyze signal strength and security configurations

### 📱 Bluetooth Scanner  
1. Open the **Bluetooth Scanner** tab
2. Click **"Scan Bluetooth Devices"**
3. Identify nearby devices with MAC addresses
4. Assess device types and connection status

### 🌐 Network Scanner
1. Access the **Network Scanner** tab  
2. Configure target network ranges
3. Execute comprehensive network discovery
4. Analyze open ports and running services

## 🛠️ Development

### 📁 Project Structure
```
CyberRanger/
├── assets/                 # Application assets (icons, banners)
├── resources/             # UI resources (themes, icons) 
├── Core/                  # Core functionality modules
├── installer/             # Windows installer configuration
├── release/               # Build outputs and distributions
├── simple_main.cpp        # Main application entry point
├── resources.qrc          # Qt resource file
├── CMakeLists.txt         # CMake configuration
└── build_linux.sh         # Linux build script
```

### 🔨 Building & Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** with proper testing
4. **Commit changes**: `git commit -m 'Add amazing feature'`
5. **Push to branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

#### Code Standards
- Follow Qt/C++ best practices
- Maintain dark theme consistency  
- Add appropriate legal disclaimers for security features
- Include comprehensive error handling
- Document all new scanning modules

### 🧪 Testing

```bash
# Build and test on Linux
./build_linux.sh
./release/CyberRanger

# Windows testing
build_windows.bat
CyberRanger.exe
```

## 📦 Distribution Packages

- **Linux**: `CyberRanger_Linux_Installer.run` (67KB) - Self-extracting installer
- **Windows**: `CyberRanger_Windows_v1.0.0.zip` (57KB) - Complete deployment package
- **Source**: Professional Inno Setup installer configuration included

## 🔧 System Requirements

### Minimum Requirements
- **OS**: Linux (Ubuntu 20.04+) / Windows 10+
- **RAM**: 512MB  
- **Storage**: 100MB available space
- **Display**: 1024x768 resolution

### Recommended Requirements  
- **OS**: Linux (Ubuntu 22.04+) / Windows 11
- **RAM**: 2GB
- **Storage**: 500MB available space
- **Display**: 1920x1080 resolution
- **Network**: Admin/root privileges for comprehensive scanning

## ❓ Troubleshooting

### Common Issues

**"Qt platform plugin could not be initialized"**
- **Linux**: Install Qt6 packages: `sudo apt install qt6-base-dev`
- **Windows**: Ensure Qt6 DLLs are in PATH or application directory

**Permission denied during network scanning**
- Run with elevated privileges: `sudo ./CyberRanger` (Linux) or "Run as Administrator" (Windows)
- Verify firewall settings allow network scanning

**Build failures**
- Verify all dependencies installed correctly
- Check CMake version (3.16+ required)
- Ensure C++17 compiler support

### 📞 Support & Community

- **🐛 Bug Reports**: [GitHub Issues](https://github.com/mllinman/CyberRanger/issues)
- **💡 Feature Requests**: [GitHub Discussions](https://github.com/mllinman/CyberRanger/discussions)  
- **📚 Documentation**: [Wiki](https://github.com/mllinman/CyberRanger/wiki)
- **🔧 Build Help**: See `BUILD_README.md` for detailed instructions

## 📄 License & Legal

### License
This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for complete details.

### Security Tool Disclaimer
CyberRanger is designed for authorized penetration testing and security research purposes only. Users are solely responsible for complying with all applicable laws and regulations. Unauthorized access to computer systems is illegal and unethical. The authors and contributors disclaim all responsibility for any misuse or illegal activities conducted with this tool.

### Third-Party Components
- **Qt Framework**: Licensed under LGPL/Commercial License
- **CMake**: BSD-style license
- **ImageMagick**: Apache 2.0 License (development only)

## 🤝 Acknowledgments

- **Qt Project** - Cross-platform application framework
- **Security Community** - Best practices and ethical guidelines
- **Contributors** - All developers who have contributed to this project

---

<div align="center">

**⭐ Star this repository if CyberRanger helps with your security research!**

**🔗 [Website](https://github.com/mllinman/CyberRanger) | [Documentation](https://github.com/mllinman/CyberRanger/wiki) | [Releases](https://github.com/mllinman/CyberRanger/releases) | [Issues](https://github.com/mllinman/CyberRanger/issues)**

Made with ❤️ by the CyberRanger Security Team

</div>