#include "MainWindow.h"
#include "WifiTab.h"
#include "BluetoothTab.h"
#include "LogsTab.h"
#include "SettingsWindow.h"
#include "DashboardTab.h"
#include "NetworkScanTab.h"
#include "PacketCaptureTab.h"
#include "PortScannerTab.h"
#include "PacketSnifferTab.h"
#include "ExploitSimulationTab.h"
#include "../Core/NetworkAnalyzer.h"
#include "../Core/AutoUpdater.h"
#include "../Core/SettingsManager.h"
#include "../Core/PluginManager.h"
#include "ui_MainWindow.h"
#include "PentestTabWidget.h"
#include <QHeaderView>
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
#include <QWidget>
#include <QLabel>
#include <QPushButton>

MainWindow::MainWindow(QWidget *parent) : QMainWindow(parent), ui(new Ui::MainWindow) {
    ui->setupUi(this);
    
    // Initialize member variables
    moduleLoader = new ModuleLoader("modules");
    wifiScanner = new WiFiScanner(this);
    btScanner = new BluetoothScanner(this);
    networkMapper = new NetworkMapper(this);
    reportGen = new ReportGenerator(this);
    licenseMgr = new LicenseManager(this);
    
    // Initialize tabs
    setupTabs();
    setupUI();
    setupMenu();
    setupDarkMode();
}

MainWindow::~MainWindow() {
    delete ui;
}

void MainWindow::setupTabs() {
    tabWidget = new QTabWidget(this);
    setCentralWidget(tabWidget);
    
    // Initialize tabs
    dashboardTab = new DashboardTab(this);
    wifiTab = new WifiTab(this);
    btTab = new BluetoothTab(this);
    scanTab = new NetworkScanTab(this);
    captureTab = new PacketCaptureTab(this);
    pluginsTab = new PluginsTab(this);
    logsTab = new LogsTab(this);
    settingsTab = new SettingsTab(this);
    
    // Add tabs to widget
    tabWidget->addTab(dashboardTab, "Dashboard");
    tabWidget->addTab(wifiTab, "Wi-Fi");
    tabWidget->addTab(btTab, "Bluetooth");
    tabWidget->addTab(scanTab, "Network Scan");
    tabWidget->addTab(captureTab, "Packet Capture");
    tabWidget->addTab(pluginsTab, "Plugins");
    tabWidget->addTab(logsTab, "Logs");
    tabWidget->addTab(settingsTab, "Settings");
}

void MainWindow::setupUI() {
    setWindowTitle("CyberRanger");
    resize(1400, 900);
    
    // Setup status bar
    status = new QStatusBar(this);
    setStatusBar(status);
    status->showMessage("Ready", 2000);
}

void MainWindow::setupDarkMode() {
    // Try to load dark theme from resources first
    QFile file(":/resources/darkmode.qss");
    if (!file.open(QFile::ReadOnly | QFile::Text)) {
        // Fall back to loading from file system
        file.setFileName("resources/darkmode.qss");
        if (!file.open(QFile::ReadOnly | QFile::Text)) {
            // Use built-in dark palette as final fallback
            setDarkModePalette();
            return;
        }
    }
    
    QString style = QLatin1String(file.readAll());
    setStyleSheet(style);
    file.close();
}

void MainWindow::setDarkModePalette() {
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

// Slot implementations
void MainWindow::updateStatus(const QString &message) {
    if (status) {
        status->showMessage(message, 3000);
    }
}

void MainWindow::logMessage(const QString &message, const QString &level) {
    // Forward to logs tab if available
    if (logsTab) {
        // Assuming LogsTab has a method to add messages
        // logsTab->addLogMessage(message, level);
    }
}

void MainWindow::showAbout() {
    QMessageBox::about(this, "About CyberRanger", 
                       "CyberRanger - Wi-Fi & Bluetooth Scanner\n"
                       "Version 1.0\n"
                       "For white-hat/pentesting use only");
}

void MainWindow::onScanWiFiClicked() {
    if (wifiScanner) {
        wifiScanner->startScan();
        updateStatus("Wi-Fi scan started...");
    }
}

void MainWindow::onScanBluetoothClicked() {
    if (btScanner) {
        btScanner->startScan();
        updateStatus("Bluetooth scan started...");
    }
}

void MainWindow::onGenerateReportClicked() {
    if (reportGen) {
        reportGen->generateReport();
        updateStatus("Report generated successfully");
    }
}

void MainWindow::onStartPacketCaptureClicked() {
    updateStatus("Packet capture started...");
}

void MainWindow::onStopPacketCaptureClicked() {
    updateStatus("Packet capture stopped");
}

void MainWindow::openSettings() {
    // Open settings window/dialog
    QMessageBox::information(this, "Settings", "Settings functionality will be implemented here");
}




