#pragma once
#include <QWidget>
#include <QVBoxLayout>
#include <QLabel>
#include <QtCharts/QChartView>
#include <QtCharts/QPieSeries>
#include <QTimer>
#include "Core/NetworkAnalyzer.h"
#include "Core/ThreatIntelManager.h"

QT_CHARTS_USE_NAMESPACE

using namespace QtCharts;

class DashboardTab : public QWidget {
    Q_OBJECT
public:
    DashboardTab(NetworkAnalyzer *net, ThreatIntelManager *intel, QWidget *parent = nullptr);
    DashboardTab(QWidget* parent = nullptr);

private:
    NetworkAnalyzer *network;
    ThreatIntelManager *threats;
    QTimer *refreshTimer;
    void updateCharts();
    QVBoxLayout *layout;
    QLabel *summaryLabel;
    QChartView *chartView;
    QLineSeries *series;
    QTimer *timer;
    int xValue;
private slots:
    void updateChart();
    void setupUI();
    void populateDummyData();
    void onDataUpdated();
    void onRefreshTimeout();
    void onIndicatorsUpdated(const QStringList &iocList);
signals:
    void dataUpdated();
    void refreshRequested();
    void indicatorsUpdated(const QStringList &iocList);
};
