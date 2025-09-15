#pragma once
#include <vector>
#include <QString>
#include <QStringList>
#include <QObject>

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

private:
    bool isPortOpen(const QString &host, quint16 port);
};