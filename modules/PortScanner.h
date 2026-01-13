#pragma once
#include <vector>
#include <QString>
#include <QStringList>
#include <QObject>
#include <QMap>

struct PortInfo {
    quint16 port;
    QString service;
    bool open;
};

class PortScanner : public QObject {
    Q_OBJECT
public:
    explicit PortScanner(QObject *parent = nullptr);
    QStringList scanPorts(const QString &targetIP, int startPort, int endPort);
    void scanPortsAsync(const QString &targetIP, int startPort, int endPort);
    void stopScan();
    bool isCurrentlyScanning() const { return isScanning; }

signals:
    void scanStarted();
    void scanCompleted(const QStringList &results);
    void scanProgress(int current, int total);
    void scanFailed(const QString &error);

private:
    bool isPortOpen(const QString &host, quint16 port);
    QString getServiceName(quint16 port);
    bool isScanning;
};