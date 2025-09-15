#pragma once
#include <QWidget>
#include <QTableWidget>
#include <QPushButton>

class AttackSimTab : public QWidget {
    Q_OBJECT
public:
    AttackSimTab(QWidget* parent=nullptr);
    
private:
    QTableWidget *networkTable;
    QPushButton *simulateBtn;
    void setupUI();
    void populateDummyData();
    void onSimulateClicked();

private slots:
    void simulateAttack();

signals:
    void simulateRequested();
};