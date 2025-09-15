#pragma once
#include <QWidget>
#include <QVBoxLayout>
#include <QLabel>
#include <QtCharts>
#include <QMap>
#include <QString>
#include <QtCharts/QChartView>
#include <QtCharts/QPieSeries>
#include <QTimer>
#include "../Core/NetworkAnalyzer.h"
#include "ThreatIntelManager.h"

QT_CHARTS_USE_NAMESPACE

struct Metric {
    QLineSeries *series;
    QString name;
};

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
    QChart *chart;
    QMap<QString, Metric> metrics;
    QLineSeries *series;
    QTimer *timer;
    int xValue;
private slots:
    void updateMetrics();
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
