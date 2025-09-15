#pragma once
#include <QWidget>
#include <QTableView>
#include <QPushButton>
#include <QVBoxLayout>
#include <QThread>
#include <vector>

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
    QTableView *scanResults;
    QPushButton *startScan;
    QPushButton *exportCSV;
    QVBoxLayout *layout;

    void setupUI();
    void runScanAsync();

private slots:
    void scanFinished(const std::vector<ScanResult> &results);
    void exportResults();
};
