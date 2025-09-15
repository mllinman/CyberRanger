#include "WifiGraphWidget.h"

WiFiGraphWidget::WiFiGraphWidget(QWidget *parent) : QWidget(parent) {
    layout = new QVBoxLayout(this);
    infoLabel = new QLabel("Wi-Fi Graph Widget - Simplified Version", this);
    layout->addWidget(infoLabel);
    setLayout(layout);
}

void WiFiGraphWidget::addNetwork(const QString &ssid) {
    infoLabel->setText(QString("Monitoring network: %1").arg(ssid));
}

void WiFiGraphWidget::updateSignal(const QString &ssid) {
    infoLabel->setText(QString("Updated signal for: %1").arg(ssid));
}