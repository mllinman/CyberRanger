#ifndef PLUGINSTAB_H
#define PLUGINSTAB_H

#include <QWidget>
#include <QVBoxLayout>
#include <QHBoxLayout>
#include <QListWidget>
#include <QPushButton>
#include <QLabel>
#include <QTextEdit>

class PluginsTab : public QWidget
{
    Q_OBJECT

public:
    explicit PluginsTab(QWidget *parent = nullptr);

private slots:
    void loadPlugin();
    void unloadPlugin();
    void refreshPlugins();
    void onPluginSelected();

private:
    QListWidget *pluginList;
    QPushButton *loadBtn;
    QPushButton *unloadBtn;
    QPushButton *refreshBtn;
    QTextEdit *pluginInfo;
    QLabel *statusLabel;
    
    void setupUI();
    void populatePluginList();
};

#endif // PLUGINSTAB_H