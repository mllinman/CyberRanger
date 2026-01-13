#include "WifiScanner.h"
#include "Logger.h"
#include <QRandomGenerator>
#include <QProcess>
#include <QRegularExpression>

WiFiScanner::WiFiScanner(QObject *parent) : QObject(parent), isScanning(false)
{
    scanTimer = new QTimer(this);
    connect(scanTimer, &QTimer::timeout, this, &WiFiScanner::scanStep);
    Logger::info("WiFi Scanner initialized");
}

void WiFiScanner::startScan()
{
    if (isScanning) {
        Logger::warning("WiFi scan already in progress");
        return;
    }
    
    networks.clear();
    isScanning = true;
    scanTimer->start(2000); // Scan every 2 seconds
    Logger::info("WiFi scan started");
    emit scanStarted();
}

void WiFiScanner::stopScan()
{
    if (!isScanning) {
        return;
    }
    
    scanTimer->stop();
    isScanning = false;
    Logger::info("WiFi scan stopped");
    emit scanStopped();
}

QVector<WiFiNetwork> WiFiScanner::getNetworks() const
{
    return networks;
}

QStringList WiFiScanner::scanNetworks()
{
    QStringList ssids;
    for(const auto& network : networks) {
        ssids << network.ssid;
    }
    return ssids;
}

void WiFiScanner::scanStep()
{
    performScan();
    emit scanCompleted();
}

void WiFiScanner::performScan()
{
#ifdef Q_OS_LINUX
    // Try to use nmcli for real WiFi scanning on Linux
    performLinuxScan();
#elif defined(Q_OS_WIN)
    // Try to use netsh for real WiFi scanning on Windows
    performWindowsScan();
#else
    // Fall back to simulation
    performSimulatedScan();
#endif
}

void WiFiScanner::performLinuxScan()
{
    // Verify nmcli is available before attempting to use it
    QProcess checkProcess;
    checkProcess.start("which", QStringList() << "nmcli");
    checkProcess.waitForFinished(1000);
    
    if (checkProcess.exitCode() != 0) {
        Logger::warning("nmcli not found, falling back to simulation");
        performSimulatedScan();
        return;
    }
    
    QProcess process;
    // Use fixed command arguments - no user input to prevent command injection
    process.start("nmcli", QStringList() << "-t" << "-f" 
                  << "SSID,BSSID,MODE,CHAN,FREQ,RATE,SIGNAL,SECURITY" 
                  << "dev" << "wifi" << "list");
    
    // Increased timeout to 10 seconds for systems with many networks
    if (!process.waitForFinished(10000)) {
        Logger::warning("nmcli command timed out, falling back to simulation");
        performSimulatedScan();
        return;
    }
    
    if (process.exitCode() != 0) {
        Logger::warning("nmcli command failed: " + process.readAllStandardError() + 
                       ", falling back to simulation");
        performSimulatedScan();
        return;
    }
    
    QString output = process.readAllStandardOutput();
    QStringList lines = output.split('\n', Qt::SkipEmptyParts);
    
    if (lines.isEmpty()) {
        Logger::debug("No WiFi networks found via nmcli");
        return;
    }
    
    Logger::info(QString("Found %1 WiFi networks via nmcli").arg(lines.size()));
    
    for (const QString& line : lines) {
        QStringList fields = line.split(':');
        if (fields.size() >= 8) {
            WiFiNetwork network;
            network.ssid = fields[0].trimmed();
            network.bssid = fields[1].trimmed();
            network.channel = fields[3].toInt();
            network.signalStrength = fields[6].toInt();
            network.encryption = fields[7].trimmed();
            network.hidden = network.ssid.isEmpty() || network.ssid == "--";
            
            // Check if this network already exists (by BSSID)
            bool exists = false;
            for (auto& existingNet : networks) {
                if (existingNet.bssid == network.bssid) {
                    // Update existing network
                    existingNet = network;
                    exists = true;
                    break;
                }
            }
            
            if (!exists && !network.bssid.isEmpty()) {
                networks.append(network);
                emit networkDiscovered(network);
                Logger::debug(QString("Discovered WiFi: %1 (%2) Signal: %3 dBm")
                             .arg(network.ssid.isEmpty() ? "[Hidden]" : network.ssid)
                             .arg(network.bssid)
                             .arg(network.signalStrength));
            }
        }
    }
}

void WiFiScanner::performWindowsScan()
{
    // Verify netsh is available before attempting to use it
    QProcess checkProcess;
    checkProcess.start("where", QStringList() << "netsh");
    checkProcess.waitForFinished(1000);
    
    if (checkProcess.exitCode() != 0) {
        Logger::warning("netsh not found, falling back to simulation");
        performSimulatedScan();
        return;
    }
    
    QProcess process;
    // Use fixed command arguments - no user input to prevent command injection
    process.start("netsh", QStringList() << "wlan" << "show" << "networks" << "mode=bssid");
    
    // Increased timeout to 10 seconds for comprehensive scanning
    if (!process.waitForFinished(10000)) {
        Logger::warning("netsh command timed out, falling back to simulation");
        performSimulatedScan();
        return;
    }
    
    if (process.exitCode() != 0) {
        Logger::warning("netsh command failed, falling back to simulation");
        performSimulatedScan();
        return;
    }
    
    QString output = process.readAllStandardOutput();
    QStringList lines = output.split('\n', Qt::SkipEmptyParts);
    
    WiFiNetwork currentNetwork;
    bool inNetwork = false;
    
    Logger::info(QString("Parsing Windows WiFi scan results"));
    
    for (const QString& line : lines) {
        QString trimmedLine = line.trimmed();
        
        if (trimmedLine.startsWith("SSID", Qt::CaseInsensitive)) {
            // Save previous network if valid
            if (inNetwork && !currentNetwork.bssid.isEmpty()) {
                bool exists = false;
                for (auto& existingNet : networks) {
                    if (existingNet.bssid == currentNetwork.bssid) {
                        existingNet = currentNetwork;
                        exists = true;
                        break;
                    }
                }
                if (!exists) {
                    networks.append(currentNetwork);
                    emit networkDiscovered(currentNetwork);
                }
            }
            
            // Start new network
            currentNetwork = WiFiNetwork();
            inNetwork = true;
            
            QStringList parts = trimmedLine.split(':', Qt::SkipEmptyParts);
            if (parts.size() >= 2) {
                currentNetwork.ssid = parts[1].trimmed();
            }
        }
        else if (trimmedLine.contains("BSSID", Qt::CaseInsensitive)) {
            QStringList parts = trimmedLine.split(':', Qt::SkipEmptyParts);
            if (parts.size() >= 2) {
                currentNetwork.bssid = parts.mid(1).join(':').trimmed();
            }
        }
        else if (trimmedLine.contains("Signal", Qt::CaseInsensitive)) {
            QRegularExpression re("(\\d+)%");
            QRegularExpressionMatch match = re.match(trimmedLine);
            if (match.hasMatch()) {
                int percentage = match.captured(1).toInt();
                // Convert percentage to approximate dBm (-100 to -30)
                currentNetwork.signalStrength = -100 + (percentage * 70 / 100);
            }
        }
        else if (trimmedLine.contains("Channel", Qt::CaseInsensitive)) {
            QRegularExpression re("(\\d+)");
            QRegularExpressionMatch match = re.match(trimmedLine);
            if (match.hasMatch()) {
                currentNetwork.channel = match.captured(1).toInt();
            }
        }
        else if (trimmedLine.contains("Authentication", Qt::CaseInsensitive)) {
            QStringList parts = trimmedLine.split(':', Qt::SkipEmptyParts);
            if (parts.size() >= 2) {
                currentNetwork.encryption = parts[1].trimmed();
            }
        }
    }
    
    // Save last network
    if (inNetwork && !currentNetwork.bssid.isEmpty()) {
        bool exists = false;
        for (auto& existingNet : networks) {
            if (existingNet.bssid == currentNetwork.bssid) {
                existingNet = currentNetwork;
                exists = true;
                break;
            }
        }
        if (!exists) {
            networks.append(currentNetwork);
            emit networkDiscovered(currentNetwork);
        }
    }
    
    Logger::info(QString("Found %1 WiFi networks via netsh").arg(networks.size()));
}

void WiFiScanner::performSimulatedScan()
{
    // Simulated WiFi network discovery for testing/demo
    static int count = 0;
    
    // Maximum simulated networks constant for easy configuration
    const int MAX_SIMULATED_NETWORKS = 10;
    
    // Limit to configured maximum
    if (networks.size() >= MAX_SIMULATED_NETWORKS) {
        Logger::debug("Maximum simulated networks reached");
        return;
    }
    
    WiFiNetwork network;
    
    // Generate realistic network data
    QStringList commonSSIDs = {"HomeNetwork", "OfficeWiFi", "GuestNetwork", 
                               "CafeWiFi", "Mobile_Hotspot", "Router_5G",
                               "NetGear_2.4G", "TP-Link_Home"};
    
    int idx = count % commonSSIDs.size();
    network.ssid = QString("%1_%2").arg(commonSSIDs[idx]).arg(count + 1);
    network.bssid = QString("%1:%2:%3:%4:%5:%6")
        .arg(QRandomGenerator::global()->bounded(256), 2, 16, QChar('0'))
        .arg(QRandomGenerator::global()->bounded(256), 2, 16, QChar('0'))
        .arg(QRandomGenerator::global()->bounded(256), 2, 16, QChar('0'))
        .arg(QRandomGenerator::global()->bounded(256), 2, 16, QChar('0'))
        .arg(QRandomGenerator::global()->bounded(256), 2, 16, QChar('0'))
        .arg(QRandomGenerator::global()->bounded(256), 2, 16, QChar('0'))
        .toUpper();
    
    network.channel = (count % 11) + 1;
    network.signalStrength = -30 - (QRandomGenerator::global()->bounded(60));
    
    QStringList encryptionTypes = {"Open", "WEP", "WPA", "WPA2", "WPA3"};
    network.encryption = encryptionTypes[count % encryptionTypes.size()];
    network.hidden = (count % 10 == 0); // 10% hidden networks
    
    networks.append(network);
    emit networkDiscovered(network);
    
    Logger::debug(QString("Simulated WiFi: %1 (%2) Signal: %3 dBm, Encryption: %4")
                 .arg(network.ssid)
                 .arg(network.bssid)
                 .arg(network.signalStrength)
                 .arg(network.encryption));
    
    count++;
}