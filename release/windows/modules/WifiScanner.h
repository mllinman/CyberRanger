#ifndef WIFISCANNER_H
#define WIFISCANNER_H

#include <QObject>
#include <QStringList>
#include <QString>
#include <QVector>
#include <QTimer>

struct WiFiNetwork 
{
    QString ssid;
    QString bssid;
    int channel;
    int signalStrength;
    QString encryption;
    bool hidden;
};

class WiFiScanner : public QObject
{
    Q_OBJECT
public:
    explicit WiFiScanner(QObject *parent = nullptr);

    void startScan();
    void stopScan();
    QVector<WiFiNetwork> getNetworks() const;
    QStringList scanNetworks(); // Returns list of SSIDs
    
signals:
    void networkDiscovered(const WiFiNetwork &network);
    void scanCompleted();
    void scanFailed(const QString& errorString);

private slots:
    void scanStep();
    
private:
    QTimer *scanTimer;
    QVector<WiFiNetwork> networks;
    void performScan();
};

#endif // WIFISCANNER_H
