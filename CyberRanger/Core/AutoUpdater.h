#pragma once
#include <QObject>
#include <QString>

class AutoUpdater : public QObject {
    Q_OBJECT
public:
    AutoUpdater(const QString &updateUrl, QObject *parent = nullptr);
    void checkForUpdates();
signals:
    void updateAvailable(const QString &version, const QString &downloadUrl);
    void noUpdate();
};
