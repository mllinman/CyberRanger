#ifndef NETWORKMAPPER_H
#define NETWORKMAPPER_H

#include <QObject>
#include <QVector>
#include <QString>

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
    QVector<NetworkDevice> getDevices() const;

signals:
    void deviceFound(const NetworkDevice &device);
    void scanCompleted();

private:
    QVector<NetworkDevice> devices;
    void performScan();
};

#endif // NETWORKMAPPER_H