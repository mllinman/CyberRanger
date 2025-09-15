#include "WiFiGraphWidget.h"

WiFiGraphWidget::WiFiGraphWidget(QWidget *parent) : QChartView(parent) {
    chart = new QChart();
    axisX = new QValueAxis();
    axisY = new QValueAxis();

    axisX->setTitleText("Time (s)");
    axisX->setRange(0, 100);
    axisY->setTitleText("Signal Strength (dBm)");
    axisY->setRange(-100, 0);

    chart->addAxis(axisX, Qt::AlignBottom);
    chart->addAxis(axisY, Qt::AlignLeft);

    this->setChart(chart);
    this->setRenderHint(QPainter::Antialiasing);
}

void WiFiGraphWidget::addNetwork(const WiFiNetwork &network) {
    if (!networkSeries.contains(network.ssid)) {
        QLineSeries *series = new QLineSeries();
        series->setName(network.ssid);
        chart->addSeries(series);
        series->attachAxis(axisX);
        series->attachAxis(axisY);
        networkSeries[network.ssid] = series;
    }
}

void WiFiGraphWidget::updateSignal(const WiFiNetwork &network) {
    if (!networkSeries.contains(network.ssid)) return;
    QLineSeries *series = networkSeries[network.ssid];
    series->append(timeIndex, network.signalStrength);
    if (series->count() > 100) series->remove(0);
    timeIndex++;
}
    scanner = new WiFiScanner(this);
    updateTimer = new QTimer(this);
    connect(updateTimer, &QTimer::timeout, this, [=]() {
        std::vector<WiFiNetwork> networks = scanner->getAvailableNetworks();
        for (const WiFiNetwork &n : networks) {
            addNetwork(n);
            updateSignal(n);
        }
    });
    updateTimer->start(2000); // Update every 2 seconds
}