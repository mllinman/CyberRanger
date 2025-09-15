#ifndef WIFIMODULE_H
#define WIFIMODULE_H

#include <QObject>
#include "ModuleInterface.h"

class WiFiModule : public QObject, public ICyberModule
{
    Q_OBJECT
    Q_PLUGIN_METADATA(IID ICyberModule_iid)
    Q_INTERFACES(ICyberModule)

public:
    WifiModule() {}
    QString moduleName() const override { return "Wi-Fi Scanner"; }
    QWidget* createWidget(QWidget* parent = nullptr) override;
    void startScan() override;
    void stopScan() override;

private:
    bool scanning = false;
};

#endif // WIFIMODULE_H
