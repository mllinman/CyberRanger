// Core/AutoUpdater.cpp
#include "AutoUpdater.h"
#include <QDebug>
#include <QNetworkAccessManager>
#include <QNetworkReply>
#include <QJsonDocument>
#include <QJsonObject>
#include <QCryptographicHash>
#include <QFile>

AutoUpdater::AutoUpdater(const QString &updateUrl, QObject *parent)
    : QObject(parent), url(updateUrl) {}

void AutoUpdater::checkForUpdates() {
    qDebug() << "AutoUpdater placeholder: checks for updates (not implemented yet).";
    QNetworkAccessManager *manager = new QNetworkAccessManager(this);
    QNetworkReply *reply = manager->get(QNetworkRequest(QUrl(url)));
    connect(reply, &QNetworkReply::finished, [this, reply]() {
        if(reply->error() == QNetworkReply::NoError) {
            QJsonDocument doc = QJsonDocument::fromJson(reply->readAll());
            QString latestVersion = doc["version"].toString();
            QString downloadUrl = doc["download_url"].toString();
            QString hash = doc["sha256"].toString();
            if(latestVersion != "2.0") {
                emit updateAvailable(latestVersion, downloadUrl);
            } else {
                emit noUpdate();
            }
        } else {
            emit errorOccurred(reply->errorString());
        }
        reply->deleteLater();
    });
}
