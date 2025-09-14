#pragma once
#include <QMainWindow>
#include <QTabWidget>
#include "WifiTab.h"
#include "DashboardTab.h"
#include "BluetoothTab.h"
#include "NetworkScanTab.h"
#include "PacketCaptureTab.h"
#include "PluginsTab.h"
#include "LogsTab.h"
#include "SettingsTab.h"

class MainWindow : public QMainWindow {
    Q_OBJECT
public:
    MainWindow(QWidget *parent = nullptr);

private:
    QTabWidget *tabs;
    DashboardTab *dashboardTab;
    WifiTab *wifiTab;
    BluetoothTab *btTab;
    NetworkScanTab *scanTab;
    PacketCaptureTab *captureTab;
    PluginsTab *pluginsTab;
    LogsTab *logsTab;
    SettingsTab *settingsTab;

    void setupUI();
};
    void setupMenu();
    QStatusBar *status;
    void openSettings();
private slots:
    void updateStatus(const QString &message);
    void logMessage(const QString &message, const QString &level = "INFO");
    void showAbout();
};
