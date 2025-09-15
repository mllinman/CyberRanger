#include "LicenseManager.h"

LicenseManager::LicenseManager(QObject *parent)
    : QObject(parent), validLicense(false), licenseType("Free")
{
    // Default free license with basic features
    enabledFeatures << "WiFi Scanning" << "Bluetooth Scanning";
}

bool LicenseManager::isLicenseValid() const
{
    return validLicense;
}

bool LicenseManager::loadLicense(const QString &licenseKey)
{
    this->licenseKey = licenseKey;
    validLicense = validateLicense(licenseKey);
    
    if (validLicense) {
        licenseType = "Professional";
        enabledFeatures.clear();
        enabledFeatures << "WiFi Scanning" << "Bluetooth Scanning" 
                       << "Port Scanning" << "Packet Capture" 
                       << "Exploit Simulation" << "Advanced Reporting";
    }
    
    return validLicense;
}

QString LicenseManager::getLicenseInfo() const
{
    return QString("License Type: %1\nStatus: %2")
           .arg(licenseType)
           .arg(validLicense ? "Valid" : "Invalid");
}

QString LicenseManager::getLicenseType() const
{
    return licenseType;
}

bool LicenseManager::isFeatureEnabled(const QString &feature) const
{
    return enabledFeatures.contains(feature);
}

bool LicenseManager::validateLicense(const QString &key)
{
    // Simple validation - in real implementation this would be more secure
    return !key.isEmpty() && key.length() > 10;
}