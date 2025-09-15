#include "SettingsWindow.h"
#include <QHBoxLayout>
#include <QDialogButtonBox>

SettingsWindow::SettingsWindow(QWidget *parent)
    : QDialog(parent)
{
    setWindowTitle("Settings");
    setModal(true);
    resize(400, 300);
    
    QVBoxLayout *layout = new QVBoxLayout(this);
    
    QFormLayout *formLayout = new QFormLayout();
    
    interfaceEdit = new QLineEdit("wlan0", this);
    timeoutSpin = new QSpinBox(this);
    timeoutSpin->setRange(1, 300);
    timeoutSpin->setValue(30);
    timeoutSpin->setSuffix(" sec");
    
    threadsSpin = new QSpinBox(this);
    threadsSpin->setRange(1, 100);
    threadsSpin->setValue(10);
    
    darkModeCheck = new QCheckBox("Enable Dark Mode", this);
    darkModeCheck->setChecked(true);
    
    autoUpdateCheck = new QCheckBox("Auto Update", this);
    autoUpdateCheck->setChecked(false);
    
    formLayout->addRow("Network Interface:", interfaceEdit);
    formLayout->addRow("Scan Timeout:", timeoutSpin);
    formLayout->addRow("Thread Count:", threadsSpin);
    formLayout->addRow(darkModeCheck);
    formLayout->addRow(autoUpdateCheck);
    
    layout->addLayout(formLayout);
    
    QHBoxLayout *buttonLayout = new QHBoxLayout();
    saveBtn = new QPushButton("Save", this);
    cancelBtn = new QPushButton("Cancel", this);
    resetBtn = new QPushButton("Reset to Defaults", this);
    
    connect(saveBtn, &QPushButton::clicked, this, &SettingsWindow::saveSettings);
    connect(cancelBtn, &QPushButton::clicked, this, &QDialog::reject);
    connect(resetBtn, &QPushButton::clicked, this, &SettingsWindow::resetDefaults);
    
    buttonLayout->addWidget(resetBtn);
    buttonLayout->addStretch();
    buttonLayout->addWidget(cancelBtn);
    buttonLayout->addWidget(saveBtn);
    layout->addLayout(buttonLayout);
    
    setLayout(layout);
}

void SettingsWindow::saveSettings()
{
    // Implementation for saving settings
    accept();
}

void SettingsWindow::resetDefaults()
{
    interfaceEdit->setText("wlan0");
    timeoutSpin->setValue(30);
    threadsSpin->setValue(10);
    darkModeCheck->setChecked(true);
    autoUpdateCheck->setChecked(false);
}