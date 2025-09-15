#pragma once
#include <QtCharts/QChartView>
#include <QtCharts/QLineSeries>
#include <QtCharts/QValueAxis>
#include <QMap>
#include "../modules/WifiScanner.h"

using namespace QtCharts;

class WiFiGraphWidget : public QChartView {
    Q_OBJECT
public:
    explicit WiFiGraphWidget(QWidget *parent = nullptr);
    void addNetwork(const WiFiNetwork &network);
    void updateSignal(const WiFiNetwork &network);

private:
    QChart *chart;
    QValueAxis *axisX;
    QValueAxis *axisY;
    QMap<QString, QLineSeries*> networkSeries;
    int timeIndex = 0;
};
    WiFiScanner *scanner;
    QTimer *updateTimer;