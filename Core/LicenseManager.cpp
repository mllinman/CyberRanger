#include "LicenseManager.h"
#include <QDialog>
#include <QVBoxLayout>
#include <QHBoxLayout>
#include <QLineEdit>
#include <QPushButton>
#include <QLabel>

LicenseManager::LicenseManager(QObject *parent) : QObject(parent), acknowledged(false)
{
}

bool LicenseManager::acknowledgeDisclaimer(QWidget *parent)
{
    QDialog disclaimer(parent);
    disclaimer.setWindowTitle("CyberRanger Disclaimer");
    disclaimer.setModal(true);
    
    QVBoxLayout *layout = new QVBoxLayout(&disclaimer);
    
    QLabel *label = new QLabel(
        "CyberRanger is a penetration testing tool intended for ethical use only.\n"
        "By using this software, you agree to test only networks you own or have explicit permission to test.\n\n"
        "Type YES to continue:", &disclaimer);
    layout->addWidget(label);
    
    QLineEdit *input = new QLineEdit(&disclaimer);
    input->setPlaceholderText("Type YES to acknowledge");
    layout->addWidget(input);
    
    QPushButton *okBtn = new QPushButton("I Acknowledge", &disclaimer);
    QPushButton *cancelBtn = new QPushButton("Cancel", &disclaimer);
    
    QHBoxLayout *buttonLayout = new QHBoxLayout();
    buttonLayout->addWidget(cancelBtn);
    buttonLayout->addWidget(okBtn);
    layout->addLayout(buttonLayout);
    
    connect(okBtn, &QPushButton::clicked, [&]() {
        if (input->text().trimmed() == "YES") {
            acknowledged = true;
            disclaimer.accept();
        }
    });
    connect(cancelBtn, &QPushButton::clicked, &disclaimer, &QDialog::reject);
    
    return disclaimer.exec() == QDialog::Accepted && acknowledged;
}

bool LicenseManager::isAcknowledged() const
{
    return acknowledged;
}

void LicenseManager::showDisclaimerDialog(QWidget *parent)
{
    acknowledgeDisclaimer(parent);
}