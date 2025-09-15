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
#include "NetworkAnalyzer.h"
#include "AutoUpdater.h"
#include "SettingsManager.h"
#include "PluginManager.h"
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

MainWindow::MainWindow(QWidget *parent) : QMainWindow(parent) {
    tabWidget = new QTabWidget(this);
    setCentralWidget(tabWidget);

    moduleLoader = new ModuleLoader("modules");
    moduleLoader->loadModules();

    for (ICyberModule* module : moduleLoader->modules()) {
        QWidget* widget = module->createWidget();
        tabWidget->addTab(widget, module->moduleName());
    }

    setupTabs();
    settings = new SettingsManager(this);
    network = new NetworkAnalyzer(this);
    intel = new ThreatIntelManager(this);
    setupUI();
    setupMenu();
    setupDarkMode();
    showDisclaimer();
}

void MainWindow::setupUI() {
    setWindowTitle("CyberRanger");
    resize(1400, 900);

    QTabWidget *tabs = new QTabWidget(this);
    tabs->addTab(new DashboardTab(this), "Dashboard");
    tabs->addTab(new WiFiTab(this), "Wi-Fi");
    tabs->addTab(new BluetoothTab(this), "Bluetooth");
    
    // Initialize modules
    wifiScanner = new WiFiScanner(this);
    btScanner = new BluetoothScanner(this);
    networkMapper = new NetworkMapper(this);
    reportGen = new ReportGenerator(this);
    licenseMgr = new LicenseManager(this);
    
    setCentralWidget(tabs);
    setupTabs();

    // Load plugins
    pluginManager = new PluginManager(this);
    for(const QString &pluginFile : pluginManager->availablePlugins()){
        pluginManager->loadPlugin("Plugins/" + pluginFile);
    }
}

void MainWindow::setupDarkMode() {
    // Apply dark theme
    QFile f("resources/darktheme.qss");
    if(f.open(QFile::ReadOnly)) {
        QString style = QLatin1String(f.readAll());
        this->setStyleSheet(style);
        f.close();
    } else {
        setDarkMode();
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

void MainWindow::showDisclaimer() {
    // Show Disclaimer
    if(!licenseMgr->acknowledgeDisclaimer(this)) {
        close();
        return;
    }

    // Connect Wi-Fi signals
    connect(ui->btnScanWiFi, &QPushButton::clicked, this, &MainWindow::onScanWiFiClicked);
    connect(wifiScanner, &WiFiScanner::networkDiscovered, [=](const WiFiNetwork &n){
        int row = ui->tableWiFi->rowCount();
        ui->tableWiFi->insertRow(row);
        ui->tableWiFi->setItem(row, 0, new QTableWidgetItem(n.ssid));
        ui->tableWiFi->setItem(row, 1, new QTableWidgetItem(n.bssid));
        ui->tableWiFi->setItem(row, 2, new QTableWidgetItem(QString::number(n.channel)));
        ui->tableWiFi->setItem(row, 3, new QTableWidgetItem(QString::number(n.signalStrength)));
        ui->tableWiFi->setItem(row, 4, new QTableWidgetItem(n.encryption));
        ui->tableWiFi->setItem(row, 5, new QTableWidgetItem(n.hidden ? "Yes" : "No"));
    });

    // Connect Bluetooth signals
    connect(ui->btnScanBT, &QPushButton::clicked, this, &MainWindow::onScanBluetoothClicked);
    connect(btScanner, &BluetoothScanner::deviceDiscovered, [=](const BluetoothDevice &d){
        int row = ui->tableBT->rowCount();
        ui->tableBT->insertRow(row);
        ui->tableBT->setItem(row, 0, new QTableWidgetItem(d.name));
        ui->tableBT->setItem(row, 1, new QTableWidgetItem(d.address));
        ui->tableBT->setItem(row, 2, new QTableWidgetItem(d.deviceClass));
        ui->tableBT->setItem(row, 3, new QTableWidgetItem(QString::number(d.rssi)));
        ui->tableBT->setItem(row, 4, new QTableWidgetItem(d.paired ? "Yes" : "No"));
    });

    // Connect Network Mapper
    connect(ui->btnScanNetwork, &QPushButton::clicked, [=](){
        networkMapper->scanNetwork();
    });
    connect(networkMapper, &NetworkMapper::deviceFound, [=](const NetworkDevice &d){
        int row = ui->tableNetwork->rowCount();
        ui->tableNetwork->insertRow(row);
        ui->tableNetwork->setItem(row, 0, new QTableWidgetItem(d.ip));
        ui->tableNetwork->setItem(row, 1, new QTableWidgetItem(d.mac));
        ui->tableNetwork->setItem(row, 2, new QTableWidgetItem(d.hostName));
        ui->tableNetwork->setItem(row, 3, new QTableWidgetItem(d.os));
    });

    // Reports
    connect(ui->btnGenerateReport, &QPushButton::clicked, this, &MainWindow::onGenerateReportClicked);
}

MainWindow::~MainWindow() {
    delete ui;
}

void MainWindow::setupDarkMode() {
    QFile file(":/ui/DarkStyle.qss");
    if(file.open(QFile::ReadOnly)) {
        QString style = QLatin1String(file.readAll());
        qApp->setStyleSheet(style);
    }
}

void MainWindow::onScanWiFiClicked() {
    ui->tableWiFi->setRowCount(0);
    wifiScanner->startScan();
}

void MainWindow::onScanBluetoothClicked() {
    ui->tableBT->setRowCount(0);
    btScanner->startScan();
}

void MainWindow::onGenerateReportClicked() {
    reportGen->generateFullReport(ui->tableWiFi, ui->tableBT, ui->tableNetwork);
}

void MainWindow::openSettings() {
    if (!settingsWindow) settingsWindow = new SettingsWindow(this);
    settingsWindow->show();
}

void MainWindow::setupTabs() {
    tabs->addTab(new WiFiTab(), "Wi-Fi Scanner");
    tabs->addTab(new BluetoothTab(), "Bluetooth Scanner");
    tabs->addTab(new PortScannerTab(), "Port Scanner");
    tabs->addTab(new PacketSnifferTab(), "Packet Sniffer");
    tabs->addTab(new ExploitSimulationTab(), "Exploit Simulator");
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
