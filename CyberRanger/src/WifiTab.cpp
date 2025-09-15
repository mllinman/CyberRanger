#include "WifiTab.h"
#include "NetworkUtils.h"
#include <QProcess>
#include <QTableWidgetItem>
#include <QFileDialog>
#include <QTextStream>
#include <QMessageBox>
#include <QVBoxLayout>
#include <windows.h>
#include <wlanapi.h>
#include <objbase.h>
#include <wtypes.h>
#include <QStringList>
#include <QHeaderView>

#pragma comment(lib, "wlanapi.lib")
#pragma comment(lib, "ole32.lib")

WifiTab::WifiTab(QWidget *parent) : QWidget(parent) {
    setupUI();
        refreshNetworks();
    autoScanTimer = new QTimer(this);
    connect(autoScanTimer, &QTimer::timeout, this, &WifiTab::scanNetworks);
    autoScanTimer->start(10000); // Scan every 10 seconds
}
    wifiTable = new QTableWidget(0, 3, this);
    wifiTable->setHorizontalHeaderLabels({"SSID", "Signal (%)", "Security"});
    
    QVBoxLayout *layout = new QVBoxLayout(this);
    layout->addWidget(wifiTable);
    setLayout(layout);

    updateTimer = new QTimer(this);
    connect(updateTimer, &QTimer::timeout, this, &WiFiTab::scanNetworks);
    updateTimer->start(2000); // scan every 2 seconds
    connect(startScan, &QPushButton::clicked, this, &WifiTab::scanNetworks);
}

void WifiTab::setupUI() {
    layout = new QVBoxLayout(this);

    startScan = new QPushButton("Scan Wi-Fi Networks", this);
    layout->addWidget(startScan);

    deviceTable = new QTableWidget(this);
    deviceTable->setColumnCount(3);
    deviceTable->setHorizontalHeaderLabels({"SSID", "Signal Strength (%)", "Security"});
    deviceTable->horizontalHeader()->setSectionResizeMode(QHeaderView::Stretch);
    layout->addWidget(deviceTable);

    connect(startScan, &QPushButton::clicked, this, &WifiTab::scanNetworks);
}
   std::vector<WifiNetwork> WifiTab::getAvailableNetworks() {
    std::vector<WifiNetwork> networks;

    HANDLE hClient = nullptr;
    DWORD dwMaxClient = 2;
    DWORD dwCurVersion = 0;

    if (WlanOpenHandle(dwMaxClient, nullptr, &dwCurVersion, &hClient) != ERROR_SUCCESS)
        return networks;

    PWLAN_INTERFACE_INFO_LIST pIfList = nullptr;
    if (WlanEnumInterfaces(hClient, nullptr, &pIfList) != ERROR_SUCCESS)
        return networks;

    for (int i = 0; i < (int)pIfList->dwNumberOfItems; i++) {
        PWLAN_INTERFACE_INFO pIfInfo = &pIfList->InterfaceInfo[i];

        PWLAN_AVAILABLE_NETWORK_LIST pBssList = nullptr;
        if (WlanGetAvailableNetworkList(hClient, &pIfInfo->InterfaceGuid, 0, nullptr, &pBssList) == ERROR_SUCCESS) {
            for (DWORD j = 0; j < pBssList->dwNumberOfItems; j++) {
                PWLAN_AVAILABLE_NETWORK pBssEntry = &pBssList->Network[j];
                WifiNetwork net;
                net.ssid = std::wstring((wchar_t*)pBssEntry->dot11Ssid.ucSSID, pBssEntry->dot11Ssid.uSSIDLength);
                net.signalStrength = (int)pBssEntry->wlanSignalQuality;
                net.security = pBssEntry->bSecurityEnabled ? L"Secured" : L"Open";
                networks.push_back(net);
            }
        }
        if (pBssList) WlanFreeMemory(pBssList);
    }

    if (pIfList) WlanFreeMemory(pIfList);
    if (hClient) WlanCloseHandle(hClient, nullptr);

    return networks;
}

void WifiTab::scanNetworks() {
    std::vector<WifiNetwork> networks = getAvailableNetworks();
    deviceTable->setRowCount((int)networks.size());

    for (int i = 0; i < (int)networks.size(); i++) {
        deviceTable->setItem(i, 0, new QTableWidgetItem(QString::fromStdWString(networks[i].ssid)));
        deviceTable->setItem(i, 1, new QTableWidgetItem(QString::number(networks[i].signalStrength)));
        deviceTable->setItem(i, 2, new QTableWidgetItem(QString::fromStdWString(networks[i].security)));
    }
}
void WiFiTab::scanNetworks() {
    wifiTable->setRowCount(0);
    int networks = QRandomGenerator::global()->bounded(3, 8);
    for(int i = 0; i < networks; ++i){
        wifiTable->insertRow(i);
        wifiTable->setItem(i, 0, new QTableWidgetItem(QString("Network_%1").arg(i+1)));
        wifiTable->setItem(i, 1, new QTableWidgetItem(QString::number(QRandomGenerator::global()->bounded(30, 100))));
        wifiTable->setItem(i, 2, new QTableWidgetItem(QRandomGenerator::global()->bounded(0,2) ? "WPA2" : "Open"));
    }
}
void WiFiTab::scanNetworks() {
    QProcess process;
    process.start("netsh wlan show networks mode=bssid");
    process.waitForFinished();
    QString output = process.readAllStandardOutput();
    
    // Parse output and populate table (SSID, Signal, Security)
    // For brevity, parsing logic omitted here
}
void WifiTab::refreshNetworks() {
    deviceTable->clearContents();
    scanNetworks();
}