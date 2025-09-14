#ifndef MODULELOADER_H
#define MODULELOADER_H

#include <QString>
#include <QDir>
#include <QPluginLoader>
#include <QVector>
#include "ModuleInterface.h"


class ModuleLoader
{
public:
    ModuleLoader(const QString &pluginDir);
    void loadModules();
    QVector<ICyberModule*> modules() const { return m_modules; }

private:
    QString m_pluginDir;
    QVector<ICyberModule*> m_modules;
};

#endif // MODULELOADER_H

