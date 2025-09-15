#include "DashboardTab.h"
#include <QtCharts>
#include <QVBoxLayout>
#include <QRandomGenerator>

DashboardTab::DashboardTab(QWidget* parent) : QWidget(parent), xValue(0) {
    series = new QLineSeries();
    QChart *chart = new QChart();
    chartView = new QChartView(chart);
    chartView->setRenderHint(QPainter::Antialiasing);
    chart->addSeries(series);
    chart->createDefaultAxes();
    chart->setTitle("Live Wi-Fi Signal Strength");
        chart->axisX()->setTitleText("Time");
    chart->axisY()->setTitleText("Signal Strength (dBm)");
    chart->axisY()->setRange(0, 100);
    chart->legend()->hide();

    // Initialize multiple metrics
    QStringList metricNames = {"Wi-Fi Signal", "Bluetooth Devices", "CPU Usage", "RAM Usage"};
    for(const QString &name : metricNames){
        QLineSeries *series = new QLineSeries();
        series->setName(name);
        chart->addSeries(series);
        metrics[name] = {series, name};
    }
    chart->createDefaultAxes();
    chart->setTitle("Live System Metrics");

    QVBoxLayout *layout = new QVBoxLayout(this);
    layout->addWidget(chartView);
    setLayout(layout);

    timer = new QTimer(this);
    connect(timer, &QTimer::timeout, this, &DashboardTab::updateMetrics);
    timer->start(1000);
}
QWidget* dashboard = new QWidget();
QVBoxLayout* layout = new QVBoxLayout(dashboard);
layout->addWidget(new QLabel("Total Devices Found: 12"));
layout->addWidget(new QLabel("Critical Alerts: 1"));
layout->addWidget(new QLabel("Wi-Fi Networks: 5"));
tabWidget->addTab(dashboard, "Dashboard");

void DashboardTab::updateMetrics() {
    int wifi = QRandomGenerator::global()->bounded(30,100);
    int bt = QRandomGenerator::global()->bounded(0,5);
    int cpu = QRandomGenerator::global()->bounded(10,90);
    int ram = QRandomGenerator::global()->bounded(20,90);

    QMap<QString,int> newValues = {{"Wi-Fi Signal", wifi}, {"Bluetooth Devices", bt}, {"CPU Usage", cpu}, {"RAM Usage", ram}};
    
    for(auto it = metrics.begin(); it != metrics.end(); ++it){
        it.value().series->append(xValue, newValues[it.key()]);
        if(it.value().series->count() > 30) it.value().series->remove(0);
    }
    xValue++;
}
    // Mock data update for each metric
    for(auto &metric : metrics){
        int y = QRandomGenerator::global()->bounded(50, 100); // mock data
        metric.series->append(xValue, y);
        if(metric.series->count() > 20) metric.series->remove(0);
    }
    timer = new QTimer(this);
    connect(timer, &QTimer::timeout, this, &DashboardTab::updateChart);
    timer->start(1000);
    xValue++;


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
    chart->legend()->hide();
    chartView->setChart(chart);
    chartView->setRenderHint(QPainter::Antialiasing);
}
