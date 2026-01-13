#ifndef BLUETOOTHSCANNER_H
#define BLUETOOTHSCANNER_H

#include <QObject>
#include <QVector>
#include <QString>
#include <QTimer>

struct BluetoothDevice {
    QString name;
    QString address;
    QString deviceClass;
    int rssi;
    bool paired;
};

class BluetoothScanner : public QObject
{
    Q_OBJECT
public:
    explicit BluetoothScanner(QObject *parent = nullptr);

    void startScan();
    void stopScan();
    QVector<BluetoothDevice> getDevices() const;
    bool isCurrentlyScanning() const { return isScanning; }

signals:
    void deviceDiscovered(const BluetoothDevice &device);
    void scanCompleted();
    void scanStarted();
    void scanStopped();

private slots:
    void scanStep();

private:
    QTimer *scanTimer;
    QVector<BluetoothDevice> devices;
    bool isScanning;
    
    void performScan();
    void performLinuxScan();
    void performWindowsScan();
    void performSimulatedScan();
    QString classifyDevice(const QString& name);
};

#endif // BLUETOOTHSCANNER_H