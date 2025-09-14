#include "ModuleLoader.h"
#include <QDebug>

ModuleLoader::ModuleLoader(const QString &pluginDir)
    : m_pluginDir(pluginDir) {}

void ModuleLoader::loadModules() {
    QDir dir(m_pluginDir);
    for (const QString &fileName : dir.entryList(QDir::Files)) {
        QPluginLoader loader(dir.absoluteFilePath(fileName));
        QObject *plugin = loader.instance();
        if (plugin) {
            ICyberModule* module = qobject_cast<ICyberModule*>(plugin);
            if (module) {
                m_modules.append(module);
                qDebug() << "Loaded module:" << module->moduleName();
            }
        }
    }
}
