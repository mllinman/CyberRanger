#ifndef NETWORKMAPPER_H
#define NETWORKMAPPER_H

#include <QObject>
#include <QVector>
#include <QString>
#include <QTimer>

struct NetworkDevice {
    QString ip;
    QString mac;
    QString hostName;
    QString os;
};

class NetworkMapper : public QObject
{
    Q_OBJECT
public:
    explicit NetworkMapper(QObject *parent = nullptr);

    void scanNetwork();
    void scanNetwork(const QString &subnet);
    void stopScan();
    QVector<NetworkDevice> getDevices() const;
    bool isCurrentlyScanning() const { return isScanning; }

signals:
    void deviceFound(const NetworkDevice &device);
    void scanCompleted();
    void scanStarted();
    void scanFailed(const QString &error);

private:
    QVector<NetworkDevice> devices;
    bool isScanning;
    QString currentSubnet;
    
    void performScan();
    void performLinuxScan();
    void performWindowsScan();
    void performSimulatedScan();
    void parseArpOutput(const QString& output);
    QString resolveHostname(const QString& ip);
    QString guessOS(const QString& mac, const QString& hostname);
};

#endif // NETWORKMAPPER_H