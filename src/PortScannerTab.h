#ifndef PORTSCANNERTAB_H
#define PORTSCANNERTAB_H

#include <QWidget>
#include <QVBoxLayout>
#include <QLineEdit>
#include <QPushButton>
#include <QTableWidget>
#include <QLabel>

class PortScannerTab : public QWidget
{
    Q_OBJECT

public:
    explicit PortScannerTab(QWidget *parent = nullptr);

private slots:
    void startScan();
    void stopScan();

private:
    QLineEdit *targetEdit;
    QLineEdit *portRangeEdit;
    QPushButton *scanBtn;
    QPushButton *stopBtn;
    QTableWidget *resultsTable;
    QLabel *statusLabel;
    bool scanning;
};

#endif // PORTSCANNERTAB_H