#include "NetworkScanner.h"

NetworkScanner::NetworkScanner(QObject *parent)
    : QObject(parent), scanning(false)
{
}

void NetworkScanner::startScan()
{
    scanning = true;
    // Simulate scan completion
    emit scanCompleted();
}

void NetworkScanner::stopScan()
{
    scanning = false;
}

bool NetworkScanner::isScanning() const
{
    return scanning;
}