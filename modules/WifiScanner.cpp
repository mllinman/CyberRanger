#include "WifiScanner.h"
#include <QRandomGenerator>

WiFiScanner::WiFiScanner(QObject *parent) : QObject(parent)
{
    scanTimer = new QTimer(this);
    connect(scanTimer, &QTimer::timeout, this, &WiFiScanner::scanStep);
}

void WiFiScanner::startScan()
{
    networks.clear();
    scanTimer->start(1000); // Scan every second
}

void WiFiScanner::stopScan()
{
    scanTimer->stop();
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
    // Simulate WiFi network discovery
    static int count = 0;
    WiFiNetwork network;
    network.ssid = QString("WiFi_%1").arg(++count);
    network.bssid = QString("AA:BB:CC:DD:EE:%1").arg(count % 256, 2, 16, QChar('0')).toUpper();
    network.channel = (count % 11) + 1;
    network.signalStrength = -30 - (QRandomGenerator::global()->bounded(50));
    network.encryption = (count % 3 == 0) ? "Open" : "WPA2";
    network.hidden = false;
    
    networks.append(network);
    emit networkDiscovered(network);
}