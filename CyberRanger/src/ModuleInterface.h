#ifndef MODULEINTERFACE_H
#define MODULEINTERFACE_H

#include <QString>
#include <QWidget>

class ICyberModule
{
public:
    virtual ~ICyberModule() {}
    virtual QString moduleName() const = 0;
    virtual QWidget* createWidget(QWidget* parent = nullptr) = 0;
    virtual void startScan() = 0;
    virtual void stopScan() = 0;
};

#define ICyberModule_iid "com.cyberranger.ICyberModule"
Q_DECLARE_INTERFACE(ICyberModule, ICyberModule_iid)

#endif // MODULEINTERFACE_H
