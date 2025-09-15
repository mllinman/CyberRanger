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
private slots:
    void simulateAttack();
};
    void setupUI();
    void populateDummyData();
    void onSimulateClicked();
signals:
    void simulateRequested();
};