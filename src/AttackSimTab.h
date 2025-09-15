#pragma once
#include <QWidget>
#include <QTableWidget>
#include <QPushButton>

class AttackSimTab : public QWidget {
    Q_OBJECT
public:
    AttackSimTab(QWidget* parent = nullptr);
    
private slots:
    void simulateAttack();
    
private:
    QTableWidget *networkTable;
    QPushButton *simulateBtn;
    void setupUI();
    void populateDummyData();
    
signals:
    void simulateRequested();
};