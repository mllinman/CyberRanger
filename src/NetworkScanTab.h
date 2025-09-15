#pragma once
#include <QWidget>
#include <QTableWidget>
#include <QPushButton>
#include <QVBoxLayout>
#include <QThread>
#include <QTableWidgetItem>

struct ScanResult {
    QString ip;
    QString hostname;
    QString ports;
    QString status;
};

class NetworkScanTab : public QWidget {
    Q_OBJECT
public:
    NetworkScanTab(QWidget *parent = nullptr);

private:
    QTableWidget *scanResults;
    QPushButton *startScan;
    QPushButton *exportCSV;
    QVBoxLayout *layout;

    void setupUI();

private slots:
    void runScan();
    void exportResults();
};
