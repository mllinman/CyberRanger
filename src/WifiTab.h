#pragma once
#include <QWidget>
#include <QVBoxLayout>
#include <QTableWidget>
#include <QPushButton>
#include <QTimer>
#include <vector>
#include <string>
#include <QRandomGenerator>

struct WifiNetwork {
    std::wstring ssid;
    int signalStrength;
    std::wstring security;
};

class WifiTab : public QWidget {
    Q_OBJECT
public:
    WifiTab(QWidget *parent = nullptr);

private:
    QVBoxLayout *layout;
    QTableWidget *deviceTable;
    QTableWidget *wifiTable;
    QTimer *updateTimer;
    QPushButton *startScan;
    QTimer *autoScanTimer;
    QListWidget *wifiList;
    QPushButton *refreshBtn;
    QPushButton *exportBtn;
    QPushButton *connectBtn;
    QPushButton *disconnectBtn;
    QPushButton *scanBtn;
    
    void setupUI();
    std::vector<WifiNetwork> getAvailableNetworks();

private slots:
    void refreshNetworks();
    void exportNetworks();
    void connectNetwork();
    void disconnectNetwork();
    void scanNetworks();
};
