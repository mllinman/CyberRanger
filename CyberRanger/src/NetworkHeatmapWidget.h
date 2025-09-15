#pragma once
#include <QGraphicsView>
#include <QGraphicsEllipseItem>
#include <QMap>
#include "WiFiScanner.h"
#include "BluetoothScanner.h"

class NetworkHeatmapWidget : public QGraphicsView {
    Q_OBJECT
public:
    explicit NetworkHeatmapWidget(QWidget *parent = nullptr);
    void addWiFiNetwork(const WiFiNetwork &network);
    void addBluetoothDevice(const BluetoothDevice &device);
    void updateSignals();

private:
    QGraphicsScene *scene;
    QMap<QString, QGraphicsEllipseItem*> wifiNodes;
    QMap<QString, QGraphicsEllipseItem*> btNodes;
};
    WiFiScanner *wifiScanner;
    BluetoothScanner *btScanner;
    QTimer *updateTimer;