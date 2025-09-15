#include "ReportGenerator.h"
#include <QFile>
#include <QTextStream>
#include <QDateTime>

ReportGenerator::ReportGenerator(QObject *parent)
    : QObject(parent)
{
    reportTitle = "CyberRanger Security Report";
}

void ReportGenerator::addEntry(const QString &entry)
{
    reportEntries.append(entry);
}

void ReportGenerator::addSection(const QString &title, const QStringList &content)
{
    reportEntries.append(QString("=== %1 ===").arg(title));
    for (const QString &line : content) {
        reportEntries.append(line);
    }
    reportEntries.append("");
}

QString ReportGenerator::generateReport() const
{
    QString report;
    report += QString("%1\n").arg(reportTitle);
    report += QString("Generated: %1\n\n").arg(QDateTime::currentDateTime().toString());
    
    for (const QString &entry : reportEntries) {
        report += entry + "\n";
    }
    
    return report;
}

void ReportGenerator::saveToFile(const QString &filename) const
{
    QFile file(filename);
    if (file.open(QIODevice::WriteOnly | QIODevice::Text)) {
        QTextStream out(&file);
        out << generateReport();
    }
}

void ReportGenerator::clear()
{
    reportEntries.clear();
}