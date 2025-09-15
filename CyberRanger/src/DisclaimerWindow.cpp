#include "DisclaimerWindow.h"
#include <QVBoxLayout>
#include <QMessageBox>
#include <QLabel>

DisclaimerWindow::DisclaimerWindow(QWidget* parent)
    : QDialog(parent)
{
    setWindowTitle("Legal Disclaimer - CyberRanger");
    setModal(true);
    resize(400, 200);
    QVBoxLayout* layout = new QVBoxLayout(this);

    QLabel* disclaimerLabel = new QLabel("<b>Legal Disclaimer</b>", this);
    disclaimerLabel->setAlignment(Qt::AlignCenter);
    disclaimerLabel->setWordWrap(true);
    acknowledgeCheck = new QCheckBox("I have read, understood, and agree to the terms above.", this);
    acknowledgeCheck->setChecked(false);
        QLabel *label = new QLabel("⚠ WARNING: CyberRanger is intended for educational and authorized pentesting only.\n"
                               "Unauthorized use on networks you do not own is illegal.\n\n"
                               "Click 'Accept' to continue.", this);
    label->setWordWrap(true);
    layout->addWidget(label);
    layout->addWidget(disclaimerLabel);
    layout->addWidget(acknowledgeCheck);

    QPushButton *acceptBtn = new QPushButton("Accept", this);
    QPushButton *declineBtn = new QPushButton("Decline", this);
    layout->addWidget(acceptBtn);
    layout->addWidget(declineBtn);
    layout->addWidget(acknowledgeCheck);
    setLayout(layout);
    acknowledgeCheck->setChecked(false);
    connect(acknowledgeCheck, &QCheckBox::stateChanged, this, &DisclaimerWindow::onAgreeChanged);
    connect(acceptBtn, &QPushButton::clicked, this, &DisclaimerWindow::onProceedClicked);
    connect(declineBtn, &QPushButton::clicked, this, &QDialog::reject);
}
QMessageBox disclaimer;
disclaimer.setIcon(QMessageBox::Warning);
disclaimer.setWindowTitle("CyberRanger Disclaimer");
disclaimer.setText("You are using this tool for authorized pentesting only. Misuse is illegal. Continue?");
disclaimer.setStandardButtons(QMessageBox::Yes | QMessageBox::No);
if(disclaimer.exec() != QMessageBox::Yes) exit(0);

bool DisclaimerWindow::isAcknowledged() const {
    return acknowledged;
}
private slots:
    void onAgreeChanged(int state);
    void onProceedClicked();