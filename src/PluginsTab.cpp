#include "PluginsTab.h"

PluginsTab::PluginsTab(QWidget *parent)
    : QWidget(parent)
{
    setupUI();
    populatePluginList();
}

void PluginsTab::setupUI()
{
    QVBoxLayout *layout = new QVBoxLayout(this);
    
    // Plugin list
    pluginList = new QListWidget(this);
    connect(pluginList, &QListWidget::itemSelectionChanged, 
            this, &PluginsTab::onPluginSelected);
    layout->addWidget(pluginList);
    
    // Buttons
    QHBoxLayout *buttonLayout = new QHBoxLayout();
    loadBtn = new QPushButton("Load Plugin", this);
    unloadBtn = new QPushButton("Unload Plugin", this);
    refreshBtn = new QPushButton("Refresh", this);
    
    connect(loadBtn, &QPushButton::clicked, this, &PluginsTab::loadPlugin);
    connect(unloadBtn, &QPushButton::clicked, this, &PluginsTab::unloadPlugin);
    connect(refreshBtn, &QPushButton::clicked, this, &PluginsTab::refreshPlugins);
    
    buttonLayout->addWidget(loadBtn);
    buttonLayout->addWidget(unloadBtn);
    buttonLayout->addWidget(refreshBtn);
    buttonLayout->addStretch();
    layout->addLayout(buttonLayout);
    
    // Plugin info
    pluginInfo = new QTextEdit(this);
    pluginInfo->setReadOnly(true);
    pluginInfo->setMaximumHeight(150);
    layout->addWidget(pluginInfo);
    
    statusLabel = new QLabel("Ready", this);
    layout->addWidget(statusLabel);
    
    setLayout(layout);
}

void PluginsTab::populatePluginList()
{
    pluginList->clear();
    pluginList->addItem("Example Plugin - A sample plugin for demonstration");
    pluginList->addItem("Network Tools Plugin - Additional network utilities");
    pluginList->addItem("Security Scanner Plugin - Enhanced security scanning");
}

void PluginsTab::loadPlugin()
{
    auto currentItem = pluginList->currentItem();
    if (currentItem) {
        statusLabel->setText("Loading plugin: " + currentItem->text());
        pluginInfo->append("Loading " + currentItem->text());
    }
}

void PluginsTab::unloadPlugin()
{
    auto currentItem = pluginList->currentItem();
    if (currentItem) {
        statusLabel->setText("Unloading plugin: " + currentItem->text());
        pluginInfo->append("Unloading " + currentItem->text());
    }
}

void PluginsTab::refreshPlugins()
{
    statusLabel->setText("Refreshing plugin list...");
    populatePluginList();
    statusLabel->setText("Plugin list refreshed");
}

void PluginsTab::onPluginSelected()
{
    auto currentItem = pluginList->currentItem();
    if (currentItem) {
        pluginInfo->setText("Plugin: " + currentItem->text() + "\n"
                           "Status: Available\n"
                           "Version: 1.0.0\n"
                           "Description: Sample plugin description");
    }
}