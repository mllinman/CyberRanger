#include "Logger.h"
#include <QFile>
#include <QTextStream>
#include <QDateTime>

void Logger::log(const QString& message) {
    QFile file("RangerEduApp.log");
    if(file.open(QIODevice::Append | QIODevice::Text)) {
        QTextStream out(&file);
        out << QDateTime::currentDateTime().toString() << ": " << message << "\n";
    }
}
    // Simple logging interface
    // Implementation can be platform-specific if needed