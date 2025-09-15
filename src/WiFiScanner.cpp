#include "WiFiScanner.h"
#include <QRandomGenerator>

WiFiScanner::WiFiScanner(QObject *parent)
    : QObject(parent), scanning(false)
{
    scanTimer = new QTimer(this);
    connect(scanTimer, &QTimer::timeout, this, &WiFiScanner::performScan);
}

void WiFiScanner::startScan()
{
    if (!scanning) {
        scanning = true;
        scanTimer->start(2000); // Scan every 2 seconds
        performScan(); // Perform initial scan
    }
}

void WiFiScanner::stopScan()
{
    if (scanning) {
        scanning = false;
        scanTimer->stop();
    }
}

bool WiFiScanner::isScanning() const
{
    return scanning;
}

void WiFiScanner::performScan()
{
    // Simulate WiFi network discovery
    static int networkCount = 0;
    
    WiFiNetwork network;
    network.ssid = QString("Network_%1").arg(++networkCount % 10);
    network.bssid = QString("AA:BB:CC:DD:EE:%1").arg(networkCount % 256, 2, 16, QChar('0')).toUpper();
    network.channel = (networkCount % 11) + 1;
    network.signal = -30 - (QRandomGenerator::global()->bounded(50));
    network.security = (networkCount % 3 == 0) ? "Open" : "WPA2";
    network.isConnected = false;
    
    emit networkDiscovered(network);
    
    // Occasionally emit signal updates
    if (networkCount % 5 == 0) {
        emit signalUpdated(network);
    }
    
    if (networkCount % 10 == 0) {
        emit scanCompleted();
    }
}