#pragma once
#include <QObject>
#include <QString>

class IPlugin {
public:
    virtual ~IPlugin() {}
    virtual QString name() const = 0;
    virtual void initialize() = 0;
};

#define IPlugin_iid "com.rangereduapp.IPlugin"
Q_DECLARE_INTERFACE(IPlugin, IPlugin_iid)
