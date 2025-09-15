#include "PortScannerTab.h"
#include <QHBoxLayout>
#include <QFormLayout>
#include <QTableWidgetItem>

PortScannerTab::PortScannerTab(QWidget *parent)
    : QWidget(parent), scanning(false)
{
    QVBoxLayout *layout = new QVBoxLayout(this);
    
    // Input form
    QFormLayout *formLayout = new QFormLayout();
    targetEdit = new QLineEdit("127.0.0.1", this);
    portRangeEdit = new QLineEdit("1-1000", this);
    formLayout->addRow("Target:", targetEdit);
    formLayout->addRow("Port Range:", portRangeEdit);
    layout->addLayout(formLayout);
    
    // Buttons
    QHBoxLayout *buttonLayout = new QHBoxLayout();
    scanBtn = new QPushButton("Start Scan", this);
    stopBtn = new QPushButton("Stop Scan", this);
    stopBtn->setEnabled(false);
    
    connect(scanBtn, &QPushButton::clicked, this, &PortScannerTab::startScan);
    connect(stopBtn, &QPushButton::clicked, this, &PortScannerTab::stopScan);
    
    buttonLayout->addWidget(scanBtn);
    buttonLayout->addWidget(stopBtn);
    layout->addLayout(buttonLayout);
    
    // Results table
    resultsTable = new QTableWidget(0, 3, this);
    resultsTable->setHorizontalHeaderLabels({"Port", "State", "Service"});
    layout->addWidget(resultsTable);
    
    statusLabel = new QLabel("Ready", this);
    layout->addWidget(statusLabel);
    
    setLayout(layout);
}

void PortScannerTab::startScan()
{
    scanning = true;
    scanBtn->setEnabled(false);
    stopBtn->setEnabled(true);
    statusLabel->setText("Scanning " + targetEdit->text() + "...");
    resultsTable->setRowCount(0);
}

void PortScannerTab::stopScan()
{
    scanning = false;
    scanBtn->setEnabled(true);
    stopBtn->setEnabled(false);
    statusLabel->setText("Scan stopped");
}