#include "MainWindow.h"
#include "WifiTab.h"
#include "BluetoothTab.h"
#include "LogsTab.h"
#include "SettingsWindow.h"
#include "DashboardTab.h"
#include "NetworkScanTab.h"
#include "PacketCaptureTab.h"
#include "PluginTab.h"
#include "NetworkAnalyzer.h"
#include "ThreatIntelManager.h"
#include "SettingsManager.h"
#include <QVBoxLayout>
#include <QPalette>
#include <QColor>
#include <QMenu>
#include <QMenuBar>
#include <QApplication>
#include <QMessageBox>
#include <QStatusBar>
#include <QTabWidget>
#include <QAction>
#include <QFile>
#include <QTextStream>

MainWindow::MainWindow(QWidget *parent) : QMainWindow(parent) {
    settings = new SettingsManager(this);
    network = new NetworkAnalyzer(this);
    intel = new ThreatIntelManager(this);
    setupUI();
    setupMenu();
}

void MainWindow::setupUI() {
    setWindowTitle("CyberRanger");
    resize(1400, 900);

    tabs = new QTabWidget(this);
    dashboardTab = new DashboardTab();
    wifiTab = new WifiTab();
    btTab = new BluetoothTab();
    pluginTab = new PluginTab(this);
    scanTab = new NetworkScanTab();
    captureTab = new PacketCaptureTab();
    pluginsTab = new PluginsTab();
    logsTab = new LogsTab();
    settingsTab = new SettingsTab();

    tabs->addTab(dashboardTab, "Dashboard");
    tabs->addTab(wifiTab, "Wi-Fi");
    tabs->addTab(btTab, "Bluetooth");
    tabs->addTab(pluginTab, "Plugins");
    tabs->addTab(scanTab, "Network Scan");
    tabs->addTab(captureTab, "Packet Capture");
    tabs->addTab(pluginsTab, "Plugins");
    tabs->addTab(logsTab, "Logs");
    tabs->addTab(settingsTab, "Settings");

    setCentralWidget(tabs);

    // Apply dark theme
    QFile f("resources/darktheme.qss");
    if(f.open(QFile::ReadOnly)) {
        QString style = QLatin1String(f.readAll());
        this->setStyleSheet(style);
        f.close();
    } else {
        setDarkMode();
    }
}

    // Auto-update
    autoUpdater = new AutoUpdater("https://example.com/update.json", this);
    connect(autoUpdater, &AutoUpdater::updateAvailable, this, [](const QString &version, const QString &url){
        QMessageBox::information(nullptr, "Update Available", "Version " + version + " is available! Download: " + url);
    });
    autoUpdater->checkForUpdates();
    status = new QStatusBar(this);
    setStatusBar(status);

    QMenu *fileMenu = menuBar()->addMenu("File");
    QAction *exitAct = new QAction("Exit", this);
    connect(exitAct, &QAction::triggered, qApp, &QApplication::quit);
    fileMenu->addAction(exitAct);
}

void MainWindow::setupMenu() {
    QMenu *fileMenu = menuBar()->addMenu("File");
    QAction *settingsAction = new QAction("Settings", this);
    QAction *exitAction = new QAction("Exit", this);

    connect(settingsAction, &QAction::triggered, this, &MainWindow::openSettings);
    connect(exitAction, &QAction::triggered, qApp, &QApplication::quit);

    fileMenu->addAction(settingsAction);
    fileMenu->addSeparator();
    fileMenu->addAction(exitAction);
}

void MainWindow::setDarkMode() {
    QPalette darkPalette;
    darkPalette.setColor(QPalette::Window, QColor(53, 53, 53));
    darkPalette.setColor(QPalette::WindowText, Qt::white);
    darkPalette.setColor(QPalette::Base, QColor(42, 42, 42));
    darkPalette.setColor(QPalette::AlternateBase, QColor(66, 66, 66));
    darkPalette.setColor(QPalette::Text, Qt::white);
    darkPalette.setColor(QPalette::Button, QColor(53, 53, 53));
    darkPalette.setColor(QPalette::ButtonText, Qt::white);
    darkPalette.setColor(QPalette::Highlight, QColor(42, 130, 218));
    QApplication::setPalette(darkPalette);
}
void MainWindow::openSettings() {
    if (!settingsWindow) settingsWindow = new SettingsWindow(this);
    settingsWindow->show();
}

void MainWindow::toggleTheme() {
    static bool dark = true;
    if(dark) {
        QApplication::setPalette(style()->standardPalette());
        dark = false;
        status->showMessage("Light mode enabled", 3000);
    } else {
        setDarkMode();
        dark = true;
        status->showMessage("Dark mode enabled", 3000);
    }
}
