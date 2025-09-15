#include "LogsTab.h"
#include <QDateTime>

LogsTab::LogsTab(QWidget *parent) : QWidget(parent) {
    QVBoxLayout *layout = new QVBoxLayout(this);
    QLabel *label = new QLabel("Application Logs:");
    logViewer = new QTextEdit();
    logViewer->setReadOnly(true);

    clearBtn = new QPushButton("Clear Logs");
    connect(clearBtn, &QPushButton::clicked, this, &LogsTab::clearLogs);
    layout->addWidget(clearBtn);

    layout->addWidget(logViewer);
    layout->addWidget(clearBtn);
    setLayout(layout);

    connect(clearBtn, &QPushButton::clicked, this, &LogsTab::clearLogs);
}
void LogsTab::appendLog(const QString &log) {
    logViewer->append(log);
}

void LogsTab::clearLogs() {
    logViewer->clear();
}
void LogsTab::addLog(const QString &message, const QString &level) {
    QString timestamp = QDateTime::currentDateTime().toString("yyyy-MM-dd hh:mm:ss");
    QString logLine = QString("[%1] [%2] %3").arg(timestamp, level, message);
    logViewer->append(logLine);
}
