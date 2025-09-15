#ifndef DISCLAIMERWINDOW_H
#define DISCLAIMERWINDOW_H

#include <QDialog>
#include <QPushButton>
#include <QLabel>
#include <QCheckBox>
#include <QVBoxLayout>

class DisclaimerWindow : public QDialog 
{
    Q_OBJECT
public:
    DisclaimerWindow(QWidget* parent = nullptr);
    bool isAcknowledged() const;
    
private slots:
    void onAgreeChanged(int state);
    void onProceedClicked();
    
private:
    QCheckBox* acknowledgeCheck;
    QPushButton* acceptButton;
    QCheckBox* agreeCheck;
    QPushButton* proceedBtn;
    bool acknowledged = false;
};

#endif // DISCLAIMERWINDOW_H