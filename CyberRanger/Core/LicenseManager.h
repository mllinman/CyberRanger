#ifndef LICENSEMANAGER_H
#define LICENSEMANAGER_H

#include <QObject>
#include <QMessageBox>

class LicenseManager : public QObject
{
    Q_OBJECT
public:
    explicit LicenseManager(QObject *parent = nullptr);

    bool acknowledgeDisclaimer(QWidget *parent);

};

#endif // LICENSEMANAGER_H
    bool isAcknowledged() const;
private:
    bool acknowledged;
    void showDisclaimerDialog(QWidget *parent);
};