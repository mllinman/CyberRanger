#include "BluetoothScanner.h"
#include <QRandomGenerator>
#include <QDebug>

BluetoothScanner::BluetoothScanner(QObject *parent) : QObject(parent) {
    scanTimer = new QTimer(this);
    connect(scanTimer, &QTimer::timeout, this, &BluetoothScanner::scanStep);
}

void BluetoothScanner::startScan() {
    devices.clear();
    scanTimer->start(1000); // scan every 1 second
    qDebug() << "Bluetooth scan started (Linux stub)";
}

void BluetoothScanner::stopScan() {
    scanTimer->stop();
    qDebug() << "Bluetooth scan stopped";
}

void BluetoothScanner::scanStep() {
    // Stub implementation for Linux - simulate finding devices
    if (devices.size() < 3) {
        BluetoothDevice device;
        device.name = QString("Device_%1").arg(devices.size() + 1);
        device.address = QString("00:11:22:33:44:%1").arg(devices.size(), 2, 16, QChar('0')).toUpper();
        device.deviceClass = "Unknown";
        device.rssi = -50 - QRandomGenerator::global()->bounded(50);
        device.paired = false;
        
        devices.append(device);
        emit deviceDiscovered(device);
        qDebug() << "Found BT device:" << device.name;
    }
}