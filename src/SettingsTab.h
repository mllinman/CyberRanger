#ifndef SETTINGSTAB_H
#define SETTINGSTAB_H

#include <QWidget>
#include <QVBoxLayout>
#include <QFormLayout>
#include <QLineEdit>
#include <QSpinBox>
#include <QCheckBox>
#include <QPushButton>

class SettingsTab : public QWidget
{
    Q_OBJECT

public:
    explicit SettingsTab(QWidget *parent = nullptr);

private slots:
    void saveSettings();
    void loadSettings();

private:
    QLineEdit *interfaceEdit;
    QSpinBox *timeoutSpin;
    QSpinBox *threadsSpin;
    QCheckBox *darkModeCheck;
    QCheckBox *autoUpdateCheck;
    QPushButton *saveBtn;
    QPushButton *loadBtn;
};

#endif // SETTINGSTAB_H