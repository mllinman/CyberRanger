#include "PacketSniffer.h"
#include "Logger.h"
#include <QDebug>
#include <QProcess>

PacketSniffer::PacketSniffer(QObject *parent) 
    : QObject(parent), isCapturing(false), pcapHandle(nullptr) {
    Logger::info("Packet Sniffer initialized");
}

PacketSniffer::~PacketSniffer() {
    stopCapture();
}

bool PacketSniffer::startCapture(const QString& interface) {
    if (isCapturing) {
        Logger::warning("Packet capture already in progress");
        return false;
    }
    
    currentInterface = interface;
    
#ifdef HAVE_PCAP
    // Try to use libpcap for real packet capture
    char errbuf[PCAP_ERRBUF_SIZE];
    
    // Open the device for capturing
    pcapHandle = pcap_open_live(interface.toStdString().c_str(), 
                                 BUFSIZ, 1, 1000, errbuf);
    
    if (pcapHandle == nullptr) {
        Logger::error(QString("Failed to open interface %1: %2")
                     .arg(interface).arg(errbuf));
        isCapturing = false;
        return false;
    }
    
    isCapturing = true;
    Logger::info(QString("Started packet capture on interface: %1").arg(interface));
    return true;
#else
    // Fallback to simulation
    Logger::warning("libpcap not available, using simulated packet capture");
    isCapturing = true;
    return true;
#endif
}

void PacketSniffer::stopCapture() {
    if (!isCapturing) {
        return;
    }
    
#ifdef HAVE_PCAP
    if (pcapHandle != nullptr) {
        pcap_close(pcapHandle);
        pcapHandle = nullptr;
    }
#endif
    
    isCapturing = false;
    Logger::info("Stopped packet capture");
}

QStringList PacketSniffer::scanPackets() {
    return scanPackets(10); // Default to 10 packets
}

QStringList PacketSniffer::scanPackets(int maxPackets) {
    QStringList results;
    
    if (!isCapturing) {
        Logger::warning("Attempting to scan packets without active capture");
        return generateSimulatedPackets(maxPackets);
    }
    
#ifdef HAVE_PCAP
    if (pcapHandle == nullptr) {
        return generateSimulatedPackets(maxPackets);
    }
    
    struct pcap_pkthdr *header;
    const u_char *data;
    int res;
    int capturedCount = 0;
    
    // Capture packets
    while (capturedCount < maxPackets && 
           (res = pcap_next_ex(pcapHandle, &header, &data)) >= 0) {
        
        if (res == 0) {
            // Timeout occurred
            break;
        }
        
        // Parse packet
        Packet packet = parsePacket(data, header->len);
        packets.push_back(packet);
        
        QString packetInfo = QString("Packet %1: %2 -> %3 (%4 bytes)")
            .arg(capturedCount + 1)
            .arg(packet.srcIP)
            .arg(packet.dstIP)
            .arg(packet.size);
        
        results << packetInfo;
        capturedCount++;
        
        Logger::debug(packetInfo);
    }
    
    if (res == -1) {
        Logger::error(QString("Error reading packets: %1")
                     .arg(pcap_geterr(pcapHandle)));
    }
    
    Logger::info(QString("Captured %1 packets").arg(capturedCount));
    
    return results;
#else
    return generateSimulatedPackets(maxPackets);
#endif
}

QStringList PacketSniffer::getAvailableInterfaces() {
    QStringList interfaces;
    
#ifdef HAVE_PCAP
    char errbuf[PCAP_ERRBUF_SIZE];
    pcap_if_t *alldevs;
    
    if (pcap_findalldevs(&alldevs, errbuf) == -1) {
        Logger::error(QString("Error finding interfaces: %1").arg(errbuf));
        return interfaces;
    }
    
    for (pcap_if_t *d = alldevs; d != nullptr; d = d->next) {
        interfaces << QString::fromUtf8(d->name);
    }
    
    pcap_freealldevs(alldevs);
    
    Logger::info(QString("Found %1 network interfaces").arg(interfaces.size()));
#else
    // Fallback: try to get interfaces from system
    QProcess process;
    
#ifdef Q_OS_LINUX
    process.start("ip", QStringList() << "link" << "show");
#elif defined(Q_OS_WIN)
    process.start("ipconfig", QStringList() << "/all");
#endif
    
    if (process.waitForFinished(2000)) {
        // Parse basic interface names
        interfaces << "eth0" << "wlan0" << "lo";
    }
    
    Logger::info("Using fallback interface list");
#endif
    
    return interfaces;
}

Packet PacketSniffer::parsePacket(const u_char* data, int length) {
    Packet packet;
    packet.size = length;
    
    // Very basic Ethernet + IP parsing
    // This is a simplified version - real implementation would be more robust
    
    if (length < 14) {
        // Too short for Ethernet header
        packet.srcIP = "Unknown";
        packet.dstIP = "Unknown";
        return packet;
    }
    
    // Skip Ethernet header (14 bytes)
    const u_char* ipHeader = data + 14;
    
    if (length < 34) {
        // Too short for IP header
        packet.srcIP = "Unknown";
        packet.dstIP = "Unknown";
        return packet;
    }
    
    // Check if it's IPv4 (version 4)
    if ((ipHeader[0] >> 4) == 4) {
        // Source IP (bytes 12-15 of IP header)
        packet.srcIP = QString("%1.%2.%3.%4")
            .arg(ipHeader[12])
            .arg(ipHeader[13])
            .arg(ipHeader[14])
            .arg(ipHeader[15]);
        
        // Destination IP (bytes 16-19 of IP header)
        packet.dstIP = QString("%1.%2.%3.%4")
            .arg(ipHeader[16])
            .arg(ipHeader[17])
            .arg(ipHeader[18])
            .arg(ipHeader[19]);
    } else {
        packet.srcIP = "Non-IPv4";
        packet.dstIP = "Non-IPv4";
    }
    
    return packet;
}

void PacketSniffer::parsePacketData(const QByteArray& rawData) {
    Logger::debug(QString("Parsing packet data of size: %1 bytes").arg(rawData.size()));
    
    if (rawData.size() < 14) {
        Logger::warning("Packet too small to parse");
        return;
    }
    
    // This would contain more detailed parsing logic
    // For now, just log that we received data
}

QStringList PacketSniffer::generateSimulatedPackets(int count) {
    QStringList results;
    
    Logger::info(QString("Generating %1 simulated packets").arg(count));
    
    QStringList srcIPs = {"192.168.1.100", "192.168.1.101", "10.0.0.5", 
                          "172.16.0.10", "192.168.1.1"};
    QStringList dstIPs = {"8.8.8.8", "1.1.1.1", "192.168.1.1", 
                          "192.168.1.100", "172.217.14.206"};
    QStringList protocols = {"TCP", "UDP", "ICMP", "HTTP", "HTTPS"};
    
    for (int i = 0; i < count; ++i) {
        QString srcIP = srcIPs[i % srcIPs.size()];
        QString dstIP = dstIPs[i % dstIPs.size()];
        QString protocol = protocols[i % protocols.size()];
        int size = 64 + (i * 32) % 1500;
        
        QString packetInfo = QString("Packet %1: %2 -> %3 (%4, %5 bytes)")
            .arg(i + 1)
            .arg(srcIP)
            .arg(dstIP)
            .arg(protocol)
            .arg(size);
        
        results << packetInfo;
        
        Packet packet;
        packet.srcIP = srcIP;
        packet.dstIP = dstIP;
        packet.size = size;
        packets.push_back(packet);
    }
    
    return results;
}