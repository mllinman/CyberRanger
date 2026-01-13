# CyberRanger Scanner and Logging Improvements

## Overview
This document describes the comprehensive improvements made to the scanning and logging tools in CyberRanger to support professional penetration testing for WiFi, Bluetooth, network, and port scanning operations.

## Changes Made

### 1. Logger Enhancement (`modules/Logger.h` and `modules/Logger.cpp`)

#### Features Added:
- **Log Levels**: DEBUG, INFO, WARNING, ERROR, CRITICAL
- **Timestamped Logging**: All logs include precise timestamps (YYYY-MM-DD HH:MM:SS.zzz)
- **Dual Output**: Console and file logging with individual enable/disable controls
- **Log Rotation**: Automatic rotation when log files exceed 10MB
- **Archive Management**: Keeps last 5 rotated log files automatically
- **Thread Safety**: Mutex-protected logging operations for concurrent access

#### Usage Example:
```cpp
Logger::info("Starting WiFi scan");
Logger::warning("Low signal strength detected");
Logger::error("Failed to connect to network");
Logger::setLogLevel(LogLevel::DEBUG);  // Set minimum level
Logger::setLogToConsole(true);         // Enable console output
Logger::setLogFile("logs/custom.log"); // Set custom log file
```

### 2. WiFi Scanner Enhancement (`modules/WifiScanner.h` and `modules/WifiScanner.cpp`)

#### Features Added:
- **Platform-Specific Scanning**:
  - Linux: Uses `nmcli` for real WiFi network discovery
  - Windows: Uses `netsh wlan show networks` command
  - Fallback: Simulated scanning when system tools unavailable
- **Network Information**:
  - SSID detection and enumeration
  - BSSID (MAC address) identification
  - Channel analysis
  - Signal strength (RSSI in dBm)
  - Encryption type detection (Open, WEP, WPA, WPA2, WPA3)
  - Hidden network detection
- **Real-time Updates**: Networks discovered are immediately emitted via signals
- **Duplicate Prevention**: Avoids adding duplicate networks (matched by BSSID)
- **Comprehensive Logging**: All scan operations logged with appropriate levels

#### Usage Example:
```cpp
WiFiScanner scanner;
connect(&scanner, &WiFiScanner::networkDiscovered, [](const WiFiNetwork &net) {
    qDebug() << "Found:" << net.ssid << "Signal:" << net.signalStrength << "dBm";
});
scanner.startScan();
```

### 3. Bluetooth Scanner Enhancement (`modules/BluetoothScanner.h` and `modules/BluetoothScanner.cpp`)

#### Features Added:
- **Platform-Specific Scanning**:
  - Linux: Uses `hcitool scan` for real Bluetooth device discovery
  - Windows: Placeholder for future WinRT API integration
  - Fallback: Simulated scanning for testing/demonstration
- **Device Information**:
  - Device name identification
  - MAC address collection
  - Device type classification (Phone, Audio, Computer, Wearable, etc.)
  - RSSI signal strength
  - Pairing status
- **Intelligent Classification**: Automatically categorizes devices based on name patterns
- **Service Availability Check**: Verifies bluetooth service is running before scanning

#### Usage Example:
```cpp
BluetoothScanner scanner;
connect(&scanner, &BluetoothScanner::deviceDiscovered, [](const BluetoothDevice &dev) {
    qDebug() << "Device:" << dev.name << "Type:" << dev.deviceClass;
});
scanner.startScan();
```

### 4. Port Scanner Enhancement (`modules/PortScanner.h` and `modules/PortScanner.cpp`)

#### Features Added:
- **Real TCP Port Scanning**: Actual connection attempts to target ports
- **Service Detection**: Maps common ports to service names (HTTP, SSH, FTP, etc.)
- **Configurable Timeout**: 1000ms connection timeout per port
- **Range Validation**: Validates port ranges and limits excessive scanning
- **Port Range Limiting**: Prevents scanning more than 1000 ports at once
- **Progress Feedback**: Processes events periodically to maintain UI responsiveness
- **Detailed Reporting**: Shows port number and associated service name

#### Supported Services:
FTP, SSH, Telnet, SMTP, DNS, HTTP, HTTPS, POP3, IMAP, SMB, MySQL, PostgreSQL, RDP, Redis, MongoDB, and more.

#### Usage Example:
```cpp
PortScanner scanner;
QStringList results = scanner.scanPorts("192.168.1.1", 1, 1000);
for (const QString &result : results) {
    qDebug() << result;  // "Port 80 - OPEN (HTTP)"
}
```

### 5. Network Mapper Enhancement (`modules/NetworkMapper.h` and `modules/NetworkMapper.cpp`)

#### Features Added:
- **Platform-Specific Discovery**:
  - Linux: Uses `ip neighbor` or `arp -a` for device discovery
  - Windows: Uses `arp -a` for device discovery
  - Fallback: Simulated network data
- **Device Information**:
  - IP address identification
  - MAC address collection
  - Hostname resolution via DNS
  - OS fingerprinting based on MAC OUI and hostname patterns
- **OS Detection**: Recognizes Windows, Linux, macOS, iOS, Android, routers, and VMs
- **MAC OUI Lookup**: Identifies virtual machines and hardware vendors
- **Comprehensive Parsing**: Handles both Linux and Windows ARP output formats

#### Usage Example:
```cpp
NetworkMapper mapper;
connect(&mapper, &NetworkMapper::deviceFound, [](const NetworkDevice &dev) {
    qDebug() << dev.ip << dev.hostName << "OS:" << dev.os;
});
mapper.scanNetwork("192.168.1.0/24");
```

### 6. Packet Sniffer Enhancement (`modules/PacketSniffer.h` and `modules/PacketSniffer.cpp`)

#### Features Added:
- **Optional libpcap Integration**: Conditional compilation with HAVE_PCAP flag
- **Real Packet Capture**: Uses libpcap when available for actual network packet capture
- **Interface Management**:
  - Lists available network interfaces
  - Allows selection of specific interface for capture
- **Packet Parsing**:
  - Basic Ethernet frame parsing
  - IPv4 header extraction
  - Source and destination IP identification
- **Configurable Capture**: Specify maximum number of packets to capture
- **Fallback Simulation**: Generates realistic simulated packets when libpcap unavailable

#### Usage Example:
```cpp
PacketSniffer sniffer;
QStringList interfaces = sniffer.getAvailableInterfaces();
if (!interfaces.isEmpty()) {
    sniffer.startCapture(interfaces.first());
    QStringList packets = sniffer.scanPackets(10);  // Capture 10 packets
    sniffer.stopCapture();
}
```

## Build System Updates

### CMakeLists.txt Changes:
- Added `Qt6::Network` component requirement for network functionality
- Optional libpcap detection and linking
- Conditional compilation flag `HAVE_PCAP` when libpcap is available
- Warning message when libpcap not found (simulation mode will be used)

## Required Permissions

### Linux:
All scanning tools require elevated privileges for full functionality:

```bash
# Run with sudo for full network access
sudo ./release/CyberRanger

# OR set capabilities (persistent without sudo)
sudo setcap cap_net_raw,cap_net_admin=eip ./release/CyberRanger

# For Bluetooth scanning, ensure bluetooth service is running
sudo systemctl start bluetooth
```

### Windows:
Run CyberRanger as Administrator for full scanning capabilities:
- Right-click on CyberRanger.exe
- Select "Run as Administrator"

## Dependencies

### Required:
- Qt6 Core, Widgets, Network (automatically installed by build script)
- CMake 3.16+
- C++17 compatible compiler

### Optional (for enhanced functionality):
- libpcap (for real packet capture)
- nmcli (for Linux WiFi scanning) - usually part of NetworkManager
- hcitool (for Linux Bluetooth scanning) - usually part of bluez
- ip/arp commands (for network mapping) - standard on most systems

### Installing Optional Dependencies on Linux:
```bash
# For packet capture
sudo apt-get install libpcap-dev

# For Bluetooth scanning
sudo apt-get install bluez bluez-tools

# For WiFi scanning (usually pre-installed)
sudo apt-get install network-manager
```

## Security Considerations

### Authorization:
All scanning tools are designed for **authorized penetration testing only**. Users must:
1. Obtain written permission before scanning any network
2. Comply with all applicable laws and regulations
3. Use tools responsibly and ethically
4. Maintain audit logs of all scanning activities

### Audit Logging:
All scanning operations are logged with:
- Timestamps
- Operation types
- Targets scanned
- Results found
- Any errors encountered

Logs are stored in: `logs/CyberRanger.log`

### Safety Mechanisms:
- Port scanning limited to 1000 ports per operation
- Scan timeouts to prevent hanging
- Graceful fallbacks when system tools unavailable
- Clear error messages for troubleshooting

## Limitations

### Current Limitations:
1. **Packet Sniffer**: Basic IPv4 parsing only; no deep protocol analysis
2. **Windows Bluetooth**: Not yet implemented (uses simulation)
3. **Port Scanner**: TCP only; no UDP scanning yet
4. **WiFi Scanner**: Depends on system tools; may not work on all Linux distributions

### Future Enhancements:
1. Advanced protocol analysis in packet sniffer
2. Windows Bluetooth scanning via WinRT APIs
3. UDP port scanning support
4. Custom packet injection capabilities
5. Vulnerability detection integration
6. Export to industry-standard formats (Nmap XML, etc.)

## Testing Recommendations

### Testing WiFi Scanner:
```bash
# On Linux with proper permissions
sudo ./release/CyberRanger
# Navigate to WiFi Scanner tab and start scan
# Verify real networks are detected if nmcli is available
```

### Testing Bluetooth Scanner:
```bash
# Ensure bluetooth is enabled
bluetoothctl power on
sudo ./release/CyberRanger
# Navigate to Bluetooth Scanner tab
# Verify nearby Bluetooth devices are detected
```

### Testing Port Scanner:
```bash
./release/CyberRanger
# Navigate to Port Scanner tab
# Scan localhost (127.0.0.1) ports 1-100
# Should detect at least SSH (22) if running
```

### Testing Network Mapper:
```bash
./release/CyberRanger
# Navigate to Network Scanner tab
# Scan local subnet (e.g., 192.168.1.0/24)
# Verify devices in ARP cache are discovered
```

### Testing Packet Sniffer:
```bash
# Requires libpcap
sudo ./release/CyberRanger
# Navigate to Packet Sniffer tab
# Select network interface
# Start capture and verify packets are shown
```

## Troubleshooting

### "nmcli not found" or WiFi scanning shows simulation only:
- Install NetworkManager: `sudo apt-get install network-manager`
- Or use alternative: `sudo apt-get install wireless-tools`

### "hcitool not found" or Bluetooth scanning fails:
- Install bluez: `sudo apt-get install bluez bluez-tools`
- Start bluetooth service: `sudo systemctl start bluetooth`

### Port scanning shows no open ports:
- Ensure you have network connectivity to target
- Try scanning localhost (127.0.0.1) first
- Check firewall rules on target system

### Packet capture fails:
- Install libpcap: `sudo apt-get install libpcap-dev`
- Rebuild application: `./build_linux.sh`
- Run with elevated privileges: `sudo ./release/CyberRanger`

### Permission denied errors:
- Run with sudo: `sudo ./release/CyberRanger`
- Or set capabilities: `sudo setcap cap_net_raw,cap_net_admin=eip ./release/CyberRanger`

## Legal Notice

**IMPORTANT**: CyberRanger is designed exclusively for authorized security testing. Unauthorized network scanning may be illegal in your jurisdiction. Always ensure you have proper authorization before using these tools. The authors and contributors assume no liability for misuse of this software.

## Support

For issues, feature requests, or contributions:
- GitHub Issues: https://github.com/mllinman/CyberRanger/issues
- Documentation: See README.md and SECURITY.md
- License: MIT License (see LICENSE file)

---

**Version**: 1.1.0  
**Last Updated**: January 2026  
**Contributors**: CyberRanger Development Team
