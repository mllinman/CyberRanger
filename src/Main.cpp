#include "DisclaimerWindow.h"
#include <QApplication>
#include <QSplashScreen>
#include <QTimer>
#include "MainWindow.h"
#include <QFile>

int main(int argc, char *argv[]) 
{
    QApplication a(argc, argv);

    DisclaimerWindow disclaimer;
    if(disclaimer.exec() != QDialog::Accepted || !disclaimer.isAcknowledged()) {
        return 0; // Exit if not acknowledged
    }
    // Apply dark mode
    QFile file(":/resources/darkmode.qss");
    if (file.open(QFile::ReadOnly | QFile::Text)) {
        QString style = QLatin1String(file.readAll());
        a.setStyleSheet(style);
    }
    QPixmap pixmap(":/assets/splash.png");
    QSplashScreen splash(pixmap);
    splash.show();
    a.processEvents();

    QTimer::singleShot(2000, &splash, &QSplashScreen::close); // Show splash 2s

    MainWindow w;
    w.showMaximized(); // Fullscreen on start
    splash.finish(&w);
    w.show();
    
    return a.exec();
}
