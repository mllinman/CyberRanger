#pragma once
#include <QString>
#include <QMutex>

enum class LogLevel {
    DEBUG,
    INFO,
    WARNING,
    ERROR,
    CRITICAL
};

class Logger {
public:
    static void log(const QString& message, LogLevel level = LogLevel::INFO);
    static void debug(const QString& message);
    static void info(const QString& message);
    static void warning(const QString& message);
    static void error(const QString& message);
    static void critical(const QString& message);
    
    static void setLogLevel(LogLevel level);
    static void setLogToConsole(bool enable);
    static void setLogToFile(bool enable);
    static void setLogFile(const QString& filename);
    static void rotateLogFile();
    
private:
    static LogLevel currentLogLevel;
    static bool logToConsole;
    static bool logToFile;
    static QString logFilename;
    static QMutex logMutex;
    static QString logLevelToString(LogLevel level);
    static void writeLog(const QString& message, LogLevel level);
};