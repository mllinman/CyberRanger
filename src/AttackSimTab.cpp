#include "AttackSimTab.h"
#include <QVBoxLayout>
#include <QRandomGenerator>
#include <QMessageBox>

AttackSimTab::AttackSimTab(QWidget* parent) : QWidget(parent) {
    networkTable = new QTableWidget(0,3,this);
    networkTable->setHorizontalHeaderLabels({"SSID", "Encryption", "Status"});
    simulateBtn = new QPushButton("Simulate WPA Handshake", this);

    QVBoxLayout *layout = new QVBoxLayout(this);
    layout->addWidget(networkTable);
    layout->addWidget(simulateBtn);
    setLayout(layout);

    connect(simulateBtn, &QPushButton::clicked, this, &AttackSimTab::simulateAttack);

    // populate fake networks
    int nets = QRandomGenerator::global()->bounded(3,6);
    for(int i=0;i<nets;i++){
        networkTable->insertRow(i);
        networkTable->setItem(i,0,new QTableWidgetItem(QString("DemoNet_%1").arg(i+1)));
        networkTable->setItem(i,1,new QTableWidgetItem("WPA2"));
        networkTable->setItem(i,2,new QTableWidgetItem("Secure"));
    }
}

void AttackSimTab::simulateAttack() {
    int row = QRandomGenerator::global()->bounded(0, networkTable->rowCount());
    networkTable->item(row,2)->setText("Handshake Captured");
    QMessageBox::information(this,"Simulation","Simulated WPA handshake captured on "+networkTable->item(row,0)->text());
}
    void setupUI();
    void populateDummyData();
    void onSimulateClicked();