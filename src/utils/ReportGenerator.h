#ifndef REPORTGENERATOR_H
#define REPORTGENERATOR_H

#include <QObject>
#include <QString>
#include <QStringList>

class ReportGenerator : public QObject
{
    Q_OBJECT

public:
    explicit ReportGenerator(QObject *parent = nullptr);
    
    void addEntry(const QString &entry);
    void addSection(const QString &title, const QStringList &content);
    QString generateReport() const;
    void saveToFile(const QString &filename) const;
    void clear();

private:
    QStringList reportEntries;
    QString reportTitle;
};

#endif // REPORTGENERATOR_H