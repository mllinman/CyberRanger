#include "PacketSnifferTab.h"
#include <QHBoxLayout>
#include <QTableWidgetItem>

PacketSnifferTab::PacketSnifferTab(QWidget *parent)
    : QWidget(parent), capturing(false)
{
    QVBoxLayout *layout = new QVBoxLayout(this);
    
    packetTable = new QTableWidget(0, 4, this);
    packetTable->setHorizontalHeaderLabels({"Time", "Source", "Destination", "Protocol"});
    layout->addWidget(packetTable);
    
    QHBoxLayout *buttonLayout = new QHBoxLayout();
    startBtn = new QPushButton("Start Capture", this);
    stopBtn = new QPushButton("Stop Capture", this);
    stopBtn->setEnabled(false);
    
    connect(startBtn, &QPushButton::clicked, this, &PacketSnifferTab::startCapture);
    connect(stopBtn, &QPushButton::clicked, this, &PacketSnifferTab::stopCapture);
    
    buttonLayout->addWidget(startBtn);
    buttonLayout->addWidget(stopBtn);
    layout->addLayout(buttonLayout);
    
    statusLabel = new QLabel("Ready", this);
    layout->addWidget(statusLabel);
    
    setLayout(layout);
}

void PacketSnifferTab::startCapture()
{
    capturing = true;
    startBtn->setEnabled(false);
    stopBtn->setEnabled(true);
    statusLabel->setText("Capturing packets...");
}

void PacketSnifferTab::stopCapture()
{
    capturing = false;
    startBtn->setEnabled(true);
    stopBtn->setEnabled(false);
    statusLabel->setText("Capture stopped");
}