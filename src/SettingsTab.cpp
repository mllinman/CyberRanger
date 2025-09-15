#include "SettingsTab.h"
#include <QHBoxLayout>

SettingsTab::SettingsTab(QWidget *parent)
    : QWidget(parent)
{
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
    saveBtn = new QPushButton("Save Settings", this);
    loadBtn = new QPushButton("Load Settings", this);
    
    connect(saveBtn, &QPushButton::clicked, this, &SettingsTab::saveSettings);
    connect(loadBtn, &QPushButton::clicked, this, &SettingsTab::loadSettings);
    
    buttonLayout->addWidget(saveBtn);
    buttonLayout->addWidget(loadBtn);
    layout->addLayout(buttonLayout);
    
    setLayout(layout);
}

void SettingsTab::saveSettings()
{
    // Implementation for saving settings
}

void SettingsTab::loadSettings()
{
    // Implementation for loading settings
}