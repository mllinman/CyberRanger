#include "PluginManager.h"
#include <QDir>
#include <QPluginLoader>
#include <QDebug>

void PluginManager::loadPlugin(const QString &path) {
    QPluginLoader loader(path);
    QObject *plugin = loader.instance();
    if(plugin) {
        IPlugin *iplugin = qobject_cast<IPlugin*>(plugin);
        if(iplugin) {
            loadedPlugins.append(plugin);
            emit pluginLoaded(iplugin->name());
            iplugin->initialize();
        }
    } else {
        qDebug() << "Failed to load plugin:" << loader.errorString();
    }
}

QStringList PluginManager::availablePlugins() const {
    QStringList plugins;
    QDir dir("Plugins");
    for(const QString &file : dir.entryList(QDir::Files)) {
        plugins.append(file);
    }
    return plugins;
}
void PluginManager::unloadPlugin(const QString &name) {
    for(int i = 0; i < loadedPlugins.size(); ++i) {
        IPlugin *iplugin = qobject_cast<IPlugin*>(loadedPlugins[i]);
        if(iplugin && iplugin->name() == name) {
            QPluginLoader loader(loadedPlugins[i]->metaObject()->className());
            if(loader.unload()) {
                emit pluginUnloaded(name);
                loadedPlugins.removeAt(i);
            } else {
                qDebug() << "Failed to unload plugin:" << loader.errorString();
            }
            return;
        }
    }
}