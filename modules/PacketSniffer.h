#pragma once
#include <vector>
#include <QString>

struct Packet {
    QString srcIP;
    QString dstIP;
    int size;
};

class PacketSniffer {
public:
    PacketSniffer();
    std::vector<Packet> capture(int maxPackets);

private:
    std::vector<Packet> packets;
    void parsePacketData(const QByteArray& rawData);
    // Platform-specific implementation
    // For Windows, we might use WinPcap or Npcap
};