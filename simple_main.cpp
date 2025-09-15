#include <QApplication>
#include <QMainWindow>
#include <QTabWidget>
#include <QVBoxLayout>
#include <QLabel>
#include <QPushButton>
#include <QWidget>
#include <QMessageBox>
#include <QMenuBar>
#include <QStatusBar>
#include <QFile>
#include <QDialog>
#include <QCheckBox>
#include <QHBoxLayout>

class DisclaimerWindow : public QDialog {
    Q_OBJECT
public:
    DisclaimerWindow(QWidget* parent = nullptr) : QDialog(parent) {
        setWindowTitle("CyberRanger Legal Disclaimer");
        setModal(true);
        resize(500, 300);
        
        QVBoxLayout *layout = new QVBoxLayout(this);
        
        QLabel *title = new QLabel("<h2>Legal Disclaimer</h2>");
        layout->addWidget(title);
        
        QLabel *text = new QLabel(
            "<p><b>IMPORTANT:</b> CyberRanger is intended for authorized penetration testing and security research only.</p>"
            "<p>By using this software, you acknowledge that:</p>"
            "<ul>"
            "<li>You will only use this tool on networks and systems you own or have explicit permission to test</li>"
            "<li>Unauthorized scanning or access to computer systems may be illegal in your jurisdiction</li>"
            "<li>You assume full responsibility for your actions when using this software</li>"
            "<li>The developers are not responsible for any misuse or illegal activity</li>"
            "</ul>"
            "<p>Do you agree to use this software responsibly and legally?</p>"
        );
        text->setWordWrap(true);
        layout->addWidget(text);
        
        acknowledgeCheck = new QCheckBox("I acknowledge and agree to the terms above");
        layout->addWidget(acknowledgeCheck);
        
        QHBoxLayout *buttonLayout = new QHBoxLayout();
        acceptButton = new QPushButton("Accept");
        QPushButton *declineButton = new QPushButton("Decline");
        
        acceptButton->setEnabled(false);
        
        buttonLayout->addWidget(acceptButton);
        buttonLayout->addWidget(declineButton);
        layout->addLayout(buttonLayout);
        
        connect(acknowledgeCheck, &QCheckBox::toggled, [this](bool checked) {
            acceptButton->setEnabled(checked);
            acknowledged = checked;
        });
        
        connect(acceptButton, &QPushButton::clicked, this, &QDialog::accept);
        connect(declineButton, &QPushButton::clicked, this, &QDialog::reject);
    }
    
    bool isAcknowledged() const { return acknowledged; }
    
private:
    QCheckBox* acknowledgeCheck;
    QPushButton* acceptButton;
    bool acknowledged = false;
};

class SimpleMainWindow : public QMainWindow {
    Q_OBJECT

public:
    SimpleMainWindow(QWidget *parent = nullptr) : QMainWindow(parent) {
        setWindowTitle("CyberRanger - Network Security Scanner");
        resize(1200, 800);
        
        // Create central tab widget
        QTabWidget *tabs = new QTabWidget(this);
        setCentralWidget(tabs);
        
        // Create simple tabs
        createDashboardTab(tabs);
        createWiFiTab(tabs);
        createBluetoothTab(tabs);
        createNetworkTab(tabs);
        
        // Setup menu
        setupMenu();
        
        // Setup status bar
        QStatusBar *status = new QStatusBar(this);
        setStatusBar(status);
        status->showMessage("Ready - Linux Version with Working Stubs", 3000);
        
        // Apply dark theme
        setupDarkTheme();
    }

private slots:
    void showAbout() {
        QMessageBox::about(this, "About CyberRanger", 
                          "CyberRanger - Network Security Scanner\n"
                          "Version 1.0 (Linux Compatible)\n\n"
                          "This is a working demonstration build with stub implementations.\n"
                          "For authorized pentesting use only\n\n"
                          "Features:\n"
                          "• Cross-platform Qt6-based interface\n" 
                          "• Modular scanner architecture\n"
                          "• Dark theme UI\n"
                          "• Legal compliance disclaimer");
    }

private:
    void createDashboardTab(QTabWidget *tabs) {
        QWidget *dashboard = new QWidget();
        QVBoxLayout *layout = new QVBoxLayout(dashboard);
        
        layout->addWidget(new QLabel("<h2>CyberRanger Dashboard</h2>"));
        layout->addWidget(new QLabel("Welcome to CyberRanger - Network Security Scanner"));
        layout->addWidget(new QLabel("<i>This is a working demonstration build running on Linux</i>"));
        layout->addWidget(new QLabel("<br><b>Available Scanner Modules:</b>"));
        layout->addWidget(new QLabel("• <b>Wi-Fi Scanner</b> - Discover wireless networks (stub implementation)"));
        layout->addWidget(new QLabel("• <b>Bluetooth Scanner</b> - Find Bluetooth devices (stub implementation)"));
        layout->addWidget(new QLabel("• <b>Network Scanner</b> - Scan network topology (stub implementation)"));
        layout->addWidget(new QLabel("<br><b>Status:</b> All core modules loaded successfully"));
        
        QPushButton *scanBtn = new QPushButton("Start Quick Scan (Simulation)");
        connect(scanBtn, &QPushButton::clicked, [this]() {
            statusBar()->showMessage("Quick scan completed: 3 WiFi networks, 2 BT devices, 5 network hosts found (simulated)", 5000);
            QMessageBox::information(this, "Scan Complete", 
                                   "Quick scan simulation completed!\n\n"
                                   "Found:\n"
                                   "• 3 Wi-Fi networks\n"
                                   "• 2 Bluetooth devices\n"  
                                   "• 5 network hosts\n\n"
                                   "Use individual tabs for detailed scans.");
        });
        layout->addWidget(scanBtn);
        
        tabs->addTab(dashboard, "Dashboard");
    }
    
    void createWiFiTab(QTabWidget *tabs) {
        QWidget *wifi = new QWidget();
        QVBoxLayout *layout = new QVBoxLayout(wifi);
        
        layout->addWidget(new QLabel("<h3>Wi-Fi Network Scanner</h3>"));
        layout->addWidget(new QLabel("Scan for available wireless networks in your area."));
        layout->addWidget(new QLabel("<i>Note: This is a stub implementation for demonstration</i>"));
        
        QPushButton *scanBtn = new QPushButton("Scan Wi-Fi Networks");
        connect(scanBtn, &QPushButton::clicked, [this]() {
            statusBar()->showMessage("Wi-Fi scan completed - found 3 networks (simulation)", 5000);
            QMessageBox::information(this, "Wi-Fi Scan Results",
                                   "Found 3 wireless networks:\n\n"
                                   "• MyWiFi_5G (WPA2, -45dBm)\n"
                                   "• Guest_Network (Open, -67dBm)\n"
                                   "• Office_WiFi (WPA3, -52dBm)\n\n"
                                   "Note: This is simulated data");
        });
        layout->addWidget(scanBtn);
        
        QLabel *results = new QLabel("<br><b>Scan Results:</b><br>Click 'Scan Wi-Fi Networks' to start scanning...");
        layout->addWidget(results);
        
        tabs->addTab(wifi, "Wi-Fi Scanner");
    }
    
    void createBluetoothTab(QTabWidget *tabs) {
        QWidget *bluetooth = new QWidget();
        QVBoxLayout *layout = new QVBoxLayout(bluetooth);
        
        layout->addWidget(new QLabel("<h3>Bluetooth Device Scanner</h3>"));
        layout->addWidget(new QLabel("Discover Bluetooth devices in range."));
        layout->addWidget(new QLabel("<i>Note: This is a stub implementation for demonstration</i>"));
        
        QPushButton *scanBtn = new QPushButton("Scan Bluetooth Devices");
        connect(scanBtn, &QPushButton::clicked, [this]() {
            statusBar()->showMessage("Bluetooth scan completed - found 2 devices (simulation)", 5000);
            QMessageBox::information(this, "Bluetooth Scan Results",
                                   "Found 2 Bluetooth devices:\n\n"
                                   "• iPhone (12:34:56:78:90:AB)\n"
                                   "• Wireless Mouse (CD:EF:01:23:45:67)\n\n"
                                   "Note: This is simulated data");
        });
        layout->addWidget(scanBtn);
        
        QLabel *results = new QLabel("<br><b>Scan Results:</b><br>Click 'Scan Bluetooth Devices' to start scanning...");
        layout->addWidget(results);
        
        tabs->addTab(bluetooth, "Bluetooth Scanner");
    }
    
    void createNetworkTab(QTabWidget *tabs) {
        QWidget *network = new QWidget();
        QVBoxLayout *layout = new QVBoxLayout(network);
        
        layout->addWidget(new QLabel("<h3>Network Scanner & Port Scanner</h3>"));
        layout->addWidget(new QLabel("Scan network topology and discover open ports."));
        layout->addWidget(new QLabel("<i>Note: This is a stub implementation for demonstration</i>"));
        
        QPushButton *scanBtn = new QPushButton("Scan Network");
        connect(scanBtn, &QPushButton::clicked, [this]() {
            statusBar()->showMessage("Network scan completed - found 5 devices (simulation)", 5000);
            QMessageBox::information(this, "Network Scan Results",
                                   "Network topology scan results:\n\n"
                                   "• 192.168.1.1 (Router) - ports 80, 443 open\n"
                                   "• 192.168.1.100 (Desktop) - ports 22, 80 open\n"
                                   "• 192.168.1.101 (Laptop) - port 22 open\n"
                                   "• 192.168.1.150 (Printer) - port 631 open\n"
                                   "• 192.168.1.200 (NAS) - ports 22, 80, 443 open\n\n"
                                   "Note: This is simulated data");
        });
        layout->addWidget(scanBtn);
        
        QLabel *results = new QLabel("<br><b>Scan Results:</b><br>Click 'Scan Network' to start scanning...");
        layout->addWidget(results);
        
        tabs->addTab(network, "Network Scanner");
    }
    
    void setupMenu() {
        QMenu *fileMenu = menuBar()->addMenu("File");
        QMenu *helpMenu = menuBar()->addMenu("Help");
        
        QAction *aboutAction = new QAction("About CyberRanger", this);
        connect(aboutAction, &QAction::triggered, this, &SimpleMainWindow::showAbout);
        
        QAction *exitAction = new QAction("Exit", this);
        connect(exitAction, &QAction::triggered, qApp, &QApplication::quit);
        
        helpMenu->addAction(aboutAction);
        fileMenu->addAction(exitAction);
    }
    
    void setupDarkTheme() {
        QFile file("resources/darkmode.qss");
        if (file.open(QFile::ReadOnly | QFile::Text)) {
            QString style = QLatin1String(file.readAll());
            setStyleSheet(style);
            file.close();
        } else {
            // Fallback dark theme
            setStyleSheet(
                "QMainWindow { background-color: #2b2b2b; color: #ffffff; }"
                "QWidget { background-color: #2b2b2b; color: #ffffff; }"
                "QTabWidget::pane { border: 1px solid #3a3a3a; background-color: #2b2b2b; }"
                "QTabWidget::tab-bar { alignment: center; }"
                "QTabBar::tab { background: #3a3a3a; color: #ffffff; padding: 8px 16px; margin: 1px; border-radius: 3px; }"
                "QTabBar::tab:selected { background: #4a90e2; }"
                "QPushButton { background-color: #4a90e2; color: #ffffff; border: none; padding: 10px 20px; border-radius: 5px; font-weight: bold; }"
                "QPushButton:hover { background-color: #357abd; }"
                "QPushButton:pressed { background-color: #2e5d8a; }"
                "QLabel { color: #ffffff; }"
                "QCheckBox { color: #ffffff; }"
                "QCheckBox::indicator { width: 18px; height: 18px; }"
                "QCheckBox::indicator:unchecked { background-color: #3a3a3a; border: 1px solid #666666; }"
                "QCheckBox::indicator:checked { background-color: #4a90e2; border: 1px solid #4a90e2; }"
            );
        }
    }
};

int main(int argc, char *argv[]) {
    QApplication app(argc, argv);
    
    // Show disclaimer
    DisclaimerWindow disclaimer;
    if (disclaimer.exec() != QDialog::Accepted || !disclaimer.isAcknowledged()) {
        return 0;
    }
    
    // Create and show main window
    SimpleMainWindow window;
    window.show();
    
    return app.exec();
}

#include "simple_main.moc"