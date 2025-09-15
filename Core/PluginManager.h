// Core/PluginManager.h
#pragma once
#include <QObject>
#include <QString>
#include <QMap>
#include <QTabWidget>

class PluginManager : public QObject {
    Q_OBJECT
public:
    PluginManager(QObject *parent = nullptr);
    void loadPlugin(const QString &filePath);
    void unloadPlugin(const QString &name);
    QStringList availablePlugins() const;
    
signals:
    void pluginLoaded(const QString &name);
    void pluginUnloaded(const QString &name);
    
private:
    QMap<QString, QObject*> plugins;
    QStringList pluginPaths;
    void discoverPlugins();
    void registerPluginTab(QWidget *tab, const QString &name);
    void unregisterPluginTab(const QString &name);
    QTabWidget* getPluginTabWidget();
};
