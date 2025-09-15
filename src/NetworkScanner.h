#ifndef NETWORKSCANNER_H
#define NETWORKSCANNER_H

#include <QObject>
#include <QString>

class NetworkScanner : public QObject
{
    Q_OBJECT

public:
    explicit NetworkScanner(QObject *parent = nullptr);
    
    void startScan();
    void stopScan();
    bool isScanning() const;

signals:
    void scanCompleted();
    void deviceFound(const QString &ip, const QString &hostname);

private:
    bool scanning;
};

#endif // NETWORKSCANNER_H