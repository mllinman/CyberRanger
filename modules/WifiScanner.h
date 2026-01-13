#ifndef WIFISCANNER_H
#define WIFISCANNER_H

#include <QObject>
#include <QStringList>
#include <QString>
#include <QVector>
#include <QTimer>
#include <QProcess>

struct WiFiNetwork 
{
    QString ssid;
    QString bssid;
    int channel;
    int signalStrength;
    QString encryption;
    bool hidden;
};

class WiFiScanner : public QObject
{
    Q_OBJECT
public:
    explicit WiFiScanner(QObject *parent = nullptr);

    void startScan();
    void stopScan();
    QVector<WiFiNetwork> getNetworks() const;
    QStringList scanNetworks(); // Returns list of SSIDs
    bool isCurrentlyScanning() const { return isScanning; }
    
    // Configuration constants
    static constexpr int MAX_SIMULATED_NETWORKS = 10;
    
signals:
    void networkDiscovered(const WiFiNetwork &network);
    void scanCompleted();
    void scanFailed(const QString& errorString);
    void scanStarted();
    void scanStopped();

private slots:
    void scanStep();
    
private:
    QTimer *scanTimer;
    QVector<WiFiNetwork> networks;
    bool isScanning;
    
    void performScan();
    void performLinuxScan();
    void performWindowsScan();
    void performSimulatedScan();
    QString generateRandomMAC();
};

#endif // WIFISCANNER_H
