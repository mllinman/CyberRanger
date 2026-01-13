#include "BluetoothScanner.h"
#include "Logger.h"
#include <QRandomGenerator>
#include <QDebug>
#include <QProcess>
#include <QRegularExpression>

BluetoothScanner::BluetoothScanner(QObject *parent) : QObject(parent), isScanning(false) {
    scanTimer = new QTimer(this);
    connect(scanTimer, &QTimer::timeout, this, &BluetoothScanner::scanStep);
    Logger::info("Bluetooth Scanner initialized");
}

void BluetoothScanner::startScan() {
    if (isScanning) {
        Logger::warning("Bluetooth scan already in progress");
        return;
    }
    
    devices.clear();
    isScanning = true;
    scanTimer->start(3000); // Scan every 3 seconds
    Logger::info("Bluetooth scan started");
    emit scanStarted();
}

void BluetoothScanner::stopScan() {
    if (!isScanning) {
        return;
    }
    
    scanTimer->stop();
    isScanning = false;
    Logger::info("Bluetooth scan stopped");
    emit scanStopped();
}

QVector<BluetoothDevice> BluetoothScanner::getDevices() const {
    return devices;
}

void BluetoothScanner::scanStep() {
    performScan();
    emit scanCompleted();
}

void BluetoothScanner::performScan() {
#ifdef Q_OS_LINUX
    performLinuxScan();
#elif defined(Q_OS_WIN)
    performWindowsScan();
#else
    performSimulatedScan();
#endif
}

void BluetoothScanner::performLinuxScan() {
    // Try using bluetoothctl for real Bluetooth scanning on Linux
    QProcess process;
    
    // First check if bluetooth service is available
    QProcess checkService;
    checkService.start("systemctl", QStringList() << "is-active" << "bluetooth");
    checkService.waitForFinished(2000);
    
    if (checkService.exitCode() != 0) {
        Logger::warning("Bluetooth service not active, falling back to simulation");
        performSimulatedScan();
        return;
    }
    
    // Use hcitool for device scanning
    process.start("hcitool", QStringList() << "scan");
    
    if (!process.waitForFinished(8000)) {
        Logger::warning("hcitool scan timed out, falling back to simulation");
        performSimulatedScan();
        return;
    }
    
    if (process.exitCode() != 0) {
        Logger::warning("hcitool scan failed: " + process.readAllStandardError() + 
                       ", falling back to simulation");
        performSimulatedScan();
        return;
    }
    
    QString output = process.readAllStandardOutput();
    QStringList lines = output.split('\n', Qt::SkipEmptyParts);
    
    if (lines.size() <= 1) { // First line is usually header
        Logger::debug("No Bluetooth devices found via hcitool");
        // Still try simulation if no devices found
        performSimulatedScan();
        return;
    }
    
    Logger::info(QString("Found %1 Bluetooth devices via hcitool").arg(lines.size() - 1));
    
    for (int i = 1; i < lines.size(); ++i) { // Skip header
        QString line = lines[i].trimmed();
        QStringList parts = line.split(QRegularExpression("\\s+"), Qt::SkipEmptyParts);
        
        if (parts.size() >= 2) {
            BluetoothDevice device;
            device.address = parts[0].trimmed();
            device.name = parts.mid(1).join(' ').trimmed();
            device.deviceClass = classifyDevice(device.name);
            device.rssi = -50 - QRandomGenerator::global()->bounded(50); // Estimate RSSI
            device.paired = false;
            
            // Check if device already exists
            bool exists = false;
            for (auto& existingDev : devices) {
                if (existingDev.address == device.address) {
                    existingDev = device;
                    exists = true;
                    break;
                }
            }
            
            if (!exists) {
                devices.append(device);
                emit deviceDiscovered(device);
                Logger::debug(QString("Discovered Bluetooth device: %1 (%2)")
                             .arg(device.name.isEmpty() ? "[Unknown]" : device.name)
                             .arg(device.address));
            }
        }
    }
}

void BluetoothScanner::performWindowsScan() {
    // Windows Bluetooth scanning would require WinRT APIs or PowerShell
    // For now, fall back to simulation
    Logger::info("Windows Bluetooth scanning not yet implemented, using simulation");
    performSimulatedScan();
}

void BluetoothScanner::performSimulatedScan() {
    // Limit simulated devices
    if (devices.size() >= 8) {
        Logger::debug("Maximum simulated Bluetooth devices reached");
        return;
    }
    
    static QStringList deviceNames = {
        "iPhone 14", "Galaxy S23", "AirPods Pro", "Sony WH-1000XM5",
        "MacBook Pro", "Surface Laptop", "Fitbit Charge 5", "Apple Watch",
        "JBL Speaker", "Logitech Mouse", "Dell Keyboard", "Car Audio"
    };
    
    static QStringList deviceTypes = {
        "Phone", "Phone", "Audio", "Audio",
        "Computer", "Computer", "Wearable", "Wearable",
        "Audio", "Input", "Input", "Automotive"
    };
    
    int idx = devices.size() % deviceNames.size();
    
    BluetoothDevice device;
    device.name = QString("%1_%2").arg(deviceNames[idx]).arg(devices.size() + 1);
    device.address = QString("%1:%2:%3:%4:%5:%6")
        .arg(QRandomGenerator::global()->bounded(256), 2, 16, QChar('0'))
        .arg(QRandomGenerator::global()->bounded(256), 2, 16, QChar('0'))
        .arg(QRandomGenerator::global()->bounded(256), 2, 16, QChar('0'))
        .arg(QRandomGenerator::global()->bounded(256), 2, 16, QChar('0'))
        .arg(QRandomGenerator::global()->bounded(256), 2, 16, QChar('0'))
        .arg(QRandomGenerator::global()->bounded(256), 2, 16, QChar('0'))
        .toUpper();
    device.deviceClass = deviceTypes[idx];
    device.rssi = -30 - QRandomGenerator::global()->bounded(70);
    device.paired = (QRandomGenerator::global()->bounded(100) < 20); // 20% paired
    
    devices.append(device);
    emit deviceDiscovered(device);
    
    Logger::debug(QString("Simulated Bluetooth device: %1 (%2) Type: %3, RSSI: %4 dBm")
                 .arg(device.name)
                 .arg(device.address)
                 .arg(device.deviceClass)
                 .arg(device.rssi));
}

QString BluetoothScanner::classifyDevice(const QString& name) {
    QString lowerName = name.toLower();
    
    if (lowerName.contains("phone") || lowerName.contains("iphone") || 
        lowerName.contains("galaxy") || lowerName.contains("pixel")) {
        return "Phone";
    } else if (lowerName.contains("watch") || lowerName.contains("fitbit") || 
               lowerName.contains("band")) {
        return "Wearable";
    } else if (lowerName.contains("airpod") || lowerName.contains("headphone") || 
               lowerName.contains("speaker") || lowerName.contains("audio") ||
               lowerName.contains("buds")) {
        return "Audio";
    } else if (lowerName.contains("laptop") || lowerName.contains("macbook") || 
               lowerName.contains("surface") || lowerName.contains("computer")) {
        return "Computer";
    } else if (lowerName.contains("mouse") || lowerName.contains("keyboard") || 
               lowerName.contains("trackpad")) {
        return "Input";
    } else if (lowerName.contains("car") || lowerName.contains("auto")) {
        return "Automotive";
    }
    
    return "Unknown";
}