// Core/NetworkAnalyzer.h
#pragma once
#include <QObject>
#include <QString>
#include <vector>

struct Network {
    QString ssid;
    int signalStrength;
    bool secured;
};

class NetworkAnalyzer : public QObject {
    Q_OBJECT
public:
    NetworkAnalyzer(QObject *parent = nullptr);
    void analyzeNetwork();
    void startAnalysis();
    void stopAnalysis();
    
signals:
    void analysisCompleted();
    
private:
    bool analyzing;
};
