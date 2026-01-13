#include "PortScanner.h"
#include "Logger.h"
#include <QDebug>
#include <QTcpSocket>
#include <QElapsedTimer>
#include <QCoreApplication>

PortScanner::PortScanner(QObject *parent) : QObject(parent), isScanning(false) {
    Logger::info("Port Scanner initialized");
}

QStringList PortScanner::scanPorts(const QString &targetIP, int startPort, int endPort) {
    if (isScanning) {
        Logger::warning("Port scan already in progress");
        return QStringList() << "Error: Scan already in progress";
    }
    
    isScanning = true;
    QStringList openPorts;
    
    Logger::info(QString("Starting port scan on %1 from port %2 to %3")
                .arg(targetIP).arg(startPort).arg(endPort));
    
    // Validate port range
    if (startPort < 1 || endPort > 65535 || startPort > endPort) {
        Logger::error("Invalid port range specified");
        isScanning = false;
        return QStringList() << "Error: Invalid port range";
    }
    
    // Limit scan range to prevent excessive scanning
    int maxPorts = 1000;
    int portRange = endPort - startPort + 1;
    if (portRange > maxPorts) {
        Logger::warning(QString("Port range too large (%1 ports), limiting to %2 ports")
                       .arg(portRange).arg(maxPorts));
        endPort = startPort + maxPorts - 1;
    }
    
    int scannedPorts = 0;
    int foundPorts = 0;
    
    QElapsedTimer timer;
    timer.start();
    
    // Scan each port
    for (int port = startPort; port <= endPort; ++port) {
        if (isPortOpen(targetIP, static_cast<quint16>(port))) {
            QString service = getServiceName(static_cast<quint16>(port));
            QString result = QString("Port %1 - OPEN (%2)").arg(port).arg(service);
            openPorts << result;
            foundPorts++;
            
            Logger::debug(QString("Found open port: %1 on %2 - %3")
                         .arg(port).arg(targetIP).arg(service));
        }
        scannedPorts++;
        
        // Allow event loop to process
        if (scannedPorts % 50 == 0) {
            QCoreApplication::processEvents();
        }
    }
    
    qint64 elapsed = timer.elapsed();
    Logger::info(QString("Port scan completed: scanned %1 ports in %2 ms, found %3 open ports")
                .arg(scannedPorts).arg(elapsed).arg(foundPorts));
    
    isScanning = false;
    
    if (openPorts.isEmpty()) {
        openPorts << QString("No open ports found on %1 in range %2-%3")
                        .arg(targetIP).arg(startPort).arg(endPort);
    }
    
    return openPorts;
}

bool PortScanner::isPortOpen(const QString &host, quint16 port) {
    QTcpSocket socket;
    socket.connectToHost(host, port);
    
    // Wait up to 1000ms for connection
    if (socket.waitForConnected(1000)) {
        socket.disconnectFromHost();
        return true;
    }
    
    return false;
}

QString PortScanner::getServiceName(quint16 port) {
    // Common port to service mappings
    static const QMap<quint16, QString> commonPorts = {
        {20, "FTP-DATA"},
        {21, "FTP"},
        {22, "SSH"},
        {23, "Telnet"},
        {25, "SMTP"},
        {53, "DNS"},
        {80, "HTTP"},
        {110, "POP3"},
        {143, "IMAP"},
        {443, "HTTPS"},
        {445, "SMB"},
        {3306, "MySQL"},
        {3389, "RDP"},
        {5432, "PostgreSQL"},
        {5900, "VNC"},
        {6379, "Redis"},
        {8080, "HTTP-Proxy"},
        {8443, "HTTPS-Alt"},
        {27017, "MongoDB"}
    };
    
    if (commonPorts.contains(port)) {
        return commonPorts[port];
    }
    
    return "Unknown";
}

void PortScanner::scanPortsAsync(const QString &targetIP, int startPort, int endPort) {
    if (isScanning) {
        Logger::warning("Port scan already in progress");
        emit scanFailed("Scan already in progress");
        return;
    }
    
    emit scanStarted();
    
    // Perform scan in a way that allows UI updates
    QStringList results = scanPorts(targetIP, startPort, endPort);
    
    emit scanCompleted(results);
}

void PortScanner::stopScan() {
    if (isScanning) {
        Logger::info("Stopping port scan");
        isScanning = false;
    }
}