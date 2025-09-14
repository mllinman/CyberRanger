// Core/NetworkAnalyzer.h
#pragma once
#include <QObject>
#include <QString>
#include <vector>

struct Network {
    QString ssid;
    int signalStrength;
    bool secured;
};

struct BluetoothDevice {
    QString name;
    QString address;
    bool paired;
};

class NetworkAnalyzer : public QObject {
    Q_OBJECT
public:
    NetworkAnalyzer(QObject *parent = nullptr);
    std::vector<Network> scanWifi();
    std::vector<BluetoothDevice> scanBluetooth();
signals:
    void wifiUpdated(const std::vector<Network>&);
    void bluetoothUpdated(const std::vector<BluetoothDevice>&);
};
