#ifndef WIFISCANNER_H
#define WIFISCANNER_H

#include <QObject>
#include <QStringList>
#include <QString>
#include <vector>
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
    QVector<WiFiNetwork> getNetworks() const { return QVector<WiFiNetwork>::fromStdVector(networks); }
    QStringList scanNetworks(); // Returns list of SSIDs
    std::vector<WiFiNetwork> scan(); // Returns detailed info
signals:
    void networkDiscovered(const WiFiNetwork &network);
    void scanCompleted();
    void scanCompleted(const std::vector<WiFiNetwork>& networks);
    void scanFailed(const QString& errorString);

private slots:
    void scanStep();
private:
    QTimer *scanTimer;
    QVector<WiFiNetwork> networks;
    void performScan();
    std::vector<WiFiNetwork> networks;
    void parseScanResults(const QByteArray& rawData);
    // Platform-specific implementation
    void startScan();
};

#endif // WIFISCANNER_H
    // Platform-specific implementation
