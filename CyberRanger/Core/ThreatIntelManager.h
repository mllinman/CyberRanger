// Core/ThreatIntelManager.h
#pragma once
#include <QObject>
#include <QStringList>

class ThreatIntelManager : public QObject {
    Q_OBJECT
public:
    ThreatIntelManager(QObject *parent = nullptr);
    void fetchIndicators();
signals:
    void indicatorsUpdated(const QStringList &iocList);
};
