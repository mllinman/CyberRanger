#pragma once
#include <vector>
#include <QString>
#include <QHostAddress>

struct PortInfo {
    quint16 port;
    QString service;
    bool open;
};

struct PortResult {
    int port;
    bool open;
};

class PortScanner {
public:
    PortScanner();
    std::vector<PortResult> scan(const QString& ip, int startPort, int endPort);
};
private:
    bool isPortOpen(const QHostAddress& host, quint16 port);
};
    // Platform-specific implementation
    // For Windows, we might use Winsock