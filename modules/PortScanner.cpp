#include "PortScanner.h"
#include <winsock2.h>
#include <ws2tcpip.h>
#include <QDebug>

PortScanner::PortScanner() {
    // Initialize Winsock
    WSADATA wsaData;
    WSAStartup(MAKEWORD(2,2), &wsaData);
}

std::vector<PortResult> PortScanner::scan(const QString& ip, int startPort, int endPort) {
    std::vector<PortResult> results;
    for(int port=startPort; port<=endPort; ++port) {
        SOCKET sock = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
        sockaddr_in addr;
        addr.sin_family = AF_INET;
        addr.sin_port = htons(port);
        inet_pton(AF_INET, ip.toStdString().c_str(), &addr.sin_addr);

        int res = connect(sock, (sockaddr*)&addr, sizeof(addr));
        results.push_back({port, res == 0});
        closesocket(sock);
    }
    return results;
}

bool PortScanner::isPortOpen(const QHostAddress& host, quint16 port) {
    SOCKET sock = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
    sockaddr_in addr;
    addr.sin_family = AF_INET;
    addr.sin_port = htons(port);
    inet_pton(AF_INET, host.toString().toStdString().c_str(), &addr.sin_addr);

    int res = connect(sock, (sockaddr*)&addr, sizeof(addr));
    closesocket(sock);
    return res == 0;
}