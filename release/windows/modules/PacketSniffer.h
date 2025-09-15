#pragma once
#include <vector>
#include <QString>
#include <QObject>

struct Packet {
    QString srcIP;
    QString dstIP;
    int size;
};

class PacketSniffer : public QObject {
    Q_OBJECT
public:
    explicit PacketSniffer(QObject *parent = nullptr);
    QStringList scanPackets();

private:
    std::vector<Packet> packets;
    void parsePacketData(const QByteArray& rawData);
};