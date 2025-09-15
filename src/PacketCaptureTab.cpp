#include "PacketCaptureTab.h"
#include <QHBoxLayout>

PacketCaptureTab::PacketCaptureTab(QWidget *parent)
    : QWidget(parent), capturing(false)
{
    QVBoxLayout *layout = new QVBoxLayout(this);
    
    captureOutput = new QTextEdit(this);
    captureOutput->setReadOnly(true);
    layout->addWidget(captureOutput);
    
    QHBoxLayout *buttonLayout = new QHBoxLayout();
    startBtn = new QPushButton("Start Capture", this);
    stopBtn = new QPushButton("Stop Capture", this);
    clearBtn = new QPushButton("Clear", this);
    stopBtn->setEnabled(false);
    
    connect(startBtn, &QPushButton::clicked, this, &PacketCaptureTab::startCapture);
    connect(stopBtn, &QPushButton::clicked, this, &PacketCaptureTab::stopCapture);
    connect(clearBtn, &QPushButton::clicked, this, &PacketCaptureTab::clearCapture);
    
    buttonLayout->addWidget(startBtn);
    buttonLayout->addWidget(stopBtn);
    buttonLayout->addWidget(clearBtn);
    layout->addLayout(buttonLayout);
    
    statusLabel = new QLabel("Ready", this);
    layout->addWidget(statusLabel);
    
    setLayout(layout);
}

void PacketCaptureTab::startCapture()
{
    capturing = true;
    startBtn->setEnabled(false);
    stopBtn->setEnabled(true);
    statusLabel->setText("Capturing packets...");
    captureOutput->append("Starting packet capture...");
}

void PacketCaptureTab::stopCapture()
{
    capturing = false;
    startBtn->setEnabled(true);
    stopBtn->setEnabled(false);
    statusLabel->setText("Capture stopped");
    captureOutput->append("Packet capture stopped.");
}

void PacketCaptureTab::clearCapture()
{
    captureOutput->clear();
}