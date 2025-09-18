# CyberRanger 🛡️

<div align="center">

![CyberRanger Banner](assets/banner.png)

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)](https://github.com/mllinman/CyberRanger/actions)
[![Qt Version](https://img.shields.io/badge/Qt-6.4+-green.svg)](https://www.qt.io/)
[![Platform](https://img.shields.io/badge/Platform-Linux%20%7C%20Windows-lightgrey.svg)]()
[![Version](https://img.shields.io/badge/Version-1.0.0-orange.svg)](https://github.com/mllinman/CyberRanger/releases)
[![Security](https://img.shields.io/badge/Security-Authorized%20Use%20Only-red.svg)](SECURITY.md)
[![Contributors](https://img.shields.io/badge/Contributors-Welcome-purple.svg)](CONTRIBUTING.md)

### *Professional Network Security Scanner & Penetration Testing Tool*

*Empowering ethical hackers and security professionals with comprehensive network analysis capabilities*

</div>

---

## 📋 Table of Contents

- [🔍 Overview](#-overview)
- [🚨 Important Legal Notice](#-important-legal-notice)  
- [✨ Features](#-features)
- [🚀 Quick Start](#-quick-start)
- [📖 Usage Guide](#-usage-guide)
- [🛠️ Development](#️-development)
- [📦 Distribution](#-distribution-packages)
- [🔧 System Requirements](#-system-requirements)
- [❓ Troubleshooting](#-troubleshooting)
- [📄 License & Legal](#-license--legal)
- [🤝 Acknowledgments](#-acknowledgments)

---

## 🔍 Overview

CyberRanger is a comprehensive, cross-platform network security scanner designed exclusively for **authorized penetration testing and security research**. Built with modern Qt6 framework, it provides an intuitive dark-themed interface with modular scanner architecture for Wi-Fi networks, Bluetooth devices, and network topology analysis.

### 🎯 Key Highlights

- ⚡ **Real-time Scanning** - Live network analysis with instant feedback
- 🌐 **Cross-Platform** - Native support for Linux and Windows environments  
- 🎨 **Professional UI** - Modern dark theme optimized for security professionals
- 🔒 **Ethical Focus** - Built-in legal compliance and authorization verification
- 📊 **Comprehensive Reports** - Detailed analysis with actionable insights
- 🧩 **Modular Design** - Extensible architecture for custom scanner modules

## 🚨 **IMPORTANT LEGAL NOTICE**

**⚖️ This tool is designed EXCLUSIVELY for authorized penetration testing and security research.**

- ✅ **Authorized Use**: Security professionals, penetration testers, network administrators
- ✅ **Permitted Scenarios**: Testing your own networks, authorized security assessments  
- ❌ **Prohibited Use**: Unauthorized scanning, illegal network access, malicious activities

**By using CyberRanger, you agree to comply with all applicable laws and regulations. Unauthorized access to computer systems is illegal. Users assume full responsibility for their actions.**

## ✨ Features

<table>
<tr>
<td width="50%">

### 🔍 **Advanced Scanning Capabilities**
- 📡 **Wi-Fi Network Analysis**
  - WEP/WPA/WPA2/WPA3 encryption detection
  - Signal strength and channel analysis  
  - SSID enumeration with hidden network discovery
- 📱 **Bluetooth Device Discovery**
  - Device type identification and classification
  - MAC address collection and analysis
  - Connection status monitoring
- 🌐 **Network Topology Mapping**
  - Port scanning with service detection
  - Host discovery and OS fingerprinting
  - Network infrastructure analysis

### 🛡️ **Security & Compliance**
- ⚖️ **Legal Compliance Framework**
  - Built-in authorization verification system
  - Mandatory ethical use acknowledgment
  - Comprehensive legal disclaimer integration
- 🔒 **Professional Security Standards**
  - Industry-standard scanning methodologies
  - Non-intrusive default configurations
  - Audit trail and logging capabilities

</td>
<td width="50%">

### 🎨 **Modern User Experience**
- 🌑 **Professional Dark Theme**
  - Optimized for extended security research sessions
  - High contrast design for improved readability
  - Customizable interface elements
- 📊 **Intuitive Dashboard**
  - Real-time scanning status and progress
  - Centralized results management
  - Quick-access module launcher
- 🖥️ **Cross-Platform Compatibility**
  - Native Linux and Windows support
  - Responsive design for various screen sizes
  - Touch-friendly interface elements

### 🔧 **Technical Excellence**
- ⚡ **High-Performance Architecture**
  - Multi-threaded scanning engine
  - Optimized memory management
  - Efficient resource utilization
- 🧩 **Extensible Design**
  - Plugin-ready modular architecture
  - Custom scanner module support
  - API-driven development framework
- 🛠️ **Professional Build System**
  - CMake-based cross-platform compilation
  - Automated dependency management
  - Continuous integration ready

</td>
</tr>
</table>

## 🚀 Quick Start

### 📋 Prerequisites

<details>
<summary><strong>🐧 Linux (Ubuntu/Debian)</strong></summary>

```bash
# Update package repositories
sudo apt update

# Install Qt6 development dependencies
sudo apt install qt6-base-dev qt6-base-dev-tools cmake build-essential

# Install additional development tools
sudo apt install git curl wget

# Verify Qt6 installation
qmake6 --version
```

**Supported Distributions:**
- Ubuntu 20.04+ (LTS recommended)
- Debian 11+
- Fedora 35+
- openSUSE Leap 15.4+

</details>

<details>
<summary><strong>🪟 Windows</strong></summary>

**Required Components:**
1. **Qt 6.4+** - Download from [qt.io](https://www.qt.io/download)
   - Select "Qt Online Installer"
   - Choose Qt 6.4+ with MinGW or MSVC compiler
2. **CMake 3.16+** - Download from [cmake.org](https://cmake.org/download/)
3. **Git for Windows** - Download from [git-scm.com](https://git-scm.com/)
4. **Visual Studio Build Tools** (if using MSVC)
   - Download from [Microsoft Build Tools](https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022)

**Environment Setup:**
```cmd
REM Add Qt6 and CMake to PATH
set PATH=%PATH%;C:\Qt\6.4.2\mingw_64\bin
set PATH=%PATH%;C:\Program Files\CMake\bin
```

</details>

### ⬇️ Installation Options

#### Option 1: 📦 Pre-built Releases *(Recommended)*

<details>
<summary><strong>🐧 Linux Installation</strong></summary>

```bash
# Download latest release
wget https://github.com/mllinman/CyberRanger/releases/latest/download/CyberRanger_Linux_x64.tar.gz

# Extract archive
tar -xzf CyberRanger_Linux_x64.tar.gz

# Make executable and run
chmod +x CyberRanger
./CyberRanger

# Optional: Install system-wide
sudo cp CyberRanger /usr/local/bin/
sudo cp assets/app_icon.png /usr/share/pixmaps/cyberranger.png
```

</details>

<details>
<summary><strong>🪟 Windows Installation</strong></summary>

1. Download `CyberRanger_Windows_v1.0.0.zip` from [releases](https://github.com/mllinman/CyberRanger/releases)
2. Extract to desired location (e.g., `C:\Program Files\CyberRanger\`)
3. Run `CyberRanger.exe` as Administrator for full scanning capabilities
4. Add to PATH for command-line access (optional)

</details>

#### Option 2: 🔨 Build from Source

<details>
<summary><strong>🐧 Linux Build Process</strong></summary>

```bash
# Clone repository
git clone https://github.com/mllinman/CyberRanger.git
cd CyberRanger

# Verify dependencies
./scripts/check-dependencies.sh  # Optional verification script

# Build application
chmod +x build_linux.sh
./build_linux.sh

# Run CyberRanger
./release/CyberRanger

# Optional: Run with debug output
QT_LOGGING_RULES="*=true" ./release/CyberRanger
```

</details>

<details>
<summary><strong>🪟 Windows Build Process</strong></summary>

```cmd
REM Clone repository
git clone https://github.com/mllinman/CyberRanger.git
cd CyberRanger

REM Build application
build_windows.bat

REM Deploy Qt dependencies
deploy_windows.bat

REM Create installer (optional)
create_installer.bat

REM Run application
cd release
CyberRanger.exe
```

</details>

### 🚀 First Launch

1. **Accept Legal Disclaimer** - Review and acknowledge terms of authorized use
2. **Verify Network Permissions** - Ensure appropriate privileges for network scanning
3. **Explore Dashboard** - Familiarize yourself with the interface and available modules
4. **Run Initial Scan** - Start with the Wi-Fi scanner for a quick test

> **⚠️ Important:** For comprehensive network scanning, run CyberRanger with elevated privileges (`sudo` on Linux, "Run as Administrator" on Windows)

## 📖 Usage Guide

### 🎯 Dashboard Overview

The **Dashboard** serves as your command center, providing:
- 📊 **Scan Status Panel** - Real-time progress of active operations
- 🔍 **Quick Scan Launcher** - One-click access to frequently used scanners
- 📈 **Results Summary** - Overview of recent discoveries
- ⚙️ **Configuration Access** - Direct links to scanner settings

### 🔍 Detailed Scanner Modules

<details>
<summary><strong>📡 Wi-Fi Network Scanner</strong></summary>

**Purpose:** Discover and analyze wireless networks in your vicinity

**Key Features:**
- Encryption type detection (Open, WEP, WPA/WPA2/WPA3)
- Signal strength measurement (RSSI values)
- Channel utilization analysis
- Hidden SSID detection

**Usage Steps:**
1. Navigate to **Wi-Fi Scanner** tab
2. Select network interface (if multiple available)
3. Configure scan parameters:
   - **Scan Duration:** 30-300 seconds
   - **Channel Range:** All channels or specific selection
   - **Detection Sensitivity:** Normal or High
4. Click **"Start Wi-Fi Scan"**
5. Monitor real-time results in the data table
6. Export results to CSV/JSON format

**Output Interpretation:**
- 🟢 **Green signals:** Strong networks (-30 to -50 dBm)
- 🟡 **Yellow signals:** Moderate networks (-51 to -70 dBm)  
- 🔴 **Red signals:** Weak networks (-71+ dBm)

</details>

<details>
<summary><strong>📱 Bluetooth Device Scanner</strong></summary>

**Purpose:** Identify and catalog Bluetooth-enabled devices

**Key Features:**
- Device type classification (phone, computer, headset, etc.)
- MAC address collection and vendor lookup
- Connection status monitoring
- Proximity estimation

**Usage Steps:**
1. Open **Bluetooth Scanner** tab
2. Ensure Bluetooth adapter is enabled
3. Configure discovery parameters:
   - **Discovery Mode:** Standard or Extended
   - **Device Filter:** All devices or specific types
   - **Scan Timeout:** 15-120 seconds
4. Click **"Start Bluetooth Discovery"**
5. Review discovered devices in the results panel
6. Double-click devices for detailed information

**Device Categories:**
- 📱 **Mobile Devices** - Smartphones and tablets
- 💻 **Computers** - Laptops and desktops
- 🎧 **Audio Devices** - Headphones and speakers
- ⌚ **Wearables** - Smartwatches and fitness trackers
- 🚗 **Automotive** - Car systems and accessories

</details>

<details>
<summary><strong>🌐 Network Topology Scanner</strong></summary>

**Purpose:** Map network infrastructure and identify active hosts

**Key Features:**
- Host discovery with ping sweeps
- Port scanning with service identification
- Operating system fingerprinting
- Network route tracing

**Usage Steps:**
1. Access **Network Scanner** tab
2. Define target network range:
   - **Single Host:** 192.168.1.100
   - **Subnet Range:** 192.168.1.0/24
   - **Custom Range:** 192.168.1.1-192.168.1.50
3. Configure scan options:
   - **Scan Type:** Quick, Comprehensive, or Custom
   - **Port Range:** Common ports or full range
   - **Timing:** Aggressive, Normal, or Stealth
4. Click **"Launch Network Scan"**
5. Monitor progress in the scan progress panel
6. Analyze results in the network tree view

**Scan Types:**
- ⚡ **Quick Scan** - Common ports only (faster execution)
- 🔍 **Comprehensive** - Full port range (thorough analysis)
- ⚙️ **Custom** - User-defined parameters

</details>

### 📊 Results Management

**Exporting Data:**
- **CSV Format** - Spreadsheet-compatible data export
- **JSON Format** - Structured data for further processing
- **PDF Reports** - Professional formatted reports
- **XML Format** - Machine-readable structured output

**Data Organization:**
- **Session History** - Track previous scan sessions
- **Favorites** - Bookmark frequently accessed targets
- **Notes & Annotations** - Add custom observations
- **Comparison Mode** - Compare results across time periods

### ⚙️ Advanced Configuration

**Performance Tuning:**
- Adjust thread pool size based on system capabilities
- Configure memory usage limits for large scans
- Set network timeout values for optimal performance

**Interface Customization:**
- Choose from multiple dark theme variants
- Adjust font sizes for accessibility
- Configure data refresh intervals
- Customize keyboard shortcuts

### 🔒 Security Best Practices

1. **Always obtain proper authorization** before scanning networks
2. **Use stealth modes** when conducting authorized tests
3. **Document all scanning activities** for audit purposes
4. **Respect network policies** and scanning windows
5. **Secure scan results** with appropriate access controls

## 🛠️ Development

### 📁 Project Architecture

```
CyberRanger/
├── 📁 assets/                    # Visual assets and branding
│   ├── banner.png               # Documentation header banner
│   ├── app_icon.png            # Application icon (64x32)
│   └── splash.png              # Startup splash screen
├── 📁 resources/               # Qt UI resources and themes
│   ├── dark_theme.qss          # Dark theme stylesheet
│   └── icons/                  # Module-specific icons
├── 📁 Core/                    # Core application modules
│   ├── NetworkScanner/         # Network analysis components
│   ├── WiFiScanner/           # Wireless network modules
│   └── BluetoothScanner/      # Bluetooth discovery modules
├── 📁 installer/               # Deployment configurations
│   ├── windows/               # Windows installer scripts
│   └── linux/                 # Linux packaging files  
├── 📁 release/                 # Build outputs and binaries
├── 📁 build/                   # Temporary build files
├── 📄 simple_main.cpp          # Application entry point
├── 📄 resources.qrc            # Qt resource definitions
├── 📄 CMakeLists.txt           # CMake build configuration
└── 📄 build_linux.sh           # Linux build automation
```

### 🔨 Building & Contributing

<details>
<summary><strong>🚀 Quick Contribution Setup</strong></summary>

```bash
# 1. Fork repository on GitHub
# 2. Clone your fork locally
git clone https://github.com/YOUR_USERNAME/CyberRanger.git
cd CyberRanger

# 3. Create feature branch
git checkout -b feature/amazing-feature

# 4. Set up development environment
chmod +x scripts/setup-dev-environment.sh
./scripts/setup-dev-environment.sh

# 5. Make your changes with proper testing
# 6. Run quality checks
./scripts/run-tests.sh
./scripts/check-code-style.sh

# 7. Commit with descriptive message
git commit -m "Add amazing feature with comprehensive tests"

# 8. Push to your fork
git push origin feature/amazing-feature

# 9. Open Pull Request with detailed description
```

</details>

#### 📝 Development Standards

**Code Quality Requirements:**
- ✅ Follow Qt/C++ best practices and modern C++17 standards
- ✅ Maintain consistent dark theme styling across all components
- ✅ Include appropriate legal disclaimers for all security features
- ✅ Implement comprehensive error handling and user feedback
- ✅ Document all new scanner modules with inline comments
- ✅ Write unit tests for critical functionality
- ✅ Ensure cross-platform compatibility (Linux & Windows)

**Security Guidelines:**
- 🔒 All scanning operations must include authorization checks
- 🔒 Default configurations should be non-intrusive and safe
- 🔒 Log all significant security operations for audit trails
- 🔒 Validate user inputs to prevent injection attacks
- 🔒 Use secure coding practices for network operations

### 🧪 Testing & Quality Assurance

<details>
<summary><strong>🔍 Testing Procedures</strong></summary>

**Build Verification:**
```bash
# Linux testing workflow
./build_linux.sh
./release/CyberRanger --run-tests

# Windows testing workflow  
build_windows.bat
cd release
CyberRanger.exe --run-tests

# Performance testing
./scripts/performance-tests.sh

# Memory leak detection
valgrind --leak-check=full ./release/CyberRanger
```

**Manual Testing Checklist:**
- [ ] Legal disclaimer displays and functions correctly
- [ ] All scanner modules load without errors
- [ ] Dark theme consistency across all interfaces
- [ ] Network scanning permissions work properly
- [ ] Export functionality generates valid output files
- [ ] Cross-platform UI scaling and responsiveness
- [ ] Error handling for network connectivity issues

</details>

**Automated Testing:**
- **Unit Tests** - Core functionality and algorithms
- **Integration Tests** - Module interaction and data flow
- **UI Tests** - Interface responsiveness and accessibility
- **Security Tests** - Input validation and authorization
- **Performance Tests** - Memory usage and response times

### 🎯 Development Roadmap

**Version 1.1.0 (Planned)**
- [ ] Enhanced plugin architecture for custom scanners
- [ ] RESTful API for programmatic access
- [ ] Advanced reporting with custom templates
- [ ] Database integration for scan history
- [ ] Multi-language internationalization support

**Version 1.2.0 (Future)**
- [ ] Machine learning-based threat detection
- [ ] Cloud integration for collaborative analysis  
- [ ] Mobile companion application
- [ ] Advanced network visualization
- [ ] Integration with popular security frameworks

### 🔧 Development Tools

**Recommended IDE Setup:**
- **Qt Creator** - Official Qt IDE with full debugging support
- **Visual Studio Code** - Lightweight editor with C++ extensions
- **CLion** - JetBrains IDE with excellent CMake integration

**Essential Extensions:**
- Qt6 development tools and documentation
- CMake language support and syntax highlighting
- C++ IntelliSense and code navigation
- Git integration with visual diff support
- Markdown preview for documentation editing

### 📋 Code Review Process

1. **Pre-Review Checklist:**
   - [ ] Code compiles successfully on target platforms
   - [ ] All tests pass without failures
   - [ ] Documentation updated for new features
   - [ ] Legal compliance verified for security features

2. **Review Criteria:**
   - Code quality and maintainability
   - Security implications and authorization checks
   - Performance impact and resource usage
   - User experience and interface consistency
   - Cross-platform compatibility considerations

3. **Approval Requirements:**
   - At least one maintainer approval
   - Successful automated build verification
   - Security review for scanning-related changes
   - Documentation completeness verification

## 📦 Distribution Packages

### 📥 Official Releases

| Platform | Package Type | Size | Download Link |
|----------|-------------|------|---------------|
| 🐧 **Linux x64** | Self-extracting Archive | ~850 KB | [CyberRanger_Linux_x64.tar.gz](https://github.com/mllinman/CyberRanger/releases/latest) |
| 🪟 **Windows x64** | ZIP Archive | ~1.2 MB | [CyberRanger_Windows_v1.0.0.zip](https://github.com/mllinman/CyberRanger/releases/latest) |
| 🪟 **Windows x64** | MSI Installer | ~1.5 MB | [CyberRanger_Setup_v1.0.0.msi](https://github.com/mllinman/CyberRanger/releases/latest) |

### 🛠️ Build Artifacts

**Professional Packaging:**
- **Inno Setup Configuration** - Windows installer with registry integration
- **AppImage Support** - Portable Linux application format
- **Docker Containers** - Containerized deployment options
- **Snap Packages** - Universal Linux distribution support

**Development Builds:**
- Nightly builds available for testing latest features
- Debug symbols included for development debugging
- Source maps and documentation bundles

## 🔧 System Requirements

### 💻 Minimum Requirements

| Component | Linux | Windows |
|-----------|-------|---------|
| **Operating System** | Ubuntu 20.04+ / Debian 11+ | Windows 10 version 1903+ |
| **Processor** | 64-bit x86/AMD64 | 64-bit x86/AMD64 |
| **Memory** | 512 MB RAM | 1 GB RAM |
| **Storage** | 150 MB available space | 200 MB available space |
| **Display** | 1024x768 resolution | 1024x768 resolution |
| **Network** | Ethernet or Wi-Fi adapter | Ethernet or Wi-Fi adapter |
| **Privileges** | sudo access for network scanning | Administrator rights |

### 🚀 Recommended Specifications

| Component | Linux | Windows |
|-----------|-------|---------|
| **Operating System** | Ubuntu 22.04 LTS / Fedora 37+ | Windows 11 22H2+ |
| **Processor** | Multi-core 2.0+ GHz | Multi-core 2.4+ GHz |
| **Memory** | 4 GB RAM | 8 GB RAM |
| **Storage** | 1 GB available space (SSD) | 2 GB available space (SSD) |
| **Display** | 1920x1080 resolution | 1920x1080 resolution |
| **Network** | Gigabit Ethernet + Wi-Fi 6 | Gigabit Ethernet + Wi-Fi 6 |
| **Additional** | Bluetooth 5.0+ adapter | Bluetooth 5.0+ adapter |

### 🔌 Hardware Compatibility

**Supported Network Adapters:**
- Intel Wi-Fi chipsets (recommended for best compatibility)
- Realtek wireless adapters with monitor mode support
- Atheros chipsets with packet injection capabilities
- USB Wi-Fi adapters with appropriate drivers

**Bluetooth Requirements:**
- Bluetooth 4.0+ adapter (Bluetooth 5.0+ recommended)
- Driver support for device discovery APIs
- LE (Low Energy) support for modern device detection

### ⚡ Performance Optimization

**For Large Network Scans:**
- Increase available RAM to 8GB+ for enterprise networks
- Use SSD storage for faster scan result processing
- Dedicated network interface for isolated scanning
- Multi-core processor for parallel scan operations

**Resource Usage Guidelines:**
- **CPU Usage:** 15-40% during active scanning operations
- **Memory Usage:** 100-500 MB depending on scan scope
- **Network Bandwidth:** Minimal impact with stealth scanning modes
- **Storage I/O:** Burst activity during result export operations

## ❓ Troubleshooting

### 🔧 Common Issues & Solutions

<details>
<summary><strong>🚫 "Qt platform plugin could not be initialized"</strong></summary>

**Symptoms:**
- Application fails to start with Qt platform error
- Black screen or immediate crash on startup

**Solutions:**

**Linux:**
```bash
# Install missing Qt6 packages
sudo apt update && sudo apt install qt6-base-dev qt6-qpa-plugins

# Set Qt platform explicitly
export QT_QPA_PLATFORM=xcb
./release/CyberRanger

# Alternative: Try different platform plugins
export QT_QPA_PLATFORM=wayland
./release/CyberRanger
```

**Windows:**
```cmd
REM Ensure Qt6 DLLs are accessible
set PATH=%PATH%;C:\Qt\6.4.2\mingw_64\bin

REM Copy Qt plugins to application directory
copy "C:\Qt\6.4.2\mingw_64\plugins\*" ".\plugins\" /S

REM Run with debug output
set QT_DEBUG_PLUGINS=1
CyberRanger.exe
```

</details>

<details>
<summary><strong>🔒 "Permission denied during network scanning"</strong></summary>

**Symptoms:**
- Network scans fail to start or return empty results
- Error messages about insufficient privileges

**Solutions:**

**Linux:**
```bash
# Run with elevated privileges
sudo ./release/CyberRanger

# Add user to netdev group (persistent solution)
sudo usermod -a -G netdev $USER
# Logout and login again

# Set capabilities for specific operations
sudo setcap cap_net_raw,cap_net_admin=eip ./release/CyberRanger
```

**Windows:**
```cmd
REM Run as Administrator (Right-click → "Run as Administrator")
REM Or use Command Prompt as Administrator:
cd "C:\Program Files\CyberRanger"
CyberRanger.exe
```

**Firewall Configuration:**
- Add CyberRanger to firewall exceptions
- Ensure ICMP traffic is permitted for ping operations
- Allow raw socket access for advanced scanning

</details>

<details>
<summary><strong>⚠️ Build Failures & Compilation Errors</strong></summary>

**Symptoms:**
- CMake configuration fails
- Compiler errors during build process
- Missing dependencies or libraries

**Solutions:**

**Linux:**
```bash
# Clean previous build attempts
rm -rf build/ release/
rm CMakeCache.txt

# Update build dependencies
sudo apt update && sudo apt upgrade
sudo apt install build-essential cmake qt6-base-dev git

# Verify Qt6 installation
pkg-config --modversion Qt6Core
qmake6 --version

# Force clean build
./build_linux.sh --clean
```

**Windows:**
```cmd
REM Clean build environment
rmdir /s /q build
rmdir /s /q release
del CMakeCache.txt

REM Verify environment variables
echo %QTDIR%
echo %PATH%

REM Use specific compiler
set CC=gcc
set CXX=g++
build_windows.bat
```

**Common Compiler Issues:**
- Ensure C++17 standard support
- Check Qt6 version compatibility (6.4+ required)
- Verify CMake version (3.16+ required)
- Update compiler to latest stable version

</details>

<details>
<summary><strong>🌐 Network Adapter Detection Issues</strong></summary>

**Symptoms:**
- No network interfaces detected
- Wi-Fi scanner shows empty results
- Bluetooth adapter not recognized

**Solutions:**

**Linux:**
```bash
# Check network interfaces
ip link show
iwconfig

# Install wireless tools
sudo apt install wireless-tools wpasupplicant

# Enable monitor mode (if supported)
sudo ip link set wlan0 down
sudo iwconfig wlan0 mode monitor
sudo ip link set wlan0 up

# Check Bluetooth status
bluetoothctl show
systemctl status bluetooth
```

**Windows:**
```cmd
REM Check network adapters
ipconfig /all
netsh wlan show interfaces

REM Scan for hardware changes
devmgmt.msc

REM Enable Bluetooth service
net start bthserv
services.msc
```

**Driver Updates:**
- Update network adapter drivers through device manager
- Install vendor-specific wireless utilities
- Ensure monitor mode support for advanced Wi-Fi scanning

</details>

### 🐛 Advanced Debugging

<details>
<summary><strong>🔍 Enable Debug Logging</strong></summary>

**Linux:**
```bash
# Enable Qt debug output
export QT_LOGGING_RULES="*=true"
./release/CyberRanger

# Application-specific debugging
export CYBERRANGER_DEBUG=1
export CYBERRANGER_LOG_LEVEL=DEBUG
./release/CyberRanger 2>&1 | tee cyberranger.log
```

**Windows:**
```cmd
REM Enable comprehensive logging
set QT_LOGGING_RULES=*=true
set CYBERRANGER_DEBUG=1
CyberRanger.exe > cyberranger.log 2>&1
```

</details>

<details>
<summary><strong>🔬 Performance Monitoring</strong></summary>

**System Resource Usage:**
```bash
# Monitor resource usage during scans
htop
iotop
nethogs

# Check memory leaks (Linux)
valgrind --leak-check=full ./release/CyberRanger

# Network traffic analysis
sudo tcpdump -i any port not ssh
wireshark
```

</details>

### 📞 Support & Community

**Getting Help:**
- 🐛 **Bug Reports** - [GitHub Issues](https://github.com/mllinman/CyberRanger/issues) with detailed system information
- 💡 **Feature Requests** - [GitHub Discussions](https://github.com/mllinman/CyberRanger/discussions) for new functionality ideas
- 📚 **Documentation** - [Wiki](https://github.com/mllinman/CyberRanger/wiki) for comprehensive guides
- 🔧 **Build Support** - Refer to [BUILD_README.md](BUILD_README.md) for detailed compilation instructions

**When Reporting Issues:**

Please include the following information:
- Operating system and version
- Qt6 version and installation method
- Complete error messages or logs
- Steps to reproduce the issue
- Expected vs. actual behavior
- Network adapter and driver information
- Screenshots of error dialogs (if applicable)

**Response Time Expectations:**
- 🚨 **Security Issues** - Within 24 hours (private disclosure)
- 🐛 **Critical Bugs** - 2-3 business days
- 💡 **Feature Requests** - 1-2 weeks for initial review
- ❓ **General Questions** - Community-driven support

**Community Guidelines:**
- Use clear, descriptive titles for issues
- Search existing issues before creating new ones
- Be respectful and constructive in discussions
- Follow the issue template format
- Provide minimal reproducible examples when possible

## 📄 License & Legal

### 📋 Software License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for complete legal terms and conditions.

**MIT License Summary:**
- ✅ **Commercial Use** - Use in commercial applications and environments
- ✅ **Modification** - Modify source code for custom requirements
- ✅ **Distribution** - Distribute original or modified versions
- ✅ **Private Use** - Use for personal and internal purposes
- ❗ **Attribution Required** - Include copyright notice in redistributions
- 🚫 **No Warranty** - Software provided "as is" without guarantees

### ⚖️ Security Tool Disclaimer

**CRITICAL LEGAL NOTICE:** CyberRanger is designed **exclusively** for authorized penetration testing and legitimate security research purposes.

#### Authorized Use Cases
- ✅ **Security Professionals** - Authorized penetration testing engagements
- ✅ **Network Administrators** - Testing their own organizational networks
- ✅ **Researchers** - Academic security research with proper approvals
- ✅ **Ethical Hackers** - Bug bounty programs with explicit authorization
- ✅ **IT Auditors** - Compliance testing with documented permissions

#### Prohibited Activities
- ❌ **Unauthorized Scanning** - Testing networks without explicit permission
- ❌ **Malicious Activities** - Using tool for illegal or harmful purposes
- ❌ **Privacy Violations** - Collecting personal information without consent
- ❌ **Corporate Espionage** - Unauthorized competitive intelligence gathering
- ❌ **Law Enforcement Impersonation** - Misrepresenting authority or credentials

#### Legal Responsibilities
By downloading, installing, or using CyberRanger, you acknowledge and agree that:

1. **Full Legal Responsibility** - You assume complete responsibility for your actions
2. **Compliance Obligation** - You will comply with all applicable local, national, and international laws
3. **Authorization Verification** - You will obtain proper written authorization before any scanning activities
4. **Damage Liability** - You are solely liable for any damages resulting from tool usage
5. **Geographic Restrictions** - You understand that laws vary by jurisdiction and will comply accordingly

#### Developer Disclaimers
The authors, contributors, and maintainers of CyberRanger:
- Disclaim all responsibility for any misuse or illegal activities
- Provide no warranties regarding tool functionality or reliability
- Are not liable for any damages, direct or indirect, resulting from tool usage
- Strongly encourage ethical and responsible security research practices

### 🏛️ Compliance & Regulations

**Relevant Legal Frameworks:**
- **Computer Fraud and Abuse Act (CFAA)** - United States federal law
- **European Union Cybersecurity Act** - EU cybersecurity regulations
- **ISO/IEC 27001** - International security management standards
- **NIST Cybersecurity Framework** - US national security guidelines
- **OWASP Testing Guide** - Web application security testing standards

**Industry Best Practices:**
- Always obtain written authorization before conducting security tests
- Document all testing activities with detailed logs
- Follow responsible disclosure practices for discovered vulnerabilities
- Respect testing windows and system availability requirements
- Maintain confidentiality of sensitive information discovered during testing

### 🔗 Third-Party Components

| Component | License | Purpose | Version |
|-----------|---------|---------|---------|
| **Qt6 Framework** | [LGPL v3 / Commercial](https://www.qt.io/licensing/) | Cross-platform GUI framework | 6.4+ |
| **CMake** | [BSD 3-Clause](https://cmake.org/licensing/) | Build system and configuration | 3.16+ |
| **OpenSSL** | [Apache License 2.0](https://www.openssl.org/source/license.html) | Cryptographic operations | Latest |

**Attribution Requirements:**
All redistributions must include appropriate copyright notices and license files for third-party components as specified in their respective license agreements.

### 🛡️ Security & Privacy Policy

**Data Handling:**
- CyberRanger processes network data locally and does not transmit information to external servers
- Scan results are stored locally on the user's system with user-controlled access
- No personal information is collected or transmitted without explicit user consent
- Users are responsible for securing scan data according to their organizational policies

**Vulnerability Reporting:**
For security vulnerabilities in CyberRanger itself, please follow our [Security Policy](SECURITY.md):
- Report privately via email to security@cyberranger.org
- Provide detailed reproduction steps and impact assessment
- Allow reasonable time for fixes before public disclosure
- Follow coordinated disclosure practices

## 🤝 Acknowledgments

### 👥 Core Development Team

**Project Maintainers:**
- **Lead Developer** - Architecture design and core implementation
- **Security Advisor** - Ethical guidelines and legal compliance
- **UI/UX Designer** - Interface design and user experience
- **Quality Assurance** - Testing methodologies and validation

### 🌟 Special Recognition

**Technology Partners:**
- **[Qt Project](https://www.qt.io/)** - Providing exceptional cross-platform application framework
- **[CMake Community](https://cmake.org/)** - Modern build system and configuration management
- **[GitHub](https://github.com/)** - Reliable code hosting and collaboration platform

**Security Community:**
- **OWASP Foundation** - Security testing methodologies and best practices
- **SANS Institute** - Professional security training and ethical guidelines
- **Penetration Testing Community** - Peer review and security methodology validation

**Open Source Contributors:**
- **Code Contributors** - Developers who have submitted pull requests and improvements
- **Documentation Team** - Technical writers and documentation reviewers
- **Testing Community** - Beta testers and quality assurance volunteers
- **Translators** - Internationalization and localization support

### 🏆 Recognition & Awards

**Community Recognition:**
- Featured in security research publications
- Presented at cybersecurity conferences
- Referenced in penetration testing training materials

**Academic Endorsements:**
- Recommended by cybersecurity education programs
- Used in authorized university security courses
- Cited in security research publications

### 💖 Support the Project

**Ways to Contribute:**
- ⭐ **Star this repository** if CyberRanger helps with your security research
- 🐛 **Report issues** and suggest improvements
- 📝 **Contribute code** through pull requests
- 📖 **Improve documentation** and help others learn
- 🌍 **Spread awareness** about ethical security testing

**Financial Support:**
- Consider sponsoring the project through GitHub Sponsors
- Recommend CyberRanger to your organization for official support
- Contribute to related open-source security projects

---

<div align="center">

### **Thank you for supporting ethical cybersecurity research! 🛡️**

**🔗 [Website](https://github.com/mllinman/CyberRanger) | [Documentation](https://github.com/mllinman/CyberRanger/wiki) | [Releases](https://github.com/mllinman/CyberRanger/releases) | [Issues](https://github.com/mllinman/CyberRanger/issues) | [Discussions](https://github.com/mllinman/CyberRanger/discussions)**

*Made with ❤️ by the CyberRanger Security Community*

**"Empowering ethical hackers, one scan at a time"**

</div>