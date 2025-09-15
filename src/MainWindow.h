#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QTabWidget>
#include <QStatusBar>
#include "ModuleLoader.h"
#include "WifiTab.h"
#include "DashboardTab.h"
#include "BluetoothTab.h"
#include "NetworkScanTab.h"
#include "PacketCaptureTab.h"
#include "../modules/WifiScanner.h"
#include "../modules/BluetoothScanner.h"
#include "../modules/NetworkMapper.h"
#include "utils/ReportGenerator.h"
#include "../Core/LicenseManager.h"
#include "PluginsTab.h"
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

private slots:
    void updateStatus(const QString &message);
    void logMessage(const QString &message, const QString &level = "INFO");
    void showAbout();
    void onScanWiFiClicked();
    void onScanBluetoothClicked();
    void onGenerateReportClicked();
    void onStartPacketCaptureClicked();
    void onStopPacketCaptureClicked();

private:
    Ui::MainWindow *ui;
    QTabWidget *tabWidget;
    QStatusBar *status;
    
    // Module and scanner instances
    ModuleLoader* moduleLoader;
    WiFiScanner *wifiScanner;
    BluetoothScanner *btScanner;
    NetworkMapper *networkMapper;
    ReportGenerator *reportGen;
    LicenseManager *licenseMgr;
    
    // Tab instances
    DashboardTab *dashboardTab;
    WifiTab *wifiTab;
    BluetoothTab *btTab;
    NetworkScanTab *scanTab;
    PacketCaptureTab *captureTab;
    PluginsTab *pluginsTab;
    LogsTab *logsTab;
    SettingsTab *settingsTab;
    
    // Private methods
    void setupTabs();
    void setupUI();
    void initTabs();
    void setupDarkMode();
    void showDisclaimer();
    void setupMenu();
    void openSettings();
};

#endif // MAINWINDOW_H