#pragma once
#include <QWidget>
#include <QVBoxLayout>
#include <QHBoxLayout>
#include <QLabel>
#include <QGridLayout>
#include <QProgressBar>
#include <QTableWidget>
#include <QTimer>
#include "../Core/NetworkAnalyzer.h"
#include "ThreatIntelManager.h"

struct Metric {
    QString name;
    double value;
    QString unit;
};

class DashboardTab : public QWidget {
    Q_OBJECT
public:
    DashboardTab(QWidget *parent = nullptr);

private slots:
    void updateMetrics();
    void refreshData();

private:
    QVBoxLayout *layout;
    QGridLayout *metricsLayout;
    QLabel *networkStatusLabel;
    QLabel *threatsLabel;
    QLabel *uptimeLabel;
    QProgressBar *cpuUsage;
    QProgressBar *memUsage;
    QTableWidget *activeScansTable;
    QTimer *updateTimer;
    
    NetworkAnalyzer *networkAnalyzer;
    ThreatIntelManager *threatManager;
    QMap<QString, Metric> metrics;
    
    void setupUI();
    void setupMetrics();
    void updateNetworkStatus();
};