#include <QApplication>
#include <QSplashScreen>
#include <QTimer>
#include "MainWindow.h"

int main(int argc, char *argv[]) {
    QApplication a(argc, argv);

    // Apply dark theme
    QFile file(":/resources/darktheme.qss");
    if (file.open(QFile::ReadOnly | QFile::Text)) {
        QString style = QTextStream(&file).readAll();
        a.setStyleSheet(style);
    }
    QPixmap pixmap(":/assets/splash.png");
    QSplashScreen splash(pixmap);
    splash.show();
    a.processEvents();

    QTimer::singleShot(2000, &splash, &QSplashScreen::close); // Show splash 2s

    MainWindow w;
    w.showMaximized(); // Fullscreen on start
    return a.exec();
}
