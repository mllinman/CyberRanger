#include "WifiTab.h"
#include "NetworkUtils.h"
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
void WifiTab::refreshNetworks() {
    deviceTable->clearContents();
    scanNetworks();
}