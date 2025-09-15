#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#pragma once
#include <QMainWindow>
#include <QTabWidget>
#include "ModuleLoader.h"
#include "WifiTab.h"
#include "DashboardTab.h"
#include "BluetoothTab.h"
#include "NetworkScanTab.h"
#include "PacketCaptureTab.h"
#include "WiFiScanner.h"
#include "../modules/BluetoothScanner.h"
#include "../modules/NetworkMapper.h"
#include "utils/ReportGenerator.h"
#include "utils/LicenseManager.h"
#include "PluginTab.h"
#include "LogsTab.h"
#include "SettingsTab.h"
#include "PentestTabWidget.h"

QT_BEGIN_NAMESPACE
namespace Ui { class MainWindow; }
QT_END_NAMESPACE

class MainWindow : public QMainWindow
 {
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();
private:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();
    Ui::MainWindow *ui;
    QTabWidget *tabWidget;
    ModuleLoader* moduleLoader;
    WiFiScanner *wifiScanner;
    BluetoothScanner *btScanner;
    NetworkMapper *networkMapper;
    ReportGenerator *reportGen;
    LicenseManager *licenseMgr;
    DashboardTab *dashboardTab;
    WifiTab *wifiTab;
    BluetoothTab *btTab;
    NetworkScanTab *scanTab;
    PacketCaptureTab *captureTab;
    PluginsTab *pluginsTab;
    LogsTab *logsTab;
    SettingsTab *settingsTab;
    void setupTabs();
    void setupUI();
    void initTabs();
    void setupDarkMode();
    void showDisclaimer();
};
    void setupMenu();
    QStatusBar *status;
    void openSettings();
private slots:
    void updateStatus(const QString &message);
    void logMessage(const QString &message, const QString &level = "INFO");
    void showAbout();
    void onScanWiFiClicked();
    void onScanBluetoothClicked();
    void onGenerateReportClicked();
    void onStartPacketCaptureClicked();
    void onStopPacketCaptureClicked();
};
#endif // MAINWINDOW_H