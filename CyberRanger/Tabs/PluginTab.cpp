#include "PluginTab.h"
#include <QVBoxLayout>
#include <QDir>
#include <QPluginLoader>
#include <QMessageBox>

PluginTab::PluginTab(QWidget *parent) : QWidget(parent) {
    QVBoxLayout *layout = new QVBoxLayout(this);
    pluginList = new QListWidget(this);
    loadButton = new QPushButton("Load Plugin", this);
    unloadButton = new QPushButton("Unload Plugin", this);

    layout->addWidget(pluginList);
    layout->addWidget(loadButton);
    layout->addWidget(unloadButton);

    connect(loadButton, &QPushButton::clicked, this, &PluginTab::loadPlugins);
    connect(unloadButton, &QPushButton::clicked, this, &PluginTab::unloadPlugin);

    loadPlugins();
}

void PluginTab::loadPlugins() {
    QDir dir("Plugins");
    foreach(QString file, dir.entryList(QDir::Files)) {
        QPluginLoader loader(dir.absoluteFilePath(file));
        QObject *plugin = loader.instance();
        if(plugin) pluginList->addItem(file);
    }
}

void PluginTab::unloadPlugin() {
    QListWidgetItem *item = pluginList->currentItem();
    if(!item) return;
    QString fileName = item->text();
    QPluginLoader loader("Plugins/" + fileName);
    if(loader.unload()) pluginList->takeItem(pluginList->row(item));
    else QMessageBox::warning(this, "Unload Failed", loader.errorString());
}
