#pragma once
#include <QString>
#include <QStringList>

#ifdef _WIN32
#include <windows.h>
#include <wlanapi.h>
#include <bluetoothapis.h>
#include <initguid.h>
#pragma comment(lib, "wlanapi.lib")
#pragma comment(lib, "bthprops.lib")
#endif

class NetworkUtils {
public:
    static QStringList scanWiFiNetworks();
    static QStringList scanBluetoothDevices();
};
