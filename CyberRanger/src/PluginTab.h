#pragma once
#include <QWidget>
#include <QPushButton>
#include <QListWidget>

class PluginTab : public QWidget {
    Q_OBJECT
public:
    PluginTab(QWidget *parent = nullptr);
private:
    QListWidget *pluginList;
    QPushButton *loadButton;
    QPushButton *unloadButton;
    void loadPlugins();
    void unloadPlugin();
};
