#pragma once
#include <QString>

class Logger {
public:
    static void log(const QString& message);
};
    // Simple logging interface
    // Implementation can be platform-specific if needed