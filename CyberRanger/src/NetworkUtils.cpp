#include "NetworkUtils.h"
#include <QDebug>

QStringList NetworkUtils::scanWiFiNetworks() {
    QStringList networks;

#ifdef _WIN32
    HANDLE hClient = NULL;
    DWORD dwMaxClient = 2; // Windows 7+
    DWORD dwCurVersion = 0;

    if (WlanOpenHandle(dwMaxClient, NULL, &dwCurVersion, &hClient) != ERROR_SUCCESS) {
        return {"Error opening WLAN handle"};
    }

    PWLAN_INTERFACE_INFO_LIST pIfList = NULL;
    if (WlanEnumInterfaces(hClient, NULL, &pIfList) != ERROR_SUCCESS) {
        WlanCloseHandle(hClient, NULL);
        return {"Error enumerating interfaces"};
    }

    for (int i = 0; i < (int)pIfList->dwNumberOfItems; i++) {
        PWLAN_INTERFACE_INFO pIfInfo = &pIfList->InterfaceInfo[i];
        PWLAN_AVAILABLE_NETWORK_LIST pBssList = NULL;
        if (WlanGetAvailableNetworkList(hClient, &pIfInfo->InterfaceGuid, 0, NULL, &pBssList) == ERROR_SUCCESS) {
            for (int j = 0; j < (int)pBssList->dwNumberOfItems; j++) {
                PWLAN_AVAILABLE_NETWORK pBssEntry = &pBssList->Network[j];
                QString ssid = QString::fromUtf16((const ushort*)pBssEntry->dot11Ssid.ucSSID);
                networks << ssid;
            }
            if (pBssList) WlanFreeMemory(pBssList);
        }
    }
    if (pIfList) WlanFreeMemory(pIfList);
    WlanCloseHandle(hClient, NULL);
#endif

    return networks;
}

QStringList NetworkUtils::scanBluetoothDevices() {
    QStringList devices;

#ifdef _WIN32
    BLUETOOTH_DEVICE_SEARCH_PARAMS searchParams;
    BLUETOOTH_DEVICE_INFO deviceInfo;
    memset(&searchParams, 0, sizeof(searchParams));
    memset(&deviceInfo, 0, sizeof(deviceInfo));

    searchParams.dwSize = sizeof(BLUETOOTH_DEVICE_SEARCH_PARAMS);
    searchParams.fReturnAuthenticated = TRUE;
    searchParams.fReturnRemembered = TRUE;
    searchParams.fReturnUnknown = TRUE;
    searchParams.fReturnConnected = TRUE;
    searchParams.hRadio = NULL;
    searchParams.cTimeoutMultiplier = 5;
    searchParams.fIssueInquiry = TRUE;

    deviceInfo.dwSize = sizeof(BLUETOOTH_DEVICE_INFO);

    HANDLE hRadio = NULL;
    HBLUETOOTH_DEVICE_FIND hFind = BluetoothFindFirstDevice(&searchParams, &deviceInfo);
    if (hFind) {
        do {
            QString name = QString::fromWCharArray(deviceInfo.szName);
            devices << name;
        } while (BluetoothFindNextDevice(hFind, &deviceInfo));
        BluetoothFindDeviceClose(hFind);
    }
#endif

    return devices;
}
