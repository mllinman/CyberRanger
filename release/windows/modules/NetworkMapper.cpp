#include "NetworkMapper.h"
#include <QRandomGenerator>
#include <QDebug>

NetworkMapper::NetworkMapper(QObject *parent) : QObject(parent) {}

void NetworkMapper::scanNetwork() {
    devices.clear();
    performScan();
    emit scanCompleted();
}

void NetworkMapper::performScan() {
    for(int i = 0; i < 5; ++i) {
        NetworkDevice d;
        d.ip = "192.168.1." + QString::number(QRandomGenerator::global()->bounded(2,254));
        d.mac = "AA:BB:CC:" + QString::number(QRandomGenerator::global()->bounded(10)) + ":" +
                QString::number(QRandomGenerator::global()->bounded(10)) + ":" +
                QString::number(QRandomGenerator::global()->bounded(10));
        d.hostName = "Device" + QString::number(i);
        d.os = "Windows 10";

        devices.append(d);
        emit deviceFound(d);
    }
}

QVector<NetworkDevice> NetworkMapper::getDevices() const {
    return devices;
}
