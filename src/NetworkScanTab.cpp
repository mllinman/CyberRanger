#include "NetworkScanTab.h"
#include <QVBoxLayout>
#include <QHBoxLayout>
#include <QTableWidget>
#include <QHeaderView>

NetworkScanTab::NetworkScanTab(QWidget *parent) : QWidget(parent)
{
    setupUI();
}

void NetworkScanTab::setupUI()
{
    QVBoxLayout *layout = new QVBoxLayout(this);
    
    scanResults = new QTableWidget(0, 4, this);
    scanResults->setHorizontalHeaderLabels({"IP Address", "Hostname", "MAC Address", "OS"});
    scanResults->horizontalHeader()->setStretchLastSection(true);
    layout->addWidget(scanResults);
    
    QHBoxLayout *buttonLayout = new QHBoxLayout();
    startScan = new QPushButton("Start Network Scan", this);
    exportCSV = new QPushButton("Export to CSV", this);
    
    connect(startScan, &QPushButton::clicked, this, &NetworkScanTab::runScan);
    connect(exportCSV, &QPushButton::clicked, this, &NetworkScanTab::exportResults);
    
    buttonLayout->addWidget(startScan);
    buttonLayout->addWidget(exportCSV);
    buttonLayout->addStretch();
    layout->addLayout(buttonLayout);
    
    setLayout(layout);
}

void NetworkScanTab::runScan()
{
    startScan->setEnabled(false);
    startScan->setText("Scanning...");
    
    // Simulate scan results
    scanResults->setRowCount(0);
    for(int i = 0; i < 5; i++) {
        scanResults->insertRow(i);
        scanResults->setItem(i, 0, new QTableWidgetItem(QString("192.168.1.%1").arg(i + 10)));
        scanResults->setItem(i, 1, new QTableWidgetItem(QString("Device%1").arg(i)));
        scanResults->setItem(i, 2, new QTableWidgetItem("AA:BB:CC:DD:EE:FF"));
        scanResults->setItem(i, 3, new QTableWidgetItem("Unknown"));
    }
    
    startScan->setEnabled(true);
    startScan->setText("Start Network Scan");
}

void NetworkScanTab::exportResults()
{
    // Implementation for exporting results
}