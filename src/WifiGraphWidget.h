#pragma once
#include <QWidget>
#include <QLabel>
#include <QVBoxLayout>

// Simplified version for initial build without QtCharts dependency
class WiFiGraphWidget : public QWidget {
    Q_OBJECT
public:
    explicit WiFiGraphWidget(QWidget *parent = nullptr);
    void addNetwork(const QString &ssid);
    void updateSignal(const QString &ssid);

private:
    QLabel *infoLabel;
    QVBoxLayout *layout;
};