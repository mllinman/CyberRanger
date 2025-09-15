#pragma once
#include <QtCharts/QChartView>
#include <QtCharts/QLineSeries>
#include <QtCharts/QValueAxis>
#include <QtCharts/QChart>
#include <QMap>
#include <QTimer>
#include "../modules/WifiScanner.h"

class WiFiGraphWidget : public QtCharts::QChartView {
    Q_OBJECT
public:
    explicit WiFiGraphWidget(QWidget *parent = nullptr);
    void addNetwork(const WiFiNetwork &network);
    void updateSignal(const WiFiNetwork &network);

private:
    QtCharts::QChart *chart;
    QtCharts::QValueAxis *axisX;
    QtCharts::QValueAxis *axisY;
    QMap<QString, QtCharts::QLineSeries*> networkSeries;
    WiFiScanner *scanner;
    QTimer *updateTimer;
    int timeIndex = 0;
};