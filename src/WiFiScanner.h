#ifndef WIFISCANNER_H
#define WIFISCANNER_H

#include <QObject>
#include <QString>
#include <QTimer>

struct WiFiNetwork {
    QString ssid;
    QString bssid;
    int channel;
    int signal;
    QString security;
    bool isConnected;
};

class WiFiScanner : public QObject
{
    Q_OBJECT

public:
    explicit WiFiScanner(QObject *parent = nullptr);
    
    void startScan();
    void stopScan();
    bool isScanning() const;

signals:
    void networkDiscovered(const WiFiNetwork &network);
    void signalUpdated(const WiFiNetwork &network);
    void scanCompleted();

private slots:
    void performScan();

private:
    QTimer *scanTimer;
    bool scanning;
};

#endif // WIFISCANNER_H