#pragma once
#include "../../Core/IPlugin.h"
#include <QObject>

class ExamplePlugin : public QObject, public IPlugin {
    Q_OBJECT
    Q_PLUGIN_METADATA(IID IPlugin_iid)
    Q_INTERFACES(IPlugin)
public:
    QString name() const override { return "Example Plugin"; }
    void initialize() override { qDebug("Example Plugin initialized!"); }
};