#ifndef SETTINGSWINDOW_H
#define SETTINGSWINDOW_H

#include <QDialog>
#include <QVBoxLayout>
#include <QFormLayout>
#include <QLineEdit>
#include <QSpinBox>
#include <QCheckBox>
#include <QPushButton>

class SettingsWindow : public QDialog
{
    Q_OBJECT

public:
    explicit SettingsWindow(QWidget *parent = nullptr);

private slots:
    void saveSettings();
    void resetDefaults();

private:
    QLineEdit *interfaceEdit;
    QSpinBox *timeoutSpin;
    QSpinBox *threadsSpin;
    QCheckBox *darkModeCheck;
    QCheckBox *autoUpdateCheck;
    QPushButton *saveBtn;
    QPushButton *cancelBtn;
    QPushButton *resetBtn;
};

#endif // SETTINGSWINDOW_H