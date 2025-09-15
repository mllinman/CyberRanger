#include "SettingsManager.h"

SettingsManager::SettingsManager(QObject *parent)
    : QObject(parent) {}

void SettingsManager::setValue(const QString &key, const QVariant &value) {
    QSettings settings("RangerEdu", "RangerEduApp");
    settings.setValue(key, value);
}

QVariant SettingsManager::value(const QString &key, const QVariant &defaultValue) {
    QSettings settings("RangerEdu", "RangerEduApp");
    return settings.value(key, defaultValue);
}

void SettingsManager::save() {
    QSettings settings("RangerEdu", "RangerEduApp");
    settings.sync();
}
