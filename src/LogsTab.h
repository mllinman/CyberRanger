#pragma once
#include <QWidget>
#include <QTextEdit>
#include <QVBoxLayout>
#include <QLabel>
#include <QPushButton>

class LogsTab : public QWidget {
    Q_OBJECT
public:
    LogsTab(QWidget *parent = nullptr);

    void appendLog(const QString &log);
private:
    QTextEdit *logViewer;
    void addLog(const QString &log);
    QPushButton *clearBtn;

private slots:
    void clearLogs();
};
