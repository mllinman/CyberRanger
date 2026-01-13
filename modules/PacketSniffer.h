#pragma once
#include <vector>
#include <QString>
#include <QObject>
#include <QStringList>

// Only include pcap if available
#ifdef HAVE_PCAP
#include <pcap.h>
typedef unsigned char u_char;
#else
typedef unsigned char u_char;
#endif

struct Packet {
    QString srcIP;
    QString dstIP;
    int size;
    QString protocol;
    qint64 timestamp;
};

class PacketSniffer : public QObject {
    Q_OBJECT
public:
    explicit PacketSniffer(QObject *parent = nullptr);
    ~PacketSniffer();
    
    bool startCapture(const QString& interface = "any");
    void stopCapture();
    QStringList scanPackets();
    QStringList scanPackets(int maxPackets);
    QStringList getAvailableInterfaces();
    bool isCurrentlyCapturing() const { return isCapturing; }

signals:
    void packetCaptured(const Packet& packet);
    void captureStarted();
    void captureStopped();
    void captureError(const QString& error);

private:
    std::vector<Packet> packets;
    bool isCapturing;
    QString currentInterface;
    
#ifdef HAVE_PCAP
    pcap_t* pcapHandle;
#else
    void* pcapHandle;
#endif
    
    void parsePacketData(const QByteArray& rawData);
    Packet parsePacket(const u_char* data, int length);
    QStringList generateSimulatedPackets(int count);
};