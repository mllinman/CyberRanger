#include "DashboardTab.h"
#include <QtCharts>
#include <QVBoxLayout>
#include <QRandomGenerator>

DashboardTab::DashboardTab(QWidget* parent) : QWidget(parent), xValue(0) {
    series = new QLineSeries();
    QChart *chart = new QChart();
    chart->addSeries(series);
    chart->createDefaultAxes();
    chart->setTitle("Live Wi-Fi Signal Strength");

    chartView = new QChartView(chart);
    chartView->setRenderHint(QPainter::Antialiasing);

    QVBoxLayout *layout = new QVBoxLayout(this);
    layout->addWidget(chartView);
    setLayout(layout);

    timer = new QTimer(this);
    connect(timer, &QTimer::timeout, this, &DashboardTab::updateChart);
    timer->start(1000);
}
void DashboardTab::updateChart() {
    int y = QRandomGenerator::global()->bounded(50, 100); // mock Wi-Fi signal
    series->append(xValue++, y);
    if(series->count() > 20) series->remove(0);
}

void DashboardTab::setupUI() {
    layout = new QVBoxLayout(this);
    summaryLabel = new QLabel("Real-time Network Overview:", this);
    layout->addWidget(summaryLabel);

    chartView = new QChartView(this);
    layout->addWidget(chartView);
}

void DashboardTab::populateDummyData() {
    QPieSeries *series = new QPieSeries();
    series->append("Wi-Fi Devices", 5);
    series->append("Bluetooth Devices", 3);
    series->append("Network Nodes", 8);

    QChart *chart = new QChart();
    chart->addSeries(series);
    chart->setTitle("Devices Overview");
    chart->legend()->setAlignment(Qt::AlignBottom);

    chartView->setChart(chart);
}
