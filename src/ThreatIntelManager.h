// Core/ThreatIntelManager.h
#pragma once
#include <QObject>
#include <QStringList>
#include <QString>
#include <QVector>
#include <QTimer>
#include <QMap>

struct Threat {
    QString name;
    QString type;
    int severity; // 1=low, 5=critical
};

class ThreatIntelManager : public QObject {
    Q_OBJECT
public:
    ThreatIntelManager(QObject *parent = nullptr);
    QVector<Threat> getCurrentThreats() const;
    void fetchIndicators();
    
signals:
    void threatsUpdated(const QVector<Threat> &threats);
    void indicatorsUpdated(const QStringList &iocList);
    
private slots:
    void generateThreats();
    
private:
    QVector<Threat> threats;
    QTimer *updateTimer;
};
