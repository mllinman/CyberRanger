#include "ThreatIntelManager.h"
#include <QRandomGenerator>

ThreatIntelManager::ThreatIntelManager(QObject* parent) : QObject(parent) {
    updateTimer = new QTimer(this);
    connect(updateTimer, &QTimer::timeout, this, &ThreatIntelManager::generateThreats);
    updateTimer->start(5000); // every 5 seconds
}

void ThreatIntelManager::generateThreats() {
    threats.clear();
    int threatCount = QRandomGenerator::global()->bounded(1,4);
    for(int i=0;i<threatCount;i++){
        threats.push_back({
            QString("MockThreat_%1").arg(i+1),
            i%2==0?"Network":"Bluetooth",
            QRandomGenerator::global()->bounded(1,6)
        });
    }
    emit threatUpdated(threats);
}

QVector<Threat> ThreatIntelManager::getCurrentThreats() const {
    return threats;
}
void ThreatIntelManager::fetchIndicators() {
    QStringList iocs;
    int count = QRandomGenerator::global()->bounded(3,7);
    for(int i=0;i<count;i++){
        iocs.append(QString("192.168.1.%1").arg(QRandomGenerator::global()->bounded(1,255)));
    }
    emit indicatorsUpdated(iocs);
}