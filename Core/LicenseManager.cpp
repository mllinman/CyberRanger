#include "LicenseManager.h"

LicenseManager::LicenseManager(QObject *parent) : QObject(parent) {}

bool LicenseManager::acknowledgeDisclaimer(QWidget *parent)
{
    QMessageBox disclaimer(parent);
    disclaimer.setWindowTitle("CyberRanger Disclaimer");
    disclaimer.setText(
        "CyberRanger is a penetration testing tool intended for ethical use only.\n"
        "By using this software, you agree to test only networks you own or have explicit permission to test.\n\n"
        "Type YES to continue:");
    disclaimer.setStandardButtons(QMessageBox::Ok | QMessageBox::Cancel);

    QLineEdit *input = new QLineEdit(&disclaimer);
    disclaimer.layout()->addWidget(input);

    if(disclaimer.exec() == QMessageBox::Ok && input->text().trimmed() == "YES") {
        return true;
    }
    return false;
}

bool LicenseManager::isAcknowledged() const
{
    return acknowledged;
}

void LicenseManager::showDisclaimerDialog(QWidget *parent)
{
    QMessageBox disclaimer(parent);
    disclaimer.setWindowTitle("CyberRanger Disclaimer");
    disclaimer.setText(
        "CyberRanger is a penetration testing tool intended for ethical use only.\n"
        "By using this software, you agree to test only networks you own or have explicit permission to test.\n\n"
        "Type YES to continue:");
    disclaimer.setStandardButtons(QMessageBox::Ok | QMessageBox::Cancel);

    QLineEdit *input = new QLineEdit(&disclaimer);
    disclaimer.layout()->addWidget(input);

    if(disclaimer.exec() == QMessageBox::Ok && input->text().trimmed() == "YES") {
        acknowledged = true;
    }
}
    else {
        acknowledged = false;
    }