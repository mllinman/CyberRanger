#include "BluetoothTab.h"
#include <QVBoxLayout>
#include <windows.h>
#include <QProcess>
#include "NetworkUtils.h"
#include <QFileDialog>
#include <QTextStream>
#include <QMessageBox>
#include <windows.h>
#include <bluetoothapis.h>
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

    BLUETOOTH_DEVICE_SEARCH_PARAMS searchParams = { sizeof(BLUETOOTH_DEVICE_SEARCH_PARAMS) };
    searchParams.fReturnAuthenticated = TRUE;
    searchParams.fReturnRemembered = TRUE;
    searchParams.fReturnUnknown = TRUE;
    searchParams.fReturnConnected = TRUE;
    searchParams.hRadio = nullptr;
    searchParams.cTimeoutMultiplier = 2;

    BLUETOOTH_DEVICE_INFO deviceInfo = { sizeof(BLUETOOTH_DEVICE_INFO) };
    HBLUETOOTH_DEVICE_FIND hFind = BluetoothFindFirstDevice(&searchParams, &deviceInfo);

    if (hFind) {
        do {
            BluetoothDevice dev;
            dev.name = std::wstring(deviceInfo.szName);
            wchar_t addrStr[32];
            swprintf(addrStr, 32, L"%02X:%02X:%02X:%02X:%02X:%02X",
                     deviceInfo.Address.rgBytes[0], deviceInfo.Address.rgBytes[1],
                     deviceInfo.Address.rgBytes[2], deviceInfo.Address.rgBytes[3],
                     deviceInfo.Address.rgBytes[4], deviceInfo.Address.rgBytes[5]);
            dev.address = std::wstring(addrStr);
            dev.paired = deviceInfo.fAuthenticated;
            devices.push_back(dev);
        } while (BluetoothFindNextDevice(hFind, &deviceInfo));
        BluetoothFindDeviceClose(hFind);
    }

    return devices;
}

void BluetoothTab::scanDevices() {
    std::vector<BluetoothDevice> devices = getAvailableDevices();
    deviceTable->setRowCount((int)devices.size());
    for (int i = 0; i < (int)devices.size(); i++) {
        deviceTable->setItem(i, 0, new QTableWidgetItem(QString::fromStdWString(devices[i].name)));
        deviceTable->setItem(i, 1, new QTableWidgetItem(QString::fromStdWString(devices[i].address)));
        deviceTable->setItem(i, 2, new QTableWidgetItem(devices[i].paired ? "Yes" : "No"));
    }
}