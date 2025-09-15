#include "BluetoothTab.h"
#include <QVBoxLayout>
#include <QProcess>
#include "NetworkUtils.h"
#include <QFileDialog>
#include <QTextStream>
#include <QMessageBox>
#include <QDebug>
#include <QStringList>

#pragma comment(lib, "Bthprops.lib")

BluetoothTab::BluetoothTab(QWidget *parent) : QWidget(parent) {
    btDevices = new QListWidget(this);
    setupUI();

    autoScanTimer = new QTimer(this);
    connect(autoScanTimer, &QTimer::timeout, this, &BluetoothTab::scanDevices);
    autoScanTimer->start(15000); // Scan every 15 seconds

    QVBoxLayout *layout = new QVBoxLayout(this);
    layout->addWidget(btDevices);
    setLayout(layout);

    updateTimer = new QTimer(this);
    connect(updateTimer, &QTimer::timeout, this, &BluetoothTab::scanDevices);
    updateTimer->start(3000); // scan every 3 seconds
}

void BluetoothTab::setupUI() {
    layout = new QVBoxLayout(this);
    btList = new QListWidget();

    startScan = new QPushButton("Scan Bluetooth Devices", this);
    layout->addWidget(startScan);

    deviceTable = new QTableWidget(this);
    deviceTable->setColumnCount(3);
    deviceTable->setHorizontalHeaderLabels({"Name", "Address", "Paired"});
    layout->addWidget(deviceTable);

    connect(startScan, &QPushButton::clicked, this, &BluetoothTab::scanDevices);
}
std::vector<BluetoothDevice> BluetoothTab::getAvailableDevices() {
    std::vector<BluetoothDevice> devices;
    
    // Linux stub implementation - simulate some devices
    BluetoothDevice dev1;
    dev1.name = "Bluetooth Device 1";
    dev1.address = "00:11:22:33:44:55";
    dev1.paired = false;
    dev1.rssi = -45;
    devices.push_back(dev1);
    
    BluetoothDevice dev2;
    dev2.name = "Bluetooth Device 2";
    dev2.address = "AA:BB:CC:DD:EE:FF";
    dev2.paired = true;
    dev2.rssi = -60;
    devices.push_back(dev2);
    
    return devices;
}

void BluetoothTab::scanDevices() {
    std::vector<BluetoothDevice> devices = getAvailableDevices();
    deviceTable->setRowCount((int)devices.size());
    for (int i = 0; i < (int)devices.size(); i++) {
        deviceTable->setItem(i, 0, new QTableWidgetItem(devices[i].name));
        deviceTable->setItem(i, 1, new QTableWidgetItem(devices[i].address));
        deviceTable->setItem(i, 2, new QTableWidgetItem(devices[i].paired ? "Yes" : "No"));
    }
    qDebug() << "Bluetooth scan completed - found" << devices.size() << "devices";
}