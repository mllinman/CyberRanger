#ifndef LICENSEMANAGER_H
#define LICENSEMANAGER_H

#include <QObject>
#include <QMessageBox>
#include <QLineEdit>
#include <QWidget>

class LicenseManager : public QObject
{
    Q_OBJECT
public:
    explicit LicenseManager(QObject *parent = nullptr);
    bool acknowledgeDisclaimer(QWidget *parent);
    bool isAcknowledged() const;

private:
    bool acknowledged = false;
    void showDisclaimerDialog(QWidget *parent);
};

#endif // LICENSEMANAGER_H