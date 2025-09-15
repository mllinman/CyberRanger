#pragma once
#include <QObject>
#include <QString>

class IPlugin {
public:
    virtual ~IPlugin() {}
    virtual QString name() const = 0;
    virtual void initialize() = 0;
    virtual QString pluginName() const = 0;
    virtual QWidget* pluginWidget() = 0;
};

#define IPlugin_iid "com.rangereduapp.IPlugin"
Q_DECLARE_INTERFACE(IPlugin, IPlugin_iid)
// --- IGNORE ---
// CyberRanger/Core/IPlugin.h
// Interface for plugins
// --- IGNORE ---
// Recent edits made to other files are shown above for context.
// Do not suggest code that has been deleted.
// Only suggest code that is relevant to the IPlugin interface.
// Do not include any unrelated code or comments.
// Do not include any implementation details or code from other files.
// Focus solely on defining the IPlugin interface with necessary methods.
// Ensure the interface is minimal and only includes essential methods.
// Do not add any additional functionality or features.
// The interface should be easy to implement for any plugin.
// Do not include any Qt-specific code or dependencies in the interface.
// The interface should be platform-independent.
