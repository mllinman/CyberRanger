#ifndef PACKETSNIFFER_TAB_H
#define PACKETSNIFFER_TAB_H

#include <QWidget>
#include <QVBoxLayout>
#include <QTableWidget>
#include <QPushButton>
#include <QLabel>

class PacketSnifferTab : public QWidget
{
    Q_OBJECT

public:
    explicit PacketSnifferTab(QWidget *parent = nullptr);

private slots:
    void startCapture();
    void stopCapture();

private:
    QTableWidget *packetTable;
    QPushButton *startBtn;
    QPushButton *stopBtn;
    QLabel *statusLabel;
    bool capturing;
};

#endif // PACKETSNIFFER_TAB_H