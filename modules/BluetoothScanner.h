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

signals:
    void deviceDiscovered(const BluetoothDevice &device);
    void scanCompleted();

private slots:
    void scanStep();

private:
    QTimer *scanTimer;
    QVector<BluetoothDevice> devices;
    void performScan();
    void parseScanResults(const QByteArray& rawData);
    // Platform-specific implementation
};

#endif // BLUETOOTHSCANNER_H