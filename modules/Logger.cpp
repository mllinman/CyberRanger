#include "Logger.h"
#include <QFile>
#include <QTextStream>
#include <QDateTime>
#include <QFileInfo>
#include <QDir>
#include <QDebug>
#include <iostream>

// Initialize static members
LogLevel Logger::currentLogLevel = LogLevel::INFO;
bool Logger::logToConsole = true;
bool Logger::logToFile = true;
QString Logger::logFilename = "logs/CyberRanger.log";
QMutex Logger::logMutex;

void Logger::log(const QString& message, LogLevel level) {
    writeLog(message, level);
}

void Logger::debug(const QString& message) {
    writeLog(message, LogLevel::DEBUG);
}

void Logger::info(const QString& message) {
    writeLog(message, LogLevel::INFO);
}

void Logger::warning(const QString& message) {
    writeLog(message, LogLevel::WARNING);
}

void Logger::error(const QString& message) {
    writeLog(message, LogLevel::ERROR);
}

void Logger::critical(const QString& message) {
    writeLog(message, LogLevel::CRITICAL);
}

void Logger::setLogLevel(LogLevel level) {
    QMutexLocker locker(&logMutex);
    currentLogLevel = level;
}

void Logger::setLogToConsole(bool enable) {
    QMutexLocker locker(&logMutex);
    logToConsole = enable;
}

void Logger::setLogToFile(bool enable) {
    QMutexLocker locker(&logMutex);
    logToFile = enable;
}

void Logger::setLogFile(const QString& filename) {
    QMutexLocker locker(&logMutex);
    logFilename = filename;
}

void Logger::rotateLogFile() {
    QMutexLocker locker(&logMutex);
    
    QFileInfo fileInfo(logFilename);
    if (!fileInfo.exists()) {
        return;
    }
    
    // Rotate if file is larger than 10MB
    if (fileInfo.size() > 10 * 1024 * 1024) {
        QString rotatedName = logFilename + "." + 
            QDateTime::currentDateTime().toString("yyyyMMdd_HHmmss") + ".old";
        QFile::rename(logFilename, rotatedName);
        
        // Keep only last 5 rotated logs
        QDir logDir = fileInfo.absoluteDir();
        QStringList oldLogs = logDir.entryList(
            QStringList() << fileInfo.fileName() + ".*.old", 
            QDir::Files, 
            QDir::Time
        );
        
        while (oldLogs.size() > 5) {
            QFile::remove(logDir.absoluteFilePath(oldLogs.last()));
            oldLogs.removeLast();
        }
    }
}

QString Logger::logLevelToString(LogLevel level) {
    switch (level) {
        case LogLevel::DEBUG:    return "DEBUG";
        case LogLevel::INFO:     return "INFO";
        case LogLevel::WARNING:  return "WARNING";
        case LogLevel::ERROR:    return "ERROR";
        case LogLevel::CRITICAL: return "CRITICAL";
        default:                 return "UNKNOWN";
    }
}

void Logger::writeLog(const QString& message, LogLevel level) {
    QMutexLocker locker(&logMutex);
    
    // Check if we should log this level
    if (level < currentLogLevel) {
        return;
    }
    
    // Format log message
    QString timestamp = QDateTime::currentDateTime().toString("yyyy-MM-dd HH:mm:ss.zzz");
    QString levelStr = logLevelToString(level);
    QString formattedMessage = QString("[%1] [%2] %3")
        .arg(timestamp)
        .arg(levelStr, -8)  // Left-align with width 8
        .arg(message);
    
    // Log to console
    if (logToConsole) {
        std::cout << formattedMessage.toStdString() << std::endl;
    }
    
    // Log to file
    if (logToFile) {
        // Ensure logs directory exists
        QFileInfo fileInfo(logFilename);
        QDir dir = fileInfo.absoluteDir();
        if (!dir.exists()) {
            dir.mkpath(".");
        }
        
        // Check for rotation before writing
        rotateLogFile();
        
        QFile file(logFilename);
        if (file.open(QIODevice::Append | QIODevice::Text)) {
            QTextStream out(&file);
            out << formattedMessage << "\n";
            file.close();
        } else {
            std::cerr << "Failed to open log file: " 
                     << logFilename.toStdString() << std::endl;
        }
    }
}