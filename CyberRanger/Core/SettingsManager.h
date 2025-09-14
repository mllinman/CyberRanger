#pragma once
#include <QObject>
#include <QSettings>
#include <QString>

class SettingsManager : public QObject {
    Q_OBJECT
public:
    SettingsManager(QObject *parent = nullptr);
    void setValue(const QString &key, const QVariant &value);
    QVariant value(const QString &key, const QVariant &defaultValue = QVariant());
    void save();
};
