#pragma once
#include <QWidget>
#include <QListWidget>
#include <QTableWidget>
#include <QPushButton>
#include <QVBoxLayout>
#include <QTimer>
#include <QRandomGenerator>
#include <vector>
#include "../modules/BluetoothScanner.h"

class BluetoothTab : public QWidget {
    Q_OBJECT
public:
    BluetoothTab(QWidget *parent = nullptr);
    ~BluetoothTab();

private slots:
    void scanDevices();
    void refreshDevices();
    void exportDevices();
    void pairDevice();  
    void unpairDevice();  

private:
    QListWidget *btDevices;
    QTimer *updateTimer;
    QVBoxLayout *layout;
    QTableWidget *deviceTable;
    QPushButton *startScan;
    QTimer *autoScanTimer;
    QListWidget *btList;
    QPushButton *refreshBtn;
    QPushButton *exportBtn;
    QPushButton *pairBtn;
    QPushButton *unpairBtn;
  
    void setupUI();
    std::vector<BluetoothDevice> getAvailableDevices();
};
