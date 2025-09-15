#include "PluginManager.h"
#include <QPluginLoader>
#include <QDir>
#include <QDebug>

PluginManager::PluginManager(QObject *parent) : QObject(parent)
{
}

void PluginManager::loadPlugin(const QString &filePath)
{
    QPluginLoader loader(filePath);
    QObject *plugin = loader.instance();
    if (plugin) {
        // Store the plugin without trying to cast to IPlugin (which doesn't exist)
        plugins[filePath] = plugin;
        emit pluginLoaded(filePath);
    }
}

QStringList PluginManager::availablePlugins() const
{
    return plugins.keys();
}

void PluginManager::unloadPlugin(const QString &name)
{
    if (plugins.contains(name)) {
        plugins.remove(name);
        emit pluginUnloaded(name);
    }
}

void PluginManager::discoverPlugins()
{
    // Scan for plugins in common directories
    QDir pluginDir("plugins");
    if (pluginDir.exists()) {
        // Implementation for discovering plugins
    }
}

void PluginManager::registerPluginTab(QWidget *tab, const QString &name)
{
    // Implementation for registering plugin tabs
}

void PluginManager::unregisterPluginTab(const QString &name)
{
    // Implementation for unregistering plugin tabs
}

QTabWidget* PluginManager::getPluginTabWidget()
{
    // Return the main tab widget where plugins should be added
    return nullptr; // placeholder
}