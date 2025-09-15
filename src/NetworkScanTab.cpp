class NetworkScanTab : public QWidget {
    Q_OBJECT
public:
    NetworkScanTab(QWidget *parent = nullptr);

private:
    QTableView *scanResults;
    QPushButton *startScan;
    QPushButton *exportCSV;

    void setupUI();
    void runScanAsync();

private slots:
    void scanFinished(const QList<ScanResult> &results);
    void exportResults();
};
#include "NetworkScanTab.h"