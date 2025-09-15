#ifndef LICENSEMANAGER_H
#define LICENSEMANAGER_H

#include <QObject>
#include <QString>

class LicenseManager : public QObject
{
    Q_OBJECT

public:
    explicit LicenseManager(QObject *parent = nullptr);
    
    bool isLicenseValid() const;
    bool loadLicense(const QString &licenseKey);
    QString getLicenseInfo() const;
    QString getLicenseType() const;
    bool isFeatureEnabled(const QString &feature) const;

private:
    QString licenseKey;
    QString licenseType;
    bool validLicense;
    QStringList enabledFeatures;
    
    bool validateLicense(const QString &key);
};

#endif // LICENSEMANAGER_H