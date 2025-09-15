#ifndef UI_MAINWINDOW_H
#define UI_MAINWINDOW_H

#include <QWidget>
#include <QVBoxLayout>
#include <QTabWidget>
#include <QMenuBar>
#include <QStatusBar>

QT_BEGIN_NAMESPACE

class Ui_MainWindow
{
public:
    QWidget *centralwidget;
    QVBoxLayout *centralLayout;
    QTabWidget *tabWidget;
    QMenuBar *menubar;
    QStatusBar *statusbar;

    void setupUi(QMainWindow *MainWindow)
    {
        if (MainWindow->objectName().isEmpty())
            MainWindow->setObjectName("MainWindow");
        MainWindow->resize(1200, 800);

        centralwidget = new QWidget(MainWindow);
        centralwidget->setObjectName("centralwidget");
        
        centralLayout = new QVBoxLayout(centralwidget);
        centralLayout->setObjectName("centralLayout");
        
        tabWidget = new QTabWidget(centralwidget);
        tabWidget->setObjectName("tabWidget");
        
        centralLayout->addWidget(tabWidget);
        
        MainWindow->setCentralWidget(centralwidget);
        
        menubar = new QMenuBar(MainWindow);
        menubar->setObjectName("menubar");
        menubar->setGeometry(QRect(0, 0, 1200, 22));
        MainWindow->setMenuBar(menubar);
        
        statusbar = new QStatusBar(MainWindow);
        statusbar->setObjectName("statusbar");
        MainWindow->setStatusBar(statusbar);
    }
};

namespace Ui {
    class MainWindow: public Ui_MainWindow {};
}

QT_END_NAMESPACE

#endif // UI_MAINWINDOW_H